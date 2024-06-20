import { Ticket } from "@/models/Ticket";
import mongoose from "mongoose";
import {isAdmin} from "@/app/api/auth/[...nextauth]/route";



export async function POST(req) {
    mongoose.connect(process.env.MONGO_URL);
    const data = await req.json();
    if (await isAdmin()) {
      const menuItemDoc = await Ticket.create(data);
      return Response.json(menuItemDoc);
    } else {
      return Response.json({});
    }
  }
  
  export async function PUT(req) {
    mongoose.connect(process.env.MONGO_URL);
    if (await isAdmin()) {
      const {_id, ...data} = await req.json();
      await Ticket.findByIdAndUpdate(_id, data);
    }
    return Response.json(true);
  }
  
  export async function GET() {
    mongoose.connect(process.env.MONGO_URL);
    return Response.json(
      await Ticket.find()
    );
  }

  export async function DELETE(req) {
    mongoose.connect(process.env.MONGO_URL);
    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');
    if (await isAdmin()) {
      await Ticket.deleteOne({_id});
    }
    return Response.json(true);
  }


export async function getAllTicketBySearch(req) {
  mongoose.connect(process.env.MONGO_URL);

  const { type, basePrice, numberOfPlaces, key, qrCode, category, event } = req.query;
  let tickets = await Ticket.find({});

  if (type) {
    tickets = tickets.filter(ticket => ticket.type.toLowerCase() === type.toLowerCase());
  }

  if (basePrice) {
    tickets = tickets.filter(ticket => ticket.basePrice === parseFloat(basePrice));
  }

  if (numberOfPlaces) {
    tickets = tickets.filter(ticket => ticket.numberOfPlaces === parseInt(numberOfPlaces));
  }

  if (key) {
    tickets = tickets.filter(ticket => ticket.key.toLowerCase().includes(key.toLowerCase()));
  }

  if (qrCode) {
    tickets = tickets.filter(ticket => ticket.qrCode.toLowerCase().includes(qrCode.toLowerCase()));
  }

  if (category) {
    tickets = tickets.filter(ticket => ticket.category.toString() === category);
  }

  if (event) {
    tickets = tickets.filter(ticket => ticket.event.toString() === event);
  }

  tickets = await tickets.populate('category').populate('event');
  return Response.json(tickets);
  }