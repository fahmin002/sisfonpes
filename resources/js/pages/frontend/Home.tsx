import FrontendLayout from "@/layouts/frontend-layout";
import { Head, Link, usePage } from "@inertiajs/react";
import HeroCarousel from "@/components/frontend/HeroCarousel";
import ProgramCard from "@/components/frontend/ProgramCard";
import PostCard from "@/components/frontend/PostCard";
import { motion } from "framer-motion";

export default function Home({ posts = [], programs = [], galleries = [], infoLinks = [], heroImages = [] }: any) {
  const latestPosts = posts.slice(0, 3);
  const showcase = galleries.slice(0, 6);
  const infoCards = infoLinks.slice(0, 3);
  const { props }: any = usePage();
  const settings: Record<string, string> = props.settings || {};

  return (
    <FrontendLayout>
      <Head title="Beranda - Pondok Pesantren Darul Amin" />

      {/* HERO SECTION */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto relative overflow-hidden rounded-2xl shadow-xl mb-14"
      >

        {/* Overlay untuk readability */}
        <div className="absolute inset-0 z-10">
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
        </div>

        <HeroCarousel images={heroImages} />
        <div className="absolute inset-0 z-20 flex items-center px-10 md:px-20">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight drop-shadow-xl">
              Pondok Pesantren
              <br />
              <span className="text-emerald-200">Darul Amin</span>
            </h1>

            <p className="mt-4 text-lg md:text-xl text-emerald-100 leading-relaxed drop-shadow-xl">
              Mencetak generasi muslim yang berakhlak mulia, berilmu luas, dan siap menghadapi tantangan zaman.
            </p>

            <div className="mt-6 flex gap-4">
              <Link
                href="/pendaftaran"
                className="bg-white text-emerald-900 px-6 py-3 rounded-xl font-semibold shadow hover:bg-emerald-100 transition"
              >
                Daftar Sekarang
              </Link>

              <Link
                href="/tentang"
                className="border border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition backdrop-blur-sm"
              >
                Tentang Kami
              </Link>
            </div>
          </div>
        </div>

      </motion.section>

      {/* PROGRAM */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-emerald-900 mb-8 border-b pb-3 border-emerald-200">
          Program Pendidikan
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {programs.length ? programs.map((p: any) => <ProgramCard key={p.id} program={p} />) : (
            <div className="text-muted-foreground col-span-3 text-center">Belum ada program.</div>
          )}
        </div>
        <div className="mt-6 text-center">
          <Link href="/program-pendidikan" className="text-emerald-700 font-semibold hover:underline">
            Lihat semua Program Pendidikan →
          </Link>
        </div>
      </section>

      {/* BERITA */}
      {settings.show_blog === "1" && (
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-emerald-900 mb-8 border-b pb-3 border-emerald-200">
            Berita Terbaru
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {latestPosts.length ? latestPosts.map((post: any) => <PostCard key={post.id} post={post} />) : (
              <div className="text-muted-foreground col-span-3 text-center">Belum ada berita.</div>
            )}
          </div>
          <div className="mt-6 text-center">
            <Link href="/berita" className="text-emerald-700 font-semibold hover:underline">
              Lihat semua berita →
            </Link>
          </div>
        </section>
      )}

      {/* INFO LINKS */}
      {infoCards.length > 0 && (
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-emerald-900 mb-8 border-b pb-3 border-emerald-200">
            Informasi Penting
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {infoCards.map((info: any) => (
              <Link key={info.id} href={`/info/${info.slug}`} className="group relative rounded-2xl overflow-hidden shadow hover:shadow-lg transition">
                <img
                  src={info.thumbnail ? `/storage/${info.thumbnail}` : "/images/default-thumbnail.jpg"}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h4 className="text-lg font-semibold mb-1">{info.title}</h4>
                  {info.excerpt && <p className="text-sm text-gray-200 line-clamp-2">{info.excerpt}</p>}
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/info" className="text-emerald-700 font-semibold hover:underline">
              Lihat semua Info →
            </Link>
          </div>
        </section>
      )}

      {/* GALERI */}
      {settings.show_gallery === "1" && (
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-emerald-900 mb-8 border-b pb-3 border-emerald-200">
            Galeri Pondok
          </h2>
          <div className="grid md:grid-cols-4 gap-5">
            {showcase.length ? showcase.map((g: any) => (
              <div key={g.id} className="rounded-xl overflow-hidden shadow border hover:shadow-lg transition">
                <img
                  src={`/storage/${g.image}`}
                  className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            )) : (
              <div className="text-muted-foreground col-span-4 text-center">Belum ada foto.</div>
            )}
          </div>
          <div className="mt-6 text-center">
            <Link href="/galeri" className="text-emerald-700 font-semibold hover:underline">
              Lihat semua galeri →
            </Link>
          </div>
        </section>
      )}

      {/* FALSAFAH */}
      <section className="bg-emerald-50 py-20 rounded-2xl border border-emerald-100 shadow-inner">
        <div className="max-w-6xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold text-emerald-900 mb-10">Falsafah Pondok</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[{
              icon: "fa-heart-pulse",
              title: "Panca Jiwa",
              desc: "Keikhlasan, kesederhanaan, kemandirian, ukhuwah, dan kebebasan."
            }, {
              icon: "fa-arrow-trend-up",
              title: "Moto",
              desc: "Berbudi tinggi, berbadan sehat, berpengetahuan luas, berpikiran bebas."
            }, {
              icon: "fa-binoculars",
              title: "Panca Jangka",
              desc: "Arah pembangunan pondok: pendidikan, kaderisasi, sarana, dana, kesejahteraan."
            }].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border hover:shadow-md transition">
                <div className="text-emerald-600 text-5xl mb-4">
                  <i className={`fa-solid ${item.icon}`}></i>
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </FrontendLayout>
  );
}