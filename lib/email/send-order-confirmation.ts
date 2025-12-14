export interface EmailConfig {
    to: string;
    subject: string;
    html: string;
}

export interface OrderEmailData {
    orderId: string;
    customerName: string;
    productTitle: string;
    productPrice: number;
    deliveryPrice: number;
    totalPrice: number;
    wilaya: string;
    baladia: string;
    address: string;
    phone: string;
    size?: string;
    color?: string;
}

export function generateOrderConfirmationEmail(data: OrderEmailData): string {
    return `
<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f5f5f5;
      margin: 0;
      padding: 20px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: white;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    .header {
      background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%);
      color: white;
      padding: 30px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
    }
    .content {
      padding: 30px;
    }
    .order-details {
      background: #f9f9f9;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
    }
    .detail-row {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid #e0e0e0;
    }
    .detail-row:last-child {
      border-bottom: none;
    }
    .label {
      font-weight: 600;
      color: #666;
    }
    .value {
      color: #333;
    }
    .total {
      background: #D4AF37;
      color: white;
      padding: 15px;
      border-radius: 8px;
      text-align: center;
      font-size: 24px;
      font-weight: bold;
      margin: 20px 0;
    }
    .footer {
      background: #333;
      color: white;
      padding: 20px;
      text-align: center;
      font-size: 14px;
    }
    .status-badge {
      display: inline-block;
      background: #4CAF50;
      color: white;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 14px;
      margin: 10px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎉 تأكيد الطلب</h1>
      <p>شكراً لطلبك من Beauty Universe</p>
    </div>
    
    <div class="content">
      <p>مرحباً <strong>${data.customerName}</strong>،</p>
      <p>تم استلام طلبك بنجاح! سنتواصل معك قريباً لتأكيد التفاصيل.</p>
      
      <div class="status-badge">✓ قيد المعالجة</div>
      
      <div class="order-details">
        <h3 style="margin-top: 0; color: #D4AF37;">📋 تفاصيل الطلب</h3>
        
        <div class="detail-row">
          <span class="label">رقم الطلب:</span>
          <span class="value">#${data.orderId.substring(0, 8).toUpperCase()}</span>
        </div>
        
        <div class="detail-row">
          <span class="label">المنتج:</span>
          <span class="value">${data.productTitle}</span>
        </div>
        
        ${data.size ? `
        <div class="detail-row">
          <span class="label">المقاس:</span>
          <span class="value">${data.size}</span>
        </div>
        ` : ''}
        
        ${data.color ? `
        <div class="detail-row">
          <span class="label">اللون:</span>
          <span class="value">${data.color}</span>
        </div>
        ` : ''}
        
        <div class="detail-row">
          <span class="label">السعر:</span>
          <span class="value">${data.productPrice.toLocaleString()} DA</span>
        </div>
        
        <div class="detail-row">
          <span class="label">التوصيل:</span>
          <span class="value">${data.deliveryPrice.toLocaleString()} DA</span>
        </div>
      </div>
      
      <div class="total">
        المجموع: ${data.totalPrice.toLocaleString()} DA
      </div>
      
      <div class="order-details">
        <h3 style="margin-top: 0; color: #D4AF37;">📍 عنوان التوصيل</h3>
        
        <div class="detail-row">
          <span class="label">الولاية:</span>
          <span class="value">${data.wilaya}</span>
        </div>
        
        <div class="detail-row">
          <span class="label">البلدية:</span>
          <span class="value">${data.baladia}</span>
        </div>
        
        <div class="detail-row">
          <span class="label">العنوان:</span>
          <span class="value">${data.address}</span>
        </div>
        
        <div class="detail-row">
          <span class="label">الهاتف:</span>
          <span class="value">${data.phone}</span>
        </div>
      </div>
      
      <p style="color: #666; font-size: 14px; margin-top: 30px;">
        💡 <strong>ملاحظة:</strong> سيتم الاتصال بك خلال 24 ساعة لتأكيد الطلب وترتيب التوصيل.
      </p>
    </div>
    
    <div class="footer">
      <p><strong>Beauty Universe</strong></p>
      <p>📞 للاستفسار: 0XXXXXXXXX</p>
      <p>📧 info@beautyuniverse.dz</p>
    </div>
  </div>
</body>
</html>
  `;
}

// Console-based email sender (for development)
export async function sendOrderConfirmationEmail(data: OrderEmailData) {
    console.log('📧 Order Confirmation Email');
    console.log('To:', data.customerName);
    console.log('Order ID:', data.orderId);
    console.log('Total:', data.totalPrice, 'DA');
    console.log('\n--- Email Preview ---');
    console.log(generateOrderConfirmationEmail(data));
    console.log('--- End Preview ---\n');

    // TODO: Integrate with Resend, SendGrid, or other email service
    // Example with Resend:
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'orders@beautyuniverse.dz',
    //   to: customerEmail,
    //   subject: 'تأكيد طلبك - Order Confirmation',
    //   html: generateOrderConfirmationEmail(data)
    // });

    return { success: true, message: 'Email logged to console' };
}
