import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";
const description="Belajar AI dari nol. Langsung praktek, tidak cuma teori. Dari prompting sampai workflow, automation, RAG, dan agent.";
export const metadata:Metadata={
  metadataBase:new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3003"),
  title:{default:"Nurai",template:"%s | Nurai"},
  applicationName:"Nurai",
  description,
  icons:{icon:"/icon.png",apple:"/apple-icon.png"},
  openGraph:{title:"Nurai",description,siteName:"Nurai",type:"website",locale:"id_ID",images:[{url:"/opengraph-image.png",width:1254,height:1254,alt:"Nurai"}]},
  twitter:{card:"summary_large_image",title:"Nurai",description,images:["/opengraph-image.png"]}
};
const geistSans=Geist({subsets:["latin"],variable:"--font-geist-sans",display:"swap"});
const geistMono=Geist_Mono({subsets:["latin"],variable:"--font-geist-mono",display:"swap"});
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="id"><body className={`${geistSans.variable} ${geistMono.variable}`}><Navbar/><main id="main-content">{children}</main><Footer/><Analytics/></body></html>}
