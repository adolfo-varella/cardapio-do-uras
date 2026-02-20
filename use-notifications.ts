import { useState } from "react";

export interface NotificationMessage {
  title: string;
  body: string;
  data?: Record<string, any>;
}

/**
 * Hook simplificado para notificações locais
 * Não usa expo-notifications para evitar erros no Expo Go
 * Apenas simula notificações via console.log
 */
export function useNotifications() {
  const [notification, setNotification] = useState<any>(null);

  const sendLocalNotification = async (message: NotificationMessage) => {
    try {
      // Log para debug
      console.log("📬 Notificação:", message.title, "-", message.body);
      
      // Simular notificação
      setNotification({
        title: message.title,
        body: message.body,
        data: message.data || {},
        timestamp: Date.now(),
      });

      // Limpar após 3 segundos
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    } catch (error) {
      console.error("Erro ao enviar notificação:", error);
    }
  };

  const sendOrderConfirmationNotification = async (orderNumber: string, customerName: string) => {
    await sendLocalNotification({
      title: "Pedido Confirmado! 🎉",
      body: `Obrigado ${customerName}! Seu pedido #${orderNumber} foi confirmado.`,
      data: { orderNumber, type: "order_confirmation" },
    });
  };

  const sendOrderStatusNotification = async (status: string, orderNumber: string) => {
    const statusMessages: Record<string, string> = {
      confirmed: "Seu pedido foi confirmado! ✅",
      preparing: "Estamos preparando seu pedido! 👨‍🍳",
      ready: "Seu pedido está pronto! 📦",
      delivered: "Seu pedido foi entregue! 🎉",
      cancelled: "Seu pedido foi cancelado. ❌",
    };

    await sendLocalNotification({
      title: "Atualização do Pedido",
      body: statusMessages[status] || `Status do pedido #${orderNumber} atualizado`,
      data: { orderNumber, status, type: "order_status" },
    });
  };

  return {
    notification,
    sendLocalNotification,
    sendOrderConfirmationNotification,
    sendOrderStatusNotification,
  };
}
