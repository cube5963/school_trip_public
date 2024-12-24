import  prisma  from '../db.server';

export async function postPlace(loginid: string, place: string) {
  try {
    await prisma.focus.create({
      data: {
        loginId: loginid,
        place: place,
      },
    });
  } catch (e) {
    console.error('Error in postPlace:', e);
  }
}

export async function getPlace(loginid: string) {
  try {
    const result = await prisma.focus.findMany({
      where: {
        loginId: loginid,
      },
    });
    return result;
  } catch (e) {
    console.error('Error in getPlace:', e);
  }
}
