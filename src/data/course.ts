import extracted from "./extracted-course.json";
import { CourseModule, Difficulty, Lesson } from "./types";

type RawLesson = {
  code:string; title:string; slug:string; concepts:string[]; content:string[]; examples:string[];
  exercises:string[]; prompts:string[]; quiz:string[]; assignments:string[]; notes:string[];
};

const rawLessons = extracted.modules.flatMap(module => module.lessons as RawLesson[]);
const byCode = new Map(rawLessons.map(lesson => [lesson.code, lesson]));

const pick = (codes:string[], difficulty:Difficulty):Lesson[] => codes.map(code => {
  const source = byCode.get(code);
  if (!source) throw new Error(`Lesson ${code} tidak ditemukan di dokumen sumber.`);
  return {
    ...source,
    difficulty,
    duration: difficulty === "Pemula" ? "25–35 menit" : difficulty === "Menengah" ? "35–45 menit" : "45–60 menit",
    summary: `Di lesson ini kita bahas ${source.title.toLowerCase()}. Mulai dari dasarnya, lihat contoh, lalu langsung coba sendiri.`,
    objectives: source.concepts.slice(0,3).map(concept => `Memahami: ${concept}`),
  };
});

const module = (
  number:number, slug:string, title:string, description:string, difficulty:Difficulty, duration:string,
  outcomes:string[], tools:string[], project:string, codes:string[]
):CourseModule => ({number,slug,title,description,difficulty,duration,outcomes,tools,project,lessons:pick(codes,difficulty)});

export const courseModules:CourseModule[] = [
  module(1,"ai-fundamentals","Dasar AI Tanpa Bikin Pusing","Kenalan dulu sama AI: apa bedanya dengan ML, kenapa tiba-tiba ramai, dan kapan hasilnya tidak bisa dipercaya.","Pemula","2 jam",["Punya gambaran besar tentang AI","Tahu batas AI dan cara mengecek jawabannya"],["ChatGPT","Gemini"],"Peta use case AI pribadi",["M01.L01","M01.L04"]),
  module(2,"generative-ai-llm","Generative AI & LLM","Pahami cara kerja AI generatif, token, context window, multimodal, dan cara memilih model tanpa menghafal semua merek.","Pemula","3 jam",["Mengerti cara LLM menghasilkan jawaban","Bisa memilih model sesuai kebutuhan"],["ChatGPT","Claude","Gemini"],"Demo 1 input jadi 5 output",["M01.L02","M01.L03","M02.L01","M02.L02","M02.L03"]),
  module(3,"prompting","Prompt yang Benar-Benar Kepakai","Belajar memberi brief yang jelas ke AI, menambah contoh, mengatur konteks, lalu memperbaiki hasil yang belum pas.","Pemula","3 jam",["Membuat prompt yang bisa dipakai ulang","Memperbaiki output dengan cara yang terukur"],["ChatGPT","Claude"],"Prompt kit untuk pekerjaanmu",["M03.L01","M03.L02","M03.L03","M03.L04"]),
  module(4,"daily-work","AI untuk Kerja Sehari-hari","Pakai AI untuk riset, email, laporan, dokumen, spreadsheet, dan membantu mengambil keputusan kecil.","Pemula","2.5 jam",["Riset lebih rapi dan bisa dicek","Mempercepat kerja dokumen dan data ringan"],["Perplexity","NotebookLM","Sheets"],"Weekly work copilot",["M04.L01","M04.L02","M04.L03"]),
  module(5,"tools-mastery","Memilih dan Memakai AI Tools","Bukan daftar tool panjang. Di sini kamu belajar memilih alat dari fungsi, risiko, biaya, dan cara masuk ke workflow.","Menengah","2.5 jam",["Punya AI stack yang tidak berantakan","Bisa menilai tool baru dengan cepat"],["Canva","Notion","Cursor"],"Personal AI stack",["M06.L01","M06.L02","M06.L03"]),
  module(6,"research-content","Riset, Content, dan Marketing","Bangun alur dari cari ide sampai publish. Termasuk content system, campaign, dan riset Web3 yang tidak ikut-ikutan hype.","Menengah","3 jam",["Membuat sistem content end-to-end","Menjaga bahasa tetap natural dan relevan"],["Notion","Canva","Perplexity"],"Content engine 7 hari",["M05.L01","M05.L02","M05.L03"]),
  module(7,"automation-basics","Dari Prompt ke Workflow & Automation","Ubah tugas berulang menjadi alur yang jelas: ada input, langkah kerja, pengecekan, dan hasil akhir.","Menengah","3 jam",["Memetakan proses sebelum mengotomasi","Membuat automation pertama yang aman"],["n8n","Make","Sheets"],"Automation intake sederhana",["M07.L01","M07.L02","M08.L01"]),
  module(8,"api-webhook","API & Webhook untuk Non-Developer","Belajar cara aplikasi saling kirim data. Cukup teknis untuk bisa membangun, tapi tetap dijelaskan dari nol.","Menengah","1.5 jam",["Paham request, response, JSON, dan auth","Bisa membaca alur webhook"],["Postman","n8n","JSON"],"Webhook lead router",["M08.L02"]),
  module(9,"rag-knowledge-base","RAG & Knowledge Base","Buat AI menjawab dari dokumen yang kamu pilih, lengkap dengan sumber yang bisa ditelusuri.","Lanjutan","2 jam",["Mengerti alur retrieval sampai jawaban","Bisa menyiapkan knowledge base yang rapi"],["NotebookLM","Supabase","Embeddings"],"Chatbot dari kumpulan PDF",["M09.L01","M09.L02"]),
  module(10,"ai-agents","AI Agents & Tool Calling","Bedakan chatbot biasa dengan agent. Pelajari goal, tools, memory, function calling, dan batas wewenangnya.","Lanjutan","2 jam",["Mendesain agent yang masuk akal","Membuat kontrak tool yang aman"],["OpenAI API","Dify","n8n"],"Research agent dengan approval",["M10.L01","M10.L02"]),
  module(11,"agent-orchestration","Agent Orchestration","Kalau satu agent tidak cukup, baru masuk ke orchestration: router, supervisor, handoff, dan cara menghindari kompleksitas palsu.","Lanjutan","1 jam",["Memilih pola orchestration","Mengukur biaya, waktu, dan kualitas agent"],["LangGraph","Tracing"],"Multi-agent writing system",["M10.L03"]),
  module(12,"safety-evaluation","Safety, Privacy & Evaluasi","Tahu data apa yang tidak boleh asal dimasukkan, risiko agent, dan cara mengecek kualitas output secara konsisten.","Menengah","2.5 jam",["Melindungi data sensitif","Membuat rubric evaluasi sederhana"],["Eval sheet","Redaction"],"Panduan penggunaan AI untuk tim",["M11.L01","M11.L02","M11.L03"]),
  module(13,"monetization","Menjual Skill AI dengan Waras","Pilih masalah yang layak dibayar, bungkus jadi layanan, tentukan scope, dan hindari janji yang tidak bisa dibuktikan.","Menengah","2 jam",["Menyusun offer yang jelas","Memilih jalur karier AI yang cocok"],["Notion","Loom"],"Paket layanan AI pertama",["M12.L01","M12.L02"]),
  module(14,"portfolio-capstone","Portfolio & Capstone","Ubah hasil belajar menjadi case study yang enak dilihat: masalahnya apa, kamu membangun apa, bagaimana dites, dan apa hasilnya.","Menengah","1.5 jam",["Membuat case study yang meyakinkan","Menyiapkan capstone untuk portfolio"],["GitHub","Notion","Loom"],"Capstone + case study",["M12.L03"]),
];

export const getModule = (slug:string) => courseModules.find(module => module.slug === slug);
export const sourceLessonCount = rawLessons.length;
