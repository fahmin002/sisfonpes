import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AppLayout from "@/layouts/app-layout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { route } from "ziggy-js";
import { toast } from "sonner";

interface Program {
    id: number;
    title: string;
    description: string;
    image: string | null;
    order: number;
}

export default function Edit({ program }: { program: Program }) {
    const { data, setData, put, processing, errors } = useForm({
        title: program.title,
        description: program.description,
        order: program.order,
        image: null as File | null,
    });


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('_method', 'PUT'); // spoof PUT agar Laravel paham

        formData.append('title', data.title.trim());
        formData.append('description', data.description.trim());


        if (data.image instanceof File) {
            formData.append('image', data.image);
        }

        router.post(route('admin.programs.update', program.id), formData, {
            forceFormData: true,
            onError: (err) => {
                console.error('❌ Error saat update program:', err);
                toast.error('Gagal memperbarui program');
            },
        });
    };

    return (
        <AppLayout>
            <Head title={`Edit: ${program.title}`} />
            <div className="mx-auto w-full h-full bg-card p-6 shadow-sm">
                <div className="mb-4 flex items-center max-w-2xl mx-auto justify-between">
                    <h1 className="text-xl font-semibold">Edit Program</h1>
                    <Link href={route("admin.programs.index")}>
                        <Button variant="outline">Kembali</Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Form Edit Program</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="title">Judul</Label>
                                <Input
                                    id="title"
                                    value={data.title}
                                    onChange={(e) => setData("title", e.target.value)}
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
                                    className="w-full border rounded-md p-2 min-h-[120px]"
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
                                />
                            </div>

                            <div>
                                <Label htmlFor="image">Ganti Gambar (opsional)</Label>
                                <Input
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setData("image", e.target.files?.[0] ?? null)}
                                />
                                {program.image && (
                                    <div className="mt-3">
                                        <p className="text-sm text-muted-foreground mb-1">
                                            Gambar saat ini:
                                        </p>
                                        <img
                                            src={`/storage/${program.image}`}
                                            alt={program.title}
                                            className="w-56 rounded-md border"
                                        />
                                    </div>
                                )}
                                {errors.image && (
                                    <p className="text-sm text-red-500">{errors.image}</p>
                                )}
                            </div>

                            <Button type="submit" disabled={processing}>
                                Perbarui
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
