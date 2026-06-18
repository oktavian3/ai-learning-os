import Link from "next/link";
import {ArrowDown,ArrowRight,BookOpen,Boxes,Coins,Command,Search,Workflow} from "lucide-react";
import {CTA,SectionHead} from "@/components/Primitives";
import {courseModules,sourceLessonCount} from "@/data/course";
import {prompts,projects,roadmap,tools,useCases,workflows} from "@/data/library";

export default function Home(){return <>
  <section className="hero"><div className="ribbon"/>
    <div className="stat-float glass sf1"><strong style={{fontSize:18}}>Prompt itu brief yang jelas</strong><span>Bukan ramuan rahasia.</span></div>
    <div className="stat-float glass sf2"><strong style={{fontSize:18}}>Workflow &gt; trial-and-error</strong><span>Biar hasilnya bisa diulang.</span></div>
    <div className="stat-float glass sf3"><strong style={{fontSize:18}}>Agent itu asisten yang kerja sendiri</strong><span>Bukan cuma chat biasa.</span></div>
    <div className="stat-float glass sf4"><strong style={{fontSize:18}}>Hasil belajar = penghasilan</strong><span>Bukan sekadar teori.</span></div>
    <div className="container hero-content"><span className="eyebrow"><span className="dot"/>AI Learning OS Indonesia</span>
      <h1>Belajar AI dari nol. <span>Langsung praktek, gak cuma teori.</span></h1>
      <p className="hero-copy">Mulai dari GenAI, LLM, prompting, tools, workflow, automation, RAG, sampai AI agent. Fokusnya simpel: paham konsepnya, tahu cara pakainya, lalu bisa bikin sistem kerja sendiri.</p>
      <div className="hero-actions"><Link href="/roadmap" className="btn btn-primary">Mulai dari Roadmap <ArrowRight size={16}/></Link><Link href="/course" className="btn">Lihat Course <ArrowDown size={16}/></Link></div>
      <div className="mobile-stats"><span className="pill">Prompt itu brief yang jelas</span><span className="pill">Workflow &gt; trial-and-error</span><span className="pill">Agent kerja sendiri</span><span className="pill">Hasil belajar = penghasilan</span></div>
      <div className="eyebrow" style={{marginTop:34,textTransform:"none",letterSpacing:0}}>{sourceLessonCount} lesson <ArrowRight size={12}/> {prompts.length} prompt <ArrowRight size={12}/> {useCases.length} use case <ArrowRight size={12}/> {projects.length} project</div>
    </div>
  </section>

  <section className="section section-dark"><div className="container"><SectionHead no="01" title="Paham konsepnya. Praktek langsung. Bangun sistem sendiri." lead="AI bukan cuma ChatGPT buat nanya random. Yang kepakai justru cara mikirnya: tahu inputnya apa, hasil yang mau dibuat apa, dan bagian mana yang tetap harus dicek manusia."/>
    <div className="grid grid-4">{[["01","Paham","Kenalan sama konsepnya. Secukupnya, gak perlu sok teknis."],["02","Pakai","Coba buat kerjaan yang memang kamu lakukan."],["03","Rangkai","Gabungkan prompt, tools, dan review jadi workflow."],["04","Buktikan","Bikin project yang bisa dibuka, dites, dan dijelasin."]].map(x=><div className="glass card" key={x[0]}><div className="card-top"><span>/{x[0]}</span><span className="dot"/></div><h3>{x[1]}</h3><p>{x[2]}</p></div>)}</div>
  </div></section>

  <section className="section"><div className="container"><SectionHead no="02" title="Ada urutannya. Gak perlu buru-buru." lead="Kalau baru kenal prompt, gak usah buru-buru bikin multi-agent. Mulai dari posisi sekarang, beresin satu project, baru lanjut."/>
    <div className="grid grid-3">{roadmap.slice(0,6).map(r=><div className="glass card" key={r.level}><div className="card-top"><span>LEVEL 0{r.level}</span><span>{r.lessons}</span></div><h3>{r.title}</h3><p>{r.learn}</p><ul className="list"><li>{r.output}</li><li>{r.project}</li></ul></div>)}</div>
    <Link href="/roadmap" className="btn" style={{marginTop:24}}>Buka roadmap <ArrowRight size={15}/></Link>
  </div></section>

  <section className="section section-dark"><div className="container"><SectionHead no="03" title="Pilih jalur sesuai profesi lo." lead="Gak semua orang harus jadi developer. Yang penting tahu AI mau dipakai buat bantu bagian mana."/>
    <div className="grid grid-4">{[[BookOpen,"AI Operator","Buat riset, nulis, dokumen, dan kerja harian."],[Workflow,"Workflow Builder","Bikin alur content, admin, atau operasional yang bisa diulang."],[Boxes,"Agentic Builder","Masuk ke API, RAG, tool calling, dan orchestration."],[Coins,"Jual Skill AI","Paketkan hasil kerja, bikin portfolio, lalu cari klien yang masuk akal."]].map(([Icon,title,copy])=>{const I=Icon as typeof BookOpen;return <div className="glass card" key={String(title)}><I className="blue" size={25}/><h3>{String(title)}</h3><p>{String(copy)}</p></div>})}</div>
  </div></section>

  <section className="section"><div className="container"><SectionHead no="04" title="Mulai dari basic. Nanti ke advanced juga jalan sendiri." lead="Setiap modul punya penjelasan, contoh, latihan, prompt, cek pemahaman, dan tugas kecil. Jadi gak cuma baca lalu lupa."/>
    <div className="grid grid-3">{courseModules.slice(0,6).map(m=><Link className="glass card" href={`/course/${m.slug}`} key={m.slug}><div className="card-top"><span>MODUL {String(m.number).padStart(2,"0")}</span><span className="pill">{m.difficulty}</span></div><h3>{m.title}</h3><p>{m.description}</p><div style={{marginTop:18,fontSize:12,color:"#75aaff"}}>{m.lessons.length} lesson · {m.duration}</div></Link>)}</div>
  </div></section>

  <section className="section section-dark"><div className="container"><SectionHead no="05" title="Gak perlu mulai dari nol. Pakai template, pelajari, modif." lead="Cari tool yang pas, copy template, lihat workflow, lalu bongkar cara kerjanya."/>
    <div className="grid grid-3">{[[Search,"Tools AI itu banyak",`${tools.length} tool, plus kapan sebaiknya gak dipakai.`,"/tools","Cek tools"],[Command,"Prompt siap bongkar",`${prompts.length} template yang tinggal disesuaikan, bukan ditelan mentah.`,"/prompts","Copy prompt"],[Workflow,"Workflow beneran",`${workflows.length} alur dari masalah sampai output, lengkap dengan checklist.`,"/workflows","Lihat workflow"]].map(([Icon,title,copy,href,label])=>{const I=Icon as typeof Search;return <Link className="glass card" key={String(title)} href={String(href)}><I className="blue"/><h3>{String(title)}</h3><p>{String(copy)}</p><span className="pill">{String(label)} <ArrowRight size={11}/></span></Link>})}</div>
  </div></section>

  <section className="section"><div className="container"><SectionHead no="06" title="Udah bisa AI-nya. Sekarang jual apa?" lead="Jual hasil yang jelas. Bukan sekadar bilang ‘kami pakai AI’. Mulai dari masalah kecil, scope rapi, lalu tunjukkan bukti kerjanya."/>
    <div className="grid grid-3"><div className="glass card"><div className="metric blue">01</div><h3>Cari kerjaan yang nyebelin</h3><p>Berulang, makan waktu, atau sering bikin salah. Biasanya peluangnya ada di situ.</p></div><div className="glass card"><div className="metric blue">02</div><h3>Paketkan hasilnya</h3><p>Tulis jelas apa yang dikerjakan, apa yang diterima klien, dan apa yang gak termasuk.</p></div><div className="glass card"><div className="metric blue">03</div><h3>Tunjukkan bukti</h3><p>Demo kecil dan case study jauh lebih laku daripada bio penuh jargon.</p></div></div>
  </div></section>
  <CTA/>
</>}
