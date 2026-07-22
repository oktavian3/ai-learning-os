import { CSSProperties } from "react";
import { BookOpen, CheckCheck, Workflow } from "lucide-react";
import { SectionHead } from "@/components/Primitives";
import { Parallax, Reveal, Stagger } from "@/components/motion";

const steps = [
  ["01", "Paham", "Kenali konsepnya sampai bisa dijelaskan ke teman non-teknis."],
  ["02", "Pakai", "Coba di pekerjaan yang memang rutin dilakukan, bukan use case fiksi."],
  ["03", "Rangkai", "Susun prompt, tools, dan review manusia jadi satu alur yang bisa diulang."],
  ["04", "Buktikan", "Bangun project yang bisa dibuka linknya, dites orang lain, dan ditanya detailnya."],
] as const;

function InterfaceMock() {
  return (
    <div className="ui-stage">
      <div className="mock-window">
        <div className="mock-bar"><i /><i /><i /><span>nurai · lesson</span></div>
        <div className="mock-body">
          <span className="mock-chip">Modul 03 · Prompting</span>
          <div className="mock-line hl w60" />
          <div className="mock-line w80" />
          <div className="mock-line w80" style={{ width: "72%" }} />
          <div className="mock-line w40" />
          <div className="mock-prompt">
            TASK: ubah catatan meeting jadi email follow-up.<br />
            FORMAT: maksimal 150 kata, tutup dengan next step.
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <span className="mock-chip">ChatGPT</span>
            <span className="mock-chip">Claude</span>
            <span className="mock-chip">n8n</span>
          </div>
        </div>
      </div>
      <Parallax speed={-0.06} className="mock-float floaty" style={{ top: "-26px", right: "-14px", "--float-dur": "8s" } as CSSProperties}>
        <span className="ic"><Workflow size={15} /></span> Workflow: 6 langkah · 1 review
      </Parallax>
      <Parallax speed={0.07} className="mock-float floaty" style={{ bottom: "-20px", left: "-18px", "--float-delay": "1.2s" } as CSSProperties}>
        <span className="ic"><CheckCheck size={15} /></span> Output dicek sebelum dipakai
      </Parallax>
      <Parallax speed={0.1} className="mock-float floaty" style={{ top: "38%", right: "-34px", "--float-delay": "0.6s", "--float-dur": "9s" } as CSSProperties}>
        <span className="ic"><BookOpen size={15} /></span> Project: prompt kit profesi
      </Parallax>
    </div>
  );
}

export function System() {
  return (
    <section className="section">
      <div className="container">
        <SectionHead
          no="01"
          title="Konsep. Praktik. Bukti kerja."
          lead="AI yang laku dipakai jauh dari ChatGPT untuk tanya random. Yang penting bukan tool-nya, tapi cara mengurai kerja: apa input yang masuk, output yang harus dihasilkan, dan bagian mana yang tidak boleh diserahkan ke mesin."
        />
        <div className="system-grid">
          <Stagger className="system-steps" step={100}>
            {steps.map(([no, title, copy]) => (
              <Reveal key={no} className="system-step" variant="left">
                <span className="sys-no">/{no}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              </Reveal>
            ))}
          </Stagger>
          <Reveal variant="scale" delay={150}><InterfaceMock /></Reveal>
        </div>
      </div>
    </section>
  );
}
