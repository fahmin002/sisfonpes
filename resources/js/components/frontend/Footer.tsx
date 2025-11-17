import { ArrowUp, Facebook, Instagram, Twitter, Youtube } from "lucide-react"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link, usePage } from "@inertiajs/react"

export default function Footer() {
  const { props } = usePage();
  const settings: Record<string, string> = props.settings || {};
  const [showScrollTop, setShowScrollTop] = useState(false)
  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollToTop = () =>
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })

  return (
    <footer className="relative border-t border-gray-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-16">
          {/* Left */}
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3">
              <img
                src="/images/logo.jpg"
                alt="Logo Darul Amin"
                className="h-12 w-12 rounded-full object-cover"
              />
              <h2 className="font-bold text-lg text-emerald-800">
                Pondok Pesantren {settings.site_name || "Darul Amin"}
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-gray-700">
              <strong>{settings.address}</strong>
            </p>
            <p className="text-sm text-gray-600">
              Sekretariat: (+62) {settings.contact_phone}
            </p>
            <p className="text-sm text-gray-600">
              Email: <a href={`mailto:${settings.contact_email}`} className="underline hover:text-emerald-700">{settings.contact_email}</a>
            </p>
          </div>

          {/* Right */}
          <div className="flex-1 flex flex-col justify-between">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {["100 tahun", "maklumat", "santri", "santriwati", "umum"].map((tag, i) => (
                <Link
                  key={i}
                  href="#"
                  className="text-sm bg-emerald-50 text-emerald-700 hover:bg-emerald-100 px-3 py-1 rounded-full transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>

            {/* Social icons */}
            <div className="flex gap-4 mt-auto">
              <a href="https://facebook.com/" target="_blank" aria-label="Facebook" className="hover:text-emerald-700 transition">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com/" target="_blank" aria-label="Instagram" className="hover:text-emerald-700 transition">
                <Instagram size={20} />
              </a>
              <a href="https://x.com/" target="_blank" aria-label="Twitter" className="hover:text-emerald-700 transition">
                <Twitter size={20} />
              </a>
              <a href="https://youtube.com/" target="_blank" aria-label="YouTube" className="hover:text-emerald-700 transition">
                <Youtube size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="mt-10 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Pondok Pesantren Darul Amin. All rights reserved.
        </div>
      </div>

      {/* Tombol back-to-top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            aria-label="Kembali ke atas"
            className="fixed bottom-6 right-6 md:bottom-8 md:right-8 p-3 rounded-full bg-emerald-600 text-white shadow-md hover:bg-emerald-700 transition"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  )
}
