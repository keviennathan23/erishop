import { NextResponse } from "next/server";
import { admins } from "@/app/lib/admin";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(req: Request) {
  try {
    const token = req.headers.get("Authorization");

    if (!token) {
      return NextResponse.json({ isAdmin: false });
    }

    const jwt = token.replace("Bearer ", "");

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(jwt);

    if (error || !user) {
      console.log("USER ERROR:", error);
      return NextResponse.json({ isAdmin: false });
    }

    const email = (user.email || "").toLowerCase();

    console.log("LOGIN EMAIL:", email);

    return NextResponse.json({
      isAdmin: admins.includes(email),
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json({
      isAdmin: false,
    });
  }
}