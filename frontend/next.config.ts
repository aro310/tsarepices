import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  
  images: {
    qualities: [75, 85, 90],
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      // Ajoutez ici vos patterns distants si nécessaire
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  compress: true,
  poweredByHeader: false,

  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PATCH,DELETE,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          // no-cache : le navigateur re-vérifie toujours le serveur avant d'utiliser le cache
          // Changer en 'public, max-age=31536000, immutable' seulement en production finale
          { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },

  // ✅ Turbopack : seulement les vraies options turbopack ici
  turbopack: {
    resolveAlias: {
      // Si vous avez besoin d'aliases
    },
    rules: {
      // Règles personnalisées si nécessaire
    },
  },

  // ✅ optimizePackageImports va ici, pas dans turbopack
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
};

export default nextConfig;