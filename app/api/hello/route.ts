import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    message: '你好，世界！',
    timestamp: new Date().toISOString(),
    status: 'success'
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({ 
      message: '数据已接收',
      receivedData: body,
      timestamp: new Date().toISOString(),
      status: 'success'
    });
  } catch (error) {
    return NextResponse.json(
      { error: '无效的JSON数据' },
      { status: 400 }
    );
  }
}
