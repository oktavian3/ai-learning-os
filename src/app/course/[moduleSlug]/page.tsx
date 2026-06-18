import Link from "next/link";
import {notFound} from "next/navigation";
import {ArrowLeft,ArrowRight} from "lucide-react";
import {courseModules,getModule} from "@/data/course";

export function generateStaticParams(){return courseModules.map(module=>({moduleSlug:module.slug}))}

export default async function ModulePage({params}:{params:Promise<{moduleSlug:string}>}){
  const {moduleSlug}=await params;const module=getModule(moduleSlug);if(!module)notFound();const nextModule=courseModules[module.number];
  return <>
    <header className="page-hero"><div className="container"><Link href="/course" className="muted" style={{display:"flex",gap:8,alignItems:"center",fontSize:13}}><ArrowLeft size={14}/>Semua modul</Link><div className="eyebrow" style={{marginTop:32}}><span className="dot"/>Modul {String(module.number).padStart(2,"0")} · {module.difficulty}</div><h1>{module.title}</h1><p>{module.description}</p><div className="filters" style={{marginTop:24}}><span className="pill">{module.duration}</span><span className="pill">{module.lessons.length} lesson</span><span className="pill">{module.tools.join(" · ")}</span></div></div></header>
    <section className="section"><div className="container grid grid-2"><div><h2>Setelah modul ini, kamu bisa</h2><ul className="list">{module.outcomes.map(item=><li key={item}>{item}</li>)}</ul><div className="glass card" style={{marginTop:28}}><div className="card-top"><span>PROJECT MODUL</span><span className="dot"/></div><h3>{module.project}</h3><p>Kerjakan versi kecilnya dulu. Yang penting bisa dicoba, dicek, dan kamu jelaskan kembali.</p></div></div><div className="glass card"><div className="card-top"><span>ISI MODUL</span><span>{module.lessons.length} lesson</span></div>{module.lessons.map((lesson,index)=><Link className="lesson-row" href={`/course/${module.slug}/${lesson.slug}`} key={lesson.slug}><span><span className="blue" style={{fontSize:12}}>{String(index+1).padStart(2,"0")}</span><br/>{lesson.title}</span><span className="muted" style={{fontSize:12}}>{lesson.duration} →</span></Link>)}</div></div></section>
    <section className="section section-dark"><div className="container"><div className="grid grid-3"><div className="glass card"><h3>Belajar konsep</h3><p>Pahami ide utamanya dengan contoh yang dekat dengan pekerjaan sehari-hari.</p></div><div className="glass card"><h3>Langsung praktik</h3><p>Coba prompt dan latihan kecil. Tidak perlu menunggu sampai merasa ahli.</p></div><div className="glass card"><h3>Bikin bukti kerja</h3><p>Simpan hasil latihan dan project sebagai bahan portfolio.</p></div></div>{nextModule&&<Link href={`/course/${nextModule.slug}`} className="btn btn-primary" style={{marginTop:30}}>Lihat modul berikutnya: {nextModule.title}<ArrowRight size={15}/></Link>}</div></section>
  </>;
}
