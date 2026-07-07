"use client";
import { useEffect,useState } from "react";
import { Check,Copy } from "lucide-react";

export function CopyTextButton({text,label="Salin"}:{text:string,label?:string}){
  const [copied,setCopied]=useState(false);
  const copy=async()=>{await navigator.clipboard.writeText(text);setCopied(true);setTimeout(()=>setCopied(false),1400)};
  return <button className="btn btn-sm" onClick={copy}>{copied?<><Check size={14}/>Tersalin</>:<><Copy size={14}/>{label}</>}</button>;
}

export function CompleteLesson({id}:{id:string}){
  const [done,setDone]=useState(false);
  useEffect(()=>setDone(localStorage.getItem(`lesson:${id}`)==="done"),[id]);
  const toggle=()=>{const next=!done;setDone(next);if(next)localStorage.setItem(`lesson:${id}`,"done");else localStorage.removeItem(`lesson:${id}`)};
  return <button className={`btn ${done?"btn-primary":""}`} onClick={toggle}><Check size={16}/>{done?"Sudah selesai":"Tandai selesai"}</button>;
}
