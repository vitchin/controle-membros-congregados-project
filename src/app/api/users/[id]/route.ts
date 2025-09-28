import { NextRequest, NextResponse } from 'next/server';
import { users, User } from '../db';

type RouteContext = {
  params: {
    id: string;
  };
};

export async function GET(
  req: NextRequest,
  context: RouteContext
) {
  const { id } = context.params;
  const user = users.find(u => u.id === id);
  if (user) {
    return NextResponse.json(user);
  }
  return NextResponse.json({ error: 'User not found' }, { status: 404 });
}

export async function PUT(
  req: NextRequest,
  context: RouteContext
) {
  const { id } = context.params;
  const updatedData: Partial<User> = await req.json();
  const userIndex = users.findIndex(u => u.id === id);

  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...updatedData };
    return NextResponse.json(users[userIndex]);
  }
  return NextResponse.json({ error: 'User not found' }, { status: 404 });
}

export async function DELETE(
  req: NextRequest,
  context: RouteContext
) {
  const { id } = context.params;
  const userIndex = users.findIndex(u => u.id === id);

  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    return NextResponse.json({ message: 'User deleted successfully' });
  }
  return NextResponse.json({ error: 'User not found' }, { status: 404 });
}
