module.exports = {
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
