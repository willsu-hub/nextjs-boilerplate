import { Suspense } from 'react';
import { userApi, helloApi } from '@/lib/api';

// 服务端组件 - 获取用户数据
async function UsersList() {
  try {
    const response = await userApi.getAll();
    console.log(`Response: ${JSON.stringify(response)}`);  
    
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">用户列表（服务端获取）</h3>
        <div className="grid gap-3">
          {response.users.map((user: any) => (
            <div key={user.id} className="p-3 border rounded-lg bg-gray-50 dark:bg-gray-800">
              <div className="font-medium">{user.name}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{user.email}</div>
              <div className="text-xs text-blue-600 dark:text-blue-400">角色: {user.role}</div>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="p-4 border rounded-lg bg-red-50 dark:bg-red-900/20">
        <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">用户列表</h3>
        <p className="text-red-700 dark:text-red-300">加载失败，请稍后重试</p>
        <p className="text-xs text-red-600 dark:text-red-400 mt-2">
          错误信息: {error instanceof Error ? error.message : '未知错误'}
        </p>
      </div>
    );
  }
}

// 服务端组件 - 获取问候消息
async function GreetingMessage() {
  try {
    const response = await helloApi.get();
    console.log(`Response: ${JSON.stringify(response)}`);  
    
    return (
      <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-900/20">
        <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">问候消息</h3>
        <p className="text-green-700 dark:text-green-300">{response.message}</p>
        <p className="text-sm text-green-600 dark:text-green-400">
          时间: {new Date(response.timestamp).toLocaleString('zh-CN')}
        </p>
      </div>
    );
  } catch (error) {
    return (
      <div className="p-4 border rounded-lg bg-red-50 dark:bg-red-900/20">
        <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">问候消息</h3>
        <p className="text-red-700 dark:text-red-300">加载失败，请稍后重试</p>
        <p className="text-xs text-red-600 dark:text-red-400 mt-2">
          错误信息: {error instanceof Error ? error.message : '未知错误'}
        </p>
      </div>
    );
  }
}

// 加载状态组件
function Loading() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <span className="ml-2">加载中...</span>
    </div>
  );
}

// 错误边界组件
function ErrorBoundary({ children, fallback }: { children: React.ReactNode; fallback: React.ReactNode }) {
  return (
    <Suspense fallback={<Loading />}>
      {children}
    </Suspense>
  );
}

export default function ApiDemoPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Next.js API 请求示例
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            展示如何在服务端组件中调用API接口
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* 问候消息 */}
          <ErrorBoundary fallback={<div>加载问候消息失败</div>}>
            <GreetingMessage />
          </ErrorBoundary>

          {/* 用户列表 */}
          <ErrorBoundary fallback={<div>加载用户列表失败</div>}>
            <UsersList />
          </ErrorBoundary>
        </div>

        <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">API 端点说明</h2>
          <div className="space-y-3 text-sm">
            <div>
              <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">GET /api/hello</code>
              <span className="ml-2">- 获取问候消息</span>
            </div>
            <div>
              <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">POST /api/hello</code>
              <span className="ml-2">- 发送数据到问候API</span>
            </div>
            <div>
              <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">GET /api/users</code>
              <span className="ml-2">- 获取所有用户</span>
            </div>
            <div>
              <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">POST /api/users</code>
              <span className="ml-2">- 创建新用户</span>
            </div>
            <div>
              <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">GET /api/users/[id]</code>
              <span className="ml-2">- 获取特定用户</span>
            </div>
            <div>
              <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">PUT /api/users/[id]</code>
              <span className="ml-2">- 更新特定用户</span>
            </div>
            <div>
              <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">DELETE /api/users/[id]</code>
              <span className="ml-2">- 删除特定用户</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
