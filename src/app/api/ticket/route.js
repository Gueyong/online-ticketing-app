import { Ticket } from "@/models/Ticket";
import mongoose from "mongoose";
import { isAdmin } from "@/utils/isAdmin";

export async function POST(req) {
  mongoose.connect(process.env.MONGO_URL);
  const data = await req.json();
  if (await isAdmin()) {
    const ticket = await Ticket.create(data);
    return Response.json(ticket);
  } else {
    return Response.json({});
  }
}

export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL);
  if (await isAdmin()) {
    const { _id, ...updateData } = await req.json();
    await Ticket.findByIdAndUpdate(_id, updateData);
  }
  return Response.json(true);
}

export async function DELETE(req) {
  mongoose.connect(process.env.MONGO_URL);
  const url = new URL(req.url);
  const _id = url.searchParams.get('id');
  await Ticket.findByIdAndDelete(_id);
}

export async function GET(){
  mongoose.connect(process.env.MONGO_URL);
  return Response.json(
    await Ticket.find()
  );
}
