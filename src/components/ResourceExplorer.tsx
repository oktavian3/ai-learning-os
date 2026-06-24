"use client";
import { useMemo,useState } from "react";
import { Copy,Check,ArrowUpRight } from "lucide-react";
import { DirectoryItem } from "@/data/types";
import { resourceSlug } from "@/data/resources";
import Link from "next/link";

function cardClass(basePath:string){
 if(basePath.includes("tools"))return "resource-card-tool";
 if(basePath.includes("prompts"))return "resource-card-prompt";
 if(basePath.includes("workflows"))return "resource-card-workflow";
 if(basePath.includes("use-cases"))return "resource-card-use-case";
 if(basePath.includes("projects"))return "resource-card-project";
 return "resource-card-module";
}

function summaryDetails(item:DirectoryItem,basePath:string){
 if(basePath.includes("use-cases")){
  return item.details.filter(detail=>/Masalah|Output|Level|Estimasi|Tools/i.test(detail)).slice(0,5);
 }
 if(basePath.includes("workflows")){
  return [`Trigger: ${item.trigger || "Saat input baru masuk"}`,`Setup: ${item.estimatedSetup || item.tag}`,`Output: ${(item.outputs || []).join(", ") || item.details[2]}`];
 }
 if(basePath.includes("tools")){
  return [`Best for: ${(item.bestFor || [item.description]).join(", ")}`,`Harga: ${item.pricingLabel || item.tag}`,`Verified: ${item.lastVerified || "Belum diset"}`];
 }
 return item.details.slice(0,4);
}

export function ResourceExplorer({items,copyable=false,basePath}:{items:DirectoryItem[],copyable?:boolean,basePath:string}){
 const [query,setQuery]=useState(""); const [cat,setCat]=useState("Semua"); const [copied,setCopied]=useState<string|null>(null);
 const cats=["Semua",...Array.from(new Set(items.map(i=>i.category)))];
 const visible=useMemo(()=>items.filter(i=>{const sectionText=i.sections?.map(section=>`${section.title} ${Array.isArray(section.content)?section.content.join(" "):section.content}`).join(" ")||"";return (cat==="Semua"||i.category===cat)&&(`${i.title} ${i.category} ${i.description} ${i.details.join(" ")} ${sectionText}`.toLowerCase().includes(query.toLowerCase()))}),[items,query,cat]);
 const copy=async(item:DirectoryItem)=>{await navigator.clipboard.writeText(item.action||item.description);setCopied(item.title);setTimeout(()=>setCopied(null),1600)};
 const className=cardClass(basePath);
 return <>{basePath.includes("use-cases")&&<div className="grid grid-4" style={{marginBottom:28}}>{cats.filter(c=>c!=="Semua").slice(0,12).map(category=><button key={category} className={`glass card ${cat===category?"resource-card-use-case":""}`} style={{textAlign:"left",cursor:"pointer"}} onClick={()=>setCat(category)}><div className="card-top"><span>KATEGORI</span><span className="pill">{items.filter(item=>item.category===category).length}</span></div><h3>{category}</h3></button>)}</div>}<div className="toolbar"><input className="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Cari yang sedang kamu butuhkan..."/><div className="filters">{cats.map(c=><button key={c} onClick={()=>setCat(c)} className={`filter ${cat===c?"active":""}`}>{c}</button>)}</div></div><div className="grid grid-3">{visible.map(item=><article key={item.title} className={`glass card ${className}`}><div className="card-top"><span>{item.category}</span><span className="pill">{item.tag}</span></div><h3>{item.title}</h3><p>{item.description}</p><ul className="list">{summaryDetails(item,basePath).map(d=><li key={d}>{d}</li>)}</ul><div style={{display:"flex",gap:8,marginTop:18,flexWrap:"wrap"}}>{copyable&&<button className="btn btn-sm" onClick={()=>copy(item)}>{copied===item.title?<><Check size={14}/>Sudah dicopy</>:<><Copy size={14}/>Copy prompt</>}</button>}<Link className="btn btn-sm" href={`${basePath}/${resourceSlug(item)}`}>Lihat detail <ArrowUpRight size={13}/></Link></div></article>)}</div>{visible.length===0&&<div className="glass card muted">Tidak ditemukan. Coba kata kunci yang lebih pendek.</div>}</>
}
