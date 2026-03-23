import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export const runtime = "nodejs";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, bookingId } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const safeReceipt = bookingId
      ? `bk_${String(bookingId).replace(/-/g, "").slice(0, 20)}`
      : `bk_${Date.now()}`;

    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: safeReceipt,
      notes: {
        bookingId: bookingId || "",
      },
    });

    return NextResponse.json(order);
  } catch (error: any) {
    console.error("Razorpay create-order error:", error);
    return NextResponse.json(
      { error: error?.message || error?.error?.description || "Failed to create order" },
      { status: 500 }
    );
  }
}