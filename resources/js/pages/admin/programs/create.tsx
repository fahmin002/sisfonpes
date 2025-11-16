import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import AppLayout from "@/layouts/app-layout";
import { Head, Link, useForm } from "@inertiajs/react";
import { route } from "ziggy-js";
import { toast } from "sonner";
import { useState } from "react";
import TiptapFullEditor from "@/components/TiptapEditor";
import { BreadcrumbItem } from "@/types";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        slug: "",
        short_description: "",
        description: "",
        icon: "",
        order: 0,
        image: null as File | null,
        is_active: true,
    });
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Program',
            href: '/admin/programs',
        },
        {
            title: 'Tambah Program',
            href: '/admin/posts/create',
        },
    ];
    const [preview, setPreview] = useState<string | null>(null);

    const handleNameSlugChange = (value: string) => {
        setData("title", value);
        const slug = value
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");
        setData("slug", slug);
    };

    const handleImageChange = (file: File | null) => {
        setData("image", file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result as string);
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route("admin.programs.store"), {
            forceFormData: true,
            onSuccess: () => {
                toast.success("Program berhasil ditambahkan.");
                setPreview(null);
            },
            onError: () => toast.error("Gagal menambahkan program."),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs} >
            <Head title="Tambah Program Pendidikan" />
            <div className="mx-auto w-full h-full bg-card p-6 shadow-sm">
                <div className="mb-4 flex items-center max-w-2xl mx-auto justify-between">
                    <h1 className="text-xl font-semibold">Tambah Program Baru</h1>
                    <Link href={route("admin.programs.index")}>
                        <Button variant="outline">Kembali</Button>
                    </Link>
                </div>

                <Card className="mx-auto max-w-2xl">
                    <CardHeader>
                        <CardTitle>Form Program</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Judul */}
                            <div>
                                <Label htmlFor="title">Judul</Label>
                                <Input
                                    id="title"
                                    value={data.title}
                                    onChange={(e) => handleNameSlugChange(e.target.value)}
                                    placeholder="Judul program"
                                    className="mt-2"
                                />
                                {errors.title && (
                                    <p className="text-sm text-red-500">{errors.title}</p>
                                )}
                            </div>

                            {/* Slug */}
                            <div>
                                <Label htmlFor="slug">Slug</Label>
                                <Input
                                    id="slug"
                                    value={data.slug}
                                    disabled
                                    className="mt-2"
                                />
                                {errors.slug && (
                                    <p className="text-sm text-red-500">{errors.slug}</p>
                                )}
                            </div>

                            {/* Deskripsi Singkat */}
                            <div>
                                <Label htmlFor="short_description">Deskripsi Singkat</Label>
                                <Input
                                    id="short_description"
                                    value={data.short_description}
                                    onChange={(e) =>
                                        setData("short_description", e.target.value)
                                    }
                                    placeholder="Deskripsi singkat program"
                                    className="mt-2"
                                />
                                {errors.short_description && (
                                    <p className="text-sm text-red-500">
                                        {errors.short_description}
                                    </p>
                                )}
                            </div>

                            {/* Deskripsi */}
                            <div>
                                <TiptapFullEditor
                                    label="Deskripsi Lengkap"
                                    value={data.description}
                                    onChange={(html) => {
                                        setData("description", html)
                                    }}
                                    error={errors.description}
                                />
                            </div>

                            {/* Ikon */}
                            <div>
                                <Label htmlFor="icon">Ikon (Opsional)</Label>
                                <Input
                                    id="icon"
                                    value={data.icon}
                                    onChange={(e) => setData("icon", e.target.value)}
                                    placeholder="Contoh: fa-solid fa-book-quran"
                                    className="mt-2"
                                />
                                <p className="text-xs text-muted-foreground mt-1">
                                    Gunakan nama class dari FontAwesome (misal:{" "}
                                    <code>fa-solid fa-graduation-cap</code>)
                                </p>
                                {errors.icon && (
                                    <p className="text-sm text-red-500">{errors.icon}</p>
                                )}
                            </div>

                            {/* Urutan */}
                            <div>
                                <Label htmlFor="order">Urutan</Label>
                                <Input
                                    id="order"
                                    type="number"
                                    value={data.order}
                                    onChange={(e) =>
                                        setData("order", parseInt(e.target.value))
                                    }
                                    className="mt-2"
                                />
                                {errors.order && (
                                    <p className="text-sm text-red-500">{errors.order}</p>
                                )}
                            </div>

                            {/* Gambar */}
                            <div>
                                <Label htmlFor="image">Gambar (Opsional)</Label>
                                <Input
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        handleImageChange(e.target.files?.[0] ?? null)
                                    }
                                    className="mt-2"
                                />
                                {preview && (
                                    <div className="mt-3">
                                        <img
                                            src={preview}
                                            alt="Preview"
                                            className="w-40 h-28 object-cover rounded-md border"
                                        />
                                    </div>
                                )}
                                {errors.image && (
                                    <p className="text-sm text-red-500">{errors.image}</p>
                                )}
                            </div>

                            {/* Status Aktif */}
                            <div className="flex items-center justify-between rounded-md border p-3">
                                <div>
                                    <Label htmlFor="is_active">Aktifkan Program</Label>
                                    <p className="text-xs text-muted-foreground">
                                        Nonaktifkan jika program belum ingin ditampilkan di publik.
                                    </p>
                                </div>
                                <Switch
                                    id="is_active"
                                    checked={data.is_active}
                                    onCheckedChange={(val) => setData("is_active", val)}
                                />
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
