import { MetadataRoute } from '@/src/types/next-seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/'],
      },
    ],
    sitemap: 'https://callora.pro/sitemap.xml',
  };
}
