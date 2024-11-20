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
      if (user?.email) { // Ensure email is defined
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });
        if (!existingUser) {
          // Only create the user if email is not null or undefined
          if (typeof user.email === "string") {
            const newUser = await prisma.user.create({
              data: {
                email: user.email, // Safe because we've checked it's a string
                name: user.name || "", // Optional fallback for name
                image: user.image || "", // Optional fallback for image
              },
            });
            token.id = newUser.id;
          } else {
            // Handle error if email is not a string (this shouldn't happen if Google auth works properly)
            console.error("Invalid email received:", user.email);
            return token;
          }
        } else {
          token.id = existingUser.id;
        }
      } else {
        // Handle case where user.email is undefined or null
        console.error("No email available for user");
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
