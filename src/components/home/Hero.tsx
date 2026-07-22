import Link from "next/link";
import { ArrowRight, Gauge } from "lucide-react";
import { Parallax, Reveal, RevealLines } from "@/components/motion";
import { RibbonVisual } from "@/components/visuals";

export function Hero({ stats }: { stats: [string, number][] }) {
  return (
    <section className="hero-cine">
      <div className="hero-cine-bg" aria-hidden>
        <div className="ambient" style={{ width: 700, height: 700, left: "50%", top: "40%", transform: "translate(-50%,-50%)", background: "radial-gradient(circle, rgba(47,123,255,.22), transparent 62%)" }} />
        <Parallax speed={-0.08} className="hero-ribbon-wrap"><RibbonVisual /></Parallax>
      </div>
      <div className="hero-vignette" aria-hidden />
      <div className="hero-grain" aria-hidden />
      <div className="container hero-cine-content">
        <Reveal variant="fade"><span className="eyebrow"><span className="dot" />Nurai · AI Learning OS</span></Reveal>
        <RevealLines
          as="h1"
          delay={120}
          lines={["Belajar AI dari yang bisa", <em key="l2">langsung dipakai kerja.</em>]}
        />
        <Reveal as="p" className="hero-copy" delay={420}>
          Dari GenAI, prompting, tools, sampai automation dan agent. Setiap materi punya konsep singkat, contoh nyata, dan latihan yang menghasilkan sesuatu.
        </Reveal>
        <Reveal delay={560}>
          <div className="hero-actions">
            <Link href="/course" className="btn btn-primary">Mulai belajar <ArrowRight className="arrow-icon" size={16} /></Link>
            <Link href="/skill-check" className="btn"><Gauge size={16} />Cek level</Link>
          </div>
        </Reveal>
        <Reveal variant="fade" delay={720}>
          <div className="hero-statline">
            {stats.map(([label, count], index) => (
              <span key={label} style={{ display: "inline-flex", gap: 6, alignItems: "baseline" }}>
                <strong>{count}</strong> {label}{index < stats.length - 1 && <span className="sep" style={{ marginLeft: 12 }}>·</span>}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
      <div className="hero-scroll-hint" aria-hidden>Scroll</div>
    </section>
  );
}
