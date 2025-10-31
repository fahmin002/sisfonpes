import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { Info } from 'lucide-react';
import { toast } from 'sonner';
import { route } from 'ziggy-js';

export default function Create({ parents = [] }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Menu Navigasi',
            href: '/admin/menus',
        },
        {
            title: 'Tambah Menu Navigasi',
            href: '/admin/menus/create',
        },
    ];

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        slug: '',
        url: '',
        order: 1,
        parent_id: '',
        is_active: true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.menus.store'), {
            onError: () => toast.error('Gagal menambahkan menu'),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Menu Navigasi" />
            <div className="mx-auto w-full max-w-5xl rounded-xl border border-border/50 bg-card p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-xl font-semibold">
                        Tambah Menu Navigasi
                    </h1>
                    <Link href={route('admin.menus.index')}>
                        <Button variant="outline">Kembali</Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Form Tambah Menu</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Nama */}
                            <div>
                                <Label htmlFor="name">Nama Menu</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    placeholder="Contoh: Tentang Kami"
                                    className="mt-2"
                                />
                                {errors.name && (
                                    <p className="text-sm text-red-500">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            {/* Slug */}
                            <div>
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="slug">Slug</Label>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Info className="h-4 w-4 cursor-pointer text-muted-foreground" />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                Slug digunakan di URL, misalnya{' '}
                                                <code>/tentang</code>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                                <Input
                                    id="slug"
                                    value={data.slug}
                                    onChange={(e) =>
                                        setData('slug', e.target.value)
                                    }
                                    placeholder="tentang"
                                    className="mt-2"
                                />
                                {errors.slug && (
                                    <p className="text-sm text-red-500">
                                        {errors.slug}
                                    </p>
                                )}
                            </div>

                            {/* URL */}
                            <div>
                                <Label htmlFor="url">URL</Label>
                                <Input
                                    id="url"
                                    value={data.url}
                                    onChange={(e) =>
                                        setData('url', e.target.value)
                                    }
                                    placeholder="/tentang"
                                    className="mt-2"
                                />
                                {errors.url && (
                                    <p className="text-sm text-red-500">
                                        {errors.url}
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
                                        setData('order', e.target.value)
                                    }
                                    min="1"
                                    className="mt-2"
                                />
                                {errors.order && (
                                    <p className="text-sm text-red-500">
                                        {errors.order}
                                    </p>
                                )}
                            </div>

                            {/* Parent */}
                            <div>
                                <Label htmlFor="parent_id">Parent Menu</Label>
                                <select
                                    id="parent_id"
                                    className="mt-2 w-full rounded-md border bg-background p-2"
                                    value={data.parent_id || ''}
                                    onChange={(e) =>
                                        setData('parent_id', e.target.value)
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
                                {errors.parent_id && (
                                    <p className="text-sm text-red-500">
                                        {errors.parent_id}
                                    </p>
                                )}
                            </div>

                            {/* Status aktif */}
                            <div className="flex items-center justify-between rounded-md border p-3">
                                <div>
                                    <Label htmlFor="is_active">
                                        Aktifkan Menu
                                    </Label>
                                    <p className="text-xs text-muted-foreground">
                                        Menu yang nonaktif tidak akan tampil di
                                        navigasi.
                                    </p>
                                </div>
                                <Switch
                                    checked={data.is_active}
                                    onCheckedChange={(val) =>
                                        setData('is_active', val)
                                    }
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
