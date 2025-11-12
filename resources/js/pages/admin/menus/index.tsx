import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Edit2, Plus, Trash2 } from 'lucide-react';
import { route } from 'ziggy-js';
import { useEffect, useState } from 'react';
import PaginationLinks from '@/components/ui/pagination-links';
import SearchBar from '@/components/ui/search-bar';

export default function Index({ menus, filters }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Menu Navigasi', href: '/admin/menus' },
    ];



    const handleDelete = (menu) => {
        if (confirm(`Hapus menu "${menu.name}"?`)) {
            router.delete(route('admin.menus.destroy', menu.id));
        }
    };

    const handleToggleActive = (menu) => {
        router.put(route('admin.menus.update', menu.id), {
            ...menu,
            is_active: !menu.is_active,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manajemen Menu Navigasi" />

            <div className="p-4">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Menu Navigasi</h1>
                    <div className="flex gap-2">
                        <SearchBar
                            routeName="admin.menus.index"
                            placeholder="Cari menu..."
                            initialValue={filters?.search || ''} // kalau kamu kirim dari controller
                        />

                        <Link href={route('admin.menus.create')}>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Tambah Menu
                            </Button>
                        </Link>
                    </div>
                </div>



                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Menu</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {menus.data.length > 0 ? (
                            <TooltipProvider>
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b text-left">
                                            <th className="py-2">Nama</th>
                                            <th className="py-2">Slug</th>
                                            <th className="py-2">URL</th>
                                            <th className="py-2">Urutan</th>
                                            <th className="py-2">Parent</th>
                                            <th className="py-2">Status</th>
                                            <th className="py-2">Halaman</th>
                                            <th className="py-2 text-right">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {menus.data.map((menu) => (
                                            <tr
                                                key={menu.id}
                                                className="border-b transition-colors hover:bg-muted/40"
                                            >
                                                <td className="py-2">{menu.name}</td>
                                                <td className="py-2">{menu.slug}</td>
                                                <td className="py-2">{menu.url}</td>
                                                <td className="py-2">{menu.order}</td>
                                                <td className="py-2">
                                                    {menu.parent ? (
                                                        <Badge variant="outline">
                                                            {menu.parent.name}
                                                        </Badge>
                                                    ) : (
                                                        <span className="text-xs text-muted-foreground italic">
                                                            (utama)
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="py-2">
                                                    <Switch
                                                        checked={menu.is_active}
                                                        onCheckedChange={() =>
                                                            handleToggleActive(menu)
                                                        }
                                                    />
                                                </td>
                                                <td className="py-2">
                                                    {menu.page_id ? (
                                                        <Link
                                                            href={`/${menu.url}`}
                                                            className="underline"
                                                        >
                                                            {menu.name}
                                                        </Link>
                                                    ) : (
                                                        <span className="text-xs text-muted-foreground italic">
                                                            (tidak ada)
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="space-x-1 py-2 text-right">
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Link
                                                                href={route('admin.menus.edit', menu.id)}
                                                            >
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    title="Edit"
                                                                >
                                                                    <Edit2 className="h-4 w-4 text-blue-600" />
                                                                </Button>
                                                            </Link>
                                                        </TooltipTrigger>
                                                        <TooltipContent>Edit</TooltipContent>
                                                    </Tooltip>

                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                title="Hapus"
                                                                onClick={() => handleDelete(menu)}
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

                                {/* 🔹 Pagination */}
                                <PaginationLinks links={menus.links} />
                            </TooltipProvider>
                        ) : (
                            <p className="text-sm text-muted-foreground">
                                Belum ada data menu.
                            </p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
