export type ContentItem =
  | { type: "paragraph"; text: string }
  | { type: "highlight"; text: string }
  | { type: "subtitle"; title: string; accent?: string }
  | {
      type: "image";
      src: string;
      alt: string;
      caption?: string;
      size?: "normal" | "wide";
    }
  | { type: "bullet-list"; items: string[]; accent?: string }
  | {
      type: "food-item";
      name: string;
      description: string;
      image: string | null;
    }
  | {
      type: "dance-item";
      name: string;
      description: string;
      image?: string;
      hasImage?: boolean;
      accent?: string;
    }
  | {
      type: "instrument-item";
      name: string;
      description: string;
      image: string;
      accent?: string;
    }
  | { type: "image-grid"; items: { src: string; label: string }[] }
  | { type: "dance-types"; types: { name: string; color: string }[] }
  | { type: "festival-grid"; items: { name: string; description: string }[] };

export interface Section {
  type: "section";
  icon?: string;
  title: string;
  accent?: string;
  content: ContentItem[];
}

export interface Tribe {
  id: string;
  name: string;
  accent: string;
  heroImage: string;
  sections: Section[];
}

export interface TribesData {
  tribes: Tribe[];
}
