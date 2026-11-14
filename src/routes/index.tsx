import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { ArrowRight, ChevronDown, Sparkles, Check, Menu, X, Radio, Landmark, Building2, Brain, MessageCircle } from "lucide-react";
import content from "@/lib/neotec-content.json";
import { NeotecLogo } from "@/components/neotec-brand";
import { Button } from "@/components/ui/button";
import earthOpening from "@/assets/earth-opening.jpg";
import omanGlobalNetwork from "../../oman-global-network.png";
import aiWave from "@/assets/ai-data-wave.png";
import muscatFocus from "@/assets/oman-muscat-focus.jpg";
import { TechnologyParticleWave } from "@/components/technology-particle-wave";
import { BackgroundPointerMotion } from "@/components/background-pointer-motion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Neotecx — The command layer for mission-critical networks." },
      { name: "description", content: "Applied AI platforms and custom engineering for telecom operators and mission-critical infrastructure." },
      { property: "og:title", content: "Neotecx — The command layer for mission-critical networks." },
      { property: "og:description", content: "Applied AI platforms and custom engineering for telecom operators and enterprises." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAV = [{ label: "Home", href: "/" }, { label: "Products", href: "/products" }, { label: "What We Do", href: "/services" }, { label: "Who We Serve", href: "/industries" }, { label: "About Us", href: "/about" }];
const NAV_DROPDOWNS: Record<string, "home" | "products" | "services" | "industries" | "about"> = { "/": "home", "/products": "products", "/services": "services", "/industries": "industries", "/about": "about" };
const PRODUCTS = content.products;
const STATS = [{ v: "4+", l: "Years running mission-critical infrastructure" }, { v: "12+", l: "Enterprise platforms shipped to production" }, { v: "99%", l: "Field uptime, online & offline" }, { v: "2", l: "Continents — India & United States" }];
const CLIENTS = ["Telecom", "FinServ", "Engineering", "Public Works", "Energy", "Utilities"];
const AI = [
  { t: "Real-time command", d: "Live dashboards and KPIs across every operation." },
  { t: "Geospatial twin", d: "A living GIS model of your sites and network." },
  { t: "Field & mobility", d: "Offline-first tools that work past the edge of coverage." },
  { t: "Applied AI", d: "Agentic automation and predictive insight, in production." },
  { t: "Integrations", d: "A secure REST API into your OSS/BSS, ERP and CRM." },
  { t: "Security", d: "Role-based access, built for national-infrastructure compliance." },
];
const INDUSTRIES = [
  { icon: Radio, t: "Telecom", d: "Infrastructure-grade Applied AI for telecom operators and enterprises — from concept to national-scale deployment." },
  { icon: Landmark, t: "FinServ", d: "Founded by technology entrepreneurs delivering exceptional engineering for telecom providers, financial institutions and engineering firms — from ideation to market leadership." },
  { icon: Building2, t: "Engineering", d: "We integrate AI and software directly into your existing OSS/BSS, GIS and ERP systems — not a rip-and-replace, a force multiplier." },
];
const DETAILS = PRODUCTS.map(p => ({ k: p.name, h: p.desc, p: p.problem, cta: "View product", f: p.features, slug: p.slug }));
const SERVICES = [
  { name: "Web & Commerce", slug: "web-commerce", desc: "User-centric websites and high-converting commerce, engineered to perform." },
  { name: "Enterprise Java", slug: "enterprise-java", desc: "Robust, scalable enterprise systems built on Java." },
  { name: "Enterprise Mobility", slug: "enterprise-mobility", desc: "Field-ready mobile apps that move your operations with you." },
  { name: "Cloud Platform", slug: "cloud-platform", desc: "Scalable, secure cloud foundations — set up, integrated and managed." },
  { name: "IoT Solutions", slug: "iot-solutions", desc: "Connect the physical and digital — smart, secure, at scale." },
  { name: "IT Consulting", slug: "it-consulting", desc: "Strategy that aligns technology with where the business is going." },
  { name: "Business Process Automation", slug: "process-automation", desc: "Automate the repetitive so your team focuses on what matters." },
  { name: "Data & AI", slug: "data-ai", desc: "Turn data into decisions — analytics, machine learning and applied AI." },
];
function Logo() { return <NeotecLogo />; }

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors ${scrolled ? "glass" : ""}`}>
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <Logo />
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((n) => {
            const section = NAV_DROPDOWNS[n.href];
            return section ? (
            <div key={n.href} className={`nav-dropdown-wrap nav-dropdown-${section}`}>
              <a href={n.href} aria-haspopup="true" className="nav-highlight flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary shadow-glow transition-colors hover:bg-primary/20">
                {n.label}<ChevronDown aria-hidden="true" className="nav-chevron h-4 w-4 transition-transform duration-200" />
              </a>
              <NavPanel section={section} />
            </div>
          ) : (
            <a key={n.href} href={n.href} className="text-sm font-semibold text-foreground transition-colors hover:text-primary">{n.label}</a>
          ); })}
        </nav>
        <a href="/contact" className="hidden rounded-full bg-primary px-5 py-1.5 text-sm font-semibold text-primary-foreground shadow-glow hover:opacity-90 lg:inline-block">Get in touch</a>
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>{open ? <X /> : <Menu />}</Button>
      </div>
      {open && (
        <div className="glass mx-4 rounded-xl p-4 lg:hidden">
          {NAV.map((n) => {
            const section = NAV_DROPDOWNS[n.href];
            return section ? (
            <details key={n.href} className="nav-mobile-group">
              <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg bg-primary/10 px-3 py-2 text-sm font-semibold text-primary">{n.label}<ChevronDown aria-hidden="true" className="nav-chevron h-4 w-4 transition-transform duration-200" /></summary>
              <NavPanel section={section} mobile onNavigate={() => setOpen(false)} />
            </details>
          ) : <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2 text-sm text-foreground">{n.label}</a>;
          })}
          <a href="/contact" className="mt-2 block rounded-full bg-primary px-5 py-2 text-center text-sm font-semibold text-primary-foreground">Get in touch</a>
        </div>
      )}
    </header>
  );
}

type NavSection = "home" | "products" | "services" | "industries" | "about";
function NavPanel({ section, mobile = false, onNavigate }: { section: NavSection; mobile?: boolean; onNavigate?: () => void }) {
  const items = section === "services" ? SERVICES.map(item => ({ ...item, href: `/services/${item.slug}` }))
    : section === "industries" ? INDUSTRIES.map(({ t, d }) => ({ name: t, slug: t.toLowerCase(), desc: d, href: `/#industry-${t.toLowerCase()}` }))
    : section === "products" ? PRODUCTS.map(({ name, slug, desc }) => ({ name, slug, desc, href: `/products/${slug}` }))
    : section === "home" ? [
      { name: "Home overview", slug: "home", desc: "See the Neotecx command layer for mission-critical operations.", href: "/#home" },
      { name: "Products", slug: "platform", desc: "Explore the connected Neotecx platform suite.", href: "/#platform" },
      { name: "Who We Serve", slug: "who-we-serve", desc: "See the industries and teams we support.", href: "/#who-we-serve" },
      { name: "What We Do", slug: "what-we-do", desc: "Explore our engineering capabilities.", href: "/#what-we-do" },
      { name: "Contact", slug: "contact", desc: "Talk with our team about your operation.", href: "/#contact" },
    ]
    : [
      { name: "About Neotecx", slug: "about", desc: "Our company, mission and engineering focus.", href: "/about" },
      { name: "Company overview", slug: "company", desc: "Meet the team building for critical infrastructure.", href: "/#company" },
      { name: "Case studies", slug: "case-studies", desc: "See outcomes from mission-critical programs.", href: "/case-studies" },
      { name: "Contact", slug: "contact", desc: "Get in touch with the Neotecx team.", href: "/contact" },
    ];
  const heading: Record<NavSection, string> = { home: "Explore the site", products: "Explore our products", services: "Explore what we do", industries: "Who we serve", about: "About Neotecx" };
  const columns = section === "products" || section === "services" || section === "home";
  return (
    <div className={mobile ? "nav-mobile-panel" : "nav-dropdown glass"}>
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">{heading[section]}</p>
      <div className={columns ? "grid gap-2 sm:grid-cols-2" : "grid gap-2"}>
        {items.map((item) => (
          <a key={item.slug} href={item.href} onClick={onNavigate} className="nav-panel-link rounded-xl border border-border/70 bg-background/40 p-3 transition-colors hover:border-primary/40 hover:bg-primary/10 focus-visible:border-primary/60 focus-visible:bg-primary/10">
            <span className="block text-sm font-semibold text-foreground">{item.name}</span>
            <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">{item.desc}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub: string }) {
  return (
    <div className="mx-auto mb-14 max-w-2xl text-center">
      <span className="glass inline-block rounded-full px-4 py-1 text-xs font-medium text-primary">{eyebrow}</span>
      <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground md:text-5xl">{title}</h2>
      <p className="mt-4 text-muted-foreground">{sub}</p>
    </div>
  );
}

function Index() {
  const [slide, setSlide] = useState(0);
  const [earthLoaded, setEarthLoaded] = useState(false);
  const [omanLoaded, setOmanLoaded] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const earthRef = useRef<HTMLImageElement>(null);
  const omanRef = useRef<HTMLImageElement>(null);
  const panRef = useRef<HTMLDivElement>(null);
  // Drag (mouse or finger) rotates the map; hover adds a gentle drift. Clamped so Muscat stays in view.
  const motion = useRef({ hx: 0, hy: 0, dx: 0, dy: 0, cx: 0, cy: 0, cdx: 0, cdy: 0, drag: null as null | { x: number; y: number; dx: number; dy: number }, raf: 0 });
  const clamp = (v: number, m: number) => Math.max(-m, Math.min(m, v));
  const tick = () => {
    const m = motion.current;
    const el = panRef.current;
    if (!m.drag) { m.dx *= 0.95; m.dy *= 0.95; }
    m.cx += (m.hx - m.cx) * 0.08; m.cy += (m.hy - m.cy) * 0.08;
    m.cdx += (m.dx - m.cdx) * 0.15; m.cdy += (m.dy - m.cdy) * 0.15;
    if (el) {
      el.style.setProperty("--pan-x", `${(-m.cx * 24 + m.cdx * 1.6).toFixed(2)}px`);
      el.style.setProperty("--pan-y", `${(-m.cy * 14 + m.cdy * 1.2).toFixed(2)}px`);
      el.style.setProperty("--tilt-x", `${(m.cy * 3 - m.cdy).toFixed(2)}deg`);
      el.style.setProperty("--tilt-y", `${(-m.cx * 4 + m.cdx).toFixed(2)}deg`);
    }
    const busy = m.drag || Math.abs(m.hx - m.cx) + Math.abs(m.hy - m.cy) + Math.abs(m.dx - m.cdx) + Math.abs(m.dy - m.cdy) + Math.abs(m.dx) + Math.abs(m.dy) > 0.01;
    m.raf = busy ? requestAnimationFrame(tick) : 0;
  };
  const kick = () => { if (!motion.current.raf) motion.current.raf = requestAnimationFrame(tick); };
  useEffect(() => () => cancelAnimationFrame(motion.current.raf), []);
  const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isInteractive = (t: EventTarget | null) => t instanceof Element && !!t.closest("a,button,input,textarea,select");
  const onHeroDown = (e: ReactPointerEvent<HTMLElement>) => {
    if (reduced() || isInteractive(e.target) || e.button > 0) return;
    const m = motion.current;
    m.drag = { x: e.clientX, y: e.clientY, dx: m.dx, dy: m.dy };
    kick();
  };
  const onHeroMove = (e: ReactPointerEvent<HTMLElement>) => {
    if (reduced()) return;
    const m = motion.current;
    if (e.pointerType !== "touch") {
      const r = e.currentTarget.getBoundingClientRect();
      m.hx = clamp(((e.clientX - r.left) / r.width) * 2 - 1, 1);
      m.hy = clamp(((e.clientY - r.top) / r.height) * 2 - 1, 1);
    }
    if (m.drag) {
      m.dx = clamp(m.drag.dx + (e.clientX - m.drag.x) * 0.06, 14);
      m.dy = clamp(m.drag.dy + (e.clientY - m.drag.y) * 0.04, 8);
    }
    kick();
  };
  const onHeroUp = () => { motion.current.drag = null; kick(); };
  const onHeroLeave = () => { const m = motion.current; m.hx = 0; m.hy = 0; m.drag = null; kick(); };
  useEffect(() => {
    if (earthRef.current?.complete) setEarthLoaded(true);
    if (omanRef.current?.complete) setOmanLoaded(true);
  }, []);
  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % 3), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative min-h-screen bg-background">
      <BackgroundPointerMotion />
      {/* Moving 3D data-wave background for the whole page (sits behind the hero) */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        <img
          src={aiWave}
          alt=""
          width={1840}
          height={856}
          className="scene-wave animate-wave-drift background-pointer-drift absolute inset-0 h-full w-full object-cover"
        />
        <div className="animate-wave-glow absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5" />
        <div className="scene-overlay absolute inset-0" />
      </div>
      <div className="scene-content relative z-10">
      <Header />

      {/* Hero */}
      <section ref={heroRef} id="home" className="relative scroll-mt-24 overflow-hidden pb-16 pt-24" onPointerDown={onHeroDown} onPointerMove={onHeroMove} onPointerUp={onHeroUp} onPointerCancel={onHeroUp} onPointerLeave={onHeroLeave} style={{ touchAction: "pan-y", userSelect: "none", WebkitUserSelect: "none" }}>
        {/* 3D globe background with slow zoom on Oman */}
        <div className={`hero-scene absolute inset-0 overflow-hidden ${earthLoaded && omanLoaded ? "earth-ready" : ""}`} aria-hidden="true">
          <img ref={earthRef} src={earthOpening} alt="" width={1536} height={1024} onLoad={() => setEarthLoaded(true)} onError={() => setEarthLoaded(true)} className="earth-opening absolute inset-0 h-full w-full object-contain" />
          <div className="oman-arrival absolute inset-0">
          <div ref={panRef} className="map-pan">
          <div className="muscat-map animate-hero-zoom">
          <img
            src={muscatFocus}
            ref={omanRef}
            alt=""
            width={1584}
            height={672}
            onLoad={() => setOmanLoaded(true)}
            onError={() => setOmanLoaded(true)}
            className="hero-image absolute inset-0 h-full w-full"
          />
          {/* Faint OMAN wordmark over the map */}
          <span className="oman-ghost" aria-hidden="true">OMAN</span>
          </div>
          </div>
          {/* Light packets travel along the globe's network paths. */}
          <div className="hero-ray hero-ray-one"><span className="hero-ray-packet" /></div>
          <div className="hero-ray hero-ray-two"><span className="hero-ray-packet" /></div>
          <div className="hero-ray hero-ray-three"><span className="hero-ray-packet" /></div>
          <div className="hero-ray hero-ray-four"><span className="hero-ray-packet" /></div>
          {/* Rotating rings centered on Oman */}
          <div className="hero-orbit pointer-events-none">
            <div className="hero-orbit-plane">
            <div className="animate-spin-slow shadow-glow h-72 w-72 rounded-full border border-primary/50 md:h-96 md:w-96">
              <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-primary shadow-glow" />
            </div>
            </div>
          </div>
          <div className="pointer-events-none absolute left-[62%] top-[42%] -translate-x-1/2 -translate-y-1/2">
            <div className="animate-spin-slower-rev h-52 w-52 rounded-full border border-dashed border-accent/40 md:h-72 md:w-72">
              <span className="absolute -bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-accent" />
            </div>
          </div>
          <div className="animate-ring-pulse pointer-events-none absolute left-[62%] top-[42%] h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/60 md:h-44 md:w-44" />
          </div>
        </div>
        <TechnologyParticleWave hostRef={heroRef} />
        <div className="hero-overlay absolute inset-0" />
        <div className={`muscat-caption ${earthLoaded && omanLoaded ? "muscat-caption-ready" : ""}`} aria-label="Map focus: Muscat, Oman">
          <span className="muscat-caption-line" aria-hidden="true" />
          <div><span className="muscat-caption-country">Oman</span><span className="muscat-caption-city">Muscat</span><span className="muscat-caption-coordinates">23.59° N · 58.41° E</span></div>
        </div>
        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-foreground">
            <Sparkles className="h-3.5 w-3.5" /> Applied AI for critical infrastructure
          </span>
          <h1 className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight text-foreground md:text-6xl">
            The command layer for<br /><span className="text-gradient">mission-critical networks.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base text-foreground md:text-lg">
            Neotecx builds the AI platforms and custom engineering that telecom operators and enterprises run their national-scale rollouts, field operations and assets on.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="/contact" className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-glow">Book a Demo <ArrowRight className="h-4 w-4" /></a>
            <a href="#platform" className="glass rounded-md px-5 py-2 text-sm font-semibold text-foreground">Explore the Platform</a>
          </div>
          <div className="mt-8 flex justify-center gap-3">
            {[0, 1, 2].map((i) => (
              <button key={i} aria-label={`Slide ${i + 1}`} onClick={() => setSlide(i)} className={`h-3 w-8 rounded-full transition ${slide === i ? "bg-primary" : "bg-muted"}`} />
            ))}
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {PRODUCTS.map((p) => <span key={p.name} className="glass rounded-full px-4 py-1.5 text-xs font-medium">{p.name}</span>)}
          </div>
          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-4 md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.l} className="glass rounded-xl px-4 py-5">
                <div className="text-3xl font-bold text-foreground">{s.v}</div>
                <div className="mt-1 text-xs text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client marquee */}
      <section className="overflow-hidden border-y border-border py-10">
        <div className="animate-marquee flex w-max gap-20">
          {[...CLIENTS, ...CLIENTS].map((c, i) => <span key={i} className="whitespace-nowrap text-3xl font-bold text-foreground/80">{c}</span>)}
        </div>
      </section>

      {/* Suite */}
      <section id="platform" className="mx-auto max-w-6xl px-6 py-28">
        <SectionHead eyebrow="Products" title="Six products. One operating picture." sub="Each platform runs standalone or together, sharing one real-time data layer across planning, build and operations." />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p) => (
            <a key={p.name} href={`/products/${p.slug}`} className="group glass rounded-2xl p-7 transition hover:-translate-y-1 hover:border-primary/60 hover:shadow-glow">
              <div className="text-xl font-bold text-foreground">{p.name}</div>
              <div className="mt-1 text-sm text-primary">{p.sub}</div>
              <p className="mt-4 text-sm text-muted-foreground">{p.desc}</p>
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-foreground group-hover:text-primary">View product <ArrowRight className="h-4 w-4" /></span>
            </a>
          ))}
        </div>
      </section>

      {/* AI */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <SectionHead eyebrow="The platform" title="Six pillars, one operating layer." sub="Everything Neotecx does rests on these." />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {AI.map((a) => (
            <div key={a.t} className="glass rounded-2xl p-6">
              <div className="bg-gradient-brand mb-5 flex h-11 w-11 items-center justify-center rounded-lg"><Brain className="h-5 w-5 text-primary-foreground" /></div>
              <div className="font-bold text-foreground">{a.t}</div>
              <p className="mt-2 text-sm text-muted-foreground">{a.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Who We Serve */}
      <section id="who-we-serve" className="scroll-mt-24 mx-auto max-w-6xl px-6 py-20">
        <SectionHead eyebrow="Who We Serve" title="Trusted across telecom, financial and engineering infrastructure" sub="Telecom · FinServ · Engineering · Public Works · Energy · Utilities" />
        <div className="grid gap-5 md:grid-cols-3">
          {INDUSTRIES.map(({ icon: Icon, t, d }) => (
            <div key={t} id={`industry-${t.toLowerCase()}`} className="glass scroll-mt-24 rounded-2xl p-8">
              <Icon className="h-8 w-8 text-primary" />
              <h3 className="mt-5 text-xl font-bold text-foreground">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="what-we-do" className="scroll-mt-24 mx-auto max-w-6xl px-6 py-20">
        <SectionHead eyebrow="What We Do" title="We engineer AI and software into your stack." sub="Where our platforms end, our engineers begin — building, integrating and running custom solutions on top of the systems you already have." />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">{SERVICES.map(service=><a key={service.slug} id={`service-${service.slug}`} href={`/services/${service.slug}`} className="glass scroll-mt-24 rounded-2xl p-6"><h3 className="font-bold">{service.name}</h3><p className="mt-3 text-sm text-muted-foreground">{service.desc}</p><span className="mt-5 inline-flex items-center gap-2 text-sm text-primary">Explore capability <ArrowRight className="h-4 w-4" /></span></a>)}</div>
      </section>
      <section className="mx-auto max-w-6xl px-6 py-20">
        <SectionHead eyebrow="Architecture" title="Built to slot into the stack you already run." sub="Neotecx connects through a modern, secure REST API to the systems your operation depends on — upstream and downstream, online and offline." />
        <div className="grid gap-5 md:grid-cols-3">{[{t:"OSS / BSS & ERP",d:"Sync work orders, assets and inventory with the systems of record."},{t:"Contractor & supplier APIs",d:"Onboard partners to a standard process in days, not quarters."},{t:"Enterprise-grade security",d:"Built for the compliance demands of national infrastructure."}].map(item=><div key={item.t} className="glass rounded-2xl p-7"><h3 className="font-bold">{item.t}</h3><p className="mt-3 text-sm text-muted-foreground">{item.d}</p></div>)}</div>
      </section>
      <section id="company" className="scroll-mt-24 mx-auto max-w-6xl px-6 py-20">
        <SectionHead eyebrow="Company" title="Engineering the systems that infrastructure runs on." sub="Founded by technology entrepreneurs delivering exceptional engineering for telecom providers, financial institutions and engineering firms — from ideation to market leadership." />
        <blockquote className="mx-auto max-w-3xl text-center text-lg text-muted-foreground">“To transform operational effectiveness and customer satisfaction through cutting-edge automation, AI-powered insights and cohesive management.”</blockquote>
        <div className="mt-8 flex flex-wrap justify-center gap-4"><Button asChild><a href="/about">About Neotecx</a></Button><Button asChild variant="secondary"><a href="/case-studies">Outcomes, not slideware.</a></Button></div>
      </section>
      {/* Product details */}
      {DETAILS.map((d, i) => (
        <section key={d.k} className="mx-auto max-w-6xl px-6 py-20">
          <div className={`grid items-center gap-12 lg:grid-cols-2 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">{d.k}</span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">{d.h}</h2>
              <p className="mt-5 text-muted-foreground">{d.p}</p>
              <a href={`/products/${d.slug}`} className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-glow">{d.cta} <ArrowRight className="h-4 w-4" /></a>
            </div>
            <div className="glass grid grid-cols-2 gap-3 rounded-2xl p-6">
              {d.f.map((f) => (
                <div key={f} className="flex items-center gap-2 rounded-lg bg-secondary/60 px-3 py-3 text-sm text-foreground">
                  <Check className="h-4 w-4 shrink-0 text-primary" /> {f}
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section id="contact" className="mx-auto max-w-5xl px-6 py-24">
        <div className="relative overflow-hidden rounded-3xl border border-border p-12 text-center md:p-16">
          <img src={omanGlobalNetwork} alt="" loading="lazy" width={1983} height={793} className="absolute inset-0 h-full w-full object-cover opacity-30" style={{ objectPosition: "62% 42%" }} />
          <div className="relative">
            <h2 className="text-3xl font-bold text-foreground md:text-5xl">Book a demo.</h2>
            <p className="mt-4 text-muted-foreground">Tell us what you're rolling out. We'll show you the command picture your operation could be running on.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href="/contact" className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-glow">Book a Demo <ArrowRight className="h-4 w-4" /></a>
              <a href="mailto:sales@neotecx.com" className="glass rounded-md px-5 py-2 text-sm font-semibold text-foreground">Talk to Sales</a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-4">
          <div><Logo /><p className="mt-4 text-sm text-muted-foreground">Infrastructure-grade Applied AI for telecom operators and enterprises — from concept to national-scale deployment.</p></div>
          <div><h3 className="font-semibold">Products</h3><ul className="mt-4 space-y-2">{PRODUCTS.map(p=><li key={p.slug}><a className="text-sm text-muted-foreground hover:text-primary" href={`/products/${p.slug}`}>{p.name}</a></li>)}</ul></div>
          <div><h3 className="font-semibold">Company</h3><ul className="mt-4 space-y-2">{[{name:"About",href:"/about"},{name:"What We Do",href:"/services"},{name:"Who We Serve",href:"/industries"},{name:"Case Studies",href:"/case-studies"}].map(p=><li key={p.href}><a href={p.href} className="text-sm text-muted-foreground hover:text-primary">{p.name}</a></li>)}</ul></div>
          <div><h3 className="font-semibold">Get in touch</h3><div className="mt-4 space-y-3 text-sm text-muted-foreground"><a className="block" href="mailto:sales@neotecx.com">sales@neotecx.com</a><a className="block" href="tel:+917724937648">+91 77249 37648</a><p>Neo Technologies Pvt. Ltd.<br />Khatiwala Tank, Indore (M.P.) 452014</p><p>Neo Technologies — Delaware, USA</p></div></div>
        </div>
        <div className="border-t border-border px-6 py-6 text-center text-xs text-muted-foreground">© 2026 Neo Technologies Pvt. Ltd. — Indore, India &amp; Delaware, USA.<div className="mt-3 flex justify-center gap-4"><a href="/privacy">Privacy</a><a href="/terms">Terms</a></div></div>
      </footer>
      <Button asChild aria-label="Contact Neotecx" className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-glow"><a href="/contact"><MessageCircle className="h-6 w-6" /></a></Button>
      </div>
    </div>
  );
}
