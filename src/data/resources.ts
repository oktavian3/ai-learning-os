import { DirectoryItem } from "./types";

export const resourceSlug = (item:DirectoryItem) => item.slug || item.title.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");
export const findResource = (items:DirectoryItem[], slug:string) => items.find(item => resourceSlug(item) === slug);
