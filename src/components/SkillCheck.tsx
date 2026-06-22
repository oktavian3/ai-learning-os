"use client";
import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { toPng } from "html-to-image";
import { Download, Share2, RotateCcw, ArrowRight } from "lucide-react";
import { skillQuestions } from "@/data/library";

const LEVELS = [
  { min: 0, max: 6, name: "Beginner", focus: "Level 0–1", module: "AI Fundamentals", project: "Personal Prompt Library", emoji: "🌱", image: "/images/publicimagescard-tier-1.png.png" },
  { min: 7, max: 13, name: "AI Operator", focus: "Level 2–3", module: "Prompting That Actually Works", project: "Weekly Work Copilot", emoji: "⚙️", image: "/images/publicimagescard-tier-2.png.png" },
  { min: 14, max: 19, name: "Workflow Builder", focus: "Level 4", module: "Research & Content Workflow", project: "AI Content Creation System", emoji: "🔧", image: "/images/publicimagescard-tier-3.png" },
  { min: 20, max: 25, name: "Automation Builder", focus: "Level 5–6", module: "API, Webhook & Data Flow", project: "AI Lead Management", emoji: "🤖", image: "/images/publicimagescard-tier-4.png" },
  { min: 26, max: 30, name: "Agentic Builder", focus: "Level 7–9", module: "AI Agents & Orchestration", project: "Research Agent Terukur", emoji: "🧠", image: "/images/publicimagescard-tier-5.png" },
];

function getLevel(score: number) {
  return LEVELS.find(l => score >= l.min && score <= l.max) || LEVELS[0];
}

function ResultCard({ score, level, username }: { score: number; level: ReturnType<typeof getLevel>; username: string }) {
  const maxScore = skillQuestions.length * 3;
  const pct = Math.round((score / maxScore) * 100);
  const cleanUsername = username.replace(/^@/, "").trim();
  const avatarUrl = cleanUsername ? `https://unavatar.io/twitter/${cleanUsername}` : "";
  const tierNum = String(LEVELS.indexOf(level) + 1).padStart(2, "0");

  return (
    <div id="skill-result-card" style={{
      width: 540, height: 760, borderRadius: 24,
      position: "relative", overflow: "hidden",
      fontFamily: "'Inter', -apple-system, sans-serif", color: "#e2e8f0",
      background: "#080c18",
    }}>
      {/* Card image background */}
      <img src={level.image} alt={level.name} style={{
        position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
        objectFit: "cover", zIndex: 0,
      }} />

      {/* Dark overlay for text readability */}
      <div style={{
        position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
        background: "linear-gradient(180deg, rgba(8,12,24,0.3) 0%, rgba(8,12,24,0.6) 40%, rgba(8,12,24,0.85) 70%, rgba(8,12,24,0.95) 100%)",
        zIndex: 1,
      }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, padding: "32px 36px", height: "100%", display: "flex", flexDirection: "column" }}>
        {/* Top: Badge + Username */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "6px 12px", borderRadius: 8,
            background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.3)",
            fontSize: 11, fontWeight: 700, color: "#60a5fa", letterSpacing: "0.1em",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#3b82f6" }} />
            AI SKILL CHECK
          </div>
          {cleanUsername && (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{
                width: 32, height: 32, borderRadius: "50%",
                border: "2px solid rgba(59,130,246,0.4)",
                overflow: "hidden", flexShrink: 0,
              }}>
                {avatarUrl && (
                  <img src={avatarUrl} alt={cleanUsername} style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                )}
              </div>
              <span style={{ fontSize: 13, color: "#94a3b8", fontWeight: 500 }}>@{cleanUsername}</span>
            </div>
          )}
        </div>

        {/* Title */}
        <h1 style={{ fontSize: 42, fontWeight: 800, color: "#fff", marginBottom: 16, lineHeight: 1.1 }}>
          {level.name}
        </h1>

        {/* Score + Focus */}
        <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              width: 28, height: 28, borderRadius: 8,
              background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
            </div>
            <div>
              <div style={{ fontSize: 10, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>Skor</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#e2e8f0" }}>{score}/{maxScore}</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              width: 28, height: 28, borderRadius: 8,
              background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></svg>
            </div>
            <div>
              <div style={{ fontSize: 10, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>Fokus</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#e2e8f0" }}>{level.focus}</div>
            </div>
          </div>
        </div>

        {/* Description */}
        <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.6, marginBottom: 20 }}>
          {level.name === "Beginner" && "Baru mulai. Fokus dulu ke dasar dan cara pakai AI yang bener."}
          {level.name === "AI Operator" && "Udah bisa pakai AI buat kerja harian, tinggal dirapihin sistemnya."}
          {level.name === "Workflow Builder" && "Udah naik level. Sekarang bukan cuma prompt, tapi alur kerja."}
          {level.name === "Automation Builder" && "Mulai masuk automation, API, dan sistem yang bisa jalan lebih mandiri."}
          {level.name === "Agentic Builder" && "Udah masuk territory agent, orchestration, dan workflow yang lebih cerdas."}
        </p>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Tier + Form badges */}
        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 24 }}>
          <div style={{
            padding: "6px 14px", borderRadius: 8,
            background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.25)",
            display: "flex", alignItems: "center", gap: 6,
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#60a5fa" }}>TIER</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#fff" }}>{tierNum}</span>
          </div>
          <div style={{
            padding: "6px 14px", borderRadius: 8,
            background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.25)",
            display: "flex", alignItems: "center", gap: 6,
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#22d3ee" }}>{level.name === "Beginner" ? "BASE" : level.name === "AI Operator" ? "EARLY" : level.name === "Workflow Builder" ? "FLOW" : level.name === "Automation Builder" ? "AUTO" : "FINAL"} FORM</span>
          </div>
        </div>

        {/* Modules */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#60a5fa", letterSpacing: "0.1em", marginBottom: 10 }}>MODULE REKOMENDASI</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 10, background: "rgba(15,23,42,0.6)", border: "1px solid rgba(59,130,246,0.15)" }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#60a5fa" }}>01</span>
              <span style={{ fontSize: 13, color: "#e2e8f0" }}>{level.module}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 10, background: "rgba(15,23,42,0.6)", border: "1px solid rgba(59,130,246,0.15)" }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#60a5fa" }}>02</span>
              <span style={{ fontSize: 13, color: "#e2e8f0" }}>{level.project}</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <button style={{
          width: "100%", padding: "14px 24px", borderRadius: 12,
          background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
          border: "none", color: "#fff", fontSize: 14, fontWeight: 700,
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        }}>
          {level.name === "Beginner" ? "Mulai dari Dasar" : level.name === "AI Operator" ? "Rapihin Cara Pakai" : level.name === "Workflow Builder" ? "Bangun Workflow" : level.name === "Automation Builder" ? "Masuk ke Automation" : "Naik ke Agent"}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>
  );
}

export function SkillCheck() {
  const [idx, setIdx] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [username, setUsername] = useState("");
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
    const cleanU = username.replace(/^@/, "").trim();
    const userLine = cleanU ? `\n@${cleanU}` : "";
    const text = encodeURIComponent(`Aku ${level.name} di AI Learning OS! 🧠\n\nSkor: ${score}/${skillQuestions.length * 3}${userLine}\n\nTes level AI kamu juga:`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent("https://ai-learning-os.vercel.app/skill-check")}`, "_blank");
  }, [level.name, score, username]);

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
            <ResultCard score={score} level={level} username={username} />
          </div>
        </div>

        {/* Username input */}
        {!username && (
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 13, color: "#94a3b8", display: "block", marginBottom: 6 }}>
              Masukkan X username lo buat personalisasi card:
            </label>
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{ flex: 1, position: "relative" }}>
                <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#64748b", fontSize: 14 }}>@</span>
                <input
                  type="text"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && setUsername(username)}
                  style={{
                    width: "100%", paddingLeft: 28, paddingRight: 14, paddingTop: 10, paddingBottom: 10,
                    borderRadius: 10, border: "1px solid rgba(117,170,255,0.2)",
                    background: "rgba(117,170,255,0.05)", color: "#e2e8f0", fontSize: 14,
                    outline: "none",
                  }}
                />
              </div>
              <button className="btn" onClick={() => setUsername(username)} style={{ padding: "10px 16px" }}>
                Set
              </button>
            </div>
          </div>
        )}

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
