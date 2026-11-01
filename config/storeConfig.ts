/**
 * Configuración Centralizada de la Tienda (Innova Company Venezuela)
 * Edita este archivo para cambiar el número de WhatsApp, tasa de respaldo BCV,
 * agencias de envío o métodos de pago disponibles en toda la plataforma.
 */

export const storeConfig = {
  /**
   * Número de WhatsApp oficial para recibir pedidos.
   * Puedes escribirlo en formato nacional ("0426-2663234") o con código de país ("584262663234").
   * La función `getWhatsAppInternationalNumber()` lo convierte automáticamente a "584262663234" para enlaces wa.me.
   */
  WHATSAPP_NUMBER: '0426-2663234',

  /**
   * Valor de respaldo en Bolívares por 1 USD si falla la API de tasa BCV
   * y no existe una tasa previa guardada en caché.
   */
  DEFAULT_BCV_RATE: 45.0,

  /**
   * Si es `true`, obtiene automáticamente la tasa oficial del BCV desde DolarAPI
   * con caché en localStorage por 6 horas y fallback a DEFAULT_BCV_RATE.
   */
  AUTO_FETCH_BCV: true,

  /**
   * Tiempo de vida de la caché de la tasa BCV en localStorage (en horas).
   */
  BCV_CACHE_TTL_HOURS: 6,

  /**
   * Endpoint público para consultar el dólar oficial BCV.
   */
  BCV_API_URL: 'https://ve.dolarapi.com/v1/dolares/oficial',

  /**
   * Agencias de encomienda habilitadas a nivel nacional.
   */
  SHIPPING_AGENCIES: ['MRW', 'Zoom'] as const,

  /**
   * Métodos de pago disponibles en el Checkout Express.
   */
  PAYMENT_METHODS: [
    'Pago Móvil (Bs - Tasa BCV)',
    'Binance Pay (USDT)',
  ] as const,

  /**
   * Cantidad mínima de unidades para otorgar Envío Gratis nacional.
   * Compra de más de 4 unidades = a partir de 5 unidades.
   */
  FREE_SHIPPING_MIN_ITEMS: 5,
} as const;

/**
 * Normaliza cualquier número configurado en `storeConfig.WHATSAPP_NUMBER`
 * (ej. "0426-2663234", "+58 426-2663234" o "584262663234") al formato internacional
 * requerido por `https://wa.me/` (ej. "584262663234").
 */
export function getWhatsAppInternationalNumber(rawNumber: string = storeConfig.WHATSAPP_NUMBER): string {
  const digits = rawNumber.replace(/\D/g, '');
  if (digits.startsWith('0') && digits.length === 11) {
    return `58${digits.slice(1)}`;
  }
  if (digits.length === 10 && /^(412|414|424|416|426)/.test(digits)) {
    return `58${digits}`;
  }
  return digits || '584262663234';
}

/**
 * Construye una URL de WhatsApp lista para redirigir con el mensaje codificado.
 */
export function buildWhatsAppUrl(message: string, rawNumber: string = storeConfig.WHATSAPP_NUMBER): string {
  const cleanPhone = getWhatsAppInternationalNumber(rawNumber);
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

export type StoreConfig = typeof storeConfig;
