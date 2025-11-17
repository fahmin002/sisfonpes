import { Head, Link } from "@inertiajs/react";
import FrontendLayout from "@/layouts/frontend-layout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/breadcrumbs";

export default function ProgramShow({ program }) {
  const imageUrl = program.image
    ? program.image.startsWith("http")
      ? program.image
      : `/storage/${program.image.replace(/^\/+/, "")}`
    : null;

  return (
    <FrontendLayout title={program.title}>
      <Head title={program.title} />

      {/* Breadcrumb */}
      <div className="container max-w-4xl mx-auto px-5 mb-6 text-sm text-muted-foreground">
        <Breadcrumbs
          breadcrumbs={[
            { title: "Beranda", href: "/" },
            { title: "Program Pendidikan", href: "/program" },
            { title: program.title, href: "#" },
          ]}
        />
      </div>

      {/* Top Image (optional, small & clean) */}
      {imageUrl && (
        <div className="container max-w-4xl mx-auto px-5 mb-8">
          <img
            src={imageUrl}
            alt={program.title}
            className="w-full h-64 rounded-xl object-cover shadow-md"
          />
        </div>
      )}

      {/* Content */}
      <div className="container max-w-4xl mx-auto px-5 pb-20">
        {program.short_description && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="text-lg text-gray-700 mb-6 leading-relaxed"
          >
            {program.short_description}
          </motion.p>
        )}

        {/* Description */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="prose prose-lg max-w-none dark:prose-invert tiptap-render"
          dangerouslySetInnerHTML={{ __html: program.description }}
        />

        {/* CTA Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-12 p-6 bg-emerald-50 border border-emerald-200 rounded-2xl shadow-sm"
        >
          <h2 className="text-2xl font-semibold text-emerald-800 mb-3">
            Ingin mendapatkan informasi lebih lanjut?
          </h2>

          <p className="text-gray-700 mb-5">
            Hubungi admin pendaftaran atau kunjungi halaman kontak kami
            untuk mendapatkan informasi resmi mengenai kurikulum, jadwal,
            dan persyaratan program pendidikan.
          </p>
          <Link
            href="/kontak"
          >
            <Button className="bg-emerald-700 hover:bg-emerald-800 text-white px-6 text-base rounded-xl">
              Hubungi Admin
            </Button>
          </Link>

        </motion.div>
      </div>
    </FrontendLayout>
  );
}
