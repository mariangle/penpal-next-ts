import { NextResponse } from 'next/server';
import { NextApiRequest } from 'next';
import prisma from '@/app/libs/prismadb';


export const GET = async (req: NextApiRequest) => {
  const { searchParams } = new URL(req.url as string);
  const email = searchParams.get("email")

  if (!email) {
    return new NextResponse("Email is required", { status: 400 })
  }

  const user = await prisma.user.findUnique({
    where: { email: email },
    select: {
      id: true,
    },
  });

  if (!user) {
    return new NextResponse("User with provided email not found", { status: 404 });
  }
  

  return new Response(JSON.stringify(user), { status: 200 })
};