import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const loginSchema = z.object({
  uid: z.string().email(),
  password: z.string().min(1),
});

export const loginUser = async (req: Request, res: Response): Promise< Response | void> => {
  try {
    const { uid, password } = loginSchema.parse(req.body);
    const user = await prisma.user.findUnique({ where: { email: uid } });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    return res.json({ message: 'Login successful', user });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
};
