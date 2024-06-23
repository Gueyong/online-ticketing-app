import clientPromise from "@/libs/mongoConnect";
import { UserInfo } from "@/models/UserInfo";
import { getServerSession } from "next-auth";
import authOptions from "@/libs/authOptions";

export async function isAdmin(req) {
  await clientPromise; // Ensure the database connection is established
  const session = await getServerSession(req, authOptions);
  const userEmail = session?.user?.email;
  if (!userEmail) {
    return false;
  }
  const userInfo = await UserInfo.findOne({ email: userEmail });
  if (!userInfo) {
    return false;
  }
  return userInfo.admin;
}
