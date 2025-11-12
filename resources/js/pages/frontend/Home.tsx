// resources/js/pages/frontend/Home.tsx
import FrontendLayout from "@/layouts/frontend-layout";
import AnnouncementBar from "@/components/frontend/AnnouncementBar";
import PostCard from "@/components/frontend/PostCard";
import ProgramCard from "@/components/frontend/ProgramCard";
import { Head, Link, usePage } from "@inertiajs/react";

export default function Home({
  posts = [],
  programs = [],
  galleries = [],
  infoLinks = [],
}: any) {
  const latestPosts = posts.slice(0, 3);
  const showcase = galleries.slice(0, 6);
  const infoCards = infoLinks.slice(0, 3); // tampilkan maksimal 3 info link
  
  return (
    <FrontendLayout>
      <Head title="Beranda - Pondok Pesantren Darul Amin" />

      {/* Announcement Bar */}
      {/* <AnnouncementBar message="Selamat datang di Website Resmi Pondok Pesantren Darul Amin — Pendaftaran Santri Baru 2025 telah dibuka!" /> */}

      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-lg border border-border/50 bg-gradient-to-br from-emerald-700 via-emerald-800 to-emerald-900 text-white mb-12">
        <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center p-10">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Selamat Datang di Pondok Pesantren <br />
              <span className="text-emerald-200">Darul Amin</span>
            </h2>
            <p className="text-emerald-100 max-w-xl leading-relaxed mb-6">
              Lembaga pendidikan Islam yang menanamkan nilai keikhlasan, kesederhanaan, kemandirian, ukhuwah Islamiyah,
              dan kebebasan berpikir untuk melahirkan generasi berjiwa Qur'ani dan berwawasan modern.
            </p>
            <div className="flex gap-3">
              <Link href="/pendaftaran">
                <button className="bg-white text-emerald-800 px-5 py-2 rounded font-semibold shadow hover:bg-emerald-100 transition">
                  Daftar Sekarang
                </button>
              </Link>
              <Link href="/tentang">
                <button className="border border-white text-white px-5 py-2 rounded font-semibold hover:bg-white hover:text-emerald-800 transition">
                  Tentang Kami
                </button>
              </Link>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img
              src="/images/hero-school.jpg"
              alt="Pondok Pesantren Darul Amin"
              className="w-full h-72 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Program Pendidikan */}
      <section className="mb-12">
        <h3 className="text-2xl font-bold mb-6 text-emerald-800 border-b pb-2 border-emerald-200">
          Program Pendidikan
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          {programs.length ? (
            programs.map((p: any) => <ProgramCard key={p.id} program={p} />)
          ) : (
            <div className="text-muted-foreground col-span-3 text-center">
              Belum ada program terdaftar.
            </div>
          )}
        </div>
      </section>

      {/* Berita Terbaru */}
      <section className="mb-12">
        <h3 className="text-2xl font-bold mb-6 text-emerald-800 border-b pb-2 border-emerald-200">
          Berita Terbaru
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          {latestPosts.length ? (
            latestPosts.map((post: any) => <PostCard key={post.id} post={post} />)
          ) : (
            <div className="text-muted-foreground col-span-3 text-center">
              Belum ada berita.
            </div>
          )}
        </div>
        <div className="mt-6 text-center">
          <Link
            href="/berita"
            className="inline-block text-emerald-700 font-semibold hover:underline"
          >
            Lihat semua berita →
          </Link>
        </div>
      </section>

      {/* 🟩 Info Links Section */}
      {infoCards.length > 0 && (
        <section className="info-links mb-16">
          <h3 className="text-2xl font-bold mb-6 text-emerald-800 border-b pb-2 border-emerald-200">
            Informasi Penting
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {infoCards.map((info: any) => (
              <Link
                key={info.id}
                href={`/${info.slug}`}
                className="relative rounded-lg overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition group-hover:from-black/80" />
                <img
                  src={
                    info.thumbnail
                      ? `/storage/${info.thumbnail}`
                      : "/images/default-thumbnail.jpg"
                  }
                  alt={info.title}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                  <h4 className="text-lg font-semibold mb-1">{info.title}</h4>
                  {info.excerpt && (
                    <p className="text-sm text-gray-200 line-clamp-2">
                      {info.excerpt}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Galeri Pondok */}
      <section className="mb-12">
        <h3 className="text-2xl font-bold mb-6 text-emerald-800 border-b pb-2 border-emerald-200">
          Galeri Pondok
        </h3>
        <div className="grid md:grid-cols-4 gap-4">
          {showcase.length ? (
            showcase.map((g: any) => (
              <div
                key={g.id}
                className="rounded overflow-hidden border border-border/40 hover:shadow-md transition"
              >
                <img
                  src={`/storage/${g.image}`}
                  alt={g.title}
                  className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))
          ) : (
            <div className="text-muted-foreground col-span-4 text-center">
              Belum ada foto galeri.
            </div>
          )}
        </div>
        <div className="mt-6 text-center">
          <Link
            href="/galeri"
            className="inline-block text-emerald-700 font-semibold hover:underline"
          >
            Lihat semua galeri →
          </Link>
        </div>
      </section>

      {/* Falsafah Pondok */}
      <section className="bg-emerald-50 py-16 rounded-lg border border-emerald-100">
        <div className="max-w-6xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold text-emerald-900 mb-8">
            Falsafah Pondok
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
              <div className="text-emerald-600 text-4xl mb-3">
                <i className="fa-solid fa-heart-pulse"></i>
              </div>
              <h3 className="text-lg font-bold mb-2">Panca Jiwa</h3>
              <p className="text-gray-600 text-sm">
                Keikhlasan, Kesederhanaan, Kemandirian, Ukhuwah Islamiyah, dan Kebebasan.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
              <div className="text-emerald-600 text-4xl mb-3">
                <i className="fa-solid fa-arrow-trend-up"></i>
              </div>
              <h3 className="text-lg font-bold mb-2">Moto</h3>
              <p className="text-gray-600 text-sm">
                Berbudi tinggi, berbadan sehat, berpengetahuan luas, dan berpikiran bebas.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
              <div className="text-emerald-600 text-4xl mb-3">
                <i className="fa-solid fa-binoculars"></i>
              </div>
              <h3 className="text-lg font-bold mb-2">Panca Jangka</h3>
              <p className="text-gray-600 text-sm">
                Panca Jangka sebagai arah pembangunan Pondok: pendidikan, kaderisasi, sarana, dana, dan kesejahteraan.
              </p>
            </div>
          </div>
        </div>
      </section>
    </FrontendLayout>
  );
}
