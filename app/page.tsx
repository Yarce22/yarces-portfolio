import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import PresentationSection from "@/components/home/PresentationSection";
import ShowcaseSection from "@/components/home/ShowcaseSection";
import ContactForm from "@/components/contact/ContactForm";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Mail, Phone, MapPin, MessageCircle, Linkedin, Github } from "lucide-react";
import { getTools, getProjects, getCertificates, getSiteConfig } from "@/lib/contentful";

export default async function Home() {
  const [tools, projects, certificates, siteConfig] = await Promise.all([
    getTools(),
    getProjects({ featured: true }),
    getCertificates({ limit: 3 }),
    getSiteConfig(),
  ]);

  const whatsappUrl = siteConfig?.whatsappNumber
    ? `https://wa.me/57${siteConfig.whatsappNumber}`
    : "https://wa.me/573123119897";

  return (
    <>
      <Header />
      <main>
        <HeroSection siteConfig={siteConfig} />
        <PresentationSection siteConfig={siteConfig} />
        <ShowcaseSection tools={tools} projects={projects} certificates={certificates} />

        {/* Contact Section */}
        <section className="bg-[var(--color-surface-dark)] py-24 md:py-28">
          <div className="max-w-7xl mx-auto w-full"
          style={{ paddingLeft: "var(--page-px)", paddingRight: "var(--page-px)" }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
              {/* Left: Contact Info */}
              <AnimatedSection className="flex flex-col gap-8 justify-center">
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--color-accent)] font-[family-name:var(--font-display)]">
                    CONTACTO
                  </span>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-text)] font-[family-name:var(--font-heading)]">
                    ¿Tienes un proyecto en mente?
                  </h2>
                </div>
                <p className="text-[var(--color-text-muted)] font-[family-name:var(--font-body)] text-base leading-relaxed">
                  Cuéntame sobre tu idea y trabajemos juntos para hacerla
                  realidad.
                </p>

                <div className="flex flex-col gap-5">
                  <a
                    href="mailto:alejomira96@gmail.com"
                    className="flex items-center gap-4 text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors"
                  >
                    <Mail size={20} className="text-[var(--color-accent)]" />
                    <span className="font-[family-name:var(--font-body)] text-base">
                      alejomira96@gmail.com
                    </span>
                  </a>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors"
                  >
                    <Phone size={20} className="text-[var(--color-accent)]" />
                    <span className="font-[family-name:var(--font-body)] text-base">
                      +57 312 311 9897
                    </span>
                  </a>
                  <div className="flex items-center gap-4">
                    <MapPin size={20} className="text-[var(--color-accent)]" />
                    <span className="font-[family-name:var(--font-body)] text-base text-[var(--color-text)]">
                      Pereira, Colombia
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {[
                    {
                      href: whatsappUrl,
                      icon: MessageCircle,
                      label: "WhatsApp",
                    },
                    {
                      href: siteConfig?.linkedinUrl ?? "https://www.linkedin.com/in/alejomiyar/",
                      icon: Linkedin,
                      label: "LinkedIn",
                    },
                    {
                      href: siteConfig?.githubUrl ?? "https://github.com/Yarce22",
                      icon: Github,
                      label: "GitHub",
                    },
                  ].map(({ href, icon: Icon, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-11 h-11 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all duration-200"
                    >
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </AnimatedSection>

              {/* Right: Form */}
              <AnimatedSection delay={0.15}>
                <ContactForm />
              </AnimatedSection>
            </div>
          </div>
        </section>
      </main>
      <Footer siteConfig={siteConfig} />
    </>
  );
}
