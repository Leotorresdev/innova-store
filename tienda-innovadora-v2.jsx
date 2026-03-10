import React, { useState } from 'react';
import { ShoppingCart, Search, Menu, X, Heart, Star, ChevronRight, Instagram, Package, TrendingUp, Zap, Phone, MapPin, Shield, Clock } from 'lucide-react';

const TiendaInnovadora = () => {
  const [cartItems, setCartItems] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Todo');
  const [wishlist, setWishlist] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const productos = [
    {
      id: 1,
      nombre: 'Smart Watch Ultra Pro',
      precio: 299.99,
      precioOriginal: 449.99,
      categoria: 'Tecnología',
      imagen: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop',
      rating: 4.8,
      ventas: 2341,
      etiqueta: 'Más vendido',
      descuento: 33,
      stock: 45,
      descripcion: 'Monitor de salud 24/7, GPS y batería larga duración'
    },
    {
      id: 2,
      nombre: 'Auriculares ANC Elite',
      precio: 189.99,
      precioOriginal: 279.99,
      categoria: 'Audio',
      imagen: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop',
      rating: 4.9,
      ventas: 1823,
      etiqueta: 'Nuevo',
      descuento: 32,
      stock: 78,
      descripcion: 'Cancelación de ruido activa y 30h de batería'
    },
    {
      id: 3,
      nombre: 'Lámpara LED Inteligente',
      precio: 79.99,
      precioOriginal: 129.99,
      categoria: 'Hogar',
      imagen: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&h=600&fit=crop',
      rating: 4.6,
      ventas: 934,
      etiqueta: 'Oferta',
      descuento: 38,
      stock: 120,
      descripcion: 'Control por app, 16M colores y compatible Alexa'
    },
    {
      id: 4,
      nombre: 'Cámara 4K Action Pro',
      precio: 399.99,
      precioOriginal: 599.99,
      categoria: 'Tecnología',
      imagen: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&h=600&fit=crop',
      rating: 4.7,
      ventas: 1456,
      etiqueta: 'Trending',
      descuento: 33,
      stock: 34,
      descripcion: '4K 60fps, estabilización y resistente al agua 10m'
    },
    {
      id: 5,
      nombre: 'Mochila Tech Anti-robo',
      precio: 89.99,
      precioOriginal: 139.99,
      categoria: 'Accesorios',
      imagen: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop',
      rating: 4.5,
      ventas: 2108,
      etiqueta: 'Más vendido',
      descuento: 36,
      stock: 89,
      descripcion: 'Puerto USB, compartimento laptop 15" y resistente'
    },
    {
      id: 6,
      nombre: 'Drone Mini Pro',
      precio: 449.99,
      precioOriginal: 699.99,
      categoria: 'Tecnología',
      imagen: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&h=600&fit=crop',
      rating: 4.8,
      ventas: 876,
      etiqueta: 'Nuevo',
      descuento: 36,
      stock: 23,
      descripcion: 'Cámara 4K, 30min vuelo y anti-colisión'
    },
    {
      id: 7,
      nombre: 'Teclado Mecánico RGB',
      precio: 149.99,
      precioOriginal: 199.99,
      categoria: 'Accesorios',
      imagen: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=600&h=600&fit=crop',
      rating: 4.7,
      ventas: 1567,
      etiqueta: 'Trending',
      descuento: 25,
      stock: 67,
      descripcion: 'Switches mecánicos e iluminación RGB'
    },
    {
      id: 8,
      nombre: 'Purificador Aire Smart',
      precio: 259.99,
      precioOriginal: 399.99,
      categoria: 'Hogar',
      imagen: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&h=600&fit=crop',
      rating: 4.9,
      ventas: 743,
      etiqueta: 'Nuevo',
      descuento: 35,
      stock: 41,
      descripcion: 'Filtro HEPA H13 y sensor calidad aire'
    }
  ];

  const testimonios = [
    {
      id: 1,
      nombre: 'María González',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      rating: 5,
      comentario: 'Excelente servicio! El producto llegó en 24 horas y es exactamente como se describe. Totalmente recomendado.',
      producto: 'Smart Watch Ultra Pro',
      fecha: 'Hace 2 días'
    },
    {
      id: 2,
      nombre: 'Carlos Ramírez',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      rating: 5,
      comentario: 'La mejor compra que he hecho este año. Calidad premium y atención al cliente de primera.',
      producto: 'Auriculares ANC Elite',
      fecha: 'Hace 5 días'
    },
    {
      id: 3,
      nombre: 'Ana Martínez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      rating: 5,
      comentario: 'Increíble! Superó mis expectativas. El envío fue rápido y el empaque muy profesional.',
      producto: 'Lámpara LED Inteligente',
      fecha: 'Hace 1 semana'
    }
  ];

  const categorias = ['Todo', 'Tecnología', 'Audio', 'Hogar', 'Accesorios'];

  const productosFiltrados = selectedCategory === 'Todo' 
    ? productos 
    : productos.filter(p => p.categoria === selectedCategory);

  const toggleWishlist = (id) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const addToCart = () => {
    setCartItems(prev => prev + 1);
    showNotificationMessage('✅ Producto agregado al carrito');
  };

  const showNotificationMessage = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
      {/* Notification Toast */}
      {showNotification && (
        <div style={{
          position: 'fixed',
          top: '100px',
          right: '32px',
          background: 'linear-gradient(to right, #10b981, #059669)',
          color: 'white',
          padding: '16px 24px',
          borderRadius: '12px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
          zIndex: 9999,
          fontWeight: '600'
        }}>
          {notificationMessage}
        </div>
      )}

      {/* Header */}
      <header style={{
        background: 'linear-gradient(to right, #2563eb, #1d4ed8, #1e40af)',
        borderBottom: '1px solid #1e3a8a',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '80px' }}>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: '#ffffff',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}>
                <Zap color="#2563eb" size={24} />
              </div>
              <div>
                <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#ffffff', margin: 0 }}>INNOVATECH</h1>
                <p style={{ fontSize: '12px', color: '#bfdbfe', margin: 0, fontWeight: '500' }}>Productos del Futuro</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav style={{ display: 'none', gap: '32px', '@media (min-width: 768px)': { display: 'flex' } }}>
              <a href="#" style={{ color: 'rgba(255,255,255,0.9)', textDecoration: 'none', fontWeight: '600' }}>Inicio</a>
              <a href="#productos" style={{ color: 'rgba(255,255,255,0.9)', textDecoration: 'none', fontWeight: '600' }}>Productos</a>
              <a href="#ofertas" style={{ color: 'rgba(255,255,255,0.9)', textDecoration: 'none', fontWeight: '600' }}>Ofertas</a>
              <a href="#testimonios" style={{ color: 'rgba(255,255,255,0.9)', textDecoration: 'none', fontWeight: '600' }}>Testimonios</a>
            </nav>

            {/* Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button 
                onClick={() => setShowLoginModal(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#ffffff',
                  color: '#2563eb',
                  padding: '10px 20px',
                  borderRadius: '9999px',
                  border: 'none',
                  fontWeight: '700',
                  cursor: 'pointer',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}
              >
                <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Ingresar</span>
              </button>
              
              <button style={{
                position: 'relative',
                padding: '8px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                borderRadius: '9999px',
                transition: 'background 0.2s'
              }}>
                <Heart color="#ffffff" size={22} />
                {wishlist.length > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-4px',
                    width: '20px',
                    height: '20px',
                    background: '#ef4444',
                    color: '#ffffff',
                    fontSize: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '9999px',
                    fontWeight: '700'
                  }}>
                    {wishlist.length}
                  </span>
                )}
              </button>

              <button style={{
                position: 'relative',
                padding: '8px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                borderRadius: '9999px'
              }}>
                <ShoppingCart color="#ffffff" size={22} />
                {cartItems > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-4px',
                    width: '20px',
                    height: '20px',
                    background: '#fbbf24',
                    color: '#1e3a8a',
                    fontSize: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '9999px',
                    fontWeight: '700'
                  }}>
                    {cartItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(to bottom right, #eff6ff, #ffffff, #ecfeff)',
        padding: '80px 24px'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '48px', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#dbeafe',
                padding: '8px 16px',
                borderRadius: '9999px',
                border: '1px solid #93c5fd',
                marginBottom: '32px'
              }}>
                <TrendingUp size={16} color="#2563eb" />
                <span style={{ color: '#1e40af', fontSize: '14px', fontWeight: '600' }}>Productos más vendidos de 2026</span>
              </div>
              
              <h2 style={{
                fontSize: '56px',
                fontWeight: '900',
                color: '#111827',
                margin: '0 0 16px 0',
                lineHeight: '1.1'
              }}>
                Tecnología
                <span style={{
                  display: 'block',
                  background: 'linear-gradient(to right, #2563eb, #06b6d4, #2563eb)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  Innovadora
                </span>
              </h2>
              
              <p style={{ fontSize: '20px', color: '#4b5563', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px' }}>
                Descubre los productos más revolucionarios del mercado. Calidad premium, diseño exclusivo y envío gratuito en 24h.
              </p>
              
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '32px' }}>
                <button style={{
                  background: 'linear-gradient(to right, #2563eb, #06b6d4)',
                  color: '#ffffff',
                  padding: '16px 32px',
                  borderRadius: '12px',
                  fontWeight: '700',
                  fontSize: '18px',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 10px 25px -5px rgba(37, 99, 235, 0.5)'
                }}>
                  <span>Ver Productos</span>
                  <ChevronRight size={20} />
                </button>
                
                <button style={{
                  background: '#ffffff',
                  color: '#2563eb',
                  padding: '16px 32px',
                  borderRadius: '12px',
                  fontWeight: '700',
                  fontSize: '18px',
                  border: '2px solid #2563eb',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}>
                  <Instagram size={20} />
                  <span>Síguenos</span>
                </button>
              </div>

              {/* Trust Stats */}
              <div style={{ display: 'flex', gap: '32px', justifyContent: 'center', paddingTop: '32px', borderTop: '1px solid #e5e7eb', flexWrap: 'wrap' }}>
                <div>
                  <p style={{ fontSize: '28px', fontWeight: '900', color: '#2563eb', margin: '0 0 4px 0' }}>15K+</p>
                  <p style={{ fontSize: '14px', color: '#6b7280', margin: 0, fontWeight: '500' }}>Clientes Felices</p>
                </div>
                <div style={{ width: '1px', background: '#d1d5db' }}></div>
                <div>
                  <p style={{ fontSize: '28px', fontWeight: '900', color: '#2563eb', margin: '0 0 4px 0' }}>4.9★</p>
                  <p style={{ fontSize: '14px', color: '#6b7280', margin: 0, fontWeight: '500' }}>Calificación</p>
                </div>
                <div style={{ width: '1px', background: '#d1d5db' }}></div>
                <div>
                  <p style={{ fontSize: '28px', fontWeight: '900', color: '#2563eb', margin: '0 0 4px 0' }}>2.5K+</p>
                  <p style={{ fontSize: '14px', color: '#6b7280', margin: 0, fontWeight: '500' }}>Productos</p>
                </div>
              </div>

              {/* Security Badges */}
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '32px', flexWrap: 'wrap' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#ffffff',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                }}>
                  <Shield size={20} color="#10b981" />
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>Compra Segura</span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#ffffff',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                }}>
                  <Package size={20} color="#2563eb" />
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>Envío Gratis 24h</span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#ffffff',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                }}>
                  <Clock size={20} color="#8b5cf6" />
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>Garantía 2 Años</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section style={{ padding: '48px 24px', background: '#ffffff' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
            <h3 style={{ fontSize: '28px', fontWeight: '900', color: '#111827', margin: 0 }}>Categorías</h3>
          </div>
          
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {categorias.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '12px 24px',
                  borderRadius: '12px',
                  fontWeight: '600',
                  border: selectedCategory === cat ? 'none' : '2px solid #e5e7eb',
                  background: selectedCategory === cat ? 'linear-gradient(to right, #2563eb, #06b6d4)' : '#ffffff',
                  color: selectedCategory === cat ? '#ffffff' : '#374151',
                  cursor: 'pointer',
                  boxShadow: selectedCategory === cat ? '0 10px 15px -3px rgba(37, 99, 235, 0.3)' : '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                  transition: 'all 0.2s'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section id="productos" style={{ padding: '48px 24px', background: '#f9fafb' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
            <h3 style={{ fontSize: '28px', fontWeight: '900', color: '#111827', margin: 0 }}>Productos Destacados</h3>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            {productosFiltrados.map((producto) => (
              <div 
                key={producto.id}
                style={{
                  background: '#ffffff',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '2px solid #e5e7eb',
                  transition: 'all 0.3s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
                  e.currentTarget.style.borderColor = '#2563eb';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                }}
              >
                <div style={{ position: 'relative', background: '#f3f4f6', height: '280px', overflow: 'hidden' }}>
                  <img 
                    src={producto.imagen} 
                    alt={producto.nombre}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  
                  {producto.etiqueta && (
                    <div style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      background: 'linear-gradient(to right, #2563eb, #06b6d4)',
                      color: '#ffffff',
                      padding: '6px 12px',
                      borderRadius: '9999px',
                      fontSize: '12px',
                      fontWeight: '700',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}>
                      {producto.etiqueta}
                    </div>
                  )}
                  
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    background: '#ef4444',
                    color: '#ffffff',
                    padding: '6px 12px',
                    borderRadius: '9999px',
                    fontSize: '12px',
                    fontWeight: '700',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}>
                    -{producto.descuento}%
                  </div>

                  <button 
                    onClick={() => toggleWishlist(producto.id)}
                    style={{
                      position: 'absolute',
                      bottom: '16px',
                      right: '16px',
                      background: '#ffffff',
                      padding: '12px',
                      borderRadius: '9999px',
                      border: '1px solid #e5e7eb',
                      cursor: 'pointer',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    <Heart 
                      size={20} 
                      color={wishlist.includes(producto.id) ? '#ef4444' : '#6b7280'}
                      fill={wishlist.includes(producto.id) ? '#ef4444' : 'none'}
                    />
                  </button>
                </div>

                <div style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{
                      color: '#2563eb',
                      fontSize: '12px',
                      fontWeight: '700',
                      background: '#eff6ff',
                      padding: '4px 8px',
                      borderRadius: '4px'
                    }}>
                      {producto.categoria}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Star size={16} color="#fbbf24" fill="#fbbf24" />
                      <span style={{ fontWeight: '700', color: '#111827' }}>{producto.rating}</span>
                    </div>
                  </div>

                  <h4 style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: '#111827',
                    marginBottom: '8px',
                    minHeight: '48px'
                  }}>
                    {producto.nombre}
                  </h4>

                  <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '12px' }}>{producto.descripcion}</p>

                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '12px' }}>
                    <span style={{ fontSize: '24px', fontWeight: '900', color: '#111827' }}>${producto.precio}</span>
                    <span style={{ fontSize: '14px', color: '#9ca3af', textDecoration: 'line-through' }}>${producto.precioOriginal}</span>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '14px',
                    paddingTop: '12px',
                    borderTop: '1px solid #f3f4f6',
                    marginBottom: '16px'
                  }}>
                    <span style={{ color: '#6b7280' }}>{producto.ventas.toLocaleString()} vendidos</span>
                    <span style={{ color: '#10b981', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '9999px' }}></span>
                      Stock: {producto.stock}
                    </span>
                  </div>

                  <button 
                    onClick={addToCart}
                    style={{
                      width: '100%',
                      background: 'linear-gradient(to right, #2563eb, #06b6d4)',
                      color: '#ffffff',
                      padding: '12px',
                      borderRadius: '12px',
                      fontWeight: '700',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    <ShoppingCart size={18} />
                    <span>Agregar al Carrito</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '80px 24px', background: '#ffffff', borderTop: '4px solid #eff6ff', borderBottom: '4px solid #eff6ff' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h3 style={{ fontSize: '36px', fontWeight: '900', color: '#111827', marginBottom: '16px' }}>¿Por qué elegirnos?</h3>
            <p style={{ fontSize: '20px', color: '#6b7280' }}>Beneficios exclusivos para nuestros clientes</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            <div style={{
              textAlign: 'center',
              padding: '32px',
              borderRadius: '16px',
              background: 'linear-gradient(to bottom right, #eff6ff, #ecfeff)',
              border: '2px solid #bfdbfe',
              transition: 'all 0.3s'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                background: 'linear-gradient(to bottom right, #2563eb, #06b6d4)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}>
                <Package size={32} color="#ffffff" />
              </div>
              <h4 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', marginBottom: '8px' }}>Envío Gratis</h4>
              <p style={{ color: '#6b7280' }}>En todos los pedidos superiores a $50. Entrega en 24-48h a todo el país.</p>
            </div>

            <div style={{
              textAlign: 'center',
              padding: '32px',
              borderRadius: '16px',
              background: 'linear-gradient(to bottom right, #eff6ff, #ecfeff)',
              border: '2px solid #bfdbfe',
              transition: 'all 0.3s'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                background: 'linear-gradient(to bottom right, #2563eb, #06b6d4)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}>
                <Zap size={32} color="#ffffff" />
              </div>
              <h4 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', marginBottom: '8px' }}>Garantía Premium</h4>
              <p style={{ color: '#6b7280' }}>2 años de garantía en todos nuestros productos innovadores con soporte técnico.</p>
            </div>

            <div style={{
              textAlign: 'center',
              padding: '32px',
              borderRadius: '16px',
              background: 'linear-gradient(to bottom right, #eff6ff, #ecfeff)',
              border: '2px solid #bfdbfe',
              transition: 'all 0.3s'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                background: 'linear-gradient(to bottom right, #2563eb, #06b6d4)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}>
                <Phone size={32} color="#ffffff" />
              </div>
              <h4 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', marginBottom: '8px' }}>Soporte 24/7</h4>
              <p style={{ color: '#6b7280' }}>Atención al cliente disponible todos los días del año vía chat, email y teléfono.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonios" style={{
        padding: '80px 24px',
        background: 'linear-gradient(to bottom right, #eff6ff, #ecfeff)'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h3 style={{ fontSize: '36px', fontWeight: '900', color: '#111827', marginBottom: '16px' }}>Lo que dicen nuestros clientes</h3>
            <p style={{ fontSize: '20px', color: '#6b7280' }}>Más de 15,000 clientes satisfechos nos respaldan</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            {testimonios.map((testimonio) => (
              <div key={testimonio.id} style={{
                background: '#ffffff',
                padding: '24px',
                borderRadius: '16px',
                border: '2px solid #e5e7eb',
                transition: 'all 0.3s',
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                  <img 
                    src={testimonio.avatar} 
                    alt={testimonio.nombre}
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '9999px',
                      objectFit: 'cover',
                      border: '2px solid #2563eb'
                    }}
                  />
                  <div>
                    <h5 style={{ fontWeight: '700', color: '#111827', margin: '0 0 4px 0' }}>{testimonio.nombre}</h5>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      {[...Array(testimonio.rating)].map((_, i) => (
                        <Star key={i} size={14} color="#fbbf24" fill="#fbbf24" />
                      ))}
                    </div>
                  </div>
                </div>
                <p style={{ color: '#374151', marginBottom: '16px', fontStyle: 'italic' }}>"{testimonio.comentario}"</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span style={{ color: '#2563eb', fontWeight: '600' }}>{testimonio.producto}</span>
                  <span style={{ color: '#9ca3af' }}>{testimonio.fecha}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '32px',
              background: '#ffffff',
              padding: '24px 32px',
              borderRadius: '16px',
              border: '2px solid #bfdbfe',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '28px', fontWeight: '900', color: '#2563eb', margin: '0 0 4px 0' }}>4.9/5</p>
                <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>Calificación promedio</p>
              </div>
              <div style={{ width: '1px', height: '48px', background: '#d1d5db' }}></div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '28px', fontWeight: '900', color: '#2563eb', margin: '0 0 4px 0' }}>15,234</p>
                <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>Reseñas verificadas</p>
              </div>
              <div style={{ width: '1px', height: '48px', background: '#d1d5db' }}></div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '28px', fontWeight: '900', color: '#2563eb', margin: '0 0 4px 0' }}>98%</p>
                <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>Clientes satisfechos</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section style={{ padding: '80px 24px', background: '#ffffff' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h3 style={{ fontSize: '40px', fontWeight: '900', color: '#111827', marginBottom: '16px' }}>
            Suscríbete a nuestro Newsletter
          </h3>
          <p style={{ fontSize: '20px', color: '#6b7280', marginBottom: '32px' }}>
            Recibe ofertas exclusivas y descuentos de hasta 50% en tu email
          </p>

          <div style={{ display: 'flex', gap: '16px', maxWidth: '600px', margin: '0 auto 24px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <input 
              type="email" 
              placeholder="tu@email.com"
              style={{
                flex: 1,
                minWidth: '250px',
                background: '#f9fafb',
                border: '2px solid #d1d5db',
                color: '#111827',
                padding: '16px 24px',
                borderRadius: '12px',
                fontSize: '16px',
                outline: 'none'
              }}
            />
            <button style={{
              background: 'linear-gradient(to right, #2563eb, #06b6d4)',
              color: '#ffffff',
              padding: '16px 32px',
              borderRadius: '12px',
              fontWeight: '700',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.3)'
            }}>
              Suscribirme
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#6b7280' }}>
            <Shield size={20} color="#10b981" />
            <span style={{ fontSize: '14px', fontWeight: '500' }}>Tu información está segura. No compartimos datos con terceros.</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: 'linear-gradient(to right, #1e3a8a, #1e40af, #1e3a8a)',
        padding: '48px 24px',
        color: '#ffffff'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '32px', marginBottom: '32px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: '#ffffff',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Zap size={20} color="#2563eb" />
                </div>
                <h4 style={{ fontSize: '20px', fontWeight: '900', margin: 0 }}>INNOVATECH</h4>
              </div>
              <p style={{ color: '#bfdbfe', fontSize: '14px', marginBottom: '16px' }}>
                Los productos más innovadores del mercado con la mejor calidad y precio garantizado.
              </p>
              <div style={{ display: 'flex', gap: '12px' }}>
                <a href="#" style={{
                  width: '40px',
                  height: '40px',
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s'
                }}>
                  <Instagram size={20} />
                </a>
              </div>
            </div>

            <div>
              <h5 style={{ fontWeight: '700', marginBottom: '16px', fontSize: '18px' }}>Comprar</h5>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '8px' }}><a href="#" style={{ color: '#bfdbfe', textDecoration: 'none', fontSize: '14px' }}>Todos los productos</a></li>
                <li style={{ marginBottom: '8px' }}><a href="#" style={{ color: '#bfdbfe', textDecoration: 'none', fontSize: '14px' }}>Tecnología</a></li>
                <li style={{ marginBottom: '8px' }}><a href="#" style={{ color: '#bfdbfe', textDecoration: 'none', fontSize: '14px' }}>Audio</a></li>
                <li style={{ marginBottom: '8px' }}><a href="#" style={{ color: '#bfdbfe', textDecoration: 'none', fontSize: '14px' }}>Hogar</a></li>
              </ul>
            </div>

            <div>
              <h5 style={{ fontWeight: '700', marginBottom: '16px', fontSize: '18px' }}>Ayuda</h5>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '8px' }}><a href="#" style={{ color: '#bfdbfe', textDecoration: 'none', fontSize: '14px' }}>Envíos y Entregas</a></li>
                <li style={{ marginBottom: '8px' }}><a href="#" style={{ color: '#bfdbfe', textDecoration: 'none', fontSize: '14px' }}>Devoluciones</a></li>
                <li style={{ marginBottom: '8px' }}><a href="#" style={{ color: '#bfdbfe', textDecoration: 'none', fontSize: '14px' }}>FAQ</a></li>
                <li style={{ marginBottom: '8px' }}><a href="#" style={{ color: '#bfdbfe', textDecoration: 'none', fontSize: '14px' }}>Contacto</a></li>
              </ul>
            </div>

            <div>
              <h5 style={{ fontWeight: '700', marginBottom: '16px', fontSize: '18px' }}>Legal</h5>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '8px' }}><a href="#" style={{ color: '#bfdbfe', textDecoration: 'none', fontSize: '14px' }}>Términos y Condiciones</a></li>
                <li style={{ marginBottom: '8px' }}><a href="#" style={{ color: '#bfdbfe', textDecoration: 'none', fontSize: '14px' }}>Política de Privacidad</a></li>
                <li style={{ marginBottom: '8px' }}><a href="#" style={{ color: '#bfdbfe', textDecoration: 'none', fontSize: '14px' }}>Política de Cookies</a></li>
              </ul>
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '32px', textAlign: 'center' }}>
            <p style={{ color: '#bfdbfe', fontSize: '14px', margin: 0 }}>
              © 2026 INNOVATECH. Todos los derechos reservados. Diseñado con ❤️ para Instagram
            </p>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      {showLoginModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '16px'
        }} onClick={() => setShowLoginModal(false)}>
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '32px',
            maxWidth: '450px',
            width: '100%',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '24px', fontWeight: '900', color: '#111827', margin: 0 }}>Iniciar Sesión</h3>
              <button onClick={() => setShowLoginModal(false)} style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: '#9ca3af',
                padding: '4px'
              }}>
                <X size={24} />
              </button>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>Email</label>
              <input 
                type="email" 
                placeholder="tu@email.com"
                style={{
                  width: '100%',
                  background: '#f9fafb',
                  border: '2px solid #e5e7eb',
                  color: '#111827',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  fontSize: '16px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>Contraseña</label>
              <input 
                type="password" 
                placeholder="••••••••"
                style={{
                  width: '100%',
                  background: '#f9fafb',
                  border: '2px solid #e5e7eb',
                  color: '#111827',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  fontSize: '16px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <button style={{
              width: '100%',
              background: 'linear-gradient(to right, #2563eb, #06b6d4)',
              color: '#ffffff',
              padding: '12px',
              borderRadius: '12px',
              fontWeight: '700',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
              marginTop: '16px',
              boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.3)'
            }}>
              Iniciar Sesión
            </button>

            <p style={{ textAlign: 'center', fontSize: '14px', color: '#6b7280', marginTop: '16px' }}>
              ¿No tienes cuenta? <a href="#" style={{ color: '#2563eb', fontWeight: '600', textDecoration: 'none' }}>Regístrate aquí</a>
            </p>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{
        position: 'fixed',
        bottom: '32px',
        right: '32px',
        width: '56px',
        height: '56px',
        background: 'linear-gradient(to right, #2563eb, #06b6d4)',
        borderRadius: '9999px',
        boxShadow: '0 20px 25px -5px rgba(37, 99, 235, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 40,
        cursor: 'pointer',
        textDecoration: 'none'
      }}>
        <Instagram size={24} color="#ffffff" />
      </a>
    </div>
  );
};

export default TiendaInnovadora;