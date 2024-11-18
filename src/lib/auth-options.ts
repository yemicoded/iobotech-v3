/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { TLogin } from "@/types/auth";
import { Login } from "@/app/services/auth";
import { cookies } from "next/headers";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {},
      authorize: async (credentials) => {
        const cookieStore = await cookies();
        const { error, data } = await Login({
          email: (credentials as TLogin).email,
          password: (credentials as TLogin).password,
        });
        if (error) {
          throw new Error(error);
          // return Promise.reject(error);
        }

        cookieStore.set("authToken", data?.token || "");
        return Promise.resolve({
          email: (credentials as any).email,

          ...data,
        }) as unknown as any;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = { ...user };
      }
      return token;
    },
    session: ({ session, token }: any) => {
      return {
        ...session,
        maxAge: 30 * 60, // 30 minutes in seconds
        user: {
          ...session.user,
          email: token.user.email,
          token: token.user.token,
          // expires: new Date(token.user.expires),
        },
        // expires: new Date(token.user.expired),
      } as Session & { user: { id: string; role: string } };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
