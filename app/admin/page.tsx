'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, CheckCircle, AlertCircle, Loader2, Package, Trash2, Tag } from 'lucide-react';
import Image from 'next/image';

export default function AdminPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState<string | null>(null);

  const [products, setProducts] = useState<any[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    
    // Transformar isNew a booleano explícito
    const isNew = formData.get('isNew') === 'on' ? 'true' : 'false';
    formData.set('isNew', isNew);

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Ocurrió un error al crear el producto');
      }

      setSuccess(true);
      (e.target as HTMLFormElement).reset();
      setPreview(null);
      // Recargar la lista de productos
      fetchProducts();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este producto? Esta acción no se puede deshacer.')) return;
    
    setDeletingId(id);
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        // Eliminar del estado inmediatamente para respuesta rápida (optimistic UI)
        setProducts(products.filter(p => p.id !== id));
      } else {
        alert('Error al eliminar el producto');
      }
    } catch (e) {
      console.error(e);
      alert('Error de conexión al eliminar');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 p-4 md:p-8 lg:p-12 selection:bg-indigo-500/30">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Columna Izquierda - Formulario */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="lg:col-span-5 w-full bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="px-8 py-6 border-b border-neutral-800 bg-neutral-900/80">
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              Panel de Administración
            </h1>
            <p className="text-sm text-neutral-400 mt-1">
              Agrega nuevos productos o preventas a tu catálogo
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {error && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <p className="text-sm text-red-300">{error}</p>
              </motion.div>
            )}

            {success && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-sm text-emerald-300">¡Producto creado exitosamente en la base de datos!</p>
              </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-neutral-300">Nombre del Producto</label>
                <input required name="name" type="text" className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all" placeholder="Ej. Zapatillas Innova Max" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300">Precio (USD)</label>
                <input required name="price" type="number" step="0.01" className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all" placeholder="Ej. 120.50" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300">Unidades Disponibles (Stock)</label>
                <input required name="stock" type="number" min="0" className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all" placeholder="Ej. 50" />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-neutral-300">Descripción</label>
                <textarea required name="description" rows={3} className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all resize-none" placeholder="Escribe los detalles y beneficios de este producto..." />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-neutral-300">Categoría / Tipo</label>
                <select required name="type" className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-neutral-300 appearance-none">
                  <option value="PRODUCT">Producto Regular</option>
                  <option value="PRESALE">Preventa Exclusiva</option>
                </select>
              </div>

              <div className="space-y-2 md:col-span-2 mt-2">
                <label className="text-sm font-medium text-neutral-300">Fotografía Principal</label>
                <div className="relative group">
                  <input required name="image" type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                  <div className={`w-full border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-8 transition-all duration-300 ${preview ? 'border-indigo-500/50 bg-indigo-500/5' : 'border-neutral-800 bg-neutral-950 group-hover:border-neutral-700 group-hover:bg-neutral-900'}`}>
                    {preview ? (
                      <div className="relative w-full max-w-[200px] aspect-square rounded-xl overflow-hidden shadow-lg border border-neutral-800">
                        <img src={preview} alt="Vista previa" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-xs font-medium text-white px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md">Cambiar foto</span>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="w-16 h-16 rounded-full bg-neutral-900 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-inner border border-neutral-800">
                          <UploadCloud className="w-8 h-8 text-neutral-400 group-hover:text-indigo-400 transition-colors" />
                        </div>
                        <p className="text-sm font-medium text-neutral-300 text-center">Haz clic o arrastra la imagen aquí</p>
                        <p className="text-xs text-neutral-500 mt-2 text-center">Formatos: PNG, JPG o WEBP (Max. 5MB)</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-800">
              <button
                type="submit"
                disabled={loading}
                className="w-full relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 p-px font-semibold text-white shadow-lg transition-all hover:shadow-indigo-500/25 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <div className="relative flex items-center justify-center gap-2 rounded-[11px] bg-neutral-950 hover:bg-transparent transition-colors px-6 py-3">
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Subiendo...</span>
                    </>
                  ) : (
                    <span>Crear Producto Oficial</span>
                  )}
                </div>
              </button>
            </div>
          </form>
        </motion.div>

        {/* Columna Derecha - Lista de Productos */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          className="lg:col-span-7 w-full bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 rounded-2xl shadow-2xl flex flex-col h-[800px] overflow-hidden"
        >
          <div className="px-8 py-6 border-b border-neutral-800 bg-neutral-900/80 shrink-0 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-neutral-100 flex items-center gap-2">
                <Package className="w-5 h-5 text-indigo-400" />
                Catálogo Actual
              </h2>
              <p className="text-sm text-neutral-400 mt-1">
                Visualiza y elimina productos existentes
              </p>
            </div>
            <span className="bg-neutral-800 border border-neutral-700 text-indigo-300 py-1.5 px-4 rounded-full text-sm font-semibold shadow-inner">
              {products.length} {products.length === 1 ? 'Producto' : 'Productos'}
            </span>
          </div>

          <div className="p-6 overflow-y-auto flex-1 space-y-4">
            {loadingProducts ? (
              <div className="flex flex-col justify-center items-center h-full gap-3">
                 <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
                 <p className="text-neutral-500 text-sm">Cargando base de datos...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="flex flex-col justify-center items-center h-full text-center px-4">
                <div className="w-16 h-16 rounded-full bg-neutral-800 flex items-center justify-center mb-4">
                  <Package className="w-8 h-8 text-neutral-600" />
                </div>
                <h3 className="text-lg font-medium text-neutral-300 mb-2">No hay productos aún</h3>
                <p className="text-neutral-500 max-w-sm">
                  Utiliza el formulario de la izquierda para agregar tu primer producto al catálogo oficial.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AnimatePresence>
                  {products.map((p) => (
                    <motion.div 
                      key={p.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                      className="bg-neutral-950 border border-neutral-800 hover:border-neutral-700 rounded-xl overflow-hidden group transition-all"
                    >
                      <div className="aspect-video relative overflow-hidden bg-neutral-900">
                        <Image 
                          src={p.imageUrl} 
                          alt={p.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60" />
                        
                        <div className="absolute top-2 right-2 flex gap-2">
                          <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                            ${p.price.toLocaleString()}
                          </span>
                        </div>
                        
                        {p.isNew && (
                          <div className="absolute top-2 left-2">
                            <span className="bg-indigo-500 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider flex items-center gap-1">
                              <Tag className="w-3 h-3" /> Nuevo
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <div className="p-4 flex flex-col justify-between gap-3 bg-neutral-900/40">
                        <div>
                          <h3 className="font-semibold text-neutral-200 line-clamp-1">{p.name}</h3>
                          <p className="text-xs text-neutral-500 line-clamp-2 mt-1">{p.description}</p>
                        </div>
                        
                        <div className="flex justify-between items-center pt-3 border-t border-neutral-800">
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-semibold px-2 py-1 rounded-md uppercase ${p.type === 'PRESALE' ? 'bg-amber-500/10 text-amber-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                              {p.type === 'PRESALE' ? 'Preventa' : 'Regular'}
                            </span>
                            <span className={`text-[10px] font-semibold px-2 py-1 rounded-md uppercase ${p.stock > 0 ? 'bg-indigo-500/10 text-indigo-400' : 'bg-red-500/10 text-red-400'}`}>
                              {p.stock > 0 ? `${p.stock} Unds` : 'Agotado'}
                            </span>
                          </div>
                          
                          <button
                            onClick={() => handleDelete(p.id)}
                            disabled={deletingId === p.id}
                            className="p-1.5 rounded-lg text-neutral-500 hover:text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-50"
                            title="Eliminar producto"
                          >
                            {deletingId === p.id ? (
                              <Loader2 className="w-4 h-4 animate-spin text-red-400" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
