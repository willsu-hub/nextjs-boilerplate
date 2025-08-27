/** @type {import('next').NextConfig} */
const nextConfig = {
  // 禁用自动国际化重定向
  experimental: {
    // 禁用自动语言检测
    typedRoutes: false,
  },
  // 确保 API 路由不被重定向
  async redirects() {
    return [];
  },
  // 禁用自动语言前缀
  i18n: undefined,
  // 确保 API 路由正常工作
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ];
  },
  // 配置输出模式
  output: 'standalone',
  // 配置动态渲染
  dynamicParams: true,
};

module.exports = nextConfig;
