'use client';

import { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface ApiResponse {
  users: User[];
  total: number;
  status: string;
}

export default function ClientApiDemoPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'user' });
  const [message, setMessage] = useState<string | null>(null);

  // 获取用户列表
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/users');
      if (!response.ok) {
        throw new Error('获取用户数据失败');
      }
      const data: ApiResponse = await response.json();
      setUsers(data.users);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : '未知错误');
    } finally {
      setLoading(false);
    }
  };

  // 创建新用户
  const createUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '创建用户失败');
      }

      const data = await response.json();
      setMessage(`用户 ${data.user.name} 创建成功！`);
      setNewUser({ name: '', email: '', role: 'user' });
      
      // 重新获取用户列表
      setTimeout(fetchUsers, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : '创建用户失败');
    }
  };

  // 删除用户
  const deleteUser = async (userId: number) => {
    if (!confirm('确定要删除这个用户吗？')) return;
    
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('删除用户失败');
      }

      setMessage('用户删除成功！');
      // 重新获取用户列表
      setTimeout(fetchUsers, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : '删除用户失败');
    }
  };

  // 组件挂载时获取用户数据
  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span>加载中...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            客户端 API 请求示例
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            展示如何在客户端组件中调用API接口
          </p>
        </div>

        {/* 消息提示 */}
        {message && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            {message}
            <button
              onClick={() => setMessage(null)}
              className="float-right text-green-700 hover:text-green-900"
            >
              ×
            </button>
          </div>
        )}

        {/* 错误提示 */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
            <button
              onClick={() => setError(null)}
              className="float-right text-red-700 hover:text-red-900"
            >
              ×
            </button>
          </div>
        )}

        <div className="grid gap-8 md:grid-cols-2">
          {/* 创建用户表单 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">创建新用户</h2>
            <form onSubmit={createUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">姓名</label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">邮箱</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">角色</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="user">普通用户</option>
                  <option value="admin">管理员</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                创建用户
              </button>
            </form>
          </div>

          {/* 用户列表 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">用户列表</h2>
              <button
                onClick={fetchUsers}
                className="text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 px-3 py-1 rounded-lg transition-colors"
              >
                刷新
              </button>
            </div>
            <div className="space-y-3">
              {users.map((user) => (
                <div key={user.id} className="p-3 border rounded-lg bg-gray-50 dark:bg-gray-700">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{user.email}</div>
                      <div className="text-xs text-blue-600 dark:text-blue-400">角色: {user.role}</div>
                    </div>
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="text-red-600 hover:text-red-800 text-sm px-2 py-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      删除
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">功能说明</h2>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>• 页面加载时自动获取用户列表</li>
            <li>• 可以创建新用户（姓名和邮箱为必填项）</li>
            <li>• 可以删除现有用户（会有确认提示）</li>
            <li>• 所有操作都会实时更新用户列表</li>
            <li>• 包含错误处理和加载状态</li>
            <li>• 支持手动刷新数据</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
