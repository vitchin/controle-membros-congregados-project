import { NextRequest, NextResponse } from 'next/server';
import { users, User } from '../db';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = users.find(u => u.id === params.id);
  if (user) {
    return NextResponse.json(user);
  }
  return NextResponse.json({ error: 'User not found' }, { status: 404 });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const updatedData: Partial<User> = await req.json();
  const userIndex = users.findIndex(u => u.id === params.id);
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...updatedData };
    return NextResponse.json(users[userIndex]);
  }
  return NextResponse.json({ error: 'User not found' }, { status: 404 });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const userIndex = users.findIndex(u => u.id === params.id);
  if (userIndex !== -1) {
    // This is a hard delete for now, will be changed to soft delete later
    users.splice(userIndex, 1);
    return NextResponse.json({ message: 'User deleted successfully' });
  }
  return NextResponse.json({ error: 'User not found' }, { status: 404 });
}
