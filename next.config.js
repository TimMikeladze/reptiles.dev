module.exports = {
  async rewrites() {
    return [
      {
        source: '/random',
        destination: '/api/svg',
      },
      {
        source: '/svg',
        destination: '/api/svg',
      },
      {
        source: '/svg/:key*',
        destination: '/api/svg',
      },
      {
        source: '/:key',
        destination: '/api/svg',
      },
    ];
  },
};
