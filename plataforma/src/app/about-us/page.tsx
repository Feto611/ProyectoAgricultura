'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSeedling, FaLeaf, FaTree, FaMicroscope, FaFlask } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function AboutUs() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    setIsClient(true);
    
    const timer = setInterval(() => {
      setActiveSection((prev) => (prev === 4 ? 0 : prev + 1));
    }, 5000);
    
    return () => clearInterval(timer);
  }, []);

  const handleContactClick = () => {
    router.push('/contacto');
  };

  const sections = [
    {
      icon: <FaSeedling className="text-green-600 text-4xl" />,
      title: "Nuestros Orígenes",
      content: "Fundada en 1968, Umbrella Corporation comenzó como un pequeño laboratorio dedicado a mejorar la producción agrícola. Desde entonces, hemos crecido hasta convertirnos en líderes mundiales en biotecnología agrícola sustentable."
    },
    {
      icon: <FaLeaf className="text-green-600 text-4xl" />,
      title: "Misión",
      content: "En Umbrella Agriculture, nuestra misión es desarrollar soluciones innovadoras que aumenten la productividad agrícola mientras preservamos los recursos naturales para las futuras generaciones."
    },
    {
      icon: <FaTree className="text-green-600 text-4xl" />,
      title: "Compromiso Ambiental",
      content: "Creemos en la agricultura responsable. Nuestras prácticas están diseñadas para minimizar el impacto ambiental, conservar agua y reducir la huella de carbono en todos nuestros procesos productivos."
    },
    {
      icon: <FaMicroscope className="text-green-600 text-4xl" />,
      title: "Investigación e Innovación",
      content: "Nuestros laboratorios de vanguardia trabajan continuamente en el desarrollo de semillas mejoradas, sistemas de riego eficientes y soluciones biológicas para el control de plagas y enfermedades."
    },
    {
      icon: <FaFlask className="text-green-600 text-4xl" />,
      title: "Tecnología Propietaria",
      content: "Nuestra tecnología exclusiva T-Virus (Tratamiento de Vitalidad para Rendimiento Sustentable) ha revolucionado la forma en que los cultivos responden a condiciones ambientales adversas, aumentando significativamente su resistencia y productividad."
    }
  ];

  const backgroundVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 1.5 } }
  };

  const logoVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { duration: 1 } }
  };

  const fadeInUp = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.8 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      {/* Hero Section */}
      <motion.section 
        className="relative h-screen flex items-center justify-center overflow-hidden"
        initial="initial"
        animate="animate"
        variants={backgroundVariants}
      >
        <div className="absolute inset-0">
          <motion.div 
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: "url('/images/agriculture-field.jpg')" }}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
          />
          <div className="absolute inset-0 bg-black opacity-40" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            className="flex flex-col items-center"
            variants={logoVariants}
          >
            <div className="w-32 h-32 mb-8 relative">
              <div className="absolute inset-0 rounded-full border-4 border-red-600 flex items-center justify-center">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                  <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xl font-bold">U</span>
                  </div>
                </div>
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl text-white font-bold mb-6 text-center">
              Umbrella Agriculture
            </h1>
            <p className="text-xl md:text-2xl text-white text-center max-w-2xl">
              Cultivando el futuro, protegiendo el presente
            </p>
          </motion.div>
        </div>
        
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 1, repeat: Infinity, repeatType: "reverse" }}
        >
          <div className="text-white text-center">
            <p className="mb-2">Descubre nuestra historia</p>
            <div className="w-6 h-12 border-2 border-white rounded-full mx-auto flex justify-center">
              <span className="block w-1 h-3 bg-white rounded-full mt-2 animate-bounce" />
            </div>
          </div>
        </motion.div>
      </motion.section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Sobre Nosotros</h2>
            <div className="w-24 h-1 bg-red-600 mx-auto mb-6" />
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Conoce más sobre nuestra pasión por la agricultura sostenible y nuestro compromiso con un mundo mejor alimentado.
            </p>
          </motion.div>

          {/* Interactive Tabs */}
          {isClient && (
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-wrap justify-center mb-8 gap-4">
                {sections.map((section, index) => (
                  <motion.button
                    key={index}
                    className={`flex items-center px-6 py-3 rounded-full transition-all duration-300 ${
                      activeSection === index
                        ? "bg-green-600 text-white shadow-lg"
                        : "bg-green-100 text-green-800 hover:bg-green-200"
                    }`}
                    onClick={() => setActiveSection(index)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="mr-2">{section.icon}</span>
                    <span className="font-medium">{section.title}</span>
                  </motion.button>
                ))}
              </div>

              <motion.div
                className="bg-white rounded-xl shadow-xl p-8 border-l-4 border-green-600 mb-16"
                key={activeSection}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center mb-4">
                  {sections[activeSection].icon}
                  <h3 className="text-2xl font-bold text-gray-800 ml-4">{sections[activeSection].title}</h3>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {sections[activeSection].content}
                </p>
              </motion.div>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
            {[
              { value: "50+", label: "Países", color: "from-green-400 to-green-600" },
              { value: "1200+", label: "Empleados", color: "from-blue-400 to-blue-600" },
              { value: "35+", label: "Años de experiencia", color: "from-yellow-400 to-yellow-600" },
              { value: "120+", label: "Patentes", color: "from-red-400 to-red-600" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-lg"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className={`h-2 bg-gradient-to-r ${stat.color}`} />
                <div className="p-6 text-center">
                  <motion.h4
                    className="text-3xl md:text-4xl font-bold text-gray-800 mb-2"
                    initial={{ scale: 0.8 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {stat.value}
                  </motion.h4>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-green-50">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Nuestra Historia</h2>
            <div className="w-24 h-1 bg-red-600 mx-auto mb-6" />
          </motion.div>

          <div className="relative max-w-3xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-green-200" />

            {[
              { year: "1968", title: "Fundación", content: "Umbrella Corporation inicia operaciones como laboratorio de investigación agrícola." },
              { year: "1985", title: "Expansión Internacional", content: "Abrimos nuestras primeras sucursales en Europa y Asia." },
              { year: "1998", title: "Revolución Biotecnológica", content: "Desarrollo de nuestra primera tecnología propietaria para cultivos resistentes." },
              { year: "2010", title: "Sostenibilidad", content: "Iniciamos nuestro programa de agricultura carbono neutral." },
              { year: "2023", title: "Innovación Digital", content: "Lanzamiento de nuestra plataforma de agricultura de precisión basada en IA." }
            ].map((item, index) => (
              <motion.div
                key={index}
                className={`relative mb-12 ${index % 2 === 0 ? "pl-8 md:pl-0 md:pr-12 md:text-right md:ml-auto md:mr-auto md:w-1/2" : "pl-8 md:pl-12 md:ml-1/2"}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="absolute left-0 md:left-1/2 top-0 transform md:-translate-x-1/2 w-6 h-6 rounded-full bg-red-600 border-4 border-white shadow-md z-10" />
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <span className="inline-block px-4 py-2 rounded-full bg-green-100 text-green-800 font-bold mb-3">{item.year}</span>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-gray-700">{item.content}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Nuestro Equipo Directivo</h2>
            <div className="w-24 h-1 bg-red-600 mx-auto mb-6" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Dr. Albert Wesker", position: "Director Ejecutivo", bio: "Con más de 25 años de experiencia en biotecnología agrícola, el Dr. Wesker lidera nuestra visión de innovación sostenible." },
              { name: "Dra. Jill Valentine", position: "Directora de Investigación", bio: "Especialista en genética vegetal, ha liderado el desarrollo de nuestras tecnologías más revolucionarias." },
              { name: "Chris Redfield", position: "Director de Operaciones", bio: "Experto en logística y cadenas de suministro agrícolas, asegura la eficiencia en todos nuestros procesos." }
            ].map((member, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-lg"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="h-64 bg-gray-200 flex items-center justify-center">
                  <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-4xl font-bold text-green-600">{member.name.charAt(0)}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                  <p className="text-green-600 font-medium mb-4">{member.position}</p>
                  <p className="text-gray-700">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section 
        className="py-20 bg-gradient-to-r from-green-500 to-green-700 text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Únete a la Revolución Agrícola</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Descubre cómo nuestras soluciones pueden transformar tus cultivos y contribuir a un mundo más sostenible.
          </p>
          <motion.button 
            className="bg-white text-green-700 font-bold py-3 px-8 rounded-full text-lg shadow-lg"
            whileHover={{ scale: 1.05, backgroundColor: "#f8fafc", boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            whileTap={{ scale: 0.95 }}
            onClick={handleContactClick}
          >
            Contáctanos
          </motion.button>
        </div>
      </motion.section>
    </div>
  );
}