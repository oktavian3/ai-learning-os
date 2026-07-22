import extracted from "./extracted-course.json";
import {lessonContent} from "./lessonContent";
import {CourseModule,Difficulty,Lesson} from "./types";

type RawLesson = {
  code:string; title:string; slug:string; concepts:string[]; content:string[]; examples:string[];
  exercises:string[]; prompts:string[]; quiz:string[]; assignments:string[]; notes:string[];
};

const rawLessons = extracted.modules.flatMap(module => module.lessons as RawLesson[]);
const byCode = new Map(rawLessons.map(lesson => [lesson.code, lesson]));
const glossarySlugs = ["ai","machine-learning","generative-ai","llm","token","context-window","hallucination","prompt","rag","embedding","vector-database","ai-agent","api","webhook","eval"];

const pick = (codes:string[], difficulty:Difficulty):Lesson[] => codes.map(code => {
  const source = byCode.get(code);
  if (!source) throw new Error(`Lesson ${code} tidak ditemukan di dokumen sumber.`);
  const override = lessonContent[code];
  if (!override) throw new Error(`Lesson content override ${code} belum dibuat.`);
  const sourceIndex = rawLessons.indexOf(source);
  const relatedGlossary = Array.from(new Set(glossarySlugs.slice(sourceIndex%glossarySlugs.length).concat(glossarySlugs).slice(0,4)));
  return {
    ...source,
    difficulty,
    duration: difficulty === "Pemula" ? "25 sampai 35 menit" : difficulty === "Menengah" ? "35 sampai 45 menit" : "45 sampai 60 menit",
    summary: override.summary,
    prerequisites: override.prerequisites,
    learningObjective: override.learningObjective,
    objectives: override.objectives,
    concepts: override.concepts,
    content: source.content,
    examples: source.examples,
    exercises: source.exercises,
    prompts: source.prompts,
    quiz: source.quiz,
    assignments: source.assignments,
    notes: source.notes,
    nextStep: override.nextStep,
    relatedGlossary
  };
});

const module = (
  number:number, slug:string, title:string, description:string, difficulty:Difficulty, duration:string,
  outcomes:string[], tools:string[], project:string, codes:string[]
):CourseModule => ({number,slug,title,description,difficulty,duration,outcomes,tools,project,lessons:pick(codes,difficulty)});

export const courseModules:CourseModule[] = [
  module(1,"ai-fundamentals","Dasar AI","AI itu apa, kenapa mendadak ada di mana-mana, dan cara nyadar kalau jawabannya salah. Fondasi buat semua modul selanjutnya.","Pemula","2 jam",["Punya gambaran besar tentang AI","Tau batas AI dan cara memeriksa jawabannya"],["ChatGPT","Gemini"],"Peta use case AI pribadi",["M01.L01","M01.L04"]),
  module(2,"generative-ai-llm","Cara Kerja LLM","Cara LLM menghasilkan jawaban, apa itu token dan context window, plus cara pilih model yang cocok tanpa hafal semua merek.","Pemula","3 jam",["Mengerti cara LLM menghasilkan jawaban","Bisa memilih model sesuai tugas"],["ChatGPT","Claude","Gemini"],"Demo 1 input jadi 5 output",["M01.L02","M01.L03","M02.L01","M02.L02","M02.L03"]),
  module(3,"prompting","Prompting","Cara nulis prompt yang bisa dipakai berulang: kasih konteks, contoh, dan batas, lalu debug output yang belum pas.","Pemula","3 jam",["Membuat prompt yang bisa dipakai ulang","Memperbaiki output dengan cara yang terukur"],["ChatGPT","Claude"],"Prompt kit untuk pekerjaanmu",["M03.L01","M03.L02","M03.L03","M03.L04"]),
  module(4,"daily-work","AI buat Kerja Sehari-hari","Biar gak cuma buka AI pas lagi buntu. Pakai buat riset, email, laporan, spreadsheet, dan keputusan kecil.","Pemula","2.5 jam",["Riset lebih rapi dan bisa dicek","Mempercepat kerja dokumen dan data ringan"],["Perplexity","NotebookLM","Sheets"],"Weekly work copilot",["M04.L01","M04.L02","M04.L03"]),
  module(5,"tools-mastery","Memilih Tools AI","Tools baru muncul tiap minggu. Pelajari cara memilih dari fungsi, risiko, biaya, dan nyambung tidak ke pekerjaanmu.","Pemula","2.5 jam",["Punya AI stack yang tidak berantakan","Bisa menilai tool baru dengan cepat"],["Canva","Notion","Cursor"],"Personal AI stack",["M06.L01","M06.L02","M06.L03"]),
  module(6,"research-content","Riset, Content, dan Marketing","Dari cari bahan sampai publish. Termasuk mencari angle, jaga brand voice, dan membuat content system yang tidak dimulai dari nol terus.","Menengah","3 jam",["Membuat sistem content end-to-end","Menjaga bahasa tetap natural dan relevan"],["Notion","Canva","Perplexity"],"Content engine 7 hari",["M05.L01","M05.L02","M05.L03"]),
  module(7,"automation-basics","Dari Prompt ke Workflow","Prompt sekali pakai gampang hilang. Di sini kita rangkai input, langkah, review, dan output jadi alur yang bisa diulang.","Menengah","3 jam",["Memetakan proses sebelum mengotomasi","Membuat automation pertama yang aman"],["n8n","Make","Sheets"],"Automation intake sederhana",["M07.L01","M07.L02","M08.L01"]),
  module(8,"api-webhook","API & Webhook buat Non-Developer","Biar aplikasi bisa ngobrol satu sama lain. Cukup teknis buat bikin sesuatu, tanpa harus kuliah backend dulu.","Menengah","3.5 jam",["Paham request, response, JSON, dan auth","Bisa membaca alur webhook","Bisa test API dengan Postman","Bisa membangun integrasi sederhana"],["Postman","n8n","JSON"],"Webhook lead router",["M08.L02","M08.L03","M08.L04"]),
  module(9,"rag-knowledge-base","RAG & Knowledge Base","Bikin AI jawab dari dokumen yang kamu pilih, bukan ngarang bebas, dan tetap nunjukin sumbernya.","Lanjutan","2 jam",["Mengerti alur retrieval sampai jawaban","Bisa menyiapkan knowledge base yang rapi"],["NotebookLM","Supabase","Embeddings"],"Chatbot dari kumpulan PDF",["M09.L01","M09.L02"]),
  module(10,"ai-agents","AI Agent & Tool Calling","Agent itu bukan chatbot yang diganti namanya. Dia punya tujuan, pakai tools, simpan state, dan jalan beberapa step.","Lanjutan","2 jam",["Mendesain agent yang masuk akal","Membuat kontrak tool yang aman"],["OpenAI API","Dify","n8n"],"Research agent dengan approval",["M10.L01","M10.L02"]),
  module(11,"agent-orchestration","Agent Orchestration","Kalau satu agent memang tidak cukup, baru pakai router, supervisor, dan handoff. Jangan membuat lima agent cuma biar diagramnya keren.","Lanjutan","3 jam",["Memilih pola orchestration","Mengukur biaya, waktu, dan kualitas agent","Membuat evaluation framework","Deploy agent ke production dengan aman"],["LangGraph","Tracing"],"Multi-agent writing system",["M10.L03","M10.L04","M10.L05"]),
  module(12,"safety-evaluation","Safety, Privacy & Eval","Data apa yang tidak boleh masuk, output mana yang harus dicek, dan kenapa agent butuh rem sebelum diberikan akses.","Menengah","2.5 jam",["Melindungi data sensitif","Membuat rubric evaluasi sederhana"],["Eval sheet","Redaction"],"Panduan penggunaan AI untuk tim",["M11.L01","M11.L02","M11.L03"]),
  module(13,"monetization","Monetize Skill AI Tanpa Jual Mimpi","Cari masalah yang layak dibayar, bikin paket yang jelas, dan jangan jual janji yang belum bisa kamu buktikan.","Lanjutan","2 jam",["Menyusun offer yang jelas","Memilih jalur karier AI yang cocok"],["Notion","Loom"],"Paket layanan AI pertama",["M12.L01","M12.L02"]),
  module(14,"portfolio-capstone","Portfolio & Capstone","Tunjukkan masalahnya, apa yang kamu bangun, gimana cara ngetesnya, dan hasilnya apa. Jargon belakangan.","Lanjutan","1.5 jam",["Membuat case study yang meyakinkan","Menyiapkan capstone untuk portfolio"],["GitHub","Notion","Loom"],"Capstone + case study",["M12.L03"]),
];

export const getModule = (slug:string) => courseModules.find(module => module.slug === slug);
export const sourceLessonCount = rawLessons.length;
