import { NextResponse } from 'next/server';

// 模拟用户数据
const mockUsers = [
  { id: 1, name: '张三', email: 'zhangsan@example.com', role: 'admin' },
  { id: 2, name: '李四', email: 'lisi@example.com', role: 'user' },
  { id: 3, name: '王五', email: 'wangwu@example.com', role: 'user' },
];

export async function GET() {
  // 模拟API延迟
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return NextResponse.json({
    users: mockUsers,
    total: mockUsers.length,
    status: 'success'
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // 验证必需字段
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: '姓名和邮箱是必需的' },
        { status: 400 }
      );
    }
    
    // 创建新用户
    const newUser = {
      id: mockUsers.length + 1,
      name: body.name,
      email: body.email,
      role: body.role || 'user'
    };
    
    mockUsers.push(newUser);
    
    return NextResponse.json({
      message: '用户创建成功',
      user: newUser,
      status: 'success'
    }, { status: 201 });
    
  } catch (error) {
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    );
  }
}
