import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";
import { toast } from "sonner";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
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
            // const reader = new FileReader();
            // reader.onloadend = () => setPreview(reader.result as string);
            // reader.readAsDataURL(file);
            const url = URL.createObjectURL(file);
            setPreview(url);
        } else {
            setPreview(null);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.registrations.store"), {
            onSuccess: () => toast.success("Pendaftar berhasil ditambahkan."),
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: "Pendaftaran Santri", href: "/admin/registrations" },
        { title: "Tambah Pendaftar", href: "/admin/registrations/create" },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Pendaftar" />
            <div className="mx-auto w-full h-full bg-card p-6 shadow-sm">
                <div className="mb-4 flex items-center max-w-2xl mx-auto justify-between">
                    <h1 className="text-xl font-semibold">Tambah Pendaftar</h1>
                    <Link href="/admin/registrations">
                        <Button variant="outline">Kembali</Button>
                    </Link>
                </div>

                <Card className="mx-auto max-w-2xl">
                    <CardHeader>
                        <CardTitle>Formulir Pendaftaran</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
                            <div>
                                <Label>NIK</Label>
                                <Input
                                    id="nik"
                                    value={data.nik}
                                    onChange={(e) => setData("nik", e.target.value)}
                                    className="mt-2"
                                    maxLength={16}
                                />
                                {errors.nik && <p className="text-red-500 text-sm">{errors.nik}</p>}
                            </div>
                            <div>
                                <Label>Nama Lengkap</Label>
                                <Input
                                    value={data.full_name}
                                    onChange={(e) => setData("full_name", e.target.value)}
                                    className="mt-2"
                                />
                                {errors.full_name && <p className="text-red-500 text-sm">{errors.full_name}</p>}
                            </div>

                            <div>
                                <Label>Jenis Kelamin</Label>
                                <select
                                    className="mt-2 w-full rounded-md border bg-background p-2"
                                    value={data.gender}
                                    onChange={(e) => setData("gender", e.target.value)}
                                >
                                    <option value="">Pilih</option>
                                    <option value="male">Laki-laki</option>
                                    <option value="female">Perempuan</option>
                                </select>
                                {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
                            </div>

                            <div>
                                <Label>Tempat Lahir</Label>
                                <Input
                                    value={data.birth_place}
                                    onChange={(e) => setData("birth_place", e.target.value)}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <Label>Tanggal Lahir</Label>
                                <Input
                                    type="date"
                                    value={data.birth_date}
                                    onChange={(e) => setData("birth_date", e.target.value)}
                                    className="mt-2"
                                />
                            </div>

                            <div className="col-span-2">
                                <Label>Alamat</Label>
                                <Input
                                    value={data.address}
                                    onChange={(e) => setData("address", e.target.value)}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <Label>Sekolah Asal (Opsional)</Label>
                                <Input
                                    value={data.previous_school}
                                    onChange={(e) => setData("previous_school", e.target.value)}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <Label>Nama Orang Tua / Wali</Label>
                                <Input
                                    value={data.parent_name}
                                    onChange={(e) => setData("parent_name", e.target.value)}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <Label>Kontak Orang Tua</Label>
                                <Input
                                    value={data.parent_contact}
                                    onChange={(e) => setData("parent_contact", e.target.value)}
                                    className="mt-2"
                                />
                            </div>
                            {/* Input file for payment proof */}
                            <div>
                                <Label>Bukti Pembayaran (Opsional)</Label>
                                <Input
                                    id="payment_proof"
                                    type="file"
                                    onChange={(e) => handleProofChange(e.target.files?.[0] ?? null)}
                                    className="mt-2"
                                    accept="image/*,application/pdf"
                                />
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

                                {errors.payment_proof && <p className="text-red-500 text-sm">{errors.payment_proof}</p>}
                            </div>

                            <div className="col-span-2">
                                <Button type="submit" disabled={processing}>
                                    Simpan
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
