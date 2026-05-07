import type en from "./en";

const ja: typeof en = {
  meta: {
    title: "Ray Otsuka｜大塚 嶺",
    description:
      "Ray Otsuka｜大塚 嶺　ポートフォリオサイト。2005年生まれ。UI / UX デザインをしつつ、プログラミングでWEBサイトやアプリ制作をしている。",
  },
  nav: {
    about: "About",
    projects: "Projects",
    work: "Work",
    contact: "Contact",
  },
  hero: {
    eyebrow: "Coding × Design × Photography",
    sectionLabel: "",
    name: "大塚 嶺",
    nameSub: "Ray Otsuka",
    ctaPrimary: "See more",
    ctaSecondary: "Contact",
    currentlyLabel: "現在",
    now: [
      {
        left: "エンジニア・デザイナー",
        org: "丸紅",
        right: "2026 →",
      },
      {
        left: "社長室",
        org: "霞ヶ関キャピタル",
        right: "2025 →",
      },
      {
        left: "CS専攻",
        org: "Cambridge · St. John's",
        right: "2024 →",
      },
    ],
  },
  about: {
    label: "Approach",
    heading_pre: "技術を、",
    heading_em: "現実で使われる体験",
    heading_post: "に落とし込む。",
    p1_pre:
      "11 歳からプログラミングを続けてきた。目指してきたのは、",
    p1_em: "テクノロジーで日常をほんの少し楽しくする",
    p1_mid: "こと。高校時代には AI 英会話アプリ ",
    p1_link_label: "AIbou",
    p1_link_href: "https://aibou.app",
    p1_post:
      " を開発し、GPT-3 の一般公開前に OpenAI から組み込み許可を得て実装した。渋谷署の許可を取り、街頭でポスターを配ってベータテスターを集め、1,800 人以上のダウンロードとメディア掲載、少額ながらの収益化までたどり着いた。",
    p2_pre: "大学では、高齢者向け AI 音声会話アプリの ",
    p2_em1: "記憶機能",
    p2_mid:
      " の設計と開発を主導した。グラフ理論に基づく水流モデルにより、",
    p2_em2: "何を",
    p2_mid2: "記憶するかではなく、",
    p2_em3: "どの程度の強さで想起するか",
    p2_post:
      " までを制御できる仕組みを構築。緩やかな忘却や、体験記憶が概念記憶へ統合されていく過程の再現も可能にした。本機能は本番環境に導入済み、特許出願中。",
    p3:
      "自分より技術的に優秀なエンジニアや、理論に詳しい人はたくさんいる。一方で、その知識や技術を、人が実際に使い、価値を感じる形にまで持っていく人は意外と多くないとも感じる。技術そのものよりも、それを体験として設計し、現実に落とし込む — その最後のひと押しに、自分の価値があると思う。",
  },
  vision: {
    label: "Vision",
    heading_pre: "技術ではなく、",
    heading_em: "体験",
    heading_post: "を届ける。",
    p1:
      "目指しているのは、先端技術を単なる機能として終わらせず、人が「来てよかった」「また体験したい」と感じる価値として社会に実装すること。",
    p2:
      "人の感情が動く瞬間を見ることが好きで、幼少期から世界観や仕組みを組み合わせ、ひとつの体験を設計することに強く惹かれてきた。アプリや AI の開発でも、正しさや性能より、どれだけ自然に没入できるかを大切にしている。",
    p3:
      "テーマパークは、空間・ストーリー・テクノロジー・運営という複合要素がすべて噛み合って初めて成立する、体験設計の究極形だと思う。複雑な要素を統合し、記憶に残る体験として形にする — その思想を軸に、技術を現実の体験へ落とし込み、実際に人の行動が変わるところまで見届けたい。",
  },
  projects: {
    label: "Projects",
    items: [
      {
        title: "AIbou",
        subtitle: "ネイティブレベルで学べる英会話アプリ",
        year: "2021 →",
        description:
          "高校時代に開発。日本人学習者が実際に直面する場面 — 病院の予約、カフェでの注文 — を想定したチャット形式の英会話アプリ。GPT-3 の一般公開前に OpenAI から組み込み許可を取得し、実装。ベータテスターは、渋谷署の許可を取り、週末に駅周辺でポスターを配って集めた。",
        stats: [
          "1,800 人以上のダウンロード",
          "OpenAI 連携 (一般公開前)",
          "テレビ掲載",
        ],
        link: "https://aibou.app",
        linkLabel: "aibou.app",
      },
      {
        title: "AI Memory",
        subtitle: "音声 AI のためのグラフ理論ベース記憶機構",
        year: "2025",
        description:
          "インターン中に、高齢者向け音声 AI コンパニオンの記憶アーキテクチャを設計・実装。グラフ理論に基づく『水流モデル』が、何を想起するかではなく『どの程度の強さで想起するか』までを制御。緩やかな忘却と、体験記憶から概念記憶への統合プロセスをモデル化した。",
        stats: ["特許出願中"],
      },
    ],
  },
  work: {
    label: "Experience",
    heading: "Work Experience",
    items: [
      {
        period: "2026 — 現在",
        role: "エンジニア・デザイナー",
        org: "丸紅",
        location: "オンライン · インターン",
        note: " SaaS プラットフォームおよび社内業務開発化ツールのデザイン・開発を担当。",
      },
      {
        period: "2025 — 現在",
        role: "社長室",
        org: "霞ヶ関キャピタル",
        location: "東京 · オンライン · インターン",
        note: "物流・ホテル・人事に関する横断的な業務を行う。",
      },
      {
        period: "2025 年 7–8 月",
        role: "エンジニア",
        org: "Reazon Holdings",
        location: "東京 · インターン",
        note:
          "高齢者向け AI 音声会話アプリの記憶機能の設計・実装を主導。特許出願中。応答待機中の『思考中』音声・視覚エフェクトを実装し、体感応答時間を短縮。",
      },
      {
        period: "2024 年 12 月 — 現在",
        role: "プロジェクトリーダー",
        org: "デジタル庁",
        location: "オンライン",
        note:
          "研究プロジェクトの一環として、新規デジタルサービスのプロトタイプを設計・開発。<br>デジタル監に対し、プロトタイプとシステムコンセプトを直接発表。",
      },
      {
        period: "2024 年 3–7 月",
        role: "コンサルティング",
        org: "DeFimans",
        subOrg: "現 SBI デジタルハブ子会社",
        location: "東京 · インターン",
        note: "web3 特化のコンサルティングベンチャーで、ブロックチェーン関連案件のサポートを担当。",
      },
    ],
  },
  toolkit: {
    label: "Skills",
    groups: [
      {
        group: "開発",
        items: [
          { name: "HTML · CSS · JavaScript", level: 5 },
          { name: "Next.js", level: 5 },
          { name: "Dart · Flutter", level: 5 },
          { name: "Swift", level: 4 },
          { name: "Python", level: 4 },
          { name: "Java", level: 3 },
        ],
      },
      {
        group: "デザイン",
        items: [
          { name: "Figma — UI/UX & ポスター", level: 6 },
          { name: "Adobe Illustrator", level: 2 },
        ],
      },
      {
        group: "ビジュアル",
        items: [
          { name: "Sony α7III — 写真", level: 4 },
          { name: "Adobe Lightroom", level: 5 },
          { name: "DaVinci Resolve — 動画編集", level: 1 },
        ],
      },
    ],
  },
  recognition: {
    label: "Honors",
    items: [
      { title: "孫正義育英財団", note: "2期" },
      { title: "未踏ジュニア", note: "最年少スーパークリエーター · 2017" },
      { title: "アプリ甲子園", note: "優勝 · 総務大臣賞 · 2021" },
      { title: "高校生プレゼン甲子園", note: "優秀賞" },
      { title: "日経ソーシャルビジネスコンテスト", note: "大賞" },
      { title: "柳井正財団", note: "奨学生" },
    ],
  },
  education: {
    label: "Education",
    currentBadge: "在籍中",
    items: [
      {
        period: "2024 — 2027",
        school: "University of Cambridge",
        college: "St. John's College",
        detail: "CS専攻 (BA) · 2027 年卒業予定",
        current: true,
      },
      {
        period: "2024",
        school: "慶應義塾大学",
        college: "",
        detail: "Cambridge 在籍中は休学中。",
      },
      {
        period: "2018 — 2024",
        school: "渋谷教育学園渋谷中学高等学校",
        college: "",
        detail: "東京都渋谷区。",
      },
    ],
  },
  media: {
    label: "Media",
    showMore: "Show more",
    showLess: "Show less",
    items: [
      {
        title: "「孫さんを超える」若者集う財団、2期生も異才ぞろい",
        outlet: "NIKKEI STYLE",
        url: "https://style.nikkei.com/article/DGXMZO35278550S8A910C1000000/",
      },
      {
        title:
          "テクノロジーで日常生活のクオリティを向上させたい。高校2年生のテッククリエイター【大塚嶺・17歳】",
        outlet: "Steenz",
        url: "https://steenz.jp/n/n3d630e32fbfb",
      },
      {
        title:
          "未踏ジュニア最年少スーパークリエータが語る「Medical × Technology」で実現したいこととは",
        outlet: "TechAcademy Magazine",
        url: "https://techacademy.jp/magazine/35669",
      },
      {
        title: "Leapday 2022 登壇",
        outlet: "Leapday",
        url: "https://www.2022.leapday.jp/post/sonmasayoshiikueizaidan",
      },
      {
        title:
          "小中学生のトップクリエイターが語る、プログラミングを学んで良かったことは?",
        outlet: "EdTechZine",
        url: "https://edtechzine.jp/article/detail/755",
      },
      {
        title:
          "「学校内でプログラミングの素晴らしさを広げたい」渋渋中学生の想いを TechAcademy ジュニアがサポート",
        outlet: "TechAcademy Magazine",
        url: "https://techacademy.jp/magazine/29113",
      },
      {
        title: "Tech Kids School 卒業生プロフィール",
        outlet: "Tech Kids School",
        url: "https://techkidsschool.jp/school/archivements/otsukarei/",
      },
      {
        title: "雑誌「HOUSING」にて、Tech Kids School の卒業生が紹介されました!",
        outlet: "Tech Kids School",
        url: "https://techkidsschool.jp/media/2017/11/09/017.html",
      },
      {
        title: "SHIBUYA QWS Station",
        outlet: "SHIBUYA QWS",
        url: "https://shibuya-qws.com/project/project-station",
      },
    ],
  },
  contact: {
    label: "Contact",
    heading: "Contact",
    form: {
      name: "お名前",
      email: "メールアドレス",
      message: "メッセージ",
      send: "送信する",
      sending: "送信中…",
      success: "メッセージを受け取った。折り返し連絡する。",
      error: "送信に失敗した。時間をおいて再度試してほしい。",
    },
    backToTop: "↑ 上に戻る",
  },
};

export default ja;
