import TiptapEditor from '@/components/TiptapEditor';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';
import { route } from 'ziggy-js';

interface ParentMenu {
    id: number;
    name: string;
}

export default function Create({ parents = [] }: { parents: ParentMenu[] }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        slug: '',
        content: '',
        add_to_menu: false,
        menu_parent_id: '',
        is_info_link: false,
        thumbnail: null as File | null,
        excerpt: ''
    });

    const [showParentSelect, setShowParentSelect] = useState(false);

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Halaman Statis', href: '/admin/pages' },
        { title: 'Tambah Halaman', href: '/admin/pages/create' },
    ];

    const handleNameSlugChange = (name: string) => {
        setData('title', name);
        const slug = name
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
        setData('slug', slug);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.pages.store'), {
            onError: () => toast.error('Gagal menambahkan halaman'),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Halaman Statis" />

            <div className="mx-auto w-full h-full bg-card p-6">
                <div className="mb-4 max-w-2xl mx-auto flex items-center justify-between">
                    <h1 className="text-xl font-semibold">
                        Tambah Halaman Statis
                    </h1>
                    <Link href={route('admin.pages.index')}>
                        <Button variant="outline">Kembali</Button>
                    </Link>
                </div>

                <Card className='max-w-2xl mx-auto'>
                    <CardHeader>
                        <CardTitle>Form Halaman</CardTitle>
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
                                    placeholder="Judul halaman"
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
                                    placeholder="contoh: profil-pesantren"
                                    className="mt-2"
                                />
                                {errors.slug && (
                                    <p className="text-sm text-red-500">
                                        {errors.slug}
                                    </p>
                                )}
                            </div>


                            {/* Excrept */}
                            <div>
                                <Label htmlFor="excerpt">Kutipan</Label>
                                <Input
                                    id="excerpt"
                                    value={data.excerpt}
                                    placeholder="Kutipan Singkat Halaman Ini"
                                    className="mt-2"
                                    onChange={(e) => {
                                        setData('excerpt', e.target.value)
                                    }}
                                />
                                {errors.excerpt && (
                                    <p className="text-sm text-red-500">
                                        {errors.excerpt}
                                    </p>
                                )}
                            </div>

                            {/* Editor */}
                            <TiptapEditor
                                label="Isi Halaman"
                                value={data.content}
                                onChange={(html) => setData('content', html)}
                                error={errors.content}
                            />
                            {/* Thumbnail */}
                            <div>
                                <Label htmlFor="thumbnail">Thumbnail Halaman</Label>
                                <Input
                                    id="thumbnail"
                                    type="file"
                                    accept="image/*"
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
                            {/* Info Link */}
                            <div className="flex items-center justify-between rounded-md border p-3">
                                <div>
                                    <Label htmlFor="is_info_link">Jadikan Info Link</Label>
                                    <p className="text-xs text-muted-foreground">
                                        Tandai halaman ini agar muncul di bagian Info Links.
                                    </p>
                                </div>

                                <Switch
                                    id="is_info_link"
                                    checked={Boolean(data.is_info_link)}
                                    onCheckedChange={(val) => setData('is_info_link', val)}
                                />
                            </div>

                            {/* Tambahkan ke menu navigasi */}
                            <div className="flex items-center justify-between rounded-md border p-3">
                                <div>
                                    <Label htmlFor="add_to_menu">
                                        Tambahkan ke menu navigasi
                                    </Label>
                                    <p className="text-xs text-muted-foreground">
                                        Jika diaktifkan, halaman ini otomatis
                                        muncul di navigasi utama.
                                    </p>
                                </div>
                                <Switch
                                    id="add_to_menu"
                                    checked={data.add_to_menu}
                                    onCheckedChange={(val) => {
                                        setData('add_to_menu', val);
                                        setShowParentSelect(val);
                                    }}
                                />
                            </div>

                            {/* Parent Menu (opsional) */}
                            {showParentSelect && (
                                <div>
                                    <Label htmlFor="menu_parent_id">
                                        Parent Menu (Opsional)
                                    </Label>
                                    <select
                                        id="menu_parent_id"
                                        className="mt-2 w-full rounded-md border bg-background p-2"
                                        value={data.menu_parent_id || ''}
                                        onChange={(e) =>
                                            setData(
                                                'menu_parent_id',
                                                e.target.value,
                                            )
                                        }
                                    >
                                        <option value="">(Tidak ada)</option>
                                        {parents.map((parent) => (
                                            <option
                                                key={parent.id}
                                                value={parent.id}
                                            >
                                                {parent.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

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
