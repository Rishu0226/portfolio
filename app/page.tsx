"use client";
import { useState, useEffect, useRef, FormEvent } from "react";
import ReCAPTCHA from "react-google-recaptcha";

/* ─── TYPES ─── */
type Category = "All" | "SaaS & Business" | "E-Commerce" | "Web & Marketing";

interface Project {
  url: string;
  title: string;
  desc: string;
  tech: string[];
  cat: Category;
  catStyle: string;
}

/* ─── DATA ─── */
const projects: Project[] = [
  {
    url: "apnabillbook.com",
    title: "Apna Bill Book",
    desc: "Full-featured GST billing & invoicing SaaS for Indian SMEs. Includes admin, catalog, and franchise sub-portals with real-time data sync.",
    tech: ["Next.js", "React", "REST API", "Redux"],
    cat: "SaaS & Business",
    catStyle: "cat-saas",
  },
  {
    url: "admin.apnabillbook.com",
    title: "Apna Bill Book — Admin",
    desc: "Admin portal for managing users, billing plans, subscriptions, and analytics. Built with role-based access and workflow automation.",
    tech: ["React", "TypeScript", "Redux", "REST API"],
    cat: "SaaS & Business",
    catStyle: "cat-saas",
  },
  {
    url: "catalog.apnabillbook.com",
    title: "Apna Bill Book — Catalog",
    desc: "Product catalog management system for merchants to manage inventory, categories, and product listings at scale.",
    tech: ["React", "Next.js", "Tailwind"],
    cat: "SaaS & Business",
    catStyle: "cat-saas",
  },
  {
    url: "franchise.apnabillbook.com",
    title: "Apna Bill Book — Franchise",
    desc: "Franchise onboarding and management portal with authentication, subscription tiers, and reporting dashboards.",
    tech: ["Next.js", "TypeScript", "REST API"],
    cat: "SaaS & Business",
    catStyle: "cat-saas",
  },
  {
    url: "invoice.apnabillbook.com/view/invoice/quick-retail-sales-invoice/a4/sample-a1bbc9fa-6fff-42bd-aa3f-8bc980ad8301?color=8B5CF6&toolbar=true",
    title: "Apna Bill Book — Invoice",
    desc: "Pixel-perfect GST invoice viewer with dynamic colour theming, A4 print layout, and shareable invoice links for merchants.",
    tech: ["Next.js", "React", "PDF", "TypeScript"],
    cat: "SaaS & Business",
    catStyle: "cat-saas",
  },
  {
    url: "andor.finance",
    title: "Andor Finance",
    desc: "Modern fintech platform for financial analytics, portfolio management, and investment tracking with real-time data.",
    tech: ["Next.js", "GraphQL", "TypeScript", "SSR"],
    cat: "SaaS & Business",
    catStyle: "cat-saas",
  },
  {
    url: "frontend.andor.finance",
    title: "Andor Finance — Frontend",
    desc: "High-performance frontend for Andor Finance featuring dynamic charts, secure API integration, and responsive dashboards.",
    tech: ["React", "Redux", "REST API", "Chart.js"],
    cat: "SaaS & Business",
    catStyle: "cat-saas",
  },
  {
    url: "apnasoftwares.com",
    title: "Apna Softwares",
    desc: "Corporate website for an IT services company showcasing their products, services, case studies, and team.",
    tech: ["Next.js", "Tailwind", "SSR", "SEO"],
    cat: "Web & Marketing",
    catStyle: "cat-web",
  },
  {
    url: "fchbiz.com",
    title: "FCH Bizz",
    desc: "B2B business portal for franchise and channel management with lead tracking and client communication tools.",
    tech: ["React", "Node.js", "REST API"],
    cat: "SaaS & Business",
    catStyle: "cat-saas",
  },
  {
    url: "guardianread.com",
    title: "Guardian Read",
    desc: "Digital news and editorial platform with category-based content, SEO-optimized article pages, and fast load times.",
    tech: ["Next.js", "SSR", "Tailwind", "SEO"],
    cat: "Web & Marketing",
    catStyle: "cat-web",
  },
  {
    url: "telecomssupermarket.co.uk",
    title: "Telecoms Supermarket",
    desc: "UK-based telecoms comparison and e-commerce platform for broadband, SIM, and phone deals with complex filtering.",
    tech: ["React", "Next.js", "REST API", "TypeScript"],
    cat: "E-Commerce",
    catStyle: "cat-ecom",
  },
  {
    url: "ebev.com",
    title: "eBev",
    desc: "Online beverage marketplace with product listing, cart, checkout, and delivery tracking for global customers.",
    tech: ["React", "Redux", "REST API", "Bootstrap"],
    cat: "E-Commerce",
    catStyle: "cat-ecom",
  },
  {
    url: "delhichaicafe.com",
    title: "Delhi Chai Cafe",
    desc: "Restaurant brand website with menu showcase, online ordering integration, and event/catering inquiry flow.",
    tech: ["Next.js", "Tailwind", "Animations"],
    cat: "Web & Marketing",
    catStyle: "cat-web",
  },
  {
    url: "litonthegospa.com",
    title: "Lit On The Go Spa",
    desc: "Mobile spa and wellness brand site with service listings, booking flow, and testimonials. Mobile-first responsive design.",
    tech: ["React", "CSS3", "Animations", "SEO"],
    cat: "Web & Marketing",
    catStyle: "cat-web",
  },
  {
    url: "hotlandbase.com",
    title: "Hotland Base",
    desc: "Hospitality and property listing platform with search, filters, and booking management for premium listings.",
    tech: ["React", "TypeScript", "REST API"],
    cat: "E-Commerce",
    catStyle: "cat-ecom",
  },
  {
    url: "layer.page",
    title: "Layer Page",
    desc: "No-code page builder and link-in-bio tool for creators. Rich editor interface with drag-and-drop block management.",
    tech: ["React", "TypeScript", "Redux", "DnD"],
    cat: "SaaS & Business",
    catStyle: "cat-saas",
  },
  {
    url: "zebet.ng",
    title: "Zebet Nigeria",
    desc: "Sports betting and gaming platform for the Nigerian market with live odds, match tracking, and account management.",
    tech: ["React", "Redux", "WebSocket", "REST API"],
    cat: "SaaS & Business",
    catStyle: "cat-saas",
  },
  {
    url: "waterharmonizerapp.com",
    title: "Water Harmonizer App",
    desc: "Health-tech web app for water quality monitoring, usage tracking, and wellness recommendations.",
    tech: ["React", "Next.js", "REST API", "Tailwind"],
    cat: "Web & Marketing",
    catStyle: "cat-web",
  },
  {
    url: "savannasurvival.io",
    title: "Savanna Survival",
    desc: "Interactive survival game platform with leaderboards, dynamic gameplay UI, and real-time player statistics.",
    tech: ["React", "Canvas API", "WebSocket", "TypeScript"],
    cat: "SaaS & Business",
    catStyle: "cat-saas",
  },
];

const skillGroups = [
  {
    icon: "⚛️",
    label: "Frontend",
    cls: "bg-a",
    skills: [
      { name: "React.js", level: 95 },
      { name: "Next.js", level: 92 },
      { name: "JavaScript", level: 95 },
      { name: "TypeScript", level: 88 },
      { name: "HTML5 / CSS3", level: 97 },
      { name: "Tailwind CSS", level: 92 },
      { name: "Redux", level: 90 },
    ],
  },
  {
    icon: "🔌",
    label: "Backend & APIs",
    cls: "bg-b",
    skills: [
      { name: "REST APIs", level: 92 },
      { name: "Node.js", level: 65 },
      { name: "GraphQL", level: 70 },
      { name: "WebSocket", level: 68 },
      { name: "SSR / SSG", level: 88 },
      { name: "MongoDB", level: 60 },
      { name: "AngularJS", level: 72 },
    ],
  },
  {
    icon: "🛠️",
    label: "Tools & Workflow",
    cls: "bg-c",
    skills: [
      { name: "Git / GitHub", level: 90 },
      { name: "CI/CD", level: 72 },
      { name: "Figma", level: 78 },
      { name: "Webpack / Vite", level: 75 },
      { name: "Jest / Testing", level: 65 },
      { name: "SEO / Performance", level: 85 },
      { name: "Responsive Design", level: 95 },
    ],
  },
];

const experiences = [
  {
    date: "Apr 2023 – Present",
    role: "Frontend Developer (React / Next.js)",
    company: "Apna Softwares",
    points: [
      "Improved overall application performance by 20% using advanced React optimisation techniques.",
      "Implemented SSR with Next.js, enhancing SEO visibility and reducing page load time.",
      "Developed scalable, reusable UI components to accelerate feature delivery.",
      "Integrated secure REST APIs for real-time data handling and reporting.",
      "Reduced manual reporting time by 50% through frontend workflow automation.",
    ],
  },
  {
    date: "Jul 2022 – Mar 2023",
    role: "Frontend Developer (React / Angular)",
    company: "Inext Web Technologies Pvt. Ltd",
    points: [
      "Built enterprise-level apps with React and Angular, improving performance by 30% and cutting load time by 25%.",
      "Optimised frontend architecture, reducing load time by an additional 20–30%.",
      "Resolved API latency issues and improved real-time data synchronisation.",
    ],
  },
  {
    date: "May 2021 – Jun 2022",
    role: "Frontend Developer (React / Angular)",
    company: "Xebertech Pvt. Ltd",
    points: [
      "Built a client feedback portal that increased customer retention by 12%.",
      "Designed reusable UI components, boosting dev efficiency by 40% and reducing code redundancy.",
    ],
  },
  {
    date: "Feb 2021 – Apr 2021",
    role: "Frontend Intern",
    company: "Xebertech Pvt. Ltd",
    points: ["Optimised frontend modules, reducing load time by 40%."],
  },
];

const navLinks = [
  "home",
  "about",
  "skills",
  "experience",
  "projects",
  "contact",
];
const filterTabs: Category[] = [
  "All",
  "SaaS & Business",
  "E-Commerce",
  "Web & Marketing",
];
const techPills = [
  "React.js",
  "Next.js",
  "TypeScript",
  "Redux",
  "GraphQL",
  "Node.js",
  "Tailwind",
  "SSR/SSG",
  "REST APIs",
  "CI/CD",
];
const statCards = [
  { icon: "⚡", num: "4+ Years", sub: "React & Next.js\nFrontend Development" },
  {
    icon: "🏢",
    num: "3 Companies",
    sub: "Apna Softwares\nInext Web · Xebertech",
  },
  {
    icon: "🚀",
    num: "19+ Projects",
    sub: "Live production\ndeployments globally",
  },
  {
    icon: "🎓",
    num: "B.Tech CSE",
    sub: "Dr. A.P.J. Abdul Kalam\nTechnical University",
  },
];
const contactItems = [
  {
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=rishabhdubey104@gmail.com",
    icon: "✉",
    label: "Email",
    value: "rishabhdubey104@gmail.com",
    external: true,
  },
  {
    href: "tel:+917417437418",
    icon: "📞",
    label: "Phone / WhatsApp",
    value: "+91 7417437418",
    external: false,
  },
  {
    href: "https://linkedin.com/in/er-rishabh-dubey-64b73b1a1",
    icon: "in",
    label: "LinkedIn",
    value: "er-rishabh-dubey",
    external: true,
  },
  {
    href: "https://github.com/Rishu0226",
    icon: "GH",
    label: "GitHub",
    value: "github.com/Rishu0226",
    external: true,
  },
];

/* ─── COMPONENT ─── */
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<Category>("All");
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    botField: "",
    otp: "",
  });
  const [otpHash, setOtpHash] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [formState, setFormState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [formMsg, setFormMsg] = useState("");
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = document.querySelectorAll("section[id]");
      let cur = "home";
      sections.forEach((s) => {
        if (window.scrollY >= (s as HTMLElement).offsetTop - 120) cur = s.id;
      });
      setActiveSection(cur);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        }),
      { threshold: 0.08 },
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            el.style.width = (el.dataset.width ?? "0") + "%";
            obs.unobserve(el);
          }
        }),
      { threshold: 0.5 },
    );
    document.querySelectorAll(".skill-bar").forEach((b) => obs.observe(b));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        }),
      { threshold: 0.06 },
    );
    gridRef.current?.querySelectorAll(".reveal").forEach((el) => {
      el.classList.remove("visible");
      obs.observe(el);
    });
    return () => obs.disconnect();
  }, [activeTab]);

  const smoothTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const filteredProjects =
    activeTab === "All"
      ? projects
      : projects.filter((p) => p.cat === activeTab);

  const handleSendOtp = async () => {
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setFormState("error");
      setFormMsg("Please enter a valid email first.");
      setTimeout(() => setFormState("idle"), 3000);
      return;
    }
    setSendingOtp(true);
    setFormState("loading");
    try {
      const res = await fetch("/api/contact/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email }),
      });
      const data = await res.json();
      if (res.ok) {
        setOtpHash(data.hash);
        setOtpSent(true);
        setFormState("success");
        setFormMsg("OTP sent to your email!");
      } else {
        setFormState("error");
        setFormMsg(data.error || "Failed to send OTP.");
      }
    } catch {
      setFormState("error");
      setFormMsg("Network error.");
    }
    setSendingOtp(false);
    setTimeout(() => setFormState("idle"), 5000);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormState("loading");
    
    if (!otpSent || !form.otp) {
      setFormState("error");
      setFormMsg("Please verify your email with OTP first.");
      setTimeout(() => setFormState("idle"), 3000);
      return;
    }

    const recaptchaToken = recaptchaRef.current?.getValue();
    if (!recaptchaToken) {
      setFormState("error");
      setFormMsg("Please complete the reCAPTCHA challenge.");
      setTimeout(() => setFormState("idle"), 3000);
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, otpHash, recaptchaToken }),
      });
      const data = await res.json();
      if (res.ok) {
        setFormState("success");
        setFormMsg("✓ Message sent! I'll get back to you within 24 hours.");
        setForm({ name: "", email: "", phone: "", subject: "", message: "", botField: "", otp: "" });
        setOtpHash("");
        setOtpSent(false);
        recaptchaRef.current?.reset();
      } else {
        setFormState("error");
        setFormMsg(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setFormState("error");
      setFormMsg("Network error. Please try again.");
    }
    setTimeout(() => setFormState("idle"), 5000);
  };

  return (
    <>
      <style>{`
        /*
         * FONTS:
         * — Raleway       → headings / display / logo / nav labels (wght 400–900)
         * — Poppins       → body copy, buttons, labels, UI text (wght 300–700)
         * — JetBrains Mono → code block only (wght 400–600)
         */
        @import url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400&family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=JetBrains+Mono:wght@400;500;600&display=swap');

        :root {
          /* ── COLOUR PALETTE ── */
          --c1: #0f0c29;
          --c2: #0a1628;
          --bg: #080b14;
          --surface: #0c1020;

          --teal:    #00d2c8;
          --teal2:   #00b4d8;
          --violet:  #7c3aed;
          --violet2: #a855f7;
          --emerald: #10b981;
          --emerald2:#34d399;
          --gold:    #f59e0b;
          --gold2:   #fbbf24;

          --grad-main: linear-gradient(135deg, #00d2c8 0%, #7c3aed 50%, #a855f7 100%);
          --grad-alt:  linear-gradient(135deg, #10b981 0%, #00b4d8 50%, #7c3aed 100%);
          --grad-warm: linear-gradient(135deg, #f59e0b 0%, #ef4444 50%, #7c3aed 100%);
          --grad-card: linear-gradient(135deg, rgba(0,210,200,.06) 0%, rgba(124,58,237,.06) 100%);

          --text:   #e8edf5;
          --muted:  #64748b;
          --border: rgba(0,210,200,.14);
          --card:   rgba(12,16,32,.75);
          --radius: 16px;
          --nav-h:  68px;

          /* ── FONT FAMILIES ── */
          --font-display: 'Raleway', sans-serif;   /* headings, logo, nav */
          --font-body:    'Poppins', sans-serif;    /* all body / UI text  */
          --font-mono:    'JetBrains Mono', monospace; /* code block       */
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; font-size: 16px; }

        body {
          font-family: var(--font-body);
          font-weight: 400;
          background: var(--bg);
          color: var(--text);
          overflow-x: hidden;
          line-height: 1.65;
        }

        a { text-decoration: none; color: inherit; }
        ul { list-style: none; }
        button { cursor: pointer; font: inherit; border: none; background: none; }
        img { display: block; max-width: 100%; }

        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: var(--bg); }
        ::-webkit-scrollbar-thumb { background: linear-gradient(180deg, var(--teal), var(--violet)); border-radius: 99px; }

        /* ── BACKGROUND MESH ── */
        body::before {
          content: '';
          position: fixed; inset: 0;
          background:
            radial-gradient(ellipse 80% 60% at 10% 10%, rgba(0,210,200,.07) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 90% 80%, rgba(124,58,237,.09) 0%, transparent 55%),
            radial-gradient(ellipse 50% 40% at 50% 50%, rgba(16,185,129,.04) 0%, transparent 60%);
          pointer-events: none; z-index: 0;
        }
        body::after {
          content: '';
          position: fixed; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E");
          pointer-events: none; z-index: 0; opacity: .5;
        }

        /* ── ORBS ── */
        .orbs { position: fixed; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; }
        .orb { position: absolute; border-radius: 50%; filter: blur(110px); animation: drift 22s ease-in-out infinite alternate; }
        .orb-1 { width: 700px; height: 700px; background: radial-gradient(circle, rgba(0,210,200,.18), transparent 70%); top: -250px; left: -200px; animation-delay: 0s; }
        .orb-2 { width: 600px; height: 600px; background: radial-gradient(circle, rgba(124,58,237,.2), transparent 70%); bottom: -100px; right: -200px; animation-delay: -8s; }
        .orb-3 { width: 450px; height: 450px; background: radial-gradient(circle, rgba(16,185,129,.12), transparent 70%); top: 45%; left: 35%; animation-delay: -15s; }
        @keyframes drift { 0% { transform: translate(0,0) scale(1); } 100% { transform: translate(50px,35px) scale(1.12); } }

        /* ── REVEAL ── */
        .reveal { opacity: 0; transform: translateY(30px); transition: opacity .75s ease, transform .75s ease; }
        .reveal.visible { opacity: 1; transform: none; }
        .reveal.d1 { transition-delay: .1s; } .reveal.d2 { transition-delay: .2s; }
        .reveal.d3 { transition-delay: .3s; } .reveal.d4 { transition-delay: .4s; }

        /* ── FADE-UP HERO ── */
        @keyframes fadeUp { from { opacity:0; transform:translateY(26px); } to { opacity:1; transform:none; } }
        .fu  { animation: fadeUp .7s ease both; }
        .fu1 { animation-delay: .1s; } .fu2 { animation-delay: .2s; }
        .fu3 { animation-delay: .3s; } .fu4 { animation-delay: .4s; }
        .fu5 { animation-delay: .5s; }

        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:.35; } }
        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }

        /* ── DIVIDER ── */
        .divider { width:100%; height:1px; background:linear-gradient(90deg,transparent,rgba(0,210,200,.2),rgba(124,58,237,.2),transparent); position:relative; z-index:1; }

        /* ── SECTION LABELS ── */
        .s-label {
          /* Poppins 600 small-caps label */
          font-family: var(--font-body);
          font-weight: 600;
          font-size: .72rem;
          letter-spacing: .22em;
          text-transform: uppercase;
          margin-bottom: 10px;
          background: var(--grad-main);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .s-title {
          /* Raleway 800 — display heading */
          font-family: var(--font-display);
          font-size: clamp(1.9rem, 5vw, 3.2rem);
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 48px;
          letter-spacing: -.02em;
        }
        .s-title span {
          background: var(--grad-main);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* ── RECAPTCHA SCALING ── */
        .recaptcha-wrapper {
          display: flex;
          justify-content: flex-start;
          width: 100%;
          overflow: hidden;
        }
        @media (max-width: 380px) {
          .recaptcha-wrapper iframe {
            transform: scale(0.85);
            transform-origin: 0 0;
          }
        }
        @media (max-width: 340px) {
          .recaptcha-wrapper iframe {
            transform: scale(0.75);
            transform-origin: 0 0;
          }
        }

        /* ════════════════════════════════
           NAV
        ════════════════════════════════ */
        nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          height: var(--nav-h); display: flex; align-items: center;
          justify-content: space-between; padding: 0 clamp(16px, 4vw, 48px);
          border-bottom: 1px solid var(--border);
          backdrop-filter: blur(24px) saturate(1.5);
          transition: background .35s;
        }
        nav.scrolled { background: rgba(8,11,20,.96); }
        nav:not(.scrolled) { background: rgba(8,11,20,.78); }

        .nav-logo {
          /* Raleway 800 — bold brand mark */
          font-family: var(--font-display);
          font-size: 1.45rem;
          font-weight: 800;
          letter-spacing: -.01em;
          background: var(--grad-main);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          flex-shrink: 0;
        }

        .nav-links { display: flex; gap: clamp(20px, 3vw, 40px); }
        .nav-links button {
          /* Raleway 600 — nav items */
          font-family: var(--font-display);
          font-size: .88rem;
          font-weight: 600;
          color: var(--muted);
          letter-spacing: .05em;
          transition: color .3s;
          background: none; border: none; cursor: pointer;
          position: relative; padding: 2px 0;
        }
        .nav-links button::after {
          content: ''; position: absolute; left: 0; bottom: -3px;
          width: 0; height: 1.5px;
          background: var(--grad-main); transition: width .35s;
        }
        .nav-links button:hover, .nav-links button.active { color: var(--teal); }
        .nav-links button:hover::after, .nav-links button.active::after { width: 100%; }

        .hamburger { display: none; flex-direction: column; gap: 5px; width: 28px; cursor: pointer; padding: 4px; background: none; border: none; }
        .hamburger span { display: block; height: 2px; background: var(--text); border-radius: 2px; transition: .3s; }
        .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; }
        .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        .mobile-nav {
          position: fixed; top: var(--nav-h); left: 0; right: 0; z-index: 99;
          background: rgba(8,11,20,.98); backdrop-filter: blur(24px);
          max-height: 0; overflow: hidden;
          border-bottom: 1px solid var(--border);
          transition: max-height .4s ease, padding .4s ease;
        }
        .mobile-nav.open { max-height: 420px; padding: 16px 0 24px; }
        .mobile-nav button {
          display: block; width: 100%; text-align: left;
          padding: 13px clamp(20px, 5vw, 40px);
          /* Raleway 700 mobile nav items */
          font-family: var(--font-display);
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--muted); background: none; border: none; cursor: pointer; transition: color .2s;
        }
        .mobile-nav button:hover { color: var(--teal); }

        /* ════════════════════════════════
           HERO
        ════════════════════════════════ */
        #home {
          min-height: 100vh; display: flex; align-items: center;
          padding: calc(var(--nav-h) + 60px) clamp(16px, 5vw, 24px) 80px;
          max-width: 1200px; margin: 0 auto;
          position: relative; z-index: 1;
        }
        .hero-inner {
          display: grid; grid-template-columns: 1fr 420px;
          gap: clamp(32px, 6vw, 80px); align-items: center; width: 100%;
        }

        .hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 6px 16px; border-radius: 99px;
          border: 1px solid rgba(0,210,200,.25);
          background: rgba(0,210,200,.07);
          /* Poppins 600 — badge label */
          font-family: var(--font-body);
          font-size: .78rem;
          font-weight: 600;
          color: var(--teal); margin-bottom: 22px;
        }
        .badge-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--emerald2); box-shadow: 0 0 8px var(--emerald); animation: pulse 2s infinite; }

        .hero-greeting {
          /* Poppins 300 italic — greeting line */
          font-family: var(--font-body);
          font-size: 1.05rem;
          font-weight: 300;
          font-style: italic;
          color: var(--muted); margin-bottom: 6px;
        }

        .hero-name {
          /* Raleway 900 — maximum display weight */
          font-family: var(--font-display);
          font-size: clamp(3.2rem, 8vw, 6.5rem);
          font-weight: 900;
          line-height: .93;
          letter-spacing: -.04em;
          margin-bottom: 18px;
        }
        .hero-name .l1 { display: block; color: var(--text); }
        .hero-name .l2 {
          display: block;
          background: var(--grad-main);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }

        .hero-role {
          /* Poppins 300 — subtitle role */
          font-family: var(--font-body);
          font-size: 1.1rem;
          font-weight: 300;
          color: var(--muted); margin-bottom: 18px;
        }
        .hero-role strong {
          /* Poppins 600 inside role line */
          font-weight: 600;
          color: var(--text);
        }

        .hero-desc {
          /* Poppins 400 — body description */
          font-family: var(--font-body);
          font-size: .97rem;
          font-weight: 400;
          line-height: 1.78;
          color: var(--muted); max-width: 520px; margin-bottom: 34px;
        }

        .hero-stats { display: flex; gap: clamp(16px, 4vw, 32px); margin-bottom: 38px; flex-wrap: wrap; }
        .stat-num {
          display: block;
          /* Raleway 800 — stat numbers */
          font-family: var(--font-display);
          font-size: clamp(1.5rem, 4vw, 2rem);
          font-weight: 800;
          background: var(--grad-main);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .stat-lbl {
          /* Poppins 500 — stat label */
          font-family: var(--font-body);
          font-size: .7rem;
          font-weight: 500;
          color: var(--muted);
        }

        .btn-row { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 30px; }
        .btn-p {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px clamp(20px, 3vw, 30px); border-radius: 10px;
          /* Raleway 700 — primary CTA */
          font-family: var(--font-display);
          font-size: .9rem;
          font-weight: 700;
          letter-spacing: .03em;
          background: var(--grad-main); color: #fff;
          box-shadow: 0 4px 24px rgba(0,210,200,.3); transition: .3s;
        }
        .btn-p:hover { transform: translateY(-2px); box-shadow: 0 10px 36px rgba(0,210,200,.4); }
        .btn-o {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px clamp(20px, 3vw, 30px); border-radius: 10px;
          /* Raleway 600 — secondary CTA */
          font-family: var(--font-display);
          font-size: .9rem;
          font-weight: 600;
          letter-spacing: .03em;
          border: 1.5px solid rgba(0,210,200,.3); color: var(--text);
          background: rgba(0,210,200,.05); transition: .3s;
        }
        .btn-o:hover { border-color: var(--teal); background: rgba(0,210,200,.1); transform: translateY(-2px); }

        .socials { display: flex; gap: 10px; flex-wrap: wrap; }
        .sl {
          width: 40px; height: 40px; border-radius: 10px;
          border: 1.5px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          /* Poppins 700 — icon labels */
          font-family: var(--font-body);
          font-size: .78rem;
          font-weight: 700;
          color: var(--muted); transition: .3s;
        }
        .sl:hover { border-color: var(--teal); color: var(--teal); background: rgba(0,210,200,.1); transform: translateY(-3px); }

        /* hero code card */
        .hero-card {
          position: relative; background: var(--card);
          border: 1px solid rgba(0,210,200,.18);
          border-radius: 20px; padding: 26px;
          backdrop-filter: blur(20px); overflow: visible;
        }
        .hero-card::before {
          content: ''; position: absolute; inset: 0; border-radius: 20px;
          background: linear-gradient(135deg, rgba(0,210,200,.05), rgba(124,58,237,.05));
          pointer-events: none;
        }
        .hero-card::after {
          content: ''; position: absolute; inset: -1px; border-radius: 20px;
          background: linear-gradient(135deg, rgba(0,210,200,.3), transparent 50%, rgba(124,58,237,.2));
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude; padding: 1px; pointer-events: none; z-index: -1;
        }
        .card-dots { display: flex; gap: 6px; margin-bottom: 18px; }
        .cd { width: 11px; height: 11px; border-radius: 50%; }
        .cd1 { background: #f87171; } .cd2 { background: #fbbf24; } .cd3 { background: var(--emerald2); }

        /* JetBrains Mono 500 — code block */
        .code {
          font-family: var(--font-mono);
          font-size: .8rem;
          font-weight: 500;
          line-height: 1.9;
          color: #a8b2d1;
        }
        .ck { color: var(--teal); } .cs { color: var(--emerald2); }
        .cp { color: #cbd5e1; } .cv { color: #c084fc; } .cc { color: #94a3b8; font-style: italic; } .cf { color: var(--teal2); }

        .hero-tags { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 20px; }
        .htag {
          padding: 4px 11px; border-radius: 99px;
          border: 1px solid rgba(0,210,200,.15);
          /* Poppins 500 — tag pills */
          font-family: var(--font-body);
          font-size: .7rem;
          font-weight: 500;
          color: var(--muted); background: rgba(0,210,200,.04);
        }

        .float-badge {
          position: absolute; bottom: -16px; right: 20px;
          background: var(--grad-main); color: #fff;
          /* Raleway 800 — floating badge */
          font-family: var(--font-display);
          font-size: .7rem;
          font-weight: 800;
          padding: 7px 14px; border-radius: 8px;
          letter-spacing: .06em;
          box-shadow: 0 6px 24px rgba(0,210,200,.35);
        }

        /* ════════════════════════════════
           ABOUT
        ════════════════════════════════ */
        #about { position: relative; z-index: 1; max-width: 1200px; margin: 0 auto; padding: clamp(60px,10vw,100px) clamp(16px,5vw,24px); }
        .about-grid { display: grid; grid-template-columns: 1fr 1.3fr; gap: clamp(32px,6vw,64px); align-items: start; }
        .about-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .about-card {
          position: relative; background: var(--card);
          border: 1px solid var(--border); border-radius: var(--radius);
          padding: clamp(16px,3vw,24px) clamp(14px,2.5vw,20px);
          text-align: center; backdrop-filter: blur(16px); transition: .35s; overflow: hidden;
        }
        .about-card::before { content: ''; position: absolute; inset: 0; background: var(--grad-card); }
        .about-card:hover { border-color: rgba(0,210,200,.4); transform: translateY(-5px); box-shadow: 0 16px 40px rgba(0,210,200,.1); }
        .about-card-icon { font-size: 1.7rem; margin-bottom: 8px; }

        .about-card h3 {
          /* Raleway 700 — card heading */
          font-family: var(--font-display);
          font-size: clamp(.95rem,2vw,1.1rem);
          font-weight: 700;
          color: var(--text); margin-bottom: 5px;
        }
        .about-card p {
          /* Poppins 400 — card body */
          font-family: var(--font-body);
          font-size: .78rem;
          font-weight: 400;
          color: var(--muted); line-height: 1.5; white-space: pre-line;
        }

        .about-text-block { display: flex; flex-direction: column; gap: 18px; }
        .about-text {
          /* Poppins 400 — body paragraphs */
          font-family: var(--font-body);
          font-size: .97rem;
          font-weight: 400;
          color: var(--muted); line-height: 1.82;
        }
        .about-text strong {
          /* Poppins 600 — inline emphasis */
          font-weight: 600;
          color: var(--text);
        }

        .hl {
          background: linear-gradient(135deg, rgba(0,210,200,.12), rgba(124,58,237,.12));
          color: var(--teal);
          /* Poppins 600 — highlight chip */
          font-weight: 600;
          padding: 1px 7px; border-radius: 5px;
          border: 1px solid rgba(0,210,200,.15);
        }

        .tech-pills { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 6px; }
        .tpill {
          padding: 5px 14px; border-radius: 99px;
          border: 1px solid var(--border);
          /* Poppins 500 — tech pill */
          font-family: var(--font-body);
          font-size: .76rem;
          font-weight: 500;
          color: var(--muted); background: rgba(0,210,200,.04); transition: .3s;
        }
        .tpill:hover { border-color: var(--teal); color: var(--teal); background: rgba(0,210,200,.09); }

        /* ════════════════════════════════
           SKILLS
        ════════════════════════════════ */
        #skills { position: relative; z-index: 1; background: var(--surface); padding: clamp(60px,10vw,100px) clamp(16px,5vw,24px); }
        .skills-inner { max-width: 1200px; margin: 0 auto; }
        .skills-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
        .skill-cat {
          background: var(--card); border: 1px solid var(--border);
          border-radius: var(--radius); padding: clamp(20px,3vw,28px);
          backdrop-filter: blur(16px); transition: .35s;
        }
        .skill-cat:hover { border-color: rgba(0,210,200,.3); box-shadow: 0 8px 32px rgba(0,210,200,.06); }

        .skill-cat-head {
          display: flex; align-items: center; gap: 10px; margin-bottom: 22px;
          /* Raleway 700 — skill category heading */
          font-family: var(--font-display);
          font-size: 1rem;
          font-weight: 700;
        }
        .skill-cat-icon { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: .88rem; }
        .bg-a { background: rgba(0,210,200,.15); }
        .bg-b { background: rgba(124,58,237,.15); }
        .bg-c { background: rgba(16,185,129,.15); }

        .skill-item { display: flex; align-items: center; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,.04); }
        .skill-item:last-child { border: none; }
        .skill-name {
          /* Poppins 400 — skill label */
          font-family: var(--font-body);
          font-size: .86rem;
          font-weight: 400;
          color: var(--text);
        }
        .skill-bar-wrap { width: 88px; height: 4px; background: rgba(255,255,255,.07); border-radius: 2px; overflow: hidden; }
        .skill-bar { height: 100%; border-radius: 2px; background: var(--grad-main); width: 0; transition: width 1.3s cubic-bezier(.4,0,.2,1); }

        /* ════════════════════════════════
           EXPERIENCE
        ════════════════════════════════ */
        #experience { position: relative; z-index: 1; max-width: 1200px; margin: 0 auto; padding: clamp(60px,10vw,100px) clamp(16px,5vw,24px); }
        .timeline { position: relative; }
        .timeline::before {
          content: ''; position: absolute; left: 14px; top: 0; bottom: 0; width: 1.5px;
          background: linear-gradient(to bottom, var(--teal), var(--violet), transparent);
        }
        .tl-item { position: relative; padding-left: 52px; margin-bottom: 40px; }
        .tl-dot {
          position: absolute; left: 7px; top: 6px; width: 15px; height: 15px;
          border-radius: 50%; background: var(--bg);
          border: 2.5px solid var(--teal);
          box-shadow: 0 0 14px rgba(0,210,200,.5);
        }
        .tl-card {
          background: var(--card); border: 1px solid var(--border);
          border-radius: var(--radius); padding: clamp(20px,3vw,28px);
          backdrop-filter: blur(16px); transition: .35s;
        }
        .tl-card:hover { border-color: rgba(0,210,200,.3); transform: translateX(6px); box-shadow: 0 8px 32px rgba(0,0,0,.25); }

        .tl-date {
          display: inline-flex;
          background: linear-gradient(135deg, rgba(0,210,200,.12), rgba(124,58,237,.12));
          border: 1px solid rgba(0,210,200,.2); color: var(--teal);
          /* Poppins 600 — date badge */
          font-family: var(--font-body);
          font-size: .73rem;
          font-weight: 600;
          padding: 3px 12px; border-radius: 99px; margin-bottom: 10px;
        }

        .tl-role {
          /* Raleway 700 — job title */
          font-family: var(--font-display);
          font-size: clamp(.95rem,2vw,1.1rem);
          font-weight: 700;
          color: var(--text); margin-bottom: 3px;
        }
        .tl-company {
          /* Poppins 600 — company name */
          font-family: var(--font-body);
          font-size: .88rem;
          font-weight: 600;
          color: var(--teal2); margin-bottom: 13px;
        }

        .tl-pts { display: flex; flex-direction: column; gap: 7px; }
        .tl-pts li {
          /* Poppins 400 — bullet points */
          font-family: var(--font-body);
          font-size: .86rem;
          font-weight: 400;
          color: var(--muted); line-height: 1.68; padding-left: 14px; position: relative;
        }
        .tl-pts li::before { content: '▸'; position: absolute; left: 0; color: var(--teal); font-size: .68rem; top: 2px; }

        /* ════════════════════════════════
           PROJECTS
        ════════════════════════════════ */
        #projects { position: relative; z-index: 1; background: var(--surface); padding: clamp(60px,10vw,100px) clamp(16px,5vw,24px); }
        .projects-inner { max-width: 1200px; margin: 0 auto; }

        .filter-tabs { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 44px; }
        .ftab {
          padding: 8px clamp(14px,2.5vw,22px); border-radius: 99px;
          border: 1.5px solid var(--border);
          /* Raleway 700 — filter tab */
          font-family: var(--font-display);
          font-size: .82rem;
          font-weight: 700;
          letter-spacing: .03em;
          color: var(--muted); transition: .3s; white-space: nowrap;
        }
        .ftab:hover { border-color: var(--teal); color: var(--teal); }
        .ftab.active {
          background: var(--grad-main); border-color: transparent; color: #fff;
          box-shadow: 0 4px 18px rgba(0,210,200,.3);
        }

        .projects-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        .proj-card {
          position: relative; background: var(--card); border: 1px solid var(--border);
          border-radius: var(--radius); padding: clamp(18px,3vw,26px);
          backdrop-filter: blur(16px); display: flex; flex-direction: column; gap: 11px;
          transition: .35s; overflow: hidden;
        }
        .proj-card::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(0,210,200,.06), rgba(124,58,237,.06));
          opacity: 0; transition: .35s;
        }
        .proj-card:hover { border-color: rgba(0,210,200,.35); transform: translateY(-6px); box-shadow: 0 20px 50px rgba(0,0,0,.45), 0 0 0 1px rgba(0,210,200,.1); }
        .proj-card:hover::after { opacity: 1; }

        .proj-num {
          /* Raleway 800 — large project number */
          font-family: var(--font-display);
          font-size: 2rem;
          font-weight: 800;
          color: rgba(0,210,200,.1); line-height: 1;
        }

        .proj-cat { display: inline-flex; padding: 3px 10px; border-radius: 99px; font-size: .68rem; font-weight: 700; letter-spacing: .06em; width: fit-content; text-transform: uppercase;
          /* Poppins 700 — category badge */
          font-family: var(--font-body);
        }
        .cat-saas { background: rgba(0,210,200,.12); color: var(--teal); border: 1px solid rgba(0,210,200,.2); }
        .cat-ecom { background: rgba(124,58,237,.12); color: var(--violet2); border: 1px solid rgba(124,58,237,.2); }
        .cat-web  { background: rgba(16,185,129,.12); color: var(--emerald2); border: 1px solid rgba(16,185,129,.2); }

        .proj-title {
          /* Raleway 700 — project name */
          font-family: var(--font-display);
          font-size: clamp(.95rem,2vw,1.05rem);
          font-weight: 700;
          color: var(--text); line-height: 1.3;
        }
        .proj-desc {
          /* Poppins 400 — project description */
          font-family: var(--font-body);
          font-size: .8rem;
          font-weight: 400;
          color: var(--muted); line-height: 1.68; flex: 1;
        }

        .proj-tech { display: flex; flex-wrap: wrap; gap: 5px; }
        .proj-tag {
          padding: 3px 9px; border-radius: 6px;
          background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.07);
          /* Poppins 500 — tech tag */
          font-family: var(--font-body);
          font-size: .68rem;
          font-weight: 500;
          color: var(--muted);
        }

        .proj-link {
          /* Raleway 700 — visit link */
          font-family: var(--font-display);
          font-size: .78rem;
          font-weight: 700;
          color: var(--teal); display: flex; align-items: center; gap: 4px; transition: gap .3s;
        }
        .proj-card:hover .proj-link { gap: 9px; }

        /* ════════════════════════════════
           CONTACT
        ════════════════════════════════ */
        #contact { position: relative; z-index: 1; max-width: 1200px; margin: 0 auto; padding: clamp(60px,10vw,100px) clamp(16px,5vw,24px); }
        .contact-wrap { display: grid; grid-template-columns: 1fr 1.6fr; gap: clamp(32px,5vw,56px); align-items: start; }
        .contact-info { display: flex; flex-direction: column; gap: 18px; }

        .contact-info-title {
          /* Raleway 700 — sidebar heading */
          font-family: var(--font-display);
          font-size: clamp(1.2rem,3vw,1.5rem);
          font-weight: 700;
          color: var(--text); margin-bottom: 4px;
        }

        .c-item {
          display: flex; align-items: center; gap: 14px;
          padding: clamp(12px,2vw,16px) clamp(14px,2.5vw,20px);
          border-radius: var(--radius); border: 1px solid var(--border);
          background: var(--card); backdrop-filter: blur(16px); transition: .35s;
        }
        .c-item:hover { border-color: rgba(0,210,200,.35); transform: translateX(6px); box-shadow: 0 6px 24px rgba(0,210,200,.08); }
        .c-icon {
          width: 42px; height: 42px; border-radius: 11px; flex-shrink: 0;
          background: linear-gradient(135deg, rgba(0,210,200,.12), rgba(124,58,237,.12));
          border: 1px solid rgba(0,210,200,.2);
          display: flex; align-items: center; justify-content: center;
          /* Poppins 700 — icon text */
          font-family: var(--font-body);
          font-size: .95rem;
          font-weight: 700;
        }
        .c-label {
          /* Poppins 500 — field label */
          font-family: var(--font-body);
          font-size: .72rem;
          font-weight: 500;
          color: var(--muted); margin-bottom: 1px;
        }
        .c-value {
          /* Poppins 600 — field value */
          font-family: var(--font-body);
          font-size: .85rem;
          font-weight: 600;
          color: var(--text);
        }

        .form-card {
          background: var(--card); border: 1px solid rgba(0,210,200,.15);
          border-radius: 20px; padding: clamp(24px,4vw,36px);
          backdrop-filter: blur(16px);
        }
        .form-card h3 {
          /* Raleway 800 — form heading */
          font-family: var(--font-display);
          font-size: clamp(1.3rem,3vw,1.55rem);
          font-weight: 800;
          margin-bottom: 5px;
        }
        .form-card p {
          /* Poppins 400 — form subheading */
          font-family: var(--font-body);
          font-size: .875rem;
          font-weight: 400;
          color: var(--muted); margin-bottom: 26px; line-height: 1.65;
        }

        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .form-group { display: flex; flex-direction: column; gap: 5px; margin-bottom: 14px; }
        .form-group label {
          /* Poppins 600 — input label */
          font-family: var(--font-body);
          font-size: .76rem;
          font-weight: 600;
          color: var(--muted);
        }
        .form-input, .form-textarea {
          background: rgba(255,255,255,.04); border: 1.5px solid rgba(255,255,255,.07);
          border-radius: 10px; padding: 11px 14px; color: var(--text);
          /* Poppins 400 — input text */
          font-family: var(--font-body);
          font-size: .87rem;
          font-weight: 400;
          transition: border-color .3s; outline: none; resize: none; width: 100%;
        }
        .form-input:focus, .form-textarea:focus { border-color: var(--teal); box-shadow: 0 0 0 3px rgba(0,210,200,.08); }
        .form-textarea { min-height: 118px; }
        .form-input::placeholder, .form-textarea::placeholder { color: #2d3748; }

        .btn-submit {
          width: 100%; padding: 14px;
          background: var(--grad-main); color: #fff;
          /* Raleway 800 — submit button */
          font-family: var(--font-display);
          font-size: .95rem;
          font-weight: 800;
          letter-spacing: .04em;
          border-radius: 10px; cursor: pointer; transition: .3s;
          box-shadow: 0 4px 20px rgba(0,210,200,.28); border: none;
        }
        .btn-submit:hover { transform: translateY(-2px); box-shadow: 0 10px 36px rgba(0,210,200,.42); }
        .btn-submit:disabled { opacity: .6; cursor: not-allowed; transform: none; }

        .form-msg { padding: 11px 15px; border-radius: 10px; font-size: .855rem; margin-bottom: 18px; font-family: var(--font-body); font-weight: 400; }
        .form-msg.success { background: rgba(16,185,129,.1); border: 1px solid rgba(16,185,129,.22); color: #6ee7b7; }
        .form-msg.error   { background: rgba(239,68,68,.1);  border: 1px solid rgba(239,68,68,.22);  color: #fca5a5; }

        /* ════════════════════════════════
           FOOTER
        ════════════════════════════════ */
        footer {
          position: relative; z-index: 1;
          border-top: 1px solid var(--border);
          padding: clamp(32px,5vw,48px) clamp(16px,5vw,24px) clamp(28px,4vw,40px);
          display: flex; flex-direction: column; align-items: center; gap: 18px;
        }
        .footer-logo {
          /* Raleway 800 — footer brand */
          font-family: var(--font-display);
          font-size: 1.4rem;
          font-weight: 800;
          background: var(--grad-main);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .footer-links { display: flex; gap: clamp(14px,3vw,28px); flex-wrap: wrap; justify-content: center; }
        .footer-links button {
          /* Raleway 600 — footer nav */
          font-family: var(--font-display);
          font-size: .82rem;
          font-weight: 600;
          letter-spacing: .04em;
          color: var(--muted); transition: color .2s;
          background: none; border: none; cursor: pointer;
        }
        .footer-links button:hover { color: var(--teal); }
        .footer-socials { display: flex; gap: 10px; }
        .fsoc {
          width: 36px; height: 36px; border-radius: 9px;
          border: 1.5px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          /* Poppins 700 — social icon */
          font-family: var(--font-body);
          font-size: .74rem;
          font-weight: 700;
          color: var(--muted); transition: .3s;
        }
        .fsoc:hover { border-color: var(--teal); color: var(--teal); background: rgba(0,210,200,.08); transform: translateY(-3px); }

        .footer-copy {
          /* Poppins 400 — copyright */
          font-family: var(--font-body);
          font-size: .76rem;
          font-weight: 400;
          color: var(--muted);
        }

        /* ════════════════════════════════
           RESPONSIVE
        ════════════════════════════════ */
        @media (max-width: 1024px) {
          .hero-inner { grid-template-columns: 1fr; gap: 48px; }
          .hero-card { max-width: 520px; }
          .about-grid { grid-template-columns: 1fr; }
          .skills-grid { grid-template-columns: 1fr 1fr; }
          .projects-grid { grid-template-columns: 1fr 1fr; }
          .contact-wrap { grid-template-columns: 1fr; }
        }
        @media (max-width: 768px) {
          :root { --nav-h: 62px; }
          nav { padding: 0 18px; }
          .nav-links { display: none; }
          .hamburger { display: flex; }
          .skills-grid { grid-template-columns: 1fr; }
          .projects-grid { grid-template-columns: 1fr; }
          .form-row { grid-template-columns: 1fr; }
          #home { padding: calc(var(--nav-h) + 36px) 18px 56px; }
          .hero-stats { gap: 18px; }
          .timeline::before { left: 10px; }
          .tl-item { padding-left: 40px; }
          .tl-dot { left: 3px; width: 13px; height: 13px; }
        }
        @media (max-width: 600px) {
          .about-cards { grid-template-columns: 1fr 1fr; }
          .filter-tabs { gap: 6px; }
          .ftab { font-size: .74rem; padding: 7px 13px; }
          .btn-row { flex-direction: column; align-items: flex-start; }
          .btn-p, .btn-o { width: 100%; justify-content: center; }
          .hero-card { display: none; }
        }
        @media (max-width: 400px) {
          .about-cards { grid-template-columns: 1fr; }
          .hero-stats { flex-wrap: wrap; gap: 14px; }
          .hero-stats > div { min-width: calc(50% - 7px); }
        }
      `}</style>

      {/* ORBS */}
      <div className="orbs" aria-hidden="true">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      {/* NAV */}
      <nav className={scrolled ? "scrolled" : ""} aria-label="Main navigation">
        <span className="nav-logo">Rishabh Dubey</span>
        <ul className="nav-links" role="list">
          {navLinks.map((s) => (
            <li key={s}>
              <button
                className={activeSection === s ? "active" : ""}
                onClick={() => smoothTo(s)}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            </li>
          ))}
        </ul>
        <button
          className={`hamburger${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div className={`mobile-nav${menuOpen ? " open" : ""}`}>
        {navLinks.map((s) => (
          <button key={s} onClick={() => smoothTo(s)}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      {/* HERO */}
      <section id="home" aria-label="Hero">
        <div className="hero-inner">
          {/* Left */}
          <div>
            <div className="hero-badge fu">
              <span className="badge-dot" />
              Available for new opportunities
            </div>
            <p className="hero-greeting fu fu1">Hello, I&apos;m</p>
            <h1 className="hero-name fu fu2">
              <span className="l1">Rishabh</span>
              <span className="l2">Dubey</span>
            </h1>
            <p className="hero-role fu fu3">
              Frontend Engineer ·{" "}
              <strong>React &amp; Next.js Specialist</strong>
            </p>
            <p className="hero-desc fu fu4">
              4+ years building scalable, high-performance, SEO-optimized web
              applications. Specialised in SSR, reusable component architecture,
              and secure API integrations that improve load times by 20–40%.
            </p>
            <div className="hero-stats fu fu4">
              {[
                { num: "4+", lbl: "Years Exp." },
                { num: "19+", lbl: "Live Projects" },
                { num: "40%", lbl: "Load Improvement" },
                { num: "3", lbl: "Companies" },
              ].map((s) => (
                <div key={s.lbl}>
                  <span className="stat-num">{s.num}</span>
                  <span className="stat-lbl">{s.lbl}</span>
                </div>
              ))}
            </div>
            <div className="btn-row fu fu5">
              <button className="btn-p" onClick={() => smoothTo("projects")}>
                View Projects →
              </button>
              <button className="btn-o" onClick={() => smoothTo("contact")}>
                Contact Me
              </button>
            </div>
            <div className="socials fu fu5">
              {[
                {
                  href: "https://linkedin.com/in/er-rishabh-dubey-64b73b1a1",
                  label: "LinkedIn",
                  icon: "in",
                  ext: true,
                },
                {
                  href: "https://github.com/Rishu0226",
                  label: "GitHub",
                  icon: "GH",
                  ext: true,
                },
                {
                  href: "https://mail.google.com/mail/?view=cm&fs=1&to=rishabhdubey104@gmail.com",
                  label: "Email",
                  icon: "✉",
                  ext: true,
                },
                {
                  href: "tel:+917417437418",
                  label: "Phone",
                  icon: "📞",
                  ext: false,
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.ext ? "_blank" : undefined}
                  rel={s.ext ? "noopener noreferrer" : undefined}
                  className="sl"
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Right — code card */}
          <div className="hero-card fu fu2">
            <div className="card-dots">
              <div className="cd cd1" />
              <div className="cd cd2" />
              <div className="cd cd3" />
            </div>
            <pre className="code" style={{ whiteSpace: "pre-wrap" }}>
              <div>
                <span className="ck">const</span>{" "}
                <span className="cf">developer</span>{" "}
                <span className="cp">=</span> {"{"}
              </div>
              <div>
                {"  "}
                <span className="cv">name</span>
                <span className="cp">:</span>{" "}
                <span className="cs">&quot;Rishabh Dubey&quot;</span>
                <span className="cp">,</span>
              </div>
              <div>
                {"  "}
                <span className="cv">role</span>
                <span className="cp">:</span>{" "}
                <span className="cs">&quot;Frontend Engineer&quot;</span>
                <span className="cp">,</span>
              </div>
              <div>
                {"  "}
                <span className="cv">experience</span>
                <span className="cp">:</span>{" "}
                <span className="cs">&quot;4+ years&quot;</span>
                <span className="cp">,</span>
              </div>
              <div>
                {"  "}
                <span className="cv">stack</span>
                <span className="cp">: [</span>
              </div>
              <div>
                {"    "}
                <span className="cs">&quot;React.js&quot;</span>
                <span className="cp">,</span>{" "}
                <span className="cs">&quot;Next.js&quot;</span>
                <span className="cp">,</span>
              </div>
              <div>
                {"    "}
                <span className="cs">&quot;TypeScript&quot;</span>
                <span className="cp">,</span>{" "}
                <span className="cs">&quot;Redux&quot;</span>
              </div>
              <div>
                {"  "}
                <span className="cp">],</span>
              </div>
              <div>
                {"  "}
                <span className="cv">available</span>
                <span className="cp">:</span> <span className="ck">true</span>
              </div>
              <div>
                <span className="cp">{"}"}</span>
              </div>
              <div> </div>
              <div>
                <span className="cc">{"// Currently at Apna Softwares"}</span>
              </div>
              <div>
                <span className="cf">developer</span>
                <span className="cp">.</span>
                <span className="cf">hire</span>
                <span className="cp">();</span>{" "}
                <span className="cc">{"// → 🚀"}</span>
              </div>
            </pre>
            <div className="hero-tags">
              {[
                "React.js",
                "Next.js",
                "TypeScript",
                "SSR",
                "Redux",
                "Tailwind",
              ].map((t) => (
                <span key={t} className="htag">
                  {t}
                </span>
              ))}
            </div>
            <div className="float-badge">Open to Opportunities</div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ABOUT */}
      <section id="about" aria-labelledby="about-title">
        <p className="s-label reveal">Get To Know More</p>
        <h2 className="s-title reveal" id="about-title">
          About <span>Me</span>
        </h2>
        <div className="about-grid">
          <div className="about-cards">
            {statCards.map((s, i) => (
              <div className={`about-card reveal d${i + 1}`} key={s.num}>
                <div className="about-card-icon">{s.icon}</div>
                <h3>{s.num}</h3>
                <p>{s.sub}</p>
              </div>
            ))}
          </div>
          <div className="about-text-block">
            <p className="about-text reveal">
              I&apos;m a passionate Frontend Engineer from{" "}
              <span className="hl">Muzaffarnagar, Uttar Pradesh</span>, with a
              deep focus on crafting web experiences that are fast, accessible,
              and beautiful. I specialise in{" "}
              <span className="hl">React.js and Next.js</span>, with a strong
              command of TypeScript, Redux, GraphQL, and performance
              optimisation techniques like SSR, code splitting, and lazy
              loading.
            </p>
            <p className="about-text reveal">
              Across my career I&apos;ve{" "}
              <span className="hl">cut page load times by 20–50%</span>, reduced
              manual reporting effort by half, and improved customer retention
              through thoughtful UI design. I bring precision, ownership, and a
              product-first mindset to every project I touch.
            </p>
            <p className="about-text reveal">
              I&apos;ve worked across industries — fintech, SaaS, e-commerce,
              hospitality, and gaming — delivering enterprise-grade solutions
              that scale. Every line of code I write is aimed at{" "}
              <strong>real impact</strong>.
            </p>
            <div className="tech-pills reveal">
              {techPills.map((t) => (
                <span className="tpill" key={t}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* SKILLS */}
      <section id="skills" aria-labelledby="skills-title">
        <div className="skills-inner">
          <p className="s-label reveal">Explore My</p>
          <h2 className="s-title reveal" id="skills-title">
            Technical <span>Skills</span>
          </h2>
          <div className="skills-grid">
            {skillGroups.map((grp, gi) => (
              <div className={`skill-cat reveal d${gi + 1}`} key={grp.label}>
                <div className="skill-cat-head">
                  <div className={`skill-cat-icon ${grp.cls}`}>{grp.icon}</div>
                  {grp.label}
                </div>
                {grp.skills.map((sk) => (
                  <div className="skill-item" key={sk.name}>
                    <span className="skill-name">{sk.name}</span>
                    <div className="skill-bar-wrap">
                      <div
                        className="skill-bar"
                        data-width={sk.level}
                        style={{ width: 0 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* EXPERIENCE */}
      <section id="experience" aria-labelledby="work-title">
        <p className="s-label reveal">My Journey</p>
        <h2 className="s-title reveal" id="work-title">
          Work <span>Experience</span>
        </h2>
        <div className="timeline">
          {experiences.map((exp, i) => (
            <div className={`tl-item reveal d${Math.min(i + 1, 4)}`} key={i}>
              <div className="tl-dot" aria-hidden="true" />
              <div className="tl-card">
                <span className="tl-date">{exp.date}</span>
                <h3 className="tl-role">{exp.role}</h3>
                <p className="tl-company">{exp.company}</p>
                <ul className="tl-pts">
                  {exp.points.map((pt, j) => (
                    <li key={j}>{pt}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* PROJECTS */}
      <section id="projects" aria-labelledby="projects-title">
        <div className="projects-inner">
          <p className="s-label reveal">Browse My Recent</p>
          <h2 className="s-title reveal" id="projects-title">
            Featured <span>Projects</span>
          </h2>
          <div className="filter-tabs reveal">
            {filterTabs.map((t) => (
              <button
                key={t}
                className={`ftab${activeTab === t ? " active" : ""}`}
                onClick={() => setActiveTab(t)}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="projects-grid" ref={gridRef}>
            {filteredProjects.map((p, i) => (
              <a
                key={p.url}
                href={`https://${p.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="proj-card reveal"
                style={{ transitionDelay: `${(i % 3) * 0.07}s` }}
                aria-label={`Visit ${p.title}`}
              >
                <span className="proj-num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={`proj-cat ${p.catStyle}`}>{p.cat}</span>
                <p className="proj-title">{p.title}</p>
                <p className="proj-desc">{p.desc}</p>
                <div className="proj-tech">
                  {p.tech.map((t) => (
                    <span className="proj-tag" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
                <span className="proj-link">Visit site →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* CONTACT */}
      <section id="contact" aria-labelledby="contact-title">
        <p className="s-label reveal">Get in Touch</p>
        <h2 className="s-title reveal" id="contact-title">
          Contact <span>Me</span>
        </h2>
        <div className="contact-wrap">
          <div className="contact-info">
            <h3 className="contact-info-title reveal">
              Let&apos;s work together
            </h3>
            <p
              className="reveal"
              style={{
                color: "var(--muted)",
                fontSize: ".9rem",
                lineHeight: "1.7",
              }}
            >
              Open to full-time roles, freelance projects, and interesting
              collaborations.
            </p>
            {contactItems.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.external ? "_blank" : undefined}
                rel={c.external ? "noopener noreferrer" : undefined}
                className="c-item reveal"
              >
                <div className="c-icon">{c.icon}</div>
                <div>
                  <p className="c-label">{c.label}</p>
                  <p className="c-value">{c.value}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="form-card reveal">
            <h3>Let&apos;s Build Something.</h3>
            <p>
              Fill the form below — I&apos;ll receive your message by email and
              reply within 24 hours.
            </p>

            {formState === "success" && (
              <div className="form-msg success">{formMsg}</div>
            )}
            {formState === "error" && (
              <div className="form-msg error">{formMsg}</div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Name *</label>
                  <input
                    id="name"
                    type="text"
                    className="form-input"
                    placeholder="Rahul Sharma"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <input
                      id="email"
                      type="email"
                      className="form-input"
                      style={{ flex: 1 }}
                      placeholder="rahul@company.com"
                      required
                      disabled={otpSent}
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                    />
                    {!otpSent && (
                      <button 
                        type="button" 
                        onClick={handleSendOtp}
                        disabled={sendingOtp || !form.email}
                        style={{ padding: "0 16px", borderRadius: "10px", background: "var(--grad-main)", color: "#fff", border: "none", fontWeight: 600, fontSize: "0.85rem", cursor: "pointer", opacity: (!form.email || sendingOtp) ? 0.6 : 1, transition: "0.3s" }}
                      >
                        {sendingOtp ? "Wait..." : "Verify"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone / WhatsApp</label>
                  <input
                    id="phone"
                    type="tel"
                    className="form-input"
                    placeholder="+91 9999999999"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    id="subject"
                    type="text"
                    className="form-input"
                    placeholder="Hiring / Freelance / Collab"
                    value={form.subject}
                    onChange={(e) =>
                      setForm({ ...form, subject: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  className="form-textarea"
                  rows={5}
                  placeholder="Tell me about your project or opportunity…"
                  required
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                />
              </div>
              
              {/* Honeypot field - hidden from users */}
              <div className="form-group" style={{ position: "absolute", left: "-9999px", top: "-9999px" }} aria-hidden="true">
                <label htmlFor="botField">Leave this field empty</label>
                <input
                  id="botField"
                  type="text"
                  tabIndex={-1}
                  value={form.botField}
                  onChange={(e) => setForm({ ...form, botField: e.target.value })}
                />
              </div>

              {/* OTP Verification */}
              {otpSent && (
                <div className="form-group" style={{ marginBottom: "16px" }}>
                  <label htmlFor="otp">Enter 6-digit OTP sent to your email *</label>
                  <input
                    id="otp"
                    type="text"
                    className="form-input"
                    placeholder="123456"
                    required
                    maxLength={6}
                    value={form.otp}
                    onChange={(e) => setForm({ ...form, otp: e.target.value })}
                  />
                </div>
              )}

              {/* reCAPTCHA */}
              <div className="form-group" style={{ marginBottom: "20px" }}>
                <div className="recaptcha-wrapper">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={process.env.RECAPTCHA_SITE_KEY || "YOUR_RECAPTCHA_SITE_KEY_HERE"}
                    theme="dark"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn-submit"
                disabled={formState === "loading"}
              >
                {formState === "loading" ? "Sending…" : "Send Message →"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <span className="footer-logo">Rishabh Dubey</span>
        <ul className="footer-links" role="list">
          {navLinks.map((s) => (
            <li key={s}>
              <button onClick={() => smoothTo(s)}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            </li>
          ))}
        </ul>
        <div className="footer-socials">
          {[
            {
              href: "https://linkedin.com/in/er-rishabh-dubey-64b73b1a1",
              label: "LinkedIn",
              icon: "in",
            },
            {
              href: "https://github.com/Rishu0226",
              label: "GitHub",
              icon: "GH",
            },
            {
              href: "https://mail.google.com/mail/?view=cm&fs=1&to=rishabhdubey104@gmail.com",
              label: "Email",
              icon: "✉",
            },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel={
                s.href.startsWith("http") ? "noopener noreferrer" : undefined
              }
              className="fsoc"
              aria-label={s.label}
            >
              {s.icon}
            </a>
          ))}
        </div>
        <p className="footer-copy">
          © 2025 Rishabh Dubey. All Rights Reserved.
        </p>
      </footer>
    </>
  );
}
