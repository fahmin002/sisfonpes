import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import type { BreadcrumbItem } from '@/types';

export default function Edit({ announcement }) {
    const { data, setData, put, processing, errors } = useForm({
        title: announcement.title || '',
        content: announcement.content || '',
        is_active: announcement.is_active || false,
    });

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Pengumuman', href: '/admin/announcements' },
        { title: `Edit: ${announcement.title}`, href: `/admin/announcements/${announcement.id}/edit` },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('admin.announcements.update', announcement.id), {
            onSuccess: () => toast.success('Pengumuman berhasil diperbarui'),
            onError: () => toast.error('Gagal memperbarui pengumuman'),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${announcement.title}`} />
            <div className="mx-auto lg:my-auto w-full max-w-4xl rounded-xl border border-border/50 bg-card p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Edit Pengumuman</h1>
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
                                    placeholder="Tulis isi pengumuman..."
                                    className="mt-2"
                                />
                                {errors.content && <p className="text-sm text-red-500">{errors.content}</p>}
                            </div>

                            {/* <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={data.is_active}
                                    onChange={(e) => setData('is_active', e.target.checked)}
                                />
                                <Label>Aktifkan pengumuman</Label>
                            </div> */}

                            {/* Tambahkan ke menu navigasi */}
                            <div className="flex items-center justify-between rounded-md border p-3">
                                <div>
                                    <Label htmlFor="is_active" className="mb-1 block">
                                        Tambahkan ke menu navigasi
                                    </Label>
                                </div>

                                <Switch
                                    id="is_active"
                                    checked={data.is_active}
                                    onCheckedChange={(val) => {
                                        console.log(val);
                                        setData('is_active', val);
                                    }}
                                />
                            </div>

                            <Button type="submit" disabled={processing}>Simpan Perubahan</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
