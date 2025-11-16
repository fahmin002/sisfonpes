import { Head, Link, usePage } from "@inertiajs/react";
import FrontendLayout from "@/layouts/frontend-layout";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function EducationProgramsPage({ programs }) {
    // const { props }: any = usePage();
    // const programs = props.programs || [];

    return (
        <FrontendLayout>
            <Head title="Program Pendidikan" />

            {/* Hero Section */}
            <section className="bg-emerald-800 text-white py-16">
                <div className="container max-w-5xl mx-auto px-6">
                    <h1 className="text-4xl font-bold mb-4">Program Pendidikan</h1>
                    <p className="text-lg max-w-3xl opacity-90">
                        Berbagai program pendidikan yang dirancang untuk membentuk santri
                        menjadi pribadi berakhlak, berilmu, dan berdaya guna.
                    </p>
                </div>
            </section>

            {/* List Program */}
            <div className="min-h-screen bg-gray-50 py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl font-bold text-emerald-800 mb-10 text-center">
                        Program Pendidikan
                    </h1>


                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {programs.data.map((program) => (
                            <Link
                                key={program.id}
                                href={`/program-pendidikan/${program.slug}`}
                                className="group block bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden border border-gray-200"
                            >
                                {program.image && (
                                    <img
                                        src={program.image}
                                        alt={program.title}
                                        className="w-full h-48 object-cover group-hover:scale-105 transition"
                                    />
                                )}
                                <div className="p-6">
                                    <h2 className="text-xl font-semibold text-emerald-800 group-hover:text-emerald-600 transition mb-2">
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
                    <div className="mt-10 flex justify-center space-x-2">
                        {programs.links.map((link, i) => (
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
                </div>
            </div>
        </FrontendLayout>
    );
}
