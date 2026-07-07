import Link from "next/link";
import {ArrowLeft,ArrowRight} from "lucide-react";
import {DirectoryItem} from "@/data/types";
import {CopyTextButton} from "./LessonTools";

function Section({title,content}:{title:string;content:string|string[]}){
  const normalized=title.toLowerCase();
  const numbered=normalized.includes("step")||normalized.includes("workflow")||normalized.includes("langkah");
  const prompts=normalized.includes("prompt");
  if(Array.isArray(content)){
    if(prompts)return <section><h2>{title}</h2>{content.map((item,index)=><div key={item} style={{marginBottom:18}}><div className="copybox"><span className="blue">Template {index+1}</span><br/><br/>{item}</div><div style={{marginTop:10}}><CopyTextButton text={item} label="Salin template"/></div></div>)}</section>;
    if(numbered)return <section><h2>{title}</h2><div className="glass card"><ol className="steps">{content.map((item,index)=><li key={item}><span>{index+1}</span><p>{item}</p></li>)}</ol></div></section>;
    return <section><h2>{title}</h2><div className="glass card"><ul className="list">{content.map(item=><li key={item}>{item}</li>)}</ul></div></section>;
  }
  return <section><h2>{title}</h2>{prompts?<><div className="copybox">{content}</div><div style={{marginTop:10}}><CopyTextButton text={content} label="Salin template"/></div></>:<div className="callout">{content}</div>}</section>;
}

export function ResourceDetail({item,type,basePath}:{item:DirectoryItem;type:string;basePath:string}){
  return <><header className="page-hero"><div className="container"><Link href={basePath} className="muted" style={{display:"flex",gap:8,alignItems:"center",fontSize:13}}><ArrowLeft size={14}/>Kembali</Link><div className="eyebrow" style={{marginTop:30}}><span className="dot"/>{item.category} · {item.level}</div><h1>{item.title}</h1><p>{item.description}</p></div></header>
  <section className="section"><div className="container detail-layout"><div className="prose">{basePath.includes("workflows")&&<><h2>Alur visual</h2><div className="workflow-visual">{["Input","Proses","Langkah AI","Review manusia","Output","Log"].map((label,index)=><div className="workflow-node" key={label}><span>{String(index+1).padStart(2,"0")}</span><strong>{label}</strong></div>)}</div></>}{item.sections?.map(section=><Section key={section.title} {...section}/>)||<><h2>Yang perlu kamu tau</h2><ul className="list">{item.details.map(detail=><li key={detail}>{detail}</li>)}</ul></>}{item.action&&<Section title="Prompt lengkap" content={item.action}/>}</div>
  <aside><div className="glass card sticky-card"><div className="card-top"><span>{type.toUpperCase()}</span><span className="pill">{item.tag}</span></div><h3>{item.title}</h3><p>{item.description}</p><ul className="list">{item.details.map(detail=><li key={detail}>{detail}</li>)}</ul>{item.officialUrl&&<div style={{marginTop:18,display:"grid",gap:10}}><a className="btn btn-sm" href={item.officialUrl} target="_blank" rel="noopener noreferrer">Website resmi<ArrowRight size={13}/></a>{item.docsUrl&&<a className="btn btn-sm" href={item.docsUrl} target="_blank" rel="noopener noreferrer">Docs<ArrowRight size={13}/></a>}<span className="muted" style={{fontSize:12}}>Terverifikasi: {item.lastVerified}</span></div>}</div></aside></div>
  <div className="container" style={{marginTop:54}}><Link href={basePath} className="btn">Lihat resource lain<ArrowRight size={14}/></Link></div></section></>;
}
