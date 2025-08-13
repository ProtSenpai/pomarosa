// PomarosaPage.tsx — versión mejorada (alineación, responsivo, animaciones re-trigger, paddings y color)
import * as React from "react";
import { motion, Variants } from "framer-motion";

// ============================
// UI constants
// ============================
const UI = {
  brand: "Pomarosa",
  phoneIntl: "+573017541619",
  phonePretty: "+57 301 754 1619",
  colors: {
    // crema un poco más luminoso y texto con mayor contraste
    bg: "#FAF6F1",
    text: "#1E1B18",
    gray: "#6B6460",
    border: "#E7E0DA",
    // CTA con hover más perceptible
    cta: "#E9B6A9",
    ctaHover: "#DFA496",
  },
  copy: {
    heroTitleA: "Velas artesanales que",
    heroTitleB: "iluminan tu pausa",
    heroSubtitle: "Diseñadas para transformar espacios en refugios de calma",
    heroCTA: "Descubre nuestras fragancias",
    storyTitle: "Historia de la marca",
    storyCTA: "Conoce nuestra historia",
    productsTitle: "Productos destacados",
    testimonialsTitle: "Testimonios",
    bigCtaTitle: "¿Listo para transformar tu espacio en un refugio de calma?",
    bigCtaButton: "Ordenar por WhatsApp",
    footerContact: "Escríbenos por WhatsApp:",
    copyright: "© 2024 Pomarosa. Todos los derechos reservados.",
  },
  waMessages: {
    Serenity:
      "Hola Pomarosa, quiero ordenar la Vela Serenity. ¿Me compartes disponibilidad y tiempos de entrega?",
    Harmony:
      "Hola Pomarosa, me interesa la Vela Harmony. ¿Qué fragancias tienen ahora?",
    Tranquility:
      "Hola Pomarosa, deseo la Vela Tranquility. ¿Costo de envío a mi ciudad?",
  },
};

// ============================
// Utilidades
// ============================
export function waLink(number: string = UI.phoneIntl, message: string) {
  return `https://wa.me/${number.replace(/[^\d+]/g, "")}?text=${encodeURIComponent(
    message
  )}`;
}

// ============================
// Motion variants
// ============================
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};
const fadeIn: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};
const staggerChildren: Variants = {
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

// ============================
// Hook sticky header
// ============================
function useStickyHeader(threshold = 22) {
  const [stuck, setStuck] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return stuck;
}

// ============================
// Section wrapper (alineación + paddings simétricos + re-trigger)
// ============================
type SectionProps = {
  id?: string;
  title?: string;
  className?: string;
  children: React.ReactNode;
};
const Section: React.FC<SectionProps> = ({
  id,
  title,
  className = "",
  children,
}) => (
  <section
    id={id}
    aria-labelledby={title ? `${id}-title` : undefined}
    className={`py-14 sm:py-16 lg:py-20 ${className}`}
  >
    <motion.div
      className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8"
      variants={staggerChildren}
      initial="hidden"
      whileInView="visible"
      // ❗ Animaciones se vuelven a disparar al reentrar en viewport
      viewport={{ once: false, amount: 0.2 }}
    >
      {title ? (
        <motion.h2
          id={`${id}-title`}
          variants={fadeIn}
          className="font-display text-[1.5rem] sm:text-[1.75rem] lg:text-[2rem] leading-tight text-neutral-900 mb-6"
        >
          {title}
        </motion.h2>
      ) : null}
      {children}
    </motion.div>
  </section>
);

// ============================
// Botón WhatsApp
// ============================
type WhatsAppButtonProps = {
  label: string;
  message: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};
const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  label,
  message,
  size = "md",
  className = "",
}) => {
  const base =
    "inline-flex items-center justify-center rounded-2xl border border-[--border] bg-[--cta] text-neutral-900 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-800 transition-shadow";
  const paddings =
    size === "sm"
      ? "px-3 py-2 text-sm"
      : size === "lg"
      ? "px-5 py-3 text-base"
      : "px-4 py-2.5 text-sm";
  return (
    <motion.a
      href={waLink(UI.phoneIntl, message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`${base} ${paddings} ${className}`}
      style={
        {
          ["--cta" as any]: UI.colors.cta,
          ["--border" as any]: UI.colors.border,
        } as React.CSSProperties
      }
      whileHover={{
        scale: 1.03,
        boxShadow: "0 10px 24px rgba(0,0,0,.12)",
        backgroundColor: UI.colors.ctaHover,
      }}
      whileTap={{ scale: 0.98 }}
    >
      <svg
        aria-hidden="true"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        className="mr-2"
        role="img"
      >
        <path
          fill="currentColor"
          d="M20.52 3.48A11.86 11.86 0 0 0 12.01 0C5.4 0 .06 5.34.06 11.95c0 2.1.55 4.1 1.6 5.9L0 24l6.27-1.64a11.94 11.94 0 0 0 5.73 1.47h.01c6.61 0 11.95-5.34 11.95-11.95c0-3.2-1.25-6.2-3.44-8.4ZM12 21.54h-.01a9.6 9.6 0 0 1-4.9-1.36l-.35-.21l-3.72.97l.99-3.63l-.23-.37A9.56 9.56 0 0 1 2.43 12C2.43 6.96 6.96 2.43 12 2.43c2.55 0 4.95.99 6.76 2.8a9.51 9.51 0 0 1 2.8 6.76c0 5.04-4.53 9.55-9.56 9.55Zm5.46-7.17c-.3-.15-1.77-.87-2.04-.97c-.27-.1-.47-.15-.67.15c-.2.29-.77.97-.95 1.17c-.17.2-.35.22-.64.08c-.3-.15-1.25-.46-2.38-1.47c-.88-.78-1.47-1.75-1.65-2.05c-.17-.29-.02-.45.13-.6c.14-.14.3-.35.45-.52c.15-.17.2-.29.3-.49c.1-.2.05-.37-.02-.52c-.08-.15-.67-1.62-.92-2.22c-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.8.37c-.27.29-1.05 1.03-1.05 2.5c0 1.47 1.08 2.9 1.23 3.1c.15.2 2.12 3.24 5.14 4.55c.72.31 1.28.49 1.72.62c.72.23 1.37.2 1.88.12c.57-.08 1.77-.72 2.02-1.42c.25-.7.25-1.3.17-1.42c-.07-.12-.27-.2-.57-.35Z"
        />
      </svg>
      {label}
    </motion.a>
  );
};

// ============================
// Header
// ============================
const Header: React.FC = () => {
  const stuck = useStickyHeader(22);
  return (
    <header
      className="sticky top-0 z-50"
      style={{ backdropFilter: stuck ? "saturate(140%) blur(8px)" : undefined }}
    >
      <div
        className={`transition-colors duration-300 ${
          stuck ? "bg-white/70" : "bg-transparent"
        } border-b ${stuck ? "border-[--border]" : "border-transparent"}`}
        style={{ ["--border" as any]: UI.colors.border }}
      >
        <nav
          aria-label="Principal"
          className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 h-14 flex items-center justify-between"
        >
          <a
            href="#"
            className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-800 rounded-lg"
            aria-label={`${UI.brand} inicio`}
          >
            <span className="h-4 w-4 rounded-sm bg-neutral-900 inline-block group-hover:scale-110 transition-transform" />
            <span className="font-medium text-neutral-900">{UI.brand}</span>
          </a>

          <div className="hidden md:flex items-center gap-6">
            {[
              { href: "#productos", label: "Tienda" },
              { href: "#historia", label: "Nosotros" },
              { href: "#contacto", label: "Contacto" },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm text-neutral-700 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-800 rounded md:px-1 underline-offset-4 hover:underline"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <IconButton label="Buscar">
              <IconSearch />
            </IconButton>
            <IconButton label="Carrito">
              <IconCart />
            </IconButton>
            <div className="md:hidden">
              <IconButton label="Menú">
                <IconMenu />
              </IconButton>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

const IconButton: React.FC<{ label: string; children: React.ReactNode }> = ({
  label,
  children,
}) => (
  <button
    aria-label={label}
    className="h-9 w-9 inline-flex items-center justify-center rounded-xl border border-[--border] bg-white/70 text-neutral-800 hover:shadow-md transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-800"
    style={{ ["--border" as any]: UI.colors.border }}
  >
    {children}
  </button>
);

const IconSearch = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" role="img" aria-hidden="true">
    <path
      fill="currentColor"
      d="M10 18a8 8 0 1 1 6.32-3.09l4.39 4.38l-1.41 1.42l-4.4-4.4A7.97 7.97 0 0 1 10 18Zm0-14a6 6 0 1 0 0 12a6 6 0 0 0 0-12Z"
    />
  </svg>
);
const IconCart = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" role="img" aria-hidden="true">
    <path
      fill="currentColor"
      d="M7 18a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 18Zm10 0a2 2 0 1 0 .001 4.001A2 2 0 0 0 17 18ZM3 2h2l3 12h9l2.6-7H8.1l-.6-2H21l-1 3l-2.9 8H7.4L4.9 4H3Z"
    />
  </svg>
);
const IconMenu = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" role="img" aria-hidden="true">
    <path fill="currentColor" d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z" />
  </svg>
);

// ============================
// Hero (se mantiene con container para alinear)
// ============================
import hero from "./assets/hero.jpg";
const Hero: React.FC = () => {
  return (
    <div className="relative isolate">
      <figure className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="relative h-[56vh] sm:h-[64vh] lg:h-[66vh] overflow-hidden rounded-2xl">
          <img
            src={hero}
            alt="Vela encendida sobre fondo cálido"
            className="absolute inset-0 w-full h-full object-cover"
            fetchPriority="high"
            decoding="sync"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/15 to-transparent" />
          <motion.figcaption
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="absolute inset-0 flex items-end sm:items-center lg:items-center"
          >
            <div className="p-6 sm:p-10 lg:p-12 max-w-2xl">
              <h1 className="font-display text-white leading-tight text-3xl sm:text-4xl lg:text-5xl drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]">
                {UI.copy.heroTitleA}
                <br />
                <span className="whitespace-pre-line">{UI.copy.heroTitleB}</span>
              </h1>
              <p className="mt-3 text-white/90 text-sm sm:text-base max-w-xl">
                {UI.copy.heroSubtitle}
              </p>
              <div className="mt-5">
                <WhatsAppButton
                  label={UI.copy.heroCTA}
                  message="Hola Pomarosa, quisiera conocer sus fragancias disponibles."
                  size="lg"
                />
              </div>
            </div>
          </motion.figcaption>
        </div>
      </figure>
    </div>
  );
};

// ============================
// Beneficios (grid auto-fit para ocupar ancho)
// ============================
type BenefitPillProps = { icon: React.ReactNode; text: string };
const BenefitPill: React.FC<BenefitPillProps> = ({ icon, text }) => (
  <motion.div
    variants={fadeIn}
    whileHover={{ y: -2, boxShadow: "0 10px 24px rgba(0,0,0,.08)" }}
    className="inline-flex items-center gap-2 rounded-2xl border px-4 py-3 text-sm bg-white transition w-full"
    style={{ borderColor: UI.colors.border }}
    role="listitem"
  >
    <span aria-hidden="true" className="text-neutral-700">
      {icon}
    </span>
    <span className="text-neutral-800">{text}</span>
  </motion.div>
);

const IconLeaf = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" role="img" aria-hidden="true">
    <path
      fill="currentColor"
      d="M5 3c9 0 14 5 14 14c-9 0-14-5-14-14Zm0 0v0c0 9 5 14 14 14c0 0-5 5-14 5C3 22 2 16 5 3Z"
    />
  </svg>
);
const IconSeed = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" role="img" aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 2C7.58 2 4 7.03 4 12s3.58 10 8 10s8-5.03 8-10S16.42 2 12 2Zm0 18c-3.32 0-6-3.59-6-8s2.68-8 6-8s6 3.59 6 8s-2.68 8-6 8Z"
    />
  </svg>
);
const IconHome = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" role="img" aria-hidden="true">
    <path fill="currentColor" d="M12 3l9 8h-2v9h-5v-6H10v6H5v-9H3z" />
  </svg>
);

const Benefits: React.FC = () => (
  <Section id="beneficios" title="Beneficios clave">
    <motion.div
      variants={staggerChildren}
      // auto-fit para ocupar todo el ancho con tarjetas fluidas
      className="grid gap-3"
      style={{
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      }}
      role="list"
      aria-label="Beneficios clave"
    >
      <BenefitPill icon={<IconLeaf />} text="Hechas a mano y naturales" />
      <BenefitPill icon={<IconSeed />} text="Ingredientes sostenibles" />
      <BenefitPill icon={<IconHome />} text="Diseños minimalistas" />
    </motion.div>
  </Section>
);

// ============================
// Historia
// ============================
const Story: React.FC = () => (
  <Section id="historia" title={UI.copy.storyTitle}>
    <motion.div variants={fadeIn}>
      <p className="text-[15px] leading-7 text-neutral-700 max-w-3xl">
        En Pomarosa creamos velas artesanales con aromas cálidos y diseños
        minimalistas inspirados en rituales de bienestar. Cada fragancia
        transforma los espacios y las rutinas diarias en experiencias
        sensoriales de autocuidado. Cuidamos cada detalle —desde los
        ingredientes naturales hasta el empaque— para que tu pausa se convierta
        en un refugio de calma.
      </p>
      <div className="mt-5">
        <a
          href="#"
          className="inline-flex text-sm font-medium underline underline-offset-4 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-800 rounded"
          aria-label={UI.copy.storyCTA}
        >
          {UI.copy.storyCTA}
        </a>
      </div>
    </motion.div>
  </Section>
);

// ============================
// Productos
// ============================
import prod1 from "./assets/prod-serenity.png";
import prod2 from "./assets/prod-harmony.png";
import prod3 from "./assets/prod-tranquility.png";

type ProductCardProps = {
  image: string;
  alt: string;
  name: "Serenity" | "Harmony" | "Tranquility";
  price: string;
};
const ProductCard: React.FC<ProductCardProps> = ({
  image,
  alt,
  name,
  price,
}) => (
  <motion.article
    variants={fadeIn}
    className="rounded-2xl overflow-hidden border bg-white"
    style={{ borderColor: UI.colors.border }}
  >
    <figure className="aspect-[4/3] overflow-hidden">
      <img
        src={image}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover"
      />
    </figure>
    <div className="p-4">
      <h3 className="text-neutral-900 font-medium">{`Vela ${name}`}</h3>
      <p className="text-neutral-600 text-sm">{price}</p>
    </div>
  </motion.article>
);

const Products: React.FC = () => {
  return (
    <Section id="productos" title={UI.copy.productsTitle}>
      {/* Grid de cards 1→2→3 */}
      <motion.div
        variants={staggerChildren}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        role="list"
        aria-label="Lista de productos"
      >
        <ProductCard
          image={prod1}
          alt="Vela Serenity en frasco de vidrio"
          name="Serenity"
          price="$35"
        />
        <ProductCard
          image={prod2}
          alt="Vela Harmony sobre superficie minimalista"
          name="Harmony"
          price="$40"
        />
        <ProductCard
          image={prod3}
          alt="Vela Tranquility en base de cerámica"
          name="Tranquility"
          price="$30"
        />
      </motion.div>

      {/* Botonera con layout: 
         - Mobile: 1 col (stack)
         - Tablet: 2 cols
         - Desktop: 2 cols donde las 2 primeras filas son 1 botón a lo ancho (col-span-2)
           y la última fila tiene 2 botones (cada uno 1 col) */}
      <div className="mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3">
          <WhatsAppButton
            label="Ordenar Serenity por WhatsApp"
            message={UI.waMessages.Serenity}
            className="lg:col-span-2"
          />
          <WhatsAppButton
            label="Ordenar Harmony por WhatsApp"
            message={UI.waMessages.Harmony}
            className="lg:col-span-2"
          />
          <WhatsAppButton
            label="Ordenar Tranquility por WhatsApp"
            message={UI.waMessages.Tranquility}
          />
          <motion.a
            href="#"
            aria-label="Ver todos los productos"
            className="inline-flex items-center justify-center rounded-2xl border text-sm px-4 py-2.5 bg-white hover:shadow-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-800"
            style={{ borderColor: UI.colors.border }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Ver todos los productos
          </motion.a>
        </div>
      </div>
    </Section>
  );
};

// ============================
// Testimonios (avatares más grandes + re-trigger)
// ============================
import ava1 from "./assets/ava1.png";
import ava2 from "./assets/ava2.png";
import ava3 from "./assets/ava3.png";

type TestimonialCardProps = {
  avatar: string;
  alt: string;
  name: string;
  quote: string;
};
const TestimonialCard: React.FC<TestimonialCardProps> = ({
  avatar,
  alt,
  name,
  quote,
}) => (
  <motion.figure variants={fadeIn} className="text-center">
    <div
      className="mx-auto h-44 w-44 sm:h-48 sm:w-48 lg:h-52 lg:w-52 rounded-full overflow-hidden ring-1 ring-[--border] bg-white"
      style={{ ["--border" as any]: UI.colors.border }}
    >
      <img
        src={avatar}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover"
      />
    </div>
    <figcaption className="mt-4">
      <div className="font-medium text-neutral-900">{name}</div>
      <blockquote className="mt-2 text-sm text-neutral-700 max-w-md mx-auto leading-6">
        “{quote}”
      </blockquote>
    </figcaption>
  </motion.figure>
);

const Testimonials: React.FC = () => (
  <Section id="testimonios" title={UI.copy.testimonialsTitle}>
    <motion.div
      variants={staggerChildren}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      <TestimonialCard
        avatar={ava1}
        alt="Retrato ilustrado de Sophia Bennett"
        name="Sophia Bennett"
        quote="Las velas de Pomarosa han convertido mi hogar en un santuario. El diseño minimalista es perfecto con mi decoración."
      />
      <TestimonialCard
        avatar={ava2}
        alt="Retrato ilustrado de Ethan Carter"
        name="Ethan Carter"
        quote="Me encantan los ingredientes naturales y la propuesta sostenible. Las fragancias son sutiles y elegantes."
      />
      <TestimonialCard
        avatar={ava3}
        alt="Retrato ilustrado de Olivia Hayes"
        name="Olivia Hayes"
        quote="El complemento perfecto para mi rutina de autocuidado; aromas suaves que realmente relajan el ambiente."
      />
    </motion.div>
  </Section>
);

// ============================
// Big CTA
// ============================
const BigCTA: React.FC = () => (
  <Section id="cta">
    <motion.div variants={fadeUp} className="max-w-3xl text-center">
      <h2 className="font-display text-neutral-900 text-2xl sm:text-3xl lg:text-4xl">
        {UI.copy.bigCtaTitle}
      </h2>
      <div className="mt-5">
        <WhatsAppButton
          label={UI.copy.bigCtaButton}
          message="Hola Pomarosa, quiero hacer un pedido."
          size="lg"
        />
      </div>
    </motion.div>
  </Section>
);

// ============================
// Footer
// ============================
const Footer: React.FC = () => (
  <footer id="contacto" className="pt-6">
    <div
      className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10 border-t"
      style={{ borderColor: UI.colors.border }}
    >
      <div className="flex flex-col items-center gap-4">
        <p className="text-sm text-neutral-700">
          {UI.copy.footerContact}{" "}
          <a
            href={waLink(UI.phoneIntl, "Hola Pomarosa 😊")}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4 hover:no-underline"
          >
            {UI.phonePretty}
          </a>
        </p>
        <p className="text-xs text-neutral-600 mt-2">
          {UI.copy.copyright}
        </p>
      </div>
    </div>
  </footer>
);

// ============================
// Page
// ============================
const PomarosaPage: React.FC = () => {
  React.useEffect(() => {
    document.documentElement.style.setProperty("--bg", UI.colors.bg);
    document.documentElement.style.setProperty("--border", UI.colors.border);
  }, []);

  return (
    <div
      className="min-h-dvh font-sans text-[15px] leading-7"
      style={{ backgroundColor: UI.colors.bg, color: UI.colors.text }}
    >
      <Header />
      <main>
        <Hero />
        <Benefits />
        <Story />
        <Products />
        <Testimonials />
        <BigCTA />
      </main>
      <Footer />
    </div>
  );
};

export default PomarosaPage;