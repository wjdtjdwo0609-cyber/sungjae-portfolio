window.PORTFOLIO_SEED = {
  version: 1,
  profile: {
    name: "정성재",
    role: "AI · Robotics · Digital Twin Builder",
    summary:
      "비전 학습, 로봇 티칭, PLC 신호 연동, 웹 디지털 트윈처럼 실제 장비와 소프트웨어가 맞물리는 흐름을 만들고 영상으로 검증하는 개발자입니다.",
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
      title: "Factory I/O Robot Process Simulation",
      subtitle: "Factory I/O에서 구현한 로봇 공정과 PLC 신호·웹 화면 연동",
      domain: "Smart Factory",
      visibility: "public",
      maturity: "Case study",
      featured: true,
      priority: 1,
      tests: 1,
      image: "./assets/images/factoryio-robot-process-poster.jpg",
      videoPoster: "./assets/images/factoryio-robot-process-poster.jpg",
      gallery: [
        "./assets/images/factoryio-robot-process-poster.jpg",
        "./assets/images/smart-factory-web-twin-io.png",
        "./assets/images/smart-factory-dashboard.png",
        "./assets/images/smart-factory-plc-addresses.png"
      ],
      youtubeUrl: "https://www.youtube.com/watch?v=xNjqt9xNdQY",
      summary:
        "Factory I/O로 로봇 공정을 구성하고, PLC 신호 흐름과 웹 화면 표현을 연결해 제조 공정 상태를 설명 가능하게 보여주는 프로젝트입니다.",
      problem:
        "로봇 공정 시뮬레이션은 영상만 보여주면 장비 동선은 보이지만, 어떤 신호가 공정 상태를 바꾸는지 설명하기 어렵습니다. 그래서 Factory I/O 공정, PLC 신호, 웹 상태 화면을 한 흐름으로 묶어 검증 가능한 시연 형태로 정리했습니다.",
      architecture: ["Factory I/O 공정", "PLC 신호", "상태 매핑", "웹 공정 화면", "영상 검증"],
      buildSteps: [
        "Factory I/O에서 컨베이어, 로봇, 설비 동선이 보이는 공정 레이아웃 구성",
        "PLC 신호를 공정 상태명과 주소 단위로 정리해 웹 화면에서 추적 가능하게 구성",
        "웹 화면에는 공정 흐름, I/O 상태, 품질 지표를 분리해 검토자가 빠르게 읽을 수 있게 배치",
        "YouTube 영상과 상세 갤러리를 연결해 실제 동작 증거를 바로 확인 가능하게 구성"
      ],
      challenges: [
        {
          problem: "시뮬레이션 영상만으로는 PLC와 웹 화면의 관계가 약해 보임",
          solution: "PLC 주소록과 웹 상태 화면 캡처를 함께 배치해 신호-상태 연결을 증거로 보강"
        },
        {
          problem: "공정 레이아웃이 복잡해 한 장면에서 흐름을 읽기 어려움",
          solution: "대표 썸네일은 전체 공정, 상세 갤러리는 PLC·대시보드·웹 트윈으로 분리"
        }
      ],
      evidence: [
        {
          label: "Factory I/O 시연 영상",
          value: "로봇 공정 레이아웃과 설비 동선을 실제 재생 가능한 영상으로 제공"
        },
        {
          label: "PLC 주소 매핑 화면",
          value: "CMD_START, STS_PROCESS, STS_WEIGHT 같은 상태/명령 태그를 주소와 함께 제시"
        },
        {
          label: "웹 공정 화면",
          value: "SCADA/HMI 대신 웹 UI로 공정 흐름과 상태를 보여주는 구현 증거"
        }
      ],
      metrics: [
        { label: "Factory I/O", value: "로봇 공정 시뮬레이션" },
        { label: "PLC Signal", value: "주소·상태 매핑" },
        { label: "Web View", value: "공정 흐름 시각화" },
        { label: "Demo", value: "영상 검증 가능" }
      ],
      rolePoints: [
        "Factory I/O 기반 로봇 공정 레이아웃 구성",
        "PLC 신호 흐름을 공정 상태 표현과 연결",
        "웹 화면에서 시뮬레이션 상태를 이해할 수 있도록 정리"
      ],
      scopeNotes: [
        "초점은 Factory I/O 로봇 공정 시뮬레이션과 웹 기반 상태 표현",
        "SCADA/HMI가 아니라 웹 화면으로 공정 흐름을 보여주는 방식",
        "영상에서 전체 공정 동선과 설비 배치를 바로 확인 가능"
      ],
      results: [
        "Factory I/O 기반 로봇 공정 시뮬레이션을 대표 썸네일로 정리",
        "PLC 신호와 웹 화면 흐름을 함께 이해할 수 있게 구성",
        "로봇 공정 레이아웃과 장비 동선을 영상으로 확인 가능"
      ],
      stack: ["Factory I/O", "PLC", "Robot", "React", "Digital Twin"],
      links: [
        {
          label: "GitHub",
          url: "https://github.com/wjdtjdwo0609-cyber/smart-factory-dashboard",
          icon: "code-2"
        }
      ]
    },
    {
      id: "vision-robot-plc-digital-twin",
      title: "Vision · Robot · PLC Digital Twin",
      subtitle: "비전 학습, 로봇 티칭, PLC 신호, 웹 디지털 트윈을 연결한 최종 프로젝트",
      domain: "Smart Factory",
      visibility: "public",
      maturity: "Case study",
      featured: true,
      priority: 2,
      tests: 1,
      image: "./assets/images/vision-robot-plc-digital-twin-poster.jpg",
      videoPoster: "./assets/images/vision-robot-plc-digital-twin-poster.jpg",
      gallery: [
        "./assets/images/vision-r2-quality-detection-original.jpg",
        "./assets/images/vision-depth-pose-original.jpg",
        "./assets/images/intel5-vision-robot-gui-summary.jpg",
        "./assets/images/smart-factory-process-layout.png",
        "./assets/images/smart-factory-plc-addresses.png",
        "./assets/images/smart-factory-web-twin-io.png",
        "./assets/images/smart-factory-quality-analysis.png",
        "./assets/images/pickline-preview.png",
        "./assets/images/loadcell-capture.jpg"
      ],
      youtubeUrl: "https://www.youtube.com/watch?v=2opqmbzk43I",
      summary:
        "비전 모델 학습으로 대상 인식 흐름을 만들고, 로봇 티칭과 PLC 신호 연동, 웹 기반 디지털 트윈 화면을 묶어 실제 공정을 시연한 스마트팩토리 프로젝트입니다.",
      problem:
        "비전, 로봇, PLC, 웹 화면이 각각 따로 동작하면 최종 프로젝트처럼 보여도 시스템 통합 역량이 잘 드러나지 않습니다. 이 프로젝트는 인식 결과, 로봇 티칭 동작, PLC 신호, 웹 디지털 트윈을 하나의 공정 흐름으로 연결해 실제 장비와 화면이 같이 설명되도록 만든 사례입니다.",
      architecture: ["Vision Training", "Detection Result", "Robot Teaching", "PLC Signal", "Web Digital Twin", "Demo Video"],
      buildSteps: [
        "VISION2 / ROBOT2 GUI에서 ROI, confidence, 8pin/12pin 판정 결과가 보이도록 비전 검출 화면을 구성",
        "Robot2 fixed-pose teaching GUI에서 집는 위치, 놓는 위치, HOME pose를 저장하고 실제 셀 배출 동작에 재사용",
        "Robot3 loadcell teaching GUI에서 컨베이어 픽업, 로드셀 투입/재픽업, 8pin/12pin/reject bin 위치를 pose 파일로 관리",
        "PLC 래더 작성이 아니라 PLC 신호를 웹 상태, 로봇 동작, 공정 단계와 연결하는 통합 흐름을 담당",
        "웹 디지털 트윈 화면에 입력, 출력, 릴레이, 공정 단계, 로봇 셀 상태가 보이도록 구성",
        "최종 영상에서는 실제 장비 셀과 웹 화면을 함께 보여줘 검토자가 동작 증거를 확인할 수 있게 구성"
      ],
      challenges: [
        {
          problem: "비전 인식 결과와 로봇 동작이 따로 보이면 통합 프로젝트의 설득력이 떨어짐",
          solution: "인식 결과를 공정 판단 값으로 정리하고, 로봇 티칭 동작과 PLC 신호 흐름에 맞춰 시연 순서를 구성"
        },
        {
          problem: "비전 좌표를 바로 로봇 좌표로 넘기면 depth 노이즈와 좌표계 오차 때문에 실제 셀 동작 안정성이 떨어질 수 있음",
          solution: "R1은 호모그래피 기반 XY 변환, R2는 스토퍼 고정 위치와 티칭 pose를 사용하는 fixed-pose 방식으로 분리"
        },
        {
          problem: "PLC를 했다고 쓰면 래더 작성까지 한 것처럼 오해될 수 있음",
          solution: "상세 보기에서 직접 수행 범위와 제외 범위를 분리해 PLC 신호 연동 중심으로 명확히 표기"
        },
        {
          problem: "SCADA/HMI 없이 공정 상태를 보여줘야 함",
          solution: "웹 디지털 트윈을 상태 표시 화면으로 설계해 I/O, 공정 단계, 품질 지표를 한 화면에서 설명"
        }
      ],
      evidence: [
        {
          label: "최종 시연 영상",
          value: "비전, 로봇, PLC 신호, 웹 디지털 트윈이 함께 등장하는 결과물"
        },
        {
          label: "실제 비전 검출 원본 캡처",
          value: "VISION2 / ROBOT2 GUI에서 ROI, confidence, REJECT/IGNORE 판정, RealSense 카메라 선택 상태를 함께 확인 가능"
        },
        {
          label: "Depth / pose 실험 캡처",
          value: "RGB 검출 화면과 depth map을 함께 띄워 X/Y/Z(mm) 및 자세 추정 흐름을 검증"
        },
        {
          label: "로봇 티칭 GUI 구현",
          value: "집는 위치, 놓는 위치, HOME pose 저장 로직과 fixed_poses_r2.yaml / fixed_poses_r3.yaml 좌표 파일로 증거 보강"
        },
        {
          label: "공정 현황 화면",
          value: "입력/출력/릴레이와 로봇 셀 상태를 웹 화면에서 확인 가능"
        },
        {
          label: "PLC 주소록",
          value: "태그명, 주소, 설명을 분리해 신호 연동 범위를 검토 가능하게 제시"
        },
        {
          label: "품질 분석 화면",
          value: "불량률, 무게, SPC 관리도 등 생산 데이터 표현까지 연결"
        }
      ],
      metrics: [
        { label: "Vision", value: "학습·인식 흐름" },
        { label: "Robot", value: "티칭·동작 조정" },
        { label: "PLC", value: "신호 연동" },
        { label: "Web Twin", value: "상태 시각화" }
      ],
      rolePoints: [
        "비전 학습과 인식 결과를 공정 판단 흐름에 연결",
        "로봇 티칭 GUI와 fixed pose 파일을 통해 실제 집기/놓기/HOME 위치를 저장하고 동작 흐름 조정",
        "PLC 신호를 로봇 동작 및 웹 디지털 트윈 상태 표현과 연동",
        "영상에서 실제 장비와 웹 화면의 관계가 보이도록 시연 구성"
      ],
      scopeNotes: [
        "직접 수행 범위: 비전 학습, 로봇 티칭, PLC 신호 연동, 웹 디지털 트윈 구현",
        "제외 범위: PLC 래더 작성, SCADA/HMI 구현",
        "티칭 근거: step24_auto_pick_gui.py, step30_robot3_teaching_gui.py, fixed_poses_r2.yaml, fixed_poses_r3.yaml",
        "표현 방식: SCADA/HMI 대신 웹 화면으로 공정 상태와 흐름을 시각화"
      ],
      results: [
        "8pin/12pin 검출, confidence 판정, REJECT/IGNORE 판단 흐름을 실제 GUI 캡처로 제시",
        "로봇 티칭 기반 fixed pose 동작과 PLC 신호 연동을 함께 시연",
        "웹 디지털 트윈 화면으로 장비 상태와 공정 흐름을 확인 가능"
      ],
      stack: ["Python", "OpenCV", "Vision Training", "Robot Teaching", "PLC Signal", "Web Digital Twin"],
      links: [
        {
          label: "Dashboard",
          url: "https://github.com/wjdtjdwo0609-cyber/smart-factory-dashboard",
          icon: "code-2"
        },
        {
          label: "Toolkit",
          url: "https://github.com/wjdtjdwo0609-cyber/pickline-toolkit",
          icon: "code-2"
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
      priority: 3,
      tests: 16,
      image: "./assets/images/dockerros-web-simulator-poster.jpg",
      video: "",
      videoPoster: "./assets/images/dockerros-web-simulator-poster.jpg",
      gallery: [
        "./assets/images/dockerros-web-simulator-overview.jpg",
        "./assets/images/dockerros-web-simulator-poster.jpg"
      ],
      youtubeUrl: "https://www.youtube.com/watch?v=3c9PQeWwu58&t=463s",
      summary:
        "무거운 로봇 시뮬레이션을 브라우저에서 확인 가능한 데모와 ROS2 학습 환경으로 나누고, 디지털 트윈 장면까지 영상에서 바로 확인할 수 있게 정리한 프로젝트입니다.",
      problem:
        "ROS2, Gazebo, 로봇 모델, PLC 연동을 한 번에 설치해야 하는 구조는 포트폴리오 검토자가 바로 실행해 보기 어렵습니다. 그래서 무거운 로봇 실행 환경과 웹 데모를 분리하고, 브라우저에서 먼저 로봇 시뮬레이션과 디지털 트윈 흐름을 확인할 수 있게 만들었습니다.",
      architecture: ["Browser Demo", "Three.js Robot View", "OPC UA Adapter", "WebSocket", "PLC / GX Simulator", "ROS2 Native Path"],
      buildSteps: [
        "Three.js/WebGL 기반 웹 시뮬레이터로 로봇 장면을 브라우저에서 확인 가능하게 구성",
        "Indy7, UR, Panda, Fanuc 등 여러 로봇 모델을 학습·시연용으로 정리",
        "OPC UA와 WebSocket 어댑터를 두어 PLC 연동 흐름을 웹 시뮬레이터와 분리",
        "ROS2 네이티브 실행 경로와 웹 데모 경로를 나눠 무거운 의존성 문제를 낮춤"
      ],
      challenges: [
        {
          problem: "로봇 시뮬레이터가 무거워서 채용자가 바로 실행하기 어려움",
          solution: "웹 데모와 ROS2 네이티브 실행 경로를 분리해 브라우저에서 먼저 결과를 볼 수 있게 구성"
        },
        {
          problem: "PLC 연동은 OS, Python 버전, 포트, 실행 순서에 민감함",
          solution: "OPC UA 4840, WebSocket 9091, Python 3.12, 실행 순서를 README와 어댑터 구조로 명시"
        },
        {
          problem: "영상 썸네일이 검은 여백 위주라 결과물이 약해 보임",
          solution: "로컬 원본 영상에서 웹 디지털 트윈 화면이 잘 보이는 프레임을 추출해 대표 이미지로 교체"
        }
      ],
      evidence: [
        {
          label: "웹 시뮬레이터 화면",
          value: "대시보드와 3D 로봇 시뮬레이션을 같은 화면에서 확인 가능"
        },
        {
          label: "OPC UA / WebSocket 경로",
          value: "PLC와 브라우저 사이를 어댑터로 분리한 구조"
        },
        {
          label: "README 실행 문서",
          value: "웹 데모, PLC 연동, ROS2 실행 경로를 분리해 설명"
        }
      ],
      metrics: [
        { label: "WebGL", value: "브라우저 시뮬레이션" },
        { label: "ROS2", value: "네이티브 학습 경로" },
        { label: "OPC UA", value: "PLC 연동 어댑터" },
        { label: "16 tests", value: "검증 항목" }
      ],
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
          icon: "code-2"
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
      priority: 7,
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
          icon: "code-2"
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
      priority: 5,
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
          icon: "code-2"
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
      priority: 6,
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
          icon: "code-2"
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
      priority: 8,
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
      priority: 9,
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
          icon: "code-2"
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
      priority: 10,
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
      priority: 4,
      tests: 31,
      image: "",
      videoPoster: "./assets/images/koreaarmyquality-demo-poster.jpg",
      gallery: [
        "./assets/images/koreaarmyquality-demo-poster.jpg"
      ],
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
          icon: "code-2"
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
          icon: "code-2"
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
