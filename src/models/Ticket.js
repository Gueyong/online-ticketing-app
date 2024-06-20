import { model, models, Schema, Types } from "mongoose";

const ticketSchema = new Schema({
  category: { type: String,},  
  event: { type: String, },
  type: { type: String, enum: ['solo', 'family', 'group'], default: 'solo' },
  basePrice: { type: Number, },
  numberOfPlaces: { type: Number,},
  image: { type: String, },
  qrCode: { type: String, default: () => new Types.ObjectId().toString() },
}, { timestamps: false });


export const Ticket = models?.Ticket || model('Ticket', ticketSchema);