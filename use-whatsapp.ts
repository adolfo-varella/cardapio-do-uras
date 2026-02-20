import { Linking } from "react-native";

// WhatsApp Business number for Doçuras da Angel
const WHATSAPP_NUMBER = "5543988240581"; // 43 98824-0581 with country code

export interface WhatsAppMessage {
  phone?: string;
  message: string;
}

export function useWhatsApp() {
  /**
   * Send a message via WhatsApp
   * @param message The message to send
   * @param phone Optional phone number (defaults to business number)
   */
  const sendMessage = async (message: string, phone?: string) => {
    try {
      const phoneNumber = phone || WHATSAPP_NUMBER;
      const encodedMessage = encodeURIComponent(message);
      const url = `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`;

      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
        return true;
      } else {
        // Fallback to web version
        const webUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        await Linking.openURL(webUrl);
        return true;
      }
    } catch (error) {
      console.error("Error sending WhatsApp message:", error);
      return false;
    }
  };

  /**
   * Send order confirmation via WhatsApp
   */
  const sendOrderConfirmation = async (
    customerPhone: string,
    orderNumber: string,
    customerName: string,
    items: Array<{ productName: string; quantity: number; price: number }>,
    totalPrice: number
  ) => {
    const itemsList = items
      .map((item) => `• ${item.productName} (x${item.quantity}) - R$ ${item.price.toFixed(2)}`)
      .join("\n");

    const message = `
Olá ${customerName}! 👋

Seu pedido foi confirmado! ✅

*Número do Pedido:* #${orderNumber}

*Itens:*
${itemsList}

*Total:* R$ ${totalPrice.toFixed(2)}

Obrigado por escolher a Doçuras da Angel! 🍰

Acompanhe seu pedido conosco.
    `.trim();

    return sendMessage(message, customerPhone);
  };

  /**
   * Send promotional message
   */
  const sendPromotion = async (
    phone: string,
    couponCode: string,
    discountValue: number,
    discountType: "percentage" | "fixed"
  ) => {
    const discountText =
      discountType === "percentage" ? `${discountValue}%` : `R$ ${discountValue.toFixed(2)}`;

    const message = `
Olá! 🎉

Temos uma promoção especial para você!

*Cupom:* ${couponCode}
*Desconto:* ${discountText}

Use o código no seu próximo pedido na Doçuras da Angel! 🍰

Aproveite enquanto a promoção está válida!
    `.trim();

    return sendMessage(message, phone);
  };

  /**
   * Send order status update
   */
  const sendOrderStatus = async (
    customerPhone: string,
    orderNumber: string,
    status: string,
    estimatedTime?: string
  ) => {
    const statusMessages: Record<string, string> = {
      confirmed: "Seu pedido foi confirmado! ✅",
      preparing: "Estamos preparando seu pedido! 👨‍🍳",
      ready: "Seu pedido está pronto para retirada! 📦",
      delivered: "Seu pedido foi entregue! 🎉",
      cancelled: "Seu pedido foi cancelado. ❌",
    };

    const statusMessage = statusMessages[status] || `Status atualizado: ${status}`;

    let message = `
Atualização do seu pedido #${orderNumber}

${statusMessage}
    `.trim();

    if (estimatedTime) {
      message += `\n\nTempo estimado: ${estimatedTime}`;
    }

    return sendMessage(message, customerPhone);
  };

  /**
   * Open WhatsApp chat with business number
   */
  const openChat = async (phone?: string) => {
    const phoneNumber = phone || WHATSAPP_NUMBER;
    try {
      const url = `whatsapp://send?phone=${phoneNumber}`;
      const canOpen = await Linking.canOpenURL(url);

      if (canOpen) {
        await Linking.openURL(url);
      } else {
        const webUrl = `https://wa.me/${phoneNumber}`;
        await Linking.openURL(webUrl);
      }
      return true;
    } catch (error) {
      console.error("Error opening WhatsApp chat:", error);
      return false;
    }
  };

  return {
    sendMessage,
    sendOrderConfirmation,
    sendPromotion,
    sendOrderStatus,
    openChat,
    WHATSAPP_NUMBER,
  };
}
