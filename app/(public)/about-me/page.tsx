import Image from "next/image";
import React from "react";

const AboutMePage = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800 px-4">
      {/* Foto de perfil */}
      <Image
        src="/profiles/square-alro.jpg"
        alt="Foto de perfil de Alexis Romero Mendoza"
        width={160}
        height={160}
        className="rounded-full shadow-md mb-6"
        priority
      />

      {/* Información personal */}
      <h1 className="text-2xl font-semibold">Alexis Romero Mendoza</h1>
      <p className="text-sm text-gray-500 mb-6">
        Ingeniero en Sistemas Computacionales <br />
        Egresado de la Universidad Autónoma de Ciudad Juárez
      </p>

      {/* Tecnologías */}
      <div className="text-center mb-6">
        <h2 className="text-sm uppercase tracking-widest text-gray-400 mb-1">
          Tecnologías
        </h2>
        <p className="text-sm">
          TypeScript · React · Next.js · NestJS · MySQL · Sybase ASE · Linux · Docker · Tailwind
        </p>
      </div>

      {/* Sitios */}
      <div className="text-center mb-6">
        <h2 className="text-sm uppercase tracking-widest text-gray-400 mb-1">
          Sitios
        </h2>
        <div className="flex gap-4 justify-center text-sm">
          <a
            href="https://github.com/"
            target="_blank"
            className="hover:text-blue-600 transition"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/"
            target="_blank"
            className="hover:text-blue-600 transition"
          >
            LinkedIn
          </a>
        </div>
      </div>

      {/* Contacto */}
      <p className="text-xs text-gray-400">alexisromeromendoza@example.com</p>
    </section>
  );
};

export default AboutMePage;
