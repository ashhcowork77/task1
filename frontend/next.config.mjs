import { withPayload } from '@payloadcms/next/withPayload';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable standalone output for Docker
  output: 'standalone',

  // Transpile Payload packages used by the admin route
  transpilePackages: ['@payloadcms/next', '@payloadcms/ui'],

  // Image optimization
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },

  // Allow mobile testing from local network
  allowedDevOrigins: ['192.168.100.207'],
};

export default withPayload(nextConfig);
