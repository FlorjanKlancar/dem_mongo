import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import {MongoDBAdapter} from "@next-auth/mongodb-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "../../../lib/mongodb";
import User from "../../../mongoose/User";
import {connectDB} from "../../../lib/mongodb";

connectDB();

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: {label: "Username", type: "text"},
        password: {label: "Password", type: "password"},
      },
      async authorize(credentials, req) {
        const {email, password}: any = credentials;
        if (!email.length || !password.length) {
          throw new Error("Please fill all fields!");
        }

        const user: any = await User.findOne({email}).select("+password");
        if (!user) {
          throw new Error("Invalid Credentials");
        }

        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect) {
          throw new Error("Invalid Credentials");
        }

        user.password = undefined;

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.JWT_SECRET,
  adapter: MongoDBAdapter(clientPromise),
  pages: {
    signIn: "/login",
    newUser: "/new-user",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({token, user, profile}: any) {
      if (user) {
        token.sub = user?._id?.toString() ?? token?.sub;
      }
      return Promise.resolve(token);
    },

    async session({session, token}: any) {
      if (token) {
        session.user.uid = token.sub;
      }
      return session;
    },
  },
});
