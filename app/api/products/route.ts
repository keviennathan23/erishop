import { db } from "@/app/lib/db";

// =====================
// ✅ GET PRODUCTS
// =====================
export async function GET() {
  try {
    const [rows]: any = await db.query("SELECT * FROM products");

    const products = rows.map((row: any) => ({
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
      { message: "Gagal ambil data" },
      { status: 500 }
    );
  }
}

// =====================
// ✅ POST PRODUCT
// =====================
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { title, desc, price, image } = body;

    if (!title || !desc || !price || !image) {
      return Response.json(
        { message: "Data tidak lengkap" },
        { status: 400 }
      );
    }

    await db.query(
      "INSERT INTO products (title, description, price, image) VALUES (?, ?, ?, ?)",
      [title, desc, price, image]
    );

    return Response.json({
      message: "Product berhasil ditambahkan",
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
    const { id } = await req.json();

    if (!id) {
      return Response.json(
        { message: "ID tidak ditemukan" },
        { status: 400 }
      );
    }

    await db.query(
      "DELETE FROM products WHERE id = ?",
      [id]
    );

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