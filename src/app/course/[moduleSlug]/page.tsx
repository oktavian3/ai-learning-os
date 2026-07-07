import Link from "next/link";
import {notFound} from "next/navigation";
import {ArrowLeft,ArrowRight} from "lucide-react";
import {courseModules,getModule} from "@/data/course";

export function generateStaticParams(){return courseModules.map(module=>({moduleSlug:module.slug}))}

export default async function ModulePage({params}:{params:Promise<{moduleSlug:string}>}){
  const {moduleSlug}=await params;const module=getModule(moduleSlug);if(!module)notFound();const nextModule=courseModules[module.number];
  return <>
    <header className="page-hero"><div className="container"><Link href="/course" className="muted" style={{display:"flex",gap:8,alignItems:"center",fontSize:13}}><ArrowLeft size={14}/>Semua modul</Link><div className="eyebrow" style={{marginTop:32}}><span className="dot"/>Modul {String(module.number).padStart(2,"0")} · {module.difficulty}</div><h1>{module.title}</h1><p>{module.description}</p><div className="filters" style={{marginTop:24}}><span className="pill">{module.duration}</span><span className="pill">{module.lessons.length} lesson</span><span className="pill">{module.tools.join(" · ")}</span></div></div></header>
    <section className="section"><div className="container grid grid-2"><div><h2>Kalau modul ini beres, kamu bisa</h2><ul className="list">{module.outcomes.map(item=><li key={item}>{item}</li>)}</ul><div className="glass card" style={{marginTop:28}}><div className="card-top"><span>PROJECT MODUL</span><span className="dot"/></div><h3>{module.project}</h3><p>Buat versi kecilnya dulu. Yang penting jalan, bisa dites, dan kamu ngerti kenapa hasilnya begitu.</p></div></div><div className="glass card"><div className="card-top"><span>ISI MODUL</span><span>{module.lessons.length} lesson</span></div>{module.lessons.map((lesson,index)=><Link className="lesson-row" href={`/course/${module.slug}/${lesson.slug}`} key={lesson.slug}><span><span className="blue" style={{fontSize:12}}>{String(index+1).padStart(2,"0")}</span><br/>{lesson.title}</span><span className="muted" style={{fontSize:12}}>{lesson.duration} {"->"}</span></Link>)}</div></div></section>
    <section className="section section-dark"><div className="container"><div className="grid grid-3"><div className="glass card"><h3>Paham konsepnya</h3><p>Secukupnya. Agar tidak asal menekan tombol dan bingung pas hasilnya aneh.</p></div><div className="glass card"><h3>Langsung coba</h3><p>Pakai prompt dan latihan kecil. Tidak perlu nunggu merasa jago.</p></div><div className="glass card"><h3>Simpan buktinya</h3><p>Hasil latihan dan project bisa jadi bahan portfolio kalau didokumentasikan.</p></div></div>{nextModule&&<Link href={`/course/${nextModule.slug}`} className="btn btn-primary" style={{marginTop:30}}>Lanjut ke: {nextModule.title}<ArrowRight size={15}/></Link>}</div></section>
  </>;
}
