"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

export type LibraryItem = { title: string; category: string; description: string; slug: string; tag: string };
export type LibraryTab = { key: string; label: string; basePath: string; cta: string; total: number; items: LibraryItem[] };

export function LibraryShowcase({ tabs }: { tabs: LibraryTab[] }) {
  const [active, setActive] = useState(0);
  const tab = tabs[active];
  return (
    <div>
      <div className="rail-tabs" role="tablist" aria-label="Jenis resource">
        {tabs.map((entry, index) => (
          <button
            key={entry.key}
            role="tab"
            aria-selected={index === active}
            className={`filter ${index === active ? "active" : ""}`}
            onClick={() => setActive(index)}
          >
            {entry.label} ({entry.total})
          </button>
        ))}
      </div>
      <div className="rail showcase-fade" key={tab.key}>
        {tab.items.slice(0, 8).map(item => (
          <Link key={item.slug} href={`${tab.basePath}/${item.slug}`} className="rail-card">
            <div className="card-top"><span>{item.category}</span><span className="pill">{item.tag}</span></div>
            <h4>{item.title}</h4>
            <p>{item.description}</p>
            <span className="eco-cta" style={{ color: "var(--soft)", display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13 }}>
              {tab.cta} <ArrowUpRight size={13} />
            </span>
          </Link>
        ))}
        <Link href={tab.basePath} className="rail-card" style={{ justifyContent: "center", alignItems: "center", textAlign: "center", gap: 8 }}>
          <span style={{ fontSize: 26, fontWeight: 550, letterSpacing: "-0.03em" }}>Semua {tab.total} {tab.label.toLowerCase()}</span>
          <span className="muted" style={{ fontSize: 13 }}>Lengkap dengan filter kategori dan pencarian</span>
          <span className="btn btn-sm" style={{ marginTop: 6 }}>Buka index <ArrowUpRight size={13} /></span>
        </Link>
      </div>
    </div>
  );
}
