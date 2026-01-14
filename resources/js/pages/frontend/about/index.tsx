import FrontendLayout from "@/layouts/frontend-layout";
import { Head } from "@inertiajs/react";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { motion } from "framer-motion";

export default function AboutPage({ settings = {} }: any) {
  return (
    <FrontendLayout>
      <Head title="Tentang Kami" />

      {/* Hero Section */}
      <section className="relative w-full h-64 mb-10 rounded-xl overflow-hidden shadow-md">
        <div className="absolute inset-0 bg-emerald-800 flex items-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="container max-w-5xl mx-auto"
          >
            <h1 className="text-4xl font-bold text-white mb-4 drop-shadow">
              Tentang Kami
            </h1>
            <p className="text-lg text-emerald-50 max-w-3xl opacity-90">
              Mengenal lebih dekat Pondok Pesantren Darul Amin, tempat pendidikan
              dan pembinaan karakter yang berlandaskan nilai-nilai Islam.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="container max-w-5xl mx-auto px-6 mb-8">
        <Breadcrumbs
          breadcrumbs={[
            { title: "Home", href: "/" },
            { title: "Tentang", href: "/about" },
          ]}
        />
      </div>

      {/* Content */}
      <section className="pb-20">
        <div className="container max-w-5xl mx-auto px-6 space-y-12">

          {/* Profil Singkat */}
          <Card className="shadow-md rounded-2xl border border-emerald-100">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-emerald-800 mb-4">
                Profil Singkat
              </h2>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="prose prose-lg max-w-none dark:prose-invert tiptap-render"
                dangerouslySetInnerHTML={{ __html: settings.profile_history }}
              />
            </CardContent>
          </Card>

          {/* Visi */}
          <Card className="shadow-md rounded-2xl border border-emerald-100">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-emerald-800 mb-4">Visi</h2>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="prose prose-lg max-w-none dark:prose-invert tiptap-render"
                dangerouslySetInnerHTML={{ __html: settings.profile_vision }}
              />
            </CardContent>
          </Card>

          {/* Misi */}
          <Card className="shadow-md rounded-2xl border border-emerald-100">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-emerald-800 mb-4">Misi</h2>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="prose prose-lg max-w-none dark:prose-invert tiptap-render"
                dangerouslySetInnerHTML={{ __html: settings.profile_mission }}
              />
            </CardContent>
          </Card>
          {/* Keunggulan Pesantren */}
          <Card className="shadow-md rounded-2xl border border-emerald-100">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-emerald-800 mb-4">
                Keunggulan Pesantren
              </h2>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="prose prose-lg max-w-none dark:prose-invert tiptap-render"
                dangerouslySetInnerHTML={{ __html: settings.profile_excellence }}
              />
            </CardContent>
          </Card>

          {/* Fasilitas */}
          <Card className="shadow-md rounded-2xl border border-emerald-100">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-emerald-800 mb-4">
                Fasilitas
              </h2>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="prose prose-lg max-w-none dark:prose-invert tiptap-render"
                dangerouslySetInnerHTML={{ __html: settings.profile_facilities }}
              />
            </CardContent>
          </Card>

          {/* Ekstrakurikuler */}
          <Card className="shadow-md rounded-2xl border border-emerald-100">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-emerald-800 mb-4">
                Ekstrakurikuler
              </h2>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="prose prose-lg max-w-none dark:prose-invert tiptap-render"
                dangerouslySetInnerHTML={{ __html: settings.profile_extracurricular }}
              />
            </CardContent>
          </Card>

          {/* Struktur / Pengasuh */}
          <Card className="shadow-md rounded-2xl border border-emerald-100">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-emerald-800 mb-4">
                Pengasuh & Struktur
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Di bawah bimbingan para ustadz dan pengasuh yang berpengalaman,
                pesantren menjalankan sistem pendidikan yang terarah, profesional,
                dan penuh perhatian terhadap perkembangan santri.
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Leader 1 */}
                <div
                  className="bg-gray-50 p-4 rounded-xl border shadow-sm"
                >
                  <p className="font-semibold text-emerald-800">
                    {settings.profile_leader1}
                  </p>
                  <p className="text-gray-600 text-sm">Pengasuh Pesantren</p>
                </div>
                {/* Leader 2 */}
                <div
                  className="bg-gray-50 p-4 rounded-xl border shadow-sm"
                >
                  <p className="font-semibold text-emerald-800">
                    {settings.profile_leader2}
                  </p>
                  <p className="text-gray-600 text-sm">Kepala Madrasah</p>
                </div>
                {/* Leader 3 */}
                <div
                  className="bg-gray-50 p-4 rounded-xl border shadow-sm"
                >
                  <p className="font-semibold text-emerald-800">
                    {settings.profile_leader3}
                  </p>
                  <p className="text-gray-600 text-sm">Kepala Asrama</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </FrontendLayout>
  );
}