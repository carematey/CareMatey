
import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import prisma from '../../../lib/prismadb'
export const authOptions: NextAuthOptions = {
  // Include user.id on session
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "email", type: "text", placeholder: "user@domain" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {

        const user = await prisma.user.findUnique({
          where: { email: credentials?.username },
        })
        console.log("🚀 ~ file: [...nextauth].ts:24 ~ authorize ~ user:", user)
        if (!user || credentials?.password !== user.password) {
          throw new Error("Invalid username or password")
        }
        return {...user,
          id: user.id.toString(),}
        // issue a token or session cookie here
      },      
    }),
  ],
  session: {
  strategy: 'jwt',
},
  
callbacks: {
  session: async ({session, user, token}) => {
    console.log("🚀 ~ file: [...nextauth].ts:40 ~ session: ~ session:", session, token,user)
    session.user!.id = token.sub
    return Promise.resolve(session)
  },
},
    /**
     * ...add more providers here
     *
     * Most other providers require a bit more work than the Discord provider.
     * For example, the GitHub provider requires you to add the
     * `refresh_token_expires_in` field to the Account model. Refer to the
     * NextAuth.js docs for the provider you want to use. Example:
     * @see https://next-auth.js.org/providers/github
     */

};

export default NextAuth(authOptions);
