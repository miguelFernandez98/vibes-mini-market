"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  MapPin,
  ChevronDown,
  Store,
} from "lucide-react";

const navLinks = [
  { label: "Inicio", href: "/" },
  {
    label: "Productos",
    href: "/products",
  },
  {
    label: "Categorias",
    href: "/products",
    children: [
      { label: "Electronics", href: "/products?category=electronics" },
      { label: "Jewelery", href: "/products?category=jewelery" },
      { label: "Men's Clothing", href: "/products?category=men%27s+clothing" },
      { label: "Women's Clothing", href: "/products?category=women%27s+clothing" },
    ],
  },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      {/* Top promo bar */}
      <div className="bg-[#00703C] text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center h-8">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3 h-3" />
            <span className="hidden sm:inline">Encuentra tu tienda mas cercana</span>
            <span className="sm:hidden">Tiendas</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden md:inline">📞 +1 (555) 123-4567</span>
            <span className="font-semibold">🚚 Envio gratis +$50</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div
        className={`bg-white transition-shadow duration-300 ${
          scrolled ? "shadow-lg" : "shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">
            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 -ml-2 text-gray-600 hover:text-[#00703C] transition-colors rounded-lg hover:bg-gray-50"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-0.5 shrink-0">
              <div className="flex items-center">
                <Store className="w-7 h-7 text-[#00703C] mr-1.5" />
                <span className="text-[22px] lg:text-2xl font-black text-[#00703C] tracking-tight leading-none">
                  MIG
                </span>
                <span className="text-[22px] lg:text-2xl font-black text-[#ff6b00] tracking-tight leading-none">
                  MARKET
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-0.5 ml-8">
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={`flex items-center gap-1 px-4 py-2 text-[15px] font-medium rounded-lg transition-all duration-200 ${
                      pathname === link.href
                        ? "text-[#00703C] bg-[#00703C]/5"
                        : "text-gray-700 hover:text-[#00703C] hover:bg-gray-50"
                    }`}
                  >
                    {link.label}
                    {link.children && (
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          activeDropdown === link.label ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </Link>

                  <AnimatePresence>
                    {link.children && activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-1 w-60 bg-white rounded-xl shadow-xl border border-gray-100/80 py-2 z-50"
                      >
                        {link.children.map((child, i) => (
                          <motion.div
                            key={child.label}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                          >
                            <Link
                              href={child.href}
                              className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-[#00703C]/5 hover:text-[#00703C] transition-colors"
                            >
                              {child.label}
                            </Link>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Search bar */}
            <div className="hidden md:flex flex-1 max-w-lg mx-6">
              <div className="relative w-full group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400 group-focus-within:text-[#00703C] transition-colors" />
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  className="w-full pl-11 pr-4 py-2.5 bg-gray-100/80 border border-transparent rounded-xl text-sm focus:outline-none focus:border-[#00703C] focus:bg-white focus:ring-2 focus:ring-[#00703C]/10 transition-all duration-200 placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-1">
              <button className="p-2.5 text-gray-600 hover:text-[#00703C] hover:bg-[#00703C]/5 rounded-xl transition-all duration-200 hidden sm:flex">
                <User className="w-5 h-5" />
              </button>
              <button className="p-2.5 text-gray-600 hover:text-[#00703C] hover:bg-[#00703C]/5 rounded-xl transition-all duration-200 relative">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-[#ff6b00] text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                  0
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-white z-50 shadow-2xl lg:hidden overflow-y-auto"
            >
              <div className="p-5">
                <div className="flex items-center justify-between mb-6">
                  <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-1">
                    <Store className="w-6 h-6 text-[#00703C]" />
                    <span className="text-xl font-black text-[#00703C]">MIG</span>
                    <span className="text-xl font-black text-[#ff6b00]">MARKET</span>
                  </Link>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile search */}
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar productos..."
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border border-transparent rounded-xl text-sm focus:outline-none focus:border-[#00703C] focus:bg-white transition-all"
                  />
                </div>

                {/* Mobile nav links */}
                <nav className="space-y-1">
                  {navLinks.map((link) => (
                    <div key={link.label}>
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`block px-4 py-3 font-medium rounded-xl transition-colors ${
                          pathname === link.href
                            ? "text-[#00703C] bg-[#00703C]/5"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {link.label}
                      </Link>
                      {link.children && (
                        <div className="pl-4 space-y-0.5">
                          {link.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              onClick={() => setMobileOpen(false)}
                              className="block px-4 py-2 text-sm text-gray-500 hover:text-[#00703C] transition-colors"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </nav>

                {/* Mobile user action */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <button className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors">
                    <User className="w-5 h-5" />
                    <span className="font-medium">Mi cuenta</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
