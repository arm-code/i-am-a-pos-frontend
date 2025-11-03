'use client';

import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import React from 'react';

const factoryName = 'Mobiliario Mendoza';
const PHONE = '+52 656 1304629';
const WHATS = '526567788565'; 
const ADDRESS = 'Ciudad Juárez, Chihuahua';
const EMAIL = 'contacto@mobiliariomendoza.mx';

const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
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
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <div className="relative w-28 h-28 sm:w-32 sm:h-32">
            <Image
              src="/images/mob-mendoza.png"
              alt="Logotipo de Mobiliario Mendoza"
              fill
              className="object-contain drop-shadow-sm"
              priority
            />
          </div>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          {factoryName}
        </h1>
        <p className="mt-3 text-lg text-gray-600 max-w-3xl mx-auto">
          Renta de <strong>mesas, sillas, carpas, mantelería y artículos para fiestas</strong>.
          Entrega puntual, montaje cuidado y atención cálida en <strong>{ADDRESS} y alrededores</strong>.
        </p>

        {/* Trust badges */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm">
          <span className="rounded-full bg-white px-4 py-2 shadow">✅ Entrega puntual</span>
          <span className="rounded-full bg-white px-4 py-2 shadow">🧼 Equipo limpio y sanitizado</span>
          <span className="rounded-full bg-white px-4 py-2 shadow">🛠️ Montaje y retiro</span>
          <span className="rounded-full bg-white px-4 py-2 shadow">💳 Sin Anticipos, pagos flexibles</span>
        </div>

        {/* CTA */}
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href={`https://wa.me/${WHATS}?text=Hola,%20quiero%20cotizar%20renta%20de%20mobiliario%20para%20mi%20evento`}
            className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white shadow hover:bg-green-700"
          >
            <span>WhatsApp</span> 📲
          </Link>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow hover:bg-blue-700"
          >
            Solicitar cotización
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="mt-14 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Historia */}
        <section className="bg-white rounded-2xl shadow p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Nuestra historia</h2>
          <p className="text-gray-600 leading-relaxed">
            Nacimos como un negocio familiar para resolver algo simple: que cada evento en { ADDRESS } tenga mobiliario seguro, limpio y a tiempo. Con los años crecimos en inventario, rutas de entrega y equipo de montaje; hoy atendemos desde pequeñas reuniones hasta
            eventos masivos, siempre con la misma atención que nos distingue.
          </p>
        </section>

        {/* Misión y visión */}
        <section className="bg-white rounded-2xl shadow p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Misión y visión</h2>
          <p className="text-gray-600">
            <strong>Misión:</strong> facilitar eventos memorables con renta confiable de mobiliario y servicio honesto. <br />
            <strong>Visión:</strong> ser el proveedor de renta de mobiliario más recomendado en { ADDRESS},
            destacando por puntualidad, limpieza y precio justo.
          </p>
        </section>

        {/* Valores */}
        <section className="md:col-span-2 bg-white rounded-2xl shadow p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Nuestros valores</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: '🕒', title: 'Responsabilidad', text: 'Cumplimos horarios y lo acordado en tu pedido.' },
              { icon: '🧽', title: 'Higiene', text: 'Mobiliario limpio, sanitizado y en buen estado.' },
              { icon: '🤝', title: 'Trato humano', text: 'Atención clara, honesta y cercana.' },
            ].map((v) => (
              <div key={v.title} className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gray-100 flex items-center justify-center text-2xl">{v.icon}</div>
                <h3 className="font-semibold text-gray-800">{v.title}</h3>
                <p className="text-sm text-gray-600">{v.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Qué rentamos */}
        <section className="md:col-span-2 bg-white rounded-2xl shadow p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">¿Qué rentamos?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="rounded-lg border bg-gray-50 p-4">🪑 Sillas (plegables)</div>
            <div className="rounded-lg border bg-gray-50 p-4">🧺 Mesas rectangulares (grandes y chicas)</div>
            <div className="rounded-lg border bg-gray-50 p-4">⛺ Carpas abiertas y cerradas</div>
            <div className="rounded-lg border bg-gray-50 p-4">🧵 Manteles, fundas y moños</div>
            <div className="rounded-lg border bg-gray-50 p-4">🎈 Accesorios: arcos, mamparas, etc.</div>
            <div className="rounded-lg border bg-gray-50 p-4">🚚 Entrega, montaje y retiro</div>
            <div className="rounded-lg border bg-gray-50 p-4">📦 Paquetes para 50, 100 y 200 personas</div>
            <div className="rounded-lg border bg-gray-50 p-4">🧾 Facturación y contratos</div>
          </div>
        </section>

        {/* Métricas / cobertura */}
        <section className="bg-white rounded-2xl shadow p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 ">En números</h2>
          <dl className="grid grid-cols-3 gap-4 text-center">
            <div>
              <dt className="text-3xl font-bold text-gray-900">+5,000</dt>
              <dd className="text-gray-500 text-sm">eventos atendidos</dd>
            </div>
            <div>
              <dt className="text-3xl font-bold text-gray-900">4+</dt>
              <dd className="text-gray-500 text-sm">años de experiencia</dd>
            </div>
            <div>
              <dt className="text-3xl font-bold text-gray-900">8+</dt>
              <dd className="text-gray-500 text-sm">rutas de entrega</dd>
            </div>
          </dl>
        </section>

        <section className="bg-white rounded-2xl shadow p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Cobertura</h2>
          <p className="text-gray-600">
            {ADDRESS}. También llegamos a <strong>Area Talamas, las Torres, Riveras del Bravo, Haciendas, Senderos de san Isidro</strong> y alrededores.
            Pregunta por disponibilidad y costos de envío.
          </p>
        </section>

        {/* Testimonios */}
        <section className="md:col-span-2 bg-white rounded-2xl shadow p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Lo que dicen nuestros clientes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <blockquote className="rounded-xl border bg-gray-50 p-4">“Llegaron puntual y el montaje quedó perfecto para el bautizo.” — <b>María P.</b></blockquote>
            <blockquote className="rounded-xl border bg-gray-50 p-4">“Todo limpio y como nuevo. Buen precio por paquete de 100 personas.” — <b>César R.</b></blockquote>
            <blockquote className="rounded-xl border bg-gray-50 p-4">“Nos salvaron con una carpa extra por la lluvia. ¡Gracias!” — <b>Lupita G.</b></blockquote>
          </div>
        </section>

        {/* FAQ */}
        <section className="md:col-span-2 bg-white rounded-2xl shadow p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Preguntas frecuentes</h2>
          <div className="space-y-4">
            <details className="rounded-lg border bg-white p-4">
              <summary className="font-semibold cursor-pointer">¿Con cuánto tiempo debo reservar?</summary>
              <p className="mt-2 text-gray-600">Para fines de semana, sugerimos 1–2 semanas antes. En temporada alta, cuanto antes mejor.</p>
            </details>
            <details className="rounded-lg border bg-white p-4">
              <summary className="font-semibold cursor-pointer">¿Requieren anticipo?</summary>
              <p className="mt-2 text-gray-600">NO, apartamos fecha con teléfono y dirección y se liquida a la entrega.</p>
            </details>
            {/* <details className="rounded-lg border bg-white p-4">
              <summary className="font-semibold cursor-pointer">¿Incluye montaje y retiro?</summary>
              <p className="mt-2 text-gray-600">Sí, podemos incluirlo en tu cotización. También ofrecemos solo entrega si lo prefieres.</p>
            </details> */}
          </div>
        </section>
      </div>

      {/* CTA final */}
      <div className="max-w-3xl mx-auto mt-14 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">¿Listo para tu evento?</h2>
        <p className="text-gray-600 mb-6">
          Escríbenos por WhatsApp o llámanos. Te cotizamos en minutos.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href={`https://wa.me/${WHATS}?text=Hola,%20quiero%20cotizar%20para%20mi%20evento`}
            className="rounded-lg bg-green-600 px-6 py-3 font-semibold text-white shadow hover:bg-green-700"
          >
            WhatsApp {PHONE.replace('+52 ', '')}
          </Link>
          <a
            href={`tel:${PHONE.replace(/\s+/g, '')}`}
            className="rounded-lg bg-gray-900 px-6 py-3 font-semibold text-white shadow hover:bg-black"
          >
            Llamar {PHONE}
          </a>
          <Link
            href="mailto:contacto@mobiliariomendoza.mx"
            className="rounded-lg bg-white px-6 py-3 font-semibold text-gray-900 shadow hover:bg-gray-100"
          >
            {EMAIL}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
