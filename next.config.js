const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['ipfs.io'],
  },
  // server: {
  //   host: '0.0.0.0', // Listen on all network interfaces
  //   port: 3000, // You can change the port if needed
  // },

};

module.exports = nextConfig;
