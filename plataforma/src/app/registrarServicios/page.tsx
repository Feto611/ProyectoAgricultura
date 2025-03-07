'use client'
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './registrarServicio.css';

const ServicioRegistroForm = () => {
  // Form states for main service
  const [categoria, setCategoria] = useState('');
  const [servicios, setServicios] = useState([]);
  
  // Category management states
  const [categorias, setCategorias] = useState([]);
  const [nuevaCategoria, setNuevaCategoria] = useState('');
  const [mostrarAgregarCategoria, setMostrarAgregarCategoria] = useState(false);
  
  // Modal control state
  const [modalAbierto, setModalAbierto] = useState(false);
  const [servicioActual, setServicioActual] = useState(0);
  
  // Loading and error states
  const [isLoading, setIsLoading] = useState(false);
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });

  // Load categories on component mount
  useEffect(() => {
    cargarCategorias();
  }, []);

  // Function to load categories from database
  const cargarCategorias = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/obtener-categorias');
      if (response.ok) {
        const data = await response.json();
        setCategorias(data.map(cat => cat.nombre));
      } else {
        setMensaje({
          tipo: 'error',
          texto: 'Error al cargar categorías. Intente nuevamente.'
        });
      }
    } catch (error) {
      console.error('Error al cargar categorías:', error);
      setMensaje({
        tipo: 'error',
        texto: 'Error de conexión al cargar categorías.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle image selection
  const handleImagenChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const updatedServicios = [...servicios];
      updatedServicios[index].imagen = file;
      
      // Create image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        updatedServicios[index].imagenPreview = reader.result;
        setServicios(updatedServicios);
      };
      reader.readAsDataURL(file);
    }
  };

  // Update service fields
  const updateServicio = (index, field, value) => {
    const updatedServicios = [...servicios];
    updatedServicios[index][field] = value;
    setServicios(updatedServicios);
  };

  // Add new empty service
  const agregarServicio = () => {
    const nuevoServicio = {
      nombre: '',
      descripcion: '',
      precio: '',
      stock: '',
      imagen: null,
      imagenPreview: null
    };
    
    setServicios([...servicios, nuevoServicio]);
    setServicioActual(servicios.length);
    setModalAbierto(true);
  };

  // Delete service
  const eliminarServicio = (index) => {
    const updatedServicios = [...servicios];
    updatedServicios.splice(index, 1);
    setServicios(updatedServicios);
    
    if (servicioActual >= index && servicioActual > 0 && updatedServicios.length > 0) {
      setServicioActual(servicioActual - 1);
    }
  };

  // Handle new category registration
  const handleRegistrarCategoria = async (e) => {
    e.preventDefault();
    if (!nuevaCategoria.trim()) {
      setMensaje({
        tipo: 'error',
        texto: 'Por favor, ingrese un nombre de categoría'
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/registrar-categoria', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre: nuevaCategoria })
      });

      if (response.ok) {
        // Update category list
        await cargarCategorias();
        
        // Set new category as selected
        setCategoria(nuevaCategoria);
        
        // Clear and hide new category field
        setNuevaCategoria('');
        setMostrarAgregarCategoria(false);
        
        setMensaje({
          tipo: 'exito',
          texto: 'Categoría registrada exitosamente'
        });
      } else {
        const errorData = await response.json();
        setMensaje({
          tipo: 'error',
          texto: `Error al registrar categoría: ${errorData.message}`
        });
      }
    } catch (error) {
      console.error('Error en registro de categoría:', error);
      setMensaje({
        tipo: 'error',
        texto: 'Hubo un problema al registrar la categoría'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle service registration
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!categoria) {
      setMensaje({
        tipo: 'error',
        texto: 'Por favor, seleccione una categoría'
      });
      return;
    }

    // Validate that there are services to register
    if (servicios.length === 0) {
      setMensaje({
        tipo: 'error',
        texto: 'Por favor, agregue al menos un servicio'
      });
      return;
    }

    // Validate that services have complete data
    const hayServiciosValidos = servicios.some(
      s => s.nombre && s.descripcion && s.precio && s.stock
    );
    
    if (!hayServiciosValidos) {
      setMensaje({
        tipo: 'error',
        texto: 'Por favor, complete todos los campos obligatorios en al menos un servicio'
      });
      return;
    }

    // Register each valid service
    setIsLoading(true);
    let registradosCorrectamente = 0;
    let errores = [];
    
    for (const servicio of servicios) {
      if (servicio.nombre && servicio.descripcion && servicio.precio && servicio.stock) {
        // Create FormData to upload image
        const formData = new FormData();
        formData.append('categoria', categoria);
        formData.append('nombre', servicio.nombre);
        formData.append('descripcion', servicio.descripcion);
        formData.append('precio', servicio.precio);
        formData.append('stock', servicio.stock);
        if (servicio.imagen) {
          formData.append('imagen', servicio.imagen);
        }

        try {
          const response = await fetch('/api/registrar-servicio', {
            method: 'POST',
            body: formData
          });

          if (response.ok) {
            registradosCorrectamente++;
          } else {
            const errorData = await response.json();
            errores.push(`Error al registrar "${servicio.nombre}": ${errorData.message}`);
          }
        } catch (error) {
          console.error('Error en el registro del servicio:', error);
          errores.push(`Problema al registrar "${servicio.nombre}"`);
        }
      }
    }

    setIsLoading(false);
    
    if (registradosCorrectamente > 0) {
      setMensaje({
        tipo: 'exito',
        texto: `${registradosCorrectamente} servicio(s) registrado(s) exitosamente`
      });
      
      // Clear form
      setServicios([]);
      setModalAbierto(false);
      
      // Show errors if any
      if (errores.length > 0) {
        setTimeout(() => {
          setMensaje({
            tipo: 'advertencia',
            texto: `Algunos servicios no se registraron: ${errores.join(', ')}`
          });
        }, 3000);
      }
    } else if (errores.length > 0) {
      setMensaje({
        tipo: 'error',
        texto: 'No se pudo registrar ningún servicio. Revise los errores e intente nuevamente.'
      });
    }
  };

  // Save service from modal
  const guardarServicio = () => {
    // Validate minimum fields
    const servicio = servicios[servicioActual];
    if (!servicio.nombre || !servicio.descripcion || !servicio.precio || !servicio.stock) {
      setMensaje({
        tipo: 'error',
        texto: 'Por favor, complete todos los campos obligatorios'
      });
      return false;
    }
    setModalAbierto(false);
    return true;
  };

  // Animations
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: 'spring', damping: 25, stiffness: 300 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      y: 50,
      transition: { duration: 0.2 }
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const formCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  const servicioCardVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0, 
      x: 20,
      transition: { duration: 0.2 }
    }
  };

  const mensajeVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="min-h-screen w-full py-16">
      <motion.div 
        className="max-w-4xl mx-auto my-10 p-6 bg-gray-100 rounded-lg shadow-md"
        initial="hidden"
        animate="visible"
        variants={formCardVariants}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Registro de Servicios</h2>
        
        {/* Status/error message */}
        <AnimatePresence>
          {mensaje.texto && (
            <motion.div 
              className={`mb-4 p-3 rounded-md ${
                mensaje.tipo === 'exito' ? 'bg-green-100 text-green-800 border border-green-300' : 
                mensaje.tipo === 'advertencia' ? 'bg-yellow-100 text-yellow-800 border border-yellow-300' : 
                'bg-red-100 text-red-800 border border-red-300'
              }`}
              variants={mensajeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="flex justify-between items-center">
                <p>{mensaje.texto}</p>
                <button 
                  onClick={() => setMensaje({ tipo: '', texto: '' })}
                  className="text-gray-500 hover:text-gray-700"
                  aria-label="Cerrar mensaje"
                >
                  ×
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-2">
            <select 
              value={categoria} 
              onChange={(e) => setCategoria(e.target.value)}
              className="flex-grow p-3 border border-gray-300 rounded-md text-base"
              disabled={isLoading}
              aria-label="Seleccionar categoría"
            >
              <option value="">Seleccione una categoría</option>
              {categorias.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            
            <AnimatePresence mode="wait">
              {!mostrarAgregarCategoria ? (
                <motion.button 
                  key="add-category-btn"
                  type="button" 
                  onClick={() => setMostrarAgregarCategoria(true)}
                  className="px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isLoading}
                >
                  + Categoría
                </motion.button>
              ) : (
                <motion.div 
                  key="new-category-inputs"
                  className="flex w-full md:w-auto space-x-2"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <input 
                    type="text"
                    value={nuevaCategoria}
                    onChange={(e) => setNuevaCategoria(e.target.value)}
                    placeholder="Nueva categoría"
                    className="flex-grow p-2 border border-gray-300 rounded-md"
                    disabled={isLoading}
                  />
                  <motion.button 
                    type="button"
                    onClick={handleRegistrarCategoria}
                    className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Registrando...' : 'Registrar'}
                  </motion.button>
                  <motion.button 
                    type="button"
                    onClick={() => {
                      setMostrarAgregarCategoria(false);
                      setNuevaCategoria('');
                    }}
                    className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={isLoading}
                  >
                    Cancelar
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Services summary */}
          <div className="mt-6">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-3 gap-2">
              <h3 className="text-lg font-semibold">
                {servicios.length > 0 
                  ? `Servicios (${servicios.length})` 
                  : "No hay servicios agregados"}
              </h3>
              <motion.button 
                type="button"
                onClick={agregarServicio}
                className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isLoading}
              >
                <span className="mr-1">+</span> Agregar Servicio
              </motion.button>
            </div>
            
            {servicios.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <AnimatePresence>
                  {servicios.map((servicio, index) => (
                    <motion.div 
                      key={index}
                      className="bg-white p-3 rounded-md shadow border border-gray-200 relative"
                      variants={servicioCardVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      layout
                    >
                      <button
                        type="button"
                        onClick={() => eliminarServicio(index)}
                        className="absolute top-2 right-2 w-6 h-6 bg-red-500 rounded-full text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                        aria-label="Eliminar servicio"
                        disabled={isLoading}
                      >
                        ×
                      </button>
                      <div className="flex items-center">
                        {servicio.imagenPreview && (
                          <img 
                            src={servicio.imagenPreview} 
                            alt="Vista previa" 
                            className="w-12 h-12 object-cover rounded-md mr-3"
                          />
                        )}
                        <div className="flex-grow">
                          <p className="font-semibold truncate">{servicio.nombre || "Nuevo servicio"}</p>
                          <p className="text-sm text-gray-500 truncate">
                            {servicio.descripcion ? 
                              (servicio.descripcion.length > 30 ? 
                                servicio.descripcion.substring(0, 30) + '...' : 
                                servicio.descripcion) : 
                              "Sin descripción"}
                          </p>
                          {servicio.precio && (
                            <p className="text-sm text-blue-600">${servicio.precio} - Stock: {servicio.stock}</p>
                          )}
                        </div>
                        <motion.button
                          type="button"
                          onClick={() => {
                            setServicioActual(index);
                            setModalAbierto(true);
                          }}
                          className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 text-sm"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          disabled={isLoading}
                        >
                          Editar
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          {servicios.length > 0 && (
            <motion.button 
              type="submit"
              className="w-full py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-base font-semibold"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
            >
              {isLoading ? 'Registrando servicios...' : 'Registrar Todos los Servicios'}
            </motion.button>
          )}
        </form>

        {/* Modal for editing/adding service */}
        <AnimatePresence>
          {modalAbierto && servicioActual < servicios.length && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <motion.div 
                className="fixed inset-0 bg-black bg-opacity-50"
                onClick={() => setModalAbierto(false)}
                variants={backdropVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              />
              
              <motion.div 
                className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full z-10 mx-4 max-h-[90vh] overflow-y-auto"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">
                    {servicios[servicioActual].nombre ? 
                      `Editar: ${servicios[servicioActual].nombre}` : 
                      "Nuevo Servicio"}
                  </h3>
                  <button
                    onClick={() => setModalAbierto(false)}
                    className="text-gray-500 hover:text-gray-700 text-xl"
                    disabled={isLoading}
                    aria-label="Cerrar modal"
                  >
                    ×
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                    <input 
                      type="text" 
                      value={servicios[servicioActual].nombre}
                      onChange={(e) => updateServicio(servicioActual, 'nombre', e.target.value)}
                      placeholder="Nombre del Servicio"
                      required 
                      className="w-full p-2 border border-gray-300 rounded-md text-base"
                      disabled={isLoading}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                    <textarea 
                      value={servicios[servicioActual].descripcion}
                      onChange={(e) => updateServicio(servicioActual, 'descripcion', e.target.value)}
                      placeholder="Descripción detallada"
                      required 
                      rows={3}
                      className="w-full p-2 border border-gray-300 rounded-md text-base"
                      disabled={isLoading}
                    />
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-4 sm:space-y-0">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Precio</label>
                      <input 
                        type="number" 
                        value={servicios[servicioActual].precio}
                        onChange={(e) => updateServicio(servicioActual, 'precio', e.target.value)}
                        placeholder="Precio"
                        required 
                        className="w-full p-2 border border-gray-300 rounded-md text-base"
                        disabled={isLoading}
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                      <input 
                        type="number" 
                        value={servicios[servicioActual].stock}
                        onChange={(e) => updateServicio(servicioActual, 'stock', e.target.value)}
                        placeholder="Stock"
                        required 
                        className="w-full p-2 border border-gray-300 rounded-md text-base"
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Imagen</label>
                    <div className="flex items-center space-x-4">
                      <input 
                        type="file" 
                        onChange={(e) => handleImagenChange(servicioActual, e)}
                        accept="image/*"
                        className="flex-grow file:mr-4 file:px-4 file:py-2 file:rounded-md file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        disabled={isLoading}
                      />
                      {servicios[servicioActual].imagenPreview && (
                        <motion.img 
                          src={servicios[servicioActual].imagenPreview} 
                          alt="Vista previa" 
                          className="w-16 h-16 object-cover rounded-md"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 pt-2">
                    <motion.button 
                      type="button"
                      onClick={() => setModalAbierto(false)}
                      className="flex-1 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      disabled={isLoading}
                    >
                      Cancelar
                    </motion.button>
                    <motion.button 
                      type="button"
                      onClick={guardarServicio}
                      className="flex-1 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      disabled={isLoading}
                    >
                      Guardar
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ServicioRegistroForm;