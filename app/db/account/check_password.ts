//import { PrismaClient } from '@prisma/client';
import { searchAccount } from './search_account';

//const prisma = new PrismaClient();

import  prisma  from '../db.server';

export async function checkPassword(loginid: string): Promise<boolean> {
  const id = await searchAccount(loginid);

  const password = await prisma.user.findUnique({
    where: {
      id: id as number,
    },
    select: {
      password: true,
    },
  });

  //console.log(password);

  if (password === null || password.password === null) {
    return true;
  } else {
    return false;
  }
}
