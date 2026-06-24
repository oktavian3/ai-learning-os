import { PageHero } from "@/components/Primitives";
import { ResourceExplorer } from "@/components/ResourceExplorer";
import { monetization } from "@/data/library";
export const metadata={title:"Monetize Skill AI"};
export default function Page(){return <><PageHero label="Tanpa janji cuan semalam" title="Skill AI sudah ada. Sekarang monetize dari mana?" description="Cari masalah yang nyata, membuat scope yang rapi, dan jual hasil yang bisa dicek. Kata AI sendiri tidak membuat orang mau bayar."/><section className="section"><div className="container"><ResourceExplorer items={monetization} basePath="/monetize"/></div></section></>}
