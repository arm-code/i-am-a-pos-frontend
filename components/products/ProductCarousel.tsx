'use client';

import Image from 'next/image';
import { useEffect, useCallback } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { useState } from 'react';

const products = [
  {
    src: '/products/IMG-20260411-WA0028.jpg',
    alt: 'Sillas y mesas para evento',
    label: 'Mesas y sillas',
  },
  {
    src: '/products/IMG-20260425-WA0023.jpg',
    alt: 'Montaje de mobiliario para fiesta',
    label: 'Montaje profesional',
  },
  {
    src: '/products/IMG-20260501-WA0000.jpg',
    alt: 'Decoración y mantelería para eventos',
    label: 'Mantelería y decoración',
  },
  {
    src: '/products/IMG-20260501-WA0001.jpg',
    alt: 'Carpas y mobiliario exterior',
    label: 'Carpas y mobiliario',
  },
  {
    src: '/products/1775921919650.png',
    alt: 'Paquete completo para eventos',
    label: 'Paquetes completos',
  },
  {
    src: '/products/2.png',
    alt: 'Artículos para fiestas',
    label: 'Artículos para fiestas',
  },
  {
    src: '/products/bolos.png',
    alt: 'Bolos para fiestas',
    label: 'Bolos para fiestas',
  },
];

export default function ProductCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on('select', () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  // Autoplay every 4 seconds
  const autoplay = useCallback(() => {
    if (!api) return;
    if (api.canScrollNext()) {
      api.scrollNext();
    } else {
      api.scrollTo(0);
    }
  }, [api]);

  useEffect(() => {
    const timer = setInterval(autoplay, 4000);
    return () => clearInterval(timer);
  }, [autoplay]);

  return (
    <section className="w-full py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-violet-900 mb-2">
            Nuestro mobiliario
          </h2>
          <p className="text-violet-600 max-w-xl mx-auto text-sm sm:text-base">
            Equipo limpio, en buen estado y listo para tu evento.
          </p>
        </div>

        <Carousel
          setApi={setApi}
          opts={{ align: 'start', loop: true }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {products.map((product, index) => (
              <CarouselItem
                key={index}
                className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
              >
                <div className="relative overflow-hidden rounded-2xl border border-violet-100 shadow-sm bg-white group">
                  <div className="relative h-56 sm:h-64 w-full">
                    <Image
                      src={product.src}
                      alt={product.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-violet-900/60 via-transparent to-transparent" />
                    {/* Label */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="inline-block bg-white/90 backdrop-blur-sm text-violet-800 text-xs sm:text-sm font-semibold px-3 py-1 rounded-full shadow-sm">
                        {product.label}
                      </span>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="hidden sm:flex -left-4 border-violet-200 text-violet-700 hover:bg-violet-50" />
          <CarouselNext className="hidden sm:flex -right-4 border-violet-200 text-violet-700 hover:bg-violet-50" />
        </Carousel>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-5">
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${i === current
                ? 'bg-violet-600 w-5'
                : 'bg-violet-200 hover:bg-violet-400'
                }`}
              aria-label={`Ir a imagen ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
