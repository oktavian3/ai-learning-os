import Link from "next/link";
import { ArrowRight, Gauge } from "lucide-react";
import { Reveal } from "@/components/motion";

export function SkillCheckEntry() {
  return (
    <section className="section section-dark" id="skill-check">
      <div className="container sc-entry-grid">
        <div>
          <Reveal variant="fade"><span className="eyebrow"><span className="dot" />Skill Check</span></Reveal>
          <Reveal as="h2" variant="blur" delay={90} style={{ marginTop: 22 }}>Sekarang di level berapa?</Reveal>
          <Reveal as="p" className="section-lead" delay={170}>
            Sepuluh pertanyaan singkat, kartu hasil personal, dan rekomendasi level mana yang cocok dimulai. Tanpa login, tanpa email.
          </Reveal>
          <Reveal delay={260}>
            <div style={{ marginTop: 26 }}>
              <Link href="/skill-check" className="btn btn-primary">Mulai Skill Check <ArrowRight className="arrow-icon" size={16} /></Link>
            </div>
          </Reveal>
        </div>
        <Reveal variant="scale" delay={200}>
          <Link href="/skill-check" className="skill-card-preview-home" aria-label="Buka Skill Check" style={{ display: "block", position: "relative", borderRadius: 18, overflow: "hidden", border: "1px solid rgba(122,184,255,.24)", boxShadow: "0 30px 80px rgba(0,0,0,.45), 0 0 40px rgba(47,123,255,.12)", transform: "rotate(2deg)" }}>
            <img src="/images/publicimagescard-tier-3.png" alt="Preview kartu hasil Nurai Skill Check" style={{ width: "100%", aspectRatio: "4/5", objectFit: "cover", objectPosition: "center top", display: "block" }} />
            <span style={{ position: "absolute", left: 16, bottom: 14, display: "flex", alignItems: "center", gap: 8, color: "#dcebff", fontSize: 12, zIndex: 1 }}>
              <Gauge size={15} /> 10 pertanyaan · 3 menit
            </span>
            <span aria-hidden style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,transparent 60%,rgba(3,7,17,.88) 100%)" }} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
