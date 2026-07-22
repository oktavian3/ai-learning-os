"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CSSProperties, useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import nuraiLogo from "@/app/image/nurai logo.png";

const desktopLinks = [
  ["Belajar", "/course"],
  ["Roadmap", "/roadmap"],
  ["Tools", "/tools"],
  ["Prompt", "/prompts"],
  ["Workflow", "/workflows"],
  ["Project", "/projects"],
  ["Kamus", "/glossary"],
] as const;

const mobileLinks = [
  ...desktopLinks,
  ["Use Cases", "/use-cases"],
  ["Monetize", "/monetize"],
  ["Cek Level", "/skill-check"],
] as const;

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("menu-locked", open);
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKeyDown);
    return () => { document.body.classList.remove("menu-locked"); document.removeEventListener("keydown", onKeyDown); };
  }, [open]);

  return (
    <>
      <a href="#main-content" className="skip-link">Langsung ke konten</a>
      <nav className={`site-nav ${scrolled ? "scrolled" : ""}`} aria-label="Navigasi utama">
        <div className="site-nav-inner">
          <Link className="brand" href="/" aria-label="Nurai home">
            <span className="brand-logo-frame"><Image className="brand-logo" src={nuraiLogo} alt="" width={34} height={34} priority /></span>
            <span>Nurai</span>
          </Link>
          <div className="nav-links">
            {desktopLinks.map(([label, href]) => (
              <Link key={href} href={href} className={isActive(pathname, href) ? "active" : ""} aria-current={isActive(pathname, href) ? "page" : undefined}>
                {label}
              </Link>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <Link className="btn btn-primary btn-sm nav-cta" href="/skill-check">Cek level <ArrowUpRight className="arrow-icon" size={14} /></Link>
            <button className="menu-toggle" aria-label={open ? "Tutup menu" : "Buka menu"} aria-expanded={open} onClick={() => setOpen(value => !value)}>
              {open ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>
      </nav>
      <div className={`mobile-overlay ${open ? "open" : ""}`} aria-hidden={!open}>
        {mobileLinks.map(([label, href], index) => (
          <Link
            key={href}
            href={href}
            tabIndex={open ? 0 : -1}
            className={isActive(pathname, href) ? "active" : ""}
            style={{ "--i": index } as CSSProperties}
            onClick={() => setOpen(false)}
          >
            {label}
            <ArrowUpRight size={20} />
          </Link>
        ))}
      </div>
    </>
  );
}
