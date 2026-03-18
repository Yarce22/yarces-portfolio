# CLAUDE.md — Portfolio Personal (Software Developer)

> Archivo de referencia para Claude Code. Lee este documento completo antes de escribir cualquier línea de código.

---

## 1. Visión General del Proyecto

Portfolio personal de desarrollador de software. El objetivo es mostrar proyectos, certificados y herramientas, y recibir contacto directo vía WhatsApp. El contenido es gestionado desde Contentful como headless CMS. El sitio se despliega en Vercel.

**Estética:** Dark, minimal-techy. Geométrico. Limpio pero con personalidad. Sin clichés de "portafolio genérico".

---

## 2. Stack Tecnológico

| Capa | Tecnología |
|---|---|
| Framework | Next.js 15+ (App Router) |
| Lenguaje | TypeScript (strict mode) |
| Estilos | Tailwind CSS v4 |
| Animaciones | Framer Motion |
| 3D | Three.js + @react-three/fiber + @react-three/drei |
| CMS | Contentful (Delivery API) |
| Formulario | react-hook-form + zod |
| Iconos | lucide-react |
| Fuentes | next/font/google — display font distintivo + body font refinado |
| Despliegue | Vercel |
| Analytics | @vercel/analytics |
| Imágenes | next/image + sharp |

---

## 3. Variables de Entorno

Crear `.env.local` con:

```env
CONTENTFUL_SPACE_ID=tu_space_id
CONTENTFUL_ACCESS_TOKEN=tu_delivery_api_token
CONTENTFUL_PREVIEW_TOKEN=tu_preview_token
CONTENTFUL_REVALIDATE_SECRET=un_string_secreto_aleatorio
```

Nunca commitear `.env.local`. Está en `.gitignore`.
En Vercel, configurar las mismas variables desde el dashboard → Settings → Environment Variables.

---

## 4. Design Tokens

Definir en `tailwind.config.ts` y en `globals.css` como CSS variables:

```css
:root {
  --color-bg:        #2d2e31;
  --color-surface:   #3a3b3f;
  --color-surface2:  #44454a;
  --color-accent:    #859f3d;
  --color-accent-hover: #97b445;
  --color-text:      #f5f5f5;
  --color-text-muted: #a0a0a8;
  --color-border:    #4a4b50;

  --font-display: 'NombreFuenteDisplay', sans-serif;
  --font-body:    'NombreFuenteBody', sans-serif;

  --radius-card:  12px;
  --radius-btn:   8px;
  --shadow-card:  0 4px 24px rgba(0,0,0,0.4);
  --shadow-glow:  0 0 20px rgba(133,159,61,0.25);
}
```

**Tipografía:**
- Display (headings, logo): fuente geométrica o monoespaciada con carácter — ejemplos válidos: `Syne`, `Oxanium`, `Orbitron`, `DM Mono`. Elegir UNA y usarla consistentemente.
- Body: fuente legible con personalidad — ejemplos: `Outfit`, `DM Sans`, `Nunito`. Evitar Inter, Roboto, Arial.

---

## 5. Estructura de Carpetas

```
/
├── app/
│   ├── layout.tsx                  # Root layout: fuentes, metadata global, Analytics
│   ├── globals.css                 # CSS variables, reset, estilos base
│   ├── page.tsx                    # Home (/)
│   ├── proyectos/
│   │   └── page.tsx                # /proyectos — todos los proyectos
│   ├── certificados/
│   │   └── page.tsx                # /certificados — todos los certificados
│   ├── contacto/
│   │   └── page.tsx                # /contacto — página de contacto standalone
│   └── api/
│       └── revalidate/
│           └── route.ts            # Webhook endpoint para ISR on-demand
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── MobileMenu.tsx
│   ├── home/
│   │   ├── HeroSection.tsx         # Hero con fondo 3D
│   │   ├── HeroBackground3D.tsx    # Canvas Three.js
│   │   ├── PresentationSection.tsx # Foto + historia
│   │   └── ShowcaseSection.tsx     # Tabs: proyectos, certificados, herramientas
│   ├── projects/
│   │   ├── ProjectCard.tsx
│   │   ├── ProjectGrid.tsx
│   │   └── ProjectFilters.tsx
│   ├── certificates/
│   │   ├── CertificateCard.tsx
│   │   ├── CertificateGrid.tsx
│   │   └── CertificateFilters.tsx
│   ├── tools/
│   │   └── ToolsGrid.tsx
│   ├── contact/
│   │   └── ContactForm.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── SectionTitle.tsx
│       ├── AnimatedSection.tsx     # Wrapper con scroll animation (Framer Motion)
│       ├── TabNav.tsx
│       └── Pagination.tsx
│
├── lib/
│   ├── contentful.ts               # Cliente Contentful + funciones de fetch
│   ├── contentful-types.ts         # Tipos TypeScript para los content models
│   └── whatsapp.ts                 # Helper para generar wa.me links
│
├── hooks/
│   ├── useScrollAnimation.ts       # Hook para Intersection Observer
│   └── useActiveSection.ts         # Para highlight del nav en scroll
│
├── public/
│   ├── photo.jpg                   # Foto del desarrollador
│   └── og-image.png                # Open Graph image
│
├── .env.local
├── .gitignore
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── CLAUDE.md                       # Este archivo
```

---

## 6. Modelos de Contenido en Contentful

### `portfolioProject`
| Campo | Tipo | Requerido |
|---|---|---|
| title | Short text | ✅ |
| slug | Short text (unique) | ✅ |
| description | Long text | ✅ |
| image | Media | ✅ |
| techStack | Short text, list | ✅ |
| category | Short text (enum: Frontend, Backend, Full Stack, Mobile, Other) | ✅ |
| githubUrl | Short text | |
| liveUrl | Short text | |
| featured | Boolean | ✅ |
| date | Date | ✅ |

### `certificate`
| Campo | Tipo | Requerido |
|---|---|---|
| title | Short text | ✅ |
| issuer | Short text | ✅ |
| issuerLogo | Media | |
| image | Media | ✅ |
| certificateUrl | Short text | |
| category | Short text (enum: Platzi, Udemy, Coursera, freeCodeCamp, Other) | ✅ |
| date | Date | ✅ |

### `tool`
| Campo | Tipo | Requerido |
|---|---|---|
| name | Short text | ✅ |
| icon | Media (SVG/PNG) | ✅ |
| category | Short text (enum: Frontend, Backend, DevOps, Database, Design, Other) | ✅ |
| order | Integer | |

---

## 7. lib/contentful.ts — Funciones de Fetch

Implementar las siguientes funciones. Todas usan `fetch` nativo de Next.js con tags para ISR:

```typescript
// Proyectos
getProjects(options?: { limit?: number; featured?: boolean; category?: string }): Promise<Project[]>
getProject(slug: string): Promise<Project | null>

// Certificados
getCertificates(options?: { limit?: number; category?: string }): Promise<Certificate[]>

// Herramientas
getTools(): Promise<Tool[]>
```

Ejemplo de implementación base:

```typescript
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
})

export async function getProjects({ limit, featured, category }: GetProjectsOptions = {}) {
  const entries = await client.getEntries({
    content_type: 'portfolioProject',
    order: ['-fields.date'],
    ...(limit && { limit }),
    ...(featured !== undefined && { 'fields.featured': featured }),
    ...(category && { 'fields.category': category }),
  })
  return entries.items.map(mapProject)
}
```

Usar `next: { tags: ['projects'] }` en los fetch para ISR.

---

## 8. API Route: Revalidación (Contentful Webhook)

**Archivo:** `app/api/revalidate/route.ts`

```typescript
import { revalidateTag, revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')

  if (secret !== process.env.CONTENTFUL_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  const body = await req.json()
  const contentType = body?.sys?.contentType?.sys?.id

  const tagMap: Record<string, string[]> = {
    portfolioProject: ['projects'],
    certificate: ['certificates'],
    tool: ['tools'],
  }

  const tags = tagMap[contentType] ?? ['all']
  tags.forEach(tag => revalidateTag(tag))
  revalidatePath('/')
  revalidatePath('/proyectos')
  revalidatePath('/certificados')

  return NextResponse.json({ revalidated: true, tags })
}
```

**Configurar en Contentful:**
- Settings → Webhooks → Add Webhook
- URL: `https://tu-dominio.vercel.app/api/revalidate?secret=TU_SECRET`
- Triggers: Publish, Unpublish de los 3 content types

---

## 9. Componentes — Especificaciones Detalladas

### Header (`components/layout/Header.tsx`)
- Sticky con `position: sticky; top: 0; z-index: 50`
- Backdrop blur al hacer scroll (`backdrop-blur-md bg-bg/80`)
- Desktop (≥1024px): Logo izq | Nav centro | Botón "Contáctame" der
- Tablet/Mobile (<1024px): Logo izq | Hamburger der → drawer/dropdown con nav links
- Nav links: Home, Proyectos, Certificados (highlight del link activo con `usePathname`)
- Botón Contáctame: link a `/contacto`, estilo filled olive green

### HeroSection (`components/home/HeroSection.tsx`)
- Full viewport height (`min-h-screen`)
- Contenido centrado verticalmente
- Headline: `"Desarrollador de Software Full Stack"` — fuente display, grande (clamp 2.5rem → 5rem)
- Subheadline: descripción corta en 1 línea, fuente body, color muted
- Botones: `"Ver Proyectos"` (primary) + `"Sobre mí"` (ghost/outline)
- Fila de iconos sociales: WhatsApp (`wa.me/TUNUMERO`), LinkedIn, GitHub
- Background: `<HeroBackground3D />` como capa absoluta detrás del contenido
- Animación de entrada: staggered fade+slide-up con Framer Motion

### HeroBackground3D (`components/home/HeroBackground3D.tsx`)
- Canvas Three.js que ocupa 100% del contenedor
- Geometría: partículas flotantes O wireframe de geometría icosaédrica rotando lentamente
- Color de partículas/líneas: `#859f3d` con opacidad 0.3–0.5
- Performance: usar `frameloop="demand"` si es posible, reducir en mobile
- Cargar con `dynamic(() => import(...), { ssr: false })` para evitar errores de SSR

### PresentationSection (`components/home/PresentationSection.tsx`)
- Desktop: grid 2 columnas (foto izq, texto der)
- Tablet: grid 2 columnas más compacto
- Mobile: stack — foto arriba, texto abajo
- Foto: `next/image`, contenedor con `border-2 border-accent`, `box-shadow: var(--shadow-glow)`, `border-radius: var(--radius-card)`
- Texto: heading "Sobre mí" + 2–3 párrafos
- Animate on scroll con `<AnimatedSection>`

### ShowcaseSection (`components/home/ShowcaseSection.tsx`)
- Tab nav centrada: pills `Proyectos | Certificados | Herramientas`
- Estado del tab activo con `useState`
- Transición entre tabs: `AnimatePresence` de Framer Motion
- **Tab Proyectos:** NO mostrar cards de proyectos. Mostrar un bloque visual atractivo (ej: número de proyectos, descripción corta, íconos de tech) con un único botón CTA grande centrado `"Ver todos los proyectos →"` que redirige a `/proyectos`
- **Tab Certificados:** NO mostrar cards de certificados. Mostrar un bloque visual atractivo (ej: número de certificados, plataformas, descripción) con un único botón CTA grande centrado `"Ver todos los certificados →"` que redirige a `/certificados`
- **Tab Herramientas:** icon grid con nombre debajo de cada icono
- Los bloques de Proyectos y Certificados deben ser visualmente llamativos aunque no listen items — usar números destacados, íconos grandes, o un diseño tipo "teaser card" con fondo surface
- Desktop: contenido centrado con max-w-2xl | Tablet/Mobile: full-width con padding

### ProjectCard (`components/projects/ProjectCard.tsx`)
```typescript
interface ProjectCardProps {
  title: string
  description: string
  image: string
  techStack: string[]
  githubUrl?: string
  liveUrl?: string
  showDetailButton?: boolean  // true en showcase, false en /proyectos si no hay página de detalle
}
```
- Imagen con `next/image`, aspect ratio 16/9
- Tags de tech stack como pills pequeñas
- Footer de la card: botón "GitHub" (icono + texto) + botón "Ver proyecto" (si liveUrl existe)
- Hover: `translateY(-4px)` + `box-shadow: var(--shadow-glow)`

### CertificateCard (`components/certificates/CertificateCard.tsx`)
- Imagen del certificado o logo del emisor
- Título, emisor, fecha formateada
- Botón "Ver certificado" → link externo
- Mismo efecto hover que ProjectCard

### ContactForm (`components/contact/ContactForm.tsx`)
- Campos: Nombre (text), Email (email), Asunto (text), Mensaje (textarea)
- Validación con zod:
  - nombre: min 2 chars
  - email: email válido
  - asunto: min 3 chars
  - mensaje: min 10 chars
- Submit: construir mensaje y abrir `wa.me` link
- Estados de UI: idle → loading → success/error
- Mostrar errores inline bajo cada campo

```typescript
// lib/whatsapp.ts
export function buildWhatsAppUrl(phone: string, data: ContactFormData): string {
  const message = `Hola! Soy ${data.nombre}.\n\nAsunto: ${data.asunto}\n\nMensaje: ${data.mensaje}\n\nEmail de contacto: ${data.email}`
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}
```

### AnimatedSection (`components/ui/AnimatedSection.tsx`)
Wrapper reutilizable para animaciones de scroll:

```typescript
// Uso:
<AnimatedSection>
  <MiComponente />
</AnimatedSection>

// Implementación: Framer Motion + useInView
// Animación: opacity 0→1 + y 30→0, duration 0.6, ease "easeOut"
```

---

## 10. Páginas

### Home (`app/page.tsx`)
Server Component. La sección Showcase solo muestra CTAs de redirección para proyectos y certificados, por lo que en Home solo se necesita fetchar las herramientas:
```typescript
const tools = await getTools()
```
Renderiza en orden: `<HeroSection>` → `<PresentationSection>` → `<ShowcaseSection tools={tools} />` → `<ContactForm>`

> **Importante:** NO fetchar proyectos ni certificados en Home. La ShowcaseSection redirige a `/proyectos` y `/certificados` directamente sin previsualizar cards.

### /proyectos (`app/proyectos/page.tsx`)
Server Component con soporte para searchParams (filtro por categoría):
```typescript
// URL: /proyectos?category=Frontend
export default async function ProyectosPage({ searchParams }) {
  const category = searchParams?.category
  const projects = await getProjects({ category })
  // ...
}
```
Layout:
- Banner hero: título "Mis Proyectos" + subtítulo
- `<ProjectFilters>` (Client Component) — pills de categoría que actualizan URL con `useRouter`
- `<ProjectGrid projects={projects} />`
- Breadcrumb o link "← Volver al inicio"

### /certificados (`app/certificados/page.tsx`)
Misma estructura que /proyectos pero para certificados.
Filtros por issuer: All, Platzi, Udemy, Coursera, freeCodeCamp, Other.

### /contacto (`app/contacto/page.tsx`)
Página standalone con el formulario centrado y algo más de contexto (email, LinkedIn, GitHub).

---

## 11. Responsive — Reglas Globales

| Breakpoint | Prefijo Tailwind | Uso |
|---|---|---|
| Mobile | (base) | 375px+ |
| Tablet | `md:` | 768px+ |
| Desktop | `lg:` | 1024px+ |
| Wide | `xl:` | 1440px+ |

Reglas generales:
- Mobile-first en Tailwind
- Padding horizontal base: `px-4` mobile, `px-8` tablet, `px-16` desktop
- Max-width del contenido: `max-w-7xl mx-auto`
- Grids de cards: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Header nav: oculto en mobile (`hidden lg:flex`), hamburger visible en mobile (`lg:hidden`)
- Animaciones 3D: desactivar o simplificar en mobile (`window.innerWidth < 768` o media query)
- Fuentes: escalar con `clamp()` o clases responsive de Tailwind (`text-3xl md:text-5xl lg:text-7xl`)

---

## 12. Performance & SEO

### next.config.ts
```typescript
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.ctfassets.net' }, // Contentful
    ],
  },
}
```

### Metadata
Cada página define su metadata:
```typescript
// app/layout.tsx
export const metadata: Metadata = {
  title: { default: 'Tu Nombre | Developer', template: '%s | Tu Nombre' },
  description: 'Desarrollador de Software Full Stack...',
  openGraph: { images: ['/og-image.png'] },
}
```

### Optimizaciones
- Usar `next/image` para TODAS las imágenes (lazy loading automático)
- Cargar HeroBackground3D con `dynamic(..., { ssr: false })`
- Fonts con `next/font/google` y `display: 'swap'`
- Prefetch automático de Next.js en links internos

---

## 13. Deployment en Vercel

### Pre-deploy checklist
- [ ] Variables de entorno configuradas en Vercel dashboard
- [ ] `CONTENTFUL_REVALIDATE_SECRET` configurado
- [ ] Dominio personalizado configurado (si aplica)
- [ ] Webhook de Contentful apuntando al dominio de producción

### Configurar Contentful Webhook
1. Contentful → Settings → Webhooks
2. Name: `Vercel ISR Revalidation`
3. URL: `https://tu-proyecto.vercel.app/api/revalidate?secret=TU_SECRET`
4. Method: POST
5. Triggers: `Entry.publish`, `Entry.unpublish` para content types: `portfolioProject`, `certificate`, `tool`
6. Headers: `Content-Type: application/json`

---

## 14. Orden de Implementación Recomendado

1. **Setup inicial** — crear proyecto Next.js, instalar dependencias, configurar Tailwind, fuentes, CSS variables
2. **lib/contentful.ts** — cliente, tipos TypeScript, funciones de fetch
3. **Componentes UI base** — Button, SectionTitle, AnimatedSection, TabNav
4. **Layout** — Header + Footer + MobileMenu
5. **Home page** — sección por sección: Hero → Presentation → Showcase → Contact
6. **HeroBackground3D** — Three.js canvas (dejar para después del layout base)
7. **Página /proyectos** — con filtros y grid completo
8. **Página /certificados** — con filtros y grid completo
9. **Página /contacto** — standalone
10. **API route revalidación** — webhook endpoint
11. **Pulir animaciones** — scroll animations, hover effects, transiciones
12. **SEO & metadata** — todas las páginas
13. **Deploy a Vercel** — configurar env vars y webhook

---

## 15. Convenciones de Código

- Componentes: PascalCase, un componente por archivo
- Funciones/hooks: camelCase
- Archivos de tipos: `*.types.ts` o inline en el archivo que los usa
- Server Components por defecto; agregar `'use client'` solo cuando sea necesario (interactividad, hooks de browser)
- No usar `any`. Tipar todo explícitamente.
- Imports absolutos configurados en `tsconfig.json`: `@/components/...`, `@/lib/...`, etc.
- Clases Tailwind: ordenar con Prettier + `prettier-plugin-tailwindcss`

---

## 16. Dependencias — package.json

```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "contentful": "^10.0.0",
    "framer-motion": "^11.0.0",
    "three": "^0.168.0",
    "@react-three/fiber": "^8.0.0",
    "@react-three/drei": "^9.0.0",
    "react-hook-form": "^7.0.0",
    "zod": "^3.0.0",
    "@hookform/resolvers": "^3.0.0",
    "lucide-react": "^0.400.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0",
    "@vercel/analytics": "^1.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/node": "^20.0.0",
    "@types/react": "^19.0.0",
    "@types/three": "^0.168.0",
    "tailwindcss": "^4.0.0",
    "@tailwindcss/postcss": "^4.0.0",
    "prettier": "^3.0.0",
    "prettier-plugin-tailwindcss": "^0.6.0"
  }
}
```

---

*Última actualización: generado para Claude Code — leer completo antes de iniciar cualquier tarea.*