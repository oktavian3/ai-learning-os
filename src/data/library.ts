import appendices from "./extracted-appendices.json";
import {expandedMonetization,expandedProjects,expandedPrompts,expandedTools,expandedWorkflows} from "./expanded";
import {DirectoryItem,RoadmapLevel,SkillCheckQuestion} from "./types";

export const roadmap:RoadmapLevel[]=[
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
].map(([level,title,forWho,learn,tools,lessons,output,project])=>({level,title,forWho,learn,tools,lessons,output,project} as RoadmapLevel));

export const tools=expandedTools;
export const prompts=expandedPrompts;
export const workflows=expandedWorkflows;
export const projects=expandedProjects;
export const monetization=expandedMonetization;

export const useCases:DirectoryItem[]=appendices.useCases.map(item=>({
  title:item.title,category:item.category,level:/Developer|Web3|Bisnis/i.test(item.category)?"Menengah":"Pemula",tag:"Use case",
  description:`Contoh penggunaan AI untuk membantu ${item.title.toLowerCase()} tanpa menghilangkan pengecekan manusia.`,
  details:["Mulai dari satu contoh nyata","Tentukan hasil yang ingin dibuat","Cek kualitas sebelum dipakai","Bisa dikembangkan menjadi workflow"]
}));

const glossaryCategory=(title:string)=>/agent|memory|orchestration|tool calling|function/i.test(title)?"Agent":/rag|embedding|vector/i.test(title)?"RAG":/api|webhook|latency/i.test(title)?"Builder":/hallucination|guardrail|eval|benchmark/i.test(title)?"Safety":"Dasar";
export const glossary:DirectoryItem[]=appendices.glossary.map(item=>({
  title:item.title,category:glossaryCategory(item.title),level:"Pemula",tag:"Istilah AI",description:item.definition,
  details:["Baca definisinya dengan pelan","Cari satu contoh di pekerjaanmu","Coba jelaskan lagi dengan bahasamu sendiri"]
}));

export const skillQuestions:SkillCheckQuestion[]=[
  "Kalau AI memberi fakta penting, apa yang kamu lakukan?","Bisa membuat prompt yang dipakai ulang?","Pernah memecah tugas menjadi input, proses, dan output?","Sudah paham trigger, action, dan condition?","Pernah memakai API atau webhook?","Bisa menjelaskan RAG dengan bahasamu sendiri?","Pernah membuat agent yang memakai tool?","Bagaimana kamu mengecek kualitas output AI?","Pernah membangun workflow dengan beberapa langkah?","Punya project AI yang bisa kamu demokan?"
].map(question=>({question,options:[{label:"Belum pernah",score:0},{label:"Sedikit / dengan panduan",score:1},{label:"Bisa mandiri",score:2},{label:"Bisa menjelaskan ke orang lain",score:3}]}));
