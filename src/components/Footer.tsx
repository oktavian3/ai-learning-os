import Image from "next/image";
import Link from "next/link";
import nuraiLogo from "@/app/image/nurai logo.png";

const columns = [
  { title: "Belajar", links: [["Roadmap", "/roadmap"], ["Course", "/course"], ["Skill Check", "/skill-check"]] },
  { title: "Bangun", links: [["Projects", "/projects"], ["Workflows", "/workflows"], ["Prompts", "/prompts"]] },
  { title: "Referensi", links: [["Tools", "/tools"], ["Use Cases", "/use-cases"], ["Monetize", "/monetize"], ["Kamus AI", "/glossary"]] },
  { title: "Connect", links: [["X", "https://x.com/satyaxbt"], ["GitHub", "https://github.com/oktavian3"]] },
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              <Image className="footer-logo" src={nuraiLogo} alt="" width={40} height={40} />
              <span>Nurai</span>
            </div>
            <p className="footer-desc">Belajar AI dari konsep dasar sampai bisa membangun workflow, automation, dan agent sendiri.</p>
          </div>
          {columns.map(column => (
            <div className="footer-col" key={column.title}>
              <h3>{column.title}</h3>
              <div className="footer-links">
                {column.links.map(([label, href]) =>
                  href.startsWith("http")
                    ? <a key={label} href={href} target="_blank" rel="noopener noreferrer">{label}</a>
                    : <Link key={label} href={href}>{label}</Link>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <span>Buat creator, freelancer, operator, dan builder yang capek kerja manual.</span>
          <div className="footer-credit">
            <span>© {new Date().getFullYear()} Nurai</span>
            <span>Built by <a href="https://x.com/satyaXBT" target="_blank" rel="noopener noreferrer">Satya</a></span>
          </div>
        </div>
      </div>
      <div className="footer-giant" aria-hidden><span>NURAI</span></div>
    </footer>
  );
}
