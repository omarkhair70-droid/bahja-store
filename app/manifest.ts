import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Bahja Store',
    short_name: 'Bahja',
    description:
      'Bahja Store | متجر بهجة لقطع هاند ميد أنثوية فاخرة تشمل الشنط والإكسسوارات واللوحات بلمسة فنية.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#F8F2E8',
    theme_color: '#BFA27A',
    icons: [
      {
        src: '/icons/bahja-app-icon-192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/icons/bahja-app-icon-512.png',
        sizes: '512x512',
        type: 'image/png'
      },
      {
        src: '/icons/bahja-app-icon-maskable-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      }
    ]
  };
}
