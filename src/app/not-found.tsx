import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="page-hero" style={{ minHeight: "70svh" }}>
      <div className="page-hero-glow" aria-hidden />
      <div className="container">
        <span className="eyebrow"><span className="dot" />404</span>
        <h1>Halaman tidak ditemukan.</h1>
        <p>Mungkin link-nya berubah, mungkin juga typo. Coba mulai dari homepage atau course.</p>
        <div style={{ display: "flex", gap: 10, marginTop: 22, flexWrap: "wrap" }}>
          <Link href="/" className="btn btn-primary">Ke homepage <ArrowRight className="arrow-icon" size={14} /></Link>
          <Link href="/course" className="btn">Buka course</Link>
        </div>
      </div>
    </section>
  );
}
