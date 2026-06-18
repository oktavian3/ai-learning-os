import extracted from "./extracted-course.json";
import { CourseModule, Difficulty, Lesson } from "./types";

type RawLesson = {
  code:string; title:string; slug:string; concepts:string[]; content:string[]; examples:string[];
  exercises:string[]; prompts:string[]; quiz:string[]; assignments:string[]; notes:string[];
};

const rawLessons = extracted.modules.flatMap(module => module.lessons as RawLesson[]);
const byCode = new Map(rawLessons.map(lesson => [lesson.code, lesson]));
const casualize=(text:string)=>text
  .replace(/\bAnda\b/g,"kamu").replace(/\banda\b/g,"kamu")
  .replace(/\bdapat\b/g,"bisa").replace(/\bDapat\b/g,"Bisa")
  .replace(/\bmerupakan\b/g,"adalah").replace(/\bMerupakan\b/g,"Adalah")
  .replace(/\bmemiliki\b/g,"punya").replace(/\bMemiliki\b/g,"Punya");
const summaryFrames=[
  (title:string)=>`Kita bongkar ${title.toLowerCase()}: konsep dasarnya, contoh nyatanya, lalu langsung coba.`,
  (title:string)=>`${title} kedengarannya teknis. Sebenarnya gak serumit itu kalau dibedah pelan-pelan.`,
  (title:string)=>`Di sini kamu bakal paham ${title.toLowerCase()} tanpa harus hafal jargon dulu.`,
  (title:string)=>`Bukan cuma definisi. Kita lihat cara ${title.toLowerCase()} kepakai di kerjaan beneran.`
];

const pick = (codes:string[], difficulty:Difficulty):Lesson[] => codes.map(code => {
  const source = byCode.get(code);
  if (!source) throw new Error(`Lesson ${code} tidak ditemukan di dokumen sumber.`);
  return {
    ...source,
    difficulty,
    duration: difficulty === "Pemula" ? "25–35 menit" : difficulty === "Menengah" ? "35–45 menit" : "45–60 menit",
    summary: summaryFrames[rawLessons.indexOf(source)%summaryFrames.length](source.title),
    objectives: source.concepts.slice(0,3).map(concept => `Paham ${concept.charAt(0).toLowerCase()+concept.slice(1)}`),
    content: source.content.map(casualize),examples:source.examples.map(casualize),exercises:source.exercises.map(casualize),prompts:source.prompts.map(casualize),quiz:source.quiz.map(casualize),assignments:source.assignments.map(casualize),notes:source.notes.map(casualize)
  };
});

const module = (
  number:number, slug:string, title:string, description:string, difficulty:Difficulty, duration:string,
  outcomes:string[], tools:string[], project:string, codes:string[]
):CourseModule => ({number,slug,title,description,difficulty,duration,outcomes,tools,project,lessons:pick(codes,difficulty)});

export const courseModules:CourseModule[] = [
  module(1,"ai-fundamentals","Dasar AI Tanpa Bikin Pusing","AI, ML, GenAI—bedanya apa, kenapa mendadak ada di mana-mana, dan kapan jawabannya jangan dipercaya.","Pemula","2 jam",["Punya gambaran besar tentang AI","Tahu batas AI dan cara mengecek jawabannya"],["ChatGPT","Gemini"],"Peta use case AI pribadi",["M01.L01","M01.L04"]),
  module(2,"generative-ai-llm","Generative AI & LLM","Bongkar cara LLM kerja, apa itu token dan context window, plus cara pilih model tanpa hafal semua merek.","Pemula","3 jam",["Mengerti cara LLM menghasilkan jawaban","Bisa memilih model sesuai kebutuhan"],["ChatGPT","Claude","Gemini"],"Demo 1 input jadi 5 output",["M01.L02","M01.L03","M02.L01","M02.L02","M02.L03"]),
  module(3,"prompting","Prompt yang Benar-Benar Kepakai","Prompt bagus itu brief yang jelas. Kita latihan kasih konteks, contoh, batas, lalu benerin hasil yang masih zonk.","Pemula","3 jam",["Membuat prompt yang bisa dipakai ulang","Memperbaiki output dengan cara yang terukur"],["ChatGPT","Claude"],"Prompt kit untuk pekerjaanmu",["M03.L01","M03.L02","M03.L03","M03.L04"]),
  module(4,"daily-work","AI buat Kerja Sehari-hari","Biar gak cuma buka AI pas lagi buntu. Pakai buat riset, email, laporan, spreadsheet, dan keputusan kecil.","Pemula","2.5 jam",["Riset lebih rapi dan bisa dicek","Mempercepat kerja dokumen dan data ringan"],["Perplexity","NotebookLM","Sheets"],"Weekly work copilot",["M04.L01","M04.L02","M04.L03"]),
  module(5,"tools-mastery","Pilih Tools Tanpa Ikut Hype","Tools baru muncul tiap minggu. Pelajari cara memilih dari fungsi, risiko, biaya, dan nyambung gak ke kerjaanmu.","Menengah","2.5 jam",["Punya AI stack yang tidak berantakan","Bisa menilai tool baru dengan cepat"],["Canva","Notion","Cursor"],"Personal AI stack",["M06.L01","M06.L02","M06.L03"]),
  module(6,"research-content","Riset, Content, dan Marketing","Dari cari bahan sampai publish. Termasuk nyari angle, jaga brand voice, dan bikin content system yang gak mulai dari nol terus.","Menengah","3 jam",["Membuat sistem content end-to-end","Menjaga bahasa tetap natural dan relevan"],["Notion","Canva","Perplexity"],"Content engine 7 hari",["M05.L01","M05.L02","M05.L03"]),
  module(7,"automation-basics","Dari Prompt ke Workflow","Prompt sekali pakai gampang hilang. Di sini kita rangkai input, langkah, review, dan output jadi alur yang bisa diulang.","Menengah","3 jam",["Memetakan proses sebelum mengotomasi","Membuat automation pertama yang aman"],["n8n","Make","Sheets"],"Automation intake sederhana",["M07.L01","M07.L02","M08.L01"]),
  module(8,"api-webhook","API & Webhook buat Non-Developer","Biar aplikasi bisa ngobrol satu sama lain. Cukup teknis buat bikin sesuatu, tanpa kuliah backend dulu.","Menengah","1.5 jam",["Paham request, response, JSON, dan auth","Bisa membaca alur webhook"],["Postman","n8n","JSON"],"Webhook lead router",["M08.L02"]),
  module(9,"rag-knowledge-base","RAG & Knowledge Base","Bikin AI jawab dari dokumen yang kamu pilih—bukan ngarang bebas—dan tetap nunjukin sumbernya.","Lanjutan","2 jam",["Mengerti alur retrieval sampai jawaban","Bisa menyiapkan knowledge base yang rapi"],["NotebookLM","Supabase","Embeddings"],"Chatbot dari kumpulan PDF",["M09.L01","M09.L02"]),
  module(10,"ai-agents","AI Agent & Tool Calling","Agent itu bukan chatbot yang diganti namanya. Dia punya tujuan, pakai tools, simpan state, dan jalan beberapa step.","Lanjutan","2 jam",["Mendesain agent yang masuk akal","Membuat kontrak tool yang aman"],["OpenAI API","Dify","n8n"],"Research agent dengan approval",["M10.L01","M10.L02"]),
  module(11,"agent-orchestration","Agent Orchestration","Kalau satu agent memang gak cukup, baru pakai router, supervisor, dan handoff. Jangan bikin lima agent cuma biar diagramnya keren.","Lanjutan","1 jam",["Memilih pola orchestration","Mengukur biaya, waktu, dan kualitas agent"],["LangGraph","Tracing"],"Multi-agent writing system",["M10.L03"]),
  module(12,"safety-evaluation","Safety, Privacy & Eval","Data apa yang gak boleh masuk, output mana yang harus dicek, dan kenapa agent butuh rem sebelum dikasih akses.","Menengah","2.5 jam",["Melindungi data sensitif","Membuat rubric evaluasi sederhana"],["Eval sheet","Redaction"],"Panduan penggunaan AI untuk tim",["M11.L01","M11.L02","M11.L03"]),
  module(13,"monetization","Jual Skill AI Tanpa Jual Mimpi","Cari masalah yang layak dibayar, bikin paket yang jelas, dan jangan janjiin hal yang belum pernah kamu buktikan.","Menengah","2 jam",["Menyusun offer yang jelas","Memilih jalur karier AI yang cocok"],["Notion","Loom"],"Paket layanan AI pertama",["M12.L01","M12.L02"]),
  module(14,"portfolio-capstone","Portfolio & Capstone","Tunjukkan masalahnya, apa yang kamu bangun, bagaimana dites, dan hasilnya apa. Jargon belakangan.","Menengah","1.5 jam",["Membuat case study yang meyakinkan","Menyiapkan capstone untuk portfolio"],["GitHub","Notion","Loom"],"Capstone + case study",["M12.L03"]),
];

export const getModule = (slug:string) => courseModules.find(module => module.slug === slug);
export const sourceLessonCount = rawLessons.length;
