import { NextResponse } from "next/server";

export const successResponse = (
  message: string,
  success: boolean,
  status: number,
  data?: unknown
) => {
  return NextResponse.json({ success, message, data }, { status });
};
