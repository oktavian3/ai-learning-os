"use client";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useState} from "react";
import {ArrowUpRight,BrainCircuit,Menu,X} from "lucide-react";

const desktopLinks=[["Home","/"],["Roadmap","/roadmap"],["Course","/course"],["Tools","/tools"],["Prompts","/prompts"],["Workflows","/workflows"],["Jual Skill","/monetize"],["Kamus","/glossary"]];
const allLinks=[...desktopLinks.slice(0,6),["Use Cases","/use-cases"],["Projects","/projects"],...desktopLinks.slice(6),["Cek Level","/skill-check"]];

export function Navbar(){
  const [open,setOpen]=useState(false);const pathname=usePathname();
  const close=()=>setOpen(false);
  return <><a href="#main-content" className="skip-link">Skip to content</a><nav className="nav"><div className="container nav-inner"><Link className="brand" href="/" onClick={close}><span className="brand-mark"><BrainCircuit size={17}/></span><span>AI Learning OS</span></Link><div className="nav-links">{desktopLinks.map(([label,href])=><Link className={pathname===href?"active":""} key={href} href={href} aria-current={pathname===href?"page":undefined}>{label}</Link>)}</div><Link className="btn btn-primary btn-sm launch-btn" href="/roadmap">Mulai belajar <ArrowUpRight size={14}/></Link><button className="menu-toggle" aria-label={open?"Tutup menu":"Buka menu"} aria-expanded={open} onClick={()=>setOpen(!open)}>{open?<X size={20}/>:<Menu size={20}/>}</button></div>{open&&<div className="mobile-menu"><div className="container mobile-menu-grid">{allLinks.map(([label,href])=><Link className={pathname===href?"active":""} key={href} href={href} onClick={close} aria-current={pathname===href?"page":undefined}>{label}<ArrowUpRight size={14}/></Link>)}</div></div>}</nav></>;
}
