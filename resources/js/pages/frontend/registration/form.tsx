import { Head, useForm } from "@inertiajs/react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import FrontendLayout from "@/layouts/frontend-layout";
import { toast } from "sonner";
import { AlertTriangle, CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";

export default function RegistrationForm() {
    const { data, setData, post, processing, errors, reset } = useForm({
        full_name: "",
        nik: "",
        gender: "",
        birth_place: "",
        birth_date: "",
        address: "",
        previous_school: "",
        parent_name: "",
        parent_contact: "",
        payment_proof: null as File | null,
    });

    const [preview, setPreview] = useState<string | null>(null);
    const handleProofChange = (file: File | null) => {
        setData("payment_proof", file);
        if (file) {
            const url = URL.createObjectURL(file);
            setPreview(url);
        } else {
            setPreview(null);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("registration.submit"), {
            forceFormData: true,
            onStart: () => {
                toast.info('Sedang Memproses', {
                    icon: <Loader2 className="text-blue-500" />,
                    description: 'Mengirim Pendaftaran',
                });
            },
            onSuccess: () => {
                reset();
            },
            onError: () => {
                toast.error('Proses Gagal', {
                    icon: <AlertTriangle className="text-red-500" />,
                    description: 'Terjadi kesalahan, coba lagi 💥',
                });
            }
        });
    };

    return (
        <>
            <FrontendLayout>
                <Head title="Pendaftaran Santri" />

                <div className="container max-w-3xl mx-auto p-10">
                    <Card className="border-border mb-4 shadow-md">
                        <CardContent>
                            <div className="bg-emerald-50 border-l-4 border-emerald-800 p-4 rounded-md mb-6">
                                <h2 className="font-semibold text-lg text-emerald-700">Alur Pendaftaran Santri</h2>
                                <ol className="list-decimal pl-5 mt-2 space-y-1 text-sm">
                                    <li>Calon santri melakukan transfer biaya pendaftaran sebesar <b>Rp 200.000</b></li>
                                    <li>Transfer ke rekening berikut:</li>
                                    <ul className="pl-6 text-sm">
                                        <li><b>BANK BRI</b></li>
                                        <li>No. Rekening: <b>1234 5678 9012 345</b></li>
                                        <li>Atas Nama: <b>Pondok Pesantren Nurul Ilmi</b></li>
                                    </ul>
                                    <li>Simpan bukti transfer (foto atau PDF)</li>
                                    <li>Isi formulir pendaftaran dan unggah bukti transfer</li>
                                    <li>Pihak pesantren akan melakukan verifikasi dan dapat dicek melalui website.</li>
                                </ol>
                            </div>
                            <div className="mt-3  border-l-4 border-emerald-800 p-4 p-3 bg-emerald-50 rounded-lg flex justify-between items-center">
                                <div>
                                    <p className="text-sm">No. Rekening:</p>
                                    <p className="font-semibold text-lg select-all" id="nomorRekening">
                                        123456789012345
                                    </p>
                                    <p className="text-sm">BANK BRI - a/n Pondok Pesantren Nurul Ilmi</p>
                                </div>

                                <button
                                    type="button"
                                    className="bg-emerald-600 text-white px-3 py-1 rounded hover:bg-emerald-700"
                                    onClick={() => {
                                        navigator.clipboard.writeText("123456789012345");
                                        alert("Nomor rekening telah disalin!");
                                    }}
                                >
                                    Copy
                                </button>
                            </div>
                            <div className="mt-4 text-center">
                                <p className="font-semibold mb-2">Atau scan QRIS berikut:</p>
                                <img
                                    src="/images/qris.png"
                                    alt="QRIS Pembayaran"
                                    className="mx-auto w-56 h-56 rounded-lg shadow"
                                />
                                <a
                                    href="/images/qris.png"
                                    download
                                    className="inline-block mt-3 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                                >
                                    Download QRIS
                                </a>

                                <p className="text-xs text-gray-600 mt-1">
                                    Pastikan nama penerima sesuai sebelum menyelesaikan pembayaran
                                </p>
                            </div>

                        </CardContent>
                    </Card>
                    <Card className="border-border shadow-md">
                        <CardHeader>
                            <CardTitle className="text-xl font-bold">
                                Formulir Pendaftaran Calon Santri
                            </CardTitle>
                        </CardHeader>

                        <form onSubmit={submit}>
                            <CardContent className="space-y-6">
                                <div className="space-y-1">
                                    <Label>NIK</Label>
                                    <Input
                                        value={data.nik}
                                        maxLength={16}
                                        className="mt-2"
                                        onChange={(e) => setData("nik", e.target.value)}
                                    />
                                    {errors.nik && (
                                        <p className="text-red-600 text-sm">{errors.nik}</p>
                                    )}
                                </div>

                                {/* Nama Lengkap */}
                                <div className="space-y-1">
                                    <Label>Nama Lengkap</Label>
                                    <Input
                                        value={data.full_name}
                                        className="mt-2"
                                        onChange={(e) => setData("full_name", e.target.value)}
                                    />
                                    {errors.full_name && (
                                        <p className="text-red-600 text-sm">{errors.full_name}</p>
                                    )}
                                </div>

                                {/* Gender */}
                                <div className="space-y-1">
                                    <Label>Jenis Kelamin</Label>
                                    <select
                                        className="border mt-2 rounded-md p-2 w-full"
                                        value={data.gender}
                                        onChange={(e) => setData("gender", e.target.value)}
                                    >
                                        <option value="">-- Pilih --</option>
                                        <option value="male">Laki-laki</option>
                                        <option value="female">Perempuan</option>
                                    </select>
                                    {errors.gender && (
                                        <p className="text-red-600 text-sm">{errors.gender}</p>
                                    )}
                                </div>

                                {/* Tempat Lahir */}
                                <div className="space-y-1">
                                    <Label>Tempat Lahir</Label>
                                    <Input
                                        value={data.birth_place}
                                        className="mt-2"
                                        onChange={(e) => setData("birth_place", e.target.value)}
                                    />
                                    {errors.birth_place && (
                                        <p className="text-red-600 text-sm">{errors.birth_place}</p>
                                    )}
                                </div>

                                {/* Tanggal Lahir */}
                                <div className="space-y-1">
                                    <Label>Tanggal Lahir</Label>
                                    <Input
                                        type="date"
                                        value={data.birth_date}
                                        className="mt-2"
                                        onChange={(e) => setData("birth_date", e.target.value)}
                                    />
                                    {errors.birth_date && (
                                        <p className="text-red-600 text-sm">{errors.birth_date}</p>
                                    )}
                                </div>

                                {/* Alamat */}
                                <div className="space-y-1">
                                    <Label>Alamat</Label>
                                    <Textarea
                                        value={data.address}
                                        className="mt-2"
                                        onChange={(e) => setData("address", e.target.value)}
                                    />
                                    {errors.address && (
                                        <p className="text-red-600 text-sm">{errors.address}</p>
                                    )}
                                </div>

                                {/* Sekolah Asal */}
                                <div className="space-y-1">
                                    <Label>Sekolah Asal</Label>
                                    <Input
                                        value={data.previous_school}
                                        className="mt-2"
                                        onChange={(e) =>
                                            setData("previous_school", e.target.value)
                                        }
                                    />
                                    {errors.previous_school && (
                                        <p className="text-red-600 text-sm">
                                            {errors.previous_school}
                                        </p>
                                    )}
                                </div>

                                {/* Nama Orang Tua */}
                                <div className="space-y-1">
                                    <Label>Nama Orang Tua</Label>
                                    <Input
                                        value={data.parent_name}
                                        className="mt-2"
                                        onChange={(e) =>
                                            setData("parent_name", e.target.value)
                                        }
                                    />
                                    {errors.parent_name && (
                                        <p className="text-red-600 text-sm">
                                            {errors.parent_name}
                                        </p>
                                    )}
                                </div>

                                {/* Kontak Orang Tua */}
                                <div className="space-y-1">
                                    <Label>Kontak Orang Tua</Label>
                                    <Input
                                        value={data.parent_contact}
                                        className="mt-2"
                                        onChange={(e) =>
                                            setData("parent_contact", e.target.value)
                                        }
                                    />
                                    {errors.parent_contact && (
                                        <p className="text-red-600 text-sm">
                                            {errors.parent_contact}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-1">
                                    <Label>Bukti Transfer (Gambar atau PDF)</Label>
                                    <Input
                                        id="payment_proof"
                                        type="file"
                                        accept="image/*,application/pdf"
                                        className="mt-2"
                                        onChange={(e) => handleProofChange(e.target.files?.[0] ?? null)}
                                    />
                                    {/* PDF Viewer */}
                                    {preview && (
                                        <div className="mt-3">
                                            {data.payment_proof && data.payment_proof.type === "application/pdf" ? (
                                                <iframe
                                                    src={preview}
                                                    className="w-full h-64 border"
                                                ></iframe>
                                            ) : (
                                                <img
                                                    src={preview}
                                                    className="w-40 h-28 object-cover rounded-md border"
                                                />
                                            )}
                                        </div>
                                    )}

                                    {errors.payment_proof && (
                                        <p className="text-red-600 text-sm">{errors.payment_proof}</p>
                                    )}
                                </div>

                            </CardContent>

                            <CardFooter className="flex justify-end mt-4">
                                <Button type="submit" disabled={processing} className="bg-emerald-600 hover:bg-emerald-800">
                                    {processing ? "Mengirim..." : "Daftar Sekarang"}
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </div>
            </FrontendLayout>
        </>
    );
}
