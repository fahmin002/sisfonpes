import FrontendLayout from "@/layouts/frontend-layout";
import { Head } from "@inertiajs/react";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
    return (
        <FrontendLayout>
            <Head title="Tentang Kami" />

            <section className="bg-emerald-800 text-white py-16">
                <div className="container max-w-5xl mx-auto px-6">
                    <h1 className="text-4xl font-bold mb-4">Tentang Kami</h1>
                    <p className="text-lg opacity-90 max-w-3xl">
                        Mengenal lebih dekat Pondok Pesantren Darul Amin, tempat pendidikan
                        dan pembinaan karakter yang berlandaskan nilai-nilai Islam.
                    </p>
                </div>
            </section>

            <section className="py-16">
                <div className="container max-w-5xl mx-auto px-6 space-y-12">

                    {/* Profil Singkat */}
                    <Card className="shadow-md">
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
                    <Card className="shadow-md">
                        <CardContent className="p-8">
                            <h2 className="text-2xl font-bold text-emerald-800 mb-4">Visi</h2>
                            <p className="text-gray-700 leading-relaxed">
                                “Membentuk generasi Muslim yang berakhlak mulia, berilmu, beramal,
                                serta mampu menghadapi tantangan zaman.”
                            </p>
                        </CardContent>
                    </Card>

                    {/* Misi */}
                    <Card className="shadow-md">
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
                    <Card className="shadow-md">
                        <CardContent className="p-8">
                            <h2 className="text-2xl font-bold text-emerald-800 mb-4">
                                Pengasuh & Struktur
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Di bawah bimbingan para ustadz dan pengasuh yang berpengalaman,
                                pesantren menjalankan sistem pendidikan yang terarah, profesional,
                                dan penuh perhatian terhadap perkembangan santri.
                            </p>

                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="bg-gray-50 p-4 rounded-lg border">
                                    <p className="font-semibold text-emerald-800">
                                        KH. Nama Pengasuh
                                    </p>
                                    <p className="text-gray-600 text-sm">Pengasuh Pesantren</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg border">
                                    <p className="font-semibold text-emerald-800">
                                        Ust. Nama Lengkap
                                    </p>
                                    <p className="text-gray-600 text-sm">Wakil Pengasuh</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg border">
                                    <p className="font-semibold text-emerald-800">
                                        Ustdz. Nama Lengkap
                                    </p>
                                    <p className="text-gray-600 text-sm">Koordinator Pendidikan</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                </div>
            </section>
        </FrontendLayout>
    );
}
