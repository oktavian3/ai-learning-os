import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
export const metadata:Metadata={title:{default:"AI Learning OS Indonesia",template:"%s — AI Learning OS"},description:"Belajar AI dari nol sampai workflow, automation, RAG, agents, dan monetisasi."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="id"><body><Navbar/><main>{children}</main><Footer/></body></html>}
