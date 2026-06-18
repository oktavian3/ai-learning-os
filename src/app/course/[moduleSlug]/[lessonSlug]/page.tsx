import Link from "next/link";
import {notFound} from "next/navigation";
import {ArrowLeft,ArrowRight} from "lucide-react";
import {courseModules,getModule} from "@/data/course";
import {CompleteLesson,CopyTextButton} from "@/components/LessonTools";

export function generateStaticParams(){return courseModules.flatMap(module=>module.lessons.map(lesson=>({moduleSlug:module.slug,lessonSlug:lesson.slug})))}

export default async function LessonPage({params}:{params:Promise<{moduleSlug:string;lessonSlug:string}>}){
  const {moduleSlug,lessonSlug}=await params;
  const module=getModule(moduleSlug);
  const lesson=module?.lessons.find(item=>item.slug===lessonSlug);
  if(!module||!lesson)notFound();
  const lessonIndex=module.lessons.indexOf(lesson);
  const nextLesson=module.lessons[lessonIndex+1];
  const nextModule=courseModules[module.number];
  const nextHref=nextLesson?`/course/${module.slug}/${nextLesson.slug}`:nextModule?`/course/${nextModule.slug}`:`/course`;
  const nextLabel=nextLesson?nextLesson.title:nextModule?`Lanjut ke ${nextModule.title}`:"Kembali ke course";

  return <>
    <header className="page-hero"><div className="container">
      <Link href={`/course/${module.slug}`} className="muted" style={{display:"flex",gap:8,alignItems:"center",fontSize:13}}><ArrowLeft size={14}/>{module.title}</Link>
      <div className="eyebrow" style={{marginTop:32}}><span className="dot"/>{lesson.code} · {lesson.difficulty} · {lesson.duration}</div>
      <h1>{lesson.title}</h1><p>{lesson.summary}</p>
      <CompleteLesson id={`${module.slug}/${lesson.slug}`}/>
    </div></header>

    <section className="section"><div className="container prose">
      <div className="glass card"><div className="card-top"><span>KALAU LESSON INI BERES</span><span>{lessonIndex+1}/{module.lessons.length}</span></div><ul className="list">{lesson.objectives.map(item=><li key={item}>{item}</li>)}</ul></div>

      <h2>Yang perlu kamu tangkap</h2>
      <div className="grid grid-2">{lesson.concepts.map((concept,index)=><div className="glass card" key={concept}><div className="card-top"><span>0{index+1}</span><span className="dot"/></div><p style={{color:"#e5edf8",fontSize:15,margin:0}}>{concept}</p></div>)}</div>

      <h2>Oke, sekarang kita bongkar</h2>
      {lesson.content.map(paragraph=><p key={paragraph}>{paragraph}</p>)}

      {lesson.examples.length>0&&<><h2>Contoh biar kebayang</h2>{lesson.examples.map(example=><div className="callout" style={{marginBottom:12}} key={example}>{example}</div>)}</>}

      {lesson.exercises.length>0&&<><h2>Coba praktik</h2><div className="glass card"><ul className="list">{lesson.exercises.map(item=><li key={item}>{item.replace(/^\d+\.\s*/,"")}</li>)}</ul></div></>}

      {lesson.prompts.length>0&&<><h2>Prompt yang bisa kamu coba</h2>{lesson.prompts.map(prompt=><div key={prompt} style={{marginBottom:16}}><div className="copybox">{prompt}</div><div style={{marginTop:10}}><CopyTextButton text={prompt} label="Salin prompt"/></div></div>)}</>}

      {lesson.quiz.length>0&&<><h2>Beneran paham, atau cuma terasa familiar?</h2><p>Jawab pakai bahasamu sendiri. Kalau masih muter-muter, bagian atasnya perlu dibaca sekali lagi.</p><div className="glass card"><ol className="steps">{lesson.quiz.map((question,index)=><li key={question}><span>{index+1}</span><p>{question}</p></li>)}</ol></div></>}

      {lesson.assignments.length>0&&<><h2>Bikin sesuatu dari lesson ini</h2>{lesson.assignments.map(item=><div className="callout" key={item}>{item}</div>)}</>}

      <div style={{display:"flex",justifyContent:"space-between",gap:12,alignItems:"center",marginTop:54,flexWrap:"wrap"}}><CompleteLesson id={`${module.slug}/${lesson.slug}`}/><Link className="btn btn-primary" href={nextHref}>{nextLabel}<ArrowRight size={15}/></Link></div>
    </div></section>
  </>;
}
