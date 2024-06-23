import authOptions from "@/libs/authOptions";
import {Reservation} from "@/models/Reservation";
import mongoose from "mongoose";
import {getServerSession} from "next-auth";
import { isAdmin } from "@/utils/isAdmin";

export async function GET(req) {
  mongoose.connect(process.env.MONGO_URL);

  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  const admin = await isAdmin();

  const url = new URL(req.url);
  const _id = url.searchParams.get('_id');
  if (_id) {
    return Response.json( await Reservation.findById(_id) );
  }

  if (admin) {
    return Response.json( await Reservation.find() );
  }

  if (userEmail) {
    return Response.json( await Reservation.find({userEmail}) );
  }

}