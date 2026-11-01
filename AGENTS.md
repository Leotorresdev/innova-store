# AGENTS.md - Guía de Proyecto para Agentes de IA
# INNOVA COMPANY (innovacompanyven.com)

Bienvenido al repositorio de **INNOVA COMPANY**. Este archivo define las reglas de desarrollo, arquitectura, convenciones y flujo de trabajo que **todo agente de IA debe cumplir obligatoriamente** al interactuar con esta base de código.

---

## 1. Identidad y Misión del Proyecto

- **Nombre:** INNOVA COMPANY
- **Concepto:** Tienda web e-commerce enfocada en el mercado venezolano que ofrece productos tecnológicos innovadores y gadgets de vanguardia que aún no están disponibles o comercializados masivamente en el país.
- **Modelo de Negocio:**
  - **Venta Directa:** Catálogo de productos disponibles para compra inmediata.
  - **Preventas (Pre-orders):** Reservas de lotes con cuenta regresiva, cupos limitados y precios preferenciales (detal y mayor).
  - **Adaptación Local (Venezuela):** Visualización dual de precios en USD y Bolívares calculados con la tasa oficial del Banco Central de Venezuela (BCV), métodos de pago locales (Pago Móvil, Binance Pay, transferencias bancarias), agencias de encomienda nacionales (MRW, Zoom, Tealca, Domesa) y comprobante de pago digital.

---

## 2. Stack Tecnológico

| Capa | Tecnología | Notas |
| :--- | :--- | :--- |
| **Framework** | Next.js 16 (App Router) + React 19 | Server Actions y Route Handlers nativos |
| **Lenguaje** | TypeScript 5 | Tipado estricto en toda la aplicación |
| **Estilos** | Tailwind CSS v4 + tw-animate-css | Clases utilitarias y variables CSS globales |
| **UI Primitives** | Base UI / Radix UI + Lucide React | Componentes accesibles (`components/ui`) |
| **Animaciones** | Framer Motion | Transiciones suaves y microinteracciones |
| **Estado Global** | Zustand | Tiendas ligeras en cliente (`store/`) con persistencia |
| **Base de Datos** | PostgreSQL (Supabase) + Prisma ORM | Modelado relacional (`prisma/schema.prisma`) |
| **Almacenamiento** | Supabase Storage | Comprobantes de pago e imágenes de productos |
| **Formularios** | React Hook Form + Zod | Validación tipada de schemas en cliente y servidor |
| **Notificaciones** | Bot de Telegram + Sonner | Alertas automáticas de pedidos al admin y toasts en UI |

---

## 3. Estructura del Código y Arquitectura

El proyecto sigue una arquitectura modular y orientada a dominios con separación estricta entre la interfaz y la lógica de negocio:

```text
pagina-innova/
├── app/                        # Next.js App Router (Rutas y controladores)
│   ├── actions/                # Server Actions (Mutaciones, BD y negocio: auth, checkout, orders, settings)
│   ├── admin/                  # Panel administrativo (gestión de órdenes, configuración)
│   ├── api/                    # Route Handlers API (ej. /api/bcv para tasa cambiaria, /api/products)
│   ├── pay/                    # Flujo de pago y confirmación de checkout
│   ├── preventas/              # Módulo de productos en preventa y reservas
│   ├── product/[id]/           # Vista detallada de producto y BuyBox
│   ├── globals.css             # Estilos globales y temas Tailwind v4
│   └── layout.tsx              # Layout raíz con providers, Navbar, CartDrawer y Footer
├── components/
│   ├── features/               # Componentes agrupados por dominio o pantalla
│   │   ├── checkout/           # Formularios de envío, resumen y pasarelas de pago
│   │   ├── home/               # Secciones de la landing (Hero, Showcase, Testimonios, Contacto)
│   │   ├── preorders/          # Cards de preventa, temporizador regressivo, beneficios
│   │   └── products/           # Grilla de productos, tarjetas, selector de bundles, trust badges
│   ├── layout/                 # Componentes transversales (Navbar, Footer, CartDrawer, TopBar)
│   ├── shared/                 # Componentes reutilizables generales (Logo, NotFound)
│   └── ui/                     # Primitivas de diseño atómicas (Button, Dialog, Form, Input, etc.)
├── config/                     # Configuración estática y metadatos (site.ts, storeConfig.ts)
├── hooks/                      # Custom hooks reutilizables (useBCV, useCountdown, useIsMobile)
├── lib/                        # Clientes e infraestructura (prisma.ts, supabase.ts, telegram.ts, utils.ts)
├── prisma/                     # Esquema y migraciones de la base de datos (schema.prisma)
├── public/                     # Assets estáticos públicos (logos, imágenes, multimedia)
├── store/                      # Stores de Zustand (useCartStore.ts, useUIStore.ts)
└── types/                      # Definiciones de tipos TypeScript globales (index.ts)
```

### Reglas de Arquitectura:
1. **Lógica de Negocio y Base de Datos:** **NUNCA** realices consultas directas a Prisma o Supabase desde componentes de React. Toda mutación y consulta sensible debe residir en `app/actions/` (Server Actions) o en `app/api/`.
2. **Separación de Componentes:** 
   - Coloca la lógica visual por dominio en `components/features/<dominio>/`.
   - Reutiliza componentes visuales puros en `components/ui/`.
   - Utiliza client components (`'use client'`) únicamente cuando se requiera interactividad, hooks de React/Zustand o eventos del navegador.

---

## 4. Comandos de Trabajo

Ejecuta estos comandos desde la raíz del proyecto:

```bash
# Servidor de desarrollo local (puerto 3000)
npm run dev

# Verificación de compilación y tipos (ejecutar antes de dar por buena una tarea)
npm run build

# Análisis estático de código (linter)
npm run lint

# Generar cliente de Prisma tras modificar schema.prisma
npx prisma generate

# Sincronizar cambios de esquema con la base de datos
npx prisma db push

# Interfaz visual de base de datos
npx prisma studio
```

---

## 5. Convenciones de Código y Estilo

- **Idioma:**
  - **Textos de UI y mensajes de usuario:** Español neutro/venezolano (ej. "Cédula de Identidad", "Pago Móvil", "Envío", "Preventa").
  - **Nombres de variables, funciones y archivos:** Inglés descriptivo (ej. `useCartStore`, `checkoutAction`, `ProductCard.tsx`), respetando los modelos ya definidos en `types/index.ts`.
- **Precios y Moneda:**
  - El precio base se almacena y maneja en USD (`price: number`).
  - En la interfaz siempre se debe considerar la conversión a Bolívares usando la tasa del BCV (`useBCV` o `PriceDisplay`).
- **Manejo de Errores y Feedback:**
  - Toda acción asíncrona de usuario debe proveer retroalimentación visual inmediata mediante toasts (`sonner`) o estados de carga (`loading/disabled`).
- **Variables de Entorno:**
  - Nunca hardcodear credenciales ni URLs. Usar siempre `process.env` (`DATABASE_URL`, `NEXT_PUBLIC_SUPABASE_URL`, `TELEGRAM_BOT_TOKEN`, etc.).

---

## 6. Verificación y Control de Calidad

Antes de finalizar cualquier tarea o entregar código:
1. **Verificar tipado y compilación:** Ejecutar `npm run build` o `npm run lint` para garantizar que no existan errores de TypeScript o sintaxis rota.
2. **Revisión de Consola:** Asegurarse de que no se produzcan warnings críticos de hidratación en React 19 o Next.js App Router.
3. **Flujo de Pago y Órdenes:** Si se modifican flujos de checkout o preventas, comprobar la coherencia de los campos obligatorios venezolanos (cédula, teléfono, agencia, captura del comprobante).

---

## 7. Límites y Prohibiciones (Qué NO hacer)

- ❌ **NO instalar paquetes externos** sin autorización previa y justificación explícita.
- ❌ **NO alterar el esquema de Prisma (`schema.prisma`)** sin antes consensuar el impacto en migraciones y modelos existentes.
- ❌ **NO crear archivos en rutas no estructuradas** (ej. evitar crear carpetas huérfanas en la raíz).
- ❌ **NO exponer secrets o tokens** en código cliente (`NEXT_PUBLIC_` debe usarse estrictamente para datos no sensibles).
- ❌ **NO sobreescribir estilos globales innecesariamente** en lugar de usar las utilidades de Tailwind v4.

---

## 8. Memoria y Continuidad (`MEMORY.md`)

- El archivo `MEMORY.md` almacena el contexto histórico, decisiones clave, estado de tareas y notas técnicas relevantes entre sesiones.
- **Regla:** Al iniciar una sesión de trabajo compleja, consulta `MEMORY.md`. Al completar una tarea o cambio de alcance relevante, actualiza `MEMORY.md` con los avances y decisiones tomadas.
