"use client";
import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useEffect,useRef,useState} from "react";
import {ArrowUpRight,ChevronDown,Menu,X} from "lucide-react";
import nuraiLogo from "@/app/image/nurai logo.png";

const desktopLinks=[["Home","/"],["Roadmap","/roadmap"],["Course","/course"],["Tools","/tools"],["Prompts","/prompts"],["Workflows","/workflows"]];
const moreLinks=[["Use Cases","/use-cases"],["Projects","/projects"],["Monetize","/monetize"],["Kamus","/glossary"],["Cek Level","/skill-check"]];
const allLinks=[...desktopLinks,...moreLinks];

function isActive(pathname:string,href:string){
  return href === "/" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar(){
  const [open,setOpen]=useState(false);
  const [moreOpen,setMoreOpen]=useState(false);
  const pathname=usePathname();
  const menuRef=useRef<HTMLDivElement>(null);
  const close=()=>{setOpen(false);setMoreOpen(false);};
  const moreActive=moreLinks.some(([,href])=>isActive(pathname,href));

  useEffect(()=>{
    const onPointerDown=(event:MouseEvent|TouchEvent)=>{
      if(menuRef.current && !menuRef.current.contains(event.target as Node)) setMoreOpen(false);
    };
    const onKeyDown=(event:KeyboardEvent)=>{
      if(event.key==="Escape") setMoreOpen(false);
    };
    document.addEventListener("mousedown",onPointerDown);
    document.addEventListener("touchstart",onPointerDown);
    document.addEventListener("keydown",onKeyDown);
    return ()=>{
      document.removeEventListener("mousedown",onPointerDown);
      document.removeEventListener("touchstart",onPointerDown);
      document.removeEventListener("keydown",onKeyDown);
    };
  },[]);

  return <><a href="#main-content" className="skip-link">Skip to content</a><nav className="nav"><div className="container nav-inner"><Link className="brand" href="/" onClick={close} aria-label="Nurai home"><span className="brand-logo-frame"><Image className="brand-logo" src={nuraiLogo} alt="" width={38} height={38} priority/></span><span>Nurai</span></Link><div className="nav-links"><div className="nav-links-main">{desktopLinks.map(([label,href])=><Link className={isActive(pathname,href)?"active":""} key={href} href={href} aria-current={isActive(pathname,href)?"page":undefined}>{label}</Link>)}</div><div className="nav-links-more" ref={menuRef}><button className={`nav-more-btn ${moreActive?"active":""}`} aria-haspopup="menu" aria-expanded={moreOpen} aria-controls="more-menu" onClick={()=>setMoreOpen(value=>!value)}>Lainnya <ChevronDown size={13}/></button><div id="more-menu" role="menu" className={`nav-dropdown ${moreOpen?"open":""}`}>{moreLinks.map(([label,href])=><Link role="menuitem" tabIndex={moreOpen?0:-1} className={isActive(pathname,href)?"active":""} key={href} href={href} onClick={close} aria-current={isActive(pathname,href)?"page":undefined}>{label}</Link>)}</div></div></div><Link className="btn btn-primary btn-sm launch-btn" href="/roadmap">Mulai belajar <ArrowUpRight size={14}/></Link><button className="menu-toggle" aria-label={open?"Tutup menu":"Buka menu"} aria-expanded={open} onClick={()=>setOpen(!open)}>{open?<X size={20}/>:<Menu size={20}/>}</button></div>{open&&<div className="mobile-menu"><div className="container mobile-menu-grid">{allLinks.map(([label,href])=><Link className={isActive(pathname,href)?"active":""} key={href} href={href} onClick={close} aria-current={isActive(pathname,href)?"page":undefined}>{label}<ArrowUpRight size={14}/></Link>)}</div></div>}</nav></>;
}
