import { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHead } from "@/components/Primitives";
import { PointerGlowArea, Reveal, Stagger } from "@/components/motion";
import { CourseLayersVisual, ProjectWindowVisual, PromptCardsVisual, WorkflowNodesVisual } from "@/components/visuals";

type EcoItem = {
  label: string; title: string; count: number; unit: string; copy: string; href: string; cta: string;
  visual: ReactNode;
};

export function Ecosystem({ counts }: { counts: { lessons: number; prompts: number; workflows: number; projects: number } }) {
  const items: EcoItem[] = [
    {
      label: "Course", title: "Materi belajar bertahap", count: counts.lessons, unit: "lesson",
      copy: "Dari dasar AI sampai agent orchestration. Setiap modul ditutup project yang bisa masuk portfolio.",
      href: "/course", cta: "Buka course", visual: <CourseLayersVisual />,
    },
    {
      label: "Prompt", title: "Template siap disesuaikan", count: counts.prompts, unit: "prompt",
      copy: "Template dengan variabel yang tinggal diganti, contoh input, dan output yang diharapkan.",
      href: "/prompts", cta: "Salin prompt", visual: <PromptCardsVisual />,
    },
    {
      label: "Workflow", title: "Alur kerja teruji", count: counts.workflows, unit: "workflow",
      copy: "Dari masalah, langkah kerja, titik review, sampai output final. Ada checklist kualitasnya.",
      href: "/workflows", cta: "Lihat workflow", visual: <WorkflowNodesVisual />,
    },
    {
      label: "Project", title: "Bukti kerja nyata", count: counts.projects, unit: "project",
      copy: "Project berjenjang dari prompt library sampai multi-agent system, lengkap dengan scope dan cara tes.",
      href: "/projects", cta: "Pilih project", visual: <ProjectWindowVisual />,
    },
  ];
  return (
    <section className="section section-dark">
      <div className="container">
        <SectionHead
          no="02"
          title="Satu ekosistem, empat pintu masuk."
          lead="Semua saling terhubung: materi menunjuk ke prompt, prompt dipakai di workflow, workflow jadi bagian project."
        />
        <PointerGlowArea>
          <Stagger className="eco-grid" step={110}>
            {items.map(item => (
              <Reveal key={item.label} variant="scale">
                <Link href={item.href} className="eco-card glow-card" style={{ display: "flex" }}>
                  <div className="eco-visual">{item.visual}</div>
                  <span className="eco-count">{item.count} {item.unit}</span>
                  <span className="eco-label">{item.label}</span>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                  <span className="eco-cta">{item.cta} <ArrowRight size={15} /></span>
                </Link>
              </Reveal>
            ))}
          </Stagger>
        </PointerGlowArea>
      </div>
    </section>
  );
}
