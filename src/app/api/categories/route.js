import mongoose from 'mongoose';
import { Category } from '@/models/Category';
import { isAdmin } from '@/app/api/auth/[...nextauth]/route';

async function connectToDatabase() {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
}

export async function POST(req) {
  await connectToDatabase();
  const { name } = await req.json();
  
  if (await isAdmin(req)) {
    const categoryDoc = await Category.create({ name });
    return new Response(JSON.stringify(categoryDoc), { status: 200 });
  } else {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }
}

export async function PUT(req) {
  await connectToDatabase();
  const { _id, name } = await req.json();

  if (await isAdmin(req)) {
    await Category.updateOne({ _id }, { name });
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } else {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }
}

export async function GET(req) {
  await connectToDatabase();
  const categories = await Category.find();
  return new Response(JSON.stringify(categories), { status: 200 });
}

export async function DELETE(req) {
  await connectToDatabase();
  const url = new URL(req.url);
  const _id = url.searchParams.get('_id');

  if (await isAdmin(req)) {
    await Category.deleteOne({ _id });
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } else {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }
}
