export const whatsappNumber = '201100524195';

export function getWhatsAppUrl(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const whatsappMessages = {
  productInquiry: (product: string) =>
    `مرحبًا بهجة ستور،
أود الاستفسار عن: ${product}
هل يمكن تأكيد التوفر، السعر النهائي، وخيارات التخصيص؟`,
  customOrderInquiry:
    'مرحبًا بهجة ستور، أود الاستفسار عن المنتجات والطلبات الخاصة.',
  generalContact: 'مرحبًا بهجة ستور، أود الاستفسار عن المنتجات والطلبات الخاصة.'
};
