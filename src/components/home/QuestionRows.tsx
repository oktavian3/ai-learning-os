import { Marquee } from "@/components/motion";

const rowA = [
  ["Riset", "Bagaimana cek jawaban AI tanpa percaya mentah?"],
  ["Prompting", "Kenapa prompt panjang belum tentu lebih bagus?"],
  ["Tools", "Tool baru muncul tiap minggu. Mana yang worth dicoba?"],
  ["Workflow", "Kapan sebuah proses layak diotomasi?"],
  ["Model", "Model mana yang cocok untuk dokumen panjang?"],
  ["Content", "Bagaimana jaga brand voice saat pakai AI?"],
] as const;

const rowB = [
  ["Agent", "Apa beda workflow dan agent?"],
  ["RAG", "Bagaimana bikin AI jawab dari dokumen sendiri?"],
  ["Automation", "Trigger, action, dan fallback itu dipasang di mana?"],
  ["Output", "Bagaimana bikin output AI tetap konsisten?"],
  ["Data", "Data apa yang tidak boleh masuk ke chatbot?"],
  ["Karier", "Skill AI dibayar dari bukti apa?"],
] as const;

function Row({ items }: { items: readonly (readonly [string, string])[] }) {
  return (
    <>
      {items.map(([topic, question]) => (
        <div className="q-card" key={question}>
          <span className="q-topic">{topic}</span>
          <span className="q-text">{question}</span>
        </div>
      ))}
    </>
  );
}

export function QuestionRows() {
  return (
    <section className="section-tight" aria-label="Pertanyaan praktis yang dijawab Nurai">
      <div className="q-rows">
        <Marquee duration={56}><Row items={rowA} /></Marquee>
        <Marquee duration={44} direction="rtl"><Row items={rowB} /></Marquee>
      </div>
    </section>
  );
}
