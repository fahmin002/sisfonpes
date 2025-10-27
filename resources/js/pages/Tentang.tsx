import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import FrontendLayout from "@/layouts/FrontendLayout";
import { CheckCircle } from "lucide-react";

export default function Tentang() {
    return (
        <FrontendLayout title="Tentang Kami">
            <main className="min-h-screen bg-white text-gray-800">
                {/* Header */}
                <section className="bg-gradient-to-b from-emerald-700 to-emerald-800 text-white py-20 text-center">
                    <h1 className="text-4xl font-bold">Tentang Kami</h1>
                    <p className="text-emerald-100 mt-2 text-lg">
                        Mengenal lebih dekat Pondok Pesantren Darul Amin
                    </p>
                </section>

                {/* Sejarah Singkat */}
                <section className="py-16">
                    <div className="max-w-4xl mx-auto text-center space-y-6">
                        <h2 className="text-2xl font-semibold text-emerald-800">Sejarah Singkat</h2>
                        <p className="leading-relaxed text-gray-700">
                            Pondok Pesantren Darul Amin didirikan pada tanggal 20 Oktober 1985 oleh Al-Mukarram
                            KH. Fulan bin Fulan, seorang ulama kharismatik yang memiliki cita-cita luhur untuk
                            mencetak generasi Qur’ani yang berwawasan modern dan berakhlakul karimah.
                            Berawal dari sebuah surau kecil dengan segelintir santri, pesantren ini terus
                            berkembang pesat berkat keikhlasan pendiri dan dukungan masyarakat. Kini,
                            Pondok Pesantren Darul Amin telah menjadi lembaga pendidikan Islam terkemuka
                            yang menaungi ribuan santri dari berbagai penjuru nusantara, dengan fasilitas
                            modern yang menunjang proses pendidikan yang komprehensif.
                        </p>
                    </div>
                </section>

                {/* Visi & Misi */}
                <section className="bg-gray-50 py-20">
                    <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
                        {/* Visi */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Visi</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>
                                    Menjadi lembaga pendidikan Islam unggulan yang melahirkan generasi pemimpin masa depan yang
                                    hafal Al-Qur'an, menguasai ilmu pengetahuan dan teknologi, serta berpegang teguh pada
                                    nilai-nilai Ahlussunnah wal Jama'ah.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Misi */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Misi</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3">
                                    {[
                                        "Menyelenggarakan pendidikan formal dan non-formal yang terintegrasi antara kurikulum nasional dan kepesantrenan.",
                                        "Membina santri melalui program Tahfidzul Qur'an yang sistematis dan terukur.",
                                        "Mengembangkan potensi santri dalam bidang dakwah, kepemimpinan, dan kewirausahaan.",
                                        "Menciptakan lingkungan pesantren yang aman, nyaman, dan Islami sebagai miniatur masyarakat madani.",
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-emerald-700 mt-0.5" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Pimpinan Pondok */}
                <section className="py-20">
                    <div className="max-w-5xl mx-auto text-center">
                        <h2 className="text-2xl font-semibold text-emerald-800 mb-12">
                            Pimpinan Pondok
                        </h2>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                {
                                    name: "KH. Abdullah Fikri, M.A.",
                                    role: "Pimpinan Pondok",
                                    img: "https://via.placeholder.com/300x350/cccccc/000000?text=Foto+Pimpinan",
                                },
                                {
                                    name: "Dr. H. Muhammad Ilyas",
                                    role: "Ketua Yayasan",
                                    img: "https://via.placeholder.com/300x350/cccccc/000000?text=Foto+Ketua+Yayasan",
                                },
                                {
                                    name: "Ust. Ahmad Zarkasyi, S.Pd.I",
                                    role: "Kepala Madrasah Aliyah",
                                    img: "https://via.placeholder.com/300x350/cccccc/000000?text=Foto+Kepala+Madrasah",
                                },
                            ].map((p, i) => (
                                <Card key={i} className="overflow-hidden">
                                    <img src={p.img} alt={p.name} className="w-full h-[350px] object-cover" />
                                    <CardContent className="pt-4 pb-6">
                                        <h4 className="font-semibold text-lg text-emerald-800">{p.name}</h4>
                                        <p className="text-gray-500">{p.role}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                <Separator className="my-10 max-w-4xl mx-auto" />
            </main>
        </FrontendLayout>
    );
}
