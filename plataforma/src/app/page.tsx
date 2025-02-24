'use client';

import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import Typed from 'typed.js';

export default function Home() {
  const [images, setImages] = useState([
    '/images/imagen1.jpg',
    '/images/imagen2.jpg',
    '/images/imagen3.jpg',
  ]);
  const [current, setCurrent] = useState(0);

  const carouselRef = useRef(null);
  const sloganRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [sloganTop, setSloganTop] = useState(0);
  const [videoHeight, setVideoHeight] = useState(0);

  useEffect(() => {
    if (videoRef.current) {
      setVideoHeight(videoRef.current.offsetHeight); // Obtener la altura del video
    }
  }, []);

  useLayoutEffect(() => {
    function handleScroll() {
      if (sloganRef.current && videoRef.current) {
        const videoRect = videoRef.current.getBoundingClientRect();
        const scrollY = window.scrollY;

        // Calcula la posición del eslogan
        let newSloganTop = videoRect.top + videoHeight / 2 - sloganRef.current.offsetHeight / 2;

        // Ajusta la posición cuando se hace scroll
        if (scrollY > videoRect.top + videoHeight / 4) { // Ajusta el valor 4 para controlar cuando sube
          newSloganTop = Math.max(
            videoRect.top + videoHeight / 2 - sloganRef.current.offsetHeight / 2 - scrollY / 2, // Divide scrollY por 2 para que el movimiento sea más suave
            -sloganRef.current.offsetHeight // Evita que el eslogan se vaya por encima del video
          );
        }

        setSloganTop(newSloganTop);
      }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [videoHeight]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prevCurrent) => (prevCurrent + 1) % images.length);
    }, 3000); // Cambia de imagen cada 3 segundos

    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    const options = {
      strings: ['Umbrella Corporation: Innovando en biotecnología para un futuro más verde ,', 'donde la ciencia de vanguardia se fusiona con la agricultura sostenible;', 'Para alimentar al mundo con soluciones avanzadas y responsables.'],
      typeSpeed: 50,
      backSpeed: 15,
      loop: true,
    };

    const typed = new Typed(sloganRef.current, options);

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div>
      {/* Video y eslogan */}
      <div className="relative mt-8">
        <video
          src="/videos/video1.mp4"
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
          ref={videoRef}
        ></video>
        <motion.div
          className="absolute text-green-700 text-6xl font-bold text-center font-serif" // Cambia el tamaño del texto y la fuente
          style={{ 
            top: sloganTop - 250, // Ajusta este valor para mover el eslogan más arriba
            right: '30%', 
            left: '30%', 
            textAlign: 'center', 
            transform: 'translateX(-50%)',
            color: '#39FF14', // Verde fosforescente
            WebkitTextStroke: '2px black' // Agrega contorno negro
          }} 
          ref={sloganRef}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* El contenido del eslogan será manejado por Typed.js */}
        </motion.div>
      </div>

      {/* Carrusel */}
      <div className="mt-4 overflow-hidden relative"> {/* Ajusta el margen superior */}
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${current * 100}%)` }}
          ref={carouselRef}
        >
          {images.map((image, index) => (
            <div key={index} className="w-full flex-shrink-0 relative">
              <img
                src={image}
                alt={`Imagen ${index + 1}`}
                className="w-full h-auto object-contain"
                style={{ maxHeight: '400px' }}
              />
            </div>
          ))}
        </div>
        {/* Controles del carrusel (opcional) */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((image, index) => (
            <button
              key={index}
              title={`Go to image ${index + 1}`}
              className={`w-4 h-4 rounded-full ${
                current === index ? 'bg-blue-500' : 'bg-gray-300'
              }`}
              onClick={() => setCurrent(index)}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
}