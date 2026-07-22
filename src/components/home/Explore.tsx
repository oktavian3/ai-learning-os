import Link from "next/link";
import { SectionHead } from "@/components/Primitives";
import { Reveal, Stagger } from "@/components/motion";

type ExploreEntry = {
  title: string; copy: string; href: string; count?: number; unit?: string;
  className?: string;
};

export function Explore({ counts }: { counts: { tools: number; prompts: number; workflows: number; useCases: number; projects: number; monetization: number; glossary: number } }) {
  const entries: ExploreEntry[] = [
    { title: "Skill Check", copy: "Sepuluh pertanyaan untuk tahu mulai dari level mana. Hasilnya kartu yang bisa dibagikan.", href: "/skill-check", className: "span-3 featured" },
    { title: "Tools", copy: "Dinilai dari fungsi, biaya, dan risiko. Termasuk kapan tidak worth dipakai.", href: "/tools", count: counts.tools, unit: "tool", className: "span-3" },
    { title: "Use Cases", copy: "Contoh nyata AI dipakai di kerja sehari-hari, dengan langkah dan prompt.", href: "/use-cases", count: counts.useCases, unit: "use case", className: "span-2" },
    { title: "Prompts", copy: "Template dengan variabel, contoh input, dan output yang diharapkan.", href: "/prompts", count: counts.prompts, unit: "prompt", className: "span-2" },
    { title: "Workflows", copy: "Alur kerja dari masalah sampai output, lengkap dengan titik review.", href: "/workflows", count: counts.workflows, unit: "workflow", className: "span-2" },
    { title: "Projects", copy: "Bukti kerja berjenjang untuk portfolio.", href: "/projects", count: counts.projects, unit: "project", className: "span-2" },
    { title: "Monetize", copy: "Model bisnis untuk menjual skill AI tanpa janji cuan semalam.", href: "/monetize", count: counts.monetization, unit: "model", className: "span-2" },
    { title: "Kamus AI", copy: "Istilah AI dijelaskan dalam Bahasa Indonesia, dengan contoh.", href: "/glossary", count: counts.glossary, unit: "istilah", className: "span-2" },
  ];
  return (
    <section className="section">
      <div className="container">
        <SectionHead
          no="07"
          title="Jelajahi Nurai."
          lead="Semua resource terbuka. Mulai dari mana saja, semuanya saling menunjuk."
        />
        <Stagger className="explore-grid" step={70}>
          {entries.map(entry => (
            <Reveal key={entry.href} variant="fade-up" className={`explore-card ${entry.className || ""}`} style={{ padding: 0 }}>
              <Link href={entry.href} style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 5, padding: 22, height: "100%" }}>
                {entry.count !== undefined && <span className="ex-count">{entry.count} {entry.unit}</span>}
                <h3>{entry.title}</h3>
                <p>{entry.copy}</p>
              </Link>
            </Reveal>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
