module.exports = {
  async rewrites() {
    return [
      {
        source: '/svg',
        destination: '/api/tiles',
      },
    ]
  },
}
