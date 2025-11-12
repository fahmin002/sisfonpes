import TiptapEditor from '@/components/TiptapEditor';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
interface EditProps {
    post: {
        id: number;
        title: string;
        content: string;
        thumbnail?: string;
    };
}

export default function Edit({ post }: EditProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Berita & Kegiatan',
            href: '/admin/posts',
        },
        {
            title: 'Edit Berita & Kegiatan',
            href: '/admin/posts/edit',
        },
    ];
    const {
        data,
        setData,
        post: submitPost,
        processing,
        errors,
    } = useForm({
        _method: 'PUT',
        title: post.title || '',
        content: post.content || '',
        thumbnail: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        submitPost(`/admin/posts/${post.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Berita - ${post.title}`} />
            <div className="mx-auto w-full h-full bg-card p-6 shadow-sm">
                <div className="mb-4 flex items-center max-w-2xl mx-auto justify-between">
                    <h1 className="text-xl font-semibold">Edit Berita</h1>
                    <Link href="/admin/posts">
                        <Button variant="outline">Kembali</Button>
                    </Link>
                </div>

                <Card className='mx-auto max-w-2xl'>
                    <CardHeader>
                        <CardTitle>Form Edit Berita</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form
                            onSubmit={handleSubmit}
                            encType="multipart/form-data"
                            className="space-y-4"
                        >
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
                                <Label htmlFor="thumbnail">
                                    Thumbnail Baru (Opsional)
                                </Label>
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
                                {post.thumbnail && (
                                    <div className="mt-2">
                                        <p className="mb-1 text-sm text-muted-foreground">
                                            Thumbnail saat ini:
                                        </p>
                                        <img
                                            src={`/storage/${post.thumbnail}`}
                                            alt="Thumbnail lama"
                                            className="h-24 rounded-md border"
                                        />
                                    </div>
                                )}
                                {errors.thumbnail && (
                                    <p className="text-sm text-red-500">
                                        {errors.thumbnail}
                                    </p>
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
