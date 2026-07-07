import Link from "next/link";
import {ArrowDown,ArrowRight,BookOpen,Boxes,Coins,Command,Gauge,Search,Workflow} from "lucide-react";
import {CTA,SectionHead} from "@/components/Primitives";
import {sourceLessonCount} from "@/data/course";
import {prompts,projects,roadmap,tools,useCases,workflows} from "@/data/library";

const progression=["Paham konsep","Pakai untuk kerja","Bangun workflow","Masuk ke automation","Bangun agent"];

export default function Home(){return <>
  <section className="hero"><div className="hero-bg" aria-hidden="true"/>
    <div className="stat-float glass sf1"><strong style={{fontSize:18}}>Prompt itu brief yang jelas</strong><span>Bukan ramuan rahasia.</span></div>
    <div className="stat-float glass sf2"><strong style={{fontSize:18}}>Workflow &gt; trial-and-error</strong><span>Biar hasilnya bisa diulang.</span></div>
    <div className="stat-float glass sf3"><strong style={{fontSize:18}}>Agent bisa pakai tools</strong><span>Dan jalan beberapa step.</span></div>
    <div className="stat-float glass sf4"><strong style={{fontSize:18}}>Skill AI perlu bukti</strong><span>Demo lebih kuat dari jargon.</span></div>
    <div className="container hero-content"><span className="eyebrow"><span className="dot"/>Nurai</span>
      <h1>Belajar AI dari nol sampai bisa praktek sendiri.</h1>
      <p className="hero-copy">Mulai dari GenAI, LLM, prompting, tools, workflow, automation, RAG, sampai AI agent. Fokusnya simpel: paham konsepnya, tau cara pakainya, lalu bisa membuat sistem kerja sendiri.</p>
      <div className="hero-actions"><Link href="/roadmap" className="btn btn-primary">Mulai dari Roadmap <ArrowRight size={16}/></Link><Link href="/course" className="btn">Lihat Course <ArrowDown size={16}/></Link><Link href="#skill-check" className="btn btn-soft"><Gauge size={16}/>Cek Level AI</Link></div>
      <div className="mobile-stats"><span className="pill">Prompt itu brief yang jelas</span><span className="pill">Workflow &gt; trial-and-error</span><span className="pill">Agent pakai tools</span><span className="pill">Skill AI perlu bukti</span></div>
      <div className="eyebrow" style={{marginTop:34,textTransform:"none",letterSpacing:0}}>{sourceLessonCount} lesson <ArrowRight size={12}/> {prompts.length} prompt <ArrowRight size={12}/> {useCases.length} use case <ArrowRight size={12}/> {projects.length} project</div>
    </div>
  </section>

  <section className="section section-dark"><div className="container"><SectionHead no="01" title="Paham konsepnya. Praktek langsung. Bangun sistem sendiri." lead="AI bukan cuma ChatGPT buat nanya random. Yang terpakai justru cara mikirnya: tau inputnya apa, hasil yang mau dibuat apa, dan bagian mana yang tetap harus dicek manusia."/>
    <div className="grid grid-4">{[["01","Paham","Kenalan sama konsepnya. Secukupnya, tidak perlu terlalu teknis."],["02","Pakai","Coba buat kerjaan yang memang kamu lakukan."],["03","Rangkai","Gabungkan prompt, tools, dan review jadi workflow."],["04","Buktikan","Buat project yang bisa dibuka, dites, dan ditunjukkan ke orang lain."]].map(x=><div className="glass card" key={x[0]}><div className="card-top"><span>/{x[0]}</span><span className="dot"/></div><h3>{x[1]}</h3><p>{x[2]}</p></div>)}</div>
  </div></section>

  <section className="section"><div className="container"><SectionHead no="02" title="Ada urutannya. Tidak perlu terburu-buru." lead="Kalau baru kenal prompt, tidak perlu langsung membuat multi-agent. Mulai dari posisi sekarang, selesaikan satu project, baru lanjut."/>
    <Link href="/roadmap" className="glass card roadmap-summary" style={{textDecoration:"none",display:"block"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}><span style={{fontSize:13,color:"#75aaff"}}>{roadmap.length} level tersedia</span><span className="pill">{roadmap[0].lessons}, {roadmap[roadmap.length-1].lessons}</span></div>
      <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:20}}>{roadmap.map(r=><div key={r.level} style={{padding:"8px 14px",borderRadius:8,background:"rgba(117,170,255,.08)",border:"1px solid rgba(117,170,255,.15)",fontSize:13,color:"#aeb9c8"}}><strong style={{color:"white"}}>{String(r.level).padStart(2,"0")}</strong> {r.title}</div>)}</div>
      <span className="pill">Lihat roadmap lengkap <ArrowRight size={11}/></span>
    </Link>
  </div></section>

  <section className="section section-dark"><div className="container"><SectionHead no="03" title="Pilih jalur sesuai profesi kamu." lead="Tidak semua orang harus jadi developer. Yang penting tau AI mau dipakai buat bantu bagian mana."/>
    <div className="grid grid-4">{[[BookOpen,"AI Operator","Buat riset, nulis, dokumen, dan kerja harian."],[Workflow,"Workflow Builder","Buat alur content, admin, atau operasional yang bisa diulang."],[Boxes,"Agentic Builder","Masuk ke API, RAG, tool calling, dan orchestration."],[Coins,"Monetize Skill AI","Paketkan hasil kerja, buat portfolio, lalu cari klien yang masuk akal."]].map(([Icon,title,copy])=>{const I=Icon as typeof BookOpen;return <div className="glass card" key={String(title)}><I className="blue" size={25}/><h3>{String(title)}</h3><p>{String(copy)}</p></div>})}</div>
  </div></section>

  <section className="section"><div className="container"><SectionHead no="04" title="Belajarnya bertahap. Tidak perlu langsung lompat ke agent." lead="Setiap modul punya penjelasan, contoh, latihan, prompt, cek pemahaman, dan tugas kecil. Sehingga tidak cuma dibaca lalu dilupakan."/>
    <Link href="/course/ai-fundamentals" className="glass card learning-progression" style={{textDecoration:"none",display:"block"}}>
      <div className="progression-grid"><div><span className="pill">Start here</span><h3>Dasar AI</h3><p>2 jam untuk memahami konsep, batas, dan cara memeriksa jawaban sebelum masuk ke tool yang lebih berat.</p><span className="btn btn-primary btn-sm">Mulai dari Dasar AI <ArrowRight size={13}/></span></div><div className="progression-steps">{progression.map((step,index)=><div className="progression-step" key={step}><span>{String(index+1).padStart(2,"0")}</span><strong>{step}</strong></div>)}</div></div>
    </Link>
  </div></section>

  <section className="section section-dark"><div className="container"><SectionHead no="05" title="Tidak perlu mulai dari nol. Pakai template, pelajari, modif." lead="Cari tool yang pas, copy template, lihat workflow, lalu pelajari cara kerjanya."/>
    <div className="grid grid-3">{[[Search,"Tools AI itu banyak",`${tools.length} tool, plus kapan sebaiknya tidak dipakai.`,"/tools","Cek tools"],[Command,"Prompt siap dipelajari",`${prompts.length} template yang tinggal disesuaikan, bukan ditelan mentah.`,"/prompts","Copy prompt"],[Workflow,"Workflow nyata",`${workflows.length} alur dari masalah sampai output, lengkap dengan checklist.`,"/workflows","Lihat workflow"]].map(([Icon,title,copy,href,label])=>{const I=Icon as typeof Search;return <Link className="glass card" key={String(title)} href={String(href)}><I className="blue"/><h3>{String(title)}</h3><p>{String(copy)}</p><span className="pill">{String(label)} <ArrowRight size={11}/></span></Link>})}</div>
  </div></section>

  <section className="section"><div className="container"><SectionHead no="06" title="Skill AI sudah ada. Sekarang monetize dari mana?" lead="Jual hasil yang jelas. Bukan sekadar bilang kami pakai AI. Mulai dari masalah kecil, scope rapi, lalu tunjukkan bukti kerjanya."/>
    <div className="grid grid-3"><div className="glass card"><div className="metric blue">01</div><h3>Cari kerjaan yang menyulitkan</h3><p>Berulang, makan waktu, atau sering membuat salah. Biasanya peluangnya ada di situ.</p></div><div className="glass card"><div className="metric blue">02</div><h3>Paketkan hasilnya</h3><p>Tulis jelas apa yang dikerjakan, apa yang diterima klien, dan apa yang tidak termasuk.</p></div><div className="glass card"><div className="metric blue">03</div><h3>Tunjukkan bukti</h3><p>Demo kecil dan case study jauh lebih laku daripada bio penuh jargon.</p></div></div>
  </div></section>
  <section className="section section-dark skill-check-entry" id="skill-check"><div className="container skill-check-entry-grid"><div className="skill-check-entry-copy"><span className="eyebrow"><span className="dot"/>AI Skill Check</span><h2>Sejauh apa skill AI lu sekarang?</h2><p className="section-lead">Jawab beberapa pertanyaan, lihat level AI lu, lalu dapatkan kartu hasil yang bisa disimpan dan dibagikan.</p><div className="skill-check-entry-actions"><Link href="/skill-check" className="btn btn-primary">Mulai Skill Check <ArrowRight size={16}/></Link><span>Gratis / Tidak perlu login / Hasil langsung keluar</span></div></div><Link href="/skill-check" className="skill-card-preview" aria-label="Buka AI Skill Check"><img src="/images/publicimagescard-tier-3.png" alt="Preview kartu hasil Nurai AI Skill Check"/><div className="skill-card-preview-caption"><Gauge size={16}/><span>10 pertanyaan / sekitar 3 menit</span></div></Link></div></section>
  <CTA/>
</>}
