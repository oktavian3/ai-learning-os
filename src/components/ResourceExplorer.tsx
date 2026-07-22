"use client";
import { CSSProperties, useMemo, useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import Link from "next/link";
import { DirectoryItem } from "@/data/types";
import { resourceSlug } from "@/data/resources";
import { PointerGlowArea } from "./motion";

type ExplorerKind = "tools" | "prompts" | "workflows" | "use-cases" | "projects" | "monetize" | "glossary";

function kindOf(basePath: string): ExplorerKind {
  if (basePath.includes("tools")) return "tools";
  if (basePath.includes("prompts")) return "prompts";
  if (basePath.includes("workflows")) return "workflows";
  if (basePath.includes("use-cases")) return "use-cases";
  if (basePath.includes("projects")) return "projects";
  if (basePath.includes("monetize")) return "monetize";
  return "glossary";
}

const detailCta: Record<ExplorerKind, string> = {
  tools: "Buka tool",
  prompts: "Buka prompt",
  workflows: "Buka workflow",
  "use-cases": "Buka use case",
  projects: "Buka project",
  monetize: "Lihat model bisnis",
  glossary: "Baca definisi",
};

const emptyMessage: Record<ExplorerKind, string> = {
  tools: "Belum ada tool yang cocok. Coba kategori atau kata kunci lain.",
  prompts: "Belum ada prompt di kategori ini. Coba kategori lain.",
  workflows: "Belum ada workflow yang cocok. Coba kata kunci lain.",
  "use-cases": "Belum ada use case yang cocok. Coba kategori pekerjaan lain.",
  projects: "Belum ada project yang cocok. Coba level atau kata kunci lain.",
  monetize: "Belum ada model bisnis yang cocok. Coba kata kunci lain.",
  glossary: "Istilah tidak ditemukan. Coba ejaan atau kata kunci lain.",
};

const cardClass: Record<ExplorerKind, string> = {
  tools: "resource-card-tool",
  prompts: "resource-card-prompt",
  workflows: "resource-card-workflow",
  "use-cases": "resource-card-use-case",
  projects: "resource-card-project",
  monetize: "resource-card-module",
  glossary: "resource-card-module",
};

function summaryDetails(item: DirectoryItem, kind: ExplorerKind) {
  if (kind === "use-cases") {
    return item.details.filter(detail => /Masalah|Output|Level|Estimasi|Tools/i.test(detail)).slice(0, 4);
  }
  if (kind === "workflows") {
    return [
      `Kapan dipakai: ${item.trigger || "Saat input baru masuk"}`,
      `Estimasi setup: ${item.estimatedSetup || item.tag}`,
      `Output: ${(item.outputs || []).join(", ") || item.details[2]}`,
    ];
  }
  if (kind === "tools") {
    return [
      `Cocok untuk: ${(item.bestFor || [item.description]).join(", ")}`,
      `Harga: ${item.pricingLabel || item.tag}`,
    ];
  }
  return item.details.slice(0, 4);
}

export function ResourceExplorer({ items, copyable = false, basePath }: { items: DirectoryItem[]; copyable?: boolean; basePath: string }) {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("Semua");
  const [copied, setCopied] = useState<string | null>(null);
  const kind = kindOf(basePath);
  const cats = ["Semua", ...Array.from(new Set(items.map(item => item.category)))];

  const visible = useMemo(() => items.filter(item => {
    const sectionText = item.sections?.map(section => `${section.title} ${Array.isArray(section.content) ? section.content.join(" ") : section.content}`).join(" ") || "";
    return (cat === "Semua" || item.category === cat)
      && `${item.title} ${item.category} ${item.description} ${item.details.join(" ")} ${sectionText}`.toLowerCase().includes(query.toLowerCase());
  }), [items, query, cat]);

  const copy = async (item: DirectoryItem) => {
    await navigator.clipboard.writeText(item.action || item.description);
    setCopied(item.title);
    setTimeout(() => setCopied(null), 1600);
  };

  return (
    <>
      {kind === "use-cases" && (
        <div className="grid grid-4" style={{ marginBottom: 28 }}>
          {cats.filter(category => category !== "Semua").slice(0, 12).map(category => (
            <button
              key={category}
              className={`glass card ${cat === category ? "resource-card-use-case" : ""}`}
              style={{ textAlign: "left", cursor: "pointer" }}
              onClick={() => setCat(cat === category ? "Semua" : category)}
            >
              <div className="card-top"><span>Kategori</span><span className="pill">{items.filter(item => item.category === category).length}</span></div>
              <h3>{category}</h3>
            </button>
          ))}
        </div>
      )}
      <div className="toolbar">
        <input
          className="search"
          value={query}
          onChange={event => setQuery(event.target.value)}
          placeholder="Tulis kata kunci untuk mencari..."
          aria-label="Cari"
        />
        <div className="filters">
          {cats.map(category => (
            <button key={category} onClick={() => setCat(category)} className={`filter ${cat === category ? "active" : ""}`}>{category}</button>
          ))}
        </div>
      </div>
      <PointerGlowArea className="grid grid-3">
        {visible.map((item, index) => (
          <article
            key={item.title}
            className={`glass card glow-card card-enter ${cardClass[kind]}`}
            style={{ "--enter-delay": `${Math.min(index, 8) * 55}ms` } as CSSProperties}
          >
            <div className="card-top"><span>{item.category}</span><span className="pill">{item.tag}</span></div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <ul className="list">{summaryDetails(item, kind).map(detail => <li key={detail}>{detail}</li>)}</ul>
            <div style={{ display: "flex", gap: 8, marginTop: 18, flexWrap: "wrap" }}>
              {copyable && (
                <button className="btn btn-sm" onClick={() => copy(item)}>
                  {copied === item.title ? <><Check size={14} />Tersalin</> : <><Copy size={14} />Salin prompt</>}
                </button>
              )}
              <Link className="btn btn-sm" href={`${basePath}/${resourceSlug(item)}`}>{detailCta[kind]} <ArrowUpRight className="arrow-icon" size={13} /></Link>
            </div>
          </article>
        ))}
      </PointerGlowArea>
      {visible.length === 0 && <div className="glass card muted">{emptyMessage[kind]}</div>}
    </>
  );
}
