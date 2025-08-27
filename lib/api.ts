// API 基础配置
const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

// 通用API响应类型
export interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  status: string;
  error?: string;
}

// 用户相关类型
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  role?: string;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  role?: string;
}

// 通用fetch包装函数
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    console.log(`>>> Request URL: ${url}`);
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : '未知错误');
  }
}

// 用户相关API函数
export const userApi = {
  // 获取所有用户
  async getAll(): Promise<{ users: User[]; total: number, status: string }> {
    return apiRequest('/api/users');
  },

  // 获取单个用户
  async getById(id: number): Promise<{ user: User }> {
    return apiRequest(`/api/users/${id}`);
  },

  // 创建用户
  async create(userData: CreateUserRequest): Promise<{ user: User }> {
    return apiRequest('/api/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // 更新用户
  async update(id: number, userData: UpdateUserRequest): Promise<{ user: User }> {
    return apiRequest(`/api/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },

  // 删除用户
  async delete(id: number): Promise<{ deletedUser: User }> {
    return apiRequest(`/api/users/${id}`, {
      method: 'DELETE',
    });
  },
};

// 问候API函数
export const helloApi = {
  // 获取问候消息
  async get(): Promise<{ message: string; timestamp: string }> {
    return apiRequest('/api/hello');
  },

  // 发送数据到问候API
  async post(data: any): Promise<{ receivedData: any; timestamp: string }> {
    return apiRequest('/api/hello', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// 导出基础配置
export { API_BASE_URL };
