import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { courseModules, getModule } from "@/data/course";
import { Reveal, Stagger } from "@/components/motion";

export function generateStaticParams() {
  return courseModules.map(module => ({ moduleSlug: module.slug }));
}

export default async function ModulePage({ params }: { params: Promise<{ moduleSlug: string }> }) {
  const { moduleSlug } = await params;
  const module = getModule(moduleSlug);
  if (!module) notFound();
  const nextModule = courseModules[module.number];

  return (
    <>
      <header className="page-hero">
        <div className="page-hero-glow" aria-hidden />
        <div className="container">
          <Link href="/course" className="back-link"><ArrowLeft size={14} />Semua modul</Link>
          <Reveal variant="fade"><div className="eyebrow" style={{ marginTop: 26 }}><span className="dot" />Modul {String(module.number).padStart(2, "0")} · {module.difficulty}</div></Reveal>
          <Reveal as="h1" variant="blur" delay={70}>{module.title}</Reveal>
          <Reveal as="p" delay={140}>{module.description}</Reveal>
          <Reveal delay={210}>
            <div className="filters" style={{ marginTop: 24 }}>
              <span className="pill">{module.duration}</span>
              <span className="pill">{module.lessons.length} lesson</span>
              <span className="pill">{module.tools.join(" · ")}</span>
            </div>
          </Reveal>
        </div>
      </header>

      <section className="section-tight">
        <div className="container grid grid-2">
          <div>
            <Reveal as="h2" variant="blur">Kalau modul ini beres</Reveal>
            <Reveal delay={100}><ul className="list">{module.outcomes.map(item => <li key={item}>{item}</li>)}</ul></Reveal>
            <Reveal delay={180}>
              <div className="glass card" style={{ marginTop: 28 }}>
                <div className="card-top"><span>Project modul</span><span className="dot" /></div>
                <h3>{module.project}</h3>
                <p>Buat versi kecilnya dulu. Yang penting jalan, bisa dites, dan prosesnya bisa dijelaskan.</p>
              </div>
            </Reveal>
          </div>
          <Reveal variant="scale" delay={120}>
            <div className="glass card">
              <div className="card-top"><span>Isi modul</span><span>{module.lessons.length} lesson</span></div>
              {module.lessons.map((lesson, index) => (
                <Link className="lesson-row" href={`/course/${module.slug}/${lesson.slug}`} key={lesson.slug}>
                  <span><span className="blue" style={{ fontSize: 12 }}>{String(index + 1).padStart(2, "0")}</span><br />{lesson.title}</span>
                  <span className="muted" style={{ fontSize: 12, whiteSpace: "nowrap" }}>{lesson.duration} <ArrowRight size={11} style={{ verticalAlign: "middle" }} /></span>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-tight section-dark">
        <div className="container">
          <Stagger className="grid grid-3" step={90}>
            {[
              ["Paham konsepnya", "Secukupnya, biar tidak cuma pencet tombol lalu bingung saat hasilnya aneh."],
              ["Langsung coba", "Pakai prompt dan latihan kecil. Tidak perlu menunggu merasa jago."],
              ["Simpan buktinya", "Hasil latihan dan project bisa jadi bahan portfolio kalau didokumentasikan."],
            ].map(([title, copy]) => (
              <Reveal key={title} variant="fade-up">
                <div className="glass card" style={{ height: "100%" }}><h3>{title}</h3><p>{copy}</p></div>
              </Reveal>
            ))}
          </Stagger>
          {nextModule && (
            <Link href={`/course/${nextModule.slug}`} className="btn btn-primary" style={{ marginTop: 30 }}>
              Lanjut ke: {nextModule.title}<ArrowRight className="arrow-icon" size={15} />
            </Link>
          )}
        </div>
      </section>
    </>
  );
}
