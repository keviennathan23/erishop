let testimonials = [
  { name: "Andi Pratama", comment: "Kaosnya keren banget!", rating: 5 },
  { name: "Sinta Lestari", comment: "Totebagnya bagus dan bahannya tebal.", rating: 4 },
];

export async function GET() {
  return Response.json(testimonials);
}

export async function POST(req: Request) {
  const body = await req.json();

  const newTestimonial = {
    name: body.name,
    comment: body.comment,
    rating: body.rating || 5, // default 5 kalau kosong
  };

  testimonials.push(newTestimonial);

  return Response.json({ success: true });
}

export async function DELETE(req: Request) {
  const { index } = await req.json();

  testimonials.splice(index, 1);

  return Response.json({ success: true });
}