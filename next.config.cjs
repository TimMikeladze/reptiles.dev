export default {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/g',
        destination: '/api/tiles',
      },
    ];
  },
};
