import { prisma } from "./prismaClient";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { Response } from "express";

const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

export function generateSessionToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

export async function createSession(userId: string): Promise<string> {
  const token = generateSessionToken();
  const expiresAt = new Date(Date.now() + THIRTY_DAYS);

  await prisma.session.create({
    data: {
      id: token,
      userId,
      expiresAt,
    },
  });

  return token;
}

export async function validateSession(sessionId: string) {
  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
    },
  });

  if (!session) {
    return null;
  }

  if (session.expiresAt < new Date()) {
    await prisma.session.delete({ where: { id: sessionId } });

    return null;
  }

  await prisma.session.update({
    where: { id: sessionId },
    data: { expiresAt: new Date(Date.now() + THIRTY_DAYS) },
  });

  return { user: session.user, session: session.id };
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function cleanupExpiredSessions(): Promise<void> {
  await prisma.session.deleteMany({
    where: {
      expiresAt: {
        lt: new Date(),
      },
    },
  });
}

export const clearSessionCookie = (res: Response) => {
  res.clearCookie("session", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
};
