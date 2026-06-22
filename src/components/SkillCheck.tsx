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
  const cleanUsername = username.replace(/^@/, "").trim();
  const avatarUrl = cleanUsername ? `https://unavatar.io/twitter/${cleanUsername}` : "";

  return (
    <div id="skill-result-card" style={{
      width: 540, position: "relative", overflow: "hidden",
      borderRadius: 20, background: "#080c18",
    }}>
      {/* Card image — your design, as-is */}
      <img src={level.image} alt={level.name} style={{
        width: "100%", display: "block",
      }} />

      {/* Username + Avatar overlay — top right */}
      {cleanUsername && (
        <div style={{
          position: "absolute", top: 20, right: 20,
          display: "flex", alignItems: "center", gap: 8,
          padding: "6px 12px 6px 6px", borderRadius: 20,
          background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)",
          border: "1px solid rgba(59,130,246,0.3)",
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: "50%",
            border: "2px solid rgba(59,130,246,0.5)",
            overflow: "hidden", flexShrink: 0, background: "#1e293b",
          }}>
            {avatarUrl && (
              <img src={avatarUrl} alt={cleanUsername} style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
            )}
          </div>
          <span style={{ fontSize: 13, color: "#e2e8f0", fontWeight: 600 }}>@{cleanUsername}</span>
        </div>
      )}
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
