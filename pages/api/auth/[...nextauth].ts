
import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs'
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

        if (!user) {
          throw new Error("Invalid username or password")
        }

        bcrypt.compare(credentials?.password as string, user?.password as string, function(err, result) {
          if (err) {
            console.log(err);
            throw new Error("Invalid username or password")
          } else {
            console.log(result);
          }
        });

        return {...user,
          id: user!.id.toString(),}
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
