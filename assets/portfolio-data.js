window.PORTFOLIO_SEED = {
  "version": 2,
  "profile": {
    "name": "정성재",
    "role": "Full-stack AI · Robotics · Industrial DX Builder",
    "summary": "상권분석 서비스 장사OS와 비전·로봇·PLC 프로젝트를 만들었습니다. 필요한 기술을 배우고, 직접 실행하며 만난 문제와 개선 과정을 기록합니다.",
    "github": "https://github.com/wjdtjdwo0609-cyber",
    "resume": "./assets/docs/sungjae-korea-deep-learning-portfolio.pdf",
    "pdfs": [
      {
        "label": "Document AI / FDE",
        "file": "./assets/docs/sungjae-korea-deep-learning-portfolio.pdf"
      },
      {
        "label": "Smart Factory / Robotics",
        "file": "./assets/docs/sungjae-dongyeon-snt-research.pdf"
      },
      {
        "label": "Product / Automation",
        "file": "./assets/docs/sungjae-team-reboott-portfolio.pdf"
      }
    ],
    "updatedAt": "2026-10-26",
    "website": "https://wjdtjdwo0609-cyber.github.io/sungjae-portfolio/",
    "awards": [
      {
        "title": "부산지방경찰청장 표창",
        "issuer": "부산지방경찰청장",
        "date": "2016.08.22",
        "scope": "개인 표창 · 영사관 화재 진화 공로",
        "certificate": "./assets/images/records/busan-police-commendation.jpg"
      },
      {
        "title": "생명자원소재 아이디어공모전 우수상",
        "issuer": "동아대학교 생명자원과학대학장",
        "date": "2021.01.26",
        "scope": "팀 수상",
        "certificate": "./assets/images/records/bio-materials-idea-prize.jpg"
      },
      {
        "title": "제1회 BIO Leaders 경진대회 입상",
        "issuer": "동아대학교 생명자원과학대학장",
        "date": "2015.11.06",
        "scope": "수상자 정성재",
        "certificate": ""
      }
    ],
    "education": "대한상공회의소 부산인력개발원 · [인텔] AI 융합 DX 마스터 클래스(5회차) · 2025.11.13~2026.05.22 · 900시간 수료",
    "revision": "2026-10-26-ip-evidence"
  },
  "domains": [
    "All",
    "Smart Factory",
    "Robotics",
    "AI Agent",
    "Document AI",
    "Automation",
    "Product",
    "Game"
  ],
  "projects": [
    {
      "id": "jangsa-simulator",
      "title": "장사OS — AI 상권분석 서비스",
      "subtitle": "주소·지도에서 시작해 상권 정보를 살펴보는 창업 지원 서비스",
      "domain": "Product",
      "visibility": "public",
      "maturity": "Live service",
      "featured": true,
      "priority": 1,
      "tests": 0,
      "image": "./assets/images/jangsaos-current-input-20261025.png",
      "imageFit": "contain",
      "visual": "",
      "video": "",
      "videoPoster": "",
      "gallery": [
        "./assets/images/jangsaos-current-home-20261025.png"
      ],
      "youtubeUrl": "",
      "summary": "창업을 준비하는 사람이 지역과 업종을 검토할 수 있도록 상권분석 서비스를 개발했습니다. 공공데이터와 지도, 분석 화면을 연결하고, 입력부터 결과 확인까지 하나의 서비스로 구성해 왔습니다.",
      "problem": "창업 후보지를 판단할 때 매출 추정, 경쟁 점포, 유동인구 같은 정보가 여러 곳에 나뉘어 있습니다. 주소와 지도를 출발점으로 관련 정보를 함께 살펴볼 수 있는 흐름을 만들고자 했습니다.",
      "period": "약 9개월 개발·개선",
      "collaboration": "개인 프로젝트",
      "learning": "분석 기능의 구현과 사용자가 판단에 활용할 수 있는 서비스 구성은 함께 검토해야 했습니다. 데이터의 의미, 입력 방식, 결과 설명을 연결하는 일이 제품 개발의 중요한 부분이었습니다.",
      "limitations": "화면과 구현 자료는 기능의 근거입니다. 분석의 예측 정확도나 고객의 매출 개선 효과는 별도의 평가로 확인해야 합니다.",
      "nextSteps": "실제 창업 준비자가 후보 지역을 비교하는 과정을 관찰하고, 결과를 이해하기 어려운 지점과 반복해서 쓰는 기능을 확인하고자 합니다.",
      "mediaNotes": [
        {
          "src": "./assets/images/jangsaos-current-input-20261025.png",
          "caption": "상권분석 입력·지도 선택 화면",
          "capturedAt": "2026-10-25",
          "version": "공개 서비스"
        },
        {
          "src": "./assets/images/jangsaos-current-home-20261025.png",
          "caption": "장사OS 공개 홈 화면",
          "capturedAt": "2026-10-25",
          "version": "공개 서비스"
        }
      ],
      "architecture": [
        "주소·지도 입력",
        "상권 데이터 조회",
        "분석 API",
        "상권·키워드 화면",
        "리포트"
      ],
      "buildSteps": [
        "주소와 지도에서 분석할 지역을 선택하는 입력 화면 구성",
        "상권 데이터와 분석 API를 연결하고 결과 화면으로 표현",
        "키워드 분석·지도·리포트를 서비스의 사용자 흐름으로 연결",
        "공개 서비스의 화면과 이전 버전의 자료를 구분해 개선 과정 기록"
      ],
      "challenges": [
        {
          "label": "AI 추정값과 장소 검색 결과를 섞어 재보정하면서 화면값과 검증 표시가 달라질 위험",
          "value": "개발 기록에서 두 값의 출처를 분리하고, 검색 결과를 화면 표시 기준으로 유지하도록 정리했습니다. AI 추정과의 차이는 참고 정보로 남깁니다."
        },
        {
          "label": "코드에 있는 기능과 사용자가 실제 사용할 수 있는 기능의 범위가 다름",
          "value": "구현 문서와 공개 화면을 대조하고, 화면에 연결된 기능을 기준으로 설명 범위를 정리했습니다."
        }
      ],
      "evidence": [
        {
          "label": "현재 입력 화면",
          "value": "2026-10-25 공개 화면에서 주소·지도 선택과 키워드 분석 진입을 확인할 수 있습니다."
        },
        {
          "label": "개발 기록",
          "value": "sangkwon 저장소의 README와 기능 문서에 상권·지도·키워드·리포트 구현 범위가 정리되어 있습니다."
        },
        {
          "label": "일관성 개선 기록",
          "value": "경쟁 점포의 중복 보정을 제거하고 화면값·검증 표시를 같은 출처로 맞춘 변경 기록과 테스트가 남아 있습니다."
        },
        {
          "label": "특허로 접수내역 화면",
          "value": "2026.04.04 접수, 해당 출원번호와 접수완료 표시를 2026-05-31 저장 화면에서 확인할 수 있습니다."
        }
      ],
      "metrics": [
        {
          "label": "제품",
          "value": "공개 웹 서비스"
        },
        {
          "label": "흐름",
          "value": "주소·지도 → 분석"
        },
        {
          "label": "자료",
          "value": "최신 공개 화면"
        },
        {
          "label": "개발",
          "value": "데이터·API·UI 연결"
        }
      ],
      "rolePoints": [
        "서비스 기획과 사용자 입력·분석 결과 화면 구성",
        "상권 데이터·분석 API와 웹 화면 연결",
        "공개 서비스 개발과 버전별 개선 내용 정리"
      ],
      "scopeNotes": [
        "공개 URL: jangsaos.com",
        "현재 대표 이미지는 2026-10-25 공개 화면",
        "과거 장사 시뮬레이터 자료와 현재 상권분석 서비스는 구분"
      ],
      "results": [
        "장사OS를 공개 URL에서 접근 가능한 서비스로 구현",
        "상권분석 입력과 지도·키워드 분석 화면 구성",
        "데이터 조회부터 분석 결과 표현까지 서비스 흐름 연결"
      ],
      "stack": [
        "React",
        "TypeScript",
        "지도 API",
        "공공데이터",
        "분석 API",
        "PostgreSQL"
      ],
      "links": [
        {
          "label": "서비스",
          "url": "https://jangsaos.com/",
          "icon": "external-link"
        }
      ],
      "patents": [
        {
          "title": "AI 에이전트를 이용한 상권분석",
          "number": "10-2026-0061383",
          "status": "특허출원 접수",
          "filedAt": "2026.04.04",
          "evidence": "./assets/images/records/patent-filings-received-20260531.png"
        }
      ]
    },
    {
      "id": "vision-robot-plc-digital-twin",
      "title": "비전·로봇·PLC — 공정 통합 프로젝트",
      "subtitle": "비전 학습, 로봇 티칭, PLC 신호, 웹 대시보드·디지털 트윈을 연결한 최종 프로젝트",
      "domain": "Smart Factory",
      "visibility": "public",
      "maturity": "Case study",
      "featured": true,
      "priority": 2,
      "tests": 0,
      "image": "./assets/images/vision-r2-quality-detection-original.jpg",
      "imageFit": "cover",
      "visual": "",
      "video": "",
      "videoPoster": "./assets/images/vision-robot-plc-digital-twin-poster.jpg",
      "gallery": [
        "./assets/images/vision-r2-quality-detection-original.jpg",
        "./assets/images/vision-depth-pose-original.jpg",
        "./assets/images/intel5-vision-robot-gui-summary.jpg",
        "./assets/images/smart-factory-digital-twin-user-capture.png",
        "./assets/images/digital-twin-v4.png"
      ],
      "youtubeUrl": "https://www.youtube.com/watch?v=2opqmbzk43I",
      "summary": "비전 모델 학습으로 대상 인식 흐름을 만들고, 로봇 티칭과 PLC 신호 연동, 웹 기반 대시보드·디지털 트윈 화면을 묶어 실제 공정을 시연한 스마트팩토리 프로젝트입니다.",
      "problem": "검출 결과가 로봇 동작과 공정 상태로 이어져야 실제 작업을 설명할 수 있습니다. 비전 인식, 로봇 티칭 좌표, PLC 신호, 웹 상태 화면을 연결하는 것이 목표였습니다.",
      "period": "약 8주 · 2026.05.21 발표",
      "collaboration": "부산인력개발원 · 팀 정공시스템",
      "learning": "인식 모델의 출력과 로봇이 실행할 좌표는 서로 다른 문제였습니다. 장비 조건에 맞춰 좌표 변환과 고정 pose 방식을 선택하고 공정 신호와 연결해야 했습니다.",
      "limitations": "티칭 좌표를 사용하는 동작과 학습 모델의 자율 제어는 구분합니다. 화면의 confidence 값은 전체 검출 정확도나 공정 성공률을 뜻하지 않습니다.",
      "nextSteps": "조명·물체 위치 등 조건을 고정한 반복 평가를 남기고, 검출 오류와 집기 실패를 나누어 원인을 확인하고자 합니다.",
      "mediaNotes": [
        {
          "src": "./assets/images/vision-r2-quality-detection-original.jpg",
          "caption": "VISION2 / ROBOT2 검출·판정 GUI",
          "capturedAt": "원본 촬영일 미상",
          "version": "검출 + fixed-pose 티칭"
        },
        {
          "src": "./assets/images/vision-depth-pose-original.jpg",
          "caption": "RGB·depth와 좌표 추정 실험",
          "capturedAt": "원본 촬영일 미상",
          "version": "좌표 추정 실험"
        },
        {
          "src": "./assets/images/intel5-vision-robot-gui-summary.jpg",
          "caption": "비전·로봇 GUI 구성",
          "capturedAt": "원본 촬영일 미상",
          "version": "프로젝트 기록"
        }
      ],
      "architecture": [
        "Vision Training",
        "Detection Result",
        "Robot Teaching",
        "PLC Signal",
        "Web Digital Twin",
        "Demo Video"
      ],
      "buildSteps": [
        "VISION2 / ROBOT2 GUI에서 ROI, confidence, 8pin/12pin 판정 결과가 보이도록 비전 검출 화면을 구성",
        "Robot2 fixed-pose teaching GUI에서 집는 위치, 놓는 위치, HOME pose를 저장하고 실제 셀 배출 동작에 재사용",
        "Robot3 loadcell teaching GUI에서 컨베이어 픽업, 로드셀 투입/재픽업, 8pin/12pin/reject bin 위치를 pose 파일로 관리",
        "PLC 래더 작성이 아니라 PLC 신호를 웹 상태, 로봇 동작, 공정 단계와 연결하는 통합 흐름을 담당",
        "웹 디지털 트윈 화면에 입력, 출력, 릴레이, 공정 단계, 로봇 셀 상태가 보이도록 구성",
        "최종 영상에서는 실제 장비 셀과 웹 화면을 함께 보여줘 검토자가 동작 증거를 확인할 수 있게 구성"
      ],
      "challenges": [
        {
          "label": "depth 노이즈와 좌표계 차이로 로봇 목표 위치를 안정적으로 정하기 어려움",
          "value": "R1의 호모그래피 기반 XY 변환과 R2의 스토퍼 고정 위치·티칭 pose 방식을 분리했습니다."
        },
        {
          "label": "장비 동작과 웹 화면에서 보는 공정 상태를 맞춰야 함",
          "value": "PLC I/O·릴레이·공정 단계와 로봇 셀 상태를 웹 디지털 트윈에 연결했습니다."
        }
      ],
      "evidence": [
        {
          "label": "팀 발표자료 11쪽",
          "value": "정성재의 역할을 Vision1·2 프로그래밍 및 PLC–로봇–웹 연동으로 명시합니다."
        },
        {
          "label": "최종 시연 영상",
          "value": "비전, 로봇, PLC 신호, 웹 디지털 트윈이 함께 등장하는 결과물"
        },
        {
          "label": "실제 비전 검출 원본 캡처",
          "value": "VISION2 / ROBOT2 GUI에서 ROI, confidence, REJECT/IGNORE 판정, RealSense 카메라 선택 상태를 함께 확인 가능"
        },
        {
          "label": "Depth / pose 실험 캡처",
          "value": "RGB 검출 화면과 depth map을 함께 띄워 X/Y/Z(mm) 및 자세 추정 흐름을 검증"
        },
        {
          "label": "로봇 티칭 GUI 구현",
          "value": "집는 위치, 놓는 위치, HOME pose 저장 로직과 fixed_poses_r2.yaml / fixed_poses_r3.yaml 좌표 파일로 증거 보강"
        },
        {
          "label": "공정 현황 화면",
          "value": "입력/출력/릴레이와 로봇 셀 상태를 웹 화면에서 확인 가능"
        },
        {
          "label": "PLC 주소록",
          "value": "태그명, 주소, 설명을 분리해 신호 연동 범위를 검토 가능하게 제시"
        },
        {
          "label": "품질 분석 화면",
          "value": "불량률, 무게, SPC 관리도 등 생산 데이터 표현까지 연결"
        }
      ],
      "metrics": [
        {
          "label": "Vision",
          "value": "학습·인식 흐름"
        },
        {
          "label": "Robot",
          "value": "티칭·동작 조정"
        },
        {
          "label": "PLC",
          "value": "신호 연동"
        },
        {
          "label": "Web Twin",
          "value": "상태 시각화"
        }
      ],
      "rolePoints": [
        "Vision1·Vision2 프로그래밍과 비전 학습·검출 흐름 구현",
        "PLC–로봇–웹 연동",
        "웹 기반 공정 상태·디지털 트윈 화면 구성"
      ],
      "scopeNotes": [
        "팀 프로젝트 전체 범위: 소켓 분류 공정, 로봇, PLC, SCADA, 웹 연동",
        "본인 역할: 발표자료 11쪽의 Vision1·2 프로그래밍 및 PLC–로봇–웹 연동",
        "PLC 래더·SCADA와 전체 장비 제작은 팀 내 담당 영역을 구분",
        "교육과정: 2025.11.13~2026.05.22, 6개월·900시간 수료. 프로젝트 일정은 발표자료상 약 8주"
      ],
      "results": [
        "8pin/12pin 검출, confidence 판정, REJECT/IGNORE 판단 흐름을 실제 GUI 캡처로 제시",
        "로봇 티칭 기반 fixed pose 동작과 PLC 신호 연동을 함께 시연",
        "Smart Factory Dashboard & Digital Twin 화면으로 장비 상태와 공정 흐름을 확인 가능"
      ],
      "stack": [
        "Python",
        "OpenCV",
        "Vision Training",
        "Robot Teaching",
        "PLC Signal",
        "Web Digital Twin"
      ],
      "links": [
        {
          "label": "Dashboard",
          "url": "https://github.com/wjdtjdwo0609-cyber/smart-factory-dashboard",
          "icon": "code-2"
        },
        {
          "label": "Toolkit",
          "url": "https://github.com/wjdtjdwo0609-cyber/pickline-toolkit",
          "icon": "code-2"
        }
      ]
    },
    {
      "id": "robot-vla-pipeline",
      "title": "제3의 손 — 음성명령 기반 DOBOT/VLA",
      "subtitle": "일상 발화를 로봇 작업 명령으로 연결한 팀 프로젝트 · 기획·PM 및 음성 모듈 담당",
      "domain": "Robotics",
      "visibility": "public",
      "maturity": "Experiment",
      "featured": false,
      "priority": 3,
      "tests": 0,
      "image": "./assets/images/vla-speech-instruction-slide.png",
      "imageFit": "contain",
      "visual": "",
      "video": "",
      "videoPoster": "",
      "gallery": [
        "./assets/images/vla-motion-action-sequence.png",
        "./assets/images/vla-dataset-contact-sheet.png",
        "./assets/images/vla-motion-dataset-sequence.jpg"
      ],
      "youtubeUrl": "",
      "summary": "책상 위 물건을 음성으로 요청하는 로봇 비서를 팀으로 구현했습니다. 기획·PM과 음성 모듈을 맡아 일상 발화를 작업 명령으로 바꾸고, VLA 추론과 로봇 실행 흐름에 연결했습니다.",
      "problem": "사용자의 “배고파”, “목마르다” 같은 일상 표현은 학습 모델이 실행하는 작업 명령과 다릅니다. 말의 의도를 물체·작업으로 바꾸고 로봇 실행 단계에 전달하는 흐름이 필요했습니다.",
      "period": "2026.05 · 12일 프로젝트",
      "collaboration": "부산인력개발원 · 5인 팀 제3의 손",
      "learning": "자연스러운 말의 의미와 모델이 학습한 작업 명령을 맞춰야 했습니다. 음성 인식·의도 파싱·로봇 실행을 나누고 팀원의 데이터·하드웨어 조건과 맞추는 일이 중요했습니다.",
      "limitations": "4축 로봇과 그리퍼의 동작 범위, 짧은 기간의 데이터 수집에 제약이 있었습니다. 발표자료의 개선 표현과 별개로 자율 동작 성공률은 조건과 반복 횟수가 있는 평가 기록으로 확인해야 합니다.",
      "nextSteps": "같은 발화·물체·배치 조건에서 음성 명령 변환과 실제 집기 결과를 따로 평가하고, 실패가 어느 단계에서 발생하는지 기록하고자 합니다.",
      "mediaNotes": [
        {
          "src": "./assets/images/vla-speech-instruction-slide.png",
          "caption": "음성 입력·의도 파싱·VLA 작업 명령 연결",
          "capturedAt": "2026년 발표자료",
          "version": "제3의 손 · 17쪽"
        },
        {
          "src": "./assets/images/vla-motion-action-sequence.png",
          "caption": "top·wrist 관측과 행동 데이터 수집 시퀀스",
          "capturedAt": "원본 촬영일 미상",
          "version": "데이터 수집"
        },
        {
          "src": "./assets/images/vla-dataset-contact-sheet.png",
          "caption": "학습 데이터 관측 프레임 모음",
          "capturedAt": "원본 촬영일 미상",
          "version": "데이터셋 기록"
        },
        {
          "src": "./assets/images/vla-motion-dataset-sequence.jpg",
          "caption": "로봇 동작·데이터 수집 기록",
          "capturedAt": "원본 촬영일 미상",
          "version": "데이터 수집"
        }
      ],
      "architecture": [
        "음성 입력",
        "STT",
        "의도·물체 파싱",
        "VLA 작업 명령",
        "카메라·로봇 상태",
        "DOBOT 실행"
      ],
      "buildSteps": [
        "팀의 12일 일정 안에서 기획·시연 목표와 역할을 정리",
        "STT로 음성을 텍스트로 바꾸고 LLM으로 의도·대상 물체를 파싱",
        "“배고프다”→과자→“pick up the snack”처럼 작업 명령으로 연결",
        "하드웨어·데이터 수집·학습 담당 팀원과 음성 모듈 통합"
      ],
      "challenges": [
        {
          "label": "일상 표현을 VLA가 처리할 수 있는 작업 명령으로 연결해야 함",
          "value": "음성 인식과 의도 파싱을 나누고, 물체별 영문 작업 명령으로 변환하는 흐름을 구성했습니다."
        },
        {
          "label": "팀 공통 과제: 적은 데이터와 모델·하드웨어 제약",
          "value": "발표자료에 Pi0-FAST와 Pi0의 차이, 데이터 수집 제약, 카메라 조건, 4축 로봇의 동작 한계를 함께 정리했습니다."
        }
      ],
      "evidence": [
        {
          "label": "역할·일정",
          "value": "팀 발표자료 4쪽에 정성재의 기획·PM·음성 모듈 역할과 12일 일정이 명시되어 있습니다."
        },
        {
          "label": "음성 명령 흐름",
          "value": "팀 발표자료 14~17쪽에 음성 입력, STT, 의도 파싱, VLA 작업 명령 연결이 정리되어 있습니다."
        },
        {
          "label": "팀의 한계 분석",
          "value": "발표자료 25~27쪽에 로봇 자유도, 데이터 수집량, 모델 비교의 한계를 기록했습니다."
        }
      ],
      "metrics": [
        {
          "label": "담당",
          "value": "기획·PM"
        },
        {
          "label": "개발",
          "value": "음성 모듈"
        },
        {
          "label": "협업",
          "value": "5인 팀"
        },
        {
          "label": "기간",
          "value": "12일"
        }
      ],
      "rolePoints": [
        "책상 위 음성 로봇 비서 프로젝트 기획·PM",
        "음성 모듈 개발과 일상 발화→작업 명령 변환 흐름 구성",
        "음성 모듈을 팀의 VLA 추론·로봇 실행 흐름에 통합"
      ],
      "scopeNotes": [
        "개인 담당: 기획·PM 및 음성 모듈(팀 발표자료 4쪽)",
        "데이터 수집·모델 학습·하드웨어는 팀 전체 구현 범위로 구분",
        "관측·수집 이미지는 팀의 데이터 기록이며 개인 단독 학습 성과나 자율 제어 성공률로 표기하지 않음"
      ],
      "results": [
        "음성 입력을 의도·대상 물체와 작업 명령으로 바꾸는 모듈 구성",
        "팀의 VLA 추론·DOBOT 실행 파이프라인에 음성 인터페이스 통합",
        "팀 발표자료에 시스템 흐름과 하드웨어·데이터 제약 정리"
      ],
      "stack": [
        "Python",
        "음성 인식",
        "LLM 의도 파싱",
        "LeRobot",
        "Pi0",
        "DOBOT"
      ],
      "links": [
        {
          "label": "파이프라인 코드",
          "url": "https://github.com/wjdtjdwo0609-cyber/Dobot_VLM_VLA",
          "icon": "code-2"
        }
      ],
      "awards": [
        {
          "title": "2026 인텔 엣지 AI 실무 프로젝트발표회 최우수상",
          "issuer": "대한상공회의소 부산인력개발원장",
          "date": "2026.05.22",
          "scope": "팀 수상 · 제3의 손",
          "certificate": "./assets/images/records/vla-team-first-prize.jpg"
        }
      ]
    },
    {
      "id": "plc-ai-copilot",
      "title": "PLC AI Copilot / plcanalyze.xyz",
      "subtitle": "Mitsubishi MELSEC PLC 코드 생성·해석을 위한 웹 기반 산업 AI 서비스",
      "domain": "Smart Factory",
      "visibility": "public",
      "maturity": "Live demo",
      "featured": false,
      "priority": 11,
      "tests": 0,
      "image": "./assets/images/plcanalyze-home.png",
      "imageFit": "contain",
      "visual": "",
      "video": "",
      "videoPoster": "",
      "gallery": [
        "./assets/images/plcanalyze-home.png",
        "./assets/images/mes-opcua-bridge.png",
        "./assets/images/smart-factory-plc-addresses.png"
      ],
      "youtubeUrl": "",
      "summary": "자연어 시나리오를 PLC 로직으로 바꾸고, 기존 PLC 코드를 구역별로 분석해 현장 엔지니어가 이해 가능한 설명으로 돌려주는 라이브 웹 서비스입니다.",
      "problem": "일반 LLM은 Mitsubishi MELSEC 코드의 디바이스, 네트워크, 조건부 흐름, GX Works2·3 워크플로우를 정확히 이해하기 어렵습니다. 현장 엔지니어가 PLC 코드를 분석·수정하려면 도메인 특화 검색과 결과 검증 흐름이 필요했습니다.",
      "period": "",
      "collaboration": "",
      "learning": "",
      "limitations": "",
      "nextSteps": "",
      "mediaNotes": [],
      "architecture": [
        "React UI",
        "PLC Pattern Library",
        "BM25 / RAG",
        "Code Generator",
        "Code Explainer",
        "Live Demo"
      ],
      "buildSteps": [
        "PLC 코드 생성 화면과 코드 해석 화면을 분리해 사용자가 생성/분석 목적을 바로 선택하게 구성",
        "Mitsubishi MELSEC/GX Works2·3 중심으로 시작하고 Siemens, LS산전, Omron 선택 UI까지 고려",
        "BM25와 co-occurrence 기반 검색 힌트를 PLC 토큰 패턴에 맞춰 정리",
        "PLC 패턴 라이브러리와 트레이닝 데이터 로딩 상태가 화면에서 보이도록 구현",
        "실제 운영 링크(plcanalyze.xyz)로 채용자가 바로 접속해 볼 수 있게 구성"
      ],
      "challenges": [
        {
          "label": "산업 PLC 코드는 일반 웹 서비스보다 도메인 용어와 디바이스 주소 해석이 민감함",
          "value": "코드 생성, 코드 해석, 패턴 검색을 분리해 사용자가 결과를 단계별로 검토하게 설계"
        },
        {
          "label": "AI가 생성한 PLC 로직은 현장 적용 전 검토 가능성이 중요함",
          "value": "순서도, ST 코드, 설명을 함께 보여주는 구조로 엔지니어가 의도를 확인하게 구성"
        }
      ],
      "evidence": [
        {
          "label": "실행 화면",
          "value": "plcanalyze.xyz 홈/기능 화면을 직접 실행 캡처로 제공"
        },
        {
          "label": "라이브 데모",
          "value": "https://plcanalyze.xyz/ 에서 코드 생성·해석 흐름 확인 가능"
        },
        {
          "label": "지식재산 활동",
          "value": "AI 에이전트를 이용한 PLC 생성 및 해석 특허출원 접수 (출원번호: 10-2026-0061403)"
        },
        {
          "label": "특허로 접수내역 화면",
          "value": "2026.04.05 접수, 해당 출원번호와 접수완료 표시를 2026-05-31 저장 화면에서 확인할 수 있습니다."
        }
      ],
      "metrics": [
        {
          "label": "Live",
          "value": "plcanalyze.xyz"
        },
        {
          "label": "PLC",
          "value": "MELSEC 중심"
        },
        {
          "label": "AI",
          "value": "생성·해석"
        },
        {
          "label": "RAG",
          "value": "패턴 검색"
        }
      ],
      "rolePoints": [
        "PLC 코드 생성/해석 서비스 기획과 웹 화면 구성",
        "Mitsubishi MELSEC 중심의 PLC 패턴과 설명 흐름 정리",
        "산업 도메인 문제를 실제 사용 가능한 AI 웹 서비스로 제품화"
      ],
      "scopeNotes": [
        "직접 실행 화면을 대표 이미지와 갤러리에 배치",
        "지원 시 웹 포트폴리오 링크와 함께 별도 라이브 데모 링크로 제시 가능",
        "등록 단계가 아닌 특허출원 접수 사실로만 표기"
      ],
      "results": [
        "PLC 코드 생성과 코드 해석을 한 서비스에서 보여주는 라이브 데모 운영",
        "MELSEC/GX Works 계열 로직을 현장 엔지니어가 읽을 수 있는 설명형 결과로 전환",
        "AI 에이전트를 이용한 PLC 생성 및 해석 특허출원 접수 사실과 출원번호를 함께 정리"
      ],
      "stack": [
        "React",
        "TypeScript",
        "PLC",
        "MELSEC",
        "RAG",
        "BM25",
        "AI Agent"
      ],
      "links": [
        {
          "label": "Live Demo",
          "url": "https://plcanalyze.xyz/",
          "icon": "external-link"
        }
      ],
      "patents": [
        {
          "title": "AI 에이전트를 이용한 PLC 생성 및 해석",
          "number": "10-2026-0061403",
          "status": "특허출원 접수",
          "filedAt": "2026.04.05",
          "evidence": "./assets/images/records/patent-filings-received-20260531.png"
        }
      ]
    },
    {
      "id": "smart-factory-digital-twin",
      "title": "Factory I/O Robot Process Simulation",
      "subtitle": "Factory I/O에서 구현한 로봇 공정과 PLC 신호·웹 화면 연동",
      "domain": "Smart Factory",
      "visibility": "public",
      "maturity": "Case study",
      "featured": false,
      "priority": 13,
      "tests": 1,
      "image": "./assets/images/factoryio-robot-process-poster.jpg",
      "imageFit": "",
      "visual": "",
      "video": "",
      "videoPoster": "./assets/images/factoryio-robot-process-poster.jpg",
      "gallery": [
        "./assets/images/factoryio-robot-process-poster.jpg",
        "./assets/images/smart-factory-web-twin-io.png",
        "./assets/images/smart-factory-dashboard.png",
        "./assets/images/smart-factory-plc-addresses.png"
      ],
      "youtubeUrl": "https://www.youtube.com/watch?v=xNjqt9xNdQY",
      "summary": "Factory I/O로 로봇 공정을 구성하고, PLC 신호 흐름과 웹 화면 표현을 연결해 제조 공정 상태를 설명 가능하게 보여주는 프로젝트입니다.",
      "problem": "로봇 공정 시뮬레이션은 영상만 보여주면 장비 동선은 보이지만, 어떤 신호가 공정 상태를 바꾸는지 설명하기 어렵습니다. 그래서 Factory I/O 공정, PLC 신호, 웹 상태 화면을 한 흐름으로 묶어 검증 가능한 시연 형태로 정리했습니다.",
      "period": "",
      "collaboration": "",
      "learning": "",
      "limitations": "",
      "nextSteps": "",
      "mediaNotes": [],
      "architecture": [
        "Factory I/O 공정",
        "PLC 신호",
        "상태 매핑",
        "웹 공정 화면",
        "영상 검증"
      ],
      "buildSteps": [
        "Factory I/O에서 컨베이어, 로봇, 설비 동선이 보이는 공정 레이아웃 구성",
        "PLC 신호를 공정 상태명과 주소 단위로 정리해 웹 화면에서 추적 가능하게 구성",
        "웹 화면에는 공정 흐름, I/O 상태, 품질 지표를 분리해 검토자가 빠르게 읽을 수 있게 배치",
        "YouTube 영상과 상세 갤러리를 연결해 실제 동작 증거를 바로 확인 가능하게 구성"
      ],
      "challenges": [
        {
          "label": "시뮬레이션 영상만으로는 PLC와 웹 화면의 관계가 약해 보임",
          "value": "PLC 주소록과 웹 상태 화면 캡처를 함께 배치해 신호-상태 연결을 증거로 보강"
        },
        {
          "label": "공정 레이아웃이 복잡해 한 장면에서 흐름을 읽기 어려움",
          "value": "대표 썸네일은 전체 공정, 상세 갤러리는 PLC·대시보드·웹 트윈으로 분리"
        }
      ],
      "evidence": [
        {
          "label": "Factory I/O 시연 영상",
          "value": "로봇 공정 레이아웃과 설비 동선을 실제 재생 가능한 영상으로 제공"
        },
        {
          "label": "PLC 주소 매핑 화면",
          "value": "CMD_START, STS_PROCESS, STS_WEIGHT 같은 상태/명령 태그를 주소와 함께 제시"
        },
        {
          "label": "웹 공정 화면",
          "value": "SCADA/HMI 대신 웹 UI로 공정 흐름과 상태를 보여주는 구현 증거"
        }
      ],
      "metrics": [
        {
          "label": "Factory I/O",
          "value": "로봇 공정 시뮬레이션"
        },
        {
          "label": "PLC Signal",
          "value": "주소·상태 매핑"
        },
        {
          "label": "Web View",
          "value": "공정 흐름 시각화"
        },
        {
          "label": "Demo",
          "value": "영상 검증 가능"
        }
      ],
      "rolePoints": [
        "Factory I/O 기반 로봇 공정 레이아웃 구성",
        "PLC 신호 흐름을 공정 상태 표현과 연결",
        "웹 화면에서 시뮬레이션 상태를 이해할 수 있도록 정리"
      ],
      "scopeNotes": [
        "초점은 Factory I/O 로봇 공정 시뮬레이션과 웹 기반 상태 표현",
        "SCADA/HMI가 아니라 웹 화면으로 공정 흐름을 보여주는 방식",
        "영상에서 전체 공정 동선과 설비 배치를 바로 확인 가능"
      ],
      "results": [
        "Factory I/O 기반 로봇 공정 시뮬레이션을 대표 썸네일로 정리",
        "PLC 신호와 웹 화면 흐름을 함께 이해할 수 있게 구성",
        "로봇 공정 레이아웃과 장비 동선을 영상으로 확인 가능"
      ],
      "stack": [
        "Factory I/O",
        "PLC",
        "Robot",
        "React",
        "Digital Twin"
      ],
      "links": [
        {
          "label": "GitHub",
          "url": "https://github.com/wjdtjdwo0609-cyber/smart-factory-dashboard",
          "icon": "code-2"
        }
      ]
    },
    {
      "id": "mes-opcua-bridge",
      "title": "정공 MES / OPC UA Bridge",
      "subtitle": "PLC, OPC UA, Factory I/O, Supabase, React 대시보드를 연결한 경량 MES 브릿지",
      "domain": "Smart Factory",
      "visibility": "public",
      "maturity": "Case study",
      "featured": false,
      "priority": 15,
      "tests": 0,
      "image": "./assets/images/mes-opcua-bridge.png",
      "imageFit": "contain",
      "visual": "",
      "video": "",
      "videoPoster": "",
      "gallery": [
        "./assets/images/mes-opcua-bridge.png",
        "./assets/images/smart-factory-digital-twin-user-capture.png",
        "./assets/images/smart-factory-dashboard.png",
        "./assets/images/smart-factory-quality-analysis.png"
      ],
      "youtubeUrl": "",
      "summary": "현장 PC에서 PLC, OPC UA, Factory I/O, Supabase를 연결해 주문, 생산 상태, IO, 알람을 동기화하는 경량 MES/설비 데이터 브릿지입니다.",
      "problem": "MES 도입의 첫 장벽은 기존 설비와 업무 시스템 사이의 데이터 연결입니다. 현장 PC에서 안정적으로 실행되고, 운영자가 상태를 확인할 수 있는 작은 브릿지와 웹 대시보드가 필요했습니다.",
      "period": "",
      "collaboration": "",
      "learning": "",
      "limitations": "",
      "nextSteps": "",
      "mediaNotes": [],
      "architecture": [
        "PLC / MC Protocol",
        "OPC UA",
        "Python Bridge",
        "Supabase",
        "React Dashboard",
        "Operator View"
      ],
      "buildSteps": [
        "PLC/OPC UA 데이터를 Supabase 테이블과 Realtime 흐름으로 연결",
        "주문, 생산상태, IO, 알람 데이터를 React 대시보드 화면으로 재구성",
        "브릿지 설정, 재연결, 폴링 주기, 데이터 품질 문제를 문서화",
        "운영자가 PLC 주소와 생산 상태를 한 화면에서 확인할 수 있게 구성"
      ],
      "challenges": [
        {
          "label": "PLC/OPC UA/Supabase가 서로 다른 속도와 실패 조건으로 동작",
          "value": "브릿지 레이어에서 폴링, 재연결, 데이터 동기화 책임을 분리"
        },
        {
          "label": "현장 시스템은 데모 화면만으로 운영 가능성을 설득하기 어려움",
          "value": "PLC 주소, IO 상태, 품질 화면, 디지털 트윈 캡처를 함께 제시"
        }
      ],
      "evidence": [
        {
          "label": "PLC 실행 화면",
          "value": "PLC 주소/상태 매핑 화면을 직접 실행 캡처로 제공"
        },
        {
          "label": "운영 화면",
          "value": "주문, 설비 상태, 품질 지표, 디지털 트윈을 React 화면에 배치"
        },
        {
          "label": "브릿지 코드",
          "value": "PLC ↔ Supabase, OPC UA ↔ PLC ↔ Supabase 흐름을 Python 브릿지로 분리"
        }
      ],
      "metrics": [
        {
          "label": "PLC",
          "value": "MC Protocol"
        },
        {
          "label": "OPC UA",
          "value": "설비 데이터"
        },
        {
          "label": "DB",
          "value": "Supabase"
        },
        {
          "label": "UI",
          "value": "React"
        }
      ],
      "rolePoints": [
        "PLC와 MES 사이의 양방향 데이터 동기화 구조 설계",
        "주문/생산상태/IO/알람 데이터를 운영 화면과 연결",
        "기존 설비와 신규 웹 시스템 사이의 연결 계층 구현"
      ],
      "scopeNotes": [
        "스마트팩토리/MES 직무에서 현장 데이터 흐름 이해를 보여주는 프로젝트",
        "화면 증거는 PLC 매핑, 대시보드, 품질, 디지털 트윈 갤러리로 구성",
        "제조 시스템 운영 전환 관점에서 설명 가능"
      ],
      "results": [
        "PLC/OPC UA/Factory I/O/Supabase/React를 연결한 경량 MES 브릿지로 정리",
        "생산 주문, IO, 알람, 품질 데이터를 화면 단위로 확인 가능",
        "현장 시스템과 신규 AI/DT PoC 사이의 연결 계층 경험 확보"
      ],
      "stack": [
        "Python",
        "OPC UA",
        "PLC",
        "MC Protocol",
        "Supabase",
        "React",
        "Realtime"
      ],
      "links": [
        {
          "label": "GitHub",
          "url": "https://github.com/wjdtjdwo0609-cyber/smart-factory-dashboard",
          "icon": "code-2"
        }
      ]
    },
    {
      "id": "kdsis-search-agent",
      "title": "KDSIS 업무 자동화 Search Agent",
      "subtitle": "국방기술품질원 AI 활용 KDSIS 업무 자동화 과제 수행·구현",
      "domain": "Automation",
      "visibility": "public",
      "maturity": "Production-ready",
      "featured": false,
      "priority": 16,
      "tests": 31,
      "image": "./assets/images/koreaarmyquality-demo-poster.jpg",
      "imageFit": "",
      "visual": "",
      "video": "",
      "videoPoster": "./assets/images/koreaarmyquality-demo-poster.jpg",
      "gallery": [
        "./assets/images/koreaarmyquality-demo-poster.jpg"
      ],
      "youtubeUrl": "https://www.youtube.com/watch?v=EW7pOTiMH3g",
      "summary": "국방기술품질원에서 진행하는 AI 활용 국방표준종합정보시스템(KDSIS) 업무 자동화 과제를 수행하며, 자연어 질의·검색 파라미터 추출·브라우저 자동 조회·결과 정리 흐름을 구현했습니다.",
      "problem": "",
      "period": "",
      "collaboration": "",
      "learning": "",
      "limitations": "",
      "nextSteps": "",
      "mediaNotes": [],
      "architecture": [],
      "buildSteps": [],
      "challenges": [],
      "evidence": [],
      "metrics": [],
      "rolePoints": [],
      "scopeNotes": [],
      "results": [
        "시연 영상으로 검색 요청, 자동 조회, 결과 정리 흐름을 확인 가능",
        "Chromium 싱글턴, serial queue, TTL cache로 안정성 개선",
        "CSV/JSON 다운로드, 정렬, 페이지네이션, 최근 검색 지원"
      ],
      "stack": [
        "Node.js",
        "Express",
        "Playwright",
        "Claude",
        "Gemini",
        "DDD"
      ],
      "links": [
        {
          "label": "GitHub",
          "url": "https://github.com/wjdtjdwo0609-cyber/KoreaArmyQualitySearching",
          "icon": "code-2"
        }
      ]
    },
    {
      "id": "local-agent-ai",
      "title": "Local Agent AI",
      "subtitle": "PM, Architect, Developer, QA가 협업하는 로컬 AI 개발 환경",
      "domain": "AI Agent",
      "visibility": "public",
      "maturity": "Production-ready",
      "featured": false,
      "priority": 17,
      "tests": 137,
      "image": "./assets/images/local-agent-ai-run.png",
      "imageFit": "contain",
      "visual": "",
      "video": "",
      "videoPoster": "",
      "gallery": [
        "./assets/images/local-agent-ai-run.png",
        "./assets/images/local-agent-ai.png"
      ],
      "youtubeUrl": "",
      "summary": "FastAPI, WebSocket, SQLite, Vanilla JS 기반 GUI에서 Ollama와 MLX 백엔드를 전환하며 4개 역할형 에이전트가 세션 단위로 협업하는 로컬 AI 앱입니다.",
      "problem": "",
      "period": "",
      "collaboration": "",
      "learning": "",
      "limitations": "",
      "nextSteps": "",
      "mediaNotes": [],
      "architecture": [],
      "buildSteps": [],
      "challenges": [],
      "evidence": [],
      "metrics": [],
      "rolePoints": [],
      "scopeNotes": [],
      "results": [
        "128개 pytest와 9개 Playwright E2E 통과",
        "팀 프리셋, 세션 복원, 워크스페이스 실행, 실시간 스트리밍 구현",
        "Ollama와 MLX 런타임을 설정에서 전환"
      ],
      "stack": [
        "FastAPI",
        "WebSocket",
        "SQLite",
        "Ollama",
        "MLX",
        "Playwright"
      ],
      "links": [
        {
          "label": "GitHub",
          "url": "https://github.com/wjdtjdwo0609-cyber/local-agent-ai-gui",
          "icon": "code-2"
        }
      ]
    },
    {
      "id": "docscope",
      "title": "DocScope / PDF Learn Code",
      "subtitle": "산업 문서를 구조화 화면과 RAG 학습 데이터로 바꾸는 Document AI 흐름",
      "domain": "Document AI",
      "visibility": "public",
      "maturity": "Case study",
      "featured": false,
      "priority": 18,
      "tests": 5,
      "image": "./assets/images/docscope-document-split.png",
      "imageFit": "contain",
      "visual": "",
      "video": "",
      "videoPoster": "",
      "gallery": [
        "./assets/images/docscope-document-split.png",
        "./assets/images/docscope-probe.png",
        "./assets/images/docscope-tree-try.png",
        "./assets/images/docscope-viewport.png"
      ],
      "youtubeUrl": "",
      "summary": "폴더를 열면 문서를 자동 수집해 트리, 마인드맵, 플로우차트로 변환하고, PDF Learn Code 흐름으로 OCR·문서 분류·청킹·JSONL 생성까지 연결하는 문서 AI 프로젝트입니다.",
      "problem": "Plant 현장의 매뉴얼, 도면, SOP, 장애 대응 문서는 PDF나 스캔 파일로 남아 있는 경우가 많습니다. 단순 텍스트 추출만으로는 AI가 신뢰할 수 있는 답변을 만들기 어렵고, 평가 가능한 구조가 필요했습니다.",
      "period": "",
      "collaboration": "",
      "learning": "",
      "limitations": "",
      "nextSteps": "",
      "mediaNotes": [],
      "architecture": [
        "PDF / DOCX / URL",
        "OCR",
        "Classification",
        "Chunking",
        "JSONL",
        "RAG Evaluation",
        "Knowledge Canvas"
      ],
      "buildSteps": [
        "문서를 트리, 마인드맵, 플로우차트로 볼 수 있는 로컬 지식 캔버스로 구성",
        "PDF Learn Code에서 OCR, 문서 분류, 청킹, JSONL 자동 생성 흐름을 정리",
        "QA, cases, descriptions 유형을 분리하고 RAG 평가 케이스를 구축",
        "노드 메모, 태그, wikilink, 하이라이트를 sidecar JSON과 Markdown으로 보존"
      ],
      "challenges": [],
      "evidence": [
        {
          "label": "실행 화면",
          "value": "문서 분할, 탐색, 트리 시도, viewport 화면을 직접 실행 캡처로 제공"
        },
        {
          "label": "학습 데이터",
          "value": "30개 FAQ 자동 생성과 25개 RAG 평가 케이스 구축 흐름 정리"
        }
      ],
      "metrics": [],
      "rolePoints": [],
      "scopeNotes": [],
      "results": [
        "문서별 sidecar JSON과 .docscope.md 동시 저장",
        "OCR → 문서 분류 → 청킹 → JSONL 자동 생성 흐름 구현",
        "30개 FAQ 자동 생성과 25개 RAG 평가 케이스 구축",
        "Obsidian과 공존 가능한 wikilink, tag, backlink 흐름 구현"
      ],
      "stack": [
        "Tauri",
        "React",
        "FastAPI",
        "OCR",
        "JSONL",
        "RAG",
        "Ollama",
        "MLX",
        "Mermaid"
      ],
      "links": [
        {
          "label": "GitHub",
          "url": "https://github.com/wjdtjdwo0609-cyber/docscope",
          "icon": "code-2"
        }
      ]
    },
    {
      "id": "ai-army",
      "title": "AI Army",
      "subtitle": "PM, Architect, Developer, QA 역할형 에이전트가 협업하는 멀티 에이전트 작업 환경",
      "domain": "AI Agent",
      "visibility": "public",
      "maturity": "Case study",
      "featured": false,
      "priority": 19,
      "tests": 0,
      "image": "./assets/images/ai-army-dashboard.png",
      "imageFit": "contain",
      "visual": "",
      "video": "",
      "videoPoster": "",
      "gallery": [
        "./assets/images/ai-army-dashboard.png",
        "./assets/images/local-agent-ai-run.png",
        "./assets/images/knowledge-os-control.png"
      ],
      "youtubeUrl": "",
      "summary": "PM, Architect, Developer, QA 에이전트를 세션, 태스크 보드, 이벤트 스트림, 팀 모드로 조율해 장시간 개발 작업을 계획·실행·검증하는 멀티 에이전트 협업 시스템입니다.",
      "problem": "복잡한 AI/DT 과제는 요구사항 정리, 설계, 구현, 검증이 분리되어야 안정적으로 진행됩니다. 단일 에이전트 흐름만으로는 장시간 작업과 검증 루프가 약해질 수 있어 역할형 에이전트와 작업 보드를 분리했습니다.",
      "period": "",
      "collaboration": "",
      "learning": "",
      "limitations": "",
      "nextSteps": "",
      "mediaNotes": [],
      "architecture": [
        "PM Agent",
        "Architect Agent",
        "Developer Agent",
        "QA Agent",
        "Task Board",
        "Event Stream"
      ],
      "buildSteps": [
        "역할형 에이전트를 PM, Architect, Developer, QA로 분리",
        "세션, 태스크 보드, 이벤트 스트림, 팀 모드를 도메인 단위로 정리",
        "프로젝트 요구사항이 작업 보드와 에이전트 대화로 이어지는 UI 흐름 구성",
        "실행 화면 캡처를 웹 포트폴리오 갤러리에 배치"
      ],
      "challenges": [],
      "evidence": [
        {
          "label": "직접 실행 화면",
          "value": "AI Army dashboard wireframe을 로컬에서 실행해 캡처"
        },
        {
          "label": "역할 분리",
          "value": "PM/Architect/Developer/QA agent와 task board를 한 화면에서 확인"
        }
      ],
      "metrics": [
        {
          "label": "Agents",
          "value": "PM/Arch/Dev/QA"
        },
        {
          "label": "Workflow",
          "value": "계획·구현·검증"
        },
        {
          "label": "UI",
          "value": "Task Board"
        },
        {
          "label": "Backend",
          "value": "DDD 구조"
        }
      ],
      "rolePoints": [],
      "scopeNotes": [],
      "results": [
        "PM/기획/기술 구현 사이의 연결 역량을 보여주는 프로젝트로 정리",
        "도메인 워크플로우 중심으로 backend/application/domain 분리",
        "AI/DT 과제의 진행 상황과 검증 루프를 가시화하는 FDE식 실행 구조 확보"
      ],
      "stack": [
        "Python",
        "FastAPI",
        "Multi-agent",
        "DDD",
        "Event Stream",
        "Task Board"
      ],
      "links": [
        {
          "label": "GitHub",
          "url": "https://github.com/wjdtjdwo0609-cyber/ai-army",
          "icon": "code-2"
        }
      ]
    },
    {
      "id": "game-prototypes",
      "title": "Game Prototypes",
      "subtitle": "4인 로컬 멀티플레이, 모바일 턴제 사격, pygame 아케이드까지 직접 구현한 게임 로직 프로토타입",
      "domain": "Game",
      "visibility": "public",
      "maturity": "Local prototype",
      "featured": false,
      "priority": 19.5,
      "tests": 0,
      "image": "",
      "imageFit": "",
      "visual": "game-prototypes",
      "video": "",
      "videoPoster": "",
      "gallery": [],
      "youtubeUrl": "",
      "summary": "화려한 그래픽보다 게임 루프, 입력 처리, 충돌 판정, 점수·상태 전환을 끝까지 만들어 본 경험을 보여주는 프로토타입 묶음입니다.",
      "problem": "게임 회사 지원에서는 AI/산업 프로젝트만으로는 실제 게임 구현 경험이 약하게 보일 수 있습니다. 그래서 공개 웹 포트폴리오에는 비주얼 완성도보다 구현한 규칙, 입력, 상태머신, 피드백 루프를 정확히 보여주는 별도 게임 섹션을 두었습니다.",
      "period": "",
      "collaboration": "",
      "learning": "",
      "limitations": "",
      "nextSteps": "",
      "mediaNotes": [],
      "architecture": [
        "Input Handling",
        "Game Loop",
        "Collision / Rules",
        "State Machine",
        "Score / Feedback",
        "Local Run"
      ],
      "buildSteps": [
        "워터밤 배틀: 한 키보드 4인 입력, 물풍선 설치, 십자 폭발, 물방울 갇힘, 연타 탈출, 재피격 즉사 로직 구성",
        "빵야빵야: 모바일 브라우저 기반 30초 턴제, 타겟 점수, 콤보 배율, 스폰 가속, 리더보드, 진동 피드백 구성",
        "벽돌깨기: Python pygame으로 패들/공/벽돌 클래스, 60개 벽돌, 충돌 지점 기반 반사각, 생명/점수, R 재시작 루프 구현",
        "시각 자료는 제출용에서 과하게 보이지 않도록 제외하고, 웹에서는 시스템 구조 중심의 비주얼로 정리"
      ],
      "challenges": [
        {
          "label": "게임 화면 완성도보다 로직 구현 증거가 중요함",
          "value": "스크린샷을 크게 노출하지 않고 입력·규칙·상태·피드백 흐름을 프로젝트 설명 중심으로 배치"
        },
        {
          "label": "여러 명이 동시에 조작하거나 모바일 터치를 쓰면 입력 충돌이 생기기 쉬움",
          "value": "키보드 플레이어별 조작계를 분리하고, 모바일은 touch-action, viewport, DPR 대응을 별도로 정리"
        }
      ],
      "evidence": [
        {
          "label": "워터밤 배틀",
          "value": "4인 로컬 멀티플레이 단일 HTML 산출물 기준으로 입력, 폭발, 갇힘, 라운드 상태머신 구현"
        },
        {
          "label": "빵야빵야",
          "value": "모바일 브라우저 실행을 전제로 짧은 턴제 세션, 점수 피드백, 진동 피드백 구현"
        },
        {
          "label": "벽돌깨기",
          "value": "pygame 로컬 실행 파일과 기본 게임 루프, 충돌, 점수, 재시작 흐름 구현"
        }
      ],
      "metrics": [
        {
          "label": "Prototype",
          "value": "3 games"
        },
        {
          "label": "Input",
          "value": "4P / touch"
        },
        {
          "label": "Loop",
          "value": "상태머신"
        },
        {
          "label": "Runtime",
          "value": "HTML / pygame"
        }
      ],
      "rolePoints": [
        "캐주얼 게임의 입력, 충돌, 점수, 상태 전환 규칙을 직접 설계하고 구현",
        "모바일 브라우저와 로컬 키보드 플레이처럼 실행 환경이 다른 게임 UX를 각각 구성",
        "게임 IP/라이브 서비스 회사 지원 시 AI 도구 경험과 별도로 실제 게임 구현 경험을 보강"
      ],
      "scopeNotes": [
        "공개 웹에서는 게임 화면 이미지보다 구현 구조와 로컬 실행 가능성을 중심으로 표기",
        "앱스토어 출시나 상용 서비스 운영처럼 확인되지 않은 표현은 사용하지 않음",
        "워터밤/빵야빵야는 단일 HTML 산출물, 벽돌깨기는 pygame 로컬 실행 기준"
      ],
      "results": [
        "게임 회사 지원에서 확인 가능한 게임 구현 섹션을 웹 포트폴리오에 추가",
        "4인 입력, 모바일 터치, pygame 루프처럼 서로 다른 인터랙션 구현 경험을 한 카드로 정리",
        "트리노드 제출 포트폴리오의 게임 경험과 웹 포트폴리오 내용이 서로 맞도록 보강"
      ],
      "stack": [
        "JavaScript",
        "HTML Canvas",
        "Python",
        "Pygame",
        "Game Loop",
        "Input Handling"
      ],
      "links": []
    },
    {
      "id": "knowledge-os-control",
      "title": "Knowledge OS Control",
      "subtitle": "지식 파이프라인 명령을 운영자가 누를 수 있는 GUI로 전환",
      "domain": "Document AI",
      "visibility": "public",
      "maturity": "Case study",
      "featured": false,
      "priority": 21,
      "tests": 0,
      "image": "./assets/images/knowledge-os-control.png",
      "imageFit": "contain",
      "visual": "",
      "video": "",
      "videoPoster": "",
      "gallery": [],
      "youtubeUrl": "",
      "summary": "문서 수집, ingest 계획, 그래프 재생성, 중복 탐지, 검색 평가를 버튼형 운영 도구로 묶어 지식 저장소 상태를 관리하는 로컬 컨트롤 패널입니다.",
      "problem": "",
      "period": "",
      "collaboration": "",
      "learning": "",
      "limitations": "",
      "nextSteps": "",
      "mediaNotes": [],
      "architecture": [],
      "buildSteps": [],
      "challenges": [],
      "evidence": [],
      "metrics": [],
      "rolePoints": [],
      "scopeNotes": [],
      "results": [
        "명령어 기반 파이프라인을 제한된 GUI 액션으로 전환",
        "문서, 청크, 그래프 노드, 그래프 엣지 상태를 한 화면에서 확인",
        "검색 평가와 로그를 운영 화면에 남겨 재실행 가능성 개선"
      ],
      "stack": [
        "Python",
        "HTML",
        "CSS",
        "Knowledge Graph",
        "RAG"
      ],
      "links": []
    },
    {
      "id": "notebooklm-auto-collector",
      "title": "NotebookLM Auto Collector",
      "subtitle": "NotebookLM Discover Sources 반복 수집을 GUI와 Playwright로 자동화",
      "domain": "Automation",
      "visibility": "public",
      "maturity": "Case study",
      "featured": false,
      "priority": 22,
      "tests": 14,
      "image": "./assets/images/notebooklm-automation.png",
      "imageFit": "contain",
      "visual": "",
      "video": "",
      "videoPoster": "",
      "gallery": [],
      "youtubeUrl": "",
      "summary": "Chrome CDP에 연결해 로그인 세션이 필요한 NotebookLM 자료 수집 흐름을 자동화하고, GUI에서 주제 선택, 연결 상태, 실시간 로그, 결과 파일을 확인하게 만든 도구입니다.",
      "problem": "",
      "period": "",
      "collaboration": "",
      "learning": "",
      "limitations": "",
      "nextSteps": "",
      "mediaNotes": [],
      "architecture": [],
      "buildSteps": [],
      "challenges": [],
      "evidence": [],
      "metrics": [],
      "rolePoints": [],
      "scopeNotes": [],
      "results": [
        "Playwright와 Chrome CDP 기반 브라우저 자동화",
        "SSE 로그 스트림으로 진행 상황과 실패 지점 노출",
        "수집 URL을 이후 RAG, 문서화, 리서치 파이프라인으로 재사용"
      ],
      "stack": [
        "Playwright",
        "Node.js",
        "Chrome CDP",
        "SSE",
        "GUI"
      ],
      "links": []
    },
    {
      "id": "dockerros-web-simulator",
      "title": "DockerRos Web Simulator",
      "subtitle": "로봇 앱 시연과 디지털 트윈을 함께 보여주는 웹 기반 ROS2 시뮬레이터",
      "domain": "Robotics",
      "visibility": "public",
      "maturity": "Production-ready",
      "featured": false,
      "priority": 23,
      "tests": 16,
      "image": "./assets/images/dockerros-web-simulator-poster.jpg",
      "imageFit": "",
      "visual": "",
      "video": "",
      "videoPoster": "./assets/images/dockerros-web-simulator-poster.jpg",
      "gallery": [
        "./assets/images/dockerros-web-simulator-overview.jpg",
        "./assets/images/dockerros-web-simulator-poster.jpg"
      ],
      "youtubeUrl": "https://www.youtube.com/watch?v=3c9PQeWwu58&t=463s",
      "summary": "무거운 로봇 시뮬레이션을 브라우저에서 확인 가능한 데모와 ROS2 학습 환경으로 나누고, 디지털 트윈 장면까지 영상에서 바로 확인할 수 있게 정리한 프로젝트입니다.",
      "problem": "ROS2, Gazebo, 로봇 모델, PLC 연동을 한 번에 설치해야 하는 구조는 포트폴리오 검토자가 바로 실행해 보기 어렵습니다. 그래서 무거운 로봇 실행 환경과 웹 데모를 분리하고, 브라우저에서 먼저 로봇 시뮬레이션과 디지털 트윈 흐름을 확인할 수 있게 만들었습니다.",
      "period": "",
      "collaboration": "",
      "learning": "",
      "limitations": "",
      "nextSteps": "",
      "mediaNotes": [],
      "architecture": [
        "Browser Demo",
        "Three.js Robot View",
        "OPC UA Adapter",
        "WebSocket",
        "PLC / GX Simulator",
        "ROS2 Native Path"
      ],
      "buildSteps": [
        "Three.js/WebGL 기반 웹 시뮬레이터로 로봇 장면을 브라우저에서 확인 가능하게 구성",
        "Indy7, UR, Panda, Fanuc 등 여러 로봇 모델을 학습·시연용으로 정리",
        "OPC UA와 WebSocket 어댑터를 두어 PLC 연동 흐름을 웹 시뮬레이터와 분리",
        "ROS2 네이티브 실행 경로와 웹 데모 경로를 나눠 무거운 의존성 문제를 낮춤"
      ],
      "challenges": [
        {
          "label": "로봇 시뮬레이터가 무거워서 채용자가 바로 실행하기 어려움",
          "value": "웹 데모와 ROS2 네이티브 실행 경로를 분리해 브라우저에서 먼저 결과를 볼 수 있게 구성"
        },
        {
          "label": "PLC 연동은 OS, Python 버전, 포트, 실행 순서에 민감함",
          "value": "OPC UA 4840, WebSocket 9091, Python 3.12, 실행 순서를 README와 어댑터 구조로 명시"
        },
        {
          "label": "영상 썸네일이 검은 여백 위주라 결과물이 약해 보임",
          "value": "로컬 원본 영상에서 웹 디지털 트윈 화면이 잘 보이는 프레임을 추출해 대표 이미지로 교체"
        }
      ],
      "evidence": [
        {
          "label": "웹 시뮬레이터 화면",
          "value": "대시보드와 3D 로봇 시뮬레이션을 같은 화면에서 확인 가능"
        },
        {
          "label": "OPC UA / WebSocket 경로",
          "value": "PLC와 브라우저 사이를 어댑터로 분리한 구조"
        },
        {
          "label": "README 실행 문서",
          "value": "웹 데모, PLC 연동, ROS2 실행 경로를 분리해 설명"
        }
      ],
      "metrics": [
        {
          "label": "WebGL",
          "value": "브라우저 시뮬레이션"
        },
        {
          "label": "ROS2",
          "value": "네이티브 학습 경로"
        },
        {
          "label": "OPC UA",
          "value": "PLC 연동 어댑터"
        },
        {
          "label": "16 tests",
          "value": "검증 항목"
        }
      ],
      "rolePoints": [],
      "scopeNotes": [],
      "results": [
        "DockerRos 앱 시연 영상의 디지털 트윈 구간으로 바로 이동",
        "Indy7, UR, Panda, Fanuc 등 여러 로봇 모델과 학습 흐름 지원",
        "웹 데모와 ROS2 네이티브 실행 경로를 분리해 무거운 의존성을 낮춤"
      ],
      "stack": [
        "ROS2",
        "Three.js",
        "WebGL",
        "Python",
        "OPC UA",
        "Gazebo"
      ],
      "links": [
        {
          "label": "GitHub",
          "url": "https://github.com/wjdtjdwo0609-cyber/DockerRos",
          "icon": "code-2"
        }
      ]
    },
    {
      "id": "pickline-toolkit",
      "title": "pickline-toolkit",
      "subtitle": "비전 가이드 픽앤플레이스 라인을 재사용 가능한 Python 툴킷으로 분리",
      "domain": "Robotics",
      "visibility": "public",
      "maturity": "Case study",
      "featured": false,
      "priority": 24,
      "tests": 77,
      "image": "./assets/images/pickline-preview.png",
      "imageFit": "contain",
      "visual": "",
      "video": "",
      "videoPoster": "",
      "gallery": [],
      "youtubeUrl": "",
      "summary": "Intel5 릴레이 소켓 검사·픽킹 프로젝트에서 비전, 캘리브레이션, 로봇 제어, PLC 연동, 픽 사이클을 bounded context로 추출한 모듈형 라이브러리입니다.",
      "problem": "",
      "period": "",
      "collaboration": "",
      "learning": "",
      "limitations": "",
      "nextSteps": "",
      "mediaNotes": [],
      "architecture": [],
      "buildSteps": [],
      "challenges": [],
      "evidence": [],
      "metrics": [],
      "rolePoints": [],
      "scopeNotes": [],
      "results": [
        "4,493줄 god object에서 재사용 가능한 도메인 모듈 추출",
        "YOLO 검출, hand-eye calibration, Indy7 제어, MC Protocol 연동 분리",
        "77개 테스트로 값 객체와 오케스트레이션 규칙 검증"
      ],
      "stack": [
        "Python",
        "YOLO",
        "OpenCV",
        "Indy7",
        "PLC",
        "DDD"
      ],
      "links": [
        {
          "label": "GitHub",
          "url": "https://github.com/wjdtjdwo0609-cyber/pickline-toolkit",
          "icon": "code-2"
        }
      ]
    }
  ]
};
