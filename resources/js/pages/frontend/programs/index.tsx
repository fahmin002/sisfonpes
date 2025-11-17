import { Head, Link } from "@inertiajs/react";
import FrontendLayout from "@/layouts/frontend-layout";
import { motion } from "framer-motion";
import { Breadcrumbs } from "@/components/breadcrumbs";
import FrontSearchBar from "@/components/frontend/FrontSearchBar";

export default function EducationProgramsPage({ programs, filters }) {
    return (
        <FrontendLayout>
            <Head title="Program Pendidikan" />

            {/* Hero Section */}
            <section className="relative text-white w-full h-64 mb-10 rounded-xl overflow-hidden shadow-md">
                <div className="absolute inset-0 bg-emerald-800 flex items-center px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="container max-w-5xl mx-auto">
                        <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                            Program Pendidikan
                        </h1>
                        <p className="text-base md:text-lg max-w-3xl opacity-90">
                            Beragam program pendidikan yang disusun untuk membentuk santri
                            berakhlak mulia, berilmu, dan siap berkontribusi bagi masyarakat.
                        </p>
                    </motion.div>
                </div>
            </section>
            <section className="mb-10 container max-w-5xl">
                <FrontSearchBar
                    routeName="/program-pendidikan"
                    placeholder="Cari Program..."
                    initialValue={filters?.search || ""}
                />
            </section>
            {/* Breadcrumb */}
            <div className="container max-w-5xl px-6">
                <Breadcrumbs
                    breadcrumbs={[
                        { title: "Home", href: "/" },
                        { title: "Program Pendidikan", href: "/program-pendidikan" },
                    ]}
                />
            </div>



            {/* Content */}
            <div className="bg-gray-50 py-16 px-4">
                <div className="max-w-7xl mx-auto">

                    {/* List Program */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {programs.data.map((program) => (
                            <Link
                                key={program.id}
                                href={`/program-pendidikan/${program.slug}`}
                                className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition overflow-hidden"
                            >
                                {program.image && (
                                    <img
                                        src={`/storage/${program.image}`}
                                        alt={program.title}
                                        className="w-full h-48 object-cover"
                                    />
                                )}

                                <div className="p-6">
                                    <h2 className="text-xl font-semibold text-emerald-800 mb-2">
                                        {program.title}
                                    </h2>

                                    {program.short_description && (
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            {program.short_description}
                                        </p>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="mt-12 flex justify-center flex-wrap gap-2">
                        {programs.links.map((link, i) => (
                            <Link
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

                </div>
            </div>
        </FrontendLayout>
    );
}
