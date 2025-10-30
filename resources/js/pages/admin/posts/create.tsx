import TiptapEditor from '@/components/TiptapEditor';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create() {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Berita & Kegiatan',
            href: '/admin/posts',
        },
        {
            title: 'Tambah Berita & Kegiatan',
            href: '/admin/posts/create',
        },
    ];
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        content: '',
        thumbnail: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/posts', {
            onSuccess: () => {
                window.location.reload();
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Berita" />
            <div className="mx-auto w-full max-w-6xl rounded-xl border border-border/50 bg-card p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Tambah Berita</h1>
                    <Link href="/admin/posts">
                        <Button variant="outline">Kembali</Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Form Tambah Berita</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="title">Judul</Label>
                                <Input
                                    id="title"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData('title', e.target.value)
                                    }
                                    placeholder="Masukkan judul berita"
                                    className="mt-2"
                                />
                                {errors.title && (
                                    <p className="text-sm text-red-500">
                                        {errors.title}
                                    </p>
                                )}
                            </div>

                            <TiptapEditor
                                label="Isi Berita"
                                value={data.content}
                                onChange={(html) => setData('content', html)}
                                error={errors.content}
                            />

                            <div>
                                <Label htmlFor="thumbnail">Thumbnail</Label>
                                <Input
                                    id="thumbnail"
                                    type="file"
                                    onChange={(e) =>
                                        setData(
                                            'thumbnail',
                                            e.target.files?.[0] ?? null,
                                        )
                                    }
                                    className="mt-2"
                                />
                                {errors.thumbnail && (
                                    <p className="text-sm text-red-500">
                                        {errors.thumbnail}
                                    </p>
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
