export const formatWhatsAppNumber = (num: string): string => {
  return num.replace(/[^0-9]/g, '');
};

export const getWhatsAppLink = (number: string, text: string): string => {
  const cleanNum = formatWhatsAppNumber(number);
  const encodedMsg = encodeURIComponent(text);
  return `https://wa.me/${cleanNum}?text=${encodedMsg}`;
};

export const createProductBuyMessage = (productName: string, price: string, brandName = 'Hadi Digital Store'): string => {
  if (price === 'DM to Buy') {
    return `Assalam-o-Alaikum ${brandName}, I am interested in purchasing "${productName}". Please tell me the price and availability details.`;
  }
  return `Assalam-o-Alaikum ${brandName}, I would like to buy "${productName}" for ${price}. Please guide me on payment details.`;
};

export const createOrderConfirmationMessage = (orderId: string, name: string, productName: string, price: string, paymentMethod: string, notes?: string): string => {
  return `🛍️ *NEW ORDER INQUIRY - ${orderId}*\n\n` +
    `👤 *Customer Name:* ${name}\n` +
    `📦 *Product:* ${productName}\n` +
    `💰 *Price:* ${price}\n` +
    `💳 *Preferred Payment:* ${paymentMethod}\n` +
    (notes ? `📝 *Notes:* ${notes}\n` : '') +
    `\nPlease confirm availability and share payment account details!`;
};
