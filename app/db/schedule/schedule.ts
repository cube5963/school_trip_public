import { Schedule } from '@prisma/client';
import { searchAccount } from '../account/search_account';
import prisma from '../db.server';

export async function getSchedules(loginid: string, day: number): Promise<Schedule[]> {
  const id = await searchAccount(loginid);

  const group = await prisma.user.findUnique({
    where: {
      id: id as number,
    },
    select: {
      group: true,
    },
  });

  if (!group || group.group === null) {
    throw new Error('Group not found or group is null');
  }

  const schedule = await prisma.schedule.findMany({
    where: {
      date: day,
      group: { in: [group.group, 11] },
    },
  });

  // タイムゾーンを-9時間（日本時間）に変換
  const scheduleWithTimezone = schedule.map((item) => {
    return {
      ...item,
      start: new Date(item.start.getTime() - 9 * 60 * 60 * 1000), // 9時間引く
      end: item.end ? new Date(item.end.getTime() - 9 * 60 * 60 * 1000) : null, // endも9時間引く
    };
  });

  return scheduleWithTimezone;
}

export async function getALLSchedules(day: number, group: number): Promise<Schedule[]> {
  const schedule = await prisma.schedule.findMany({
    where: {
      date: day,
      group: { in: [group, 11] },
    },
  });

  // タイムゾーンを-9時間（日本時間）に変換
  const scheduleWithTimezone = schedule.map((item) => {
    return {
      ...item,
      start: new Date(item.start.getTime() - 9 * 60 * 60 * 1000), // 9時間引く
      end: item.end ? new Date(item.end.getTime() - 9 * 60 * 60 * 1000) : null, // endも9時間引く
    };
  });

  return scheduleWithTimezone;
}
