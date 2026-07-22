import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHead } from "@/components/Primitives";
import { Reveal, Stagger } from "@/components/motion";
import { ProjectPreviewArt } from "@/components/visuals";

export type ProjectSummary = { title: string; description: string; slug: string; level: string; category: string };

export function Projects({ projects }: { projects: ProjectSummary[] }) {
  return (
    <section className="section section-dark">
      <div className="container">
        <SectionHead
          no="05"
          title="Yang dibangun di sini bisa dibuka dan dites."
          lead="Bukan testimoni, tapi project nyata dari materi Nurai: dari prompt library sampai agent dengan approval. Semua punya scope, langkah bangun, dan cara ngetesnya."
        />
        <Stagger className="proj-grid" step={90}>
          {projects.map((project, index) => (
            <Reveal key={project.slug} variant="fade-up">
              <Link href={`/projects/${project.slug}`} className="proj-card" style={{ display: "flex" }}>
                <div className="proj-preview"><ProjectPreviewArt seed={index} /></div>
                <div className="proj-body">
                  <div className="card-top"><span>Project</span><span className="pill">{project.level}</span></div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="proj-meta">
                    <span className="eco-cta" style={{ color: "var(--soft)", display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13 }}>Buka project <ArrowUpRight size={13} /></span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
