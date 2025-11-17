import { Head, Link } from "@inertiajs/react";
import FrontendLayout from "@/layouts/frontend-layout";
import { motion } from "framer-motion";
import { Breadcrumbs } from "@/components/breadcrumbs";

export default function InfoLinkDetail({ info }) {
    return (
        <FrontendLayout>
            <Head title={info.title} />


            {/* Page Container */}
            <div className="container max-w-4xl mx-auto px-6 pb-20">
            {/* Breadcrumb */}
            <div className="container max-w-4xl mt-6 mb-6">
                <Breadcrumbs
                    breadcrumbs={[
                        { title: "Home", href: "/" },
                        { title: "Informasi Penting", href: "/info" },
                        { title: info.title, href: `/info/${info.slug}` },
                    ]}
                />
            </div>

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl md:text-4xl font-bold text-emerald-900 mb-3"
                >
                    {info.title}
                </motion.h1>

                {/* Meta info */}
                {info.published_at && (
                    <p className="text-sm text-gray-500 mb-6">
                        Dipublikasikan pada{" "}
                        {new Date(info.published_at).toLocaleDateString("id-ID")}
                    </p>
                )}

                {/* Thumbnail (optional) */}
                {info.thumbnail && (
                    <motion.img
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        src={`/storage/${info.thumbnail}`}
                        alt={info.title}
                        className="w-full h-64 object-cover rounded-xl shadow mb-10"
                    />
                )}

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="prose prose-emerald max-w-none"
                    dangerouslySetInnerHTML={{ __html: info.content }}
                />

                {/* Back button */}
                <div className="mt-12">
                    <Link
                        href="/info"
                        className="inline-block px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl shadow transition"
                    >
                        ← Kembali ke Daftar Informasi
                    </Link>
                </div>
            </div>
        </FrontendLayout>
    );
}
