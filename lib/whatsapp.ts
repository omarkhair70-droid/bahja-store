export const whatsappNumber = '201100524195';

export function getWhatsAppUrl(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const whatsappMessages = {
  productInquiry: (product: string) => `مرحبًا بهجة ستور، أود الاستفسار عن القطعة التالية: ${product}`,
  customOrderInquiry:
    'مرحبًا بهجة ستور، أرغب في طلب قطعة مخصصة وأريد مناقشة اللون والمقاس والتشطيب والتفاصيل.',
  generalContact: 'مرحبًا بهجة ستور، أود الاستفسار عن المنتجات وطريقة الطلب.'
};
