import {DirectoryItem} from "./types";

type TermSpec=[string,string,string[]];
type GlossaryGroup={terms:TermSpec[]};

const groups:Record<string,GlossaryGroup>={
  "Dasar AI":{terms:[
    ["AI","Teknologi yang membuat mesin melakukan tugas yang biasanya membutuhkan kemampuan manusia.",["Machine Learning","Model","Prediction"]],
    ["Machine Learning","Cabang AI yang mempelajari pola dari data untuk membuat prediksi atau keputusan.",["Dataset","Training Data","Model"]],
    ["Deep Learning","Jenis machine learning yang memakai neural network berlapis untuk mempelajari pola kompleks.",["Neural Network","Machine Learning","Training Data"]],
    ["Neural Network","Struktur komputasi berlapis yang mengubah input menjadi output melalui bobot yang dipelajari.",["Deep Learning","Parameter","Model"]],
    ["Dataset","Kumpulan data terstruktur yang dipakai untuk melatih, menguji, atau mengevaluasi sistem.",["Training Data","Model","Benchmark"]],
    ["Training Data","Bagian dataset yang digunakan model untuk mempelajari pola.",["Dataset","Training","Bias"]],
    ["Model","Hasil proses training yang menerima input lalu menghasilkan prediksi atau output.",["Training Data","Inference","Parameter"]],
    ["Prediction","Perkiraan output yang dibuat model berdasarkan pola yang telah dipelajari.",["Model","Classification","Regression"]],
    ["Classification","Tugas memilih kategori untuk sebuah input, misalnya spam atau bukan spam.",["Prediction","Dataset","Regression"]],
    ["Regression","Tugas memperkirakan nilai numerik, misalnya permintaan atau waktu pengiriman.",["Prediction","Machine Learning","Classification"]]
  ]},
  "GenAI & LLM":{terms:[
    ["Generative AI","AI yang menghasilkan konten baru seperti teks, gambar, audio, video, atau kode.",["Foundation Model","LLM","Multimodal"]],
    ["Foundation Model","Model besar yang dilatih untuk banyak tugas dan bisa disesuaikan untuk beragam aplikasi.",["LLM","Fine-tuning","Generative AI"]],
    ["LLM","Model bahasa besar yang memprediksi token berikutnya berdasarkan konteks.",["Token","Context Window","Parameter"]],
    ["Token","Potongan teks yang dibaca dan dihasilkan model; satu kata bisa terdiri dari beberapa token.",["LLM","Context Window","Cost per Token"]],
    ["Context Window","Batas jumlah token yang bisa diproses model dalam satu interaksi.",["Token","Context Engineering","LLM"]],
    ["Parameter","Nilai internal model yang berubah selama training dan membentuk perilakunya.",["Model","Training Data","LoRA"]],
    ["Inference","Proses menjalankan model yang sudah dilatih untuk menghasilkan output.",["Model","Latency","Inference Server"]],
    ["Multimodal","Kemampuan model memahami atau menghasilkan lebih dari satu jenis media.",["Vision Model","Text-to-Speech","Generative AI"]],
    ["Text-to-Image","Teknologi yang menghasilkan gambar dari instruksi teks.",["Generative AI","Multimodal","Vision Model"]],
    ["Text-to-Speech","Teknologi yang mengubah teks tertulis menjadi suara sintetis.",["Speech-to-Text","Multimodal","Generative AI"]],
    ["Speech-to-Text","Teknologi yang mengubah ucapan menjadi teks atau transkrip.",["Text-to-Speech","Multimodal","Audio Model"]],
    ["Vision Model","Model yang bisa memahami gambar atau video, termasuk objek, teks, dan hubungan visual.",["Multimodal","Text-to-Image","Foundation Model"]]
  ]},
  "Prompting":{terms:[
    ["Prompt","Instruksi atau input yang diberikan kepada model untuk menghasilkan respons.",["System Prompt","User Prompt","Prompt Template"]],
    ["System Prompt","Instruksi tingkat sistem yang mengatur peran, aturan, dan batas perilaku model.",["User Prompt","Guardrails","Prompt Injection"]],
    ["User Prompt","Permintaan langsung dari pengguna dalam sebuah percakapan dengan model.",["System Prompt","Prompt","Context Window"]],
    ["Few-shot Prompting","Teknik memberi beberapa contoh input dan output agar model mengikuti pola.",["Zero-shot Prompting","Prompt Template","Structured Output"]],
    ["Zero-shot Prompting","Meminta model mengerjakan tugas tanpa memberikan contoh output.",["Few-shot Prompting","Prompt","LLM"]],
    ["Chain-of-Thought","Rangkaian langkah penalaran internal atau eksplisit untuk memecahkan tugas kompleks.",["Prompt","Planner Agent","Reasoning Model"]],
    ["Prompt Template","Kerangka prompt yang bisa dipakai ulang dengan mengganti variabelnya.",["Prompt Library","Structured Output","Few-shot Prompting"]],
    ["Context Engineering","Proses menyusun instruksi, sumber, memory, tools, dan state yang masuk ke model.",["Context Window","RAG","System Prompt"]],
    ["Structured Output","Output yang mengikuti schema atau struktur tetap agar mudah diproses aplikasi.",["JSON Output","Output Validation","Function Calling"]],
    ["JSON Output","Structured output dalam format JSON dengan key dan tipe data yang ditentukan.",["Structured Output","API","Output Validation"]],
    ["Prompt Library","Kumpulan prompt teruji yang disimpan bersama tujuan, variabel, dan contoh penggunaan.",["Prompt Template","Eval","Context Engineering"]]
  ]},
  "RAG & Knowledge Base":{terms:[
    ["RAG","Teknik mengambil sumber relevan lalu memberikannya ke model sebelum jawaban dibuat.",["Retrieval","Embedding","Grounding"]],
    ["Embedding","Representasi angka yang menangkap kemiripan makna sebuah teks atau objek.",["Vector Database","Semantic Search","Retrieval"]],
    ["Vector Database","Database yang menyimpan dan mencari embedding berdasarkan kemiripan.",["Embedding","Semantic Search","Knowledge Base"]],
    ["Chunking","Proses membagi dokumen menjadi potongan kecil agar mudah dicari dan dimasukkan ke konteks.",["Retrieval","Embedding","Context Window"]],
    ["Retrieval","Proses menemukan bagian sumber yang paling relevan dengan sebuah pertanyaan.",["RAG","Re-ranking","Semantic Search"]],
    ["Re-ranking","Tahap mengurutkan ulang hasil retrieval agar bagian terbaik berada di atas.",["Retrieval","RAG","Semantic Search"]],
    ["Semantic Search","Pencarian berdasarkan kemiripan makna, bukan hanya kata yang sama.",["Embedding","Vector Database","Retrieval"]],
    ["Knowledge Base","Kumpulan informasi terkelola yang menjadi sumber jawaban atau pencarian.",["RAG","Document QA","Grounding"]],
    ["Grounding","Mengikat jawaban model pada sumber atau data tertentu yang diberikan.",["Citation","RAG","Hallucination"]],
    ["Citation","Penanda sumber yang menunjukkan dari mana klaim atau jawaban berasal.",["Grounding","Document QA","Source"]],
    ["Document QA","Sistem tanya-jawab yang menggunakan dokumen sebagai sumber utama.",["RAG","Knowledge Base","Citation"]]
  ]},
  "AI Agent":{terms:[
    ["AI Agent","AI yang tidak hanya menjawab, tapi bisa menjalankan tugas lewat beberapa langkah dan memakai tools.",["Tool Calling","Memory","Agentic Workflow"]],
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
  "Automation & API":{terms:[
    ["API","Antarmuka terstruktur yang memungkinkan dua aplikasi meminta data atau tindakan.",["Webhook","Function Calling","Rate Limit"]],
    ["Webhook","Pesan otomatis yang dikirim ketika suatu event terjadi.",["API","Trigger","Payload"]],
    ["Trigger","Peristiwa yang memulai sebuah workflow otomatis.",["Action","Webhook","Scheduler"]],
    ["Action","Langkah yang dijalankan setelah trigger atau kondisi terpenuhi.",["Trigger","Workflow Automation","API"]],
    ["Scheduler","Komponen yang menjalankan proses pada waktu atau interval tertentu.",["Trigger","Workflow Automation","Cron"]],
    ["Workflow Automation","Rangkaian langkah otomatis yang memindahkan atau memproses data antar-sistem.",["Trigger","Action","n8n"]],
    ["n8n","Platform workflow automation visual dengan opsi self-host dan logic fleksibel.",["Make","Zapier","Webhook"]],
    ["Zapier","Platform automation untuk menghubungkan aplikasi melalui trigger dan action.",["Make","n8n","Workflow Automation"]],
    ["Make","Platform automation visual untuk membangun scenario dan memetakan aliran data.",["n8n","Zapier","API"]],
    ["Database","Sistem penyimpanan data terstruktur yang bisa dibaca dan diperbarui oleh aplikasi.",["API","CRM","Vector Database"]],
    ["CRM","Sistem untuk menyimpan dan mengelola hubungan, aktivitas, serta data pelanggan.",["Database","Workflow Automation","Lead Scoring"]],
    ["Google Sheets Automation","Penggunaan script atau workflow untuk membaca dan memperbarui spreadsheet secara otomatis.",["Workflow Automation","API","Database"]]
  ]},
  "Model & Infrastructure":{terms:[
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
  "Safety & Evaluation":{terms:[
    ["Hallucination","Output AI yang salah atau tidak berdasar tetapi terdengar meyakinkan.",["Grounding","RAG","Eval"]],
    ["Bias","Pola ketidakadilan atau kecenderungan sistem yang berasal dari data, desain, atau penggunaan.",["Training Data","Red Teaming","Eval"]],
    ["Guardrails","Aturan dan kontrol yang membatasi input, output, tool, atau tindakan sistem AI.",["Moderation","Output Validation","Human-in-the-loop"]],
    ["Prompt Injection","Instruksi berbahaya yang mencoba mengubah aturan model atau menyalahgunakan akses tool.",["System Prompt","Guardrails","Tool Calling"]],
    ["Data Privacy","Praktik melindungi data pribadi atau rahasia sepanjang proses AI.",["PII","Data Retention","Access Control"]],
    ["PII","Singkatan dari Personally Identifiable Information, yaitu data yang bisa mengidentifikasi seseorang.",["Data Privacy","Moderation","Redaction"]],
    ["Eval","Pengujian sistematis terhadap kualitas, keamanan, atau perilaku sistem AI.",["Benchmark","Test Set","Output Validation"]],
    ["Benchmark","Kumpulan tugas standar untuk membandingkan performa model atau sistem.",["Eval","Dataset","Model"]],
    ["Red Teaming","Pengujian dengan mencoba menemukan cara sistem gagal atau disalahgunakan.",["Prompt Injection","Guardrails","Safety"]],
    ["Output Validation","Pemeriksaan apakah output sesuai schema, aturan bisnis, dan batas keamanan.",["Structured Output","Guardrails","Moderation"]],
    ["Moderation","Proses mendeteksi atau menangani konten yang melanggar kebijakan.",["Guardrails","Data Privacy","Output Validation"]]
  ]},
  "Builder Tools":{terms:[
    ["SDK","Kumpulan library dan alat untuk memakai layanan tertentu dari kode.",["API","CLI","Framework"]],
    ["CLI","Command-line interface untuk menjalankan perintah melalui terminal.",["SDK","IDE","Deployment"]],
    ["IDE","Aplikasi untuk menulis, menjalankan, dan men-debug kode.",["CLI","SDK","Coding Assistant"]],
    ["No-code Builder","Alat membuat aplikasi atau workflow tanpa menulis banyak kode.",["Low-code","Workflow Automation","API"]],
    ["Low-code","Pendekatan visual yang tetap memberi ruang untuk menambahkan kode khusus.",["No-code Builder","SDK","Automation"]],
    ["Observability","Kemampuan melihat kondisi sistem melalui log, metric, dan trace.",["Tracing","Latency","Eval"]],
    ["Tracing","Rekaman langkah, input, output, dan tool call dalam workflow AI.",["Observability","AI Agent","Eval"]],
    ["Sandbox","Lingkungan terisolasi untuk menjalankan kode atau tool dengan risiko terbatas.",["Guardrails","Deployment","Security"]],
    ["Deployment","Proses menempatkan aplikasi di lingkungan target agar siap digunakan.",["Cloud Model","Inference Server","Observability"]],
    ["Playground","Antarmuka eksperimen untuk mencoba model, prompt, dan parameter sebelum integrasi.",["Prompt","API","Eval"]]
  ]},
  "Business & Monetization":{terms:[
    ["AI Operator","Orang yang memakai AI secara terstruktur untuk menyelesaikan pekerjaan sehari-hari.",["Prompt Library","AI Tool Stack","Workflow Automation"]],
    ["AI Automation Specialist","Praktisi yang memetakan proses dan membangun automation berbasis AI.",["n8n","Workflow Audit","API"]],
    ["AI Consultant","Profesional yang membantu organisasi memilih use case, risiko, dan roadmap AI.",["AI Workflow Audit","AI Tool Stack","Productized Service"]],
    ["Productized Service","Layanan dengan scope, deliverable, proses, dan harga yang dibuat konsisten.",["AI Consultant","Deliverables","Starter Package"]],
    ["AI Workflow Audit","Pemeriksaan proses untuk menemukan peluang, risiko, dan prioritas penggunaan AI.",["Workflow Automation","AI Consultant","Peta Proses"]],
    ["AI Chatbot Service","Layanan membangun dan merawat chatbot berbasis knowledge atau workflow.",["RAG","Knowledge Base","Productized Service"]],
    ["AI Content System","Sistem riset, produksi, review, distribusi, dan analisis konten berbantuan AI.",["Prompt Library","Workflow Automation","Content Strategy"]],
    ["AI Tool Stack","Kumpulan tool AI yang dipilih untuk fungsi dan workflow tertentu.",["AI Operator","Tool Audit","Integration"]],
    ["AI Portfolio","Kumpulan project dan case study yang membuktikan kemampuan membangun atau memakai AI.",["Capstone Project","Case Study","AI Operator"]],
    ["Capstone Project","Project akhir yang menggabungkan beberapa kemampuan menjadi solusi utuh.",["AI Portfolio","RAG","Workflow Automation"]]
  ]}
};

const explanations:Record<string,string>={
  AI:"AI adalah payung besar untuk sistem yang membantu mesin mengenali pola, memahami instruksi, membuat prediksi, atau menghasilkan konten. Chatbot hanya salah satu bentuknya.",
  LLM:"LLM bekerja dengan membaca konteks sebagai token lalu memprediksi kelanjutan yang paling masuk akal. Ia kuat untuk bahasa, tetapi tetap tidak otomatis benar secara fakta.",
  Token:"Token adalah potongan teks yang dihitung model saat membaca input dan membuat output. Biaya, batas konteks, dan panjang respons biasanya dihitung dari token.",
  "Context Window":"Context window adalah ruang kerja model dalam satu percakapan atau request. Informasi yang tidak masuk atau tersusun buruk bisa tidak dipakai dengan baik.",
  Embedding:"Embedding mengubah teks, gambar, atau objek menjadi angka yang mewakili makna. Dua kalimat bisa dekat secara embedding meski katanya berbeda.",
  RAG:"RAG mengambil sumber relevan dari knowledge base lebih dulu, lalu memakai LLM untuk menyusun jawaban berdasarkan sumber itu.",
  API:"API adalah cara terstruktur agar satu aplikasi meminta data atau tindakan dari aplikasi lain. Pengguna API perlu tahu endpoint, auth, payload, dan response.",
  Webhook:"Webhook adalah pesan otomatis yang dikirim saat event terjadi. Aplikasi penerima tidak perlu bertanya terus-menerus untuk tahu ada perubahan.",
  "AI Agent":"AI agent menjalankan tugas lewat beberapa langkah, memakai tools, menyimpan state, dan berhenti berdasarkan batas yang ditentukan.",
  MCP:"MCP membantu aplikasi AI terhubung ke tools dan sumber konteks dengan pola yang lebih standar, sehingga integrasi tidak selalu dibuat dari nol."
};

const examples:Record<string,string>={
  AI:"Rekomendasi video, filter spam, deteksi fraud, dan chatbot customer support semuanya memakai AI dengan cara yang berbeda.",
  LLM:"Saat kamu meminta model merangkum kontrak, LLM membaca teks kontrak dalam konteks lalu menyusun ringkasan.",
  Token:"Kalimat panjang, tabel, dan dokumen PDF besar memakai banyak token sehingga bisa lebih mahal atau melewati batas konteks.",
  Embedding:"Pencarian 'cara refund pesanan' bisa menemukan dokumen berjudul 'prosedur pengembalian dana' karena maknanya mirip.",
  RAG:"Chatbot SOP mengambil bagian kebijakan refund dari knowledge base sebelum menjawab pertanyaan pelanggan.",
  API:"Form pendaftaran mengirim nama dan email ke CRM lewat API, lalu CRM mengembalikan ID pelanggan.",
  Webhook:"Payment gateway mengirim webhook ke toko online saat pembayaran berhasil.",
  "AI Agent":"Agent riset mencari sumber, menyimpan catatan klaim, lalu meminta approval manusia sebelum membuat report final.",
  MCP:"Desktop assistant bisa memakai MCP server untuk membaca repository, membuka database lokal, atau menjalankan tool internal dengan izin tertentu."
};

const mistakes:Record<string,string>={
  AI:"Menganggap semua AI bekerja seperti chatbot. Banyak AI justru berjalan di belakang layar sebagai sistem prediksi, ranking, atau klasifikasi.",
  LLM:"Mengira LLM punya memori dan akses fakta terbaru secara otomatis. Model hanya memakai konteks, tool, dan data yang memang tersedia.",
  Token:"Mengira token sama persis dengan kata. Satu kata bisa menjadi beberapa token, terutama pada istilah teknis atau bahasa tertentu.",
  Embedding:"Menganggap embedding menyimpan arti secara sempurna. Hasilnya tetap bergantung pada model, bahasa, data, dan cara dokumen dipotong.",
  RAG:"Mengira RAG otomatis menghilangkan hallucination. Retrieval yang buruk tetap bisa memberi konteks yang salah atau tidak cukup.",
  API:"Mengira API selalu bisa dipakai bebas. Banyak API butuh key, permission, format data tertentu, dan batas pemakaian.",
  Webhook:"Tidak memverifikasi signature atau sumber webhook. Akibatnya sistem bisa menerima event palsu.",
  "AI Agent":"Memberi agent terlalu banyak akses sebelum ada log, permission, budget, dan stopping condition.",
  MCP:"Menganggap MCP otomatis aman. Tool yang terhubung tetap harus dibatasi lewat permission dan review."
};

const categoryWhy:Record<string,string>={
  "Dasar AI":"membantu kamu membaca klaim AI dengan lebih jernih dan tidak mencampur semua istilah menjadi satu.",
  "GenAI & LLM":"membantu kamu memakai model generatif dengan batas input, biaya, dan kualitas output yang lebih jelas.",
  "Prompting":"membantu kamu memberi instruksi yang lebih konsisten dan mudah diuji.",
  "RAG & Knowledge Base":"membantu kamu membangun jawaban AI yang lebih dekat ke sumber dan bisa diperiksa.",
  "AI Agent":"membantu kamu membedakan agent yang berguna dari chatbot yang hanya diberi label baru.",
  "Automation & API":"membantu kamu membaca alur integrasi dan mencari penyebab saat data tidak bergerak sebagaimana mestinya.",
  "Model & Infrastructure":"membantu kamu memilih cara menjalankan model berdasarkan biaya, latency, kontrol, dan risiko.",
  "Safety & Evaluation":"membantu kamu menguji kualitas, keamanan, dan batas penggunaan sebelum sistem dipakai orang lain.",
  "Builder Tools":"membantu kamu memilih alat kerja berdasarkan fungsi, bukan hype.",
  "Business & Monetization":"membantu kamu mengubah kemampuan AI menjadi paket kerja yang bisa dipahami dan dibeli."
};

function plainExplanation(term:string,definition:string,related:string[]){
  return explanations[term] || `${definition} Hubungkan istilah ini dengan ${related[0]} dan ${related[1]} agar kamu melihat perannya di sistem, bukan sekadar menghafal definisi.`;
}

function exampleFor(term:string,category:string,related:string[]){
  return examples[term] || `Dalam praktik ${category}, ${term} biasanya muncul saat kamu bekerja dengan ${related[0]}, lalu perlu memastikan hasilnya tetap cocok dengan tujuan kerja.`;
}

function whyFor(term:string,category:string){
  return `${term} penting karena ${categoryWhy[category] || "membantu kamu memahami keputusan teknis dan batas penggunaan AI dengan lebih jelas"}`;
}

function mistakeFor(term:string,related:string[]){
  return mistakes[term] || `Mengira ${term} sama dengan ${related[0]}. Keduanya berkaitan, tetapi perannya berbeda dalam alur kerja AI.`;
}

export const glossary:DirectoryItem[]=Object.entries(groups).flatMap(([category,group])=>group.terms.map(([term,definition,related])=>{
  return {
    title:term,category,level:category==="Dasar AI"||category==="GenAI & LLM"?"Pemula":"Menengah",tag:category==="Dasar AI"||category==="GenAI & LLM"?"Pemula":"Menengah",description:definition,
    details:[`Kategori: ${category}`,`Terkait: ${related.join(", ")}`],sections:[
      {title:`Apa itu ${term}`,content:plainExplanation(term,definition,related)},
      {title:"Contoh",content:exampleFor(term,category,related)},
      {title:"Kenapa penting",content:whyFor(term,category)},
      {title:"Terkait",content:related},
      {title:"Yang sering keliru",content:mistakeFor(term,related)}
    ]
  };
}));
