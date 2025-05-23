import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        
        // In a real app, you would check against the database
        // This is a simple example for demonstration purposes
        const isValidEmail = credentials.email === process.env.ADMIN_EMAIL;
        const isValidPassword = await bcrypt.compare(
          credentials.password,
          process.env.ADMIN_PASSWORD_HASH || ''
        );
        
        if (isValidEmail && isValidPassword) {
          return {
            id: '1',
            name: 'Admin',
            email: credentials.email,
          };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: '/admin/login',
  },
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async session({ session, token }) {
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
