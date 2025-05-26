import { NextResponse } from "next/server";

export async function POST(request) {
  const callbackData = await request.json();
  console.log('M-Pesa Callback:', callbackData);
  
  const resultCode = callbackData.Body?.stkCallback?.ResultCode;
  
  if (resultCode === 0) {
    const metadata = callbackData.Body.stkCallback.CallbackMetadata.Item;
  }
  
  return NextResponse.json({ received: true });
}