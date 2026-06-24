import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero,CTA } from "@/components/Primitives";
import { courseModules,sourceLessonCount } from "@/data/course";
export const metadata={title:"Course"};
export default function Course(){return <><PageHero label={`${courseModules.length} modul · ${sourceLessonCount} lesson`} title="Mulai dari basic dulu. Baru masuk ke yang lebih advanced." description="Baca konsepnya, lihat contoh, langsung praktik. Tidak perlu nunggu paham semuanya baru mulai."/><section className="section"><div className="container grid grid-3">{courseModules.map(m=><article className="glass card resource-card-module" key={m.slug}><div className="card-top"><span>MODUL {String(m.number).padStart(2,"0")}</span><span className="pill">{m.difficulty}</span></div><h3>{m.title}</h3><p>{m.description}</p><ul className="list"><li>{m.lessons.length} lesson</li><li>{m.duration}</li><li>Project: {m.project}</li></ul><Link href={`/course/${m.slug}`} className="btn btn-sm" style={{marginTop:20}}>Buka modul <ArrowUpRight size={14}/></Link></article>)}</div></section><CTA/></>}
