module.exports = {
  async rewrites() {
    return [
      {
        source: '/svg',
        destination: '/api/svg',
      },
      {
        source: '/svg/:key',
        destination: '/api/svg/:key',
      },
      {
        source: '/graphql',
        destination: '/api/graphql',
      },
    ];
  },
};
