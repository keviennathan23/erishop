import { supabase } from "@/app/lib/db";

// =====================
// ✅ ADMIN LIST
// =====================
const admins = [
  "erishop.art@gmail.com",
  "keviennathan23@gmail.com",
];

// =====================
// ✅ GET PRODUCTS
// =====================
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*");

    if (error) {
      console.error(error);

      return Response.json(
        { message: "Gagal ambil data" },
        { status: 500 }
      );
    }

    const products = (data || []).map((row: any) => ({
      id: row.id,
      title: row.title,
      desc: row.description,
      price: row.price,
      image: row.image || "",
    }));

    return Response.json(products);

  } catch (error) {
    console.error("GET ERROR:", error);

    return Response.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}

// =====================
// ✅ POST PRODUCT
// =====================
export async function POST(req: Request) {
  try {

    // =====================
    // AUTH CHECK
    // =====================
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return Response.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const token = authHeader.replace("Bearer ", "");

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(token);

    if (userError || !user) {
      return Response.json(
        { message: "User tidak valid" },
        { status: 401 }
      );
    }

    // =====================
    // ADMIN CHECK
    // =====================
    if (!admins.includes(user.email || "")) {
      return Response.json(
        { message: "Bukan admin" },
        { status: 403 }
      );
    }

    // =====================
    // BODY
    // =====================
    const body = await req.json();

    const { title, desc, price, image } = body;

    // =====================
    // VALIDASI
    // =====================
    if (!title || !desc || !price || !image) {
      return Response.json(
        { message: "Data tidak lengkap" },
        { status: 400 }
      );
    }

    // =====================
    // INSERT
    // =====================
    const { data, error } = await supabase
      .from("products")
      .insert([
        {
          title,
          description: desc,
          price,
          image,
        },
      ])
      .select();

    if (error) {
      console.error(error);

      return Response.json(
        { message: "Gagal tambah product" },
        { status: 500 }
      );
    }

    return Response.json({
      message: "Product berhasil ditambahkan",
      data,
    });

  } catch (error) {
    console.error("POST ERROR:", error);

    return Response.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}

// =====================
// ✅ DELETE PRODUCT
// =====================
export async function DELETE(req: Request) {
  try {

    // =====================
    // AUTH CHECK
    // =====================
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return Response.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const token = authHeader.replace("Bearer ", "");

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(token);

    if (userError || !user) {
      return Response.json(
        { message: "User tidak valid" },
        { status: 401 }
      );
    }

    // =====================
    // ADMIN CHECK
    // =====================
    if (!admins.includes(user.email || "")) {
      return Response.json(
        { message: "Bukan admin" },
        { status: 403 }
      );
    }

    // =====================
    // BODY
    // =====================
    const { id } = await req.json();

    if (!id) {
      return Response.json(
        { message: "ID tidak ditemukan" },
        { status: 400 }
      );
    }

    // =====================
    // DELETE
    // =====================
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);

      return Response.json(
        { message: "Gagal hapus product" },
        { status: 500 }
      );
    }

    return Response.json({
      message: "Product berhasil dihapus",
    });

  } catch (error) {
    console.error("DELETE ERROR:", error);

    return Response.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}