import { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { Reveal } from "@/components/motion";
import { CopyTextButton } from "@/components/LessonTools";

/* Shared building blocks for the redesigned resource detail pages.
   Presentational only; each type composes these into its own structure. */

export function DetailHero({ backHref, backLabel, eyebrow, title, description, meta }: {
  backHref: string; backLabel: string; eyebrow: string; title: string; description?: string; meta?: ReactNode;
}) {
  return (
    <header className="rd-hero">
      <div className="page-hero-glow" aria-hidden />
      <div className="container rd-hero-inner">
        <Link href={backHref} className="back-link"><ArrowLeft size={14} />{backLabel}</Link>
        <Reveal variant="fade"><div className="eyebrow" style={{ marginTop: 22 }}><span className="dot" />{eyebrow}</div></Reveal>
        <Reveal as="h1" variant="blur" delay={70}>{title}</Reveal>
        {description && <Reveal as="p" className="rd-hero-desc" delay={130}>{description}</Reveal>}
        {meta && <Reveal delay={190}><div className="rd-hero-meta">{meta}</div></Reveal>}
      </div>
    </header>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  return <section><div className="container rd-shell">{children}</div></section>;
}

export function Main({ children }: { children: ReactNode }) {
  return <div className="rd-main">{children}</div>;
}

export function Aside({ children }: { children: ReactNode }) {
  return <aside className="rd-aside"><div className="rd-sidecard">{children}</div></aside>;
}

export function Section({ kicker, title, id, children, delay = 0 }: { kicker?: string; title: string; id?: string; children: ReactNode; delay?: number }) {
  return (
    <Reveal variant="fade-up" delay={delay} className="rd-section">
      <section id={id}>
        {kicker && <span className="rd-kicker">{kicker}</span>}
        <h2>{title}</h2>
        {children}
      </section>
    </Reveal>
  );
}

export function P({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return <p className="rd-p" style={style}>{children}</p>;
}

export function Lead({ children }: { children: ReactNode }) {
  return <div className="rd-card rd-lead">{children}</div>;
}

export function Card({ children }: { children: ReactNode }) {
  return <div className="rd-card">{children}</div>;
}

export function MetaList({ items }: { items: string[] }) {
  return <ul className="rd-list">{items.map(item => <li key={item}>{item}</li>)}</ul>;
}

export function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="rd-check">
      {items.map(item => <li key={item}><Check size={15} />{item}</li>)}
    </ul>
  );
}

export type Step = { title?: string; body: string; tag?: string };

export function StepFlow({ steps }: { steps: Step[] }) {
  return (
    <div className="rd-flow">
      {steps.map((step, index) => (
        <div className="rd-step" key={step.body + index}>
          <span className="rd-step-num">{String(index + 1).padStart(2, "0")}</span>
          <div className="rd-step-body">
            {step.title && <h3>{step.title}</h3>}
            <p>{step.body}</p>
            {step.tag && <span className="rd-step-tag">{step.tag}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}

export function MiniFlow({ nodes }: { nodes: { label: string; value: string }[] }) {
  return (
    <div className="rd-miniflow">
      {nodes.map((node, index) => (
        <div key={node.label} style={{ display: "contents" }}>
          <div className="node"><span>{node.label}</span><strong>{node.value}</strong></div>
          {index < nodes.length - 1 && <span className="arrow" aria-hidden><ArrowRight size={16} /></span>}
        </div>
      ))}
    </div>
  );
}

export function VarTable({ vars }: { vars: { name: string; desc: string }[] }) {
  return (
    <div className="rd-vars">
      {vars.map(v => (
        <div className="rd-var" key={v.name}>
          <code>{v.name}</code>
          <p>{v.desc}</p>
        </div>
      ))}
    </div>
  );
}

export function CopyBlock({ text, label = "Salin prompt" }: { text: string; label?: string }) {
  return (
    <div>
      <div className="copybox">{text}</div>
      <div style={{ marginTop: 10 }}><CopyTextButton text={text} label={label} /></div>
    </div>
  );
}

export function SideCard({ type, tag, title, rows, cta }: {
  type: string; tag?: string; title: string; rows: { k: string; v: ReactNode }[]; cta?: ReactNode;
}) {
  return (
    <div className="rd-side">
      <div className="rd-side-head">
        <span>{type}</span>
        {tag && <span className="pill">{tag}</span>}
      </div>
      <h3>{title}</h3>
      <div className="rd-metarows">
        {rows.map(row => (
          <div className="rd-metarow" key={row.k}><span className="k">{row.k}</span><span className="v">{row.v}</span></div>
        ))}
      </div>
      {cta && <div className="rd-side-cta">{cta}</div>}
    </div>
  );
}

export type RelatedItem = { href: string; title: string; cat?: string };

export function Related({ title, items }: { title: string; items: RelatedItem[] }) {
  if (!items.length) return null;
  return (
    <div className="rd-side">
      <p className="rd-related-title">{title}</p>
      <div className="rd-related">
        {items.map(item => (
          <Link key={item.href} href={item.href}>
            <span>{item.title}{item.cat && <span className="rd-related-cat">{item.cat}</span>}</span>
            <ArrowUpRight size={14} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export function BackToIndex({ href, label }: { href: string; label: string }) {
  return (
    <div className="rd-footlink">
      <Link href={href} className="btn">{label}<ArrowRight className="arrow-icon" size={14} /></Link>
    </div>
  );
}
