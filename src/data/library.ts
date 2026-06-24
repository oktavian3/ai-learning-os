import {expandedMonetization,expandedProjects,expandedPrompts,expandedTools,expandedWorkflows} from "./expanded";
import {DirectoryItem,RoadmapLevel,SkillCheckQuestion} from "./types";
import {useCases as detailedUseCases} from "./useCases";
import {glossary as detailedGlossary} from "./glossary";

export const roadmap:RoadmapLevel[]=[
  [0,"AI Literacy","Baru mulai","Kenalan sama istilah penting, batas AI, dan cara tau kapan jawabannya ngawur",["ChatGPT","Gemini"],"2 lesson","Gak gampang ketipu jawaban yang terdengar yakin","Bikin peta konsep AI","ai-fundamentals"],
  [1,"Basic AI Usage","Baru mulai pakai AI","Pakai AI buat riset ringan, rangkum, email, dokumen, dan ide",["ChatGPT","NotebookLM"],"5 lesson","Bisa pakai AI buat kerjaan harian","Bangun weekly work copilot","generative-ai-llm"],
  [2,"Prompt Engineering","Sudah sering pakai chat AI","Membuat prompt reusable, berikan contoh, pasang batas, dan debug hasil yang jelek",["Claude","ChatGPT"],"4 lesson","Bisa membuat brief yang dimengerti AI","Buat prompt kit untuk satu profesi","prompting"],
  [3,"AI Tools Mastery","Creator dan operator","Pilih tool dari fungsi dan risiko, bukan karena timeline lagi ramai",["Canva","Notion","Cursor"],"3 lesson","Punya AI stack yang tidak berantakan","Audit personal AI stack","tools-mastery"],
  [4,"Workflow Design","Freelancer dan tim","Rangkai input, proses, output, review, dan fallback jadi alur yang bisa diulang",["Notion","Sheets"],"3 lesson","Bisa membuat workflow yang masuk akal","Content workflow end-to-end","research-content"],
  [5,"Automation & API","No-code builder","Masuk ke trigger, action, API, webhook, JSON, dan error handling",["n8n","Make","Postman"],"3 lesson","Bisa membuat automation tanpa melepas kontrol","Lead intake automation","api-webhook"],
  [6,"RAG & Knowledge Base","Builder","Membuat AI mencari sumber dulu sebelum jawab dari dokumenmu",["Supabase","NotebookLM"],"2 lesson","Bisa membuat jawaban yang memiliki sumber","RAG chatbot dari dokumen","rag-knowledge-base"],
  [7,"AI Agents","Advanced builder","Memberikan AI tujuan, tools, memory, dan batas wewenang yang jelas",["OpenAI API","LangGraph"],"2 lesson","Bisa desain agent yang berguna","Research agent dengan approval","ai-agents"],
  [8,"Agent Orchestration","Agentic builder","Atur router, supervisor, handoff, tracing, dan eval tanpa membuat sirkus agent",["LangGraph","Tracing"],"3 lesson","Bisa mengatur sistem multi-agent","Multi-agent production pipeline","agent-orchestration"],
  [9,"Monetization & Portfolio","Freelancer dan founder","Paketkan skill jadi offer, delivery, dan case study yang bisa dicek",["Notion","Loom","GitHub"],"2 lesson","Bisa jual hasil, bukan jargon","Productized service + case study","monetization"]
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
