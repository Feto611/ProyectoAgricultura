'use client';
import { useState } from 'react';

export default function Servicios() {
  const servicios = [
    {
      categoria: "Maquinaria",
      items: [
        { nombre: "Tractores", descripcion: "Tractores de alta potencia", precio: "$20,000", imagen: "/images/tractores.jpg", stock: 10 },
        { nombre: "Cosechadoras", descripcion: "Cosechadoras eficientes", precio: "$50,000", imagen: "/images/cosechadoras.jpg", stock: 5 },
        { nombre: "Arados", descripcion: "Arados duraderos", precio: "$5,000", imagen: "/images/arados.jpg", stock: 15 },
      ],
    },
    {
      categoria: "Semillas",
      items: [
        { nombre: "Maíz", descripcion: "Semillas de maíz de alta calidad", precio: "$100", imagen: "/images/maiz.jpg", stock: 100 },
        { nombre: "Trigo", descripcion: "Semillas de trigo resistentes", precio: "$120", imagen: "/images/trigo.jpg", stock: 80 },
        { nombre: "Soja", descripcion: "Semillas de soja orgánicas", precio: "$150", imagen: "/images/soja.jpg", stock: 60 },
      ],
    },
    {
      categoria: "Mantenimiento",
      items: [
        { nombre: "Reparación de maquinaria", descripcion: "Servicio de reparación", precio: "$200", imagen: "/images/reparacion.jpg", stock: 20 },
        { nombre: "Asesoramiento técnico", descripcion: "Asesoramiento especializado", precio: "$100", imagen: "/images/asesoramiento.jpg", stock: 30 },
        { nombre: "Venta de repuestos", descripcion: "Repuestos originales", precio: "Varía", imagen: "/images/repuestos.jpg", stock: 50 },
        // Agrega más items si es necesario
      ],
    },
  ];

  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const handleCategoryClick = (categoria: string) => {
    setActiveCategory(activeCategory === categoria ? null : categoria);
    setCurrentPage(1); // Reset page to 1 when category changes
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="main-content">
      <div className="p-6">
        <h1 className="text-2xl font-bold">Nuestros Servicios</h1>
        <p>Información sobre los servicios que ofrecemos.</p>

        {servicios.map((servicio) => (
          <div key={servicio.categoria} className="mt-4">
            <h2
              className="text-xl font-semibold cursor-pointer flex items-center"
              onClick={() => handleCategoryClick(servicio.categoria)}
            >
              {servicio.categoria}
              <span className={`ml-2 transform transition-transform ${activeCategory === servicio.categoria ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </h2>
            {activeCategory === servicio.categoria && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                {servicio.items
                  .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                  .map((item) => (
                    <div key={item.nombre} className="border p-4 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105">
                      <img src={item.imagen} alt={item.nombre} className="w-full h-48 object-cover rounded-t-lg" />
                      <h3 className="text-lg font-bold mt-2">{item.nombre}</h3>
                      <p>{item.descripcion}</p>
                      <p className="text-green-600 font-semibold">{item.precio}</p>
                      {servicio.categoria !== "Mantenimiento" && (
                        <p className="text-gray-600">Stock: {item.stock}</p>
                      )}
                      <button className="mt-2 bg-blue-500 text-white py-1 px-4 rounded">Comprar</button>
                    </div>
                  ))}
                <div className="col-span-full flex justify-center mt-4">
                  <button
                    className={`mx-1 px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-gray-200'}`}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    ◀
                  </button>
                  {Array.from({ length: Math.ceil(servicio.items.length / itemsPerPage) }, (_, i) => (
                    <button
                      key={i}
                      className={`mx-1 px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                      onClick={() => handlePageChange(i + 1)}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    className={`mx-1 px-3 py-1 rounded ${currentPage === Math.ceil(servicio.items.length / itemsPerPage) ? 'bg-gray-200 cursor-not-allowed' : 'bg-gray-200'}`}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === Math.ceil(servicio.items.length / itemsPerPage)}
                  >
                    ▶
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}