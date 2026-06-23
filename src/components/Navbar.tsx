"use client";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useState} from "react";
import {ArrowUpRight,BrainCircuit,Menu,X} from "lucide-react";

const desktopLinks=[["Home","/"],["Roadmap","/roadmap"],["Course","/course"],["Tools","/tools"],["Prompts","/prompts"],["Workflows","/workflows"]];
const moreLinks=[["Use Cases","/use-cases"],["Projects","/projects"],["Jual Skill","/monetize"],["Kamus","/glossary"]];
const allLinks=[...desktopLinks,...moreLinks];

export function Navbar(){
  const [open,setOpen]=useState(false);const pathname=usePathname();
  const close=()=>setOpen(false);
  return <><a href="#main-content" className="skip-link">Skip to content</a><nav className="nav"><div className="container nav-inner"><Link className="brand" href="/" onClick={close}><span className="brand-mark"><BrainCircuit size={17}/></span><span>AI Learning OS</span></Link><div className="nav-links"><div className="nav-links-main">{desktopLinks.map(([label,href])=><Link className={pathname===href?"active":""} key={href} href={href} aria-current={pathname===href?"page":undefined}>{label}</Link>)}</div><div className="nav-links-more"><button className="nav-more-btn" aria-label="Menu lainnya">Lainnya <ArrowUpRight size={12}/></button><div className="nav-dropdown">{moreLinks.map(([label,href])=><Link className={pathname===href?"active":""} key={href} href={href} onClick={close} aria-current={pathname===href?"page":undefined}>{label}</Link>)}</div></div></div><Link className="btn btn-primary btn-sm launch-btn" href="/roadmap">Mulai belajar <ArrowUpRight size={14}/></Link><button className="menu-toggle" aria-label={open?"Tutup menu":"Buka menu"} aria-expanded={open} onClick={()=>setOpen(!open)}>{open?<X size={20}/>:<Menu size={20}/>}</button></div>{open&&<div className="mobile-menu"><div className="container mobile-menu-grid">{allLinks.map(([label,href])=><Link className={pathname===href?"active":""} key={href} href={href} onClick={close} aria-current={pathname===href?"page":undefined}>{label}<ArrowUpRight size={14}/></Link>)}</div></div>}</nav></>;
}
