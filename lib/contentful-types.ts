export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  techStack: string[];
  category: "Frontend" | "Backend" | "Full Stack" | "Mobile" | "Other";
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  date: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issuerLogo?: string;
  image?: string;
  certificateUrl?: string;
  category: string;
  date: string;
}

export interface Tool {
  id: string;
  name: string;
  icon: string;
  category: string;
  order?: number;
}

export interface SiteConfig {
  fullName: string;
  jobTitle: string;
  bio: string;
  photo: string;
  whatsappNumber?: string;
  githubUrl?: string;
  linkedinUrl?: string;
}

export interface ContactFormData {
  nombre: string;
  email: string;
  whatsapp?: string;
  asunto: string;
  mensaje: string;
}
