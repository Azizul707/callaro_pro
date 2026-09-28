// Standalone Next.js-compatible metadata type definitions for cross-framework compatibility
export interface MetadataItem {
  name?: string;
  property?: string;
  content: string;
}

export interface OpenGraphImage {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
}

export interface OpenGraphMetadata {
  title: string;
  description: string;
  url: string;
  siteName: string;
  images: OpenGraphImage[];
  locale?: string;
  type?: string;
}

export interface TwitterMetadata {
  card: 'summary' | 'summary_large_image' | 'player' | 'app';
  title: string;
  description: string;
  images: string[];
  creator?: string;
}

export interface RobotsConfig {
  index: boolean;
  follow: boolean;
  googleBot?: {
    index: boolean;
    follow: boolean;
    'max-video-preview'?: number;
    'max-image-preview'?: string;
    'max-snippet'?: number;
  };
}

export interface NextAppMetadata {
  metadataBase?: URL;
  title: string;
  description: string;
  applicationName?: string;
  authors?: Array<{ name: string; url?: string }>;
  generator?: string;
  keywords?: string[];
  creator?: string;
  publisher?: string;
  formatDetection?: {
    email?: boolean;
    address?: boolean;
    telephone?: boolean;
  };
  alternates?: {
    canonical?: string;
  };
  openGraph?: OpenGraphMetadata;
  twitter?: TwitterMetadata;
  robots?: RobotsConfig;
  icons?: {
    icon?: string;
    shortcut?: string;
    apple?: string;
  };
}

export namespace MetadataRoute {
  export interface SitemapItem {
    url: string;
    lastModified?: string | Date;
    changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    priority?: number;
  }
  export type Sitemap = SitemapItem[];

  export interface Robots {
    rules: {
      userAgent?: string | string[];
      allow?: string | string[];
      disallow?: string | string[];
      crawlDelay?: number;
    } | Array<{
      userAgent?: string | string[];
      allow?: string | string[];
      disallow?: string | string[];
      crawlDelay?: number;
    }>;
    sitemap?: string | string[];
    host?: string;
  }
}
