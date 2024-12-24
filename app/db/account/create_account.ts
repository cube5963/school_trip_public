import * as bcrypt from 'bcrypt';
//import { PrismaClient } from '@prisma/client';

//const prisma = new PrismaClient();

import  prisma  from '../db.server';

import { searchAccount } from './search_account';
import { checkPassword } from './check_password';
import { Status_Messages } from '../../enum/status';

export async function createAccount(
  loginid: string,
  password: string,
): Promise<Status_Messages> {
  const id = await searchAccount(loginid);

  if (id === false) {
    return Status_Messages.AccountNotFound;
  } else {
    const passwordExists = await checkPassword(loginid);

    if (passwordExists) {
      try {
        const userId = id as number; // Ensure id is a number
        const hash = await bcrypt.hash(password, 10);

        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            password: hash,
          },
        });

        return Status_Messages.Success;
      } catch {
        return Status_Messages.Error;
      }
    } else {
      return Status_Messages.PasswordAlreadyExists;
    }
  }
}
