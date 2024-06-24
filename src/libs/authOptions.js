import clientPromise from "@/libs/mongoConnect";
import { User } from "@/models/User";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const authOptions = {
  secret: process.env.SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      id: 'credentials',
      credentials: {
        username: { label: "Email", type: "email", placeholder: "test@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const email = credentials?.username;
          const password = credentials?.password;

          console.log('Received email:', email);
          console.log('Received password:', password);

          if (!email || !password) {
            throw new Error('Missing email or password');
          }

          // Ensure the MongoDB connection is established
          if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.MONGO_URL, {
              useNewUrlParser: true,
              useUnifiedTopology: true,
            });
          }

          const user = await User.findOne({ email });

          if (!user) {
            throw new Error('No user found with the given email');
          }

          const passwordOk = await bcrypt.compare(password, user.password);

          if (!passwordOk) {
            throw new Error('Invalid password');
          }

          return user;
        } catch (error) {
          console.error('Authorize error:', error);
          return null;
        }
      }
    })
  ],
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === 'development',
};


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }

export default authOptions;