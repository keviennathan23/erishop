"use client";

import React, { useState, useEffect } from "react";
import { ShoppingCart, Trash2 } from "lucide-react";

export default function EriShopWebsite() {
  const [cart, setCart] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const whatsappNumber = "628124627770";

  const products = [
    {
      id: 1,
      title: "Kaos Art Erry 1",
      desc: "Kaos premium artwork Erry.",
      price: 185000,
      images: ["/Kaos1.png", "/Kaos1b.png"],
    },
    {
      id: 2,
      title: "Kaos Art Erry 2",
      desc: "Kaos premium artwork Erry.",
      price: 185000,
      images: ["/Kaos2.png", "/Kaos2b.png"],
    },
    {
      id: 3,
      title: "Kaos Art Erry 3",
      desc: "Kaos premium artwork Erry.",
      price: 185000,
      images: ["/Kaos3.png", "/Kaos3b.png"],
    },
    {
      id: 4,
      title: "Kaos Art Erry 4",
      desc: "Kaos premium artwork Erry.",
      price: 185000,
      images: ["/Kaos4.png", "/Kaos4b.png"],
    },
    {
      id: 5,
      title: "Kaos Art Erry 5",
      desc: "Kaos premium artwork Erry.",
      price: 185000,
      images: ["/Kaos5.png", "/Kaos5b.png"],
    },
    {
      id: 6,
      title: "Kaos Art Erry 6",
      desc: "Kaos premium artwork Erry.",
      price: 185000,
      images: ["/Kaos6.png", "/Kaos6b.png"],
    },
    // TOTEBAG
    {
      id: 7,
      title: "Totebag Artwork 1",
      desc: "Totebag eco-friendly desain Erry.",
      price: 150000,
      images: ["/Totebag1.png", "/Totebag2.png"],
    },
    {
      id: 8,
      title: "Totebag Artwork 3",
      desc: "Totebag eco-friendly desain Erry.",
      price: 150000,
      images: ["/Totebag3.png"],
    },
    {
      id: 9,
      title: "Totebag Artwork 4",
      desc: "Totebag eco-friendly desain Erry.",
      price: 150000,
      images: ["/Totebag4.png"],
    },
    {
      id: 10,
      title: "Totebag Artwork 5",
      desc: "Totebag eco-friendly desain Erry.",
      price: 150000,
      images: ["/Totebag5.png"],
    },
    {
      id: 11,
      title: "Totebag Artwork 6",
      desc: "Totebag eco-friendly desain Erry.",
      price: 150000,
      images: ["/Totebag6.png"],
    },
  ];
  const [testimonials, setTestimonials] = useState([
    { name: "Andi Pratama", comment: "Kaosnya keren banget!", rating: 5 },
    { name: "Sinta Lestari", comment: "Totebagnya bagus!", rating: 4 },
  ]);

  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);

  useEffect(() => {
    fetch("/api/testimonials")
      .then((res) => res.json())
      .then((data) => setTestimonials(data));
  }, []);

  //fungsi tambah testimoni
  const addTestimonial = async () => {
    if (!name.trim() || !comment.trim()) return;

    await fetch("/api/testimonials", {
      method: "POST",
      body: JSON.stringify({ name, comment, rating }),
    });

    setName("");
    setComment("");

    // reload data
    const res = await fetch("/api/testimonials");
    const data = await res.json();
    setTestimonials(data);
  };

  // Fungsi hapus testimoni
  const deleteTestimonial = async (index: number) => {
    const confirmDelete = confirm("Yakin hapus?");
    if (!confirmDelete) return;

    await fetch("/api/testimonials", {
      method: "DELETE",
      body: JSON.stringify({ index }),
    });

    const res = await fetch("/api/testimonials");
    const data = await res.json();
    setTestimonials(data);
  };
  const addToCart = (product: any) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCart([]);
  };

  const checkoutWhatsApp = () => {
    if (cart.length === 0) {
      alert("Keranjang masih kosong!");
      return;
    }

    const productList = cart
      .map(
        (item, i) =>
          `${i + 1}. ${item.title} - Rp ${item.price.toLocaleString("id-ID")}`,
      )
      .join("\n");

    const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

    const message = `
Halo ERISHOP 👋

Saya ingin memesan:

${productList}

Total: Rp ${totalPrice.toLocaleString("id-ID")}

Nama:
Alamat:
Metode Pembayaran:

Terima kasih 🙏
`;

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
  };

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()),
  );

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <main className="min-h-screen bg-blue-300 relative overflow-hidden">
      {/* PUZZLE BACKGROUND */}
      <img
        src="/puzzle.png"
        className="absolute top-0 left-0 w-53 opacity-60 brightness-125"
      />
      <img
        src="/puzzle.png"
        className="absolute top-0 right-0 w-53 opacity-60 brightness-125"
      />
      <img
        src="/puzzle.png"
        className="absolute bottom-0 left-0 w-53 opacity-60 brightness-125"
      />
      <img
        src="/puzzle.png"
        className="absolute bottom-0 right-0 w-53 opacity-60 brightness-125"
      />

      {/* HERO */}
      <section className="text-center py-20 px-6">
        <h2 className="text-4xl font-bold mb-6">Setiap Karya Punya Cerita</h2>
        <p className="text-black-600 max-w-2xl mx-auto">
          ERISHOP adalah platform resmi untuk menampilkan dan menjual karya
          inspiratif dari Erry.
        </p>
      </section>

      {/* PROFIL */}
      <section id="profil" className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-semibold mb-4">Profil Erry</h3>
          <p className="text-black-600 leading-relaxed">
            Erry adalah seniman berbakat yang mengekspresikan iman, imajinasi,
            dan perjalanan hidup melalui ilustrasi penuh warna dan makna.
            Karyanya membawa pesan harapan dan inspirasi.
          </p>
        </div>
      </section>

      {/* KARYA */}
      <section id="karya" className="py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl font-semibold mb-10">Karya Erry</h3>

          {/* (Optional) kalau mau slider karya */}
          <div className="flex gap-6 overflow-x-auto pb-4">
            {/* isi gambar karya kalau mau */}
          </div>

          {/* KATEGORI */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <img
              src="/lukisan1.png"
              className="w-full h-40 object-cover rounded-lg"
            />
            <img
              src="/lukisan2.png"
              className="w-full h-40 object-cover rounded-lg"
            />
            <img
              src="/lukisan3.png"
              className="w-full h-40 object-cover rounded-lg"
            />
            <img
              src="/lukisan4.png"
              className="w-full h-40 object-cover rounded-lg"
            />
            <img
              src="/lukisan5.png"
              className="w-full h-40 object-cover rounded-lg"
            />
            <img
              src="/lukisan6.png"
              className="w-full h-40 object-cover rounded-lg"
            />
            <img
              src="/lukisan7.png"
              className="w-full h-40 object-cover rounded-lg"
            />
            <img
              src="/lukisan8.png"
              className="w-full h-40 object-cover rounded-lg"
            />
            <img
              src="/lukisan9.png"
              className="w-full h-40 object-cover rounded-lg"
            />
            <img
              src="/lukisan10.png"
              className="w-full h-40 object-cover rounded-lg"
            />
            <img
              src="/lukisan11.png"
              className="w-full h-40 object-cover rounded-lg"
            />
            <img
              src="/lukisan12.png"
              className="w-full h-40 object-cover rounded-lg"
            />
            <img
              src="/lukisan13.png"
              className="w-full h-40 object-cover rounded-lg"
            />
            <img
              src="/lukisan14.png"
              className="w-full h-40 object-cover rounded-lg"
            />
            <img
              src="/lukisan15.png"
              className="w-full h-40 object-cover rounded-lg"
            />
            <img
              src="/lukisan16.png"
              className="w-full h-40 object-cover rounded-lg"
            />
            <img
              src="/lukisan17.png"
              className="w-full h-40 object-cover rounded-lg"
            />
            <img
              src="/lukisan18.png"
              className="w-full h-40 object-cover rounded-lg"
            />
            <img
              src="/lukisan19.png"
              className="w-full h-40 object-cover rounded-lg"
            />
          </div>

          <h4 className="font-semibold mb-2">Ilustrasi Original</h4>
          <p className="text-sm text-gray-600">
            Gambar karakter unik dengan warna ekspresif dan penuh makna.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h4 className="font-semibold mb-2">Merchandise Artwork</h4>
          <p className="text-sm text-gray-600">
            Kaos, totebag, tumbler, dan notebook desain eksklusif.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h4 className="font-semibold mb-2">Custom Design</h4>
          <p className="text-sm text-gray-600">
            Pesanan desain khusus untuk event atau komunitas.
          </p>
        </div>
      </section>

      {/* PRODUK */}
      <section id="produk" className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-semibold text-center mb-8">
            Produk Erry
          </h3>

          <input
            type="text"
            placeholder="Cari produk..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md mx-auto block mb-10 p-3 border rounded-xl"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-blue-50 p-6 rounded-2xl shadow"
              >
                <div className="flex gap-2 mb-4">
                  {product.images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      className="w-1/2 h-40 object-cover rounded-xl"
                    />
                  ))}
                </div>
                <h4 className="font-semibold mb-2">{product.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{product.desc}</p>
                <p className="font-bold mb-4">
                  Rp {product.price.toLocaleString("id-ID")}
                </p>
               
                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-blue-500 text-white py-2 rounded-xl"
                >
                  Tambah ke Keranjang
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CART */}
      {cart.length > 0 && (
        <section className="bg-blue-100 py-10 px-6">
          <div className="max-w-4xl mx-auto">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <ShoppingCart size={20} />
              Keranjang ({cart.length})
            </h3>

            {cart.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center mb-3 bg-white p-3 rounded-xl"
              >
                <span>
                  {item.title} - Rp {item.price.toLocaleString("id-ID")}
                </span>
                <button onClick={() => removeFromCart(index)}>
                  <Trash2 size={18} className="text-red-500" />
                </button>
              </div>
            ))}

            <p className="font-bold mt-4">
              Total: Rp {total.toLocaleString("id-ID")}
            </p>

            <div className="flex gap-4 mt-4">
              <button
                onClick={checkoutWhatsApp}
                className="bg-green-500 text-white px-6 py-2 rounded-xl"
              >
                Checkout WhatsApp
              </button>
              <button
                onClick={clearCart}
                className="bg-gray-400 text-white px-6 py-2 rounded-xl"
              >
                Kosongkan
              </button>
            </div>
          </div>
        </section>
      )}

      {/* MARKETING */}
      <section id="marketing" className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-semibold mb-6">
            Strategi Jual & Promo Online
          </h3>
          <ul className="text-black-600 space-y-3 text-left">
            <li>• Posting rutin di Instagram & TikTok</li>
            <li>• storytelling tentang perjalanan Erry</li>
            <li>• Buat limited edition</li>
            <li>• Kolaborasi komunitas</li>
            <li>• Giveaway & promo launching</li>
          </ul>
        </div>
      </section>
      {/* TESTIMONI */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-10">
          Testimoni Pembeli
        </h2>

        {/* FORM */}
        <div className="max-w-md mx-auto mb-10 space-y-3">
          <input
            type="text"
            placeholder="Nama kamu"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-lg p-2"
          />
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full border rounded-lg p-2"
          >
            <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
            <option value={4}>⭐⭐⭐⭐ (4)</option>
            <option value={3}>⭐⭐⭐ (3)</option>
            <option value={2}>⭐⭐ (2)</option>
            <option value={1}>⭐ (1)</option>
          </select>

          <textarea
            placeholder="Tulis testimoni..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border rounded-lg p-2"
          />

          <button
            onClick={addTestimonial}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg w-full"
          >
            Kirim Testimoni
          </button>
        </div>

        {/* LIST TESTIMONI */}
        <div className="flex gap-6 overflow-x-auto pb-4">
          {testimonials.map((item, i) => (
            <div
              key={i}
              className="min-w-[250px] bg-white shadow-lg rounded-xl p-6 text-center relative flex-shrink-0"
            >
              {/* ⭐ BINTANG */}
              <div className="mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`text-lg ${
                      star <= (item.rating || 5)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>

              <p className="text-gray-600 italic mb-4">"{item.comment}"</p>

              <h4 className="font-semibold text-gray-800">{item.name}</h4>

              <button
                onClick={() => deleteTestimonial(i)}
                className="absolute top-2 right-2 text-red-500 font-bold"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-300 mt-16">
        <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <img
                src="/Logo.png"
                alt="ERISHOP Logo"
                className="w-10 h-10 object-contain"
              />
              <h2 className="text-xl font-bold text-blue-500">ERISHOP</h2>
            </div>

            <p className="text-sm">
              ERISHOP adalah platform resmi untuk menampilkan dan menjual karya
              artwork dari Erry. Setiap produk dibuat dengan konsep seni yang
              unik dan eksklusif.
            </p>
          </div>

          {/* Menu */}
          <div>
            <h3 className="font-semibold text-white mb-3">Menu</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#profil" className="hover:text-orange-400">
                  Profil
                </a>
              </li>
              <li>
                <a href="#karya" className="hover:text-orange-400">
                  Karya
                </a>
              </li>
              <li>
                <a href="#produk" className="hover:text-orange-400">
                  Produk
                </a>
              </li>
              <li>
                <a href="#marketing" className="hover:text-orange-400">
                  Marketing
                </a>
              </li>
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h3 className="font-semibold text-white mb-3">Kontak</h3>
            <p className="text-sm">WhatsApp: +62 812-4627-7770</p>
            <p className="text-sm">Email: erishop.art@gmail.com</p>
            <p className="text-sm">Instagram: @erishop.art</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 text-center py-4 text-sm">
          © {new Date().getFullYear()} ERISHOP — Artwork by Erry
        </div>
      </footer>
    </main>
  );
}
