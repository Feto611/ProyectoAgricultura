'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaClock, 
  FaGlobeAmericas, 
  FaCheck,
  FaSeedling
} from 'react-icons/fa';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    type: 'consulta'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'El nombre es requerido';
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'El formato de email es inválido';
    }
    if (!formData.message.trim()) newErrors.message = 'El mensaje es requerido';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulación de envío de formulario
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Resetear el formulario después de 3 segundos
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          subject: '',
          message: '',
          type: 'consulta'
        });
      }, 3000);
    }, 1500);
  };

  // Configuración de animaciones
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: 'spring',
        stiffness: 100
      }
    }
  };

  // Datos de contacto de la empresa
  const contactInfo = [
    {
      icon: <FaMapMarkerAlt className="text-red-600 text-2xl" />,
      title: "Oficina Principal",
      details: [
        "Avenida Agricultura 1234",
        "Sector Corporativo",
        "Ciudad Raccoon, RA 28290"
      ]
    },
    {
      icon: <FaPhoneAlt className="text-red-600 text-2xl" />,
      title: "Teléfono",
      details: [
        "+34 912 345 678 (Atención al Cliente)",
        "+34 913 456 789 (Ventas)",
        "+34 914 567 890 (Soporte Técnico)"
      ]
    },
    {
      icon: <FaEnvelope className="text-red-600 text-2xl" />,
      title: "Correo Electrónico",
      details: [
        "info@umbrella-agriculture.com",
        "ventas@umbrella-agriculture.com",
        "soporte@umbrella-agriculture.com"
      ]
    },
    {
      icon: <FaClock className="text-red-600 text-2xl" />,
      title: "Horario de Atención",
      details: [
        "Lunes a Viernes: 8:00 - 18:00",
        "Sábados: 9:00 - 14:00",
        "Domingos y Festivos: Cerrado"
      ]
    }
  ];

  // Oficinas internacionales
  const globalOffices = [
    { country: "España", city: "Madrid", phone: "+34 912 345 678" },
    { country: "Estados Unidos", city: "Chicago", phone: "+1 312 555 1234" },
    { country: "Brasil", city: "São Paulo", phone: "+55 11 3456 7890" },
    { country: "China", city: "Shanghai", phone: "+86 21 6123 4567" },
    { country: "Australia", city: "Sydney", phone: "+61 2 9876 5432" },
    { country: "Sudáfrica", city: "Ciudad del Cabo", phone: "+27 21 012 3456" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      {/* Hero Section */}
      <motion.section 
        className="relative h-64 md:h-80 flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0">
          <div className="w-full h-full bg-cover bg-center bg-green-700" />
          <div className="absolute inset-0 bg-black opacity-50" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.h1 
            className="text-4xl md:text-5xl text-white font-bold mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            Contáctanos
          </motion.h1>
          <motion.p 
            className="text-xl text-white max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Estamos aquí para responder tus preguntas y ayudarte a cultivar un futuro mejor
          </motion.p>
        </div>
      </motion.section>

      {/* Main Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Contact Information */}
            <motion.div 
              className="lg:col-span-1"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h2 
                className="text-3xl font-bold text-gray-800 mb-6"
                variants={itemVariants}
              >
                Información de Contacto
              </motion.h2>
              
              <div className="space-y-8">
                {contactInfo.map((item, index) => (
                  <motion.div 
                    key={index} 
                    className="flex"
                    variants={itemVariants}
                  >
                    <div className="flex-shrink-0 mt-1">
                      {item.icon}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                      {item.details.map((detail, i) => (
                        <p key={i} className="text-gray-600 mt-1">{detail}</p>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                className="mt-12"
                variants={itemVariants}
              >
                <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-600">
                  <div className="flex items-center mb-4">
                    <FaGlobeAmericas className="text-red-600 text-2xl mr-3" />
                    <h3 className="text-xl font-bold text-gray-800">Presencia Global</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Umbrella Agriculture tiene presencia en más de 50 países, con oficinas principales en 6 continentes.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                    {globalOffices.map((office, index) => (
                      <div key={index} className="text-sm text-gray-600">
                        <span className="font-semibold">{office.country}</span> - {office.city}
                        <div>{office.phone}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              className="lg:col-span-2 bg-white rounded-xl shadow-xl p-8"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <FaSeedling className="text-green-600 text-xl" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800">Envíanos un Mensaje</h2>
              </div>

              {isSubmitted ? (
                <motion.div 
                  className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                      <FaCheck className="text-green-600 text-2xl" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-green-800">Mensaje Enviado</h3>
                      <p className="text-green-700">Gracias por contactarnos. Responderemos a tu mensaje lo antes posible.</p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Nombre Completo *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500`}
                        placeholder="Tu nombre"
                      />
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Correo Electrónico *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500`}
                        placeholder="tu@email.com"
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Teléfono</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="+34 600 000 000"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-gray-700 font-medium mb-2">Empresa/Organización</label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Nombre de tu empresa"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="type" className="block text-gray-700 font-medium mb-2">Tipo de Consulta</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {['consulta', 'soporte', 'ventas'].map((type) => (
                        <label key={type} className="flex items-center">
                          <input
                            type="radio"
                            name="type"
                            value={type}
                            checked={formData.type === type}
                            onChange={handleChange}
                            className="mr-2 h-4 w-4 text-green-600 focus:ring-green-500"
                          />
                          <span className="text-gray-700 capitalize">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Asunto</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Asunto de tu mensaje"
                    />
                  </div>

                  <div className="mb-6">
                    <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Mensaje *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="5"
                      className={`w-full px-4 py-3 rounded-lg border ${errors.message ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500`}
                      placeholder="Escribe tu mensaje aquí..."
                    ></textarea>
                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                  </div>

                  <div className="mb-6">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-green-600 focus:ring-green-500 rounded"
                        required
                      />
                      <span className="ml-2 text-gray-600 text-sm">
                        Acepto la política de privacidad y el tratamiento de mis datos para la gestión de mi solicitud.
                      </span>
                    </label>
                  </div>

                  <motion.button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Enviando...
                      </>
                    ) : (
                      'Enviar Mensaje'
                    )}
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map and Locations */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Nuestras Instalaciones</h2>
            <div className="w-24 h-1 bg-red-600 mx-auto mb-6" />
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Contamos con centros de investigación, campos de prueba y oficinas comerciales en todo el mundo.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Map Placeholder */}
            <motion.div 
              className="lg:col-span-3 rounded-xl overflow-hidden shadow-lg h-96 bg-gray-200 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="text-center">
                <FaMapMarkerAlt className="text-red-600 text-5xl mx-auto mb-4" />
                <p className="text-gray-600">Mapa Interactivo de Nuestras Instalaciones</p>
                <p className="text-sm text-gray-500 mt-2">(Mapa interactivo se cargaría aquí)</p>
              </div>
            </motion.div>

            {/* Installations List */}
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">Principales Instalaciones</h3>
              
              <div className="space-y-4">
                {[
                  { 
                    name: "Centro de Investigación Principal", 
                    location: "Raccoon City, España", 
                    details: "Nuestro centro de investigación más avanzado, especializado en biotecnología agrícola."
                  },
                  { 
                    name: "Campos de Prueba Experimentales", 
                    location: "Illinois, Estados Unidos", 
                    details: "1,200 hectáreas dedicadas al desarrollo y prueba de nuestras tecnologías agrícolas."
                  },
                  { 
                    name: "Laboratorio de Genética Vegetal", 
                    location: "São Paulo, Brasil", 
                    details: "Centro especializado en el desarrollo de semillas mejoradas para climas tropicales."
                  },
                  { 
                    name: "Centro de Tecnología de Riego", 
                    location: "Ciudad del Cabo, Sudáfrica", 
                    details: "Instalación dedicada a innovaciones en sistemas de riego eficiente."
                  },
                  { 
                    name: "Laboratorio de Biocontrol", 
                    location: "Sydney, Australia", 
                    details: "Especializado en soluciones biológicas para el control de plagas y enfermedades."
                  }
                ].map((installation, index) => (
                  <motion.div 
                    key={index} 
                    className="bg-green-50 rounded-lg p-4 border-l-4 border-green-600"
                    whileHover={{ x: 5 }}
                  >
                    <h4 className="font-bold text-gray-800">{installation.name}</h4>
                    <p className="text-sm text-green-700 mb-2">{installation.location}</p>
                    <p className="text-gray-600 text-sm">{installation.details}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Preguntas Frecuentes</h2>
            <div className="w-24 h-1 bg-red-600 mx-auto mb-6" />
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {[
              {
                question: "¿Cuáles son los horarios de atención al cliente?",
                answer: "Nuestro equipo de atención al cliente está disponible de lunes a viernes de 8:00 a 18:00 y los sábados de 9:00 a 14:00. Para consultas urgentes fuera de estos horarios, puede contactarnos a través de nuestro correo electrónico de emergencias."
              },
              {
                question: "¿Ofrecen asesoramiento técnico personalizado?",
                answer: "Sí, en Umbrella Agriculture ofrecemos servicios de asesoramiento técnico personalizado para agricultores y empresas. Nuestros expertos pueden evaluar sus necesidades específicas y proporcionar soluciones adaptadas para optimizar sus cultivos."
              },
              {
                question: "¿Realizan envíos internacionales de sus productos?",
                answer: "Sí, realizamos envíos a más de 50 países. Dependiendo de la naturaleza del producto y las regulaciones del país de destino, los tiempos de envío pueden variar. Nuestro equipo de logística internacional puede proporcionarle información detallada."
              },
              {
                question: "¿Ofrecen programas de capacitación para el uso de sus tecnologías?",
                answer: "Efectivamente, contamos con programas de capacitación completos para todos nuestros clientes. Estos incluyen webinars, documentación técnica, videos tutoriales y, en caso de grandes implementaciones, capacitación presencial con nuestros técnicos especializados."
              },
              {
                question: "¿Cómo puedo solicitar una visita a sus instalaciones?",
                answer: "Para coordinar una visita a nuestras instalaciones, puede completar el formulario de contacto especificando su interés en una visita. Nuestro equipo se comunicará con usted para verificar la disponibilidad y organizar los detalles. Las visitas se programan con al menos 2 semanas de anticipación."
              }
            ].map((faq, index) => (
              <motion.div 
                key={index} 
                className="mb-6 bg-white rounded-lg shadow-md overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-600 mb-4">¿No encuentras la respuesta que buscas?</p>
            <motion.button 
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg inline-flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaEnvelope className="mr-2" /> Contáctanos
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2 
              className="text-3xl font-bold mb-4"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Mantente Informado
            </motion.h2>
            <motion.p 
              className="text-lg mb-8 opacity-90"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Suscríbete a nuestro boletín para recibir las últimas noticias, investigaciones y consejos agrícolas.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <input 
                type="email" 
                placeholder="Tu correo electrónico" 
                className="flex-grow px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <motion.button 
                className="bg-white text-green-700 font-bold py-3 px-6 rounded-lg shadow-lg"
                whileHover={{ scale: 1.05, backgroundColor: "#f8fafc" }}
                whileTap={{ scale: 0.95 }}
              >
                Suscribirse
              </motion.button>
            </motion.div>
            
            <motion.p 
              className="text-sm mt-4 opacity-75"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Al suscribirte, aceptas recibir correos electrónicos de Umbrella Agriculture. Puedes darte de baja en cualquier momento.
            </motion.p>
          </div>
        </div>
      </section>
    </div>
  );
}