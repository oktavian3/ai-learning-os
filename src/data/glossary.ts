import {DirectoryItem} from "./types";

type TermSpec=[string,string,string[]];
type GlossaryGroup={context:string;analogy:string;example:string;why:string;mistake:string;terms:TermSpec[]};

const groups:Record<string,GlossaryGroup>={
  "Dasar AI":{context:"Istilah ini menjelaskan fondasi bagaimana sistem belajar dari data dan membuat keputusan.",analogy:"Bayangkan seperti proses belajar dari banyak contoh sebelum mengerjakan soal baru",example:"dipakai saat membangun sistem prediksi, rekomendasi, atau pengelompokan data",why:"membantu kamu membedakan kemampuan AI yang nyata dari klaim pemasaran",mistake:"menganggap semua sistem AI bekerja seperti chatbot",terms:[
    ["AI","Teknologi yang membuat mesin melakukan tugas yang biasanya membutuhkan kemampuan manusia.",["Machine Learning","Model","Prediction"]],
    ["Machine Learning","Cabang AI yang mempelajari pola dari data untuk membuat prediksi atau keputusan.",["Dataset","Training Data","Model"]],
    ["Deep Learning","Jenis machine learning yang memakai neural network berlapis untuk mempelajari pola kompleks.",["Neural Network","Machine Learning","Training Data"]],
    ["Neural Network","Struktur komputasi berlapis yang mengubah input menjadi output melalui bobot yang dipelajari.",["Deep Learning","Parameter","Model"]],
    ["Dataset","Kumpulan data terstruktur yang dipakai untuk melatih, menguji, atau mengevaluasi sistem.",["Training Data","Model","Benchmark"]],
    ["Training Data","Bagian dataset yang digunakan model untuk mempelajari pola.",["Dataset","Training","Bias"]],
    ["Model","Hasil proses training yang dapat menerima input dan menghasilkan prediksi atau output.",["Training Data","Inference","Parameter"]],
    ["Prediction","Perkiraan output yang dibuat model berdasarkan pola yang telah dipelajari.",["Model","Classification","Regression"]],
    ["Classification","Tugas memilih kategori untuk sebuah input, misalnya spam atau bukan spam.",["Prediction","Dataset","Regression"]],
    ["Regression","Tugas memperkirakan nilai numerik, misalnya permintaan atau waktu pengiriman.",["Prediction","Machine Learning","Classification"]]
  ]},
  "GenAI & LLM":{context:"Istilah ini berkaitan dengan model yang menghasilkan teks, gambar, suara, atau media baru.",analogy:"Bayangkan mesin pola yang menyusun jawaban baru dari pola yang pernah dipelajari",example:"muncul saat membuat draft, gambar, voiceover, ringkasan, atau analisis dokumen",why:"membantu memilih model dan memahami batas input, biaya, serta kualitas output",mistake:"menganggap output generatif selalu merupakan fakta yang diambil dari database",terms:[
    ["Generative AI","AI yang menghasilkan konten baru seperti teks, gambar, audio, video, atau kode.",["Foundation Model","LLM","Multimodal"]],
    ["Foundation Model","Model besar yang dilatih untuk banyak tugas dan dapat diadaptasi ke berbagai aplikasi.",["LLM","Fine-tuning","Generative AI"]],
    ["LLM","Model bahasa besar yang memprediksi token berikutnya berdasarkan konteks.",["Token","Context Window","Parameter"]],
    ["Token","Potongan teks yang dibaca dan dihasilkan model; satu kata bisa terdiri dari beberapa token.",["LLM","Context Window","Cost per Token"]],
    ["Context Window","Batas jumlah token yang dapat diproses model dalam satu interaksi.",["Token","Context Engineering","LLM"]],
    ["Parameter","Nilai internal model yang berubah selama training dan membentuk perilakunya.",["Model","Training Data","LoRA"]],
    ["Inference","Proses menjalankan model yang sudah dilatih untuk menghasilkan output.",["Model","Latency","Inference Server"]],
    ["Multimodal","Kemampuan model memahami atau menghasilkan lebih dari satu jenis media.",["Vision Model","Text-to-Speech","Generative AI"]],
    ["Text-to-Image","Teknologi yang menghasilkan gambar dari instruksi teks.",["Generative AI","Multimodal","Vision Model"]],
    ["Text-to-Speech","Teknologi yang mengubah teks tertulis menjadi suara sintetis.",["Speech-to-Text","Multimodal","Generative AI"]],
    ["Speech-to-Text","Teknologi yang mengubah ucapan menjadi teks atau transkrip.",["Text-to-Speech","Multimodal","Audio Model"]],
    ["Vision Model","Model yang dapat memahami gambar atau video, misalnya objek, teks, dan hubungan visual.",["Multimodal","Text-to-Image","Foundation Model"]]
  ]},
  "Prompting":{context:"Istilah ini menjelaskan cara memberi instruksi dan konteks agar output model lebih terarah.",analogy:"Prompt mirip brief kerja: hasilnya membaik saat tujuan, bahan, batas, dan contoh jelas",example:"digunakan saat meminta model menulis, menganalisis, mengubah format, atau memakai tool",why:"membuat penggunaan AI lebih konsisten dan mudah diuji",mistake:"mencari satu kalimat ajaib tanpa memperbaiki konteks dan contoh",terms:[
    ["Prompt","Instruksi atau input yang diberikan kepada model untuk menghasilkan respons.",["System Prompt","User Prompt","Prompt Template"]],
    ["System Prompt","Instruksi tingkat sistem yang mengatur peran, aturan, dan batas perilaku model.",["User Prompt","Guardrails","Prompt Injection"]],
    ["User Prompt","Permintaan langsung dari pengguna dalam sebuah percakapan dengan model.",["System Prompt","Prompt","Context Window"]],
    ["Few-shot Prompting","Teknik memberi beberapa contoh input dan output agar model mengikuti pola.",["Zero-shot Prompting","Prompt Template","Structured Output"]],
    ["Zero-shot Prompting","Meminta model mengerjakan tugas tanpa memberikan contoh output.",["Few-shot Prompting","Prompt","LLM"]],
    ["Chain-of-Thought","Rangkaian langkah penalaran internal atau eksplisit untuk memecahkan tugas kompleks.",["Prompt","Planner Agent","Reasoning Model"]],
    ["Prompt Template","Kerangka prompt yang dapat dipakai ulang dengan variabel yang diganti.",["Prompt Library","Structured Output","Few-shot Prompting"]],
    ["Context Engineering","Proses menyusun instruksi, sumber, memory, tools, dan state yang masuk ke model.",["Context Window","RAG","System Prompt"]],
    ["Structured Output","Output yang mengikuti schema atau struktur tetap agar mudah diproses aplikasi.",["JSON Output","Output Validation","Function Calling"]],
    ["JSON Output","Structured output dalam format JSON dengan key dan tipe data yang ditentukan.",["Structured Output","API","Output Validation"]],
    ["Prompt Library","Kumpulan prompt teruji yang disimpan bersama tujuan, variabel, dan contoh penggunaan.",["Prompt Template","Eval","Context Engineering"]]
  ]},
  "RAG & Knowledge Base":{context:"Istilah ini berkaitan dengan cara mengambil informasi dari dokumen sebelum model menjawab.",analogy:"Seperti membuka buku dan menemukan halaman relevan sebelum menjawab pertanyaan",example:"dipakai pada chatbot SOP, tutor berbasis materi, atau pencarian dokumen perusahaan",why:"membuat jawaban lebih terhubung dengan sumber yang dapat diperiksa",mistake:"menganggap memasukkan semua PDF otomatis menghasilkan knowledge base yang akurat",terms:[
    ["RAG","Teknik mengambil sumber relevan lalu memberikannya ke model sebelum jawaban dibuat.",["Retrieval","Embedding","Grounding"]],
    ["Embedding","Representasi angka yang menangkap kemiripan makna sebuah teks atau objek.",["Vector Database","Semantic Search","Retrieval"]],
    ["Vector Database","Database yang menyimpan dan mencari embedding berdasarkan kemiripan.",["Embedding","Semantic Search","Knowledge Base"]],
    ["Chunking","Proses membagi dokumen menjadi bagian kecil yang dapat dicari dan dimasukkan ke konteks.",["Retrieval","Embedding","Context Window"]],
    ["Retrieval","Proses menemukan bagian sumber yang paling relevan dengan sebuah pertanyaan.",["RAG","Re-ranking","Semantic Search"]],
    ["Re-ranking","Tahap mengurutkan ulang hasil retrieval agar bagian terbaik berada di atas.",["Retrieval","RAG","Semantic Search"]],
    ["Semantic Search","Pencarian berdasarkan kemiripan makna, bukan hanya kata yang sama.",["Embedding","Vector Database","Retrieval"]],
    ["Knowledge Base","Kumpulan informasi terkelola yang menjadi sumber jawaban atau pencarian.",["RAG","Document QA","Grounding"]],
    ["Grounding","Mengikat jawaban model pada sumber atau data tertentu yang diberikan.",["Citation","RAG","Hallucination"]],
    ["Citation","Penanda sumber yang menunjukkan dari mana klaim atau jawaban berasal.",["Grounding","Document QA","Source"]],
    ["Document QA","Sistem tanya-jawab yang menggunakan dokumen sebagai sumber utama.",["RAG","Knowledge Base","Citation"]]
  ]},
  "AI Agent":{context:"Istilah ini menjelaskan sistem AI yang merencanakan langkah, memakai tools, dan mengelola state.",analogy:"Seperti operator dengan tujuan, SOP, alat kerja, catatan, dan batas wewenang",example:"digunakan untuk riset bertahap, triage support, atau workflow yang membutuhkan beberapa keputusan",why:"membantu membedakan agent yang berguna dari chatbot dengan label baru",mistake:"memberi agent terlalu banyak akses tanpa approval, logging, dan batas biaya",terms:[
    ["AI Agent","AI yang gak cuma jawab, tapi bisa menjalankan tugas lewat beberapa langkah dan memakai tools.",["Tool Calling","Memory","Agentic Workflow"]],
    ["Agentic Workflow","Workflow yang memberi model ruang untuk memilih langkah berikutnya dalam batas tertentu.",["AI Agent","Human-in-the-loop","Agent Orchestration"]],
    ["Tool Calling","Kemampuan model memilih dan meminta penggunaan tool eksternal.",["Function Calling","MCP","AI Agent"]],
    ["Function Calling","Cara model mengisi nama fungsi dan argumen sesuai schema terstruktur.",["Tool Calling","Structured Output","API"]],
    ["Memory","Mekanisme menyimpan informasi yang relevan lintas langkah atau sesi.",["Context Window","AI Agent","Knowledge Base"]],
    ["Planner Agent","Agent yang memecah tujuan menjadi rencana atau sub-tugas.",["Executor Agent","Chain-of-Thought","Agent Orchestration"]],
    ["Executor Agent","Agent yang menjalankan langkah atau tool berdasarkan rencana yang tersedia.",["Planner Agent","Tool Calling","AI Agent"]],
    ["Multi-Agent System","Sistem yang mengoordinasikan beberapa agent dengan peran berbeda.",["Agent Orchestration","Planner Agent","Executor Agent"]],
    ["Agent Orchestration","Pengaturan alur, state, handoff, dan evaluasi antar-agent atau tools.",["Multi-Agent System","LangGraph","Human-in-the-loop"]],
    ["Human-in-the-loop","Titik kontrol yang meminta manusia meninjau atau menyetujui keputusan AI.",["Guardrails","AI Agent","Output Validation"]],
    ["MCP","Model Context Protocol, standar untuk menghubungkan aplikasi AI dengan tools dan sumber konteks.",["Tool Calling","API","AI Agent"]],
    ["LangGraph","Framework untuk membuat workflow agent berbasis graph dan state.",["Agent Orchestration","AI Agent","CrewAI"]],
    ["CrewAI","Framework untuk mengatur beberapa agent berbasis peran dan tugas.",["Multi-Agent System","LangGraph","Agent Orchestration"]]
  ]},
  "Automation & API":{context:"Istilah ini menjelaskan bagaimana aplikasi saling bertukar data dan menjalankan proses otomatis.",analogy:"Seperti jalur kerja digital: ada pemicu, aturan, tindakan, dan catatan hasil",example:"dipakai untuk memindahkan data form ke CRM, mengirim notifikasi, atau menjalankan jadwal",why:"membantu membangun integrasi yang dapat dipantau dan dirawat",mistake:"mengotomasi proses yang belum jelas tanpa error handling dan fallback",terms:[
    ["API","Antarmuka terstruktur yang memungkinkan dua aplikasi meminta data atau tindakan.",["Webhook","Function Calling","Rate Limit"]],
    ["Webhook","Pesan otomatis yang dikirim ketika suatu event terjadi.",["API","Trigger","Payload"]],
    ["Trigger","Peristiwa yang memulai sebuah workflow otomatis.",["Action","Webhook","Scheduler"]],
    ["Action","Langkah yang dijalankan setelah trigger atau kondisi terpenuhi.",["Trigger","Workflow Automation","API"]],
    ["Scheduler","Komponen yang menjalankan proses pada waktu atau interval tertentu.",["Trigger","Workflow Automation","Cron"]],
    ["Workflow Automation","Rangkaian langkah otomatis yang memindahkan atau mengolah data antar-sistem.",["Trigger","Action","n8n"]],
    ["n8n","Platform workflow automation visual dengan opsi self-host dan logic fleksibel.",["Make","Zapier","Webhook"]],
    ["Zapier","Platform automation untuk menghubungkan aplikasi melalui trigger dan action.",["Make","n8n","Workflow Automation"]],
    ["Make","Platform automation visual untuk membangun scenario dan memetakan aliran data.",["n8n","Zapier","API"]],
    ["Database","Sistem penyimpanan data terstruktur yang dapat dibaca dan diperbarui aplikasi.",["API","CRM","Vector Database"]],
    ["CRM","Sistem untuk menyimpan dan mengelola hubungan, aktivitas, serta data pelanggan.",["Database","Workflow Automation","Lead Scoring"]],
    ["Google Sheets Automation","Penggunaan script atau workflow untuk membaca dan memperbarui spreadsheet secara otomatis.",["Workflow Automation","API","Database"]]
  ]},
  "Model & Infrastructure":{context:"Istilah ini berhubungan dengan cara model dilatih, dijalankan, di-host, dan diukur biayanya.",analogy:"Seperti memilih mesin, tempat menjalankannya, jalur traffic, dan biaya bahan bakar",example:"muncul saat memilih deployment, mengatur kapasitas, atau menekan biaya aplikasi AI",why:"membantu builder mengambil keputusan teknis yang sesuai skala dan risiko",mistake:"memilih model hanya dari benchmark tanpa menguji latency, biaya, dan data sendiri",terms:[
    ["Fine-tuning","Pelatihan lanjutan untuk menyesuaikan perilaku model dengan contoh khusus.",["LoRA","Training Data","Foundation Model"]],
    ["LoRA","Teknik fine-tuning ringan yang melatih sebagian kecil parameter tambahan.",["Fine-tuning","Parameter","Open-source Model"]],
    ["Open-source Model","Model dengan bobot atau kode yang tersedia sesuai lisensi tertentu.",["Closed-source Model","Local Model","Fine-tuning"]],
    ["Closed-source Model","Model proprietary yang detail internalnya tidak dibuka dan biasanya diakses sebagai layanan.",["Open-source Model","Cloud Model","API"]],
    ["Local Model","Model yang dijalankan pada perangkat atau server yang dikendalikan sendiri.",["Cloud Model","GPU","Inference Server"]],
    ["Cloud Model","Model yang dijalankan melalui infrastruktur penyedia cloud atau API.",["Local Model","API","Rate Limit"]],
    ["Model Routing","Pemilihan model secara dinamis berdasarkan jenis tugas, biaya, atau latency.",["Model","Latency","Cost per Token"]],
    ["Latency","Waktu tunggu dari permintaan dikirim sampai respons tersedia.",["Inference","Rate Limit","Inference Server"]],
    ["Rate Limit","Batas jumlah permintaan atau token dalam periode tertentu.",["API","Latency","Throughput"]],
    ["Cost per Token","Biaya penggunaan model yang dihitung berdasarkan jumlah token input atau output.",["Token","Model Routing","Inference"]],
    ["GPU","Perangkat komputasi paralel yang banyak dipakai untuk training dan inference model.",["Inference Server","Training","Local Model"]],
    ["Inference Server","Layanan yang memuat model dan menangani permintaan inference.",["GPU","Latency","Cloud Model"]]
  ]},
  "Safety & Evaluation":{context:"Istilah ini menjelaskan risiko AI dan cara menguji apakah sistem bekerja dengan aman.",analogy:"Seperti quality control, pagar pengaman, dan uji tabrak sebelum produk dipakai",example:"dipakai saat membuat test set, aturan data, validasi output, dan simulasi serangan",why:"mencegah output meyakinkan tetapi salah, berbahaya, atau membocorkan data",mistake:"mengandalkan satu filter dan menganggap sistem sudah aman",terms:[
    ["Hallucination","Output AI yang salah atau tidak berdasar tetapi terdengar meyakinkan.",["Grounding","RAG","Eval"]],
    ["Bias","Pola ketidakadilan atau kecenderungan sistem yang berasal dari data, desain, atau penggunaan.",["Training Data","Red Teaming","Eval"]],
    ["Guardrails","Aturan dan kontrol yang membatasi input, output, tool, atau tindakan sistem AI.",["Moderation","Output Validation","Human-in-the-loop"]],
    ["Prompt Injection","Instruksi berbahaya yang mencoba mengubah aturan model atau menyalahgunakan akses tool.",["System Prompt","Guardrails","Tool Calling"]],
    ["Data Privacy","Praktik melindungi data pribadi atau rahasia sepanjang proses AI.",["PII","Data Retention","Access Control"]],
    ["PII","Personally Identifiable Information, data yang dapat mengidentifikasi seseorang.",["Data Privacy","Moderation","Redaction"]],
    ["Eval","Pengujian sistematis terhadap kualitas, keamanan, atau perilaku sistem AI.",["Benchmark","Test Set","Output Validation"]],
    ["Benchmark","Kumpulan tugas standar untuk membandingkan performa model atau sistem.",["Eval","Dataset","Model"]],
    ["Red Teaming","Pengujian dengan mencoba menemukan cara sistem gagal atau disalahgunakan.",["Prompt Injection","Guardrails","Safety"]],
    ["Output Validation","Pemeriksaan apakah output sesuai schema, aturan bisnis, dan batas keamanan.",["Structured Output","Guardrails","Moderation"]],
    ["Moderation","Proses mendeteksi atau menangani konten yang melanggar kebijakan.",["Guardrails","Data Privacy","Output Validation"]]
  ]},
  "Builder Tools":{context:"Istilah ini berkaitan dengan alat yang dipakai untuk membuat, menguji, dan memantau aplikasi AI.",analogy:"Seperti kotak peralatan workshop: tiap alat punya fungsi dan batas yang berbeda",example:"digunakan saat menulis kode, mencoba API, melacak agent, atau melakukan deployment",why:"membantu memilih tool berdasarkan pekerjaan, bukan tren",mistake:"menambah tool baru tanpa owner, dokumentasi, dan kebutuhan yang jelas",terms:[
    ["SDK","Kumpulan library dan alat untuk memakai layanan tertentu dari kode.",["API","CLI","Framework"]],
    ["CLI","Command-line interface untuk menjalankan perintah melalui terminal.",["SDK","IDE","Deployment"]],
    ["IDE","Aplikasi untuk menulis, menjalankan, dan men-debug kode.",["CLI","SDK","Coding Assistant"]],
    ["No-code Builder","Alat membuat aplikasi atau workflow tanpa menulis banyak kode.",["Low-code","Workflow Automation","API"]],
    ["Low-code","Pendekatan visual yang tetap memberi ruang untuk menambahkan kode khusus.",["No-code Builder","SDK","Automation"]],
    ["Observability","Kemampuan melihat kondisi sistem melalui log, metric, dan trace.",["Tracing","Latency","Eval"]],
    ["Tracing","Rekaman langkah, input, output, dan tool call dalam workflow AI.",["Observability","AI Agent","Eval"]],
    ["Sandbox","Lingkungan terisolasi untuk menjalankan kode atau tool dengan risiko terbatas.",["Guardrails","Deployment","Security"]],
    ["Deployment","Proses menempatkan aplikasi agar dapat digunakan di lingkungan target.",["Cloud Model","Inference Server","Observability"]],
    ["Playground","Antarmuka eksperimen untuk mencoba model, prompt, dan parameter sebelum integrasi.",["Prompt","API","Eval"]]
  ]},
  "Business & Monetization":{context:"Istilah ini menjelaskan peran, layanan, dan bukti kerja dalam bisnis berbasis AI.",analogy:"Seperti mengubah kemampuan teknis menjadi paket hasil yang bisa dipahami dan dibeli",example:"muncul saat menyusun offer, delivery, portfolio, dan audit workflow",why:"membantu menjual outcome nyata, bukan sekadar label AI",mistake:"menjanjikan hasil besar tanpa scope, proof, dan proses quality assurance",terms:[
    ["AI Operator","Orang yang memakai AI secara terstruktur untuk menyelesaikan pekerjaan sehari-hari.",["Prompt Library","AI Tool Stack","Workflow Automation"]],
    ["AI Automation Specialist","Praktisi yang memetakan proses dan membangun automation berbasis AI.",["n8n","Workflow Audit","API"]],
    ["AI Consultant","Profesional yang membantu organisasi memilih use case, risiko, dan roadmap AI.",["AI Workflow Audit","AI Tool Stack","Productized Service"]],
    ["Productized Service","Layanan dengan scope, deliverable, proses, dan harga yang dibuat konsisten.",["AI Consultant","Deliverables","Starter Package"]],
    ["AI Workflow Audit","Pemeriksaan proses untuk menemukan peluang, risiko, dan prioritas penggunaan AI.",["Workflow Automation","AI Consultant","Process Map"]],
    ["AI Chatbot Service","Layanan membangun dan merawat chatbot berbasis knowledge atau workflow.",["RAG","Knowledge Base","Productized Service"]],
    ["AI Content System","Sistem riset, produksi, review, distribusi, dan analisis konten berbantuan AI.",["Prompt Library","Workflow Automation","Content Strategy"]],
    ["AI Tool Stack","Kumpulan tool AI yang dipilih untuk fungsi dan workflow tertentu.",["AI Operator","Tool Audit","Integration"]],
    ["AI Portfolio","Kumpulan project dan case study yang membuktikan kemampuan membangun atau memakai AI.",["Capstone Project","Case Study","AI Operator"]],
    ["Capstone Project","Project akhir yang menggabungkan beberapa kemampuan menjadi solusi utuh.",["AI Portfolio","RAG","Workflow Automation"]]
  ]}
};

export const glossary:DirectoryItem[]=Object.entries(groups).flatMap(([category,group])=>group.terms.map(([term,definition,related],index)=>({
  title:term,category,level:category==="Dasar AI"||category==="GenAI & LLM"?"Pemula":"Menengah",tag:"Istilah AI",description:definition,
  details:[`Nyambung ke: ${related.join(", ")}`],sections:[
    {title:"Definisi sederhana",content:definition},{title:"Penjelasan tanpa jargon",content:`${definition} Biasanya istilah ini ${group.example}.`},
    {title:"Analogi",content:`${group.analogy}. ${term} kurang lebih bekerja di bagian yang ${index%2===0?"ngatur alurnya":"ngolah informasinya"}.`},
    {title:"Contoh penggunaan",content:`Contoh paling gampang: ${term} ${group.example}.`},{title:"Kenapa penting",content:`Kalau paham ${term}, kamu ${group.why}.`},
    {title:"Istilah terkait",content:related},{title:"Kesalahan pemula",content:`Yang sering bikin keliru: ${group.mistake}. ${term} juga beda dengan ${related[0]}.`}
  ]
})));
