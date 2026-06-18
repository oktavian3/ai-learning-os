import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero,CTA } from "@/components/Primitives";
import { courseModules } from "@/data/course";
export const metadata={title:"Course"};
export default function Course(){return <><PageHero label="14 modul · 35 lesson" title="Mulai dari nol, lanjut sampai bisa membangun." description="Tidak perlu paham teknis dulu. Pilih modul pertama, ikuti lesson-nya, lalu kerjakan latihan kecil di setiap bagian."/><section className="section"><div className="container grid grid-3">{courseModules.map(m=><article className="glass card" key={m.slug}><div className="card-top"><span>MODUL {String(m.number).padStart(2,"0")}</span><span className="pill">{m.difficulty}</span></div><h3>{m.title}</h3><p>{m.description}</p><ul className="list"><li>{m.lessons.length} lesson lengkap</li><li>{m.duration}</li><li>Hasil akhir: {m.project}</li></ul><Link href={`/course/${m.slug}`} className="btn btn-sm" style={{marginTop:20}}>Lihat isi modul <ArrowUpRight size={14}/></Link></article>)}</div></section><CTA/></>}
