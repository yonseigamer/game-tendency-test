const testData = {
  dimensions: {
    action: "액션",
    social: "소셜",
    mastery: "숙련",
    achievement: "성취",
    immersion: "몰입",
    creativity: "창의성"
  },
  dimensionDescriptions: {
    action: "속도감과 강렬한 자극, 직접 부딪히는 플레이",
    social: "경쟁·협력·관계를 통해 재미를 얻는 플레이",
    mastery: "난관을 분석하고 실력을 갈고닦는 플레이",
    achievement: "성장·수집·완료를 통해 목표를 달성하는 플레이",
    immersion: "세계관과 인물, 역할과 이야기에 빠져드는 플레이",
    creativity: "꾸미고 실험하며 숨겨진 가능성을 발견하는 플레이"
  },
  startQuestion: "q1",
  questions: {
    q1:{label:"SCENE 01 · BATTLE",question:"처음 만난 강적이 길을 막아섭니다.",answers:[
      {text:"바로 달려들어 공격과 회피의 감각부터 익힌다.",scores:{action:3,mastery:1},next:"q2"},
      {text:"대화와 주변 단서를 확인해 싸움의 이유부터 알아본다.",scores:{immersion:2,social:1,creativity:1},next:"q2"},
      {text:"보상과 성장 가능성을 확인한 뒤 공략한다.",scores:{achievement:2,mastery:2},next:"q2"},
      {text:"예상 밖의 장비와 행동을 시험해 본다.",scores:{creativity:3,action:1},next:"q2"}]},
    q2:{label:"SCENE 02 · PARTY",question:"함께 플레이할 동료가 생겼습니다.",answers:[
      {text:"역할을 나누고 완벽한 호흡으로 어려운 구간을 넘는다.",scores:{social:3,mastery:1},next:"q3"},
      {text:"누가 더 잘하는지 겨루며 기록을 높인다.",scores:{social:2,achievement:1,action:1},next:"q3"},
      {text:"각자의 캐릭터와 이야기를 나누며 천천히 즐긴다.",scores:{social:2,immersion:2},next:"q3"},
      {text:"혼자서는 못 할 엉뚱한 조합을 함께 시도한다.",scores:{social:2,creativity:2},next:"q3"}]},
    q3:{label:"SCENE 03 · FAILURE",question:"같은 구간에서 계속 실패합니다.",answers:[
      {text:"반응 속도와 조작을 몸에 익힐 때까지 반복한다.",scores:{mastery:3,action:1},next:"q4"},
      {text:"패턴과 자원 흐름을 분석해 최적의 방법을 찾는다.",scores:{mastery:3,achievement:1},next:"q4"},
      {text:"장비와 능력치를 충분히 올린 뒤 돌아온다.",scores:{achievement:3,mastery:1},next:"q4"},
      {text:"전투를 피하거나 시스템의 허점을 찾는다.",scores:{creativity:3,mastery:1},next:"q4"}]},
    q4:{label:"SCENE 04 · REWARD",question:"긴 플레이 끝에 가장 만족스러운 순간은?",answers:[
      {text:"최고 장비와 강한 스탯을 완성했을 때",scores:{achievement:3,action:1},next:"q5"},
      {text:"퀘스트·도감·숨은 요소를 빠짐없이 채웠을 때",scores:{achievement:3,creativity:1},next:"q5"},
      {text:"아무도 못 깬 난관을 내 실력으로 넘었을 때",scores:{mastery:2,achievement:2},next:"q5"},
      {text:"좋아하는 인물과 특별한 관계를 만들었을 때",scores:{social:2,immersion:2},next:"q5"}]},
    q5:{label:"SCENE 05 · WORLD",question:"새로운 세계에 들어섰을 때 가장 먼저 끌리는 것은?",answers:[
      {text:"이 세계에서 내가 어떤 존재가 될 수 있는지",scores:{immersion:3,creativity:1},next:"q6"},
      {text:"등장인물과 사건이 어떤 이야기로 이어지는지",scores:{immersion:3,social:1},next:"q6"},
      {text:"어떤 적과 위험한 구간이 기다리는지",scores:{action:3,mastery:1},next:"q6"},
      {text:"어떤 아이템과 수집 요소가 숨어 있는지",scores:{achievement:2,creativity:2},next:"q6"}]},
    q6:{label:"SCENE 06 · FREEDOM",question:"게임이 넓은 자유를 줍니다.",answers:[
      {text:"내 집과 캐릭터를 취향대로 꾸민다.",scores:{creativity:3,immersion:1},next:"q7"},
      {text:"맵 구석구석을 뒤져 비밀과 이스터에그를 찾는다.",scores:{creativity:3,achievement:1},next:"q7"},
      {text:"새로운 빌드와 기묘한 조합을 계속 실험한다.",scores:{creativity:3,mastery:1},next:"q7"},
      {text:"메인 이야기에 집중해 세계의 결말을 확인한다.",scores:{immersion:3,achievement:1},next:"q7"}]},
    q7:{label:"SCENE 07 · THRILL",question:"당신을 가장 빠르게 게임에 몰입시키는 장면은?",answers:[
      {text:"폭발과 타격음이 쏟아지는 화려한 전투",scores:{action:3,achievement:1},next:"q8"},
      {text:"실수 한 번이 패배로 이어지는 긴장된 보스전",scores:{action:2,mastery:2},next:"q8"},
      {text:"동료와 동시에 움직여 위기를 넘기는 순간",scores:{action:2,social:2},next:"q8"},
      {text:"조용한 장면에서 밝혀지는 충격적인 진실",scores:{immersion:3,creativity:1},next:"q8"}]},
    q8:{label:"SCENE 08 · COMMUNITY",question:"게임 밖에서도 계속하고 싶은 활동은?",answers:[
      {text:"랭킹과 기록을 비교하며 경쟁하기",scores:{social:3,achievement:1},next:"q9"},
      {text:"공략을 나누고 함께 실력을 높이기",scores:{social:2,mastery:2},next:"q9"},
      {text:"캐릭터와 스토리에 관해 이야기하기",scores:{social:2,immersion:2},next:"q9"},
      {text:"내 꾸미기·빌드·플레이를 공유하기",scores:{social:2,creativity:2},next:"q9"}]},
    q9:{label:"SCENE 09 · PERFECT RUN",question:"당신이 말하는 ‘완벽한 플레이’에 가장 가까운 것은?",answers:[
      {text:"한 번도 실수하지 않고 고난도 구간을 돌파하는 것",scores:{mastery:3,achievement:1},next:"q10"},
      {text:"가장 효율적인 전략과 자원 배분을 찾아내는 것",scores:{mastery:3,creativity:1},next:"q10"},
      {text:"모든 콘텐츠와 목표를 빠짐없이 끝내는 것",scores:{achievement:3,mastery:1},next:"q10"},
      {text:"세계의 설정과 사건을 모순 없이 이해하는 것",scores:{immersion:2,mastery:2},next:"q10"}]},
    q10:{label:"SCENE 10 · COLLECTION",question:"반드시 하나를 끝까지 모아야 한다면?",answers:[
      {text:"최고 등급 장비와 가장 강한 능력",scores:{achievement:3,action:1},next:"q11"},
      {text:"모든 퀘스트와 도감 기록",scores:{achievement:3,immersion:1},next:"q11"},
      {text:"NPC들의 대화와 관계 이벤트",scores:{social:2,immersion:2},next:"q11"},
      {text:"숨겨진 장소와 독특한 상호작용",scores:{creativity:2,immersion:1,achievement:1},next:"q11"}]},
    q11:{label:"SCENE 11 · ROLE",question:"게임 속에서 가장 해보고 싶은 경험은?",answers:[
      {text:"강한 전사가 되어 위험한 세계를 직접 헤쳐 나가기",scores:{immersion:2,action:2},next:"q12"},
      {text:"인물들의 관계와 선택이 바뀌는 이야기에 참여하기",scores:{immersion:3,social:1},next:"q12"},
      {text:"세계에 남은 단서로 숨겨진 진실을 추리하기",scores:{immersion:2,mastery:2},next:"q12"},
      {text:"내가 만든 공간과 방식으로 그 세계에서 살아가기",scores:{immersion:2,creativity:2},next:"q12"}]},
    q12:{label:"SCENE 12 · MY STYLE",question:"친구가 정석 공략을 알려줬습니다.",answers:[
      {text:"더 빠르고 화려하게 깰 방법을 찾는다.",scores:{action:2,creativity:2},next:null},
      {text:"그 공략을 익혀 더 안정적이고 완벽하게 수행한다.",scores:{mastery:3,achievement:1},next:null},
      {text:"목표만 달성된다면 그대로 따라간다.",scores:{achievement:3,social:1},next:null},
      {text:"일부러 전혀 다른 선택과 조합을 시험한다.",scores:{creativity:3,immersion:1},next:null}]}
  },
  combinations: {
    "action-social": {title:"전장을 함께 누비는 돌격대장",character:"클로스",game:"Hollow Knight",description:"동료들과 함께 시련에 뛰어들고, 긴장과 환호를 나누며 위기를 극복하는 플레이어입니다.",keywords:["협동","전투","용기","호흡"]},
    "action-mastery": {title:"한계에 도전하는 결투가",character:"호넷",game:"Hollow Knight: Silksong",description:"자신의 조작과 판단을 시험하는 최고의 시련 자체를 즐깁니다. 패배는 다음 도전을 위한 연습입니다.",keywords:["보스전","피지컬","집중","재도전"]},
    "action-achievement": {title:"업적을 사냥하는 정복자",character:"말론",game:"Stardew Valley",description:"위험한 목표일수록 직접 돌파해 성취를 증명하고 싶어 합니다. 강한 보상과 어려운 기록에 끌립니다.",keywords:["토벌","업적","보상","정복"]},
    "action-immersion": {title:"세계에 뛰어드는 모험가",character:"기사",game:"Hollow Knight",description:"험난한 세계를 관찰만 하기보다 자신의 두 손으로 헤쳐 나가며 그 안의 이야기를 경험합니다.",keywords:["모험","전투","세계관","여정"]},
    "action-creativity": {title:"전투를 놀이로 바꾸는 트릭스터",character:"메타톤 EX",game:"UNDERTALE",description:"정해진 방식에 머물지 않고 화려하고 독특한 방법으로 챌린지를 자신만의 무대로 바꿉니다.",keywords:["변칙","액션","연출","실험"]},
    "social-mastery": {title:"합을 맞추는 전략적 조력자",character:"퀴렐",game:"Hollow Knight",description:"피드백과 역할 분담을 통해 동료와 함께 성장하고, 완벽한 호흡으로 난관을 넘을 때 희열을 느낍니다.",keywords:["협력","전략","피드백","성장"]},
    "social-achievement": {title:"성과를 빛내는 스타 플레이어",character:"알렉스",game:"Stardew Valley",description:"사람들과 활발히 교류하면서도 뛰어난 기록과 성취를 인정받고 싶어 하는 플레이어입니다.",keywords:["경쟁","랭킹","인정","목표"]},
    "social-immersion": {title:"관계를 살아가는 롤플레이어",character:"랄세이",game:"DELTARUNE",description:"게임 속 인물들과 깊은 관계를 맺고, 그 세계의 한 사람으로 살아가는 경험을 소중히 여깁니다.",keywords:["관계","대화","공감","롤플레잉"]},
    "social-creativity": {title:"취향을 나누는 크리에이터",character:"에밀리",game:"Stardew Valley",description:"자신만의 독창적인 스타일을 만들고, 다른 사람과 공유하며 새로운 반응을 얻는 것을 즐깁니다.",keywords:["공유","스타일","창작","커뮤니티"]},
    "mastery-achievement": {title:"완벽을 반복하는 완주자",character:"프리스크",game:"UNDERTALE",description:"완벽한 하나의 플레이를 위해 몇 번이고 도전하며, 결국 스스로 세운 목표를 끝까지 달성합니다.",keywords:["완주","숙련","반복","완벽"]},
    "mastery-immersion": {title:"세계의 진실을 푸는 해석자",character:"마법사",game:"Stardew Valley",description:"숨겨진 설정과 단서를 파헤쳐 세계관과 서사를 빈틈없이 이해하려는 플레이어입니다.",keywords:["분석","설정","추리","세계관"]},
    "mastery-creativity": {title:"시스템을 비트는 연구자",character:"샌즈",game:"UNDERTALE",description:"게임의 규칙을 깊이 이해한 뒤, 그 구조를 이용해 새롭고 독창적인 플레이를 만들어 냅니다.",keywords:["시스템","실험","전략","변칙"]},
    "achievement-immersion": {title:"이야기를 수집하는 기록가",character:"건터",game:"Stardew Valley",description:"서브퀘스트와 수집 요소를 빠짐없이 모으며, 세계의 이야기를 하나의 완성된 기록으로 남깁니다.",keywords:["수집","기록","서브퀘스트","완성"]},
    "achievement-creativity": {title:"목표를 새롭게 푸는 개척자",character:"라이너스",game:"Stardew Valley",description:"정석적인 길보다 독특한 플레이 방식으로 목표와 도전과제를 달성하는 데 큰 만족을 느낍니다.",keywords:["도전과제","자유","독창성","개척"]},
    "immersion-creativity": {title:"세계에 흔적을 남기는 방랑자",character:"코니퍼",game:"Hollow Knight",description:"다양한 환경을 찾아다니며 세계에 녹아들고, 자신만의 시선과 흔적을 그 안에 남기고 싶어 합니다.",keywords:["탐험","분위기","창작","발견"]}
  }
};
