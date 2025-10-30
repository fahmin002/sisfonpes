import TiptapEditor from '@/components/TiptapEditor';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface ParentMenu {
    id: number;
    name: string;
}

interface Page {
    id: number;
    title: string;
    slug: string;
    content: string;
    menu?: {
        id: number;
        parent_id?: number | null;
    } | null;
}

export default function Edit({
    parents = [],
    page,
}: {
    parents: ParentMenu[];
    page: Page;
}) {
    const { menu_parent_id, is_in_menu } = usePage().props;

    // 🔧 form setup
    const { data, setData, put, processing, errors } = useForm({
        title: page.title || '',
        slug: page.slug || '',
        content: page.content || '',
        add_to_menu: is_in_menu, // default true kalau sudah di menu
        menu_parent_id: menu_parent_id || '',
    });

    // 🔒 jika halaman sudah di menu, toggle tidak bisa dimatikan
    const isAlreadyInMenu = page.menu !== null;
    const [showParentSelect, setShowParentSelect] = useState(data.add_to_menu);

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Halaman Statis', href: '/admin/pages' },
        { title: 'Edit Halaman', href: `/admin/pages/${page.id}/edit` },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admin.pages.update', page.id), {
            onSuccess: () => {
                window.location.reload();
            },
            onError: () => toast.error('Gagal memperbarui halaman'),
        });
    };

    // sinkron tampilan dropdown parent
    useEffect(() => {
        setShowParentSelect(data.add_to_menu);
    }, [data.add_to_menu]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit: ${page.title}`} />

            <div className="mx-auto w-full max-w-6xl rounded-xl border border-border/50 bg-card p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-xl font-semibold">
                        Edit Halaman: {page.title}
                    </h1>
                    <Link href={route('admin.pages.index')}>
                        <Button variant="outline">Kembali</Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Form Edit Halaman</CardTitle>
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
                                        setData('title', e.target.value)
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
                                    onChange={(e) =>
                                        setData('slug', e.target.value)
                                    }
                                    placeholder="contoh: profil-pesantren"
                                    className="mt-2"
                                />
                                {errors.slug && (
                                    <p className="text-sm text-red-500">
                                        {errors.slug}
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

                            {/* Tambahkan ke menu navigasi */}
                            <div className="flex items-center justify-between rounded-md border p-3">
                                <div>
                                    <Label htmlFor="add_to_menu">
                                        Tambahkan ke menu navigasi
                                    </Label>
                                    <p className="text-xs text-muted-foreground">
                                        {isAlreadyInMenu
                                            ? 'Halaman ini sudah terhubung dengan menu navigasi. Anda hanya dapat mengubah parent menu.'
                                            : 'Aktifkan untuk menambahkan halaman ini ke navigasi.'}
                                    </p>
                                </div>

                                <Switch
                                    id="add_to_menu"
                                    checked={data.add_to_menu}
                                    disabled={isAlreadyInMenu} // 🔒 tidak bisa dimatikan kalau sudah di menu
                                    onCheckedChange={(val) => {
                                        setData('add_to_menu', val);
                                        setShowParentSelect(val);
                                    }}
                                />
                            </div>

                            {/* Parent Menu */}
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
                                Perbarui
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
