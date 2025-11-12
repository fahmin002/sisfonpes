import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AppLayout from "@/layouts/app-layout";
import { Head, Link, useForm } from "@inertiajs/react";
import { route } from "ziggy-js";
import { toast } from "sonner";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        description: "",
        order: 0,
        image: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route("admin.programs.store"), {
            forceFormData: true,
            onSuccess: () => toast.success("Program berhasil ditambahkan."),
            onError: () => toast.error("Gagal menambahkan program."),
        });
    };

    return (
        <AppLayout>
            <Head title="Tambah Program Pendidikan" />
            <div className="mx-auto w-full h-full bg-card p-6 shadow-sm">
                <div className="mb-4 flex items-center max-w-2xl mx-auto justify-between">
                    <h1 className="text-xl font-semibold">Tambah Program Baru</h1>
                    <Link href={route("admin.programs.index")}>
                        <Button variant="outline">Kembali</Button>
                    </Link>
                </div>

                <Card className='mx-auto max-w-2xl'>
                    <CardHeader>
                        <CardTitle>Form Program</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="title">Judul</Label>
                                <Input
                                    id="title"
                                    value={data.title}
                                    onChange={(e) => setData("title", e.target.value)}
                                    placeholder="Judul program"
                                    className="mt-2"
                                />
                                {errors.title && (
                                    <p className="text-sm text-red-500">{errors.title}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="description">Deskripsi</Label>
                                <textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData("description", e.target.value)}
                                    placeholder="Deskripsi program"
                                    className="w-full mt-2 border rounded-md p-2 min-h-[120px]"
                                />
                                {errors.description && (
                                    <p className="text-sm text-red-500">{errors.description}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="order">Urutan</Label>
                                <Input
                                    id="order"
                                    type="number"
                                    value={data.order}
                                    onChange={(e) => setData("order", parseInt(e.target.value))}
                                    className="mt-2"
                                />
                                {errors.order && (
                                    <p className="text-sm text-red-500">{errors.order}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="image">Gambar (opsional)</Label>
                                <Input
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setData("image", e.target.files?.[0] ?? null)}
                                    className="mt-2"
                                />
                                {errors.image && (
                                    <p className="text-sm text-red-500">{errors.image}</p>
                                )}
                            </div>

                            <Button type="submit" disabled={processing}>
                                Simpan
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
