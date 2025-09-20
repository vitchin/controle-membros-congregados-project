import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const activeUsers = await prisma.membro.findMany({
    where: {
      dataExclusao: null,
    },
  });
  return NextResponse.json(activeUsers);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Convert date strings to Date objects and handle optional fields
    const data = {
      ...body,
      dtNascimento: body.dtNascimento ? new Date(body.dtNascimento) : undefined,
      dtCasamento: body.dtCasamento ? new Date(body.dtCasamento) : null,
      dtBatismo: body.dtBatismo ? new Date(body.dtBatismo) : null,
      dtAdmissao: body.dtAdmissao ? new Date(body.dtAdmissao) : null,
      dtConversao: body.dtConversao ? new Date(body.dtConversao) : null,
      numFilhos: body.numFilhos ? parseInt(body.numFilhos, 10) : null,
    };

    // Remove id from data if it exists, as it's auto-generated
    delete data.id;

    const newUser = await prisma.membro.create({
      data,
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Failed to create user:", error);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}
