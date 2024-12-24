//import { PrismaClient } from '@prisma/client';

//const prisma = new PrismaClient();

import  prisma  from '../db.server';

export async function searchAccount(
  loginid: string,
): Promise<number | boolean> {
  const account = await prisma.user.findMany({
    where: {
      loginId: loginid,
    },
  });

  return account.length > 0 ? account[0].id : false;
}

export async function IdToName(loginid: string): Promise<string> {
  const id = await searchAccount(loginid);

  if (typeof id !== 'number') {
    throw new Error('Account not found');
  }

  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      name: true,
    },
  });
  if (!user) {
    throw new Error('User not found');
  }
  return user.name;
}
