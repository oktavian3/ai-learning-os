import {expandedMonetization,expandedProjects,expandedPrompts,expandedTools,expandedWorkflows} from "./expanded";
import {DirectoryItem,RoadmapLevel,SkillCheckQuestion} from "./types";
import {useCases as detailedUseCases} from "./useCases";
import {glossary as detailedGlossary} from "./glossary";

export const roadmap:RoadmapLevel[]=[
  [0,"AI Literacy","Baru mulai","Kenalan sama istilah penting, batas AI, dan cara tahu kapan jawabannya ngawur",["ChatGPT","Gemini"],"4 lesson","Gak gampang ketipu jawaban yang terdengar yakin","Bikin peta konsep AI"],
  [1,"Basic AI Usage","Baru mulai pakai AI","Pakai AI buat riset ringan, rangkum, email, dokumen, dan ide",["ChatGPT","NotebookLM"],"6 lesson","Bisa pakai AI buat kerjaan harian","Bangun weekly work copilot"],
  [2,"Prompt Engineering","Sudah sering pakai chat AI","Membuat prompt reusable, berikan contoh, pasang batas, dan debug hasil yang jelek",["Claude","ChatGPT"],"6 lesson","Bisa membuat brief yang dimengerti AI","Buat prompt kit untuk satu profesi"],
  [3,"AI Tools Mastery","Creator dan operator","Pilih tool dari fungsi dan risiko, bukan karena timeline lagi ramai",["Canva","Notion","Cursor"],"5 lesson","Punya AI stack yang tidak berantakan","Audit personal AI stack"],
  [4,"Workflow Design","Freelancer dan tim","Rangkai input, proses, output, review, dan fallback jadi alur yang bisa diulang",["Notion","Sheets"],"6 lesson","Bisa membuat workflow yang masuk akal","Content workflow end-to-end"],
  [5,"Automation & API","No-code builder","Masuk ke trigger, action, API, webhook, JSON, dan error handling",["n8n","Make","Postman"],"7 lesson","Bisa membuat automation tanpa melepas kontrol","Lead intake automation"],
  [6,"RAG & Knowledge Base","Builder","Membuat AI mencari sumber dulu sebelum jawab dari dokumenmu",["Supabase","NotebookLM"],"5 lesson","Bisa membuat jawaban yang memiliki sumber","RAG chatbot dari dokumen"],
  [7,"AI Agents","Advanced builder","Memberikan AI tujuan, tools, memory, dan batas wewenang yang jelas",["OpenAI API","LangGraph"],"6 lesson","Bisa desain agent yang berguna","Research agent dengan approval"],
  [8,"Agent Orchestration","Agentic builder","Atur router, supervisor, handoff, tracing, dan eval tanpa membuat sirkus agent",["LangGraph","Tracing"],"5 lesson","Bisa mengatur sistem multi-agent","Multi-agent production pipeline"],
  [9,"Monetization & Portfolio","Freelancer dan founder","Paketkan skill jadi offer, delivery, dan case study yang bisa dicek",["Notion","Loom","GitHub"],"6 lesson","Bisa jual hasil, bukan jargon","Productized service + case study"]
].map(([level,title,forWho,learn,tools,lessons,output,project])=>({level,title,forWho,learn,tools,lessons,output,project} as RoadmapLevel));

export const tools=expandedTools;
export const prompts=expandedPrompts;
export const workflows=expandedWorkflows;
export const projects=expandedProjects;
export const monetization=expandedMonetization;

export const useCases:DirectoryItem[]=detailedUseCases;
export const glossary:DirectoryItem[]=detailedGlossary;

export const skillQuestions:SkillCheckQuestion[]=[
  "Kalau AI memberi fakta penting, apa yang kamu lakukan?","Bisa membuat prompt yang dipakai ulang?","Pernah memecah tugas menjadi input, proses, dan output?","Sudah paham trigger, action, dan condition?","Pernah memakai API atau webhook?","Bisa menjelaskan RAG dengan bahasamu sendiri?","Pernah membuat agent yang memakai tool?","Bagaimana kamu memeriksa kualitas output AI?","Pernah membangun workflow dengan beberapa langkah?","Punya project AI yang bisa kamu demonstrasikan?"
].map(question=>({question,options:[{label:"Belum pernah",score:0},{label:"Sedikit / dengan panduan",score:1},{label:"Bisa mandiri",score:2},{label:"Bisa menjelaskan ke orang lain",score:3}]}));
