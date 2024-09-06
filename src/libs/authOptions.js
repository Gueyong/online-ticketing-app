// import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
// import clientPromise from '@/lib/mongodb'; // Adjust this path if needed

// const authOptions = {
//   secret: process.env.SECRET,
//   adapter: MongoDBAdapter(clientPromise),
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         username: { label: "Email", type: "text", placeholder: "test@example.com" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         const start = Date.now();
//         try {
//           const email = credentials?.username;
//           const password = credentials?.password;

//           console.log('Received email:', email);
//           console.log('Received password:', password);

//           if (!email || !password) {
//             console.error('Missing email or password');
//             throw new Error('Missing email or password');
//           }

//           await connectToDatabase(); // Ensure DB connection

//           const user = await User.findOne({ email });

//           if (!user) {
//             console.error('No user found with the given email');
//             throw new Error('No user found with the given email');
//           }

//           const passwordOk = await bcrypt.compare(password, user.password);

//           if (!passwordOk) {
//             console.error('Invalid password');
//             throw new Error('Invalid password');
//           }

//           return user;
//         } catch (error) {
//           console.error('Authorize error:', error);
//           return null;
//         } finally {
//           const duration = Date.now() - start;
//           console.log(`Authorize function duration: ${duration}ms`);
//         }
//       }
//     })
//   ],
//   session: {
//     jwt: true,
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token?.id) {
//         session.user.id = token.id;
//       }
//       return session;
//     },
//   },
//   debug: process.env.NODE_ENV === 'development',
// };

// export default authOptions;
