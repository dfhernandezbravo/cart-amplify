/** @type {import('next').NextConfig} */
const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'cart',
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          './cartAside': './src/pages/index.tsx',
          './cart': './src/pages/cart/[cartId].tsx',
        },
        extraOptions: {
          exposePages: true,
          automaticAsyncBoundary: true,
        },
      }),
    );
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })
    return config;
  },
};

module.exports = nextConfig;
