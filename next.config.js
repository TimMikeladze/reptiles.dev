module.exports = {
  async rewrites() {
    return [
      {
        source: '/svg',
        destination: '/api/svg',
      },
      {
        source: '/svg/:key*',
        destination: '/api/svg',
      },
      {
        source: '/graphql',
        destination: '/api/graphql',
      },
    ];
  },
};
