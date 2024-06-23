import NextAuth from "next-auth";
import authOptions from "@/libs/authOptions"; // Adjust the path as needed

const authHandler = (req, res) => NextAuth(req, res, authOptions);

export { authHandler as GET, authHandler as POST };
