"use client";
import { useMemo,useState } from "react";
import { Copy,Check,ArrowUpRight } from "lucide-react";
import { DirectoryItem } from "@/data/types";
import { resourceSlug } from "@/data/resources";
import Link from "next/link";

export function ResourceExplorer({items,copyable=false,basePath}:{items:DirectoryItem[],copyable?:boolean,basePath:string}){
 const [query,setQuery]=useState(""); const [cat,setCat]=useState("Semua"); const [copied,setCopied]=useState<string|null>(null);
 const cats=["Semua",...Array.from(new Set(items.map(i=>i.category)))];
 const visible=useMemo(()=>items.filter(i=>{const sectionText=i.sections?.map(section=>`${section.title} ${Array.isArray(section.content)?section.content.join(" "):section.content}`).join(" ")||"";return (cat==="Semua"||i.category===cat)&&(`${i.title} ${i.category} ${i.description} ${i.details.join(" ")} ${sectionText}`.toLowerCase().includes(query.toLowerCase()))}),[items,query,cat]);
 const copy=async(item:DirectoryItem)=>{await navigator.clipboard.writeText(item.action||item.description);setCopied(item.title);setTimeout(()=>setCopied(null),1600)};
 return <><div className="toolbar"><input className="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Cari yang lagi kamu butuhin…"/><div className="filters">{cats.map(c=><button key={c} onClick={()=>setCat(c)} className={`filter ${cat===c?"active":""}`}>{c}</button>)}</div></div><div className="grid grid-3">{visible.map(item=><article key={item.title} className="glass card"><div className="card-top"><span>{item.category}</span><span className="pill">{item.tag}</span></div><h3>{item.title}</h3><p>{item.description}</p><ul className="list">{item.details.map(d=><li key={d}>{d}</li>)}</ul><div style={{display:"flex",gap:8,marginTop:18,flexWrap:"wrap"}}>{copyable&&<button className="btn btn-sm" onClick={()=>copy(item)}>{copied===item.title?<><Check size={14}/>Sudah dicopy</>:<><Copy size={14}/>Copy prompt</>}</button>}<Link className="btn btn-sm" href={`${basePath}/${resourceSlug(item)}`}>Lihat detail <ArrowUpRight size={13}/></Link></div></article>)}</div>{visible.length===0&&<div className="glass card muted">Gak ketemu. Coba kata kunci yang lebih pendek.</div>}</>
}
