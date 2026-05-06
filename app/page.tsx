"use client";

import React, { useState, useEffect } from "react";
import { ShoppingCart, Trash2 } from "lucide-react";

export default function EriShopWebsite() {
  const [cart, setCart] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [qty, setQty] = useState(1);
  const [showNotif, setShowNotif] = useState(false);
  const [showCart, setShowCart] = useState(false);

  // ✅ FIX DI SINI
  const [newTitle, setNewTitle] = useState<string>("");
  const [newPrice, setNewPrice] = useState<string>("");
  const [newImage, setNewImage] = useState<string>("");
  const [newDesc, setNewDesc] = useState<string>("");
  // ✅ HANDLE UPLOAD GAMBAR
  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setNewImage(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  // ✅ TAMBAH PRODUK
  const deleteProduct = async (id: number) => {
    const confirmDelete = confirm("Yakin mau hapus?");
    if (!confirmDelete) return;

    await fetch("/api/products", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  };
  const [loading, setLoading] = useState(false);

  const addProduct = async () => {
    if (!newTitle || !newPrice || !newImage) {
      alert("Lengkapi semua data!");
      return;
    }

    setLoading(true);

    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: newTitle,
        desc: newDesc,
        price: Number(newPrice),
        images: [newImage],
      }),
    });

    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);

    setNewTitle("");
    setNewPrice("");
    setNewImage("");
    setNewDesc("");
    setLoading(false);
  };
  const images = [
    "/lukisan1.png",
    "/lukisan2.png",
    "/lukisan3.png",
    "/lukisan4.png",
    "/lukisan5.png",
    "/lukisan6.png",
    "/lukisan7.png",
    "/lukisan8.png",
    "/lukisan9.png",
    "/lukisan10.png",
    "/lukisan11.png",
    "/lukisan12.png",
    "/lukisan13.png",
    "/lukisan14.png",
    "/lukisan15.png",
    "/lukisan16.png",
    "/lukisan17.png",
    "/lukisan18.png",
    "/lukisan19.png",
  ];
  const customImages = [
    "/custom design1.png",
    "/custom design2.png",
    "/custom design3.png",
    "/custom design4.png",
    "/custom design5.png",
    "/custom design6.png",
    "/custom design7.png",
    "/custom design8.png",
    "/custom design9.png",
    "/custom design10.png",
  ];

  const whatsappNumber = "628124627770";

  const defaultProducts = [
    {
      id: 1,
      title: "T-shirt Love God",
      desc: "Premium T-shirt with exclusive artwork by Erry.",
      price: 185000,
      images: ["/love_god.png"],
    },
    {
      id: 2,
      title: "T-shirt He Is Reason",
      desc: "Premium T-shirt with exclusive artwork by Erry.",
      price: 185000,
      images: ["/he_is_reason.png"],
    },
    {
      id: 3,
      title: "T-shirt I Am Happy",
      desc: "Premium T-shirt with exclusive artwork by Erry.",
      price: 185000,
      images: ["/iam_happy.png"],
    },
    {
      id: 4,
      title: "T-shirt Creation Day",
      desc: "Premium T-shirt with exclusive artwork by Erry.",
      price: 185000,
      images: ["/creation_day.png"],
    },
    {
      id: 5,
      title: "T-shirt Save The Earth",
      desc: "Premium T-shirt with exclusive artwork by Erry.",
      price: 185000,
      images: ["/save_the_earth.png"],
    },

    // TOTEBAG (RENAME SESUAI REQUEST)
    {
      id: 7,
      title: "Sling Bag Japanese Girl",
      desc: "Eco-friendly sling bag with original artwork by Erry.",
      price: 250000,
      images: ["/SlingBag2.png"],
    },
    {
      id: 8,
      title: "Sling Bag Sweet Couple",
      desc: "Eco-friendly sling bag with original artwork by Erry.",
      price: 250000,
      images: ["/SlingBag1.png"],
    },
    {
      id: 9,
      title: "Totebag Cute",
      desc: "Eco-friendly totebag with original artwork by Erry.",
      price: 50000,
      images: ["/Totebag4.png"],
    },
    {
      id: 10,
      title: "Totebag Do It",
      desc: "Eco-friendly totebag with original artwork by Erry.",
      price: 50000,
      images: ["/Totebag5.png"],
    },
    {
      id: 11,
      title: "Totebag Never Stop Trying",
      desc: "Eco-friendly totebag with original artwork by Erry.",
      price: 50000,
      images: ["/Totebag6.png"],
    },
    {
      id: 12,
      title: "Hoodie Enjoy Every",
      desc: "Eco-friendly hoodie with original artwork by Erry.",
      price: 250000,
      images: ["/Hoodie Enjoy Every.png"],
    },
  ];
  const [testimonials, setTestimonials] = useState([
    { name: "Andi Pratama", comment: "Kaosnya keren banget!", rating: 5 },
    { name: "Sinta Lestari", comment: "Totebagnya bagus!", rating: 4 },
  ]);

  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
  fetch("/api/products")
    .then((res) => {
      if (!res.ok) throw new Error("API ERROR");
      return res.json();
    })
    .then((data) => {
      const fixed = (data || []).map((p: any) => ({
        ...p,
        images: Array.isArray(p.images)
          ? p.images
          : p.image
          ? [p.image]
          : [],
      }));

      const merged = [...defaultProducts];

      fixed.forEach((item: any) => {
        const exists = merged.find((p) => p.id === item.id);
        if (!exists) merged.push(item);
      });

      setProducts(merged);
    })
    .catch((err) => {
      console.error("Error ambil produk:", err);
      setProducts(defaultProducts);
    });
}, []);
  useEffect(() => {
    fetch("/api/testimonials")
      .then((res) => res.json())
      .then((data) => setTestimonials(data));
  }, []);
  // slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

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
  const addToCart = (product: any, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + quantity } : item,
        );
      } else {
        return [...prev, { ...product, qty: quantity }];
      }
    });

    setShowNotif(true);
    setTimeout(() => setShowNotif(false), 2000);
  };

  // 📍 TARUH DI SINI (TEPAT DI BAWAH addToCart)
  const increaseQty = (id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item,
      ),
    );
  };

  const decreaseQty = (id: number) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty - 1 } : item))
        .filter((item) => item.qty > 0),
    );
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
          `${i + 1}. ${item.title} x${item.qty}
Rp ${(item.price * item.qty).toLocaleString("id-ID")}`,
      )
      .join("\n\n");

    const totalPrice = cart.reduce(
      (acc, item) => acc + item.price * item.qty,
      0,
    );

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

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <main className="min-h-screen bg-blue-300 relative overflow-x-hidden">
      {/* PUZZLE BACKGROUND */}
      <img
        src="/puzzle.png"
        className="hidden md:block absolute top-0 left-0 w-40 opacity-30 pointer-events-none"
      />
      <img
        src="/puzzle.png"
        className="hidden md:block absolute top-0 right-0 w-40 opacity-30 pointer-events-none"
      />
      <img
        src="/puzzle.png"
        className="hidden md:block absolute bottom-0 left-0 w-40 opacity-30 pointer-events-none"
      />
      <img
        src="/puzzle.png"
        className="hidden md:block absolute bottom-0 right-0 w-40 opacity-30 pointer-events-none"
      />
      <section id="home" className="py-20 px-6 text-center">
        <h2 className="text-4xl font-bold mb-6">Every Creation Has a Story</h2>

        <p className="text-black-700 max-w-2xl mx-auto leading-relaxed mb-10">
          Discover meaningful fashion at ERISHOP — where art meets purpose.
          Designed by Erry, each product transforms original artwork into
          stylish, wearable pieces for everyday use.
        </p>

        {/* FOTO PROFIL */}
        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          <img
            src="/ProfilErry.png"
            className="w-52 h-52 object-cover rounded-full shadow-lg"
          />
          <img
            src="/ProfilErry1.png"
            className="w-52 h-52 object-cover rounded-full shadow-lg"
          />
        </div>

        {/* VALUE */}
        <div className="max-w-xl mx-auto text-left mb-8">
          <h4 className="font-semibold mb-3 text-lg text-center">
            Why Erry’s Creations Are Special
          </h4>

          <ul className="space-y-2 text-sm">
            <li>🎨 Original hand-drawn designs</li>
            <li>💛 Created with authenticity</li>
            <li>👕 Available on T-shirts, tote bags, and more</li>
            <li>🌟 Supporting creativity and independence</li>
          </ul>
        </div>

        {/* TAGLINE */}
        <p className="font-semibold text-lg">
          Wear something different. <br />
          Wear something meaningful. <br />
          Wear Erry’s world.
        </p>
      </section>

      {/* KARYA */}
      <section id="karya" className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          {/* TITLE */}
          <h3 className="text-3xl font-bold mb-4">Original Illustration</h3>

          <p className="text-gray-700 max-w-xl mx-auto mb-12">
            Step into a world of imagination through unique character
            illustrations. Each piece is rich in color, emotion, and
            meaning—telling stories beyond words.
          </p>

          {/* SLIDER */}
          <div className="flex justify-center items-center mb-12">
            <div className="relative w-full max-w-[320px] h-64 rounded-2xl overflow-hidden shadow-xl group">
              {/* IMAGE */}
              <img
                src={images[currentIndex]}
                onClick={() => setSelectedImage(images[currentIndex])}
                onError={(e) => {
                  e.currentTarget.src = "/error.png";
                }}
                className="w-full h-full object-cover cursor-pointer"
              />

              {/* BUTTON KIRI */}
              <button
                onClick={() =>
                  setCurrentIndex((prev) =>
                    prev === 0 ? images.length - 1 : prev - 1,
                  )
                }
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 text-white px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition"
              >
                ‹
              </button>

              {/* BUTTON KANAN */}
              <button
                onClick={() =>
                  setCurrentIndex((prev) =>
                    prev === images.length - 1 ? 0 : prev + 1,
                  )
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 text-white px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition"
              >
                ›
              </button>

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-4 text-white opacity-0 group-hover:opacity-100 transition pointer-events-none">
                <h4 className="text-lg font-bold">View Artwork</h4>
                <p className="text-sm">Click to explore 🔍</p>
              </div>
            </div>
          </div>
          <section className="py-16 px-6 text-center">
            <h3 className="text-2xl font-bold mb-4">Watch Erry’s Story</h3>

            <p className="text-gray-600 text-sm max-w-md mx-auto mb-6">
              This video features a collection of Erry’s artworks showcased
              through various promotional campaigns—bringing each creation to
              life with purpose and meaning.
            </p>

            <div className="max-w-xs mx-auto">
              <video
                src="/video.mp4"
                controls
                className="w-full max-w-xs mx-auto rounded-2xl shadow-md aspect-[9/16] object-cover"
              ></video>
            </div>
          </section>
          {/* BOX BAWAH */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* MERCH */}
            <div className="bg-white p-8 rounded-2xl shadow border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition text-center">
              <h4 className="font-semibold mb-3 text-lg">
                🎨 Merchandise Artwork
              </h4>

              <p className="text-sm text-gray-600 leading-relaxed">
                Exclusive designs available on T-shirts, tote bags, tumblers,
                and notebooks — turning art into stylish everyday essentials.
              </p>
            </div>

            {/* CUSTOM */}
            <div className="bg-white p-8 rounded-2xl shadow border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition text-center">
              <h4 className="font-semibold mb-3 text-lg">✨ Custom Design</h4>

              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                Personalized design services for events, communities, and
                special occasions — crafted to match your unique identity.
              </p>

              <div className="flex justify-center items-center">
                <div className="relative w-full max-w-[300px] h-56 rounded-2xl overflow-hidden shadow-lg group">
                  {/* IMAGE */}

                  <img
                    src={customImages[currentIndex % customImages.length]}
                    onClick={() =>
                      setSelectedImage(
                        customImages[currentIndex % customImages.length],
                      )
                    }
                    className="w-full h-full object-cover cursor-pointer"
                  />

                  {/* BUTTON KIRI */}
                  <button
                    onClick={() =>
                      setCurrentIndex((prev) =>
                        prev === 0 ? customImages.length - 1 : prev - 1,
                      )
                    }
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                  >
                    ‹
                  </button>

                  {/* BUTTON KANAN */}
                  <button
                    onClick={() =>
                      setCurrentIndex((prev) =>
                        prev === customImages.length - 1 ? 0 : prev + 1,
                      )
                    }
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                  >
                    ›
                  </button>

                  {/* OVERLAY */}
                  <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-4 text-white opacity-0 group-hover:opacity-100 transition pointer-events-none">
                    <h4 className="text-lg font-bold">Custom Design</h4>
                    <p className="text-sm">Click to explore 🔍</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUK */}
      <section id="produk" className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-md mx-auto mb-10 bg-white p-6 rounded-2xl shadow-lg space-y-4">
            <h4 className="font-bold text-xl text-center">Upload Produk</h4>

            {/* INPUT NAMA */}
            <input
              type="text"
              placeholder="Nama Produk"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <textarea
              placeholder="Deskripsi Produk"
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-xl 
  focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {/* INPUT HARGA */}
            <input
              type="number"
              placeholder="Harga"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {/* UPLOAD FILE */}
            <label className="block">
              <span className="text-sm text-gray-600">Upload Gambar</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full mt-2 text-sm file:mr-4 file:py-2 file:px-4 
                 file:rounded-xl file:border-0 
                 file:bg-blue-500 file:text-white 
                 hover:file:bg-blue-600 cursor-pointer"
              />
            </label>

            {/* PREVIEW */}
            {newImage && (
              <img
                src={newImage}
                className="w-full h-40 object-cover rounded-xl border"
              />
            )}

            {/* BUTTON */}
            <button
              onClick={addProduct}
              disabled={loading}
              className="w-full bg-green-500 text-white py-3 rounded-xl font-semibold 
  hover:bg-green-600 transition transform hover:scale-[1.02]"
            >
              {loading ? "Uploading..." : "+ Tambah Produk"}
            </button>
          </div>
        </div>
        <h3 className="text-2xl font-semibold text-center mb-8">
          Merchandise Artwork
        </h3>

        <div className="relative w-full max-w-md mx-auto mb-10">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            🔍
          </span>

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-blue-50 p-6 rounded-2xl shadow relative"
            >
              {/* DELETE BUTTON */}
              <button
                onClick={() => deleteProduct(product.id)}
                className="absolute top-2 right-2 text-red-500 font-bold"
              >
                ✕
              </button>

              {/* GAMBAR */}
              <div
                className={`mb-4 ${
                  (product.images?.length || 0) === 1
                    ? ""
                    : "grid grid-cols-2 gap-2"
                }`}
              >
                {(product.images || []).map((img: string, index: number) => (
                  <img
                    key={index}
                    src={img}
                    className={`rounded-xl object-cover ${
                      (product.images?.length || 0) === 1
                        ? "w-full h-56"
                        : "w-full h-40"
                    }`}
                  />
                ))}
              </div>

              {/* INFO */}
              <h4 className="font-semibold mb-2">{product.title}</h4>
              <p className="text-sm text-gray-600 mb-2">{product.desc}</p>

              <p className="font-bold mb-4">
                Rp {product.price.toLocaleString("id-ID")}
              </p>

              {/* BUTTON */}
              <button
                onClick={() => {
                  setSelectedProduct(product);
                  setQty(1);
                }}
                className="w-full bg-blue-500 text-white py-2 rounded-xl"
              >
                Tambah ke Keranjang
              </button>
            </div>
          ))}
        </div>
      </section>
      {/* POPUP CART */}
      {showCart && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md max-h-[85vh] rounded-2xl p-6 relative shadow-xl animate-fadeIn flex flex-col">
            {/* CLOSE */}
            <button
              onClick={() => setShowCart(false)}
              className="absolute top-3 right-3 text-xl"
            >
              ✕
            </button>

            {/* TITLE */}
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <ShoppingCart size={20} />
              Cart ({cart.reduce((acc, item) => acc + item.qty, 0)})
            </h3>

            {/* LIST */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-2 min-h-0">
              {cart.length === 0 ? (
                <p className="text-gray-500 text-sm text-center">
                  Cart is empty 😢
                </p>
              ) : (
                cart.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-gray-100 p-3 rounded-lg"
                  >
                    <span className="text-sm">{item.title}</span>

                    <button onClick={() => removeFromCart(index)}>
                      <Trash2 size={16} className="text-red-500" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* TOTAL */}
            <p className="font-bold mt-4">
              Total: Rp {total.toLocaleString("id-ID")}
            </p>

            {/* BUTTON */}
            <div className="flex gap-3 mt-4">
              <button
                onClick={checkoutWhatsApp}
                className="flex-1 bg-green-500 text-white py-2 rounded-xl"
              >
                Checkout
              </button>

              <button
                onClick={clearCart}
                className="flex-1 bg-gray-400 text-white py-2 rounded-xl"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MARKETING */}
      <section id="marketing" className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-semibold mb-6">
            Our Story, Our Movement
          </h3>
          <ul className="text-black-600 space-y-3 text-left">
            This is more than a brand—it’s a journey.
            <li>• Sharing authentic stories through art </li>
            <li>• Building connection through creativity </li>
            <li>• Releasing limited editions to keep every piece special </li>
            <li>• Collaborating with communities that believe in inclusion </li>
            <li>• Celebrating every milestone with you </li>
          </ul>
        </div>
      </section>
      {/* TESTIMONI */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h3 className="text-3xl font-bold text-center mb-4">
          What People Are Saying
        </h3>

        <p className="text-center text-gray-600 max-w-xl mx-auto mb-10">
          Every purchase has a story. Every customer is part of the journey.
          Share your experience and inspire others 💛
        </p>

        {/* FORM */}
        <div className="max-w-md mx-auto mb-10 space-y-4">
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value={5}>⭐⭐⭐⭐⭐ 5</option>
            <option value={4}>⭐⭐⭐⭐ 4</option>
            <option value={3}>⭐⭐⭐ 3</option>
            <option value={2}>⭐⭐ 2</option>
            <option value={1}>⭐ 1</option>
          </select>

          <textarea
            placeholder="Share your thoughts..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            onClick={addTestimonial}
            className="bg-orange-500 text-white px-4 py-3 rounded-xl w-full hover:bg-orange-600 transition"
          >
            Submit Review
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

      <footer className="bg-gray-900 text-gray-300 mt-20">
        <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/Logo.png"
                alt="ERISHOP Logo"
                className="w-10 h-10 object-contain"
              />
              <h2 className="text-xl font-bold text-blue-500">ERISHOP</h2>
            </div>

            <p className="text-sm leading-relaxed text-gray-400">
              ERISHOP is the official platform showcasing and selling original
              artwork by Erry. Each product is crafted with unique artistic
              concepts and meaningful design.
            </p>
          </div>

          {/* Menu */}
          <div>
            <h3 className="font-semibold text-white mb-4">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#home" className="hover:text-orange-400 transition">
                  Home
                </a>
              </li>
              <li>
                <a href="#karya" className="hover:text-orange-400 transition">
                  Artwork
                </a>
              </li>
              <li>
                <a href="#produk" className="hover:text-orange-400 transition">
                  Products
                </a>
              </li>
              <li>
                <a
                  href="#marketing"
                  className="hover:text-orange-400 transition"
                >
                  Our Story
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contact</h3>

            <div className="flex flex-col gap-4 text-sm">
              <a
                href="https://wa.me/628124627770"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-orange-400 transition"
              >
                <img src="/whatsapp.png" className="w-6 h-6" />
                <span>0812-4627-770</span>
              </a>

              <a
                href="mailto:erishop.art@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-orange-400 transition"
              >
                <img src="/gmail.png" className="w-6 h-6" />
                <span>erishop.art@gmail.com</span>
              </a>

              <a
                href="https://www.instagram.com/erishop.art/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-orange-400 transition"
              >
                <img src="/instagram.png" className="w-6 h-6" />
                <span>erishop.art</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-500">
          © {new Date().getFullYear()} ERISHOP — Designed with 💛 by Erry
        </div>
      </footer>
      {/* BUTTON CART FLOATING */}
      <button
        onClick={() => setShowCart(true)}
        className="fixed bottom-5 right-5 bg-blue-500 text-white p-4 rounded-full shadow-lg z-50 hover:scale-110 transition"
      >
        <ShoppingCart />
      </button>
      {/* POPUP GAMBAR */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            className="max-w-[90%] max-h-[90%] rounded-xl shadow-2xl"
          />
        </div>
      )}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md relative">
            {/* CLOSE */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-3 right-3 text-xl"
            >
              ✕
            </button>

            {/* IMAGE */}
            <img
              src={selectedProduct.images[0]}
              className="w-full max-h-[300px] object-contain rounded-xl mb-4 bg-gray-100"
            />

            {/* INFO */}
            <h3 className="text-xl font-bold mb-2">{selectedProduct.title}</h3>
            <p className="text-gray-600 mb-2">{selectedProduct.desc}</p>
            <p className="font-bold mb-4">
              Rp {selectedProduct.price.toLocaleString("id-ID")}
            </p>

            {/* QTY */}
            <div className="flex items-center gap-3 mb-4">
              <button
                onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
                className="px-3 py-1 bg-gray-200 rounded"
              >
                -
              </button>

              <span>{qty}</span>

              <button
                onClick={() => setQty(qty + 1)}
                className="px-3 py-1 bg-gray-200 rounded"
              >
                +
              </button>
            </div>

            {/* BUTTON */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  addToCart(selectedProduct, qty);
                  setSelectedProduct(null);
                }}
                className="flex-1 bg-blue-500 text-white py-2 rounded-xl"
              >
                + Keranjang
              </button>

              <button
                onClick={() => {
                  const message = `
Halo ERISHOP 👋

Saya ingin memesan:
${selectedProduct.title}
Jumlah: ${qty}

Total: Rp ${(selectedProduct.price * qty).toLocaleString("id-ID")}

Nama:
Alamat:
Metode Pembayaran:
            `;

                  window.open(
                    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
                    "_blank",
                  );
                }}
                className="flex-1 bg-green-500 text-white py-2 rounded-xl"
              >
                ⚡ Order
              </button>
            </div>
          </div>
        </div>
      )}
      {/* NOTIFIKASI */}
      {showNotif && (
        <div className="fixed bottom-5 right-5 bg-black text-white px-4 py-2 rounded-xl shadow-lg z-50">
          ✅ Berhasil ditambahkan ke keranjang
        </div>
      )}
    </main>
  );
}
