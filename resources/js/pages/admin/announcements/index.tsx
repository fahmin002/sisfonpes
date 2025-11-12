import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PaginationLinks from '@/components/ui/pagination-links';
import SearchBar from '@/components/ui/search-bar';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Edit2, Eye, EyeOff, Plus, Trash2 } from 'lucide-react';
import { route } from 'ziggy-js';

export default function Index({ announcements, filters }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Pengumuman',
            href: '/admin/announcements',
        },
    ];

    const handleToggleActive = (announcement) => {
        router.patch(route('admin.announcements.toggle', announcement.id), announcement);
    };

    const handleDelete = (announcement) => {
        if (confirm(`Hapus pengumuman "${announcement.title}"?`)) {
            router.delete(route('admin.announcements.destroy', announcement.id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manajemen Pengumuman" />

            <div className="p-4">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Manajemen Pengumuman</h1>
                    <div className="flex gap-2">
                        <SearchBar
                            routeName='admin.announcements.index'
                            placeholder='Cari Pengumuman...'
                            initialValue={filters?.search || ''}
                        />
                        <Link href="/admin/announcements/create">
                            <Button>
                                <Plus className="mr-2 h-4 w-4" /> Tambah Pengumuman
                            </Button>
                        </Link>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Pengumuman</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {announcements.data.length > 0 ? (
                            <TooltipProvider>
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="py-2 text-left">Judul</th>
                                            <th className="py-2 text-left">Isi</th>
                                            <th className="py-2 text-left">Status</th>
                                            <th className="py-2 text-left">Tanggal</th>
                                            <th className="py-2 text-right">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {announcements.data.map((item) => (
                                            <tr
                                                key={item.id}
                                                className={cn(
                                                    'border-b transition-colors hover:bg-muted/40',
                                                )}
                                            >
                                                <td className="py-2">{item.title}</td>
                                                <td className="py-2 text-muted-foreground line-clamp-1">
                                                    {item.content}
                                                </td>
                                                <td className="py-2">
                                                    <Badge
                                                        variant={
                                                            item.is_active
                                                                ? 'success'
                                                                : 'secondary'
                                                        }
                                                        className="font-medium cursor-pointer"
                                                        onClick={() =>
                                                            handleToggleActive(item)
                                                        }
                                                    >
                                                        {item.is_active
                                                            ? 'Aktif'
                                                            : 'Nonaktif'}
                                                    </Badge>
                                                </td>
                                                <td className="py-2">
                                                    {new Date(
                                                        item.created_at,
                                                    ).toLocaleDateString('id-ID')}
                                                </td>
                                                <td className="space-x-1 py-2 text-right">
                                                    {/* Tombol edit */}
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Link
                                                                href={route(
                                                                    'admin.announcements.edit',
                                                                    item.id,
                                                                )}
                                                            >
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                >
                                                                    <Edit2 className="h-4 w-4" />
                                                                </Button>
                                                            </Link>
                                                        </TooltipTrigger>
                                                        <TooltipContent>Edit</TooltipContent>
                                                    </Tooltip>

                                                    {/* Tombol aktif/nonaktif */}
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() =>
                                                                    handleToggleActive(item)
                                                                }
                                                            >
                                                                {item.is_active ? (
                                                                    <EyeOff className="h-4 w-4 text-yellow-600" />
                                                                ) : (
                                                                    <Eye className="h-4 w-4 text-green-600" />
                                                                )}
                                                            </Button>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            {item.is_active
                                                                ? 'Nonaktifkan'
                                                                : 'Aktifkan'}
                                                        </TooltipContent>
                                                    </Tooltip>

                                                    {/* Tombol hapus */}
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() =>
                                                                    handleDelete(item)
                                                                }
                                                            >
                                                                <Trash2 className="h-4 w-4 text-red-600" />
                                                            </Button>
                                                        </TooltipTrigger>
                                                        <TooltipContent>Hapus</TooltipContent>
                                                    </Tooltip>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <PaginationLinks links={announcements.links} />
                            </TooltipProvider>
                        ) : (
                            <p className="text-sm text-muted-foreground">
                                Belum ada pengumuman.
                            </p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
