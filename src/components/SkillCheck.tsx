"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { toBlob } from "html-to-image";
import { ArrowLeft, Copy, Download, RotateCcw, Share2 } from "lucide-react";
import { skillQuestions } from "@/data/library";

const LEVELS = [
  { min: 0, max: 6, name: "Beginner", focus: "Level 0-1", module: "Dasar AI", moduleHref: "/course/ai-fundamentals", project: "Prompt Library Pribadi", projectHref: "/projects/prompt-library-pribadi", roadmapHref: "/roadmap", image: "/images/publicimagescard-tier-1.png" },
  { min: 7, max: 13, name: "AI Operator", focus: "Level 2-3", module: "Prompting", moduleHref: "/course/prompting", project: "Study Assistant", projectHref: "/projects/study-assistant", roadmapHref: "/roadmap", image: "/images/publicimagescard-tier-2.png" },
  { min: 14, max: 19, name: "Workflow Builder", focus: "Level 4", module: "Riset, Content, dan Marketing", moduleHref: "/course/research-content", project: "Content Calendar 30 Hari", projectHref: "/projects/content-calendar-30-hari", roadmapHref: "/roadmap", image: "/images/publicimagescard-tier-3.png" },
  { min: 20, max: 25, name: "Automation Builder", focus: "Level 5-6", module: "API & Webhook buat Non-Developer", moduleHref: "/course/api-webhook", project: "AI Automation for Leads", projectHref: "/projects/ai-automation-for-leads", roadmapHref: "/roadmap", image: "/images/publicimagescard-tier-4.png" },
  { min: 26, max: 30, name: "Agentic Builder", focus: "Level 7-9", module: "AI Agent & Tool Calling", moduleHref: "/course/ai-agents", project: "AI Agent Researcher", projectHref: "/projects/ai-agent-researcher", roadmapHref: "/roadmap", image: "/images/publicimagescard-tier-5.png" },
];

const configuredSiteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "");

function getLevel(score: number) {
  return LEVELS.find(level => score >= level.min && score <= level.max) || LEVELS[0];
}

function sanitizeXUsername(value: string) {
  return value
    .trim()
    .replace(/^https?:\/\/(?:www\.)?(?:x|twitter)\.com\//i, "")
    .split(/[/?#]/)[0]
    .replace(/^@+/, "")
    .replace(/[^a-zA-Z0-9_]/g, "")
    .slice(0, 15);
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

async function copyTextToClipboard(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

function openXComposer(tweetText: string) {
  const link = document.createElement("a");
  link.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function ResultCard({ level, username, score, maxScore }: { level: ReturnType<typeof getLevel>; username: string; score: number; maxScore: number }) {
  const [avatarFailed, setAvatarFailed] = useState(false);
  const cleanUsername = sanitizeXUsername(username);
  const avatarUrl = cleanUsername ? `/api/avatar/${encodeURIComponent(cleanUsername)}` : "";

  useEffect(() => setAvatarFailed(false), [cleanUsername]);

  return (
    <div id="skill-result-card" className="skill-result-card">
      <img src={level.image} alt={level.name} className="skill-result-art" />
      <div className="skill-result-brand">
        <span className="skill-result-logo"><img src="/images/nurai-logo.png" alt="" /></span>
        <span>Nurai</span>
      </div>
      <div className="skill-result-user">
        <span className="skill-result-avatar">
          {avatarUrl && !avatarFailed ? <img src={avatarUrl} alt="" crossOrigin="anonymous" onError={() => setAvatarFailed(true)} /> : <span>{cleanUsername ? cleanUsername.charAt(0).toUpperCase() : "@"}</span>}
        </span>
        <span>@{cleanUsername || "username"}</span>
      </div>
      <div className="skill-result-footer">
        <span><strong>{score}/{maxScore}</strong> skor aktual</span>
        <span>{level.module}</span>
        <span>nurailabs.xyz</span>
      </div>
    </div>
  );
}

export function SkillCheck() {
  const [idx, setIdx] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [usernameDraft, setUsernameDraft] = useState("");
  const [username, setUsername] = useState("");
  const [usernameSet, setUsernameSet] = useState(false);
  const [busy, setBusy] = useState(false);
  const [cardBlob, setCardBlob] = useState<Blob | null>(null);
  const [shareMessage, setShareMessage] = useState("");
  const cardRef = useRef<HTMLDivElement>(null);

  const done = idx === skillQuestions.length;
  const score = scores.reduce((total, value) => total + value, 0);
  const maxScore = skillQuestions.length * 3;
  const level = getLevel(score);
  const filename = `nurai-ai-level-${slugify(level.name)}.png`;
  const skillCheckUrl = typeof window === "undefined" ? `${configuredSiteUrl}/skill-check` : `${configuredSiteUrl || window.location.origin}/skill-check`;
  const tweetLead = `Level AI: ${level.name} \u26A1\n\nSkor: ${score}/${maxScore}`;
  const tweetText = `${tweetLead}\n\nCek level AI kamu di:\n${skillCheckUrl}\n\n#Nurai #AISkillCheck`;

  const commitUsername = () => {
    const clean = sanitizeXUsername(usernameDraft);
    setUsernameDraft(clean);
    setUsername(clean);
    setUsernameSet(Boolean(clean));
  };

  const renderCard = useCallback(async () => {
    if (!cardRef.current) return null;
    const images = Array.from(cardRef.current.querySelectorAll("img"));
    await Promise.all(images.map(image => image.complete ? Promise.resolve() : new Promise<void>(resolve => {
      image.addEventListener("load", () => resolve(), { once: true });
      image.addEventListener("error", () => resolve(), { once: true });
    })));
    return toBlob(cardRef.current, { quality: 1, pixelRatio: 3, backgroundColor: "#080c18", cacheBust: true });
  }, []);

  useEffect(() => {
    if (!done) return;
    let cancelled = false;
    setCardBlob(null);
    setShareMessage("Menyiapkan gambar...");
    const prepare = async () => {
      const blob = await renderCard();
      if (!cancelled) {
        setCardBlob(blob);
        setShareMessage(blob ? "" : "Browser ini belum mendukung share gambar");
      }
    };
    const frame = requestAnimationFrame(prepare);
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, [done, username, score, renderCard]);

  const getPreparedBlob = useCallback(async () => cardBlob || renderCard(), [cardBlob, renderCard]);

  const downloadBlob = useCallback((blob: Blob) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = filename;
    link.href = url;
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }, [filename]);

  const copyTweet = useCallback(async () => {
    await copyTextToClipboard(tweetText);
    setShareMessage("Teks tersalin ke clipboard");
  }, [tweetText]);

  const handleDownload = useCallback(async () => {
    if (busy) return;
    setBusy(true);
    setShareMessage(cardBlob ? "" : "Menyiapkan gambar...");
    try {
      const blob = await getPreparedBlob();
      if (!blob) throw new Error("image unavailable");
      setCardBlob(blob);
      downloadBlob(blob);
      setShareMessage("Gambar berhasil didownload");
    } catch {
      setShareMessage("Browser ini belum mendukung share gambar");
    } finally {
      setBusy(false);
    }
  }, [busy, cardBlob, getPreparedBlob, downloadBlob]);

  const handleShare = useCallback(async () => {
    if (busy) return;
    setBusy(true);
    setShareMessage(cardBlob ? "Membuka opsi share..." : "Menyiapkan gambar...");
    try {
      const blob = await getPreparedBlob();
      if (!blob) throw new Error("image unavailable");
      setCardBlob(blob);

      let nativeShareData: ShareData | null = null;
      try {
        const imageFile = new File([blob], filename, { type: "image/png" });
        const candidate: ShareData = { files: [imageFile], text: `${tweetLead}\n\n#Nurai #AISkillCheck`, url: skillCheckUrl };
        if (navigator.canShare({ files: [imageFile] })) nativeShareData = candidate;
      } catch {
        nativeShareData = null;
      }

      if (nativeShareData) {
        try {
          setShareMessage("Membuka opsi share...");
          await navigator.share(nativeShareData);
          setShareMessage("");
          return;
        } catch (error) {
          if (error instanceof DOMException && error.name === "AbortError") {
            setShareMessage("Share dibatalkan");
            return;
          }
        }
      }

      try {
        downloadBlob(blob);
      } catch {
        // Continue so clipboard and X intent remain available.
      }
      try {
        await copyTextToClipboard(tweetText);
      } catch {
        // Continue so the downloaded image and X intent remain available.
      }
      setShareMessage("Gambar sudah didownload dan teks sudah dicopy. Upload gambarnya ke tweet.");
      try {
        openXComposer(tweetText);
      } catch {
        // Download and clipboard fallback remain complete when a browser blocks popups.
      }
    } catch (error) {
      setShareMessage(error instanceof DOMException && error.name === "AbortError" ? "Share dibatalkan" : "Browser ini belum mendukung share gambar");
    } finally {
      setBusy(false);
    }
  }, [busy, cardBlob, downloadBlob, filename, getPreparedBlob, skillCheckUrl, tweetLead, tweetText]);

  const reset = () => {
    setIdx(0);
    setScores([]);
    setUsernameDraft("");
    setUsername("");
    setUsernameSet(false);
    setCardBlob(null);
    setShareMessage("");
  };

  if (done) {
    return (
      <div className="glass card skill-check-shell">
        <span className="eyebrow"><span className="dot" />Posisimu sekarang</span>
        <div className="metric blue" style={{ marginTop: 24 }}>{level.name}</div>
        <p>{level.focus}. Modul yang paling masuk akal buat dimulai: <strong style={{ color: "white" }}>{level.module}</strong>.</p>
        <ul className="list"><li>Skor: {score} dari {maxScore}</li><li>Project pertama: {level.project}</li><li>Balik lagi setelah 2 sampai 3 project. Harusnya hasilnya beda.</li></ul>
        <div className="skill-card-stage"><div ref={cardRef} className="skill-card-render"><ResultCard level={level} username={username} score={score} maxScore={maxScore} /></div></div>
        {!usernameSet && <div style={{ marginBottom: 20 }}><label style={{ fontSize: 13, color: "#94a3b8", display: "block", marginBottom: 6 }}>Isi X username untuk personalisasi kartu (opsional):</label><div className="skill-username-row"><div className="skill-username-field"><span>@</span><input type="text" aria-label="X username" placeholder="username" value={usernameDraft} onChange={(event) => setUsernameDraft(event.target.value)} onKeyDown={(event) => event.key === "Enter" && commitUsername()} /></div><button className="btn" onClick={commitUsername}>Simpan</button></div></div>}
        <div className="skill-share-actions"><button className="btn btn-primary" onClick={handleShare} disabled={busy || !cardBlob}><Share2 size={15} /> {busy ? "Menyiapkan..." : "Share ke X"}</button><button className="btn" onClick={handleDownload} disabled={busy || !cardBlob}><Download size={15} /> Download kartu</button><button className="btn" onClick={copyTweet} disabled={busy}><Copy size={15} /> Salin teks tweet</button></div>
        {shareMessage && <p className="muted skill-share-message" role="status">{shareMessage}</p>}
        <div className="skill-next-actions"><Link href={level.moduleHref} className="btn btn-primary">Buka modul rekomendasi</Link><Link href={level.projectHref} className="btn">Buka project pertama</Link><Link href={level.roadmapHref} className="btn">Lihat roadmap level ini</Link><button className="btn" onClick={reset}><RotateCcw size={14} /> Coba Lagi</button></div>
      </div>
    );
  }

  const question = skillQuestions[idx];
  return (
    <div className="glass card skill-check-shell">
      {idx === 0 && !usernameSet && <div className="skill-username-prompt"><div>Isi X username untuk kartu hasil personal (opsional)</div><div className="skill-username-row"><div className="skill-username-field"><span>@</span><input type="text" aria-label="X username" placeholder="username" value={usernameDraft} onChange={(event) => setUsernameDraft(event.target.value)} onKeyDown={(event) => event.key === "Enter" && commitUsername()} /></div><button className="btn" onClick={commitUsername}>Simpan</button></div></div>}
      <div className="progress"><span style={{ width: `${idx / skillQuestions.length * 100}%` }} /></div>
      <div className="skill-question" key={idx}>
        <div className="card-top" style={{ marginTop: 24 }}><span>Pertanyaan {idx + 1} dari {skillQuestions.length}</span><span>Jawab apa adanya</span></div>
        <h2 style={{ fontSize: "clamp(24px,3.4vw,32px)", margin: "24px 0", letterSpacing: "-0.03em" }}>{question.question}</h2>
        {question.options.map(option => <button className="quiz-option" key={option.label} onClick={() => { setScores([...scores, option.score]); setIdx(idx + 1); }}>{option.label}</button>)}
      </div>
      <div className="skill-check-nav">
        {idx > 0
          ? <button className="btn btn-sm" onClick={() => { setScores(scores.slice(0, -1)); setIdx(idx - 1); }}><ArrowLeft size={14} /> Kembali</button>
          : <span />}
        <span className="muted" style={{ fontSize: 12 }}>Pilih salah satu opsi untuk lanjut</span>
      </div>
    </div>
  );
}
