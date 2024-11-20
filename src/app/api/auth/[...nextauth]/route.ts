import NextAuth from "next-auth";
import { User as NextAuthUser } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";
import { JWT } from "next-auth/jwt";

const prisma = new PrismaClient();

const GOOGLE_CLIENT_ID: string | undefined = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET: string | undefined = process.env.GOOGLE_CLIENT_SECRET;

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID as string,
      clientSecret: GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: NextAuthUser }) {
      if (user) {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });
        if (!existingUser) {
          const newUser = await prisma.user.create({
            data: {
              email: user.email,
              name: user.name,
              image: user.image,
            },
          });
          token.id = newUser.id;
        } else {
          token.id = existingUser.id;
        }
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user.id = token.id; // Ensure token.id is correctly set
      }
      return session;
    },
  },
};

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);

