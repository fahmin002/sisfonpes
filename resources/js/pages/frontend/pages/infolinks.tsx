import { Head, Link } from "@inertiajs/react";
import FrontendLayout from "@/layouts/frontend-layout";
import { motion } from "framer-motion";
import { Breadcrumbs } from "@/components/breadcrumbs";

export default function InfoLinksPage({ infoLinks }) {
    return (
        <FrontendLayout>
            <Head title="Informasi Penting" />

            {/* Hero Section */}
            <section className="relative text-white w-full h-64 mb-10 rounded-xl overflow-hidden shadow-md">
                <div className="absolute inset-0 bg-emerald-800 flex items-center px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="container max-w-5xl mx-auto"
                    >
                        <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                            Informasi Penting
                        </h1>
                        <p className="text-base md:text-lg max-w-3xl opacity-90">
                            Kumpulan tautan dan informasi resmi terkait kegiatan, kebijakan, dan pengumuman pesantren.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Breadcrumb */}
            <div className="container max-w-5xl px-6 mb-10">
                <Breadcrumbs
                    breadcrumbs={[
                        { title: "Home", href: "/" },
                        { title: "Informasi Penting", href: "/informasi" },
                    ]}
                />
            </div>

            {/* Content Grid */}
            <div className="container max-w-6xl mx-auto px-4 pb-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

                    {infoLinks.map((info) => (
                        <motion.div
                            key={info.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <Link
                                href={`/info/${info.slug}`}
                                className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition overflow-hidden block"
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={info.thumbnail ? `/storage/${info.thumbnail}` : "/images/default-thumbnail.jpg"}
                                        alt={info.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>

                                <div className="p-6">
                                    <h2 className="text-xl font-semibold text-emerald-800 mb-2">
                                        {info.title}
                                    </h2>

                                    {info.excerpt && (
                                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                                            {info.excerpt}
                                        </p>
                                    )}
                                </div>
                            </Link>
                        </motion.div>
                    ))}

                </div>
            </div>
        </FrontendLayout>
    );
}
