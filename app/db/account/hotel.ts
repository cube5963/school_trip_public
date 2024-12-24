//import { PrismaClient } from '@prisma/client';
import { searchAccount } from './search_account';

//const prisma = new PrismaClient();

import  prisma  from '../db.server';

export async function getHotel(
  loginId: string,
): Promise<{ hotel1: number; hotel2: number, hotel3: number } | null> {
  const id = await searchAccount(loginId);

  const room = await prisma.user.findUnique({
    where: {
      id: id as number,
    },
    select: {
      hotel1: true,
      hotel2: true,
      hotel3: true,
    },
  })

  if (room) {
    return {
      hotel1: Number(room.hotel1),
      hotel2: Number(room.hotel2),
      hotel3: Number(room.hotel3),
    };
  }
  return null;
}
