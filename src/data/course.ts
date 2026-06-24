import extracted from "./extracted-course.json";
import { CourseModule, Difficulty, Lesson, LessonConcept } from "./types";

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
  (title:string)=>`${title} kedengarannya teknis. Sebenarnya tidak serumit itu kalau dibedah pelan-pelan.`,
  (title:string)=>`Di sini kamu akan memahami ${title.toLowerCase()} tanpa harus hafal jargon dulu.`,
  (title:string)=>`Bukan cuma definisi. Kita lihat cara ${title.toLowerCase()} terpakai dalam pekerjaan nyata.`
];

const glossarySlugs = ["ai","machine-learning","generative-ai","llm","token","context-window","hallucination","prompt","rag","embedding","vector-database","ai-agent","api","webhook","eval"];

const moduleCoverage:Record<string,string[]>={
  M01:["AI berbasis aturan vs machine learning","training vs inference","model vs aplikasi AI","AI, ML, deep learning, dan GenAI"],
  M02:["output probabilistik","mental model transformer","temperature dan sampling","reasoning model vs standard model"],
  M03:["prompt debugging loop","rubric evaluasi output","structured output dan schema","prompt versioning"],
  M04:["workflow spreadsheet","riset dengan citation","document comparison","approval boundary"],
  M05:["source hierarchy","evidence matrix","editorial QA","distribution dan analytics"],
  M06:["tool selection matrix","privacy dan data policy","biaya AI stack","vendor lock-in"],
  M07:["input, process, output","branching dan state","fallback","logging dan human approval"],
  M08:["HTTP methods dan status code","API key dan OAuth","webhook signing","retry, idempotency, rate limit, dan secrets"],
  M09:["chunking dan metadata","embeddings","vector dan hybrid search","reranking dan RAG evaluation"],
  M10:["agent anatomy","goals, tools, memory, dan state","permissions dan stopping conditions","cost budget"],
  M11:["data classification","prompt injection","least privilege","output validation dan audit log"],
  M12:["service packaging","scope dan pricing","proposal dan delivery","maintenance, outreach, dan capstone rubric"]
};

function moduleKey(code:string){return code.split(".")[0];}

function buildConcept(source:RawLesson, concept:string, index:number):LessonConcept{
  const coverage = moduleCoverage[moduleKey(source.code)]?.[index];
  const focus = coverage || concept;
  const contentHint = casualize(source.content[index % Math.max(source.content.length,1)] || source.content[0] || "");
  const exampleHint = casualize(source.examples[index % Math.max(source.examples.length,1)] || source.exercises[0] || "");
  return {
    title: concept,
    explanation: `${concept} perlu dipahami sebagai bagian dari ${focus}. ${contentHint}`.trim(),
    whyItMatters: `Ini penting karena lesson ${source.code} bukan cuma mengejar istilah. Kamu perlu tahu kapan ${concept.toLowerCase()} membantu kerja nyata, kapan harus diverifikasi, dan batas apa yang tetap perlu dijaga manusia.`,
    example: exampleHint || `Contoh praktis: pakai ${concept.toLowerCase()} untuk memperjelas input, proses, output, dan kriteria selesai sebelum meminta bantuan AI.`,
    commonMistake: `Kesalahan umum: menganggap ${concept.toLowerCase()} otomatis membuat hasil benar tanpa contoh, sumber, atau checklist evaluasi.`
  };
}

const pick = (codes:string[], difficulty:Difficulty):Lesson[] => codes.map(code => {
  const source = byCode.get(code);
  if (!source) throw new Error(`Lesson ${code} tidak ditemukan di dokumen sumber.`);
  const sourceIndex = rawLessons.indexOf(source);
  const concepts = source.concepts.map((concept,index)=>buildConcept(source,concept,index));
  const relatedGlossary = Array.from(new Set(glossarySlugs.slice(sourceIndex%glossarySlugs.length).concat(glossarySlugs).slice(0,4)));
  return {
    ...source,
    difficulty,
    duration: difficulty === "Pemula" ? "25-35 menit" : difficulty === "Menengah" ? "35-45 menit" : "45-60 menit",
    summary: summaryFrames[sourceIndex%summaryFrames.length](source.title),
    prerequisites: [
      "Baca ringkasan modul dan siapkan satu contoh pekerjaan nyata.",
      difficulty === "Pemula" ? "Tidak perlu pengalaman teknis." : "Selesaikan modul sebelumnya atau pahami konsep dasarnya dulu."
    ],
    learningObjective: `Setelah lesson ini, kamu bisa menjelaskan ${source.title.toLowerCase()}, menerapkannya pada contoh Indonesia yang sederhana, dan tahu bagian mana yang harus dicek manusia.`,
    objectives: concepts.slice(0,3).map(concept => `Paham ${concept.title.charAt(0).toLowerCase()+concept.title.slice(1)}`),
    concepts,
    content: source.content.map(casualize),examples:source.examples.map(casualize),exercises:source.exercises.map(casualize),prompts:source.prompts.map(casualize),quiz:source.quiz.map(casualize),assignments:source.assignments.map(casualize),
    notes: source.notes.map(casualize).concat(moduleCoverage[moduleKey(source.code)]?.map(item=>`Checklist tambahan: ${item}.`) || []),
    nextStep: "Simpan hasil latihan, cek kembali dengan rubric sederhana, lalu lanjut ke lesson berikutnya saat output sudah bisa dijelaskan ulang.",
    relatedGlossary
  };
});
const module = (
  number:number, slug:string, title:string, description:string, difficulty:Difficulty, duration:string,
  outcomes:string[], tools:string[], project:string, codes:string[]
):CourseModule => ({number,slug,title,description,difficulty,duration,outcomes,tools,project,lessons:pick(codes,difficulty)});

export const courseModules:CourseModule[] = [
  module(1,"ai-fundamentals","Dasar AI Tanpa Bikin Pusing","AI, ML, GenAI, bedanya apa, kenapa mendadak ada di mana-mana, dan kapan jawabannya jangan dipercaya.","Pemula","2 jam",["Punya gambaran besar tentang AI","Tau batas AI dan cara memeriksa jawabannya"],["ChatGPT","Gemini"],"Peta use case AI pribadi",["M01.L01","M01.L04"]),
  module(2,"generative-ai-llm","Generative AI & LLM","Bongkar cara LLM kerja, apa itu token dan context window, plus cara pilih model tanpa hafal semua merek.","Pemula","3 jam",["Mengerti cara LLM menghasilkan jawaban","Bisa memilih model sesuai kebutuhan"],["ChatGPT","Claude","Gemini"],"Demo 1 input jadi 5 output",["M01.L02","M01.L03","M02.L01","M02.L02","M02.L03"]),
  module(3,"prompting","Prompt yang Benar-Benar Terpakai","Prompt bagus itu brief yang jelas. Kita latihan berikan konteks, contoh, batas, lalu memperbaiki hasil yang masih kurang.","Pemula","3 jam",["Membuat prompt yang bisa dipakai ulang","Memperbaiki output dengan cara yang terukur"],["ChatGPT","Claude"],"Prompt kit untuk pekerjaanmu",["M03.L01","M03.L02","M03.L03","M03.L04"]),
  module(4,"daily-work","AI buat Kerja Sehari-hari","Agar tidak hanya membuka AI pas lagi buntu. Pakai buat riset, email, laporan, spreadsheet, dan keputusan kecil.","Pemula","2.5 jam",["Riset lebih rapi dan bisa dicek","Mempercepat kerja dokumen dan data ringan"],["Perplexity","NotebookLM","Sheets"],"Weekly work copilot",["M04.L01","M04.L02","M04.L03"]),
  module(5,"tools-mastery","Pilih Tools Tanpa Ikut Hype","Tools baru muncul tiap minggu. Pelajari cara memilih dari fungsi, risiko, biaya, dan nyambung tidak ke pekerjaanmu.","Menengah","2.5 jam",["Punya AI stack yang tidak berantakan","Bisa menilai tool baru dengan cepat"],["Canva","Notion","Cursor"],"Personal AI stack",["M06.L01","M06.L02","M06.L03"]),
  module(6,"research-content","Riset, Content, dan Marketing","Dari cari bahan sampai publish. Termasuk mencari angle, jaga brand voice, dan membuat content system yang tidak dimulai dari nol terus.","Menengah","3 jam",["Membuat sistem content end-to-end","Menjaga bahasa tetap natural dan relevan"],["Notion","Canva","Perplexity"],"Content engine 7 hari",["M05.L01","M05.L02","M05.L03"]),
  module(7,"automation-basics","Dari Prompt ke Workflow","Prompt sekali pakai gampang hilang. Di sini kita rangkai input, langkah, review, dan output jadi alur yang bisa diulang.","Menengah","3 jam",["Memetakan proses sebelum mengotomasi","Membuat automation pertama yang aman"],["n8n","Make","Sheets"],"Automation intake sederhana",["M07.L01","M07.L02","M08.L01"]),
  module(8,"api-webhook","API & Webhook buat Non-Developer","Agar aplikasi bisa berkomunikasi satu sama lain. Cukup teknis untuk membuat sesuatu, tanpa kuliah backend dulu.","Menengah","3.5 jam",["Paham request, response, JSON, dan auth","Bisa membaca alur webhook","Bisa test API dengan Postman","Bisa membangun integrasi sederhana"],["Postman","n8n","JSON"],"Webhook lead router",["M08.L02","M08.L03","M08.L04"]),
  module(9,"rag-knowledge-base","RAG & Knowledge Base","Bikin AI jawab dari dokumen yang kamu pilih, bukan ngarang bebas, dan tetap nunjukin sumbernya.","Lanjutan","2 jam",["Mengerti alur retrieval sampai jawaban","Bisa menyiapkan knowledge base yang rapi"],["NotebookLM","Supabase","Embeddings"],"Chatbot dari kumpulan PDF",["M09.L01","M09.L02"]),
  module(10,"ai-agents","AI Agent & Tool Calling","Agent itu bukan chatbot yang diganti namanya. Dia punya tujuan, pakai tools, simpan state, dan jalan beberapa step.","Lanjutan","2 jam",["Mendesain agent yang masuk akal","Membuat kontrak tool yang aman"],["OpenAI API","Dify","n8n"],"Research agent dengan approval",["M10.L01","M10.L02"]),
  module(11,"agent-orchestration","Agent Orchestration","Kalau satu agent memang tidak cukup, baru pakai router, supervisor, dan handoff. Jangan membuat lima agent cuma biar diagramnya keren.","Lanjutan","3 jam",["Memilih pola orchestration","Mengukur biaya, waktu, dan kualitas agent","Membuat evaluation framework","Deploy agent ke production dengan aman"],["LangGraph","Tracing"],"Multi-agent writing system",["M10.L03","M10.L04","M10.L05"]),
  module(12,"safety-evaluation","Safety, Privacy & Eval","Data apa yang tidak boleh masuk, output mana yang harus dicek, dan kenapa agent butuh rem sebelum diberikan akses.","Menengah","2.5 jam",["Melindungi data sensitif","Membuat rubric evaluasi sederhana"],["Eval sheet","Redaction"],"Panduan penggunaan AI untuk tim",["M11.L01","M11.L02","M11.L03"]),
  module(13,"monetization","Monetize Skill AI Tanpa Jual Mimpi","Cari masalah yang layak dibayar, membuat paket yang jelas, dan jangan menjanjikan hal yang belum pernah kamu buktikan.","Menengah","2 jam",["Menyusun offer yang jelas","Memilih jalur karier AI yang cocok"],["Notion","Loom"],"Paket layanan AI pertama",["M12.L01","M12.L02"]),
  module(14,"portfolio-capstone","Portfolio & Capstone","Tunjukkan masalahnya, apa yang kamu bangun, bagaimana dites, dan hasilnya apa. Jargon belakangan.","Menengah","1.5 jam",["Membuat case study yang meyakinkan","Menyiapkan capstone untuk portfolio"],["GitHub","Notion","Loom"],"Capstone + case study",["M12.L03"]),
];

export const getModule = (slug:string) => courseModules.find(module => module.slug === slug);
export const sourceLessonCount = rawLessons.length;
