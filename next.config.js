module.exports = {
  async rewrites() {
    return [
      {
        source: '/svg',
        destination: '/api/tiles',
      },
      {
        source: '/graphql',
        destination: '/api/graphql',
      },
    ]
  },
}
