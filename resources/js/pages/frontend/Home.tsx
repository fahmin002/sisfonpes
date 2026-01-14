import FrontendLayout from "@/layouts/frontend-layout";
import { Head, Link, usePage } from "@inertiajs/react";
import HeroCarousel from "@/components/frontend/HeroCarousel";
import ProgramCard from "@/components/frontend/ProgramCard";
import PostCard from "@/components/frontend/PostCard";
import { motion } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useState } from "react";

export default function Home({ posts = [], programs = [], galleries = [], infoLinks = [], heroImages = [] }: any) {
  const latestPosts = posts.slice(0, 3);
  const showcase = galleries.slice(0, 6);
  const infoCards = infoLinks.slice(0, 3);
  const { props }: any = usePage();
  const [photoIndex, setPhotoIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const settings: Record<string, string> = props.settings || {};

  return (
    <FrontendLayout>
      <Head title="Beranda" />

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
            <h1 className="text-2xl md:text-6xl font-bold leading-tight drop-shadow-xl">
              {settings.site_name || "Pondok Pesantren"}
            </h1>

            <p className="mt-4 text-md md:text-xl text-emerald-100 leading-relaxed drop-shadow-xl">
              {settings.site_tagline || "Mencetak Generasi Qur'ani yang Berwawasan Modern"}
            </p>

            <div className="mt-6 flex gap-4">
              <Link
                href="/pendaftaran"
                className="bg-white text-sm md:text-md text-emerald-900 px-6 py-3 rounded-xl font-semibold shadow hover:bg-emerald-100 transition"
              >
                Daftar Sekarang
              </Link>

              <Link
                href="/tentang"
                className="border text-sm md:text-md border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition backdrop-blur-sm"
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
      {settings.feature_blog === "1" && (
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
      {settings.feature_gallery === "1" && (
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


      {/* Visi Dan Misi */}
      <section className="bg-emerald-50 py-20 rounded-2xl border border-emerald-100 shadow-inner">
        <div className="max-w-6xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold text-emerald-900 mb-10">Visi & Misi</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="ml-4 rounded-lg p-6 border border-emerald-200 bg-white shadow-sm">
              <h3 className="text-2xl font-semibold text-emerald-800 mb-6">Visi</h3>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="prose prose-lg max-w-none dark:prose-invert tiptap-render mx-auto"
                dangerouslySetInnerHTML={{ __html: settings.profile_vision }}
              />
            </div>
            <div className="ml-4 rounded-lg p-6 border border-emerald-200 bg-white shadow-sm">
              <h3 className="text-2xl font-semibold text-emerald-800 mb-6">Misi</h3>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="prose prose-lg max-w-none dark:prose-invert tiptap-render mx-auto"
                dangerouslySetInnerHTML={{ __html: settings.profile_mission }}
              />
            </div>
          </div>
        </div>
      </section>
    </FrontendLayout>
  );
}