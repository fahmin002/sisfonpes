import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head, Link, useForm } from "@inertiajs/react";
import { toast } from "sonner";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        full_name: "",
        gender: "",
        birth_place: "",
        birth_date: "",
        address: "",
        previous_school: "",
        parent_name: "",
        parent_contact: "",
    });

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
            <div className="mx-auto w-full max-w-6xl rounded-xl border border-border/50 bg-card p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Tambah Pendaftar</h1>
                    <Link href="/admin/registrations">
                        <Button variant="outline">Kembali</Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Formulir Pendaftaran</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
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
