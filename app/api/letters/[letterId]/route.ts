import { NextResponse } from 'next/server';
import { NextApiRequest } from 'next';
import prisma from '@/app/libs/prismadb';


export const GET = async (req: NextApiRequest) => {
  const { searchParams } = new URL(req.url as string);
  const letterId = searchParams.get("letterId")

  if (!letterId) {
    return new NextResponse('Letter ID not found', { status: 404 });
  }

  const letter = await prisma.letter.findUnique({
    where: { id: letterId }
    });

  if (!letter) {    
    return new NextResponse('Letter not asdasdasd', { status: 404 });
  }

  return new Response(JSON.stringify(letter), { status: 200 })
};