import { NextResponse } from "next/server";
import { admins } from "@/app/lib/admin";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(req: Request) {
  const token = req.headers.get("Authorization");

  if (!token) {
    return NextResponse.json({ isAdmin: false });
  }

  const jwt = token.replace("Bearer ", "");

  const {
    data: { user },
  } = await supabase.auth.getUser(jwt);

  const email = user?.email || "";

  return NextResponse.json({
    isAdmin: admins.includes(email),
  });
}