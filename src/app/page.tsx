import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FinalCTA, SectionHead } from "@/components/Primitives";
import { Reveal, Stagger } from "@/components/motion";
import { Hero } from "@/components/home/Hero";
import { QuestionRows } from "@/components/home/QuestionRows";
import { System } from "@/components/home/System";
import { Ecosystem } from "@/components/home/Ecosystem";
import { CourseShowcase, ModuleSummary } from "@/components/home/CourseShowcase";
import { LibraryShowcase, LibraryTab } from "@/components/home/LibraryShowcase";
import { Projects, ProjectSummary } from "@/components/home/Projects";
import { Explore } from "@/components/home/Explore";
import { SkillCheckEntry } from "@/components/home/SkillCheckEntry";
import { courseModules, sourceLessonCount } from "@/data/course";
import { glossary, monetization, projects, prompts, tools, useCases, workflows } from "@/data/library";
import { resourceSlug } from "@/data/resources";
import { DirectoryItem } from "@/data/types";

const toLibraryItems = (items: DirectoryItem[]) =>
  items.slice(0, 8).map(item => ({
    title: item.title,
    category: item.category,
    description: item.description,
    slug: resourceSlug(item),
    tag: item.tag,
  }));

export default function Home() {
  const stats: [string, number][] = [
    ["lesson", sourceLessonCount],
    ["prompt", prompts.length],
    ["use case", useCases.length],
    ["project", projects.length],
    ["tool", tools.length],
    ["workflow", workflows.length],
  ];

  const moduleSummaries: ModuleSummary[] = courseModules.map(module => ({
    number: module.number,
    slug: module.slug,
    title: module.title,
    description: module.description,
    difficulty: module.difficulty,
    duration: module.duration,
    lessonCount: module.lessons.length,
    project: module.project,
  }));

  const libraryTabs: LibraryTab[] = [
    { key: "tools", label: "Tools", basePath: "/tools", cta: "Buka tool", total: tools.length, items: toLibraryItems(tools) },
    { key: "prompts", label: "Prompt", basePath: "/prompts", cta: "Salin prompt", total: prompts.length, items: toLibraryItems(prompts) },
    { key: "workflows", label: "Workflow", basePath: "/workflows", cta: "Buka workflow", total: workflows.length, items: toLibraryItems(workflows) },
  ];

  const projectSummaries: ProjectSummary[] = projects.slice(0, 6).map(project => ({
    title: project.title,
    description: project.description,
    slug: resourceSlug(project),
    level: project.level,
    category: project.category,
  }));

  return (
    <>
      <Hero stats={stats} />
      <QuestionRows />
      <System />
      <Ecosystem counts={{ lessons: sourceLessonCount, prompts: prompts.length, workflows: workflows.length, projects: projects.length }} />

      <section className="section">
        <div className="container">
          <SectionHead
            no="03"
            title="Ada urutannya. Tidak perlu buru-buru."
            lead="Kalau baru kenal prompt, tidak perlu langsung bikin multi-agent. Pilih modul sesuai posisi sekarang, selesaikan project-nya, baru lanjut."
          />
          <Reveal variant="fade-up"><CourseShowcase modules={moduleSummaries} /></Reveal>
          <Reveal delay={120}>
            <div style={{ marginTop: 28 }}>
              <Link href="/roadmap" className="btn">Lihat roadmap 10 level <ArrowUpRight className="arrow-icon" size={14} /></Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <SectionHead
            no="04"
            title="Tidak perlu mulai dari nol."
            lead="Cari tool yang pas, salin template, pelajari alurnya, lalu sesuaikan dengan pekerjaanmu."
          />
          <Reveal variant="fade-up"><LibraryShowcase tabs={libraryTabs} /></Reveal>
        </div>
      </section>

      <Projects projects={projectSummaries} />

      <section className="section">
        <div className="container">
          <SectionHead
            no="06"
            title="Skill AI sudah ada. Sekarang caranya jualan gimana?"
            lead="Klien tidak beli kalimat &quot;kami pakai AI&quot;. Yang laku itu hasil yang spesifik, scope yang jelas, dan bukti kerja yang bisa dicek. Mulai dari masalah kecil dulu."
          />
          <Stagger className="grid grid-3" step={100}>
            {[
              ["01", "Cari kerjaan yang bikin repot", "Berulang, makan waktu, atau sering bikin salah. Biasanya peluangnya ada di situ."],
              ["02", "Paketkan hasilnya", "Tulis jelas apa yang dikerjakan, apa yang diterima klien, dan apa yang tidak termasuk."],
              ["03", "Tunjukkan bukti", "Demo kecil dan case study jauh lebih laku daripada bio penuh jargon."],
            ].map(([no, title, copy]) => (
              <Reveal key={no} variant="fade-up">
                <div className="glass card" style={{ height: "100%" }}>
                  <div className="metric blue">{no}</div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              </Reveal>
            ))}
          </Stagger>
          <Reveal delay={140}>
            <div style={{ marginTop: 26 }}>
              <Link href="/monetize" className="btn">Lihat {monetization.length} model bisnis <ArrowUpRight className="arrow-icon" size={14} /></Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Explore counts={{ tools: tools.length, prompts: prompts.length, workflows: workflows.length, useCases: useCases.length, projects: projects.length, monetization: monetization.length, glossary: glossary.length }} />
      <SkillCheckEntry />
      <FinalCTA />
    </>
  );
}
