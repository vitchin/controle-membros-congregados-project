import { NextRequest, NextResponse } from 'next/server';
import { users, User } from './db';

export async function GET() {
  // Filter out deleted users
  const activeUsers = users.filter(user => !user.dataExclusao);
  return NextResponse.json(activeUsers);
}

export async function POST(req: NextRequest) {
  const newUser: Omit<User, 'id'> = await req.json();
  const userWithId: User = { ...newUser, id: Date.now().toString() };
  users.push(userWithId);
  return NextResponse.json(userWithId, { status: 201 });
}
