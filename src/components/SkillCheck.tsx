"use client";
import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { toPng } from "html-to-image";
import { Download, Share2, RotateCcw, ArrowRight } from "lucide-react";
import { skillQuestions } from "@/data/library";

const LEVELS = [
  { min: 0, max: 6, name: "Beginner", focus: "Level 0–1", module: "AI Fundamentals", project: "Personal Prompt Library", emoji: "🌱" },
  { min: 7, max: 13, name: "AI Operator", focus: "Level 2–3", module: "Prompting That Actually Works", project: "Weekly Work Copilot", emoji: "⚙️" },
  { min: 14, max: 19, name: "Workflow Builder", focus: "Level 4", module: "Research & Content Workflow", project: "AI Content Creation System", emoji: "🔧" },
  { min: 20, max: 25, name: "Automation Builder", focus: "Level 5–6", module: "API, Webhook & Data Flow", project: "AI Lead Management", emoji: "🤖" },
  { min: 26, max: 30, name: "Agentic Builder", focus: "Level 7–9", module: "AI Agents & Orchestration", project: "Research Agent Terukur", emoji: "🧠" },
];

function getLevel(score: number) {
  return LEVELS.find(l => score >= l.min && score <= l.max) || LEVELS[0];
}

function ResultCard({ score, level }: { score: number; level: ReturnType<typeof getLevel> }) {
  const maxScore = skillQuestions.length * 3;
  const pct = Math.round((score / maxScore) * 100);

  return (
    <div id="skill-result-card" style={{
      width: 540, padding: "40px 36px 32px", borderRadius: 20,
      background: "linear-gradient(135deg, #0a0e1a 0%, #111827 50%, #0f172a 100%)",
      border: "1px solid rgba(117,170,255,0.15)", position: "relative", overflow: "hidden",
      fontFamily: "'Inter', -apple-system, sans-serif", color: "#e2e8f0",
    }}>
      {/* Glow accent */}
      <div style={{
        position: "absolute", top: -60, right: -60, width: 200, height: 200,
        background: "radial-gradient(circle, rgba(117,170,255,0.15) 0%, transparent 70%)",
        borderRadius: "50%",
      }} />

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: "linear-gradient(135deg, #75aaff, #3b82f6)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 18, fontWeight: 700, color: "#fff",
        }}>AI</div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#75aaff", letterSpacing: "0.05em" }}>AI LEARNING OS</div>
          <div style={{ fontSize: 11, color: "#64748b" }}>Skill Assessment Result</div>
        </div>
      </div>

      {/* Level */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 13, color: "#64748b", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.1em" }}>Level Kamu</div>
        <div style={{ fontSize: 38, fontWeight: 800, color: "#fff", lineHeight: 1.1 }}>
          {level.emoji} {level.name}
        </div>
      </div>

      {/* Score bar */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontSize: 13, color: "#94a3b8" }}>Skor</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#75aaff" }}>{score}/{maxScore} ({pct}%)</span>
        </div>
        <div style={{ height: 8, borderRadius: 4, background: "#1e293b", overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${pct}%`, borderRadius: 4, background: "linear-gradient(90deg, #3b82f6, #75aaff)" }} />
        </div>
      </div>

      {/* Info grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 28 }}>
        <div style={{ padding: "12px 14px", borderRadius: 10, background: "rgba(117,170,255,0.06)", border: "1px solid rgba(117,170,255,0.1)" }}>
          <div style={{ fontSize: 11, color: "#64748b", marginBottom: 4 }}>Fokus</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0" }}>{level.focus}</div>
        </div>
        <div style={{ padding: "12px 14px", borderRadius: 10, background: "rgba(117,170,255,0.06)", border: "1px solid rgba(117,170,255,0.1)" }}>
          <div style={{ fontSize: 11, color: "#64748b", marginBottom: 4 }}>Module</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0" }}>{level.module}</div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 16, borderTop: "1px solid rgba(117,170,255,0.1)" }}>
        <span style={{ fontSize: 12, color: "#475569" }}>ai-learning-os.vercel.app</span>
        <span style={{ fontSize: 12, color: "#475569" }}>tes level AI kamu juga →</span>
      </div>
    </div>
  );
}

export function SkillCheck() {
  const [idx, setIdx] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [downloading, setDownloading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const done = idx === skillQuestions.length;
  const score = scores.reduce((a, b) => a + b, 0);
  const level = getLevel(score);

  const handleDownload = useCallback(async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        quality: 1, pixelRatio: 2, backgroundColor: "#0a0e1a",
      });
      const link = document.createElement("a");
      link.download = `ai-level-${level.name.toLowerCase().replace(/\s/g, "-")}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Download failed:", err);
    }
    setDownloading(false);
  }, [level.name]);

  const handleShare = useCallback(async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        quality: 1, pixelRatio: 2, backgroundColor: "#0a0e1a",
      });
      // Try native share
      if (navigator.share) {
        const res = await fetch(dataUrl);
        const blob = await res.blob();
        const file = new File([blob], `ai-level.png`, { type: "image/png" });
        await navigator.share({ title: `Aku ${level.name} di AI Learning OS!`, text: `Skor aku: ${score}/${skillQuestions.length * 3}. Tes level AI kamu juga!`, files: [file] });
      } else {
        // Fallback: copy image to clipboard
        const res = await fetch(dataUrl);
        const blob = await res.blob();
        await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
        alert("Gambar sudah di-copy! Tempel di X atau DM.");
      }
    } catch (err) {
      console.error("Share failed:", err);
    }
    setDownloading(false);
  }, [level.name, score]);

  const handleTweet = useCallback(() => {
    const text = encodeURIComponent(`Aku ${level.name} di AI Learning OS! 🧠\n\nSkor: ${score}/${skillQuestions.length * 3}\n\nTes level AI kamu juga:`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent("https://ai-learning-os.vercel.app/skill-check")}`, "_blank");
  }, [level.name, score]);

  if (done) {
    return (
      <div className="glass card" style={{ padding: 36 }}>
        <span className="eyebrow"><span className="dot" />Posisimu sekarang</span>
        <div className="metric blue" style={{ marginTop: 24 }}>{level.emoji} {level.name}</div>
        <p>{level.focus}. Modul yang paling masuk akal buat dimulai: <strong style={{ color: "white" }}>{level.module}</strong>.</p>
        <ul className="list">
          <li>Skor: {score} dari {skillQuestions.length * 3}</li>
          <li>Project pertama: {level.project}</li>
          <li>Balik lagi setelah 2–3 project. Harusnya hasilnya beda.</li>
        </ul>

        {/* Shareable Card */}
        <div style={{ margin: "28px 0", display: "flex", justifyContent: "center" }}>
          <div ref={cardRef}>
            <ResultCard score={score} level={level} />
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", gap: 10, marginTop: 20, flexWrap: "wrap" }}>
          <button className="btn btn-primary" onClick={handleDownload} disabled={downloading}>
            <Download size={15} /> {downloading ? "Memproses..." : "Download Card"}
          </button>
          <button className="btn" onClick={handleShare} disabled={downloading}>
            <Share2 size={15} /> Copy Image
          </button>
          <button className="btn" onClick={handleTweet}>
            Share ke X <ArrowRight size={14} />
          </button>
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap" }}>
          <Link href="/roadmap" className="btn btn-primary">Buka Roadmap</Link>
          <button className="btn" onClick={() => { setIdx(0); setScores([]); }}>
            <RotateCcw size={14} /> Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  const q = skillQuestions[idx];
  return (
    <div className="glass card" style={{ padding: 36 }}>
      <div className="progress"><span style={{ width: `${idx / skillQuestions.length * 100}%` }} /></div>
      <div className="card-top" style={{ marginTop: 24 }}>
        <span>Pertanyaan {idx + 1}/{skillQuestions.length}</span>
        <span>Jawab apa adanya</span>
      </div>
      <h2 style={{ fontSize: 32, margin: "24px 0" }}>{q.question}</h2>
      {q.options.map(o => (
        <button className="quiz-option" key={o.label} onClick={() => { setScores([...scores, o.score]); setIdx(idx + 1); }}>
          {o.label}
        </button>
      ))}
    </div>
  );
}
