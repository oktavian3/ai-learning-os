import { CSSProperties } from "react";
import Link from "next/link";
import { ArrowUpRight, Gauge } from "lucide-react";
import { Reveal } from "./motion";

export function SectionHead({ no, title, lead }: { no: string; title: string; lead?: string }) {
  return (
    <div className="section-head">
      <div className="section-no">/{no}</div>
      <div>
        <Reveal as="h2" variant="blur">{title}</Reveal>
        {lead && <Reveal as="p" className="section-lead" delay={120}>{lead}</Reveal>}
      </div>
    </div>
  );
}

export function PageHero({ label, title, description }: { label: string; title: string; description: string }) {
  return (
    <header className="page-hero">
      <div className="page-hero-glow" aria-hidden />
      <div className="container">
        <Reveal variant="fade"><span className="eyebrow"><span className="dot" />{label}</span></Reveal>
        <Reveal as="h1" variant="blur" delay={80}>{title}</Reveal>
        <Reveal as="p" delay={160}>{description}</Reveal>
      </div>
    </header>
  );
}

export function FinalCTA() {
  const floats = [
    { text: "Roadmap 10 level", style: { top: "16%", left: "7%", "--rot": "-4deg" } },
    { text: "Prompt kit teruji", style: { top: "24%", right: "8%", "--rot": "3deg" } },
    { text: "Project portfolio", style: { bottom: "20%", left: "10%", "--rot": "2deg" } },
    { text: "Workflow siap pakai", style: { bottom: "14%", right: "9%", "--rot": "-3deg" } },
  ];
  return (
    <section className="final-cta">
      <div className="ambient" style={{ width: 620, height: 620, left: "50%", top: "50%", transform: "translate(-50%,-50%)", background: "radial-gradient(circle, rgba(47,123,255,.2), transparent 65%)" }} aria-hidden />
      {floats.map(float => (
        <div key={float.text} className="cta-float floaty" style={float.style as CSSProperties} aria-hidden>
          <span className="dot" /><strong>{float.text}</strong>
        </div>
      ))}
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <Reveal variant="fade"><span className="eyebrow"><span className="dot" />Mulai dari posisi sekarang</span></Reveal>
        <Reveal as="h2" variant="blur" delay={90} style={{ marginTop: 24 }}>Cek posisimu, lalu mulai dari sana.</Reveal>
        <Reveal as="p" className="section-lead" delay={170}>Sepuluh pertanyaan singkat untuk tahu level sekarang, plus rekomendasi modul dan project pertama yang masuk akal.</Reveal>
        <Reveal delay={260}>
          <div className="hero-actions">
            <Link href="/skill-check" className="btn btn-primary"><Gauge size={16} />Cek level</Link>
            <Link href="/roadmap" className="btn">Lihat roadmap <ArrowUpRight className="arrow-icon" size={15} /></Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
