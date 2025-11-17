import FrontendLayout from "@/layouts/frontend-layout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Phone, Mail, MapPin, Clock, Loader2, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { toast } from "sonner";

export default function ContactPage() {
  const { data, setData, post, processing, errors } = useForm({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const submit = (e) => {
    e.preventDefault();
    post("/kontak/kirim-pesan", {
      onStart: () => {
        toast.info('Sedang Memproses', {
          icon: <Loader2 className="text-blue-500" />,
          description: 'Mengirim Pesan Anda',
        });
      },
      onSuccess: () => {
        toast.success('Berhasil', {
          icon: <CheckCircle2 className="text-green-500" />,
          description: 'Pesan Terkirim',
        });
      }
    });
  };

  return (
    <FrontendLayout title="Kontak & Alamat">
      <Head title="Kontak & Alamat" />

      {/* Hero */}
      <section className="relative w-full py-16 mb-12 rounded-xl overflow-hidden bg-emerald-800 text-white shadow-lg">
        <div className="container max-w-4xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold mb-3"
          >
            Kontak & Alamat
          </motion.h1>
          <p className="text-emerald-100 text-lg">
            Informasi resmi untuk pendaftaran, administrasi, dan kunjungan.
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="container max-w-4xl mx-auto px-6 space-y-12 pb-20">
        {/* Breadcrumb */}
        <div className="container max-w-5xl mx-auto px-6 mb-8">
          <Breadcrumbs
            breadcrumbs={[
              { title: "Home", href: "/" },
              { title: "Kontak & Alamat", href: "/kontak" },
            ]}
          />
        </div>

        {/* Form Kirim Pesan */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white p-6 rounded-2xl shadow-sm border"
        >
          <h2 className="text-2xl font-semibold mb-4 text-emerald-800">
            Kirim Pesan
          </h2>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Nama Lengkap</label>
              <input
                type="text"
                className="w-full border rounded-lg px-3 py-2"
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
              />
              {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
            </div>

            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                className="w-full border rounded-lg px-3 py-2"
                value={data.email}
                onChange={(e) => setData("email", e.target.value)}
              />
              {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
            </div>

            <div>
              <label className="block mb-1 font-medium">Subjek</label>
              <input
                type="text"
                className="w-full border rounded-lg px-3 py-2"
                value={data.subject}
                onChange={(e) => setData("subject", e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Pesan</label>
              <textarea
                className="w-full border rounded-lg px-3 py-2 h-32"
                value={data.message}
                onChange={(e) => setData("message", e.target.value)}
              ></textarea>
              {errors.message && (
                <p className="text-red-600 text-sm">{errors.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={processing}
              className="bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-2 rounded-lg shadow"
            >
              {processing ? "Mengirim..." : "Kirim Pesan"}
            </button>
          </form>
        </motion.div>

        {/* Informasi Kontak */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white p-6 rounded-2xl shadow-sm border"
        >
          <h2 className="text-2xl font-semibold mb-4 text-emerald-800">
            Informasi Kontak
          </h2>

          <div className="space-y-4">
            <p className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-emerald-700 mt-1" />
              <span>
                <strong>Admin Pendaftaran:</strong> 0812-3456-7890 <br />
                <strong>Administrasi Umum:</strong> 0813-9876-5432
              </span>
            </p>

            <p className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-emerald-700 mt-1" />
              <span>
                admin@darulamin.sch.id <br />
                info@darulamin.sch.id
              </span>
            </p>
          </div>
        </motion.div>

        {/* Alamat */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-2xl shadow-sm border"
        >
          <h2 className="text-2xl font-semibold mb-4 text-emerald-800">
            Alamat Pesantren
          </h2>

          <p className="flex items-start gap-3 text-gray-700 mb-4">
            <MapPin className="w-5 h-5 text-emerald-700 mt-1" />
            Pondok Pesantren Darul Amin <br />
            Jl. Raya Pesantren No. 12, Desa Sukamaju <br />
            Kec. Cikalong, Kab. Bandung, 40195
          </p>

          <iframe
            className="w-full h-64 rounded-xl shadow"
            src="https://maps.google.com/maps?q=Pondok%20Pesantren%20Darul%20Amin&t=&z=13&ie=UTF8&iwloc=&output=embed"
            loading="lazy"
          ></iframe>
        </motion.div>

        {/* Jam Operasional */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-2xl shadow-sm border"
        >
          <h2 className="text-2xl font-semibold mb-4 text-emerald-800">
            Jam Operasional
          </h2>

          <p className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-emerald-700 mt-1" />
            <span className="text-gray-700">
              Senin – Jumat: 08.00 – 16.00 <br />
              Sabtu: 08.00 – 12.00 <br />
              Minggu & Hari Besar: Tutup
            </span>
          </p>
        </motion.div>

        {/* CTA WA */}
        <div className="text-center">
          <Link
            href="https://wa.me/6281234567890"
            target="_blank"
            className="inline-block bg-emerald-700 hover:bg-emerald-800 text-white px-8 py-3 rounded-xl text-lg font-medium shadow"
          >
            Hubungi Admin via WhatsApp
          </Link>
        </div>
      </div>
    </FrontendLayout>
  );
}