import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FinalCTA, PageHero } from "@/components/Primitives";
import { Reveal, Stagger } from "@/components/motion";
import { roadmap } from "@/data/library";

export const metadata = { title: "Roadmap" };

export default function Roadmap() {
  return (
    <>
      <PageHero
        label={`${roadmap.length} level · dari dasar sampai agent`}
        title="Ada urutannya. Cek posisimu dulu."
        description="Roadmap ini bukan wajib dituruti persis, tapi lompat terlalu jauh biasanya bikin frustrasi. Dari dasar ke workflow, dari workflow ke automation, dari automation ke agent. Kalau ragu di level mana, cek Skill Check dulu."
      />
      <section className="section-tight">
        <div className="container">
          <div style={{ marginBottom: 24, display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#82b6ff" }}>
            <span className="dot" />Klik level untuk mulai belajar
          </div>
          <Stagger className="timeline" step={70}>
            {roadmap.map(level => (
              <Reveal key={level.level} variant="fade-up">
                <Link href={`/course/${level.moduleSlug}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                  <article className="glass timeline-card card" style={{ cursor: "pointer" }}>
                    <div className="level-num">{String(level.level).padStart(2, "0")}</div>
                    <div>
                      <span className="pill">Cocok kalau: {level.forWho}</span>
                      <h3>{level.title}</h3>
                      <p>{level.learn}</p>
                      <ul className="list">
                        <li>Selesai berarti: {level.output}</li>
                        <li>Project: {level.project}</li>
                      </ul>
                    </div>
                    <div className="timeline-meta">
                      <span>{level.lessons}</span>
                      <span>Tools: {level.tools.join(", ")}</span>
                      <span className="blue" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        Mulai level {String(level.level).padStart(2, "0")} <ArrowRight size={13} />
                      </span>
                    </div>
                  </article>
                </Link>
              </Reveal>
            ))}
          </Stagger>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
