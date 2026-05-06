import Link from 'next/link';
import { cn } from '@/lib/utils';

type Props = { href: string; children: React.ReactNode; className?: string };

export default function WhatsAppButton({ href, children, className }: Props) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex items-center justify-center rounded-full bg-bahja-terracotta px-5 py-3 text-sm font-medium text-white transition hover:bg-bahja-brown focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bahja-champagne',
        className
      )}
    >
      {children}
    </Link>
  );
}
