interface OrderDetails {
    productTitle: string;
    productPrice: number;
    customerName: string;
    customerPhone: string;
    wilaya: string;
    baladia: string;
    address: string;
    deliveryMethod: string;
    deliveryPrice: number;
    totalPrice: number;
    size?: string;
    color?: string;
}

export function sendWhatsAppOrder(order: OrderDetails, businessPhone: string = "213XXXXXXXXX") {
    const message = `
🛍️ *طلب جديد - New Order*

📦 *المنتج - Product:*
${order.productTitle}

💰 *السعر - Price:*
${order.productPrice.toLocaleString()} DA

👤 *العميل - Customer:*
${order.customerName}
📱 ${order.customerPhone}

📍 *العنوان - Address:*
${order.wilaya} - ${order.baladia}
${order.address}

🚚 *التوصيل - Delivery:*
${order.deliveryMethod === 'desk' ? 'مكتب - Desk' : 'منزل - Home'}
${order.deliveryPrice.toLocaleString()} DA

${order.size ? `📏 *المقاس - Size:* ${order.size}\n` : ''}${order.color ? `🎨 *اللون - Color:* ${order.color}\n` : ''}
💵 *المجموع - Total:*
${order.totalPrice.toLocaleString()} DA
  `.trim();

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${businessPhone}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
}

export function sendWhatsAppInquiry(productTitle: string, businessPhone: string = "213XXXXXXXXX") {
    const message = `مرحبا، أريد الاستفسار عن: ${productTitle}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${businessPhone}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
}
