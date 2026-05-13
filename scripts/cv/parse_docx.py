#!/usr/bin/env python3
"""
parse_docx.py – Extract structured CV data from a Word (.docx) file.

Usage:
    python3 scripts/cv/parse_docx.py \
        --input public/cv.docx \
        --output src/generated/cv-data.json

The parser reads heading-delimited sections and produces a JSON file
consumed by the Next.js website. No network calls are made.
"""

import argparse
import json
import os
import re
import sys
from pathlib import Path


def require_docx():
    """Import python-docx, printing a helpful install message on failure."""
    try:
        import docx
        return docx
    except ImportError:
        print(
            "ERROR: python-docx is not installed.\n"
            "Install it with:  pip install python-docx\n"
            "or:               pip3 install python-docx",
            file=sys.stderr,
        )
        sys.exit(1)


# ── Section heading patterns ──────────────────────────────────────────────────
# Map normalised heading text → canonical section key
SECTION_MAP = {
    # employment
    "employment": "employment",
    "academic positions": "employment",
    "professional experience": "employment",
    "positions held": "employment",
    "academic appointments": "employment",
    # education
    "education": "education",
    "academic training": "education",
    # research
    "research areas": "researchAreas",
    "research interests": "researchAreas",
    "fields of research": "researchAreas",
    "specialisations": "researchAreas",
    "specializations": "researchAreas",
    # publications
    "publications": "publications",
    "selected publications": "publications",
    "refereed publications": "publications",
    "journal articles": "publications",
    "books": "publications",
    "book chapters": "publications",
    "articles": "publications",
    # work in progress
    "work in progress": "workInProgress",
    "works in progress": "workInProgress",
    "work in preparation": "workInProgress",
    "working papers": "workInProgress",
    "manuscripts in preparation": "workInProgress",
    "under review": "workInProgress",
    "manuscripts under review": "workInProgress",
    # teaching
    "teaching": "teaching",
    "courses taught": "teaching",
    "teaching experience": "teaching",
    # invited talks
    "invited talks": "invitedTalks",
    "invited lectures": "invitedTalks",
    "conference presentations": "invitedTalks",
    "presentations": "invitedTalks",
    "talks": "invitedTalks",
    # honors and grants
    "honors": "honorsGrants",
    "honours": "honorsGrants",
    "awards": "honorsGrants",
    "grants": "honorsGrants",
    "honors and awards": "honorsGrants",
    "honours and awards": "honorsGrants",
    "fellowships": "honorsGrants",
    "funding": "honorsGrants",
    # service
    "service": "service",
    "professional service": "service",
    "academic service": "service",
    "editorial service": "service",
}


def normalise(text: str) -> str:
    return text.strip().lower()


def classify_section(heading_text: str) -> str | None:
    key = normalise(heading_text)
    # Exact match first
    if key in SECTION_MAP:
        return SECTION_MAP[key]
    # Partial / substring match
    for pattern, section in SECTION_MAP.items():
        if pattern in key or key in pattern:
            return section
    return None


# ── Paragraph-level helpers ───────────────────────────────────────────────────

def is_heading(para) -> bool:
    """True if the paragraph style name contains 'heading'."""
    if para.style and "heading" in para.style.name.lower():
        return True
    # Fallback: bold, short, no trailing period
    text = para.text.strip()
    if not text:
        return False
    runs = [r for r in para.runs if r.text.strip()]
    all_bold = runs and all(r.bold for r in runs)
    return all_bold and len(text) < 80 and not text.endswith(".")


def para_text(para) -> str:
    return para.text.strip()


# ── Personal info heuristics ──────────────────────────────────────────────────

def extract_contact_block(paragraphs) -> dict:
    """
    Scan the first ~20 non-empty paragraphs for name, title, affiliation, email.
    Heuristics only – override in site.ts if needed.
    """
    info: dict = {}
    email_re = re.compile(r"[\w.+-]+@[\w.-]+\.[a-zA-Z]{2,}")
    url_re = re.compile(r"https?://\S+")

    candidate_lines = []
    for para in paragraphs[:20]:
        text = para_text(para)
        if not text:
            continue
        candidate_lines.append(text)

        m = email_re.search(text)
        if m and "email" not in info:
            info["email"] = m.group()

        m = url_re.search(text)
        if m and "website" not in info:
            info["website"] = m.group()

    # First non-empty line is usually the name
    if candidate_lines and "name" not in info:
        info["name"] = candidate_lines[0]

    # Look for title/affiliation patterns
    title_keywords = [
        "professor", "lecturer", "researcher", "fellow",
        "postdoc", "associate", "assistant", "instructor",
        "director", "chair", "visiting",
    ]
    for line in candidate_lines[1:6]:
        lower = line.lower()
        if any(kw in lower for kw in title_keywords) and "title" not in info:
            info["title"] = line
        elif ("university" in lower or "college" in lower
              or "institute" in lower or "school" in lower
              ) and "affiliation" not in info:
            info["affiliation"] = line

    return info


# ── Section parsers ───────────────────────────────────────────────────────────

def parse_employment(lines: list[str]) -> list[dict]:
    entries = []
    year_re = re.compile(r"\b(\d{4})\s*[-–—]\s*(\d{4}|present|current)\b", re.I)
    for line in lines:
        if not line:
            continue
        m = year_re.search(line)
        years = m.group() if m else ""
        text = year_re.sub("", line).strip(" ,–—\t")
        parts = [p.strip() for p in re.split(r",\s+|\s{2,}|\t", text) if p.strip()]
        role = parts[0] if parts else text
        institution = parts[1] if len(parts) > 1 else ""
        entries.append({"role": role, "institution": institution, "years": years})
    return entries


def parse_education(lines: list[str]) -> list[dict]:
    entries = []
    year_re = re.compile(r"\b(\d{4})\b")
    for line in lines:
        if not line:
            continue
        years = year_re.findall(line)
        year = years[-1] if years else ""
        text = re.sub(r"\b\d{4}\b", "", line).strip(" ,\t")
        # Expected format: "Degree, Field, Institution, Year"
        # We want the last meaningful part as institution.
        parts = [p.strip() for p in re.split(r",\s+|\t", text) if p.strip()]
        degree = parts[0] if parts else text
        # Institution is usually the last part (after field/subject)
        institution = parts[-1] if len(parts) > 1 else ""
        entries.append({"degree": degree, "institution": institution, "year": year})
    return entries


def parse_research_areas(lines: list[str]) -> list[str]:
    areas = []
    for line in lines:
        # Lines may be comma/semicolon separated or one per line
        for part in re.split(r"[;,]", line):
            part = part.strip(" •·–—\t")
            if part:
                areas.append(part)
    return areas


def parse_publications(lines: list[str]) -> list[dict]:
    entries = []
    year_re = re.compile(r"\b(19|20)\d{2}\b")
    for line in lines:
        if not line:
            continue
        m = year_re.search(line)
        year = m.group() if m else ""
        entries.append({"citation": line, "year": year})
    return entries


def parse_work_in_progress(lines: list[str]) -> list[dict]:
    entries = []
    # Pattern: optional opening quote, title, closing quote+period, optional description
    quoted_re = re.compile(r'^["\u201c\u2018](.+?)["\u201d\u2019\u201e][.,]?\s*(.*)')
    for line in lines:
        line = line.strip(" •·–—\t")
        if not line:
            continue
        m = quoted_re.match(line)
        if m:
            title = m.group(1).strip().rstrip('.')
            description = m.group(2).strip()
        else:
            # No quotes: split on first ". " or keep whole line as title
            parts = line.split(". ", 1)
            title = parts[0].strip().rstrip('.')
            description = parts[1].strip() if len(parts) > 1 else ""
        entries.append({"title": title, "description": description})
    return entries


def parse_teaching(lines: list[str]) -> list[dict]:
    entries = []
    year_re = re.compile(r"\b(19|20)\d{2}\b")
    for line in lines:
        if not line:
            continue
        m = year_re.search(line)
        year = m.group() if m else ""
        text = year_re.sub("", line).strip(" ,\t")
        entries.append({"course": text, "year": year})
    return entries


def parse_generic(lines: list[str]) -> list[dict]:
    entries = []
    year_re = re.compile(r"\b(19|20)\d{2}\b")
    for line in lines:
        line = line.strip(" •·–—\t")
        if not line:
            continue
        m = year_re.search(line)
        year = m.group() if m else ""
        entries.append({"text": line, "year": year})
    return entries


SECTION_PARSERS = {
    "employment": parse_employment,
    "education": parse_education,
    "researchAreas": parse_research_areas,
    "publications": parse_publications,
    "workInProgress": parse_work_in_progress,
    "teaching": parse_teaching,
    "invitedTalks": parse_generic,
    "honorsGrants": parse_generic,
    "service": parse_generic,
}


# ── Main extraction ───────────────────────────────────────────────────────────

def extract(docx_path: str) -> dict:
    docx = require_docx()
    doc = docx.Document(docx_path)
    paragraphs = doc.paragraphs

    # --- Personal info from the top of the document ---
    info = extract_contact_block(paragraphs)

    # --- Walk paragraphs, collect sections ---
    raw_sections: dict[str, list[str]] = {}
    current_section: str | None = None

    for para in paragraphs:
        text = para_text(para)
        if not text:
            continue

        if is_heading(para):
            section = classify_section(text)
            if section:
                current_section = section
                if section not in raw_sections:
                    raw_sections[section] = []
                continue
            else:
                # Unknown heading – stop accumulating into previous section
                # (avoid polluting sections with unrelated headings)
                current_section = None
                continue

        if current_section:
            raw_sections[current_section].append(text)

    # --- Parse each section ---
    parsed: dict = {}
    for section, lines in raw_sections.items():
        parser = SECTION_PARSERS.get(section, parse_generic)
        parsed[section] = parser(lines)

    # --- Assemble final structure ---
    result: dict = {
        "name": info.get("name", ""),
        "title": info.get("title", ""),
        "affiliation": info.get("affiliation", ""),
        "email": info.get("email", ""),
        "website": info.get("website", ""),
        "researchAreas": parsed.get("researchAreas", []),
        "employment": parsed.get("employment", []),
        "education": parsed.get("education", []),
        "publications": parsed.get("publications", []),
        "workInProgress": parsed.get("workInProgress", []),
        "teaching": parsed.get("teaching", []),
        "invitedTalks": parsed.get("invitedTalks", []),
        "honorsGrants": parsed.get("honorsGrants", []),
        "service": parsed.get("service", []),
    }
    return result


# ── CLI entry point ───────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description="Parse a Word CV into structured JSON for the academic website."
    )
    parser.add_argument(
        "--input",
        default="public/cv.docx",
        help="Path to the input .docx file (default: public/cv.docx)",
    )
    parser.add_argument(
        "--output",
        default="src/generated/cv-data.json",
        help="Path to write the output JSON (default: src/generated/cv-data.json)",
    )
    args = parser.parse_args()

    # Resolve paths relative to the repo root (where this script is typically run)
    input_path = Path(args.input)
    output_path = Path(args.output)

    if not input_path.exists():
        print(
            f"ERROR: CV file not found: {input_path}\n"
            "Place your Word CV at public/cv.docx (or pass --input <path>).",
            file=sys.stderr,
        )
        sys.exit(1)

    print(f"Parsing {input_path} …", file=sys.stderr)
    data = extract(str(input_path))

    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    pub_count = len(data.get("publications", []))
    wip_count = len(data.get("workInProgress", []))
    print(
        f"Wrote {output_path}  "
        f"({pub_count} publications, {wip_count} work-in-progress items)",
        file=sys.stderr,
    )


if __name__ == "__main__":
    main()
