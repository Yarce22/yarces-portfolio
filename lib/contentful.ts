import { createClient, type Entry, type Asset } from "contentful";
import type {
  Project,
  Certificate,
  Tool,
  SiteConfig,
} from "./contentful-types";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN!,
});

function resolveAssetUrl(asset: Asset | undefined): string {
  if (!asset?.fields?.file) return "";
  const url = (asset.fields.file as { url: string }).url;
  return url.startsWith("//") ? `https:${url}` : url;
}

// --------------- Mappers ---------------

function mapProject(entry: Entry): Project {
  const f = entry.fields as Record<string, unknown>;
  const rawTechStack = f.techStack as string | string[] | undefined;
  let techStack: string[] = [];
  if (Array.isArray(rawTechStack)) {
    techStack = rawTechStack;
  } else if (typeof rawTechStack === "string") {
    techStack = rawTechStack.split(",").map((s) => s.trim()).filter(Boolean);
  }

  return {
    id: entry.sys.id,
    title: (f.title as string) ?? "",
    slug: (f.slug as string) ?? "",
    description: (f.description as string) ?? "",
    image: resolveAssetUrl(f.image as Asset | undefined),
    techStack,
    category: (f.category as Project["category"]) ?? "Other",
    githubUrl: f.githubUrl as string | undefined,
    liveUrl: f.liveUrl as string | undefined,
    featured: (f.featured as boolean) ?? false,
    date: (f.date as string) ?? "",
  };
}

function mapCertificate(entry: Entry): Certificate {
  const f = entry.fields as Record<string, unknown>;
  return {
    id: entry.sys.id,
    title: (f.title as string) ?? "",
    issuer: (f.issuer as string) ?? "",
    issuerLogo: resolveAssetUrl(f.issuerLogo as Asset | undefined),
    image: resolveAssetUrl(f.image as Asset | undefined),
    certificateUrl: f.certificateUrl as string | undefined,
    category: (f.category as string) ?? "Other",
    date: (f.date as string) ?? "",
  };
}

function mapTool(entry: Entry): Tool {
  const f = entry.fields as Record<string, unknown>;
  return {
    id: entry.sys.id,
    name: (f.name as string) ?? "",
    icon: resolveAssetUrl(f.icon as Asset | undefined),
    category: (f.category as string) ?? "Other",
    order: f.order as number | undefined,
  };
}

function mapSiteConfig(entry: Entry): SiteConfig {
  const f = entry.fields as Record<string, unknown>;
  return {
    fullName: (f.fullName as string) ?? "",
    jobTitle: (f.jobTitle as string) ?? "",
    bio: (f.bio as string) ?? "",
    photo: resolveAssetUrl(f.photo as Asset | undefined),
    whatsappNumber: f.whatsappNumber as string | undefined,
    githubUrl: f.githubUrl as string | undefined,
    linkedinUrl: f.linkedinUrl as string | undefined,
  };
}

// --------------- Fetch functions ---------------

interface GetProjectsOptions {
  limit?: number;
  featured?: boolean;
  category?: string;
}

export async function getProjects(
  options: GetProjectsOptions = {}
): Promise<Project[]> {
  const { limit, featured, category } = options;
  const entries = await client.getEntries({
    content_type: "portfolioProject",
    order: ["fields.order"],
    include: 1,
    ...(limit && { limit }),
    ...(featured !== undefined && { "fields.featured": featured }),
    ...(category && { "fields.category": category }),
  });
  return entries.items.map(mapProject);
}

export async function getProject(slug: string): Promise<Project | null> {
  const entries = await client.getEntries({
    content_type: "portfolioProject",
    "fields.slug": slug,
    limit: 1,
    include: 1,
  });
  if (entries.items.length === 0) return null;
  return mapProject(entries.items[0]);
}

interface GetCertificatesOptions {
  limit?: number;
  category?: string;
}

export async function getCertificates(
  options: GetCertificatesOptions = {}
): Promise<Certificate[]> {
  const { limit, category } = options;
  const entries = await client.getEntries({
    content_type: "certificate",
    order: ["fields.orden"],
    include: 1,
    ...(limit && { limit }),
    ...(category && { "fields.category": category }),
  });
  return entries.items.map(mapCertificate);
}

export async function getCertificateCategories(): Promise<string[]> {
  const entries = await client.getEntries({
    content_type: "certificate",
    select: ["fields.category"],
    limit: 1000,
  });
  const categories = new Set<string>();
  for (const entry of entries.items) {
    const cat = (entry.fields as Record<string, unknown>).category as string;
    if (cat) categories.add(cat);
  }
  return Array.from(categories).sort();
}

export async function getTools(): Promise<Tool[]> {
  const entries = await client.getEntries({
    content_type: "tool",
    include: 1,
    limit: 100,
  });
  return entries.items
    .map(mapTool)
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

export async function getSiteConfig(): Promise<SiteConfig | null> {
  const entries = await client.getEntries({
    content_type: "siteConfig",
    limit: 1,
    include: 1,
  });
  if (entries.items.length === 0) return null;
  return mapSiteConfig(entries.items[0]);
}
