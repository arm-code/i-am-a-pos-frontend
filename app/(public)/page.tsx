import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { Phone, Mail, MapPin, Clock, Shield, Users, Truck, CheckCircle } from 'lucide-react';
import ProductCarousel from '@/components/products/ProductCarousel';

// ─── Constants ────────────────────────────────────────────────────────────────
const BUSINESS_NAME = 'Eventos Mendoza';
const PHONE_DISPLAY = '656 130 4629';
const PHONE_RAW = '+526561304629';
const WHATS_NUMBER = '526561304629';
const ADDRESS = 'Ciudad Juárez, Chihuahua';
const EMAIL = 'contacto@eventosmendoza.mx';
const BASE_URL = 'https://eventos-mendoza.arm-solutions.com.mx';

// ─── SEO Metadata ─────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: `${BUSINESS_NAME} – Renta de Mobiliario para Eventos en ${ADDRESS}`,
  description:
    'Renta de mesas, sillas, carpas, mantelería y artículos para fiestas en Ciudad Juárez, Chihuahua. Entrega puntual, montaje cuidado y precios justos. ¡Cotiza por WhatsApp!',
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: `${BUSINESS_NAME} – Renta de Mobiliario para Eventos`,
    description:
      'Renta de mesas, sillas, carpas y más. Entrega, montaje y retiro en Ciudad Juárez.',
    url: BASE_URL,
    images: [{ url: '/products/IMG-20260501-WA0001.jpg', width: 1200, height: 630 }],
  },
};

// ─── JSON-LD Schema.org ───────────────────────────────────────────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: BUSINESS_NAME,
  description:
    'Renta de mesas, sillas, carpas, mantelería y artículos para fiestas en Ciudad Juárez, Chihuahua.',
  url: BASE_URL,
  telephone: PHONE_RAW,
  email: EMAIL,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Ciudad Juárez',
    addressRegion: 'Chihuahua',
    addressCountry: 'MX',
  },
  areaServed: ['Ciudad Juárez', 'Chihuahua', 'Area Talamas', 'Riveras del Bravo'],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '08:00',
      closes: '21:00',
    },
  ],
  offers: {
    '@type': 'Offer',
    description: 'Renta de mobiliario para eventos',
  },
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const VALUES = [
  { icon: Clock, title: 'Responsabilidad', text: 'Cumplimos horarios y lo acordado en tu pedido.' },
  { icon: Shield, title: 'Higiene', text: 'Mobiliario limpio, sanitizado y en buen estado.' },
  { icon: Users, title: 'Trato humano', text: 'Atención clara, honesta y cercana.' },
];

const CATALOG = [
  { emoji: '🪑', label: 'Sillas plegables' },
  { emoji: '🧺', label: 'Mesas rectangulares' },
  { emoji: '⛺', label: 'Carpas abiertas y cerradas' },
  { emoji: '🧵', label: 'Manteles y fundas' },
  { emoji: '🎈', label: 'Arcos y mamparas' },
  { emoji: '🚚', label: 'Entrega y montaje' },
  { emoji: '📦', label: 'Paquetes para eventos' },
  { emoji: '🧾', label: 'Facturación incluida' },
];

const STATS = [
  { value: '+500', label: 'eventos atendidos' },
  { value: '4+', label: 'años de experiencia' },
  { value: '8+', label: 'rutas de entrega' },
];

const TESTIMONIALS = [
  { text: 'Llegaron puntual y el montaje quedó perfecto para el bautizo.', author: 'María P.' },
  { text: 'Todo limpio y como nuevo. Buen precio por paquete de 100 personas.', author: 'César R.' },
  { text: 'Nos salvaron con una carpa extra por la lluvia. ¡Gracias!', author: 'Lupita G.' },
];

const FAQS = [
  {
    question: '¿Con cuánto tiempo debo reservar?',
    answer: 'Para fines de semana, sugerimos 1–2 semanas antes. En temporada alta, cuanto antes mejor.',
  },
  {
    question: '¿Requieren anticipo?',
    answer: 'NO, apartamos fecha con teléfono y dirección, y se liquida a la entrega.',
  },
  {
    question: '¿Hacen entrega y montaje?',
    answer: 'Sí. Entregamos, montamos y recogemos el mobiliario sin costo extra dentro de nuestra zona de cobertura.',
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const waLink = `https://wa.me/${WHATS_NUMBER}?text=Hola,%20quiero%20cotizar%20renta%20de%20mobiliario%20para%20mi%20evento`;

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">

        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-6">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28">
                <Image
                  src="/images/mob-mendoza.png"
                  alt={`Logotipo de ${BUSINESS_NAME}`}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-violet-900 mb-4">
              {BUSINESS_NAME}
            </h1>
            <p className="text-lg text-violet-600 max-w-3xl mx-auto leading-relaxed">
              Renta de{' '}
              <strong className="text-violet-700">mesas, sillas, carpas, mantelería y artículos para fiestas</strong>.
              Entrega puntual, montaje cuidado y atención cálida en{' '}
              <strong className="text-violet-700">{ADDRESS} y alrededores</strong>.
            </p>

            {/* Trust badges */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm">
              {[
                { icon: CheckCircle, label: 'Entrega puntual' },
                { icon: Shield, label: 'Equipo limpio y sanitizado' },
                { icon: Truck, label: 'Montaje y retiro' },
              ].map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="flex items-center gap-2 bg-violet-50 text-violet-700 px-4 py-2 rounded-full border border-violet-200"
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-sm"
              >
                <Phone className="w-4 h-4" />
                Cotizar por WhatsApp
              </Link>
              <a
                href={`tel:${PHONE_RAW}`}
                className="inline-flex items-center justify-center gap-2 bg-violet-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-violet-700 transition-colors shadow-sm"
              >
                <Phone className="w-4 h-4" />
                Llamar {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>

        {/* ── CARRUSEL DE PRODUCTOS ─────────────────────────────────────── */}
        <div className="max-w-6xl mx-auto mt-4">
          <ProductCarousel />
        </div>

        {/* ── CONTENT GRID ──────────────────────────────────────────────── */}
        <div className="mt-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Historia */}
          <section className="bg-white rounded-2xl shadow-sm border border-violet-100 p-6">
            <h2 className="text-2xl font-bold text-violet-900 mb-4">Nuestra historia</h2>
            <p className="text-violet-600 leading-relaxed">
              Nacimos como un negocio familiar para resolver algo simple: que cada evento en {ADDRESS}{' '}
              tenga mobiliario seguro, limpio y a tiempo. Con los años crecimos en inventario,
              rutas de entrega y equipo de montaje; hoy atendemos desde pequeñas reuniones hasta
              eventos masivos, siempre con la misma atención que nos distingue.
            </p>
          </section>

          {/* Misión y visión */}
          <section className="bg-white rounded-2xl shadow-sm border border-violet-100 p-6">
            <h2 className="text-2xl font-bold text-violet-900 mb-4">Misión y visión</h2>
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-violet-700">Misión:</h3>
                <p className="text-violet-600">
                  Facilitar eventos memorables con renta confiable de mobiliario y servicio honesto.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-violet-700">Visión:</h3>
                <p className="text-violet-600">
                  Ser el proveedor de renta de mobiliario más recomendado en {ADDRESS}, destacando
                  por puntualidad, limpieza y precio justo.
                </p>
              </div>
            </div>
          </section>

          {/* Valores */}
          <section className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-violet-100 p-6">
            <h2 className="text-2xl font-bold text-violet-900 mb-6 text-center">Nuestros valores</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {VALUES.map(({ icon: Icon, title, text }) => (
                <div key={title} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-violet-100 flex items-center justify-center text-violet-600">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-semibold text-violet-900 mb-2">{title}</h3>
                  <p className="text-violet-600 text-sm">{text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Catálogo */}
          <section className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-violet-100 p-6">
            <h2 className="text-2xl font-bold text-violet-900 mb-6">¿Qué rentamos?</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {CATALOG.map(({ emoji, label }) => (
                <div
                  key={label}
                  className="bg-violet-50 border border-violet-200 rounded-xl p-4 text-center text-violet-700 font-medium hover:bg-violet-100 transition-colors"
                >
                  <span className="text-2xl block mb-1">{emoji}</span>
                  {label}
                </div>
              ))}
            </div>
          </section>

          {/* Métricas */}
          <section className="bg-white rounded-2xl shadow-sm border border-violet-100 p-6">
            <h2 className="text-2xl font-bold text-violet-900 mb-6">En números</h2>
            <dl className="grid grid-cols-3 gap-4 text-center">
              {STATS.map(({ value, label }) => (
                <div key={label}>
                  <dt className="text-2xl sm:text-3xl font-bold text-violet-900">{value}</dt>
                  <dd className="text-violet-600 text-sm mt-1">{label}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Cobertura */}
          <section className="bg-white rounded-2xl shadow-sm border border-violet-100 p-6">
            <h2 className="text-2xl font-bold text-violet-900 mb-4">Cobertura</h2>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-violet-600 mt-0.5 flex-shrink-0" />
              <p className="text-violet-600">
                <strong className="text-violet-700">{ADDRESS}</strong>. También llegamos a{' '}
                <strong className="text-violet-700">
                  Area Talamas, Las Torres, Riveras del Bravo, Haciendas, Senderos de San Isidro
                </strong>{' '}
                y alrededores.
              </p>
            </div>
          </section>

          {/* Testimonios */}
          <section className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-violet-100 p-6">
            <h2 className="text-2xl font-bold text-violet-900 mb-6">Lo que dicen nuestros clientes</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TESTIMONIALS.map(({ text, author }) => (
                <div key={author} className="bg-violet-50 border border-violet-200 rounded-xl p-4">
                  <p className="text-violet-700 mb-3 italic">&ldquo;{text}&rdquo;</p>
                  <p className="text-violet-900 font-semibold text-sm">— {author}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-violet-100 p-6">
            <h2 className="text-2xl font-bold text-violet-900 mb-6">Preguntas frecuentes</h2>
            <div className="space-y-4">
              {FAQS.map(({ question, answer }, index) => (
                <details
                  key={index}
                  className="group border border-violet-200 rounded-xl bg-white p-4 hover:bg-violet-50 transition-colors"
                >
                  <summary className="font-semibold text-violet-900 cursor-pointer list-none">
                    <div className="flex justify-between items-center">
                      {question}
                      <span className="w-5 h-5 text-violet-500 group-open:rotate-180 transition-transform inline-block">
                        ▼
                      </span>
                    </div>
                  </summary>
                  <p className="mt-3 text-violet-600 border-t border-violet-100 pt-3">{answer}</p>
                </details>
              ))}
            </div>
          </section>
        </div>

        {/* ── CTA FINAL ─────────────────────────────────────────────────── */}
        <div className="max-w-4xl mx-auto mt-12 mb-6">
          <div className="bg-gradient-to-br from-violet-600 to-violet-800 rounded-2xl shadow-lg p-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">¿Listo para tu evento?</h2>
            <p className="text-violet-200 mb-6 max-w-2xl mx-auto">
              Escríbenos por WhatsApp o llámanos. Te cotizamos en minutos.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-sm"
              >
                <Phone className="w-4 h-4" />
                WhatsApp {PHONE_DISPLAY}
              </Link>
              <a
                href={`tel:${PHONE_RAW}`}
                className="inline-flex items-center justify-center gap-2 bg-white text-violet-700 border border-white px-6 py-3 rounded-lg font-semibold hover:bg-violet-50 transition-colors shadow-sm"
              >
                <Phone className="w-4 h-4" />
                Llamar {PHONE_DISPLAY}
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center justify-center gap-2 bg-violet-700 hover:bg-violet-600 text-white border border-violet-500 px-6 py-3 rounded-lg font-semibold transition-colors shadow-sm"
              >
                <Mail className="w-4 h-4" />
                {EMAIL}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
