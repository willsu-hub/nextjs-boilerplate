# Next.js API 请求示例

本项目包含了完整的 Next.js 服务端和客户端 API 请求示例，展示了不同的数据获取方式和最佳实践。

## 🚀 快速开始

1. 安装依赖：
```bash
npm install
```

2. 启动开发服务器：
```bash
npm run dev
```

3. 访问示例页面：
   - 主页：http://localhost:3000
   - 服务端API示例：http://localhost:3000/api-demo
   - 客户端API示例：http://localhost:3000/client-api-demo

## 📁 项目结构

```
app/
├── api/                    # API 路由
│   ├── hello/             # 基础API示例
│   │   └── route.ts       # GET/POST 请求处理
│   └── users/             # 用户管理API
│       ├── route.ts       # 用户列表和创建
│       └── [id]/          # 动态路由
│           └── route.ts   # 单个用户操作
├── api-demo/              # 服务端组件示例
│   └── page.tsx           # 展示服务端数据获取
├── client-api-demo/       # 客户端组件示例
│   └── page.tsx           # 展示客户端数据获取
└── page.tsx               # 主页面（包含导航链接）
```

## 🔌 API 端点

### 1. 问候API (`/api/hello`)

- **GET** `/api/hello` - 获取问候消息
- **POST** `/api/hello` - 发送数据到问候API

**响应示例：**
```json
{
  "message": "你好，世界！",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "status": "success"
}
```

### 2. 用户管理API (`/api/users`)

- **GET** `/api/users` - 获取所有用户
- **POST** `/api/users` - 创建新用户

**创建用户请求体：**
```json
{
  "name": "新用户",
  "email": "user@example.com",
  "role": "user"
}
```

### 3. 单个用户操作 (`/api/users/[id]`)

- **GET** `/api/users/[id]` - 获取特定用户
- **PUT** `/api/users/[id]` - 更新用户信息
- **DELETE** `/api/users/[id]` - 删除用户

## 🎯 示例说明

### 服务端组件示例 (`/api-demo`)

- 使用 **服务端组件** 在构建时或请求时获取数据
- 支持缓存策略（`revalidate` 和 `cache: 'no-store'`）
- 包含错误边界和加载状态
- 数据在服务端渲染，SEO友好

**关键特性：**
```tsx
// 禁用缓存，每次请求都获取最新数据
const response = await fetch('/api/users', {
  cache: 'no-store'
});

// 缓存60秒
const response = await fetch('/api/hello', {
  next: { revalidate: 60 }
});
```

### 客户端组件示例 (`/client-api-demo`)

- 使用 **客户端组件** 在浏览器中获取数据
- 支持实时交互（创建、删除用户）
- 包含状态管理、错误处理和加载状态
- 适合需要用户交互的场景

**关键特性：**
```tsx
// 使用 React hooks 管理状态
const [users, setUsers] = useState<User[]>([]);
const [loading, setLoading] = useState(true);

// 异步数据获取
const fetchUsers = async () => {
  const response = await fetch('/api/users');
  const data = await response.json();
  setUsers(data.users);
};
```

## 🛠️ 技术特性

- **TypeScript** - 完整的类型支持
- **Tailwind CSS** - 现代化UI设计
- **响应式设计** - 支持移动端和桌面端
- **错误处理** - 完善的错误边界和用户提示
- **加载状态** - 优雅的加载动画
- **暗色模式** - 支持亮色和暗色主题

## 📚 最佳实践

### 服务端数据获取

1. **缓存策略**：根据数据更新频率选择合适的缓存策略
2. **错误处理**：使用 try-catch 和错误边界处理异常
3. **类型安全**：为API响应定义完整的TypeScript接口

### 客户端数据获取

1. **状态管理**：合理使用 useState 和 useEffect
2. **用户反馈**：提供加载状态、成功消息和错误提示
3. **数据同步**：操作后及时更新本地状态

### API 设计

1. **RESTful**：遵循REST API设计原则
2. **错误处理**：返回合适的HTTP状态码和错误信息
3. **数据验证**：在服务端验证请求数据
4. **响应格式**：保持一致的响应结构

## 🔍 测试API

可以使用以下工具测试API：

### 使用 curl

```bash
# 获取问候消息
curl http://localhost:3000/api/hello

# 获取用户列表
curl http://localhost:3000/api/users

# 创建新用户
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"测试用户","email":"test@example.com","role":"user"}'

# 获取特定用户
curl http://localhost:3000/api/users/1

# 更新用户
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"更新后的姓名"}'

# 删除用户
curl -X DELETE http://localhost:3000/api/users/1
```

### 使用 Postman 或 Insomnia

导入以下集合或手动创建请求：

1. **GET** `http://localhost:3000/api/hello`
2. **POST** `http://localhost:3000/api/hello` (Body: `{"test": "data"}`)
3. **GET** `http://localhost:3000/api/users`
4. **POST** `http://localhost:3000/api/users` (Body: `{"name":"用户","email":"user@example.com"}`)
5. **GET** `http://localhost:3000/api/users/1`
6. **PUT** `http://localhost:3000/api/users/1` (Body: `{"name":"新姓名"}`)
7. **DELETE** `http://localhost:3000/api/users/1`

## 🚀 部署

项目可以部署到任何支持 Next.js 的平台：

- **Vercel** (推荐)
- **Netlify**
- **Railway**
- **Docker**

## 📖 学习资源

- [Next.js 官方文档](https://nextjs.org/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [React Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进这个项目！

## 📄 许可证

MIT License
