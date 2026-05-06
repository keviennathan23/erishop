import { db } from "@/app/lib/db";

export async function GET() {
  const [rows] = await db.query("SELECT * FROM products");
  return Response.json(rows);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { title, desc, price, image } = body;

  if (!title || !price) {
    return Response.json({ message: "Data tidak lengkap" }, { status: 400 });
  }

  await db.query(
    "INSERT INTO products (title, description, price, image) VALUES (?, ?, ?, ?)",
    [title, desc, price, image]
  );

  return Response.json({ message: "OK" });
}

export async function DELETE(req: Request) {
  const { id } = await req.json();

  if (!id) {
    return Response.json({ message: "ID tidak ditemukan" }, { status: 400 });
  }

  await db.query("DELETE FROM products WHERE id = ?", [id]);

  return Response.json({ message: "Deleted" });
}