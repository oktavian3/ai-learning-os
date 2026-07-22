"use client";
import { CSSProperties, ElementType, ReactNode, useCallback, useEffect, useRef, useState } from "react";

/*
  Nurai motion primitives. No animation library: IntersectionObserver reveals,
  rAF parallax, CSS marquees. All primitives respect prefers-reduced-motion
  (the CSS side neutralizes transforms/animations; JS side skips rAF work).
*/

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function useInView<T extends HTMLElement>(margin = "0px 0px -12% 0px", once = true) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) { setInView(true); return; }
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) setInView(false);
      });
    }, { rootMargin: margin, threshold: 0.06 });
    io.observe(el);
    return () => io.disconnect();
  }, [margin, once]);
  return { ref, inView };
}

type RevealVariant = "fade-up" | "fade" | "scale" | "blur" | "left" | "right";

export function Reveal({ children, variant = "fade-up", delay = 0, as: Tag = "div", className = "", style }: {
  children: ReactNode; variant?: RevealVariant; delay?: number; as?: ElementType; className?: string; style?: CSSProperties;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <Tag
      ref={ref}
      data-rv={variant}
      className={`${className} ${inView ? "rv-in" : ""}`.trim()}
      style={{ ...style, "--rv-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

/* Line-by-line masked reveal for display headlines. Pass explicit lines so
   Indonesian line breaks stay natural instead of depending on viewport wrap. */
export function RevealLines({ lines, as: Tag = "h1", className = "", delay = 0 }: {
  lines: ReactNode[]; as?: ElementType; className?: string; delay?: number;
}) {
  const { ref, inView } = useInView<HTMLElement>();
  return (
    <Tag ref={ref} className={`rv-lines ${className} ${inView ? "rv-in" : ""}`.trim()} style={{ "--rv-delay": `${delay}ms` } as CSSProperties}>
      {lines.map((line, index) => (
        <span className="rv-line" key={index} style={{ "--line": index } as CSSProperties}>
          <span>{line}</span>
        </span>
      ))}
    </Tag>
  );
}

/* Applies incremental --rv-delay to direct [data-rv] descendants. */
export function Stagger({ children, step = 80, className = "", from = 0 }: {
  children: ReactNode; step?: number; className?: string; from?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    Array.from(el.querySelectorAll<HTMLElement>("[data-rv]")).forEach((node, index) => {
      node.style.setProperty("--rv-delay", `${from + index * step}ms`);
    });
  }, [step, from, children]);
  return <div ref={ref} className={className}>{children}</div>;
}

/* Scroll-linked parallax. speed: positive drifts slower than scroll (background),
   negative drifts against it. Pauses off-screen, disabled for reduced motion. */
export function Parallax({ children, speed = 0.15, className = "", style }: {
  children: ReactNode; speed?: number; className?: string; style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    let raf = 0;
    let active = false;
    const update = () => {
      raf = 0;
      if (!active) return;
      const rect = el.getBoundingClientRect();
      const mid = rect.top + rect.height / 2 - window.innerHeight / 2;
      el.style.transform = `translate3d(0, ${(-mid * speed).toFixed(1)}px, 0)`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    const io = new IntersectionObserver(([entry]) => {
      active = entry.isIntersecting;
      if (active) onScroll();
    }, { rootMargin: "120px" });
    io.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => { io.disconnect(); window.removeEventListener("scroll", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, [speed]);
  return <div ref={ref} className={`parallax-el ${className}`.trim()} style={style}>{children}</div>;
}

/* Seamless marquee: content rendered twice, CSS keyframe translates one full
   copy. Pauses when off-screen and on hover (CSS). Reduced motion: static,
   horizontally scrollable (CSS). */
export function Marquee({ children, duration = 42, direction = "ltr", className = "" }: {
  children: ReactNode; duration?: number; direction?: "ltr" | "rtl"; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setPaused(!entry.isIntersecting), { rootMargin: "60px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`marquee ${paused ? "mq-paused" : ""} ${className}`.trim()} data-dir={direction} style={{ "--mq-dur": `${duration}s` } as CSSProperties}>
      <div className="marquee-track" aria-hidden={false}>{children}</div>
      <div className="marquee-track" aria-hidden>{children}</div>
    </div>
  );
}

/* Pointer-follow glow: feeds --mx/--my to .glow-card children. */
export function PointerGlowArea({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = useCallback((event: React.PointerEvent) => {
    if (prefersReducedMotion()) return;
    const target = (event.target as HTMLElement).closest<HTMLElement>(".glow-card");
    if (!target || !ref.current?.contains(target)) return;
    const rect = target.getBoundingClientRect();
    target.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    target.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }, []);
  return <div ref={ref} className={className} onPointerMove={onMove}>{children}</div>;
}

/* Reading progress bar for long-form lesson pages. */
export function ScrollProgress() {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      el.style.width = `${max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0}%`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => { window.removeEventListener("scroll", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);
  return <div className="lesson-scroll-progress" aria-hidden><span ref={ref} /></div>;
}
