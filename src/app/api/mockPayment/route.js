import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Ticket } from "@/models/Ticket";
import { Reservation } from "@/models/Reservation";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export async function POST(req) {
  await mongoose.connect(process.env.MONGO_URL);

  const { cartProducts, address } = await req.json();
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  const orderDoc = await Reservation.create({
    userEmail,
    ...address,
    cartProducts,
    paid: false,
  });

  // Calculate total price
  let totalPrice = 0;
  for (const cartProduct of cartProducts) {
    const productInfo = await Ticket.findById(cartProduct._id);

    let productPrice = productInfo.basePrice;
    if (cartProduct.size) {
      const size = productInfo.sizes
        .find(size => size._id.toString() === cartProduct.size._id.toString());
      productPrice += size.price;
    }
    if (cartProduct.extras?.length > 0) {
      for (const cartProductExtraThing of cartProduct.extras) {
        const productExtras = productInfo.extraIngredientPrices;
        const extraThingInfo = productExtras
          .find(extra => extra._id.toString() === cartProductExtraThing._id.toString());
        productPrice += extraThingInfo.price;
      }
    }

    totalPrice += productPrice;
  }

  // Mock payment logic: assume payment is successful
  orderDoc.paid = true;
  await orderDoc.save();

  return Response.json({ success: true, orderId: orderDoc._id });
}
