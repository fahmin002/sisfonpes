"use client";

import { useState } from "react";
import { Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"; // helper shadcn untuk className

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // static menus sementara
  const menus = [
    { name: "Beranda", url: "/" },
    { name: "Tentang", url: "/tentang" },
    {
      name: "Program",
      children: [
        { name: "Madrasah Tsanawiyah", url: "/program/mts" },
        { name: "Madrasah Aliyah", url: "/program/ma" },
      ],
    },
    { name: "Berita", url: "/berita" },
    { name: "Kontak", url: "/kontak" },
  ];

  return (
    <nav className="border-b border-gray-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-4 md:px-8">
        {/* Brand */}
        <a href="/" className="flex items-center gap-2 font-semibold text-emerald-800">
          <img src="/images/logo.jpg" alt="Logo" className="h-8 w-8 rounded-full" />
          <span className="text-lg font-bold tracking-wide">Darul Amin</span>
        </a>

        {/* Menu button (mobile) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-emerald-700 hover:text-emerald-900"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Menu items */}
        <ul
          className={cn(
            "md:flex md:items-center md:gap-6 text-sm font-medium text-gray-700",
            "absolute md:static left-0 top-14 md:top-auto w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none",
            menuOpen ? "block" : "hidden md:flex"
          )}
        >
          {menus.map((menu, i) => (
            <li key={i} className="group relative px-4 md:px-0">
              {!menu.children ? (
                <a
                  href={menu.url}
                  className="block py-3 md:py-0 text-gray-700 hover:text-emerald-700 transition-colors"
                >
                  {menu.name}
                </a>
              ) : (
                <>
                  <button className="flex items-center gap-1 py-3 md:py-0 hover:text-emerald-700 transition-colors">
                    {menu.name}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-400 group-hover:text-emerald-700 transition"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Submenu */}
                  <ul className="hidden group-hover:block absolute md:min-w-[200px] bg-white shadow-lg border border-gray-100 rounded-md py-2 z-40">
                    {menu.children.map((child, j) => (
                      <li key={j}>
                        <a
                          href={child.url}
                          className="block px-4 py-2 hover:bg-emerald-50 hover:text-emerald-700 transition"
                        >
                          {child.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </li>
          ))}

          {/* Search button */}
          <li className="px-4 md:px-0">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-gray-600 hover:text-emerald-700 transition-colors flex items-center gap-1"
            >
              <Search size={18} />
              <span className="hidden md:inline">Cari</span>
            </button>
          </li>
        </ul>
      </div>

      {/* Search bar overlay */}
      {searchOpen && (
        <div className="border-t border-gray-200 bg-white/95 py-4 shadow-inner">
          <div className="max-w-3xl mx-auto px-4 flex items-center gap-3">
            <input
              type="search"
              placeholder="Ketikkan pencarian dan tekan Enter..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
            <Button variant="ghost" onClick={() => setSearchOpen(false)}>
              <X size={20} className="text-gray-600" />
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
