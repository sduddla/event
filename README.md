# TIKITAKA | 이벤트 프로모션 페이지

> "신규 서비스 오픈 기념 이벤트! 응모하고 특별 혜택을 받아가세요"

가상의 메신저 서비스 **TIKITAKA**를 구상하고, 이를 기반으로 **신규 서비스 오픈 기념 이벤트 프로모션 페이지**를 제작했습니다.

<br>

## 주요 기능
- 실시간 카운트다운 타이머
- 이벤트 응모 폼 (유효성 검사)
- 행운의 룰렛 게임
- GSAP 스크롤 애니메이션
- 반응형 디자인

### 구현 시 고민한 점
- 

<br>

## 기술 스택

| 분류	| 기술 |
| --- | --- |
| **Frontend** | Vue 3, TypeScript, Vite, GSAP, Axios, vue3-toastify |
| **Backend** | JSON Server |
| **Hosting** | Railway (Backend), Vercel (Frontend) |

### 사용한 라이브러리 및 선택 이유

- **Axios**: 브라우저 내장 fetch API는 HTTP 상태 코드가 4xx, 5xx여도 catch로 넘어가지 않아 에러 처리가 복잡합니다. 또한 인터셉터가 없어 baseURL, 공통 헤더, 에러 핸들링을 중앙화하기 어렵습니다. Axios는 이러한 문제를 해결하고 TypeScript 지원이 잘 되어 있어 선택했습니다.
- **GSAP**: CSS만으로는 스크롤 위치에 따른 정확한 트리거 제어가 어렵습니다. GSAP의 ScrollTrigger는 스크롤 위치에 따른 정확한 제어가 가능하고, 하드웨어 가속을 활용해 부드러운 애니메이션을 제공할 수 있어 선택했습니다.
- **vue3-toastify**: 초기에는 vue-toastification을 고려했지만 Vue 3와 호환되지 않았습니다. vue3-toastify는 Vue 3 Composition API와 호환되고, 직관적인 API와 커스터마이징이 용이해 선택했습니다.
- **JSON Server**: JSONPlaceholder나 MockAPI.io 같은 외부 서비스도 고려했지만, 로컬에서 db.json 파일을 직접 관리할 수 있는 JSON Server를 선택했습니다. 데이터 구조를 Git으로 버전 관리할 수 있고, 외부 서비스 의존성 없이 오프라인에서도 개발할 수 있으며, 배포 시에도 동일한 구조로 쉽게 전환할 수 있어 선택했습니다.

<br>

## 프로젝트 구조

```
event/
├── server/          # 백엔드 (JSON Server)
│   ├── server.js    # 서버 실행 파일
│   ├── db.json      # Mock 데이터
│   └── package.json # 서버 의존성
├── src/             # 프론트엔드
│   ├── api/         # API 관련
│   ├── components/  # Vue 컴포넌트
│   └── utils/       # 유틸리티 함수
└── package.json     # 프론트엔드 의존성
```

<br>

## 실행 방법

#### 1. 의존성 설치
```bash
npm install
```

#### 2. 환경변수 설정
- 프로젝트 루트에 .env 파일을 생성하고 다음 내용을 추가하세요:
```bash
VITE_API_URL=http://localhost:3000
```

#### 3. 백엔드 서버 실행
- 터미널 1에서:
```bash
npm run json-server
```

#### 4. 프론트엔드 서버 실행
- 터미널 2에서:
```bash
npm run dev
```
