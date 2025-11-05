import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import type { BreadcrumbItem } from '@/types';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        content: '',
        is_active: false,
    });

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Pengumuman', href: '/admin/announcements' },
        { title: 'Tambah Pengumuman', href: '/admin/announcements/create' },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.announcements.store'), {
            onSuccess: () => toast.success('Pengumuman berhasil ditambahkan'),
            onError: () => toast.error('Gagal menambahkan pengumuman'),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Pengumuman" />
            <div className="mx-auto lg:my-auto w-full max-w-2xl rounded-xl border border-border/50 bg-card p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Tambah Pengumuman</h1>
                    <Link href={route('admin.announcements.index')}>
                        <Button variant="outline">Kembali</Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Form Pengumuman</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="title">Judul</Label>
                                <Input
                                    id="title"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="Judul pengumuman"
                                    className="mt-2"
                                />
                                {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                            </div>

                            <div>
                                <Label htmlFor="content">Isi Pengumuman</Label>
                                <Textarea
                                    id="content"
                                    rows={4}
                                    value={data.content}
                                    onChange={(e) => setData('content', e.target.value)}
                                    placeholder="Tulis isi pengumuman di sini..."
                                    className="mt-2"
                                />
                                {errors.content && <p className="text-sm text-red-500">{errors.content}</p>}
                            </div>

                            <div className="flex items-center justify-between rounded-md border p-3">
                                <div>
                                    <Label htmlFor="is_active" className="mb-1 block">
                                        Aktifkan Pengumuman
                                    </Label>
                                </div>

                                <Switch
                                    id="is_active"
                                    onCheckedChange={(val) => {
                                        setData('is_active', val);
                                    }}
                                />
                            </div>

                            <Button type="submit" disabled={processing}>Simpan</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
