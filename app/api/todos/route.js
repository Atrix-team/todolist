import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Todo from "@/app/models/Todo";

// GET - fetch all todos from DB
export async function GET() {
  try {
    await connectDB();
    const todos = await Todo.find();
    return NextResponse.json(todos || []);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch todos" },
      { status: 500 }
    );
  }
}


// POST - save todo to DB
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const newTodo = await Todo.create(body);

    return NextResponse.json(newTodo);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create todo" },
      { status: 500 }
    );
  }
}

// DELETE TODO
export async function DELETE(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID is required" },
        { status: 400 }
      );
    }

    await Todo.findByIdAndDelete(id);

    return NextResponse.json({
      message: "Todo deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}