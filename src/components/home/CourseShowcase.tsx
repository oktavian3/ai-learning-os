"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { MeshVisual } from "@/components/visuals";

export type ModuleSummary = {
  number: number; slug: string; title: string; description: string;
  difficulty: string; duration: string; lessonCount: number; project: string;
};

export function CourseShowcase({ modules }: { modules: ModuleSummary[] }) {
  const [active, setActive] = useState(0);
  const current = modules[active];
  return (
    <div className="showcase-grid">
      <div className="showcase-list" role="tablist" aria-label="Pilih modul">
        {modules.map((module, index) => (
          <button
            key={module.slug}
            role="tab"
            aria-selected={index === active}
            className={`showcase-item ${index === active ? "active" : ""}`}
            onClick={() => setActive(index)}
            onMouseEnter={() => setActive(index)}
          >
            <span className="sc-no">{String(module.number).padStart(2, "0")}</span>
            <span className="sc-title">{module.title}</span>
            <span className="sc-meta">{module.lessonCount} lesson · {module.duration}</span>
          </button>
        ))}
      </div>
      <div className="showcase-panel">
        <div className="showcase-view showcase-fade" key={current.slug}>
          <div className="showcase-view-head">
            <MeshVisual className="eco-visual" />
            <span className="eyebrow" style={{ position: "relative", zIndex: 1 }}><span className="dot" />Modul {String(current.number).padStart(2, "0")} · {current.difficulty}</span>
            <h3 style={{ position: "relative", zIndex: 1 }}>{current.title}</h3>
            <p style={{ position: "relative", zIndex: 1 }}>{current.description}</p>
          </div>
          <div className="showcase-view-body">
            <div className="showcase-facts">
              <span className="pill">{current.lessonCount} lesson</span>
              <span className="pill">{current.duration}</span>
              <span className="pill">Project: {current.project}</span>
            </div>
            <Link href={`/course/${current.slug}`} className="btn btn-sm btn-primary">Buka modul <ArrowRight className="arrow-icon" size={14} /></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
