import SectionShell from '@/components/SectionShell';
import WhatsAppButton from '@/components/WhatsAppButton';
import { site } from '@/content/site';
import { getWhatsAppUrl, whatsappMessages } from '@/lib/whatsapp';

export default function ContactPage() {
  return <SectionShell title="Contact Bahja Store"><div className="space-y-2 text-bahja-taupe"><p>WhatsApp / Mobile: {site.phone}</p><p>{site.locationEn}</p><p>{site.locationAr}</p></div><div className="my-6"><WhatsAppButton href={getWhatsAppUrl(whatsappMessages.generalContact)}>Send a general inquiry</WhatsAppButton></div><div className="space-y-3"><h3 className="text-xl font-semibold text-bahja-brown">FAQ</h3><p><strong>How do I order?</strong> Browse, choose your piece, and contact us on WhatsApp.</p><p><strong>Can I customize color or size?</strong> Yes, customizations are available.</p><p><strong>Do prices change?</strong> Yes, depending on design details and finishing.</p><p><strong>Where are you located?</strong> El Mokattam – Al-Hadaba Al-Wosta, Cairo, Egypt.</p></div></SectionShell>;
}
