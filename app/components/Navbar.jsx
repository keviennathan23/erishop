export default function Navbar() {
  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm py-4 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">

        {/* Logo + Brand */}
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

        {/* Menu */}
        <div className="flex gap-6 text-sm font-medium items-center">
          <a href="#profil" className="hover:text-orange-500">Profil</a>
          <a href="#karya" className="hover:text-orange-500">Karya</a>
          <a href="#produk" className="hover:text-orange-500">Produk</a>
          <a href="#marketing" className="hover:text-orange-500">Marketing</a>

          {/* CTA */}
          <a
            href="#produk"
            className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition"
          >
            Shop
          </a>
        </div>

      </div>
    </nav>
  );
}