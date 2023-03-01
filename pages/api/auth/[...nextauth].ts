
import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs'
import prisma from '../../../lib/prismadb'
import { encryptPassword } from "../../../utils/encryptPass";


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
      try {
        // signup is returned as a string
        if (req?.body?.signUp === 'true') {
          try {
            const hashedPassword = await encryptPassword(credentials?.password as string);
            const user = await prisma.user.create({
              data: {
                fullName: credentials?.username as string,
                email: credentials?.username as string,
                password: hashedPassword,
              },
            });
            return {...user, id: user?.id.toString()}
            
          } catch (error) {
            return null
          }
        }
        const user = await prisma.user.findUnique({
          where: { email: credentials?.username },
        })

        if (!user) {
          return null;
        }
  
        const authorized = await bcrypt.compare(credentials?.password as string, user?.password as string);
        return authorized ? {...user, id: user?.id.toString()} : null;
      } catch (error) {
        return null
      }
    },      
    }),
  ],
  session: {
  strategy: 'jwt',
},
  
callbacks: {
  session: async ({session, user, token}) => {
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
