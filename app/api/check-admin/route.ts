import { NextResponse } from "next/server";
import { admins } from "@/app/lib/admin";

export async function GET() {
  // sementara contoh email user
  const userEmail = "erishop.art@gmail.com";

  const isAdmin = admins.includes(userEmail);

  return NextResponse.json({
    isAdmin,
  });
}