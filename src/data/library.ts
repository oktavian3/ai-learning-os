import {expandedMonetization,expandedProjects,expandedPrompts,expandedTools,expandedWorkflows} from "./expanded";
import {DirectoryItem,RoadmapLevel,SkillCheckQuestion} from "./types";
import {useCases as detailedUseCases} from "./useCases";
import {glossary as detailedGlossary} from "./glossary";

export const roadmap:RoadmapLevel[]=[
  [0,"AI Literacy","Baru mulai dan ingin paham batas AI","Kenalan dengan AI, GenAI, hallucination, bias, dan cara mengecek jawaban yang terdengar yakin",["ChatGPT","Gemini"],"2 lesson","Siap lanjut kalau bisa menjelaskan AI, ML, GenAI, dan risiko hallucination dengan contoh sendiri","Peta konsep AI pribadi","ai-fundamentals"],
  [1,"Basic AI Usage","Sudah coba chatbot tapi belum punya pola kerja","Pakai AI untuk riset ringan, ringkasan, email, dokumen, dan ide yang tetap bisa direview",["ChatGPT","NotebookLM"],"5 lesson","Siap lanjut kalau bisa membuat output kerja harian dengan input, format, dan review yang jelas","Weekly work copilot","generative-ai-llm"],
  [2,"Prompt Engineering","Sering pakai AI dan ingin hasil lebih konsisten","Membuat prompt reusable, memberi contoh, memasang batas, dan men-debug output yang belum pas",["Claude","ChatGPT"],"4 lesson","Siap lanjut kalau punya prompt kit yang sudah diuji dengan beberapa input nyata","Prompt kit untuk satu profesi","prompting"],
  [3,"AI Tools Mastery","Creator, operator, atau builder yang mulai kebanyakan tools","Pilih tool dari fungsi, risiko, biaya, data policy, dan kecocokan workflow",["Canva","Notion","Cursor"],"3 lesson","Siap lanjut kalau bisa menjelaskan kenapa satu tool dipakai dan kapan tidak dipakai","Audit personal AI stack","tools-mastery"],
  [4,"Workflow Design","Freelancer, creator, atau tim yang butuh proses berulang","Rangkai input, proses, output, review, fallback, dan log menjadi workflow yang bisa diulang",["Notion","Sheets"],"3 lesson","Siap lanjut kalau workflow punya owner, checklist, output, dan review point","Content workflow end-to-end","research-content"],
  [5,"Automation & API","No-code builder yang ingin menghubungkan aplikasi","Masuk ke trigger, action, API, webhook, JSON, auth, retry, dan error handling",["n8n","Make","Postman"],"3 lesson","Siap lanjut kalau bisa mengetes API sederhana dan membuat automation dengan fallback","Lead intake automation","api-webhook"],
  [6,"RAG & Knowledge Base","Builder yang ingin AI menjawab dari dokumen sendiri","Membuat AI mengambil sumber relevan sebelum menjawab, lengkap dengan citation dan evaluasi",["Supabase","NotebookLM"],"2 lesson","Siap lanjut kalau knowledge base punya metadata, test questions, dan citation yang masuk akal","RAG chatbot dari dokumen","rag-knowledge-base"],
  [7,"AI Agents","Advanced builder yang butuh tugas multi-step","Memberi AI tujuan, tools, memory, state, permission, dan stopping condition yang jelas",["OpenAI API","LangGraph"],"2 lesson","Siap lanjut kalau agent bisa berjalan dengan trace, batas biaya, dan approval manusia","Research agent dengan approval","ai-agents"],
  [8,"Agent Orchestration","Builder yang sudah punya agent dan butuh koordinasi","Atur router, supervisor, handoff, tracing, eval, dan quality gate tanpa membuat sistem berlebihan",["LangGraph","Tracing"],"3 lesson","Siap lanjut kalau bisa membuktikan multi-agent lebih baik dari single-agent untuk kasus itu","Multi-agent production pipeline","agent-orchestration"],
  [9,"Monetization & Portfolio","Freelancer, founder, atau career switcher","Paketkan skill menjadi offer, delivery process, proof, dan case study yang bisa dicek",["Notion","Loom","GitHub"],"2 lesson","Siap lanjut kalau punya satu layanan kecil, demo, scope, dan case study yang jujur","Productized service + case study","monetization"]
].map(([level,title,forWho,learn,tools,lessons,output,project,moduleSlug])=>({level,title,forWho,learn,tools,lessons,output,project,moduleSlug} as RoadmapLevel));

export const tools=expandedTools;
export const prompts=expandedPrompts;
export const workflows=expandedWorkflows;
export const projects=expandedProjects;
export const monetization=expandedMonetization;

export const useCases:DirectoryItem[]=detailedUseCases;
export const glossary:DirectoryItem[]=detailedGlossary;

export const skillQuestions:SkillCheckQuestion[]=[
  "Seberapa paham kamu memverifikasi fakta dari AI?","Seberapa terbiasa kamu membuat prompt yang bisa dipakai ulang?","Seberapa sering kamu memecah tugas jadi input, proses, dan output?","Seberapa paham kamu soal trigger, action, dan condition?","Seberapa terbiasa kamu memakai API atau webhook?","Seberapa dalam kamu memahami RAG?","Seberapa sering kamu membuat agent yang memakai tool?","Seberapa konsisten kamu mengecek kualitas output AI?","Seberapa terbiasa kamu membangun workflow bertahap?","Seberapa siap project AI kamu untuk ditunjukkan ke orang lain?"
].map(question=>({question,options:[{label:"Belum pernah",score:0},{label:"Sedikit, masih butuh panduan",score:1},{label:"Bisa mandiri",score:2},{label:"Bisa menjelaskan ke orang lain",score:3}]}));
