import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id, 10);
  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
  }

  const user = await prisma.membro.findUnique({
    where: { id },
  });

  if (user) {
    return NextResponse.json(user);
  }
  return NextResponse.json({ error: 'User not found' }, { status: 404 });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id, 10);
  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
  }

  try {
    const body = await req.json();

    const data = {
      ...body,
      dtNascimento: body.dtNascimento ? new Date(body.dtNascimento) : undefined,
      dtCasamento: body.dtCasamento ? new Date(body.dtCasamento) : null,
      dtBatismo: body.dtBatismo ? new Date(body.dtBatismo) : null,
      dtAdmissao: body.dtAdmissao ? new Date(body.dtAdmissao) : null,
      dtConversao: body.dtConversao ? new Date(body.dtConversao) : null,
      numFilhos: body.numFilhos ? parseInt(body.numFilhos, 10) : null,
    };

    delete data.id;

    const updatedUser = await prisma.membro.update({
      where: { id },
      data,
    });
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Failed to update user:", error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id, 10);
  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
  }

  try {
    await prisma.membro.update({
      where: { id },
      data: {
        dataExclusao: new Date(),
      },
    });
    return NextResponse.json({ message: 'User soft deleted successfully' });
  } catch (error) {
    console.error("Failed to delete user:", error);
    return NextResponse.json({ error: 'User not found or failed to delete' }, { status: 404 });
  }
}
