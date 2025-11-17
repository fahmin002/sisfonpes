import { Head } from "@inertiajs/react";
import FrontendLayout from "@/layouts/frontend-layout";
import { motion } from "framer-motion";
import { Breadcrumbs } from "@/components/breadcrumbs";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useState } from "react";

export default function GalleryIndex({ galleries, filters }) {
  const [open, setOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const slides = galleries.data.map((p) => ({
    src: `/storage/${p.image}`,
    title: p.title,
    description: p.description || "",
  }));

  return (
    <FrontendLayout>
      <Head title="Galeri" />

      {/* Hero Section */}
      <section className="relative text-white w-full h-64 mb-10 rounded-xl overflow-hidden shadow-md">
        <div className="absolute inset-0 bg-emerald-800 flex items-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="container max-w-5xl mx-auto"
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-3 leading-tight">
              Galeri
            </h1>
            <p className="text-base md:text-lg max-w-3xl opacity-90">
              Koleksi foto kegiatan dan dokumentasi pesantren.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="container max-w-5xl px-6 mb-8">
        <Breadcrumbs
          breadcrumbs={[
            { title: "Home", href: "/" },
            { title: "Galeri", href: "/galeri" },
          ]}
        />
      </div>

      {/* Gallery Grid */}
      <div className="container max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {galleries.data.map((photo, idx) => (
            <div
              key={photo.id}
              className="relative group cursor-pointer overflow-hidden rounded-xl shadow hover:shadow-lg"
              onClick={() => {
                setPhotoIndex(idx);
                setOpen(true);
              }}
            >
              <img
                src={`/storage/${photo.image}`}
                alt={photo.title}
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {photo.title || photo.description ? (
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <h4 className="font-semibold text-sm line-clamp-1">{photo.title}</h4>
                  {photo.description && (
                    <p className="text-xs line-clamp-2 mt-1">{photo.description}</p>
                  )}
                </div>
              ) : null}
            </div>
          ))}
        </div>

        {/* Pagination */}
        {galleries.links && galleries.links.length > 0 && (
          <div className="mt-12 flex justify-center flex-wrap gap-2">
            {galleries.links.map((link, i) => (
              <a
                key={i}
                href={link.url || "#"}
                dangerouslySetInnerHTML={{ __html: link.label }}
                className={`px-4 py-2 text-sm rounded-lg border transition
                  ${link.active
                    ? "bg-emerald-700 text-white border-emerald-700"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  }
                `}
              />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {open && (
        <Lightbox
          slides={slides}
          open={open}
          index={photoIndex}
          close={() => setOpen(false)}
          render={{
            slide: ({ slide }) => (
              <div className="flex flex-col items-center justify-center text-center text-white">
                <img src={slide.src} alt={slide.title} className="max-h-[80vh] object-contain" />
                {slide.title && <h3 className="mt-4 text-lg font-semibold">{slide.title}</h3>}
                {slide.description && <p className="mt-2 text-sm max-w-xl">{slide.description}</p>}
              </div>
            ),
          }}
        />
      )}
    </FrontendLayout>
  );
}
