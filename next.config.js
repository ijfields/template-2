/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    // Disable static page generation
    workerThreads: false,
    cpus: 1
  }
}

module.exports = nextConfig 