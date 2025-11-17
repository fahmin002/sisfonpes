import FrontendLayout from "@/layouts/frontend-layout";
import { Head } from "@inertiajs/react";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { motion } from "framer-motion";

export default function AboutPage() {
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
              <p className="leading-relaxed text-gray-700">
                Pondok Pesantren Darul Amin didirikan sebagai lembaga pendidikan
                Islam yang fokus pada pembinaan akhlak, ilmu agama, dan kecerdasan
                santri. Dengan kurikulum terintegrasi antara pendidikan formal dan
                diniyah, pesantren ini berkomitmen melahirkan generasi unggul yang
                siap berkontribusi bagi masyarakat.
              </p>
            </CardContent>
          </Card>

          {/* Visi */}
          <Card className="shadow-md rounded-2xl border border-emerald-100">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-emerald-800 mb-4">Visi</h2>
              <p className="text-gray-700 leading-relaxed">
                “Membentuk generasi Muslim yang berakhlak mulia, berilmu, beramal,
                serta mampu menghadapi tantangan zaman.”
              </p>
            </CardContent>
          </Card>

          {/* Misi */}
          <Card className="shadow-md rounded-2xl border border-emerald-100">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-emerald-800 mb-4">Misi</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Menanamkan nilai-nilai keislaman sejak dini.</li>
                <li>Menyelenggarakan pendidikan formal dan diniyah yang seimbang.</li>
                <li>Mengembangkan potensi santri melalui kegiatan kreatif dan produktif.</li>
                <li>Membina kedisiplinan, kemandirian, dan kepedulian sosial.</li>
                <li>Membentuk lingkungan belajar yang kondusif dan religius.</li>
              </ul>
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
                {[
                  {
                    name: "KH. Nama Pengasuh",
                    role: "Pengasuh Pesantren",
                  },
                  {
                    name: "Ust. Nama Lengkap",
                    role: "Wakil Pengasuh",
                  },
                  {
                    name: "Ustdz. Nama Lengkap",
                    role: "Koordinator Pendidikan",
                  },
                ].map((person, i) => (
                  <div
                    key={i}
                    className="bg-gray-50 p-4 rounded-xl border shadow-sm"
                  >
                    <p className="font-semibold text-emerald-800">
                      {person.name}
                    </p>
                    <p className="text-gray-600 text-sm">{person.role}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </FrontendLayout>
  );
}