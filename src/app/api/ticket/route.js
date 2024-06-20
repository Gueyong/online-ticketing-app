import { Ticket } from "@/models/Ticket";
import mongoose from "mongoose";
import { isAdmin } from '@/app/api/auth/[...nextauth]/route';

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
  return true;
}

export async function GET(){
  mongoose.connect(process.env.MONGO_URL);
  return Response.json(
    await Ticket.find()
  );
}

export async function GET_BY_ID(_id) {
  mongoose.connect(process.env.MONGO_URL);
  const ticket = await Ticket.findById(_id);
  return ticket;
}


export async function getTicketByEventOrType(req) {
  mongoose.connect(process.env.MONGO_URL);

  const url = new URL(req.url);
  const event = url.searchParams.get('event');
  const type = url.searchParams.get('type');
  const sortField = url.searchParams.get('sortField') || 'event';
  const sortOrder = url.searchParams.get('sortOrder') || 'asc';

  let query = {};
  if (event) {
    query.event = event;
  }
  if (type) {
    query.type = type;
  }

  const sortDirection = sortOrder === 'asc' ? 1 : -1;
  const tickets = await Ticket.find(query)
    .sort({ [sortField]: sortDirection })
    .lean();

  return Response.json(tickets);
}

