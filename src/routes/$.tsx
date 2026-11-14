import { createFileRoute, notFound } from "@tanstack/react-router";
import { Children, isValidElement } from "react";
import type { ReactNode } from "react";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import pages from "@/lib/neotec-pages.json";
import { NeotecLogo, neotecHref } from "@/components/neotec-brand";
import { Button } from "@/components/ui/button";
import aiWave from "@/assets/ai-data-wave.png";

const contentPages: Record<string, { title: string; markdown: string; source: string }> = pages;
const pageServices = Object.entries(contentPages).filter(([key]) => key.startsWith("services/") && key.split("/").length === 2).map(([key, page]) => ({ name: page.title, slug: key, desc: page.markdown.split("\n\n")[2] ?? "Explore this engineering capability.", href: `/${key}` }));
const pageProducts = Object.entries(contentPages).filter(([key]) => key.startsWith("products/") && key.split("/").length === 2).map(([key, page]) => ({ name: page.title, slug: key, desc: page.markdown.split("\n\n")[2] ?? "Explore this Neotecx platform.", href: `/${key}` }));
const pageIndustries = Object.entries(contentPages)
  .filter(([key]) => key.startsWith("industries/"))
  .map(([key, page]) => ({ name: page.title, slug: key, desc: page.markdown.split("\n\n")[2] ?? "Explore Neotecx for this sector.", href: `/${key}` }));
const pageNav = [
  { label: "Home", href: "/", section: "home" },
  { label: "Products", href: "/products", section: "products" },
  { label: "What We Do", href: "/services", section: "services" },
  { label: "Who We Serve", href: "/industries", section: "industries" },
  { label: "About Us", href: "/about", section: "about" },
] as const;
type PageNavSection = typeof pageNav[number]["section"];
const pageNavItems: Record<PageNavSection, { name: string; slug: string; desc: string; href: string }[]> = {
  home: [
    { name: "Home overview", slug: "home", desc: "See the Neotecx command layer for mission-critical operations.", href: "/#home" },
    { name: "Products", slug: "platform", desc: "Explore the connected Neotecx platform suite.", href: "/#platform" },
    { name: "Who We Serve", slug: "who-we-serve", desc: "See the industries and teams we support.", href: "/#who-we-serve" },
    { name: "What We Do", slug: "what-we-do", desc: "Explore our engineering capabilities.", href: "/#what-we-do" },
    { name: "Contact", slug: "contact", desc: "Talk with our team about your operation.", href: "/#contact" },
  ],
  products: pageProducts,
  services: pageServices,
  industries: pageIndustries,
  about: [
    { name: "About Neotecx", slug: "about", desc: "Our company, mission and engineering focus.", href: "/about" },
    { name: "Company overview", slug: "company", desc: "Meet the team building for critical infrastructure.", href: "/#company" },
    { name: "Case studies", slug: "case-studies", desc: "See outcomes from mission-critical programs.", href: "/case-studies" },
    { name: "Contact", slug: "contact", desc: "Get in touch with the Neotecx team.", href: "/contact" },
  ],
};
const pageNavHeadings: Record<PageNavSection, string> = { home: "Explore the site", products: "Explore our products", services: "Explore what we do", industries: "Who we serve", about: "About Neotecx" };
function PageHeader() {
  const [open, setOpen] = useState(false);
  return <header className="glass sticky top-0 z-50 border-b border-border">
    <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-4 px-6">
      <NeotecLogo />
      <nav className="hidden items-center gap-6 lg:flex">
        {pageNav.map(item => <div key={item.href} className={`nav-dropdown-wrap nav-dropdown-${item.section}`}>
          <a href={item.href} aria-haspopup="true" className="nav-highlight flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary shadow-glow transition-colors hover:bg-primary/20">
            {item.label}<ChevronDown aria-hidden="true" className="nav-chevron h-4 w-4 transition-transform duration-200" />
          </a>
          <div className="nav-dropdown glass">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">{pageNavHeadings[item.section]}</p>
            <div className={item.section === "services" || item.section === "products" || item.section === "home" ? "grid gap-2 sm:grid-cols-2" : "grid gap-2"}>
              {pageNavItems[item.section].map(entry => <a key={entry.slug} href={entry.href} className="nav-panel-link rounded-xl border border-border/70 bg-background/40 p-3 transition-colors hover:border-primary/40 hover:bg-primary/10 focus-visible:border-primary/60 focus-visible:bg-primary/10"><span className="block text-sm font-semibold text-foreground">{entry.name}</span><span className="mt-1 block text-xs leading-relaxed text-muted-foreground">{entry.desc}</span></a>)}
            </div>
          </div>
        </div>)}
      </nav>
      <a href="/contact" className="hidden rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-glow hover:opacity-90 lg:inline-flex">Get in touch</a>
      <button type="button" className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground hover:bg-primary/10 lg:hidden" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>{open ? <X /> : <Menu />}</button>
    </div>
    {open && <div className="glass mx-4 mb-3 rounded-xl p-4 lg:hidden">
      {pageNav.map(item => <details key={item.href} className="nav-mobile-group">
        <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg bg-primary/10 px-3 py-2 text-sm font-semibold text-primary">{item.label}<ChevronDown aria-hidden="true" className="nav-chevron h-4 w-4 transition-transform duration-200" /></summary>
        <div className="nav-mobile-panel">
          {pageNavItems[item.section].map(entry => <a key={entry.slug} href={entry.href} onClick={() => setOpen(false)} className="nav-panel-link rounded-xl border border-border/70 bg-background/40 p-3"><span className="block text-sm font-semibold text-foreground">{entry.name}</span><span className="mt-1 block text-xs text-muted-foreground">{entry.desc}</span></a>)}
        </div>
      </details>)}
      <a href="/contact" className="mt-3 block rounded-full bg-primary px-5 py-2 text-center text-sm font-semibold text-primary-foreground">Get in touch</a>
    </div>}
  </header>;
}

export const Route = createFileRoute("/$")({
  loader: ({ params }) => {
    const key = (params._splat ?? "").replace(/\/$/, "");
    const page = contentPages[key === "industries-served" ? "industries" : key];
    if (!page) throw notFound();
    return page;
  },
  head: ({ loaderData }) => {
    const title = `${loaderData?.title ?? "Page"} — Neotecx`;
    const description = `Neotecx ${loaderData?.title ?? "information"} — applied AI and engineering for mission-critical infrastructure.`;
    return { meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] };
  },
  component: ContentPage,
});

function ContentPage() {
  const page = Route.useLoaderData();
  const pageCategory = new URL(page.source).pathname.split("/").filter(Boolean)[0] ?? "page";
  const sourceMarkdown = page.source === "https://neotecx.com/services/"
    ? page.markdown.replace("Eight capabilities, three disciplines.", "Eight services, three disciplines.").replaceAll("Explore capability", "Explore service")
    : page.markdown;
  const markdown = (page.source.includes("/contact/") ? (sourceMarkdown.split("\n\nName\n")[0] ?? sourceMarkdown) : sourceMarkdown).replace(/\\\\\n(?:\\\\\n)?/g, "  \n");
  return <div className="relative min-h-screen bg-background">
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden"><img src={aiWave} alt="" className="scene-wave animate-wave-drift absolute inset-0 h-full w-full object-cover" /><div className="scene-overlay absolute inset-0" /></div>
    <div className="scene-content relative">
      <PageHeader />
      <main className={`neotec-copy content-page content-page-${pageCategory} mx-auto max-w-6xl break-words px-6 py-16 md:py-20`}>
        <MarkdownDocument markdown={markdown} />
        {page.source.includes("/contact/") && <form className="mt-10 grid gap-5" onSubmit={event => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          const body = `Name: ${data.get("name")}\nCompany: ${data.get("company")}\nWork email: ${data.get("email")}\nInterested in: ${data.get("interest")}\n\n${data.get("message")}`;
          window.location.href = `mailto:sales@neotecx.com?subject=${encodeURIComponent("Neotecx demo request")}&body=${encodeURIComponent(body)}`;
        }}>
          <div className="grid gap-5 sm:grid-cols-2">{[{name:"name",label:"Name",type:"text"},{name:"company",label:"Company",type:"text"},{name:"email",label:"Work email",type:"email"}].map(field=><label key={field.name} className="grid gap-2 text-sm">{field.label}<input required name={field.name} type={field.type} className="h-11 rounded-md border border-input bg-card px-3 text-foreground" /></label>)}<label className="grid gap-2 text-sm">Interested in<select name="interest" className="h-11 min-w-0 rounded-md border border-input bg-card px-3 text-foreground">{["AI Program Management","GIS & Digital Twin","CV / AR Quality Inspection","Fiber Rollout Command","Custom engineering"].map(option=><option key={option}>{option}</option>)}</select></label></div>
          <label className="grid gap-2 text-sm">What are you rolling out?<textarea name="message" required rows={4} className="rounded-md border border-input bg-card p-3 text-foreground" /></label><Button type="submit" className="justify-self-start">Request a demo</Button>
        </form>}
        {page.source.includes("/contact/") && <div className="mt-8 flex flex-wrap gap-3"><Button asChild><a href="mailto:sales@neotecx.com">Email sales</a></Button><Button asChild variant="secondary"><a href="tel:+917724937648">Call +91 77249 37648</a></Button></div>}
      </main>
      <footer className="border-t border-border px-6 py-10 text-center text-sm text-muted-foreground"><NeotecLogo /><p className="mt-4">© 2026 Neo Technologies Pvt. Ltd. — Indore, India &amp; Delaware, USA.</p><div className="mt-4 flex justify-center gap-5"><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="mailto:sales@neotecx.com">sales@neotecx.com</a></div></footer>
    </div>
  </div>;
}

type MarkdownSection = { eyebrow?: string; title?: string; level: 1 | 2; lead?: string; blocks: string[]; cards?: boolean };

function MarkdownDocument({ markdown }: { markdown: string }) {
  const sections: MarkdownSection[] = [{ level: 1, blocks: [] }];
  const sourceBlocks = markdown.split(/\n{2,}/).filter(Boolean);
  let pendingEyebrow: string | undefined;
  const isLabel = (block: string) => block.length < 52 && !block.includes("[") && !block.startsWith("#");
  for (let i = 0; i < sourceBlocks.length; i++) {
    const block = sourceBlocks[i];
    const current = sections[sections.length - 1];
    if (block.startsWith("# ")) {
      if (current.blocks.length === 1 && isLabel(current.blocks[0])) current.eyebrow = current.blocks.pop();
      current.title = block.slice(2);
      current.level = 1;
      continue;
    }
    if (block.startsWith("## ")) {
      let eyebrow = pendingEyebrow;
      pendingEyebrow = undefined;
      const previous = current.blocks[current.blocks.length - 1];
      if (!eyebrow && previous && isLabel(previous)) {
        eyebrow = current.blocks.pop();
      }
      sections.push({ eyebrow, title: block.slice(3), level: 2, blocks: [] });
      continue;
    }
    if (sourceBlocks[i + 1]?.startsWith("## ") && isLabel(block)) {
      pendingEyebrow = block;
      continue;
    }
    if (/(?:https:\/\/neotecx\.com)?\/(?:products|services|industries)\//.test(block) && [...block.matchAll(/\]\((?:https:\/\/neotecx\.com)?\/(?:products|services|industries)\//g)].length > 1) {
      sections.push({ level: 2, blocks: [block], cards: true });
      continue;
    }
    current.blocks.push(block);
  }

  return <div className="markdown-document">
    {sections.map((section, index) => {
      const leadIndex = section.blocks.findIndex((block, i) => i === 0 && block.length > 76 && !block.startsWith("#") && !block.includes("]("));
      const lead = leadIndex >= 0 ? section.blocks[leadIndex] : undefined;
      const blocks = leadIndex >= 0 ? section.blocks.filter((_, i) => i !== leadIndex) : section.blocks;
      const Heading = section.level === 1 ? "h1" : "h2";
      return <section key={`${section.title ?? "cards"}-${index}`} className={`markdown-section${section.level === 1 ? " markdown-intro" : ""}${section.cards ? " markdown-section-cards" : ""}`}>
        {(section.eyebrow || section.title || lead) && <div className="markdown-section-heading">
          {section.eyebrow && <span className="markdown-eyebrow">{section.eyebrow}</span>}
          {section.title && <Heading>{section.title}</Heading>}
          {lead && <MarkdownBlock markdown={lead} />}
        </div>}
        {blocks.length > 0 && <div className="markdown-section-body"><MarkdownBlocks blocks={blocks} /></div>}
      </section>;
    })}
  </div>;
}

function MarkdownBlocks({ blocks }: { blocks: string[] }) {
  const elements: ReactNode[] = [];
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    const next = blocks[i + 1];
    if (/^#### /.test(block) && next && !/^#{1,4} /.test(next)) {
      elements.push(<article key={i} className="markdown-feature-card"><MarkdownBlock markdown={block} /><MarkdownBlock markdown={next} /></article>);
      i++;
    } else if (/^\d+(?:\.\d+)?(?:\+|%|×)?$/.test(block.trim()) && next && next.length < 90) {
      elements.push(<article key={i} className="markdown-stat-card"><MarkdownBlock markdown={block} /><MarkdownBlock markdown={next} /></article>);
      i++;
    } else if (isCompactMarkdownBlock(block)) {
      const compact: string[] = [block];
      while (i + 1 < blocks.length && isCompactMarkdownBlock(blocks[i + 1])) compact.push(blocks[++i]);
      if (compact.length >= 3) {
        elements.push(<div key={i} className="markdown-fact-grid">{compact.map((item, itemIndex) => <div key={itemIndex} className="markdown-fact-card"><MarkdownBlock markdown={item} /></div>)}</div>);
      } else {
        compact.forEach((item, itemIndex) => elements.push(<div key={`${i}-${itemIndex}`} className="markdown-block"><MarkdownBlock markdown={item} /></div>));
      }
    } else {
      elements.push(<div key={i} className="markdown-block"><MarkdownBlock markdown={block} /></div>);
    }
  }
  return <>{elements}</>;
}

function isCompactMarkdownBlock(block: string) {
  return block.length > 0 && block.length < 88 && !block.includes("\n") && !block.includes("](") && !/^#{1,6} /.test(block) && !/[.!?]$/.test(block.trim());
}

function MarkdownBlock({ markdown }: { markdown: string }) {
  return <ReactMarkdown components={{
    a: ({ href, children }) => <MarkdownLink href={href}>{children}</MarkdownLink>,
    p: ({ children }) => <MarkdownParagraph>{children}</MarkdownParagraph>,
    img: () => null,
  }}>{markdown}</ReactMarkdown>;
}

function MarkdownLink({ href, children }: { href?: string; children?: ReactNode }) {
  const safeHref = neotecHref(href ?? "#");
  const isContentCard = safeHref.startsWith("/products/") || safeHref.startsWith("/services/") || safeHref.startsWith("/industries/");
  return <a href={safeHref} className={isContentCard ? "markdown-content-card" : "markdown-inline-link"}>{children}</a>;
}

function MarkdownParagraph({ children }: { children?: ReactNode }) {
  const nodes = Children.toArray(children).filter(node => !(typeof node === "string" && !node.trim()));
  const isCardGrid = nodes.length > 1 && nodes.every(node => isValidElement(node) && typeof node.props.href === "string" && /^(?:https:\/\/neotecx\.com)?\/(?:products|services|industries)\//.test(node.props.href));
  return isCardGrid ? <div className="markdown-card-grid">{children}</div> : <p>{children}</p>;
}
