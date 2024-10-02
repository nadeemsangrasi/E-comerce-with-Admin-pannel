import { NextResponse } from "next/server";

export const errorResponse = (
  message: string,
  success: boolean,
  status: number
) => {
  console.error(message);
  return NextResponse.json({ success, message }, { status });
};
