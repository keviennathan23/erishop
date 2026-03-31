"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm py-4 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex justify-between items-center">
        
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src="/Logo.png"
            alt="ERISHOP Logo"
            className="w-10 h-10 object-contain"
          />
          <h1 className="text-xl font-bold text-blue-600">
            ERISHOP
          </h1>
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-6 text-sm font-medium items-center">
          <a href="#home" className="hover:text-orange-500">Home</a>
          <a href="#karya" className="hover:text-orange-500">Artwork</a>
          <a href="#produk" className="hover:text-orange-500">Products</a>
          <a href="#marketing" className="hover:text-orange-500">Our Story</a>

          <a
            href="#produk"
            className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition"
          >
            Shop
          </a>
        </div>

        {/* HAMBURGER BUTTON (MOBILE) */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-4 text-sm font-medium bg-white shadow">
          <a href="#home" onClick={() => setOpen(false)}>Home</a>
          <a href="#karya" onClick={() => setOpen(false)}>Artwork</a>
          <a href="#produk" onClick={() => setOpen(false)}>Products</a>
          <a href="#marketing" onClick={() => setOpen(false)}>Our Story</a>

          <a
            href="#produk"
            onClick={() => setOpen(false)}
            className="bg-blue-500 text-white px-4 py-2 rounded-xl text-center"
          >
            Shop Now
          </a>
        </div>
      )}
    </nav>
  );
}