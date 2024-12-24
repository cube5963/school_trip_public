import * as bcrypt from 'bcrypt';
//import { PrismaClient } from '@prisma/client';

//const prisma = new PrismaClient();

import  prisma  from '../db.server';

import { searchAccount } from './search_account';
import { Status_Messages } from '../../enum/status';
import { checkPassword } from './check_password';

export async function login(
  loginid: string,
  password: string,
): Promise<Status_Messages> {
  const id = await searchAccount(loginid);

  if (id === false) {
    return Status_Messages.AccountNotFound;
  } else {
    const passwordExists = await checkPassword(loginid);

    /*if (passwordExists) {
      const userId = id as number; // Ensure id is a number

      const pass = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          password: true,
        },
      });

      if (pass && pass.password) {
        const check = await bcrypt.compare(password, pass.password);

        if (check) {
          return Status_Messages.PasswordAlreadyExists;
        } else {
          return Status_Messages.PasswordNotMatch;
        }
      } else {
        return Status_Messages.PasswordNotFound;
      }*/
      if (!passwordExists){
        const userId = id as number; // Ensure id is a number

        const pass = await prisma.user.findUnique({
          where: {
            id: userId,
          },
          select: {
            password: true,
          },
        });

        if (pass && pass.password) {
          const check = await bcrypt.compare(password, pass.password);

          if (check) {
            return Status_Messages.Success;
          } else {
            return Status_Messages.PasswordNotMatch;
        }
      } else {
        return Status_Messages.PasswordNotFound;
      }
    }
    return Status_Messages.PasswordNotFound;
  }
  return Status_Messages.PasswordNotFound;
}

export async function checkFocus(loginid: string) {
  try {
    const id = await searchAccount(loginid);

    const user = await prisma.user.findUnique({
      where: {
        id: id as number,
      },
      select: {
        focus: true,
      },
    });

    if (user && user.focus === true) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.error(e);
  }
}

export async function checkAdmin(loginid: string) {
  try {
    const id = await searchAccount(loginid);

    const user = await prisma.user.findUnique({
      where: {
        id: id as number,
      },
      select: {
        admin: true,
      },
    });

    if (user && user.admin === true) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.error(e);
  }
}
