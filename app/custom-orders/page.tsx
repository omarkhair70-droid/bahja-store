import SectionShell from '@/components/SectionShell';
import WhatsAppButton from '@/components/WhatsAppButton';
import { getWhatsAppUrl, whatsappMessages } from '@/lib/whatsapp';

export default function CustomOrdersPage() {
  return <SectionShell title="Custom Orders" subtitle="Design your piece with your own details."><ul className="mb-6 list-disc space-y-2 pl-5 text-bahja-taupe"><li>Choose your preferred color.</li><li>Select size based on your need.</li><li>Pick chain style and finishing quality.</li><li>Add design details that reflect your style.</li><li>Pricing may vary depending on customization.</li></ul><WhatsAppButton href={getWhatsAppUrl(whatsappMessages.customOrderInquiry)}>Discuss your custom order on WhatsApp</WhatsAppButton></SectionShell>;
}
