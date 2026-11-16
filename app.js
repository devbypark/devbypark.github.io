'use strict';

// Engineering case studies.
const projects = {
  "finance_bmt": {
    "id": "finance_bmt",
    "fdeSignal": "평가 기준을 먼저 세우고, 그 기준으로 처리 속도와 정확도의 균형을 판단했습니다.",
    "filter": "ai",
    "category": "01 / FINANCE · AI BENCHMARK",
    "title": "금융권 문서 AI BMT 수행",
    "period": "2026.08 · 준비 2주 / 현장 08.20–21",
    "status": "현장 BMT 완료",
    "context": "금융권 · 정확도와 속도를 평가하는 BMT",
    "ownership": "프런트·백엔드·서빙·모델 작업·평가를 단독 담당",
    "scope": "vLLM · OCR 최적화 · 프롬프트 · 합성 문서 · GT·마스킹 평가",
    "metric": "2주 + 2일",
    "metricLabel": "정확도·속도 평가 BMT / 준비 + 현장",
    "metricCaption": "개발부터 현장 평가까지",
    "flow": [
      "개발·평가 준비",
      "품질·속도 검증",
      "현장 대응"
    ],
    "cardCopy": "평가 문서를 미리 알 수 없는 조건에서, 처음 보는 문서도 바로 검수할 수 있는 평가 흐름을 만들어 현장 BMT를 진행했습니다.",
    "summary": "약 2주간 준비해 현장 BMT를 진행했습니다. 처리 속도와 검출 정확도를 같은 기준으로 비교해 서빙 구성을 골랐습니다.",
    "sections": [
      [
        "문제와 제약: 처음 보는 문서와 짧은 준비 기간",
        "현장 문서는 사전에 확정되지 않았고 준비 기간은 약 2주였습니다. 이 일정에 맞춰 서빙을 구성하고, 평가용 문서와 합성 데이터·정답 데이터를 직접 준비해 처음 보는 문서의 추출·마스킹 결과를 빠르게 검수할 수 있는 평가 흐름을 만들었습니다."
      ],
      [
        "기술적 판단: 속도와 품질의 균형",
        "동시성·해상도·출력 구조·정밀도 설정을 비교하고, 처리 속도가 개선되더라도 추출·마스킹 정확도가 기준에 미치지 못하는 설정은 채택하지 않았습니다. 예를 들어 200페이지를 6분 11.8초에 처리한 서빙 후보는 IoU 0.5 기준 weighted recall이 59.0%로 떨어져 제외했습니다. GPU 자원 경합과 구조화 출력의 안정성을 함께 고려해 서빙 구성을 선택했습니다."
      ],
      [
        "OCR 병목 개선",
        "영역 좌표를 계산할 때 이미지 전체를 반복 탐색하던 후처리를 선형 계산으로 바꿨습니다. 요청 대기와 추론 시간을 나눠 병목을 찾고, 텍스트와 좌표가 유지되는지 확인하며 OCR 처리 흐름을 개선했습니다. 같은 40페이지 기준 처리 시간은 203.5초에서 126.8초로 37.7% 줄었고, 검출 영역이 많은 페이지의 좌표 생성은 약 8.48초에서 0.71초로 줄었습니다."
      ],
      [
        "평가 기준을 실제 마스킹 결과에 맞추기",
        "여러 페이지 문서의 후속 페이지가 누락되는 문제를 수정하고 결과값·좌표·이미지를 함께 비교할 수 있게 했습니다. 검수 과정에서 정답 데이터에 빠진 항목을 보완하고, 이미지에 실제 적용된 마스킹 영역을 기준으로 누락과 과다 마스킹을 확인했습니다. 라벨링 결과 반입과 검수 내용을 반영한 JSON·CSV 내보내기를 구현해 평가와 결과 전달을 연결했습니다."
      ],
      [
        "사전 검증과 현장 BMT",
        "현장 평가 전에 직접 구성한 100문서·200페이지와 검수한 정답 데이터로 전체 처리 경로를 검증했습니다. 실패 0건으로 5분 13초(페이지당 약 1.57초)에 처리했고, 개인정보 항목 영역 검출 기준 weighted recall 97.2%, weighted F2 0.975(IoU 0.5)를 기록했습니다. 현장에서는 새 문서를 실행하며 라벨링·GT 생성·오류 확인·프롬프트 수정을 직접 진행했습니다."
      ]
    ]
  },
  "finance_serving": {
    "id": "finance_serving",
    "fdeSignal": "지연을 구간별로 계측해 원인을 좁히고, 기능 개발과 고객의 RPA 연동 작업이 병행되도록 제공 시점을 나눴습니다.",
    "filter": "ai",
    "category": "02 / FINANCE · INFERENCE OPTIMIZATION",
    "title": "700종+ 문서 처리 최적화와 금융 시스템 연동",
    "period": "2026.04 — 현재",
    "status": "요구사항 대응 중",
    "context": "금융권 · 문서 처리 지연 개선과 연동 요구 대응",
    "ownership": "백엔드·모델 호출 서비스·서빙 최적화·연동 API 개발",
    "scope": "vLLM · 병렬 처리 · 처리시간 계측 · RPA 연동 지원",
    "metric": "4.5초 → 2.7초",
    "metricLabel": "1장 처리 시간 중앙값(p50)",
    "metricCaption": "700종 이상 분류 요구 · 대기 없는 1장 순차 처리 기준",
    "flow": [
      "병목 분석",
      "서빙·코드 개선",
      "고객 시스템 연동"
    ],
    "cardCopy": "처리 단계를 병렬화하고 중복된 OCR·이미지 인코딩을 없애 1장 처리 시간 중앙값을 4.5초에서 2.7초로 줄였습니다. 정확도는 평가셋 681건에서 이전과 같음을 확인했습니다.",
    "summary": "문서 분류 유형이 700종 이상으로 늘며 커진 지연을 구간별 계측으로 좁혀, 1장 처리 시간 중앙값을 4.5초에서 2.7초로 줄였습니다. 정확도는 평가셋 681건에서 이전과 같음을 확인했습니다.",
    "sections": [
      [
        "문제: 문서 유형 증가에 따른 지연",
        "문서 분류·주요 정보 추출·OCR·회전 판단·신뢰도 측정이 연결되는 서비스였습니다. 분류 유형이 700종 이상으로 늘어나면서 처리 지연이 커졌고, 기능 확장과 고객이 요구하는 처리 속도를 함께 지원해야 했습니다."
      ],
      [
        "원인 찾기: 구간별 계측과 병목 분석",
        "요청·재시도별 처리 로그를 집계해 처리 구간별 시간을 같은 기준으로 비교하는 도구를 만들었습니다. 문서·페이지·모델 호출의 동시성을 구분해 대기 구간을 분석하고, vLLM 벤치마크와 prefill·decode 병목 확인을 바탕으로 고객 GPU 환경에 맞는 서빙 설정을 적용했습니다."
      ],
      [
        "개선과 결과",
        "독립적으로 실행할 수 있는 처리 단계를 병렬화하고, OCR에서 확인되지 않은 필드를 VLM으로 검증하는 호출은 동시 호출 수를 제한해 병렬 실행했습니다. 중복 OCR·이미지 인코딩을 없애고 입력 이미지를 줄여, 1장 처리 시간 중앙값(p50)을 4.5초에서 2.7초로, 3초 초과 비율을 79%에서 41%로 낮췄습니다. 대기 없이 1장씩 순차 처리한 조건의 측정값이며, 정확도는 평가셋 681건에서 이전 빌드와 동등함을 확인했습니다."
      ],
      [
        "LLM 회귀를 평가로 잡기: 출력 퇴화와 구조화 출력의 조용한 오류",
        "지연을 줄이려고 thinking 모드를 끄고 평가셋 681건을 돌리자, 추출 문서 375건 중 46건의 출력이 공백 문자를 반복하다 최대 토큰을 소진해 JSON 파싱에 실패했습니다. 단일 문서 A/B로 해당 설정이 원인임을 확인하고(completion 토큰 4096 → 5), 파인튜닝 모델의 추출·분류 호출은 되돌렸습니다. 분류용 이미지를 줄일 때는 코드 한 글자를 잘못 읽으면 구조화 출력의 enum이 이를 유효한 다른 코드로 맞춰, 오류 신호 없이 추출 스키마가 바뀔 위험을 확인했습니다. 기본 해상도를 올리고, 평가 하네스가 운영과 같은 축소 경로를 타도록 고쳤습니다. 모델 호출 8종의 토큰 사용량도 단계별로 계측했습니다."
      ],
      [
        "고객 일정에 맞춘 연동",
        "고객의 RPA 개발 일정에 맞춰 신규 OCR 필드 추출과 연동 검증의 제공 시점을 나눴습니다. 기존 적재 API에 필드 명세와 입력 검증을 추가하고 사용자 가이드를 먼저 제공해, 추출 기능 개발과 고객의 연동 작업이 동시에 진행되도록 했습니다."
      ]
    ]
  },
  "enterprise_document_ai": {
    "id": "enterprise_document_ai",
    "fdeSignal": "고객과 협의한 조건이 바뀔 때마다 설계를 다시 맞추고, 그 과정에서 찾은 구조적 문제까지 고쳤습니다.",
    "filter": "product",
    "category": "03 / ENTERPRISE · PRODUCT ENGINEERING",
    "title": "고객 요구에서 검수·연동까지, 문서 AI 제품 개발",
    "period": "2026.07 — 현재",
    "status": "개발·고도화 중",
    "context": "기업 고객 · 문서 AI 서비스 개발과 현장 피드백",
    "ownership": "프런트·백엔드 단독 개발 / 모델 작업은 엔지니어 1명과 협업",
    "scope": "계층형 스키마 · 검수 UI · 연동 API · 모델 서빙 · Docker Compose",
    "metric": "FE + BE",
    "metricLabel": "프런트엔드·백엔드 단독 개발",
    "metricCaption": "모델·서빙 참여 · 고객 미팅과 요구사항·일정 조율",
    "flow": [
      "요구·계약 구체화",
      "제품 구현",
      "배포·피드백"
    ],
    "cardCopy": "고객과 협의한 요구를 스키마·검수 화면·API 계약으로 옮겨 제품을 만들고, 협의된 RDS·S3 기반으로 어느 서버든 어느 페이지든 처리하는 이중화 구성을 정리했습니다.",
    "summary": "고객과 협의한 요구를 스키마·검수 화면·API 계약으로 옮겨 문서 AI 제품을 만들고 있습니다. 이중화 구성 협의, 고객 서버 장애 대응, 모델 서버 원인 분석까지 제품 운영에 필요한 문제를 직접 다뤘습니다.",
    "sections": [
      [
        "고객 요구를 제품 구조와 API 계약으로",
        "반복 항목과 문서별 요구를 계층형 필드·그룹·표 스키마와 검수 화면으로 구체화했습니다. 페이지 묶음의 이동·순서 변경, 결과 버전, 마스킹과 조회 권한을 API 요청·응답·오류 계약에 반영하고 사용자 가이드를 작성했습니다. 작업 접수 시 실행 버전을 고정해 재시도에도 같은 스키마와 처리 구성을 사용하도록 설계했습니다."
      ],
      [
        "이중화 설계: 협의된 RDS·S3 기반 active-active",
        "GPU 서버 2대를 함께 쓰는 이중화를 고객과 협의하며 구성을 두 차례 다시 설계했습니다. 처음에는 AWS 관리형 서비스 기반 active-active를 제안했고, 관리형 서비스를 쓸 수 없는 조건이 정해진 뒤 4일 만에 제품 패키지가 DB·작업 큐·파일 저장소를 직접 복제하는 주·대기 안을 다시 제안했습니다. 이후 고객이 RDS와 S3를 제공하기로 협의돼 최종 구성은 RDS·S3 기반 active-active로 정리했습니다. 구성을 검토하면서 페이지 입력 파일이 서버 로컬 디스크에만 있어, 다른 서버가 작업을 가져가면 장애가 없어도 처리에 실패할 수 있는 구조임을 확인했습니다. 페이지 이미지를 S3에서 직접 읽도록 바꿔 어느 서버든 어느 페이지든 처리할 수 있게 했고, 개인정보가 담긴 입력 파일이 서버 디스크에 쌓이던 문제도 함께 없앴습니다."
      ],
      [
        "장애 대응: 서버 재시작 후 OCR 전면 실패",
        "고객 서버가 재시작된 뒤 OCR 서비스만 비정상 상태로 남고 문서 처리 요청이 모두 실패했습니다. 고객이 보내 준 화면과 로그에서 GPU와 드라이버는 정상이고 컨테이너 안에서만 드라이버를 읽지 못한다는 점을 확인해, 컨테이너 안에 남은 빈 드라이버 파일로 원인을 좁혔습니다. 시험 환경에서 같은 증상을 재현한 뒤, 다른 서비스를 멈추지 않고 약 10분에 끝나는 조치 절차를 장애 당일 고객에게 직접 안내했고 다음 패키지에도 반영했습니다. 재시작 때 드라이버 파일 위치가 달라진 이유는 당시 확정하지 못해 추가 확인 항목으로 남겼고, 같은 상황이 다시 생겨도 영향을 받지 않도록 조치했습니다."
      ],
      [
        "원인 분석: 내부 검증 환경의 간헐적 모델 서버 종료",
        "내부 검증 환경의 모델 서버가 약 2천 요청에 한 번꼴로 GPU 오류를 내며 종료됐고, 그때 처리 중이던 요청이 실패했습니다. 처리 요청과 메모리 사용량이 적을 때도 발생해 부하 문제를 배제했습니다. 첫 설정 변경이 효과가 없자 커널 선택 기록을 추적해 특정 GPU 연산 커널과 실행 그래프 캐싱이 겹치는 라이브러리 버그로 원인을 좁혔습니다. 해당 커널을 제외한 뒤 속도 변화 없이 모델 교체 전까지 재발하지 않았고, 이후 약 1/3 느려지지만 품질 차이가 측정 편차 안인 모델로 바꿔 안정성을 우선했습니다."
      ],
      [
        "구조화 출력: 모델 서버가 다르게 읽는 스키마를 저장 시점에 차단",
        "스키마의 값 패턴은 모델 서버에서 제약 디코딩 문법으로 컴파일됩니다. 기존 검증은 Python 정규식 기준이어서, 저장된 패턴이 작업 시점에야 오류를 내거나 한글 범위 일부를 잃어 한국어 이름이 로마자로 출력됐습니다. 디코딩 엔진이 Python과 같게 해석하는 패턴만 저장되도록 검증을 추가하고, 고칠 위치를 편집 화면에 안내했습니다. 무작위 패턴 약 4만 개로 대조해 통과한 패턴 중 다르게 해석되는 경우가 없음을 확인했고, 기존 패턴은 모두 그대로 통과했습니다."
      ],
      [
        "검수 기록을 보존하는 문서 재구성",
        "같은 문서 유형의 페이지를 재구성할 때 기존 추출 결과를 재사용하고, 묶음 구성과 통합 결과만 갱신하도록 개선했습니다. 유형이 달라질 때 재추출하고 영향을 받지 않은 묶음의 검수 기록은 유지합니다. 필드·페이지·bbox 출처를 연결해 반복 항목도 원본 문서에서 확인할 수 있게 했습니다."
      ],
      [
        "성능 개선: OCR 메모리와 검수 화면",
        "긴 줄의 패딩이 인식 배치 전체의 메모리를 늘리는 원인을 찾아 배치 분할을 시험하고, 문자·좌표·신뢰도 변화를 확인하며 여러 OCR 조합 중 적용 후보를 골랐습니다. 검수 화면에서는 화면 밖 썸네일 로딩을 미루고 동시 요청을 제한했고, 실시간 상태 전달이 DB 연결을 계속 점유하던 구조를 고쳤습니다."
      ]
    ]
  },
  "finance_api": {
    "id": "finance_api",
    "fdeSignal": "고객의 실제 사용 방식에서 개선 목표를 정했습니다.",
    "filter": "ai",
    "category": "04 / FINANCE · DOCUMENT API",
    "title": "단건 문서 API 응답 속도 개선",
    "period": "2026.07 — 2026.09",
    "status": "유지보수 중",
    "context": "금융권 · API 전용 문서 처리",
    "ownership": "요구사항 정리·AI 엔지니어 협업·패키징·배포·현장 대응",
    "scope": "문서 API · 단건 처리 최적화 · 배포와 운영",
    "metric": "20–30초 → 약 2–3초",
    "metricLabel": "건당 처리 시간(워밍업 후)",
    "metricCaption": "API 전용 사용 · 단건 요청의 지연을 우선 개선",
    "flow": [
      "요구사항 정리",
      "AI 엔지니어 협업",
      "배포·유지보수"
    ],
    "cardCopy": "병목은 큰 출력 스키마와 행마다 키가 반복되는 JSON 출력이었습니다. AI 엔지니어와 함께 출력을 압축했다가 응답 단계에서 복원하는 방식 등으로 건당 처리 시간을 약 2–3초로 줄였습니다.",
    "summary": "API만 쓰는 고객의 단건 응답 시간을 개선 목표로 잡고, AI 엔지니어와 함께 건당 20–30초를 워밍업 후 약 2–3초로 줄였습니다.",
    "sections": [
      [
        "문제와 목표: 단건 요청의 응답 시간",
        "고객은 API만 사용했고, 병렬 처리량보다 단건 문서의 응답 시간을 우선했습니다. 문서와 조건에 따라 건당 약 20–30초가 걸리던 처리에 대해, 이 사용 방식에 맞춰 단건 지연을 개선 목표로 잡았습니다."
      ],
      [
        "병목과 개선",
        "병목은 큰 출력 스키마와 행마다 키가 반복되는 JSON 출력의 디코딩이었습니다. AI 엔지니어와 함께 모델 교체, non-thinking 고정, 압축 출력 후 응답 단계 복원, 페이지 이미지 디코딩 1회화로 건당 처리 시간을 워밍업 후 약 2–3초로 줄였습니다."
      ]
    ]
  },
  "public_a": {
    "id": "public_a",
    "fdeSignal": "고객과 협의한 운영 요구사항을 백업·복구와 수동 전환 구성으로 구현했습니다.",
    "filter": "operations",
    "category": "05 / PUBLIC SECTOR · SERVICE CONTINUITY",
    "title": "GPU 서비스 장애 대비와 백업·복구",
    "period": "2026.03 — 2026.08",
    "status": "유지보수 중",
    "context": "공공기관 A · Active–Standby 운영 요구",
    "ownership": "패키징·배포·백업·복구 대응·현장 이슈 대응",
    "scope": "Active–Standby · PostgreSQL 백업·복구 · 수동 전환",
    "metric": "Active → Standby",
    "metricLabel": "GPU 서버 장애에 대비한 운영 구성",
    "metricCaption": "주기적인 PostgreSQL 백업·복구 · 수동 장애 전환",
    "flow": [
      "주기적 백업",
      "데이터 복구",
      "수동 전환"
    ],
    "cardCopy": "고객과 협의한 Active–Standby 요구사항에 맞춰, PostgreSQL 주기 백업·복구와 수동 전환으로 GPU 서버 장애에 대비하는 구성을 배포했습니다.",
    "summary": "고객과 협의한 Active–Standby 운영 요구사항을 구현했습니다. GPU 서버 장애에 대비해 상태 데이터를 PostgreSQL로 주기 백업하고, 장애 시 복구한 뒤 수동으로 전환하는 구성으로 배포했습니다.",
    "sections": [
      [
        "요구사항과 구성: Active–Standby",
        "고객과 협의한 요구사항은 GPU 서버에 장애가 나도 Standby 환경에서 업무를 이어 가고 상태 데이터를 보존하는 것이었습니다. 상태 데이터를 PostgreSQL로 주기 백업하고, 장애 시 복구한 뒤 수동으로 전환하는 구성으로 배포했습니다."
      ],
      [
        "업무 연결: 담당 공무원이 쓰는 RAG의 문서 데이터",
        "문서를 처리해 RAG용 청킹 데이터를 생성하고, 컨소시엄 파트너가 제공하는 최종 서비스에 연결했습니다. 담당 범위는 문서 처리와 청킹 데이터 생성이며, 담당 공무원의 실제 업무에 정착했습니다."
      ]
    ]
  },
  "public_b": {
    "id": "public_b",
    "fdeSignal": "고객에게 기존 인입 방식을 요구하는 대신, 고객의 문서 보관 구조에 맞춰 NAS 수집 경로를 추가했습니다.",
    "filter": "operations",
    "category": "06 / PUBLIC SECTOR · DOCUMENT INTEGRATION",
    "title": "GPU 운영 제어와 NAS 문서 수집",
    "period": "2026.03 — 2026.07",
    "status": "유지보수 중",
    "context": "공공기관 B · 시간대별 GPU 관리와 NAS 연계",
    "ownership": "NAS 수집 기능 개발·GPU 제어 대응·패키징·배포·현장 대응",
    "scope": "API · 포털 업로드 · NAS 폴링 · 시간대별 GPU 제어",
    "metric": "3개 인입 채널",
    "metricLabel": "고객의 문서 보관·전달 구조에 맞춘 연계",
    "metricCaption": "API · 포털 업로드 · NAS 폴링",
    "flow": [
      "API",
      "포털 업로드",
      "NAS 폴링"
    ],
    "cardCopy": "문서를 NAS에 보관하는 고객 환경에 맞춰 NAS에서 대상 문서를 직접 가져오는 수집 경로를 추가하고, 시간대별 GPU 사용 제어 요구사항을 반영했습니다.",
    "summary": "문서를 NAS에 보관하는 고객 환경에 맞춰 NAS 폴링 수집 경로를 추가해, API·포털 업로드와 함께 세 가지 문서 인입 경로를 제공했습니다.",
    "sections": [
      [
        "고객 환경에 맞춘 수집 경로",
        "다른 프로젝트는 배포 서버의 문서를 읽거나 API로 문서를 받았지만, 이 고객은 문서를 NAS 서버에 보관했습니다. NAS의 대상 문서를 주기적으로 확인해 가져오는 폴링 기반 수집 기능을 추가해 API·포털 업로드와 함께 세 가지 인입 경로를 제공했고, 시간대별 GPU 리소스 제어 요구사항도 반영했습니다."
      ],
      [
        "업무 연결: 담당 공무원이 쓰는 RAG의 문서 데이터",
        "수집한 문서를 처리해 RAG용 청킹 데이터를 생성하고, 컨소시엄 파트너가 제공하는 최종 서비스에 연결했습니다. 담당 범위는 문서 처리와 청킹 데이터 생성이며, 담당 공무원의 실제 업무에 정착했습니다."
      ]
    ]
  },
  "observability": {
    "id": "observability",
    "fdeSignal": "여러 운영 환경에 설치되는 소프트웨어를 직접 패키징하고, 다루기 쉬운 설정과 더 적은 자원 사용을 함께 달성했습니다.",
    "filter": "platform",
    "category": "07 / PLATFORM · LOG COLLECTION",
    "title": "로그 수집 에이전트 경량화와 설정 간소화",
    "period": "2022.05 — 2023.11",
    "status": "이전 경력 · 엑셈",
    "context": "엑셈 · SaaS 모니터링 수집 에이전트",
    "ownership": "로그 수집 서비스 단독 개발 / 전체 모니터링 프로젝트 기여도 20%",
    "scope": "Go · Fluent Bit Output 플러그인 · Linux 패키징 · Docker · Helm · GitHub Actions",
    "metric": "70%+",
    "metricLabel": "같은 로그 데이터 수집 시 기존 Fluentd 대비 메모리 절감",
    "metricCaption": "수집 설정 간소화 · Go 커스텀 플러그인 · 여러 운영 환경 패키징",
    "flow": [
      "수집 설정 간소화",
      "에이전트 경량화",
      "패키징·배포"
    ],
    "cardCopy": "Fluentd 기반 수집 에이전트를 Fluent Bit과 Go 커스텀 플러그인으로 바꿔, 같은 로그를 수집할 때 메모리 사용량을 70% 이상 줄였습니다. 여러 Linux 배포판과 컨테이너 환경에 설치할 수 있도록 패키징했습니다.",
    "summary": "Fluentd 기반 수집 에이전트를 Fluent Bit과 Go 커스텀 플러그인으로 바꿔 같은 로그 기준 메모리 사용량을 70% 이상 줄이고, 여러 운영 환경에 설치할 수 있도록 패키징했습니다.",
    "sections": [
      [
        "문제와 판단: 복잡한 설정과 메모리 부담",
        "서비스 기능과 사용자별 수집 설정을 반영하려면 설정이 복잡해졌고, 기존 Fluentd 기반 구성은 메모리 부담이 컸습니다. 메모리를 줄이기 위해 Fluent Bit을 선택했고, 팀의 공통 기술 스택인 Go로 커스텀 플러그인을 만들어 서비스 요구에 맞게 확장할 수 있다는 점도 고려했습니다."
      ],
      [
        "구현과 결과",
        "Go 커스텀 Output 플러그인에 마스킹·라벨링·멀티라인 수집 기능을 구현하고, 서비스 기능과 사용자 설정에 맞춰 수집 구성을 간편하게 바꿀 수 있게 했습니다. 기존 Fluentd 대비 같은 로그 데이터를 수집할 때 에이전트 메모리 사용량을 70% 이상 줄였습니다."
      ],
      [
        "배포와 유지보수",
        "온프레미스 설치를 위해 Debian·RHEL·Ubuntu·CentOS용 패키지를 만들고, Docker 이미지와 Helm Chart로 컨테이너·Kubernetes 설치도 지원했습니다. 공통 모듈 업데이트는 GitHub Actions로 자동화했습니다."
      ]
    ]
  },
  "monitoring_pipeline": {
    "id": "monitoring_pipeline",
    "fdeSignal": "데이터 특성과 조회 요구를 저장 구조로 옮기고, 제한된 리소스에서 부하를 검증한 뒤 운영까지 맡았습니다.",
    "filter": "platform",
    "category": "08 / PLATFORM · DATA PIPELINE",
    "title": "로그 데이터 파이프라인과 저장소 설계·운영",
    "period": "2022.08 — 2024.04",
    "status": "이전 경력 · 엑셈",
    "context": "엑셈 · SaaS 및 온프레미스 모니터링 데이터 파이프라인",
    "ownership": "로그 수집 파이프라인 개발 단독 담당 / 저장소 구성·운영",
    "scope": "Fluentd · Kafka · Go · Elasticsearch · OpenSearch · ClickHouse · Druid · Kubernetes",
    "metric": "수집 → 적재",
    "metricLabel": "SaaS·온프레미스 모니터링 데이터 파이프라인",
    "metricCaption": "Fluent Bit Agent · Fluentd Gate · Kafka · Go Connector · Elasticsearch",
    "flow": [
      "수집·전달 서비스",
      "저장 구조 설계",
      "부하 검증·운영"
    ],
    "cardCopy": "조회 패턴과 데이터 특성에 맞춰 저장소를 설계했습니다. SaaS는 멀티테넌트 Elasticsearch 인덱스로, 온프레미스는 대량 시계열·통계 조회에 맞춰 PostgreSQL에서 ClickHouse로 이전했습니다.",
    "summary": "로그 수집 파이프라인을 개발하고, 데이터 특성과 조회 패턴에 맞춰 SaaS·온프레미스 저장소를 설계·운영했습니다. 제한된 리소스 안에서 인덱싱 설정을 반복 검증했습니다.",
    "sections": [
      [
        "파이프라인 구조와 전달 서비스",
        "로그 데이터는 Agent(Fluent Bit) → Gate(Fluentd) → Kafka → Connector(Go) → Elasticsearch 순서로 전달됐습니다. 미들웨어 사이의 데이터 전달을 맡는 Gate·Connector 서비스를 개발해 gRPC·TCP 송수신을 다뤘고, Gate는 리소스 사용량과 수집 데이터 양에 따라 확장·축소되도록 구성했습니다."
      ],
      [
        "저장소 설계: SaaS와 온프레미스",
        "SaaS에서는 멀티테넌트와 모니터링 화면의 조회 요구를 고려해 Elasticsearch 인덱스를 설계하고, 수집량과 보관 기간에 따른 자동 백업을 구성했습니다. 라이선스 변경에 대응해 OpenSearch로 이전했습니다. 온프레미스에서는 대량 시계열·통계 조회와 압축 효율을 근거로 ClickHouse를 선택하고, 조회 패턴에 맞춰 테이블을 설계해 PostgreSQL에서 이전했습니다."
      ],
      [
        "검증: 제한된 리소스에서 인덱싱 설정 비교",
        "Elasticsearch 인덱싱 성능 개선을 위해 여러 설정값을 바꾸며 반복 테스트했습니다. Druid·Elasticsearch에는 es-rally, JMeter, 쿼리 부하 생성기를 활용한 부하 테스트를 수행하고, 운영 비용과 리소스 사용량을 고려한 구성 조정과 HA 구성을 다뤘습니다."
      ],
      [
        "운영: Kubernetes와 모니터링·알림",
        "Kubernetes 개발·운영 환경을 운영하고 Prometheus·Grafana 대시보드를 구성했습니다. 운영 장애 상황에 대한 Alert Rule을 정의하고 Alertmanager 기반 Slack 알림을 구성·운영했습니다."
      ]
    ]
  },
  "payment_platform": {
    "id": "payment_platform",
    "fdeSignal": "외부 파트너 개발자와 직접 규격을 협의해 시스템마다 다른 연동 요구를 구현했습니다.",
    "filter": "product",
    "category": "09 / BACKEND · PARTNER INTEGRATION",
    "title": "파트너 결제 API 연동과 서비스 분리·배포 개선",
    "period": "2024.05 — 2025.01",
    "status": "이전 경력 · 이바이",
    "context": "이바이컴퍼니 · 실시간 입출금 대행 웹·앱 서비스",
    "ownership": "백엔드 개발자 / 파트너 연동 API·서비스 분리·배포·운영 참여",
    "scope": "PHP · Node.js · MariaDB · Redis · AWS · Docker · Argo CD · CloudWatch",
    "metric": "파트너 API",
    "metricLabel": "파트너사 개발자와 직접 협의한 시스템 연동",
    "metricCaption": "결제 요청 · 콜백 · 웹훅 / 결제 서비스 분리 · Argo CD 배포",
    "flow": [
      "요구·규격 협의",
      "연동 API 개발",
      "서비스 분리·배포"
    ],
    "cardCopy": "파트너마다 다른 응답 형식과 연동 방식을 개발자와 직접 협의해 결제 요청·콜백·웹훅 API를 만들었습니다. 웹서버에 묶여 있던 결제 서비스는 작은 서비스로 나누고 Argo CD로 배포했습니다.",
    "summary": "파트너마다 다른 결제 연동 규격을 개발자와 직접 협의해 API를 만들고, 웹서버에 묶여 있던 결제 서비스를 작은 서비스로 나눠 Argo CD로 배포했습니다.",
    "sections": [
      [
        "파트너 연동: 시스템마다 다른 규격 협의",
        "실시간 입출금 대행 서비스에서 파트너마다 시스템과 응답 형식·연동 방식이 달랐습니다. 파트너사 개발자와 직접 규격을 협의하고, PHP·Node.js로 결제 요청·콜백·웹훅 연동 API를 개발했습니다."
      ],
      [
        "구조와 배포 개선",
        "웹서버 안에 통합돼 있던 결제 처리 서비스를 여러 작은 서비스로 분리하고 Argo CD로 배포했습니다. Docker 기반 컨테이너를 도입하고, AWS EC2 운영체제 지원 종료에 따른 서비스 이전에도 참여했습니다."
      ],
      [
        "운영: 데이터 저장소와 모니터링·온콜",
        "MariaDB·Redis를 구성·운영하고 AWS CloudWatch와 오픈소스를 활용한 모니터링 대시보드를 구성했습니다. AWS Lambda와 SQS를 활용한 알람 서비스도 구성했습니다."
      ]
    ]
  }
};

const isEnglish = document.documentElement.lang === 'en';
const projectData = window.PROJECTS_EN || projects;
const menuLabels = isEnglish ? { open: 'Open menu', close: 'Close menu' } : { open: '메뉴 열기', close: '메뉴 닫기' };

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
function closeMenu() {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', menuLabels.open);
  nav.classList.remove('is-open');
}
menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? menuLabels.close : menuLabels.open);
  nav.classList.toggle('is-open', open);
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
window.matchMedia('(min-width: 761px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

const filters = document.querySelectorAll('[data-filter]');
const cards = document.querySelectorAll('[data-category]');
filters.forEach(button => button.addEventListener('click', () => {
  const category = button.dataset.filter;
  filters.forEach(filter => {
    const active = filter === button;
    filter.classList.toggle('active', active);
    filter.setAttribute('aria-pressed', String(active));
  });
  let count = 0;
  cards.forEach(card => {
    card.hidden = category !== 'all' && card.dataset.category !== category;
    if (!card.hidden) count++;
  });
  const filterLabel = button.textContent.trim().replace(/\s*\d+$/, '');
  document.querySelector('#filter-status').textContent = isEnglish ? `Showing ${count} projects: ${filterLabel}.` : `${filterLabel} 분야의 프로젝트 ${count}개를 표시합니다.`;
}));

const dialog = document.querySelector('#project-dialog');
let lastProjectTrigger = null;
document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
  const project = projectData[button.dataset.project];
  if (!project) return;
  lastProjectTrigger = button;
  const fields = { title: 'title', category: 'category', summary: 'summary', scope: 'scope', context: 'context', period: 'period', status: 'status', ownership: 'ownership', metric: 'metric', 'metric-label': 'metricLabel', 'metric-caption': 'metricCaption', signal: 'fdeSignal' };
  Object.entries(fields).forEach(([id, key]) => { document.querySelector(`#dialog-${id}`).textContent = project[key]; });
  const sections = document.querySelector('#dialog-sections');
  sections.replaceChildren();
  project.sections.forEach(([title, copy]) => {
    const section = document.createElement('section');
    const heading = document.createElement('h3');
    const paragraph = document.createElement('p');
    heading.textContent = title;
    paragraph.textContent = copy;
    section.append(heading, paragraph);
    sections.append(section);
  });
  dialog.showModal();
  document.body.classList.add('modal-open');
  document.querySelector('.dialog-scroll').scrollTop = 0;
  document.querySelector('.dialog-close').focus();
}));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('modal-open');
  if (lastProjectTrigger) lastProjectTrigger.focus({ preventScroll: true });
});
