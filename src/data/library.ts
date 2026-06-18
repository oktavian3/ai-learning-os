import { DirectoryItem, RoadmapLevel, SkillCheckQuestion } from "./types";
import appendices from "./extracted-appendices.json";

export const roadmap: RoadmapLevel[] = [
  [0,"AI Literacy","Pemula total","Istilah dasar, kemampuan, batasan, dan cara verifikasi",["ChatGPT","Gemini"],"4 lesson","Punya mental model AI yang sehat","Buat peta konsep AI"],
  [1,"Basic AI Usage","Pengguna baru","Riset ringan, rangkum, email, dokumen, dan ide",["ChatGPT","NotebookLM"],"6 lesson","Bisa memakai AI untuk kerja harian","Bangun weekly work copilot"],
  [2,"Prompt Engineering","Pengguna aktif","Prompt reusable, few-shot, constraint, dan debugging",["Claude","ChatGPT"],"6 lesson","Menjadi prompt operator","Buat prompt kit untuk satu profesi"],
  [3,"AI Tools Mastery","Creator dan operator","Memilih tool berdasarkan fungsi, privasi, integrasi, biaya",["Canva","Notion","Cursor"],"5 lesson","Punya AI stack yang ramping","Audit dan susun personal AI stack"],
  [4,"Workflow Design","Freelancer dan tim","Memetakan input, proses, output, review, dan fallback",["Notion","Sheets"],"6 lesson","Menjadi workflow builder","Content workflow end-to-end"],
  [5,"Automation & API","No-code builder","Trigger, action, condition, API, webhook, JSON",["n8n","Make","Postman"],"7 lesson","Membangun automation terkontrol","Lead intake automation"],
  [6,"RAG & Knowledge Base","Builder","Embedding, retrieval, chunking, metadata, citation",["Supabase","NotebookLM"],"5 lesson","Membangun jawaban berbasis sumber","RAG chatbot dari dokumen"],
  [7,"AI Agents","Advanced builder","Goal, tools, memory, planning, permissions",["OpenAI API","LangGraph"],"6 lesson","Mendesain agent yang berguna","Research agent dengan approval"],
  [8,"Agent Orchestration","Agentic builder","Router, supervisor, handoff, tracing, eval",["LangGraph","Tracing"],"5 lesson","Mengelola sistem multi-agent","Multi-agent production pipeline"],
  [9,"Monetization & Portfolio","Freelancer dan founder","Offer, scope, pricing, delivery, case study",["Notion","Loom","GitHub"],"6 lesson","Menjual hasil, bukan hype","Productized service + case study"]
].map(([level,title,forWho,learn,tools,lessons,output,project]) => ({level,title,forWho,learn,tools,lessons,output,project} as RoadmapLevel));

export const tools: DirectoryItem[] = [
  ["ChatGPT","Chat & Research","Pemula","Freemium","Asisten generalis untuk menulis, analisis, coding, dan multimodal.",["Kuat untuk percakapan lintas tugas","Tetap perlu verifikasi untuk fakta"]],
  ["Claude","Writing","Pemula","Freemium","Cocok untuk membaca konteks panjang dan mengolah dokumen.",["Tulisan natural dan terstruktur","Ketersediaan fitur bisa berbeda per paket"]],
  ["Perplexity","Chat & Research","Pemula","Freemium","Mesin jawaban berbasis web dengan tautan sumber.",["Cepat untuk orientasi riset","Sumber tetap harus diperiksa"]],
  ["NotebookLM","RAG / Knowledge Base","Pemula","Free","Workspace riset yang berpijak pada sumber yang Anda unggah.",["Grounded pada materi sendiri","Bukan pengganti database produksi"]],
  ["Canva","Design","Pemula","Freemium","Desain dan produksi konten visual dengan fitur AI terintegrasi.",["Mudah untuk tim non-desainer","Output generik jika arah visual tipis"]],
  ["Midjourney","Design","Menengah","Paid","Generator gambar dengan kontrol gaya visual yang kuat.",["Kualitas estetis tinggi","Workflow dan lisensi perlu dipahami"]],
  ["Runway","Video","Menengah","Freemium","Pembuatan dan penyuntingan video berbasis AI.",["Cepat untuk prototipe visual","Konsistensi adegan perlu iterasi"]],
  ["ElevenLabs","Audio","Pemula","Freemium","Voice generation dan audio untuk narasi.",["Suara natural","Pastikan izin penggunaan suara"]],
  ["Notion AI","Productivity","Pemula","Paid","AI di dalam dokumen dan knowledge workspace.",["Dekat dengan dokumen tim","Terikat pada workflow Notion"]],
  ["Cursor","Coding","Menengah","Freemium","Editor kode dengan AI yang memahami codebase.",["Cepat untuk iterasi coding","Perubahan tetap perlu review dan test"]],
  ["Lovable","No-code","Pemula","Freemium","Membuat aplikasi web dari percakapan dan iterasi visual.",["Cepat untuk MVP","Arsitektur perlu diaudit sebelum skala"]],
  ["n8n","Automation","Menengah","Freemium","Workflow automation visual dengan opsi self-host.",["Fleksibel dan extensible","Butuh disiplin error handling"]],
  ["Make","Automation","Pemula","Freemium","Automation visual untuk menghubungkan banyak aplikasi.",["Canvas alur mudah dipahami","Biaya operasi perlu dipantau"]],
  ["Dify","Agents","Menengah","Freemium","Platform membangun aplikasi LLM, workflow, dan agent.",["Cepat untuk prototipe","Kustomisasi lanjut butuh pemahaman backend"]],
  ["HubSpot AI","Business / Marketing","Menengah","Paid","AI di CRM untuk marketing, sales, dan support.",["Terhubung dengan data pelanggan","Nilai optimal jika sudah memakai ekosistemnya"]],
  ["Dune","Web3 / Crypto Research","Menengah","Freemium","Analitik data on-chain dengan dashboard komunitas.",["Data transparan dan queryable","Interpretasi data tetap butuh konteks"]]
].map(([title,category,level,tag,description,details]) => ({title,category,level,tag,description,details} as DirectoryItem));

const seedPrompts: DirectoryItem[] = [
  ["Tutor dengan cek pemahaman","Learning","Pemula","Template","Pelajari topik secara bertahap, bukan sekadar diberi jawaban.",["Variabel: topik, level awal, target","Minta satu pertanyaan cek setelah tiap bagian"],"Anda adalah tutor yang sabar. Ajarkan [TOPIK] untuk orang dengan level [LEVEL]. Mulai dengan mental model sederhana, beri contoh Indonesia, lalu ajukan satu pertanyaan cek pemahaman. Jangan lanjut sebelum jawaban saya cukup tepat."],
  ["Editor Bahasa Indonesia natural","Writing","Pemula","Template","Rapikan tulisan tanpa mengubah suara penulis.",["Variabel: audiens, tone, batas panjang","Hindari bahasa korporat dan klaim kosong"],"Edit teks berikut untuk [AUDIENS]. Pertahankan makna dan suara saya. Gunakan Bahasa Indonesia natural, kalimat ringkas, dan konkret. Tandai klaim yang perlu bukti. Teks: [TEKS]"],
  ["Riset dengan matriks bukti","Research","Menengah","Template","Pisahkan fakta, inferensi, dan hal yang belum pasti.",["Variabel: pertanyaan, cakupan, tanggal","Output: tabel klaim, sumber, keyakinan"],"Bantu riset [PERTANYAAN]. Untuk setiap temuan buat tabel: klaim, bukti/sumber, tanggal, tingkat keyakinan, dan apa yang masih belum diketahui. Jangan isi celah dengan asumsi."],
  ["Satu ide jadi lima format","Content Creation","Pemula","Template","Repurpose satu insight ke beberapa channel.",["Variabel: ide, audiens, channel","Pertahankan satu pesan inti"],"Ubah [IDE] menjadi: thread 5 poin, carousel 6 slide, email singkat, skrip video 45 detik, dan CTA. Audiens: [AUDIENS]. Tone: praktis, tidak menggurui."],
  ["Campaign brief","Marketing","Menengah","Template","Susun campaign dari masalah pelanggan ke eksperimen.",["Variabel: produk, persona, channel","Output: hipotesis dan metrik"],"Buat campaign brief untuk [PRODUK]. Persona: [PERSONA]. Masalah utama: [MASALAH]. Tulis angle, pesan inti, 3 variasi hook, channel, hipotesis, metrik, dan risiko."],
  ["Decision memo","Business","Menengah","Template","Bandingkan opsi dengan trade-off jelas.",["Variabel: keputusan, opsi, constraint","Output satu rekomendasi dan alasan"],"Buat decision memo untuk [KEPUTUSAN]. Bandingkan [OPSI]. Constraint: [BATASAN]. Nilai dampak, biaya, risiko, reversibility, dan bukti. Rekomendasikan satu opsi serta kondisi yang bisa mengubah keputusan."],
  ["Code review terarah","Coding","Menengah","Template","Temukan risiko sebelum mengubah kode.",["Variabel: kode, konteks, target","Pisahkan bug, security, maintainability"],"Review kode berikut dalam konteks [KONTEKS]. Cari bug nyata, risiko security, edge case, dan masalah maintainability. Prioritaskan temuan berdasarkan dampak. Jangan tulis ulang sebelum menjelaskan penyebab. Kode: [KODE]"],
  ["Analisis data ringan","Data Analysis","Menengah","Template","Ubah data menjadi temuan yang bisa ditindaklanjuti.",["Variabel: data, keputusan","Minta cek kualitas data dulu"],"Analisis [DATA] untuk membantu keputusan [KEPUTUSAN]. Mulai dengan audit kualitas data. Lalu beri 3 temuan, bukti angkanya, kemungkinan penjelasan alternatif, dan tindakan berikutnya."],
  ["Spesifikasi automation","Automation","Lanjutan","Template","Terjemahkan proses menjadi alur yang bisa dibangun.",["Variabel: proses, aplikasi, risiko","Output trigger, steps, fallback, log"],"Ubah proses [PROSES] menjadi spesifikasi automation. Aplikasi: [TOOLS]. Tulis trigger, input schema, actions, conditions, error handling, retry, approval manusia, logging, dan test cases."],
  ["Crypto research anti-hype","Web3 Research","Menengah","Template","Analisis proyek tanpa terseret narasi pemasaran.",["Variabel: proyek, periode","Pisahkan on-chain, produk, token, risiko"],"Analisis [PROYEK] untuk periode [PERIODE]. Pisahkan data produk, penggunaan, token, treasury, kompetitor, dan risiko. Tandai sumber primer versus opini. Jangan memberi ajakan beli/jual."],
  ["Client discovery","Client Work","Pemula","Template","Ubah brief kabur menjadi scope yang bisa disepakati.",["Variabel: brief, bisnis","Output pertanyaan, asumsi, scope draft"],"Dari brief klien berikut, buat: pertanyaan discovery, asumsi yang berisiko, definisi selesai, deliverables, out-of-scope, timeline draft, dan data yang dibutuhkan. Brief: [BRIEF]"],
  ["Weekly review","Productivity","Pemula","Template","Review minggu dan pilih fokus berikutnya.",["Variabel: catatan minggu","Output keputusan, bukan daftar panjang"],"Tinjau catatan minggu saya: [CATATAN]. Kelompokkan hasil, hambatan, tugas yang sebaiknya dihapus/delegasikan, dan tiga prioritas minggu depan. Ajukan satu pertanyaan jika konteks penting belum ada."]
].map(([title,category,level,tag,description,details,action]) => ({title,category,level,tag,description,details,action} as DirectoryItem));

const seedWorkflows: DirectoryItem[] = [
  ["AI Content Creation System","Creator","Menengah","7 langkah","Dari insight, riset, brief, draft, edit, visual, sampai distribusi.",["Tools: Perplexity, Claude, Canva, Notion","Output: paket konten multi-channel","Monetisasi: content system setup"]],
  ["AI Research Report Workflow","Research","Menengah","6 langkah","Riset dengan pertanyaan, sumber primer, matriks bukti, sintesis, dan QA.",["Tools: browser, NotebookLM, Sheets","Output: report dengan jejak sumber","Monetisasi: research brief"]],
  ["AI Newsletter Workflow","Creator","Pemula","5 langkah","Kurasi sumber, pilih angle, tulis, cek fakta, dan kirim.",["Tools: RSS, ChatGPT, email platform","Output: newsletter mingguan","Monetisasi: managed newsletter"]],
  ["AI Social Media Repurposing","Marketing","Pemula","5 langkah","Ubah satu aset panjang menjadi format sosial yang konsisten.",["Tools: Claude, Canva, scheduler","Output: 7-14 konten","Monetisasi: repurpose package"]],
  ["AI Customer Support Bot","Business","Lanjutan","8 langkah","FAQ berbasis knowledge base dengan eskalasi manusia.",["Tools: Dify, docs, helpdesk","Output: bot + fallback","Monetisasi: setup dan maintenance"]],
  ["AI Lead Management","Sales","Menengah","7 langkah","Tangkap, klasifikasi, perkaya, dan arahkan lead.",["Tools: form, n8n, CRM","Output: lead routing system","Monetisasi: automation setup"]],
  ["AI SOP Generator","Operations","Pemula","5 langkah","Ubah rekaman proses menjadi SOP yang bisa diuji.",["Tools: transcription, Claude, Notion","Output: SOP + checklist","Monetisasi: ops documentation"]],
  ["AI Coding Assistant","Developer","Menengah","6 langkah","Dari requirement, plan, implementasi kecil, test, sampai review.",["Tools: Cursor, GitHub","Output: perubahan teruji","Monetisasi: prototype sprint"]],
  ["AI Crypto Research","Web3","Menengah","7 langkah","Gabungkan sumber primer, data on-chain, dan analisis risiko.",["Tools: Dune, docs, Sheets","Output: research memo","Monetisasi: community research"]],
  ["AI Personal Knowledge Base","Productivity","Menengah","6 langkah","Tangkap, rapikan, hubungkan, temukan, dan review pengetahuan.",["Tools: Notion/Obsidian, NotebookLM","Output: personal knowledge OS","Monetisasi: workspace setup"]]
].map(([title,category,level,tag,description,details]) => ({title,category,level,tag,description,details} as DirectoryItem));

const seedUseCases: DirectoryItem[] = [
  ["Asisten kerja mingguan","Individual","Pemula","Produktivitas","Mengubah catatan acak menjadi prioritas, draft, dan checklist.",["Tools: ChatGPT + calendar","Potensi: hemat waktu pribadi"]],
  ["Tutor berbasis materi kelas","Student","Pemula","Belajar","Tanya jawab dan kuis yang berpijak pada modul sendiri.",["Tools: NotebookLM","Potensi: study kit"]],
  ["Content repurposer","Creator","Menengah","Konten","Satu video panjang menjadi thread, carousel, dan newsletter.",["Tools: transcription + Claude + Canva","Potensi: layanan bulanan"]],
  ["Proposal assistant","Freelancer","Pemula","Client work","Merangkum brief dan menyusun scope tanpa mengarang kebutuhan.",["Tools: ChatGPT + template","Potensi: delivery lebih cepat"]],
  ["FAQ bot internal","Business Owner","Menengah","Support","Jawab pertanyaan operasional dari SOP dan katalog.",["Tools: Dify + docs","Potensi: setup bot"]],
  ["Campaign experiment planner","Marketer","Menengah","Marketing","Buat variasi angle dan rencana test yang terukur.",["Tools: Claude + Sheets","Potensi: campaign service"]],
  ["Codebase onboarding","Developer","Menengah","Coding","Peta arsitektur, istilah, dan alur utama untuk anggota baru.",["Tools: Cursor + docs","Potensi: dev productivity"]],
  ["Community digest","Community Manager","Pemula","Community","Ringkas percakapan menjadi update, FAQ, dan follow-up.",["Tools: export chat + AI","Potensi: community ops"]],
  ["On-chain research memo","Web3 / Crypto","Menengah","Research","Gabungkan data on-chain, docs, dan risiko secara netral.",["Tools: Dune + primary docs","Potensi: paid research"]],
  ["Admin WhatsApp ke rekap","Local Indonesian Business","Menengah","UMKM","Ubah order terstruktur menjadi sheet dan notifikasi.",["Tools: form/WhatsApp API + n8n","Potensi: automation UMKM"]]
].map(([title,category,level,tag,description,details]) => ({title,category,level,tag,description,details} as DirectoryItem));

const seedProjects: DirectoryItem[] = [
  ...["Personal Prompt Library","AI Study Assistant","AI Content Calendar","Email Assistant","Resume Analyzer"].map((title,i)=>({title,category:"Beginner",level:"Pemula" as const,tag:`${i+1}–2 hari`,description:"Project kecil untuk melatih struktur input, prompt, output, dan review.",details:["Tools: chat AI + dokumen","Output: template yang bisa dipakai ulang","Upgrade: tambah evaluasi dan UI"]})),
  ...["AI Newsletter System","AI Research Dashboard","AI Content Repurposer","AI Customer Support Bot","AI SOP Generator"].map((title,i)=>({title,category:"Intermediate",level:"Menengah" as const,tag:`${3+i} hari`,description:"Project workflow dengan beberapa langkah dan artefak nyata.",details:["Tools: AI + workspace + automation","Output: workflow terdokumentasi","Upgrade: tambah approval dan analytics"]})),
  ...["RAG Chatbot from PDF","AI Agent for Market Research","AI Agent for Content Production","AI Knowledge Base for Community","Multi-Agent Writing System","AI Crypto Research Assistant"].map((title,i)=>({title,category:"Advanced",level:"Lanjutan" as const,tag:`${1+i} minggu`,description:"Project sistem AI dengan retrieval, tools, atau orchestration.",details:["Tools: API + database + tracing","Output: demo, test set, case study","Upgrade: monitoring, auth, cost control"]}))
];

export const monetization: DirectoryItem[] = [
  ["AI Content Service","Creator & UMKM","Pemula","Mulai dari paket kecil","Jual sistem riset, produksi, dan repurpose; bukan sekadar caption massal.",["Deliverable: content brief + aset","Portfolio: 7-day content engine","Risiko: suara brand generik"]],
  ["AI Design Service","UMKM & creator","Pemula","Project-based","Produksi konsep visual, variasi, dan adaptasi format dengan human art direction.",["Deliverable: visual kit","Portfolio: mini campaign","Risiko: hak penggunaan dan konsistensi"]],
  ["AI Automation Service","Tim operasional","Menengah","Audit + build + maintenance","Petakan proses lalu hubungkan form, sheet, CRM, dan notifikasi.",["Deliverable: workflow + dokumentasi","Portfolio: lead router","Risiko: silent failure dan scope"]],
  ["Knowledge Bot Service","Bisnis & komunitas","Lanjutan","Setup + retainer","Bangun bot berbasis dokumen dengan citation dan eskalasi.",["Deliverable: bot + test set","Portfolio: FAQ bot","Risiko: data sensitif dan freshness"]],
  ["AI Education Product","Profesional niche","Menengah","Produk digital","Paketkan workflow, template, contoh, dan latihan untuk satu profesi.",["Deliverable: mini course / kit","Portfolio: cohort kecil","Risiko: materi cepat basi"]],
  ["AI Consulting","Tim yang sudah punya masalah jelas","Lanjutan","Discovery + roadmap","Audit use case, risiko, prioritas, dan rencana implementasi.",["Deliverable: decision memo","Portfolio: anonymized audit","Risiko: saran tanpa implementasi"]],
  ["AI Micro SaaS","Niche berulang","Lanjutan","Subscription / usage","Produk kecil untuk satu pekerjaan sempit dengan UX dan QA yang baik.",["Deliverable: app + support","Portfolio: working MVP","Risiko: distribusi dan unit economics"]],
  ["AI + Web3 Niche","Protocol & community","Menengah","Research / ops","Riset data, community digest, governance summary, dan content ops.",["Deliverable: research memo","Portfolio: on-chain dashboard","Risiko: hype dan konflik kepentingan"]]
].map(([title,category,level,tag,description,details]) => ({title,category,level,tag,description,details} as DirectoryItem));

const seedGlossary: DirectoryItem[] = [
  ["AI","Dasar","Pemula","Artificial Intelligence","Sistem komputer yang melakukan tugas yang biasanya butuh kecerdasan manusia.",["Analogi: payung besar untuk banyak teknik","Contoh: rekomendasi, visi komputer, chatbot","Penting: tidak semua AI adalah LLM"]],
  ["ML","Dasar","Pemula","Machine Learning","Cara membuat sistem belajar pola dari data, bukan hanya aturan manual.",["Analogi: belajar dari banyak contoh","Contoh: deteksi spam","Penting: kualitas data membentuk hasil"]],
  ["GenAI","Dasar","Pemula","Generative AI","AI yang menghasilkan konten baru seperti teks, gambar, audio, atau kode.",["Analogi: mesin pola kreatif","Contoh: draft email","Penting: output bisa meyakinkan tetapi salah"]],
  ["LLM","Model","Pemula","Large Language Model","Model bahasa besar yang memprediksi token berikutnya dari konteks.",["Analogi: autocomplete sangat canggih","Contoh: ChatGPT","Penting: bukan database fakta"]],
  ["Token","Model","Pemula","Unit teks","Potongan teks yang dibaca dan dihasilkan model.",["Analogi: kepingan kata","Contoh: satu kata bisa beberapa token","Penting: memengaruhi biaya dan konteks"]],
  ["Context window","Model","Pemula","Batas konteks","Jumlah token yang dapat diproses model dalam satu interaksi.",["Analogi: meja kerja terbatas","Contoh: dokumen panjang","Penting: informasi bisa terlewat"]],
  ["Prompt","Prompting","Pemula","Instruksi ke AI","Input yang memberi tujuan, konteks, dan format output.",["Analogi: brief kerja","Contoh: ringkas report untuk CEO","Penting: konteks lebih penting dari kata ajaib"]],
  ["System prompt","Prompting","Menengah","Aturan tingkat sistem","Instruksi awal yang mengatur perilaku dan batas asisten.",["Analogi: SOP sebelum tugas masuk","Contoh: aturan tone dan safety","Penting: bukan pertahanan tunggal"]],
  ["Embedding","RAG","Menengah","Representasi numerik makna","Vektor angka yang membantu mesin membandingkan kemiripan semantik.",["Analogi: koordinat makna","Contoh: mencari paragraf relevan","Penting: fondasi retrieval"]],
  ["Vector database","RAG","Menengah","Penyimpanan vektor","Database untuk menyimpan dan mencari embedding.",["Analogi: katalog berdasarkan kemiripan","Contoh: pencarian dokumen","Penting: retrieval cepat"]],
  ["RAG","RAG","Menengah","Retrieval-Augmented Generation","Mengambil sumber relevan sebelum model menjawab.",["Analogi: buka buku sebelum menjawab","Contoh: bot SOP","Penting: mengurangi jawaban tanpa dasar"]],
  ["Fine-tuning","Model","Lanjutan","Pelatihan lanjutan","Menyesuaikan perilaku model dengan contoh khusus.",["Analogi: pelatihan spesialis","Contoh: gaya output konsisten","Penting: beda fungsi dari RAG"]],
  ["Inference","Model","Menengah","Saat model dijalankan","Proses menghasilkan output dari model yang sudah dilatih.",["Analogi: jam kerja setelah pelatihan","Contoh: memproses prompt","Penting: menentukan latency dan biaya"]],
  ["API","Builder","Menengah","Antarmuka aplikasi","Cara terstruktur agar software saling meminta data atau tindakan.",["Analogi: loket dengan formulir baku","Contoh: kirim prompt dari aplikasi","Penting: fondasi integrasi"]],
  ["Webhook","Builder","Menengah","Notifikasi event","Pesan otomatis saat suatu kejadian terjadi.",["Analogi: bel pintu digital","Contoh: order baru memicu workflow","Penting: automation real-time"]],
  ["Function calling","Agent","Lanjutan","Pemanggilan fungsi terstruktur","Model memilih fungsi dan mengisi parameter sesuai schema.",["Analogi: mengisi formulir untuk operator","Contoh: cek stok","Penting: aksi lebih terkontrol"]],
  ["Tool calling","Agent","Lanjutan","Penggunaan alat","Kemampuan model meminta tool eksternal untuk mencari atau bertindak.",["Analogi: asisten memakai kalkulator","Contoh: query database","Penting: perlu permission"]],
  ["MCP","Agent","Lanjutan","Model Context Protocol","Protokol untuk menghubungkan aplikasi AI dengan tools dan konteks.",["Analogi: colokan standar","Contoh: akses repo atau database","Penting: mengurangi integrasi khusus"]],
  ["Agent","Agent","Lanjutan","Sistem AI berorientasi tujuan","Model yang mengamati, memutuskan, memakai tools, dan mengevaluasi langkah.",["Analogi: operator dengan SOP dan alat","Contoh: research agent","Penting: agency menambah risiko"]],
  ["Memory","Agent","Lanjutan","Ingatan sistem","Mekanisme menyimpan informasi relevan lintas langkah atau sesi.",["Analogi: catatan kerja","Contoh: preferensi pengguna","Penting: privasi dan relevansi"]],
  ["Orchestration","Agent","Lanjutan","Koordinasi komponen","Pengaturan alur antar-model, tools, data, dan approval.",["Analogi: konduktor orkestra","Contoh: router ke spesialis","Penting: mengelola kompleksitas"]],
  ["Multimodal","Model","Pemula","Banyak jenis media","Model yang memahami atau menghasilkan teks, gambar, audio, atau video.",["Analogi: lebih dari satu indera","Contoh: menjelaskan foto","Penting: input lebih kaya"]],
  ["Hallucination","Safety","Pemula","Jawaban tanpa dasar","Output salah atau dibuat-buat tetapi terdengar meyakinkan.",["Analogi: improvisasi saat lupa","Contoh: sumber palsu","Penting: selalu verifikasi klaim penting"]],
  ["Guardrails","Safety","Menengah","Batas pengaman","Aturan dan kontrol sebelum, selama, atau setelah output AI.",["Analogi: pagar dan rem","Contoh: filter data sensitif","Penting: pertahanan berlapis"]],
  ["Eval","Safety","Menengah","Evaluasi sistematis","Test dan ukuran untuk melihat apakah sistem AI bekerja sesuai kebutuhan.",["Analogi: ujian dengan rubric","Contoh: set pertanyaan tetap","Penting: perbaikan berbasis bukti"]],
  ["Benchmark","Safety","Menengah","Set pembanding","Kumpulan tugas standar untuk membandingkan performa.",["Analogi: lintasan uji yang sama","Contoh: coding benchmark","Penting: tidak selalu mewakili kasus nyata"]],
  ["Latency","Builder","Menengah","Waktu respons","Jeda dari permintaan sampai hasil tersedia.",["Analogi: waktu tunggu layanan","Contoh: respons 2 detik","Penting: memengaruhi UX dan biaya"]],
  ["Open-source model","Model","Menengah","Model berbobot terbuka","Model yang bobot atau kodenya tersedia dengan lisensi tertentu.",["Analogi: mesin yang bisa di-host sendiri","Contoh: model lokal","Penting: kontrol lebih besar, operasi lebih berat"]],
  ["Closed-source model","Model","Menengah","Model proprietary","Model yang detail internalnya tidak dibuka dan biasanya dipakai via layanan.",["Analogi: mesin sebagai jasa","Contoh: API komersial","Penting: mudah dipakai, kontrol lebih sedikit"]]
].map(([title,category,level,tag,description,details]) => ({title,category,level,tag,description,details} as DirectoryItem));

const promptCategory=(title:string) => /riset|anal/i.test(title)?"Research":/content|thread|video|newsletter/i.test(title)?"Content Creation":/client|proposal|marketing|persona/i.test(title)?"Business":"Productivity";

export const prompts:DirectoryItem[] = appendices.prompts.map(item=>({
  title:item.title,category:promptCategory(item.title),level:"Pemula",tag:"Dari materi course",
  description:"Template dari Prompt Library di dokumen materi lengkap. Tinggal isi bagian yang memakai tanda kurung.",
  details:["Mulai dengan konteks yang nyata","Ubah format output sesuai kebutuhan","Periksa fakta dan hasil akhirnya"],action:item.template,
}));

export const workflows:DirectoryItem[] = appendices.workflows.map(item=>({
  title:item.title,category:item.audience.split(",")[0]||"Workflow",level:/agent|rag|automation/i.test(item.title)?"Lanjutan":"Menengah",tag:`${item.steps.split(/->|→/).length} langkah`,
  description:`Alur siap pakai untuk ${item.audience.toLowerCase()}. Mulai manual, cek hasilnya, lalu otomasi jika sudah stabil.`,
  details:[`Langkah: ${item.steps}`,`Cocok untuk: ${item.audience}`,"Output: workflow yang bisa diulang dan diperiksa"],
}));

export const useCases:DirectoryItem[] = appendices.useCases.map(item=>({
  title:item.title,category:item.category,level:/Developer|Web3|Bisnis/i.test(item.category)?"Menengah":"Pemula",tag:"Use case",
  description:`Contoh penggunaan AI untuk membantu ${item.title.toLowerCase()} tanpa menghilangkan pengecekan manusia.`,
  details:["Mulai dari satu contoh nyata","Tentukan hasil yang ingin dibuat","Cek kualitas sebelum dipakai","Bisa dikembangkan menjadi workflow"],
}));

const sourceProjects:DirectoryItem[] = appendices.projects.map(item=>({
  title:item.title,category:item.level,level:item.level==="Advanced"?"Lanjutan":item.level==="Intermediate"?"Menengah":"Pemula",tag:"Dari project bank",
  description:item.description,details:["Mulai dari versi paling kecil","Tes dengan beberapa contoh","Dokumentasikan hasilnya sebagai case study"],
}));
export const projects:DirectoryItem[] = Array.from(new Map([...sourceProjects,...seedProjects].map(item=>[item.title.toLowerCase(),item])).values());

export const glossary:DirectoryItem[] = [...seedGlossary];
for(const item of appendices.glossary){if(!glossary.some(entry=>entry.title.toLowerCase()===item.title.toLowerCase()))glossary.push({title:item.title,category:"Dari materi",level:"Pemula",tag:"Istilah AI",description:item.definition,details:["Baca definisinya dengan pelan","Cari satu contoh di pekerjaanmu","Coba jelaskan lagi dengan bahasamu sendiri"]})}

export const skillQuestions: SkillCheckQuestion[] = [
  "Kalau AI memberi fakta penting, apa yang kamu lakukan?","Bisa membuat prompt yang dipakai ulang?","Pernah memecah tugas menjadi input, proses, dan output?","Sudah paham trigger, action, dan condition?","Pernah memakai API atau webhook?","Bisa menjelaskan RAG dengan bahasamu sendiri?","Pernah membuat agent yang memakai tool?","Bagaimana kamu mengecek kualitas output AI?","Pernah membangun workflow dengan beberapa langkah?","Punya project AI yang bisa kamu demokan?"
].map((question) => ({question, options:[{label:"Belum pernah",score:0},{label:"Sedikit / dengan panduan",score:1},{label:"Bisa mandiri",score:2},{label:"Bisa menjelaskan ke orang lain",score:3}]}));
