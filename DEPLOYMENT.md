# 部署说明

## Vercel 部署问题解决方案

### 问题描述
在 Vercel 上部署时，API 接口出现循环重定向问题：
- `/api/users` 重定向到 `/en/api/users`
- `/en/api/users` 重定向到 `/api/users`

### 解决方案

#### 1. 配置文件更新

**next.config.js**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: false,
  },
  async redirects() {
    return [];
  },
  i18n: undefined,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
```

**vercel.json**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    }
  ],
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 10
    }
  }
}
```

#### 2. 环境变量配置

在 Vercel 项目设置中添加以下环境变量：

```
NEXT_DISABLE_I18N=true
NEXT_API_ROUTES_ENABLED=true
```

#### 3. 部署步骤

1. 提交代码更改到 Git 仓库
2. 在 Vercel 上重新部署项目
3. 检查部署日志确保没有错误
4. 测试 API 接口是否正常工作

#### 4. 验证方法

部署成功后，测试以下接口：
- `https://your-domain.vercel.app/api/users`
- `https://your-domain.vercel.app/api/hello`

应该返回正确的 JSON 数据，而不是重定向。

### 注意事项

- 确保 `next.config.js` 和 `vercel.json` 文件都已正确配置
- 如果问题仍然存在，可能需要清除 Vercel 的缓存
- 考虑使用 Vercel 的 Edge Functions 来优化 API 性能
