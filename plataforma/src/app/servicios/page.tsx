'use client';
import { useState } from 'react';

export default function Servicios() {
  const servicios = [
    {
      categoria: "Maquinaria",
      items: [
        { nombre: "Tractores", descripcion: "Tractores de alta potencia para todo tipo de terrenos. Nuestros tractores son robustos, eficientes y cuentan con la última tecnología en el mercado agrícola.", precio: "$20,000", imagen: "/images/tractores.jpg", stock: 10 },
        { nombre: "Cosechadoras", descripcion: "Cosechadoras eficientes que maximizan la productividad de su cosecha. Equipadas con sistemas de precisión para minimizar pérdidas.", precio: "$50,000", imagen: "/images/cosechadoras.jpg", stock: 5 },
        { nombre: "Arados", descripcion: "Arados duraderos diseñados para diferentes tipos de suelos. Fabricados con materiales de alta resistencia para garantizar años de servicio.", precio: "$5,000", imagen: "/images/arados.jpg", stock: 15 },
        { nombre: "Sembradoras", descripcion: "Sembradoras de precisión para optimizar la distribución de semillas y maximizar el rendimiento de sus cultivos.", precio: "$15,000", imagen: "/images/sembradoras.jpg", stock: 8 },
        { nombre: "Fumigadoras", descripcion: "Fumigadoras con tecnología de punta para una aplicación precisa y eficiente de productos fitosanitarios.", precio: "$8,000", imagen: "/images/fumigadoras.jpg", stock: 12 },
      ],
    },
    {
      categoria: "Semillas",
      items: [
        { nombre: "Maíz", descripcion: "Semillas de maíz de alta calidad con excelente rendimiento. Variedades adaptadas a diferentes climas y condiciones de cultivo.", precio: "$100", imagen: "/images/maiz.jpg", stock: 100 },
        { nombre: "Trigo", descripcion: "Semillas de trigo resistentes a enfermedades y con alto rendimiento. Ideales para diferentes tipos de suelo.", precio: "$120", imagen: "/images/trigo.jpg", stock: 80 },
        { nombre: "Soja", descripcion: "Semillas de soja orgánicas certificadas. Nuestras variedades ofrecen un excelente rendimiento y calidad nutricional.", precio: "$150", imagen: "/images/soja.jpg", stock: 60 },
        { nombre: "Girasol", descripcion: "Semillas de girasol con alto contenido de aceite. Resistentes a condiciones climáticas adversas.", precio: "$130", imagen: "/images/girasol.jpg", stock: 70 },
        { nombre: "Alfalfa", descripcion: "Semillas de alfalfa de alta pureza y germinación. Ideales para pasturas de alta calidad.", precio: "$140", imagen: "/images/alfalfa.jpg", stock: 90 },
      ],
    },
    {
      categoria: "Mantenimiento",
      items: [
        { nombre: "Reparación de maquinaria", descripcion: "Servicio de reparación realizado por técnicos especializados. Diagnóstico preciso y soluciones eficientes para maximizar el tiempo operativo de su maquinaria.", precio: "$200", imagen: "/images/reparacion.jpg", stock: 20 },
        { nombre: "Asesoramiento técnico", descripcion: "Asesoramiento especializado en optimización de cultivos y uso de maquinaria. Nuestros expertos le ayudarán a mejorar su productividad.", precio: "$100", imagen: "/images/asesoramiento.jpg", stock: 30 },
        { nombre: "Venta de repuestos", descripcion: "Repuestos originales para todas las marcas principales. Garantizamos la calidad y compatibilidad con su maquinaria.", precio: "Varía", imagen: "/images/repuestos.jpg", stock: 50 },
        { nombre: "Mantenimiento preventivo", descripcion: "Programas de mantenimiento preventivo para prolongar la vida útil de su maquinaria y prevenir fallas costosas.", precio: "$150", imagen: "/images/preventivo.jpg", stock: 25 },
        { nombre: "Capacitación técnica", descripcion: "Cursos de capacitación para operadores de maquinaria agrícola. Aprenda a maximizar el rendimiento y prolongar la vida útil de sus equipos.", precio: "$180", imagen: "/images/capacitacion.jpg", stock: 15 },
      ],
    },
    {
      categoria: "Insumos agrícolas",
      items: [
        { nombre: "Fertilizantes", descripcion: "Fertilizantes de alta calidad para diferentes cultivos. Formulaciones balanceadas para optimizar el rendimiento.", precio: "$80", imagen: "/images/fertilizantes.jpg", stock: 120 },
        { nombre: "Herbicidas", descripcion: "Herbicidas efectivos y respetuosos con el medio ambiente. Control eficiente de malezas para maximizar el rendimiento de sus cultivos.", precio: "$90", imagen: "/images/herbicidas.jpg", stock: 100 },
        { nombre: "Fungicidas", descripcion: "Fungicidas para prevenir y controlar enfermedades en sus cultivos. Protección eficaz contra patógenos.", precio: "$95", imagen: "/images/fungicidas.jpg", stock: 85 },
        { nombre: "Insecticidas", descripcion: "Insecticidas selectivos que protegen sus cultivos de plagas sin afectar a los insectos beneficiosos.", precio: "$85", imagen: "/images/insecticidas.jpg", stock: 95 },
      ],
    },
  ];

  const [activeCategory, setActiveCategory] = useState<string | null>("Maquinaria");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const handleCategoryClick = (categoria: string) => {
    setActiveCategory(activeCategory === categoria ? null : categoria);
    setCurrentPage(1); 
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="main-content pt-16 min-h-screen flex flex-col">
      <div className="max-w-6xl mx-auto p-6 flex-grow w-full">
        <header className="text-center mb-10 mt-8">
          <h1 className="text-3xl font-bold mb-2">Nuestros Servicios</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            En nuestra empresa agrícola ofrecemos una amplia gama de productos y servicios diseñados para maximizar la productividad de su explotación. 
            Desde maquinaria de última generación hasta semillas de alta calidad y servicios de mantenimiento especializado, 
            contamos con todo lo que necesita para que su negocio agrícola prospere.
          </p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {servicios.map((servicio) => (
            <button
              key={servicio.categoria}
              className={`p-3 rounded-lg text-center shadow-md transition-all ${
                activeCategory === servicio.categoria 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
              onClick={() => handleCategoryClick(servicio.categoria)}
            >
              {servicio.categoria}
            </button>
          ))}
        </div>

        {activeCategory && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
              {activeCategory}
              <span className="text-sm text-gray-500 ml-2">
                ({servicios.find(s => s.categoria === activeCategory)?.items.length} productos)
              </span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {servicios
                .find(s => s.categoria === activeCategory)
                ?.items
                .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                .map((item) => (
                  <div key={item.nombre} className="border p-4 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105 flex flex-col">
                    <div className="relative overflow-hidden rounded-lg mb-3 h-56">
                      <img src={item.imagen} alt={item.nombre} className="w-full h-full object-cover transition-transform hover:scale-110 duration-500" />
                    </div>
                    <h3 className="text-lg font-bold">{item.nombre}</h3>
                    <p className="text-gray-600 text-sm flex-grow">{item.descripcion}</p>
                    <div className="mt-4 flex justify-between items-center">
                      <p className="text-green-600 font-semibold">{item.precio}</p>
                      {activeCategory !== "Mantenimiento" && (
                        <p className="text-gray-600 text-sm">Stock: {item.stock}</p>
                      )}
                    </div>
                    <button className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition-colors">
                      Comprar ahora
                    </button>
                  </div>
                ))}
            </div>
            
            <div className="flex justify-center mt-8">
              <div className="flex items-center space-x-2 bg-white p-2 rounded-lg shadow">
                <button
                  className={`p-2 rounded-full ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-green-600 hover:bg-green-100'}`}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  ◀
                </button>
                {Array.from({ length: Math.ceil((servicios.find(s => s.categoria === activeCategory)?.items.length || 0) / itemsPerPage) }, (_, i) => (
                  <button
                    key={i}
                    className={`w-8 h-8 rounded-full ${currentPage === i + 1 ? 'bg-green-600 text-white' : 'hover:bg-gray-200'}`}
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  className={`p-2 rounded-full ${
                    currentPage === Math.ceil((servicios.find(s => s.categoria === activeCategory)?.items.length || 0) / itemsPerPage) 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-green-600 hover:bg-green-100'
                  }`}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === Math.ceil((servicios.find(s => s.categoria === activeCategory)?.items.length || 0) / itemsPerPage)}
                >
                  ▶
                </button>
              </div>
            </div>
          </div>
        )}

        <section className="bg-gray-50 p-6 rounded-lg shadow-md my-10">
          <h2 className="text-2xl font-bold mb-4 text-center">¿Por qué elegirnos?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="text-4xl mb-2 text-green-600">★</div>
              <h3 className="text-lg font-semibold mb-2">Calidad garantizada</h3>
              <p className="text-gray-600">Todos nuestros productos cumplen con los más altos estándares de calidad del mercado.</p>
            </div>
            <div className="text-center p-4">
              <div className="text-4xl mb-2 text-green-600">⚙️</div>
              <h3 className="text-lg font-semibold mb-2">Expertos en el sector</h3>
              <p className="text-gray-600">Contamos con más de 20 años de experiencia en el sector agrícola.</p>
            </div>
            <div className="text-center p-4">
              <div className="text-4xl mb-2 text-green-600">🔧</div>
              <h3 className="text-lg font-semibold mb-2">Servicio postventa</h3>
              <p className="text-gray-600">Ofrecemos un servicio de asistencia técnica disponible 24/7 para nuestros clientes.</p>
            </div>
          </div>
        </section>
      </div>
      <div className="pb-16"></div>
    </div>
  );
}