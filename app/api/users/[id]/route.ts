import { NextRequest, NextResponse } from 'next/server';

// 模拟用户数据（在实际应用中，这通常来自数据库）
const mockUsers = [
  { id: 1, name: '张三', email: 'zhangsan@example.com', role: 'admin' },
  { id: 2, name: '李四', email: 'lisi@example.com', role: 'user' },
  { id: 3, name: '王五', email: 'wangwu@example.com', role: 'user' },
];

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  const user = mockUsers.find(u => u.id === id);
  
  if (!user) {
    return NextResponse.json(
      { error: '用户未找到' },
      { status: 404 }
    );
  }
  
  return NextResponse.json({ user, status: 'success' });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const userIndex = mockUsers.findIndex(u => u.id === id);
    
    if (userIndex === -1) {
      return NextResponse.json(
        { error: '用户未找到' },
        { status: 404 }
      );
    }
    
    const body = await request.json();
    
    // 更新用户信息
    mockUsers[userIndex] = {
      ...mockUsers[userIndex],
      ...body,
      id // 确保ID不被修改
    };
    
    return NextResponse.json({
      message: '用户更新成功',
      user: mockUsers[userIndex],
      status: 'success'
    });
    
  } catch (error) {
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  const userIndex = mockUsers.findIndex(u => u.id === id);
  
  if (userIndex === -1) {
    return NextResponse.json(
      { error: '用户未找到' },
      { status: 404 }
    );
  }
  
  const deletedUser = mockUsers.splice(userIndex, 1)[0];
  
  return NextResponse.json({
    message: '用户删除成功',
    deletedUser,
    status: 'success'
  });
}
