import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'extabzpmipcvukudghwl.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/admin/:path*',
        has: [
          {
            type: 'host',
            value: 'innovacompanyven.com',
          },
        ],
        destination: 'https://admin.innovacompanyven.com/:path*',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/:path*',
          has: [
            {
              type: 'host',
              value: 'admin.innovacompanyven.com',
            },
          ],
          destination: '/admin/:path*',
        },
      ],
    };
  },
};

export default nextConfig;
