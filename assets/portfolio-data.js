window.PORTFOLIO_SEED = {
  version: 1,
  profile: {
    name: "정성재",
    role: "AI · Robotics · Digital Twin Builder",
    summary:
      "로봇 시뮬레이터, 비전·PLC 기반 스마트팩토리 디지털 트윈, 국방 품질 검색 자동화처럼 실제로 동작하는 데모를 만들고 영상으로 검증하는 개발자입니다.",
    github: "https://github.com/wjdtjdwo0609-cyber",
    resume: "./assets/docs/sungjae-korea-deep-learning-portfolio.pdf",
    pdfs: [
      {
        label: "Document AI / FDE",
        file: "./assets/docs/sungjae-korea-deep-learning-portfolio.pdf"
      },
      {
        label: "Smart Factory / Robotics",
        file: "./assets/docs/sungjae-dongyeon-snt-research.pdf"
      },
      {
        label: "Product / Automation",
        file: "./assets/docs/sungjae-team-reboott-portfolio.pdf"
      }
    ],
    updatedAt: "2026-05-28"
  },
  domains: [
    "All",
    "Smart Factory",
    "Robotics",
    "AI Agent",
    "Document AI",
    "Automation",
    "Product"
  ],
  projects: [
    {
      id: "smart-factory-digital-twin",
      title: "Vision · Robot · PLC Digital Twin",
      subtitle: "비전 검사, 로봇 픽킹, PLC 신호, 웹 대시보드를 연결한 제조 디지털 트윈",
      domain: "Smart Factory",
      visibility: "public",
      maturity: "Case study",
      featured: true,
      priority: 2,
      tests: 1,
      image: "./assets/images/smart-factory-digital-twin.png",
      videoPoster: "https://img.youtube.com/vi/2opqmbzk43I/hqdefault.jpg",
      youtubeUrl: "https://www.youtube.com/watch?v=2opqmbzk43I&t=504s",
      summary:
        "비전 인식, 로봇 동작, PLC 제어 신호, 웹 연동 디지털 트윈을 하나의 시연 흐름으로 묶어 제조 공정 상태를 설명 가능하게 보여주는 프로젝트입니다.",
      results: [
        "카메라 기반 인식 결과와 로봇 동작을 PLC 흐름에 맞춰 연결",
        "웹 화면에서 공정 상태와 디지털 트윈을 함께 확인할 수 있게 구성",
        "영상 시작 지점을 핵심 결과물 구간으로 연결해 채용 담당자가 바로 확인 가능"
      ],
      stack: ["Python", "OpenCV", "Robot", "PLC", "React", "Digital Twin"],
      links: [
        {
          label: "GitHub",
          url: "https://github.com/wjdtjdwo0609-cyber/smart-factory-dashboard",
          icon: "github"
        }
      ]
    },
    {
      id: "dockerros-web-simulator",
      title: "DockerRos Web Simulator",
      subtitle: "로봇 앱 시연과 디지털 트윈을 함께 보여주는 웹 기반 ROS2 시뮬레이터",
      domain: "Robotics",
      visibility: "public",
      maturity: "Production-ready",
      featured: true,
      priority: 1,
      tests: 16,
      image: "./assets/images/dockerros-video-poster.jpg",
      video: "",
      videoPoster: "./assets/images/dockerros-video-poster.jpg",
      youtubeUrl: "https://www.youtube.com/watch?v=3c9PQeWwu58&t=463s",
      summary:
        "무거운 로봇 시뮬레이션을 브라우저에서 확인 가능한 데모와 ROS2 학습 환경으로 나누고, 디지털 트윈 장면까지 영상에서 바로 확인할 수 있게 정리한 프로젝트입니다.",
      results: [
        "DockerRos 앱 시연 영상의 디지털 트윈 구간으로 바로 이동",
        "Indy7, UR, Panda, Fanuc 등 여러 로봇 모델과 학습 흐름 지원",
        "웹 데모와 ROS2 네이티브 실행 경로를 분리해 무거운 의존성을 낮춤"
      ],
      stack: ["ROS2", "Three.js", "WebGL", "Python", "OPC UA", "Gazebo"],
      links: [
        {
          label: "GitHub",
          url: "https://github.com/wjdtjdwo0609-cyber/DockerRos",
          icon: "github"
        }
      ]
    },
    {
      id: "pickline-toolkit",
      title: "pickline-toolkit",
      subtitle: "비전 가이드 픽앤플레이스 라인을 재사용 가능한 Python 툴킷으로 분리",
      domain: "Robotics",
      visibility: "public",
      maturity: "Case study",
      featured: false,
      priority: 6,
      tests: 77,
      image: "./assets/images/pickline-preview.png",
      youtubeUrl: "",
      summary:
        "Intel5 릴레이 소켓 검사·픽킹 프로젝트에서 비전, 캘리브레이션, 로봇 제어, PLC 연동, 픽 사이클을 bounded context로 추출한 모듈형 라이브러리입니다.",
      results: [
        "4,493줄 god object에서 재사용 가능한 도메인 모듈 추출",
        "YOLO 검출, hand-eye calibration, Indy7 제어, MC Protocol 연동 분리",
        "77개 테스트로 값 객체와 오케스트레이션 규칙 검증"
      ],
      stack: ["Python", "YOLO", "OpenCV", "Indy7", "PLC", "DDD"],
      links: [
        {
          label: "GitHub",
          url: "https://github.com/wjdtjdwo0609-cyber/pickline-toolkit",
          icon: "github"
        }
      ]
    },
    {
      id: "local-agent-ai",
      title: "Local Agent AI",
      subtitle: "PM, Architect, Developer, QA가 협업하는 로컬 AI 개발 환경",
      domain: "AI Agent",
      visibility: "public",
      maturity: "Production-ready",
      featured: true,
      priority: 4,
      tests: 137,
      image: "./assets/images/local-agent-ai.png",
      youtubeUrl: "",
      summary:
        "FastAPI, WebSocket, SQLite, Vanilla JS 기반 GUI에서 Ollama와 MLX 백엔드를 전환하며 4개 역할형 에이전트가 세션 단위로 협업하는 로컬 AI 앱입니다.",
      results: [
        "128개 pytest와 9개 Playwright E2E 통과",
        "팀 프리셋, 세션 복원, 워크스페이스 실행, 실시간 스트리밍 구현",
        "Ollama와 MLX 런타임을 설정에서 전환"
      ],
      stack: ["FastAPI", "WebSocket", "SQLite", "Ollama", "MLX", "Playwright"],
      links: [
        {
          label: "GitHub",
          url: "https://github.com/wjdtjdwo0609-cyber/local-agent-ai-gui",
          icon: "github"
        }
      ]
    },
    {
      id: "docscope",
      title: "DocScope",
      subtitle: "PDF, Markdown, DOCX, URL 문서를 구조도와 메모 가능한 지식 캔버스로 변환",
      domain: "Document AI",
      visibility: "public",
      maturity: "Case study",
      featured: true,
      priority: 5,
      tests: 5,
      image: "./assets/images/docscope-document-split.png",
      youtubeUrl: "",
      summary:
        "폴더를 열면 문서를 자동 수집하고 트리, 마인드맵, 플로우차트로 변환하며 노드 메모, 태그, wikilink, 하이라이트를 sidecar JSON과 Markdown으로 보존하는 로컬 앱입니다.",
      results: [
        "문서별 sidecar JSON과 .docscope.md 동시 저장",
        "Ollama/MLX 기반 온디바이스 AI 어시스트 설계",
        "Obsidian과 공존 가능한 wikilink, tag, backlink 흐름 구현"
      ],
      stack: ["Tauri", "React", "FastAPI", "Ollama", "MLX", "Mermaid"],
      links: [
        {
          label: "GitHub",
          url: "https://github.com/wjdtjdwo0609-cyber/docscope",
          icon: "github"
        }
      ]
    },
    {
      id: "knowledge-os-control",
      title: "Knowledge OS Control",
      subtitle: "지식 파이프라인 명령을 운영자가 누를 수 있는 GUI로 전환",
      domain: "Document AI",
      visibility: "public",
      maturity: "Case study",
      featured: false,
      priority: 7,
      tests: 0,
      image: "./assets/images/knowledge-os-control.png",
      youtubeUrl: "",
      summary:
        "문서 수집, ingest 계획, 그래프 재생성, 중복 탐지, 검색 평가를 버튼형 운영 도구로 묶어 지식 저장소 상태를 관리하는 로컬 컨트롤 패널입니다.",
      results: [
        "명령어 기반 파이프라인을 제한된 GUI 액션으로 전환",
        "문서, 청크, 그래프 노드, 그래프 엣지 상태를 한 화면에서 확인",
        "검색 평가와 로그를 운영 화면에 남겨 재실행 가능성 개선"
      ],
      stack: ["Python", "HTML", "CSS", "Knowledge Graph", "RAG"],
      links: []
    },
    {
      id: "jangsa-simulator",
      title: "Jangsa Simulator",
      subtitle: "업종별 창업 비용, 공간 배치, 월간 손익을 계산하는 제품형 웹앱",
      domain: "Product",
      visibility: "public",
      maturity: "Production-ready",
      featured: false,
      priority: 8,
      tests: 92,
      image: "./assets/images/jangsa-detail.png",
      youtubeUrl: "",
      summary:
        "22개 업종의 장비, 면적, 가격, 유지비, 전력, 시즌성 데이터를 바탕으로 초기 투자비, 손익분기점, 시나리오별 수익성을 계산하는 React 앱입니다.",
      results: [
        "22개 업종과 12개 지역·상권 조합 지원",
        "세금, 수수료, 감가상각, 정부지원금 매칭 반영",
        "92개 테스트로 계산 규칙과 UI 핵심 흐름 검증"
      ],
      stack: ["React", "Vite", "SVG", "Vitest", "PWA"],
      links: [
        {
          label: "GitHub",
          url: "https://github.com/wjdtjdwo0609-cyber/JangsaSimulator",
          icon: "github"
        }
      ]
    },
    {
      id: "notebooklm-auto-collector",
      title: "NotebookLM Auto Collector",
      subtitle: "NotebookLM Discover Sources 반복 수집을 GUI와 Playwright로 자동화",
      domain: "Automation",
      visibility: "public",
      maturity: "Case study",
      featured: false,
      priority: 9,
      tests: 14,
      image: "./assets/images/notebooklm-automation.png",
      youtubeUrl: "",
      summary:
        "Chrome CDP에 연결해 로그인 세션이 필요한 NotebookLM 자료 수집 흐름을 자동화하고, GUI에서 주제 선택, 연결 상태, 실시간 로그, 결과 파일을 확인하게 만든 도구입니다.",
      results: [
        "Playwright와 Chrome CDP 기반 브라우저 자동화",
        "SSE 로그 스트림으로 진행 상황과 실패 지점 노출",
        "수집 URL을 이후 RAG, 문서화, 리서치 파이프라인으로 재사용"
      ],
      stack: ["Playwright", "Node.js", "Chrome CDP", "SSE", "GUI"],
      links: []
    },
    {
      id: "kdsis-search-agent",
      title: "KoreaArmyQuality Search Agent",
      subtitle: "국방 품질·표준 검색 업무를 자연어 질의와 브라우저 자동화로 연결",
      domain: "Automation",
      visibility: "public",
      maturity: "Production-ready",
      featured: true,
      priority: 3,
      tests: 31,
      image: "",
      videoPoster: "https://img.youtube.com/vi/EW7pOTiMH3g/hqdefault.jpg",
      youtubeUrl: "https://www.youtube.com/watch?v=EW7pOTiMH3g",
      summary:
        "담당자가 자연어로 질문하면 검색 파라미터를 추출하고, Playwright가 KoreaArmyQuality/KDSIS 계열 WebSquare 화면을 조회해 카드와 표로 반환하는 업무 자동화 앱입니다.",
      results: [
        "시연 영상으로 검색 요청, 자동 조회, 결과 정리 흐름을 확인 가능",
        "Chromium 싱글턴, serial queue, TTL cache로 안정성 개선",
        "CSV/JSON 다운로드, 정렬, 페이지네이션, 최근 검색 지원"
      ],
      stack: ["Node.js", "Express", "Playwright", "Claude", "Gemini", "DDD"],
      links: [
        {
          label: "GitHub",
          url: "https://github.com/wjdtjdwo0609-cyber/KoreaArmyQualitySearching",
          icon: "github"
        }
      ]
    },
    {
      id: "terminal-ai-control",
      title: "Terminal AI Control",
      subtitle: "여러 프로젝트의 Claude CLI 세션과 Git/runtime 상태를 관리하는 로컬 운영 앱",
      domain: "AI Agent",
      visibility: "hidden",
      maturity: "WIP",
      featured: false,
      priority: 20,
      tests: 84,
      image: "",
      youtubeUrl: "",
      summary:
        "FastAPI 로컬 서버에서 터미널 세션, 패널 설정, Git 상태, runtime 로그를 관리하는 개발자 운영 도구입니다.",
      results: [
        "terminal session, panel configuration, repository workspace, runtime observability 컨텍스트 분리",
        "84개 테스트 기준으로 운영 정책 검증",
        "공개 전에는 스크린샷과 사용 시나리오 정리가 필요"
      ],
      stack: ["FastAPI", "WebSocket", "Claude CLI", "Git", "Python"],
      links: []
    },
    {
      id: "ai-army",
      title: "AI Army",
      subtitle: "역할형 AI 작업자가 협업하는 멀티 에이전트 오케스트레이션 백엔드",
      domain: "AI Agent",
      visibility: "hidden",
      maturity: "WIP",
      featured: false,
      priority: 21,
      tests: 0,
      image: "",
      youtubeUrl: "",
      summary:
        "PM, Architect, Developer, QA 에이전트를 세션, 태스크 보드, 이벤트 스트림, 팀 모드로 조율하는 로컬 멀티 에이전트 협업 시스템입니다.",
      results: [
        "대표작 후보지만 데모 영상과 end-to-end 시나리오 고정 후 공개 추천",
        "도메인 워크플로우 중심으로 backend/application/domain 분리",
        "tool 확장 실험을 포함"
      ],
      stack: ["Python", "Multi-agent", "DDD", "Event Stream"],
      links: [
        {
          label: "GitHub",
          url: "https://github.com/wjdtjdwo0609-cyber/ai-army",
          icon: "github"
        }
      ]
    },
    {
      id: "graphmind",
      title: "GraphMind",
      subtitle: "문서를 지식 그래프와 RAG 검색 인덱스로 바꾸는 macOS Swift 앱",
      domain: "Document AI",
      visibility: "hidden",
      maturity: "WIP",
      featured: false,
      priority: 22,
      tests: 0,
      image: "",
      youtubeUrl: "",
      summary:
        "문서 파싱, 지식 그래프 분석, retrieval/RAG를 다루는 SwiftData 기반 macOS 앱입니다. Xcode 빌드 환경 정리 후 공개하면 좋은 후보입니다.",
      results: [
        "DocumentIngestion, KnowledgeGraph, Retrieval 컨텍스트 분리",
        "RAG indexing과 top-k retrieval 정책을 별도 컨텍스트로 분리",
        "공개 전 빌드와 스크린샷 검증 필요"
      ],
      stack: ["Swift", "SwiftUI", "SwiftData", "RAG", "Knowledge Graph"],
      links: []
    }
  ]
};
