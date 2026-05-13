# 다음 세션 시작 프롬프트

Claude Code를 켜고 아래 내용을 붙여넣으세요.

---

이 레포는 내 학술 개인 홈페이지야. Next.js 14 정적 사이트고 GitHub Pages로 배포돼.

사이트 주소: https://Seungji-Biva-Lee.github.io/cvtowebsite

## 페이지 구조
- `/` – 홈 (프로필 + 연구 소개 + WIP + Publications 통합)
- `/projects/` – 프로젝트 목록
- `/cv/` – CV PDF 뷰어
- `/teaching/` – 티칭 (현재 거의 안 씀)

## 주요 파일
- `src/content/publications.ts` – 논문/저서/보고서/WIP 목록 ← **논문 추가/수정 여기**
- `src/content/projects.ts` – 프로젝트 목록 ← **프로젝트 추가/수정 여기**
- `src/content/research.ts` – 연구 소개 글 (수동 편집)
- `src/content/site.ts` – 이름, 이메일, nav, CV 경로
- `src/pages/index.tsx` – 홈페이지 레이아웃
- `src/pages/projects.tsx` – 프로젝트 페이지 레이아웃
- `public/cv.pdf` – 다운로드용 PDF CV ← **CV 교체 시 여기 덮어쓰기**
- `public/cv.docx` – Word CV (파서 입력용)
- `public/headshot.png` – 프로필 사진

## publications.ts 구조
- `publications` 배열: type = 'article' | 'book' | 'report'
- `workInProgress` 배열: type = 'wip', note = 'Under review.'
- 저서는 제목 이탤릭, 논문은 큰따옴표로 자동 렌더링됨

## projects.ts 구조
- sector: 'Research' | 'Humanitarian Assistance' | 'Health' | 'Social Welfare'
- tags?: string[] — 추가 세부 뱃지 (예: 'Psychosocial Support', 'Gender', 'Health')
- highlight?: string — ★ 강조 텍스트 (예: KOICA 평가 점수)

## 수정 후 배포 방법
```bash
git add -A
git commit -m "내용 요약"
git push
```
push하면 GitHub Actions가 자동 빌드 + 배포함.

## PDF CV 수동 업데이트 방법
Word에서 수정 → PDF 내보내기 → `public/cv.pdf` 덮어쓰기 → git add/commit/push

---

*(원하는 작업을 이어서 적으세요. 예: "publications.ts에 논문 추가해줘")*
