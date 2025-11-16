import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import AppLayout from "@/layouts/app-layout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { route } from "ziggy-js";
import { toast } from "sonner";
import { useState } from "react";
import TiptapEditor from "@/components/TiptapEditor";
import { BreadcrumbItem } from "@/types";

interface Program {
    id: number;
    title: string;
    slug: string;
    short_description: string | null;
    description: string;
    icon: string | null;
    image: string | null;
    order: number;
    is_active: boolean;
}

export default function Edit({ program }: { program: Program }) {
    const { data, setData, processing, errors } = useForm({
        title: program.title || "",
        slug: program.slug || "",
        short_description: program.short_description || "",
        description: program.description || "",
        icon: program.icon || "",
        image: null as File | null,
        order: program.order || 0,
        is_active: program.is_active ?? true,
    });

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Program',
            href: '/admin/programs',
        },
        {
            title: 'Edit Program',
            href: `/admin/posts/edit/${program.id}`,
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

        const formData = new FormData();
        formData.append("_method", "PUT");
        formData.append("title", data.title);
        formData.append("slug", data.slug);
        formData.append("short_description", data.short_description || "");
        formData.append("description", data.description);
        formData.append("icon", data.icon || "");
        formData.append("order", data.order.toString());
        formData.append("is_active", data.is_active ? "1" : "0");

        if (data.image instanceof File) {
            formData.append("image", data.image);
        }

        router.post(route("admin.programs.update", program.id), formData, {
            forceFormData: true,
            onSuccess: () => toast.success("Program berhasil diperbarui ✨"),
            onError: (err) => {
                console.error("❌ Error saat update program:", err);
                toast.error("Gagal memperbarui program");
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit: ${program.title}`} />
            <div className="mx-auto w-full h-full bg-card p-6 shadow-sm">
                <div className="mb-4 flex items-center max-w-2xl mx-auto justify-between">
                    <h1 className="text-xl font-semibold">
                        Edit Program Pendidikan
                    </h1>
                    <Link href={route("admin.programs.index")}>
                        <Button variant="outline">Kembali</Button>
                    </Link>
                </div>

                <Card className="mx-auto max-w-2xl">
                    <CardHeader>
                        <CardTitle>Form Edit Program</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Judul */}
                            <div>
                                <Label htmlFor="title">Judul</Label>
                                <Input
                                    id="title"
                                    value={data.title}
                                    onChange={(e) =>
                                        handleNameSlugChange(e.target.value)
                                    }
                                    className="mt-2"
                                />
                                {errors.title && (
                                    <p className="text-sm text-red-500">
                                        {errors.title}
                                    </p>
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
                            </div>

                            {/* Deskripsi Singkat */}
                            <div>
                                <Label htmlFor="short_description">
                                    Deskripsi Singkat
                                </Label>
                                <Input
                                    id="short_description"
                                    value={data.short_description}
                                    onChange={(e) =>
                                        setData(
                                            "short_description",
                                            e.target.value
                                        )
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
                                {/* <textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                    className="w-full border rounded-md p-2 min-h-[120px]"
                                />
                                {errors.description && (
                                    <p className="text-sm text-red-500">
                                        {errors.description}
                                    </p>
                                )} */}
                                <TiptapEditor
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
                                    onChange={(e) =>
                                        setData("icon", e.target.value)
                                    }
                                    placeholder="Contoh: fa-solid fa-graduation-cap"
                                    className="mt-2"
                                />
                                {errors.icon && (
                                    <p className="text-sm text-red-500">
                                        {errors.icon}
                                    </p>
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
                                        setData(
                                            "order",
                                            parseInt(e.target.value)
                                        )
                                    }
                                    className="mt-2"
                                />
                            </div>

                            {/* Gambar */}
                            <div>
                                <Label htmlFor="image">
                                    Ganti Gambar (Opsional)
                                </Label>
                                <Input
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        handleImageChange(
                                            e.target.files?.[0] ?? null
                                        )
                                    }
                                    className="mt-2"
                                />
                                {(preview || program.image) && (
                                    <div className="mt-3">
                                        <p className="text-sm text-muted-foreground mb-1">
                                            Gambar saat ini:
                                        </p>
                                        <img
                                            src={
                                                preview ||
                                                `/storage/${program.image}`
                                            }
                                            alt={program.title}
                                            className="w-56 rounded-md border"
                                        />
                                    </div>
                                )}
                                {errors.image && (
                                    <p className="text-sm text-red-500">
                                        {errors.image}
                                    </p>
                                )}
                            </div>

                            {/* Status Aktif */}
                            <div className="flex items-center justify-between rounded-md border p-3">
                                <div>
                                    <Label htmlFor="is_active">
                                        Aktifkan Program
                                    </Label>
                                    <p className="text-xs text-muted-foreground">
                                        Nonaktifkan jika belum ingin ditampilkan
                                        di halaman depan.
                                    </p>
                                </div>
                                <Switch
                                    id="is_active"
                                    checked={data.is_active}
                                    onCheckedChange={(val) =>
                                        setData("is_active", val)
                                    }
                                />
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
