import NextAuth from "next-auth";
import authOptions from "@/libs/authOptions";

const handler = async (req, res) => {
  return await NextAuth(req, res, authOptions);
};

export { handler as GET, handler as POST };
