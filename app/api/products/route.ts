import { db } from "@/app/lib/db";

// ✅ GET
export async function GET() {
  const [rows]: any = await db.query("SELECT * FROM products");

  const products = rows.map((row: any) => ({
    ...row,
    desc: row.description,
    images: row.image ? [row.image] : [], // 🔥 convert ke array
  }));

  return Response.json(products);
}

// ✅ POST
export async function POST(req: Request) {
  const body = await req.json();

  const { title, desc, price, images } = body;

  if (!title || !price || !images) {
    return Response.json(
      { message: "Data tidak lengkap" },
      { status: 400 }
    );
  }

  await db.query(
    "INSERT INTO products (title, description, price, image) VALUES (?, ?, ?, ?)",
    [title, desc, price, images[0]] // 🔥 ambil 1 gambar saja
  );

  return Response.json({ message: "OK" });
}

// ✅ DELETE
export async function DELETE(req: Request) {
  const { id } = await req.json();

  if (!id) {
    return Response.json(
      { message: "ID tidak ditemukan" },
      { status: 400 }
    );
  }

  await db.query("DELETE FROM products WHERE id = ?", [id]);

  return Response.json({ message: "Deleted" });
}