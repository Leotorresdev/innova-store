# Memoria del Proyecto - INNOVA COMPANY

> **Regla de mantenimiento:** Máximo 50 líneas. Resumen de estado técnico y reglas de negocio activas.

## 1. Estado y Modelo de Negocio
- **Concepto:** E-commerce venezolano de gadgets tecnológicos (`innovacompanyven.com`) optimizado para conversión móvil (Instagram Ads).
- **Flujo de Venta:** Checkout Express de 1-Paso (modal sin fricción) conectado directamente a WhatsApp oficial (`0426-2663234` / `584262663234`) y guardado previo en PostgreSQL/Prisma como orden `PROCESSING`.
- **Stack:** Next.js 16 (App Router), React 19, Tailwind CSS v4, Zustand, Prisma ORM, Supabase Storage, Sonner.

## 2. Reglas de Negocio Inmutables
- **Métodos de Pago Activos:** Exclusivamente `Pago Móvil (Bs - Tasa BCV)` y `Binance Pay (USDT)`. Zelle y Efectivo eliminados.
- **Envíos Nacionales:** Exclusivamente agencias `MRW` y `Zoom`.
- **Oferta y Promoción Única:** Envío Gratis únicamente en compras de más de 4 unidades (`FREE_SHIPPING_MIN_ITEMS = 5`). Sin descuentos falsos de precio.
- **Doble Moneda:** Precios base en USD con cálculo automático en Bolívares según tasa oficial BCV (API DolarAPI con caché de 6h en `localStorage` y respaldo estático en `config/storeConfig.ts`).

## 3. Arquitectura y Componentes Clave
- `config/storeConfig.ts`: Fuente única de configuración (WhatsApp, tasa fallback, agencias, métodos de pago, regla de envío gratis).
- `components/features/checkout/ExpressCheckoutModal.tsx`: Formulario de 1-paso, persistencia en `localStorage`, validación de teléfonos venezolanos (`0412/0414/0424/0416/0426`) y redirección blindada a WhatsApp con enlace manual de respaldo.
- `components/features/products/BundleSelector.tsx`: Selector 1x, 2x y 5x (Envío Gratis).
- `components/features/products/StickyMobileCTA.tsx`: Botón fijo inferior en móviles (`>=48px`).
- `components/features/products/LocalTrustBadges.tsx`: Prueba social y garantías locales (MRW/Zoom, Pago Móvil/Binance, revisión antes de despachar).
- `app/actions/checkout.ts` & `app/actions/orders.ts`: Registro de orden express, liberación automática de stock (`autoReleaseExpiredOrders` a las 4h) y devolución manual con 1 clic.
- `app/admin/orders/OrdersClient.tsx`: Panel con recordatorio directo a WhatsApp para recuperar ventas y devolución de stock.
