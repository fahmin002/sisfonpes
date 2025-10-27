import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ImagePlus } from 'lucide-react';
import { route } from 'ziggy-js';

export default function Create() {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Galeri',
            href: '/admin/galleries',
        },
        {
            title: 'Tambah Foto',
            href: '/admin/galleries/create',
        },
    ];
    const { toast } = useToast();
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        image: null as File | null,
        is_published: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.galleries.store'), {
            forceFormData: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Foto Galeri" />
            <div className="mx-auto w-full max-w-5xl rounded-xl border border-border/50 bg-card p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-xl font-semibold">
                        Tambah Foto Galeri
                    </h1>
                    <Link href={route('admin.galleries.index')}>
                        <Button variant="outline">Kembali</Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Form Tambah Foto</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Judul */}
                            <div>
                                <Label htmlFor="title" className="mb-2">
                                    Judul Foto
                                </Label>
                                <Input
                                    id="title"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData('title', e.target.value)
                                    }
                                    placeholder="Masukkan judul atau nama kegiatan"
                                    className="mt-2"
                                />
                                {errors.title && (
                                    <p className="text-sm text-red-500">
                                        {errors.title}
                                    </p>
                                )}
                            </div>

                            {/* Deskripsi */}
                            <div>
                                <Label htmlFor="description">Deskripsi</Label>
                                <Textarea
                                    id="description"
                                    rows={4}
                                    value={data.description}
                                    onChange={(e) =>
                                        setData('description', e.target.value)
                                    }
                                    placeholder="Tuliskan keterangan atau cerita singkat tentang foto ini..."
                                    className="mt-2"
                                />
                                {errors.description && (
                                    <p className="text-sm text-red-500">
                                        {errors.description}
                                    </p>
                                )}
                            </div>

                            {/* Upload gambar */}
                            <div>
                                <Label htmlFor="image">Upload Gambar</Label>
                                <Input
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        setData(
                                            'image',
                                            e.target.files?.[0] ?? null,
                                        )
                                    }
                                    className="mt-2"
                                />
                                {errors.image && (
                                    <p className="text-sm text-red-500">
                                        {errors.image}
                                    </p>
                                )}
                            </div>

                            {/* Checkbox publikasi */}
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="is_published"
                                    checked={data.is_published}
                                    onCheckedChange={(checked) =>
                                        setData(
                                            'is_published',
                                            Boolean(checked),
                                        )
                                    }
                                />
                                <Label htmlFor="is_published">
                                    Publikasikan sekarang
                                </Label>
                            </div>

                            {/* Tombol submit */}
                            <Button type="submit" disabled={processing}>
                                <ImagePlus className="mr-2 h-4 w-4" />
                                Simpan Foto
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
