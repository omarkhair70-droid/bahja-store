export const whatsappNumber = '201100524195';

export function getWhatsAppUrl(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const whatsappMessages = {
  productInquiry: (product: string) => `Hi Bahja Store! I would love to ask about ${product}.`,
  customOrderInquiry:
    'Hi Bahja Store! I would like to place a custom order and discuss colors, sizes, and finishing details.',
  generalContact: 'Hi Bahja Store! I would like to ask about your products and ordering process.'
};
