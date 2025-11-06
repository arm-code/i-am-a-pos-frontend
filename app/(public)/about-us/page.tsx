'use client';


import Link from 'next/link';
import Script from 'next/script';
import React from 'react';
import { Phone, Mail, MapPin, Clock, Shield, Users, Truck, CheckCircle } from 'lucide-react';

const factoryName = 'Mobiliario Mendoza';
const PHONE = '+52 656 1304629';
const WHATS = '526567788565'; 
const ADDRESS = 'Ciudad Juárez, Chihuahua';
const EMAIL = 'contacto@mobiliariomendoza.mx';

const AboutUsPage = () => {
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      {/* JSON-LD: RentalService */}
      <Script id="org-jsonld" type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'RentalService',
            name: factoryName,
            image: 'https://tusitio.mx/images/mob-mendoza.png',
            url: 'https://tusitio.mx',
            telephone: PHONE,
            email: EMAIL,
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Ciudad Juárez',
              addressRegion: 'Chihuahua',
              addressCountry: 'MX',
            },
            areaServed: ['Parajes del sur', 'Riveras del Bravo', 'Las Torres', 'Terranova', 'Praderas del sol', 'Finca Bonita'],
            sameAs: [
              'https://www.facebook.com/mobiliariomendoza',
              'https://www.instagram.com/mobiliariomendoza',
            ],
            openingHours: 'Mo-Su 08:00-20:00',
            serviceType: [
              'Renta de mesas y sillas',
              'Renta de carpas',
              'Mantelería y decoración',
              'Entrega y montaje'
            ],
          }),
        }}
      />

      {/* Header / Hero */}
      <div className="max-w-6xl mx-auto">
        <div className="  p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28">
              <img
                src='/images/mob-mendoza.png'
                alt="Logotipo de Mobiliario Mendoza"                
                className="object-contain"                
              />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-violet-900 mb-4">
            {factoryName}
          </h1>
          <p className="text-lg text-violet-600 max-w-3xl mx-auto leading-relaxed">
            Renta de <strong className="text-violet-700">mesas, sillas, carpas, mantelería y artículos para fiestas</strong>.
            Entrega puntual, montaje cuidado y atención cálida en <strong className="text-violet-700">{ADDRESS} y alrededores</strong>.
          </p>

          {/* Trust badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm">
            <span className="flex items-center gap-2 bg-violet-50 text-violet-700 px-4 py-2 rounded-full border border-violet-200">
              <CheckCircle className="w-4 h-4" />
              Entrega puntual
            </span>
            <span className="flex items-center gap-2 bg-violet-50 text-violet-700 px-4 py-2 rounded-full border border-violet-200">
              <Shield className="w-4 h-4" />
              Equipo limpio y sanitizado
            </span>
            <span className="flex items-center gap-2 bg-violet-50 text-violet-700 px-4 py-2 rounded-full border border-violet-200">
              <Truck className="w-4 h-4" />
              Montaje y retiro
            </span>
          </div>

          {/* CTA */}
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href={`https://wa.me/${WHATS}?text=Hola,%20quiero%20cotizar%20renta%20de%20mobiliario%20para%20mi%20evento`}
              className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-sm"
            >
              <span>WhatsApp</span>
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center gap-2 bg-violet-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-violet-700 transition-colors shadow-sm"
            >
              Solicitar cotización
            </Link>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="mt-12 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Historia */}
        <section className="bg-white rounded-2xl shadow-sm border border-violet-100 p-6">
          <h2 className="text-2xl font-bold text-violet-900 mb-4">Nuestra historia</h2>
          <p className="text-violet-600 leading-relaxed">
            Nacimos como un negocio familiar para resolver algo simple: que cada evento en {ADDRESS} tenga mobiliario seguro, limpio y a tiempo. Con los años crecimos en inventario, rutas de entrega y equipo de montaje; hoy atendemos desde pequeñas reuniones hasta eventos masivos, siempre con la misma atención que nos distingue.
          </p>
        </section>

        {/* Misión y visión */}
        <section className="bg-white rounded-2xl shadow-sm border border-violet-100 p-6">
          <h2 className="text-2xl font-bold text-violet-900 mb-4">Misión y visión</h2>
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-violet-700">Misión:</h3>
              <p className="text-violet-600">Facilitar eventos memorables con renta confiable de mobiliario y servicio honesto.</p>
            </div>
            <div>
              <h3 className="font-semibold text-violet-700">Visión:</h3>
              <p className="text-violet-600">Ser el proveedor de renta de mobiliario más recomendado en {ADDRESS}, destacando por puntualidad, limpieza y precio justo.</p>
            </div>
          </div>
        </section>

        {/* Valores */}
        <section className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-violet-100 p-6">
          <h2 className="text-2xl font-bold text-violet-900 mb-6 text-center">Nuestros valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Clock className="w-8 h-8" />, title: 'Responsabilidad', text: 'Cumplimos horarios y lo acordado en tu pedido.' },
              { icon: <Shield className="w-8 h-8" />, title: 'Higiene', text: 'Mobiliario limpio, sanitizado y en buen estado.' },
              { icon: <Users className="w-8 h-8" />, title: 'Trato humano', text: 'Atención clara, honesta y cercana.' },
            ].map((v) => (
              <div key={v.title} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-violet-100 flex items-center justify-center text-violet-600">
                  {v.icon}
                </div>
                <h3 className="font-semibold text-violet-900 mb-2">{v.title}</h3>
                <p className="text-violet-600 text-sm">{v.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Qué rentamos */}
        <section className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-violet-100 p-6">
          <h2 className="text-2xl font-bold text-violet-900 mb-6">¿Qué rentamos?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              '🪑 Sillas plegables',
              '🧺 Mesas rectangulares',
              '⛺ Carpas abiertas y cerradas',
              '🧵 Manteles y fundas',
              '🎈 Arcos y mamparas',
              '🚚 Entrega y montaje',
              '📦 Paquetes para eventos',
              '🧾 Facturación incluida'
            ].map((item, index) => (
              <div key={index} className="bg-violet-50 border border-violet-200 rounded-lg p-4 text-center text-violet-700">
                {item}
              </div>
            ))}
          </div>
        </section>

        {/* Métricas */}
        <section className="bg-white rounded-2xl shadow-sm border border-violet-100 p-6">
          <h2 className="text-2xl font-bold text-violet-900 mb-6">En números</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <dt className="text-2xl sm:text-3xl font-bold text-violet-900">+5,000</dt>
              <dd className="text-violet-600 text-sm mt-1">eventos atendidos</dd>
            </div>
            <div>
              <dt className="text-2xl sm:text-3xl font-bold text-violet-900">4+</dt>
              <dd className="text-violet-600 text-sm mt-1">años de experiencia</dd>
            </div>
            <div>
              <dt className="text-2xl sm:text-3xl font-bold text-violet-900">8+</dt>
              <dd className="text-violet-600 text-sm mt-1">rutas de entrega</dd>
            </div>
          </div>
        </section>

        {/* Cobertura */}
        <section className="bg-white rounded-2xl shadow-sm border border-violet-100 p-6">
          <h2 className="text-2xl font-bold text-violet-900 mb-4">Cobertura</h2>
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-violet-600 mt-0.5 flex-shrink-0" />
            <p className="text-violet-600">
              <strong className="text-violet-700">{ADDRESS}</strong>. También llegamos a <strong className="text-violet-700">Area Talamas, Las Torres, Riveras del Bravo, Haciendas, Senderos de San Isidro</strong> y alrededores.
            </p>
          </div>
        </section>

        {/* Testimonios */}
        <section className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-violet-100 p-6">
          <h2 className="text-2xl font-bold text-violet-900 mb-6">Lo que dicen nuestros clientes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { text: "Llegaron puntual y el montaje quedó perfecto para el bautizo.", author: "María P." },
              { text: "Todo limpio y como nuevo. Buen precio por paquete de 100 personas.", author: "César R." },
              { text: "Nos salvaron con una carpa extra por la lluvia. ¡Gracias!", author: "Lupita G." }
            ].map((testimonial, index) => (
              <div key={index} className="bg-violet-50 border border-violet-200 rounded-xl p-4">
                <p className="text-violet-700 mb-3">"{testimonial.text}"</p>
                <p className="text-violet-900 font-semibold text-sm">— {testimonial.author}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-violet-100 p-6">
          <h2 className="text-2xl font-bold text-violet-900 mb-6">Preguntas frecuentes</h2>
          <div className="space-y-4">
            {[
              {
                question: "¿Con cuánto tiempo debo reservar?",
                answer: "Para fines de semana, sugerimos 1–2 semanas antes. En temporada alta, cuanto antes mejor."
              },
              {
                question: "¿Requieren anticipo?",
                answer: "NO, apartamos fecha con teléfono y dirección y se liquida a la entrega."
              }
            ].map((faq, index) => (
              <details key={index} className="group border border-violet-200 rounded-lg bg-white p-4 hover:bg-violet-50 transition-colors">
                <summary className="font-semibold text-violet-900 cursor-pointer list-none">
                  <div className="flex justify-between items-center">
                    {faq.question}
                    <div className="w-5 h-5 text-violet-600 group-open:rotate-180 transition-transform">
                      ▼
                    </div>
                  </div>
                </summary>
                <p className="mt-3 text-violet-600 border-t border-violet-100 pt-3">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      </div>

      {/* CTA final */}
      <div className="max-w-4xl mx-auto mt-12">
        <div className="bg-white rounded-2xl shadow-sm border border-violet-100 p-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-violet-900 mb-4">¿Listo para tu evento?</h2>
          <p className="text-violet-600 mb-6 max-w-2xl mx-auto">
            Escríbenos por WhatsApp o llámanos. Te cotizamos en minutos.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href={`https://wa.me/${WHATS}?text=Hola,%20quiero%20cotizar%20para%20mi%20evento`}
              className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              <Phone className="w-4 h-4" />
              WhatsApp {PHONE.replace('+52 ', '')}
            </Link>
            <a
              href={`tel:${PHONE.replace(/\s+/g, '')}`}
              className="inline-flex items-center justify-center gap-2 bg-violet-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-violet-700 transition-colors"
            >
              <Phone className="w-4 h-4" />
              Llamar {PHONE}
            </a>
            <Link
              href="mailto:contacto@mobiliariomendoza.mx"
              className="inline-flex items-center justify-center gap-2 bg-white text-violet-700 border border-violet-300 px-6 py-3 rounded-lg font-semibold hover:bg-violet-50 transition-colors"
            >
              <Mail className="w-4 h-4" />
              {EMAIL}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;