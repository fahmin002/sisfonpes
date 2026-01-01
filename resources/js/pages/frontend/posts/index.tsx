import { Head, Link, usePage } from "@inertiajs/react";
import FrontendLayout from "@/layouts/frontend-layout";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { motion } from "framer-motion";
import FrontSearchBar from "@/components/frontend/FrontSearchBar";

export default function PostsIndex() {
    const { props }: any = usePage();
    const posts = props.posts;
    const filters = props.filters;

    return (
        <FrontendLayout>

            <Head title="Berita & Kegiatan" />

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
                            Berita & Kegiatan
                        </h1>
                        <p className="text-lg text-emerald-50 max-w-3xl opacity-90">
                            Kumpulan informasi terbaru dari Pondok Pesantren Darul Amin.
                        </p>
                    </motion.div>
                </div>
            </section>
            <section className="mb-10 container max-w-5xl">
                <FrontSearchBar
                    routeName="/berita"
                    placeholder="Cari Berita..."
                    initialValue={filters?.search || ""}
                />
            </section>
            {/* Breadcrumb */}
            <div className="container max-w-5xl px-6 mb-8">
                <Breadcrumbs
                    breadcrumbs={[
                        { title: "Home", href: "/" },
                        { title: "Berita dan Kegiatan", href: "/berita" },
                    ]}
                />
            </div>
            <section className="space-y-10">
                {/* List Posts */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.data.map((post) => (
                        <Link
                            key={post.id}
                            href={`/berita/${post.id}`}
                            className="group bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition border border-gray-200"
                        >
                            {post.thumbnail && (
                                <img
                                    src={`/storage/${post.thumbnail}`}
                                    alt={post.title}
                                    className="w-full h-48 object-cover group-hover:scale-105 transition"
                                />
                            )}

                            <div className="p-6">
                                <h2 className="text-lg font-semibold text-emerald-800 group-hover:text-emerald-600 transition">
                                    {post.title}
                                </h2>

                                {post.excerpt && (
                                    <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                                        {post.excerpt}
                                    </p>
                                )}

                                <p className="text-xs text-gray-400 mt-4">
                                    {post.published_at
                                        ? new Date(post.published_at).toLocaleDateString("id-ID")
                                        : ""}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-6 space-x-2">
                    {posts.links.map((link, i) => (
                        <Link
                            key={i}
                            className={`px-4 py-2 rounded-lg border text-sm ${link.active
                                ? "bg-emerald-800 text-white border-emerald-800"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                                }`}
                            href={link.url || "#"}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            </section>
        </FrontendLayout>
    );
}
