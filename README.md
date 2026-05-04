# get-used-to-c

C/C++을 학습하기 위한 인터랙티브 코드 에디터 + 메모리 시각화 웹 서비스.

포인터, 스택/힙, 동적 할당처럼 "보이지 않아 어려운" 개념을 직접 보면서 익히는 것을 목표로 합니다.

## 핵심 기능 (계획)

- **튜토리얼 모드**: 단계별 설명 + 편집 가능한 예제 코드 + 실행 결과 + 메모리 시각화
- **플레이그라운드 모드**: 빈 에디터에서 자유롭게 코드 작성/실행 (알고리즘, 토이 프로젝트)
- **메모리 시각화**: 스택/힙, 변수 주소, 포인터 참조를 단계별로 그려서 보여줌

## 기술 스택

- **빌드**: Vite + React 19 + TypeScript
- **UI**: MUI (Material UI) + 일반 CSS
- **라우팅**: React Router
- **상태 관리**: Zustand
- **에디터**: Monaco Editor (예정)
- **코드 실행**: Judge0 API 또는 WASM 기반 컴파일러 (검토 중)

## 폴더 구조

```
src/
├── components/      # 공용 UI 컴포넌트 (Layout 등)
├── features/
│   ├── editor/      # Monaco 에디터 래퍼
│   ├── runner/      # 코드 실행 클라이언트
│   ├── visualizer/  # 메모리 시각화
│   └── tutorial/    # 튜토리얼 콘텐츠/뷰어
├── pages/           # 라우트별 페이지 컴포넌트
├── store/           # Zustand 스토어
├── lib/             # 유틸, 외부 API 클라이언트
├── theme/           # MUI 테마 설정
├── router.tsx       # 라우트 정의
├── App.tsx          # 앱 루트 (Provider 조합)
└── main.tsx         # 엔트리
```

## 시작하기

```bash
npm install
npm run dev
```

기본 주소: http://localhost:5173

## 스크립트

- `npm run dev` — 개발 서버 실행
- `npm run build` — 타입 체크 + 프로덕션 빌드
- `npm run lint` — ESLint
- `npm run preview` — 빌드된 결과 미리보기

## 로드맵

- [x] 프로젝트 셋업 (Vite + React + MUI + Router)
- [ ] Monaco 에디터 통합
- [ ] 코드 실행 연결 (Judge0 또는 WASM)
- [ ] 메모리 시각화 (스택 → 힙 순)
- [ ] 튜토리얼 콘텐츠 (변수, 포인터, 배열, malloc/free, 구조체)
- [ ] 사용자 진도 저장
