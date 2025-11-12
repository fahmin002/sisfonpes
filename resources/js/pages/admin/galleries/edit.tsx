import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Save } from 'lucide-react';
import { route } from 'ziggy-js';
import { Switch } from '@/components/ui/switch';

export default function Edit({ gallery }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Galeri',
            href: '/admin/galleries',
        },
        {
            title: 'Edit Galeri',
            href: route('admin.galleries.edit', gallery.id),
        },
    ];

    const {
        data,
        setData,
        post: submitPost,
        processing,
        errors,
    } = useForm({
        title: gallery.title || '',
        description: gallery.description || '',
        image: null as File | null,
        is_published: Boolean(gallery.is_published),
        is_hero: Boolean(gallery.is_hero),
        _method: 'PUT',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        submitPost(`/admin/galleries/${gallery.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Galeri - ${gallery.title}`} />
            <div className="mx-auto my-auto w-full max-w-2xl rounded-xl border border-border/50 bg-card p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Edit Foto Galeri</h1>
                    <Link href={route('admin.galleries.index')}>
                        <Button variant="outline">Kembali</Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Perbarui Informasi Foto</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Judul */}
                            <div>
                                <Label htmlFor="title">Judul Foto</Label>
                                <Input
                                    id="title"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData('title', e.target.value)
                                    }
                                    placeholder="Masukkan judul baru"
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
                                    placeholder="Tuliskan keterangan atau cerita singkat foto ini..."
                                    className="mt-2"
                                />
                                {errors.description && (
                                    <p className="text-sm text-red-500">
                                        {errors.description}
                                    </p>
                                )}
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
                                        setData(
                                            'image',
                                            e.target.files?.[0] ?? null,
                                        )
                                    }
                                    className="mt-2"
                                />

                                {gallery.image && (
                                    <div className="mt-3">
                                        <p className="mb-1 text-sm text-muted-foreground">
                                            Gambar saat ini:
                                        </p>
                                        <img
                                            src={`/storage/${gallery.image}`}
                                            alt={gallery.title}
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

                            <div className="flex items-center justify-between rounded-md border p-3">
                                <div>
                                    <Label htmlFor="is_hero">Jadikan Gambar Hero</Label>
                                    <p className="text-xs text-muted-foreground">
                                        Tandai gambar ini agar muncul di halaman depan.
                                    </p>
                                </div>

                                <Switch
                                    id="is_hero"
                                    checked={Boolean(data.is_hero)}
                                    onCheckedChange={(val) => setData('is_hero', val)}
                                />
                            </div>


                            {/* Checkbox Publikasi */}
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
                                    Tampilkan di Halaman Publik
                                </Label>
                            </div>

                            <Button type="submit" disabled={processing}>
                                <Save className="mr-2 h-4 w-4" />
                                Simpan Perubahan
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
