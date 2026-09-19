/* ---------------------------------------------------------------------------
   CONFIG — everything you'll want to edit lives here.
--------------------------------------------------------------------------- */
export const CONFIG = {
  name: "Phani Peddapalem",
  firstName: "Phani",
  role: "Full-Stack Developer & AI Integration Specialist",

  // rotating word at the end of the hero headline
  heroWords: ["ships.", "scales.", "lasts.", "delights."],

  // words/symbols the hero particle sphere morphs into (your identity, in 3D)
  heroMorphs: ["PHANI", "{ }", "AI", "CODING", "GUITAR", "TRAVEL", "♥"],

  github: "phani",
  githubUrl: "https://github.com/Phani4658",
  linkedin: "phani",
  linkedinUrl: "https://www.linkedin.com/in/phani-cse",
  email: "officialphani.cse@gmail.com", // ← your email
  phone: "+91 96185 02227", // ← your phone
  location: "Nellore, India", // ← your city
  resumeUrl: "/phani-resume.pdf", // ← served from public/

  projects: [
    {
      featured: true,
      eyebrow: "Conversational AI · In production",
      title: "Engage — WhatsApp/SMS Platform",
      desc: "Core contributor to NxtPe's conversational platform. I built the command/action execution engine, an LLM-based conversation-tagging system for support-queue triage, and onboarding-automation workflows. Now powers 90K+ conversations and 460K+ message exchanges across partner channels.",
      tags: ["Spring Boot", "Kafka", "LLMs", "WhatsApp API"],
      link: "#contact",
      linkLabel: "Ask me about it",
    },
    {
      featured: false,
      eyebrow: "Full-stack platform · In production",
      title: "Notification & Messaging Pipeline",
      desc: "Extended NxtPe's multi-channel pipeline (SMS, WhatsApp, push) that processes 7.8M+ events across partner integrations — building the fallback-delivery system for failed sends, DND/opt-out compliance workflows, and Kafka-driven webhook callbacks.",
      tags: ["Spring Boot", "Kafka", "PostgreSQL", "AWS EKS"],
      link: "#contact",
      linkLabel: "Ask me about it",
    },
    {
      featured: false,
      eyebrow: "Insurtech · In production",
      title: "Jubilee Insurance Integration",
      desc: "Designed and led the integration of a third-party insurance policy/contract system for Jubilee Life Insurance (Uganda) — now 199,800+ active subscription contracts and 3M+ notifications delivered — including the Kora 3.0 mandate-management UI.",
      tags: ["Spring Boot", "PostgreSQL", "Kafka", "React"],
      link: "#contact",
      linkLabel: "Ask me about it",
    },
    {
      featured: false,
      eyebrow: "Full-stack platform · In production",
      title: "Intent & Probatus — Intake & Approvals",
      desc: "Built core modules of NxtPe's configurable application-intake and case-approval system — form/product/payment configuration, a multi-step approval workflow with role-based groups, and a Kafka listener that auto-creates subscription contracts on approval. Handles 5,200+ applications and 1,900+ cases.",
      tags: ["Spring Boot", "Kafka", "PostgreSQL", "React"],
      link: "#contact",
      linkLabel: "Ask me about it",
    },
    {
      featured: false,
      eyebrow: "Client work · Android & iOS",
      title: "Friendli — Social Calling Platform",
      desc: "Built end-to-end for a client: a React Native app where people discover creators and connect over audio and video, with per-minute billing against a coin wallet. Agora for calling, a modular Node/PostgreSQL backend handling real-time call billing, coin purchases and creator payouts, plus a React admin dashboard for approvals, moderation and revenue. Ships from a containerised AWS pipeline on ECS Fargate, with Terraform infrastructure and in-cloud release builds straight to Play.",
      tags: ["React Native", "Node.js", "PostgreSQL", "Agora", "AWS"],
      link: "#contact",
      linkLabel: "Ask me about it",
    },
    {
      featured: false,
      eyebrow: "Client work",
      title: "Sri Lakshmi Lavanya Jewellery",
      desc: "A catalogue site for a jewellery business, built end-to-end — storefront, backend, and an admin panel to manage the gold and silver collection.",
      tags: ["React", "Node.js", "Admin panel"],
      link: "https://catelouge-webpage.vercel.app/",
      linkLabel: "View live",
    },
    {
      featured: false,
      eyebrow: "Client work",
      title: "Lakka Bommalu Heritage",
      desc: "A site telling the story of lakka bommalu — traditional lacquered wooden toys — built to put a fading local craft online.",
      tags: ["React", "TypeScript", "Gemini API"],
      link: "https://lakkabommalu-heritage.vercel.app",
      linkLabel: "View live",
      repo: "https://github.com/Phani4658/lakkabommalu-heritage",
    },
  ],

  skills: [
    { label: "Languages", items: ["Java", "Python", "JavaScript (ES6+)", "TypeScript", "SQL"] },
    {
      label: "Backend & APIs",
      items: ["Spring Boot", "Node.js", "REST APIs", "Microservices", "Event-driven (Kafka)"],
    },
    { label: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "Shadcn/ui"] },
    { label: "Data & Messaging", items: ["PostgreSQL", "Redis", "MongoDB", "Kafka", "pgvector"] },
    {
      label: "Cloud & DevOps",
      items: ["AWS (EKS)", "Kubernetes", "Docker", "CI/CD (Buildpiper)"],
    },
    {
      label: "AI & Architecture",
      items: ["Prompt engineering", "LLM pipelines", "RAG", "System design", "Clean architecture", "Distributed systems"],
    },
  ],

  experience: [
    {
      meta: "Jan 2025 — Present",
      title: "Software Engineer — NxtPe",
      sub: "Own end-to-end backend delivery across 8+ fintech/insurtech services on Java, Spring Boot, Kafka, PostgreSQL, and Kubernetes (AWS EKS) — serving payments and insurance partners across East Africa.",
    },
    {
      meta: "Mar 2024 — Jan 2025",
      title: "Software Engineer Intern — Goformeet · Cosma Beauty",
      sub: "Built backend REST APIs and full-stack features (Java/Spring Boot, Node.js, Next.js) for booking, scheduling, and notification flows; cut backend response times by 20%.",
    },
    {
      meta: "Dec 2021 — Jun 2025",
      title: "B.Tech, Computer Science (AI & ML)",
      sub: "Geethanjali Institute of Science & Technology — 77.74%, First Class with Distinction.",
    },
  ],

  achievements: [
    {
      icon: "🏆",
      title: "Top 15 of 10,000+",
      sub: "Ranked 15th in NxtWave's national coding challenge — earning a fully-sponsored tech trip to Dubai.",
    },
    {
      icon: "🚀",
      title: "GDSC Lead",
      sub: "Founded and led the Google Developer Student Club at GIST — organizing hackathons and developer workshops.",
    },
  ],
  // personal bento cells (rendered after the professional ones)
  funFacts: [
    {
      eyebrow: "Off duty",
      title: "🎸 Guitar",
      sub: "When the laptop closes, the guitar comes out.",
    },
    {
      eyebrow: "Travel",
      title: "✈️ Travel",
      sub: "New places and new food, whenever I get the chance.",
    },
    {
      eyebrow: "Learning",
      title: "📚 Learning",
      sub: "Usually digging into something new — lately, AI tooling.",
    },
  ],

  // "Beyond the code" — the human section. Put your photo at public/me.jpg
  beyond: {
    quote: "Code is what I do —",
    quoteAccent: "not all of who I am.",
    paragraphs: [
      "I'm Phani, from Nellore. I started writing code because I liked watching an idea turn into something that actually runs — and a couple of years in, doing it full time, that still hasn't gotten old.",
      "Away from the keyboard I'm usually playing guitar, planning the next trip, or taking something apart to see how it works. I'm easy to work with, I'll tell you what I actually think, and I care about getting the details right.",
    ],
    // interests — shown as pills in the hero tag-cloud
    facets: [
      { emoji: "🎸", title: "Guitar", sub: "Self-taught, perpetually mid-song." },
      { emoji: "✈️", title: "Travel", sub: "New places, new food, new ideas." },
      { emoji: "☕", title: "Chai & coffee", sub: "The real stack I run on." },
      { emoji: "🛠️", title: "Tinkering", sub: "Side projects that may or may not ship." },
    ],
  },

  highlights: [
    {
      meta: "Scale",
      title: "7.8M+ messaging events",
      sub: "Extended NxtPe's multi-channel (SMS/WhatsApp/push) notification pipeline — fallback delivery for failed sends, DND/opt-out compliance, and Kafka-driven webhook callbacks.",
    },
    {
      meta: "AI",
      title: "90K+ AI-assisted conversations",
      sub: "Core contributor to Engage, NxtPe's WhatsApp/SMS platform — built the command/action engine and an LLM-based conversation-tagging system for support triage.",
    },
    {
      meta: "Insurtech",
      title: "199,800+ live contracts",
      sub: "Designed and led the Jubilee Life Insurance (Uganda) policy-system integration — 3M+ notifications delivered — plus the Kora 3.0 mandate-management UI.",
    },
  ],
};
