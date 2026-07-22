export async function sendOrderNotificationToTelegram(orderData: any) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.warn('Telegram no configurado. Faltan TELEGRAM_BOT_TOKEN o TELEGRAM_CHAT_ID en .env');
    return;
  }

  // Formatear los items para el mensaje
  const itemsText = orderData.items.map((item: any) => 
    `🔸 ${item.productName || item.nombre || item.productId}`
  ).join('\n');

  // Construir el mensaje en Markdown
  const message = `
🔔 *NUEVA ORDEN RECIBIDA* 🔔
_ID:_ #${orderData.id.slice(0, 8).toUpperCase()}

👤 *DATOS DEL CLIENTE*
- *Nombre:* ${orderData.customerName}
- *Cédula:* ${orderData.customerIdDoc}
- *Teléfono:* ${orderData.customerPhone}

📦 *DATOS DE ENVÍO*
- *Agencia:* ${orderData.shippingAgency}
- *Dirección:* ${orderData.shippingAddress}

💰 *DATOS DE PAGO*
- *Método:* ${orderData.paymentMethod}
- *Total:* $${orderData.total} ${orderData.totalBs ? `(Bs. ${Number(orderData.totalBs).toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })})` : ''}

🛒 *PRODUCTOS COMPRADOS*
${itemsText}

⚠️ _Verifica el capture adjunto para procesar y marcar como completado en el Panel._
  `;

  try {
    // Si la orden tiene un capture (imagen), usamos sendPhoto
    if (orderData.paymentProofUrl) {
      const url = `https://api.telegram.org/bot${botToken}/sendPhoto`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          photo: orderData.paymentProofUrl,
          caption: message,
          parse_mode: 'Markdown'
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error al enviar foto a Telegram:', errorText);
      }
    } else {
      // Si por alguna razón no hay foto, enviamos solo texto
      const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'Markdown'
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error al enviar texto a Telegram:', errorText);
      }
    }
  } catch (error) {
    console.error('Error general al comunicar con Telegram:', error);
  }
}
