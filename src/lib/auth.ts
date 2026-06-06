import bcrypt from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { createAdminClient } from "./supabase";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    CredentialsProvider({
      name: "Admin",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const email = credentials?.email?.toLowerCase().trim();
        const password = credentials?.password ?? "";
        const configuredEmail = process.env.ADMIN_EMAIL?.toLowerCase();
        const passwordHash = process.env.ADMIN_PASSWORD_HASH;

        if (!email || !password || !configuredEmail || !passwordHash || email !== configuredEmail) {
          return null;
        }

        const validPassword = await bcrypt.compare(password, passwordHash);
        if (!validPassword) return null;

        const supabase = createAdminClient();
        const { data: user } = await supabase.from("users").select("*").eq("email", email).single();
        if (!user || user.role !== "admin") return null;

        return { id: user.id, email: user.email, name: "Rosa Akuru Admin", role: user.role };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = (user as { role?: string }).role;
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
      }
      return session;
    }
  }
};

declare module "next-auth" {
  interface Session {
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
  }
}
