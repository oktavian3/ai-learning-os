import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FinalCTA, PageHero } from "@/components/Primitives";
import { PointerGlowArea, Reveal, Stagger } from "@/components/motion";
import { courseModules, sourceLessonCount } from "@/data/course";

export const metadata = { title: "Course" };

export default function Course() {
  return (
    <>
      <PageHero
        label={`${courseModules.length} modul · ${sourceLessonCount} lesson`}
        title="Semua materi belajar Nurai."
        description="Setiap modul punya konsep singkat, contoh nyata, dan project yang bisa masuk portfolio. Tidak wajib berurutan, tapi ada rekomendasi urutan di halaman roadmap."
      />
      <section className="section-tight">
        <PointerGlowArea className="container">
          <Stagger className="grid grid-3" step={60}>
            {courseModules.map(module => (
              <Reveal key={module.slug} variant="fade-up">
                <article className="glass card glow-card resource-card-module" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                  <div className="card-top"><span>Modul {String(module.number).padStart(2, "0")}</span><span className="pill">{module.difficulty}</span></div>
                  <h3>{module.title}</h3>
                  <p style={{ flex: 1 }}>{module.description}</p>
                  <ul className="list">
                    <li>{module.lessons.length} lesson</li>
                    <li>{module.duration}</li>
                    <li>Project: {module.project}</li>
                  </ul>
                  <Link href={`/course/${module.slug}`} className="btn btn-sm" style={{ marginTop: 20, alignSelf: "flex-start" }}>
                    Buka modul <ArrowUpRight className="arrow-icon" size={14} />
                  </Link>
                </article>
              </Reveal>
            ))}
          </Stagger>
        </PointerGlowArea>
      </section>
      <FinalCTA />
    </>
  );
}
