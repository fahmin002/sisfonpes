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
import { Switch } from "@/components/ui/switch";
import { CheckIcon, CircleX, Cross, CrossIcon, Edit2, Eye, EyeOff, FileText, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { route } from 'ziggy-js';

export default function Index({ pages, filters }) {
    const handleTogglePublish = (page) => {
        const routeName = page.is_published
            ? 'admin.pages.unpublish'
            : 'admin.pages.publish';

        router.patch(
            route(routeName, page.id),
            {},
            {
                onError: () => toast.error('Gagal mempublish halaman'),
            },
        );
    };
    const handleToggleInfoLink = (page) => {
        const routeName = page.is_info_link
            ? 'admin.pages.unlink'
            : 'admin.pages.link';

        router.patch(
            route(routeName, page.id),
            {},
            {
                onError: () => toast.error('Gagal menandai halaman'),
            },
        );
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Halaman Statis',
            href: '/admin/pages',
        },
    ];

    const handleDelete = (page) => {
        if (confirm(`Hapus halaman "${page.title}"?`)) {
            router.delete(route('admin.pages.destroy', page.id), {
                onSuccess: () => {
                    // kasih jeda kecil supaya Inertia sempat settle
                    setTimeout(() => {
                        router.reload({
                            only: ['menus', 'pages'],
                        });
                    }, 150);
                },
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manajemen Halaman Statis" />

            <div className="p-4">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-xl font-semibold">
                        Manajemen Halaman Statis
                    </h1>
                    <div className="flex gap-2">
                        <SearchBar
                            routeName="admin.pages.index"
                            placeholder="Cari Halaman..."
                            initialValue={filters?.search || ''} // kalau kamu kirim dari controller
                        />
                        <Link href={route('admin.pages.create')}>
                            <Button>
                                <FileText className="mr-2 h-4 w-4" />
                                Tambah Halaman
                            </Button>
                        </Link>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Halaman</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {pages.data.length > 0 ? (
                            <>
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="py-2 text-left">
                                                Judul
                                            </th>
                                            <th className="py-2 text-left">Slug</th>
                                            <th className="py-2 text-left">
                                                Status
                                            </th>
                                            <th className="py-2 text-left">
                                                URL Halaman
                                            </th>
                                            <th className='py-2 text-left'>
                                                Info Link
                                            </th>
                                            <th className="py-2 text-right">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pages.data.map((page) => (
                                            <tr
                                                key={page.id}
                                                className={cn(
                                                    'border-b hover:bg-muted/30',
                                                )}
                                            >
                                                <td className="py-2">
                                                    {page.title}
                                                </td>
                                                <td className="py-2 text-muted-foreground">
                                                    /{page.slug}
                                                </td>
                                                <td className="py-2">
                                                    <Badge
                                                        variant={
                                                            page.is_published
                                                                ? 'success'
                                                                : 'secondary'
                                                        }
                                                    >
                                                        {page.is_published
                                                            ? 'Published'
                                                            : 'Draft'}
                                                    </Badge>
                                                </td>
                                                {/* URL Halaman */}
                                                {/* url dari lazy load menu terkait */}
                                                <td className='py02'>
                                                    <a
                                                        href={'/' + page.slug}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 underline"
                                                    >
                                                        {'/' + page.slug}
                                                    </a>
                                                </td>
                                                <td className="py-2 text-left">
                                                    <Switch
                                                        checked={page.is_info_link == '1' ? true : false}
                                                        onCheckedChange={() =>
                                                            handleToggleInfoLink(page)
                                                        }
                                                    />
                                                </td>
                                                {/* Terkait Menu */}
                                                {/* <td className='py-2'> */}
                                                {/* {page.menu ? (
                                                    <Link
                                                        href={route(
                                                            'admin.menus.edit',
                                                            page.menu.id,
                                                        )}
                                                        className="text-blue-600 underline"
                                                    >
                                                        {page.menu.name}
                                                    </Link>
                                                ) : (
                                                    <span className="text-muted-foreground">
                                                        Tidak ada
                                                    </span>
                                                )}
                                            </td> */}
                                                <td className="space-x-1 py-2 text-right">
                                                    <TooltipProvider>

                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <Link
                                                                    href={route(
                                                                        'admin.pages.edit',
                                                                        page.id,
                                                                    )}
                                                                >
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="icon"
                                                                    >
                                                                        <Edit2 className="h-4 w-4 text-blue-600" />
                                                                    </Button>
                                                                </Link>
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                Edit
                                                            </TooltipContent>
                                                        </Tooltip>

                                                        {/* <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() =>
                                                                    handleToggleInfoLink(
                                                                        page,
                                                                    )
                                                                }
                                                            >
                                                                {page.is_info_link ? (
                                                                    <CircleX className="h-4 w-4 text-yellow-600" />
                                                                ) : (
                                                                    <CheckIcon className="h-4 w-4 text-green-600" />
                                                                )}
                                                            </Button>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            {page.is_info_link
                                                                ? 'Hapus Info Link'
                                                                : 'Tandai Info Link'}
                                                        </TooltipContent>
                                                    </Tooltip> */}
                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    onClick={() =>
                                                                        handleTogglePublish(
                                                                            page,
                                                                        )
                                                                    }
                                                                >
                                                                    {page.is_published ? (
                                                                        <EyeOff className="h-4 w-4 text-yellow-600" />
                                                                    ) : (
                                                                        <Eye className="h-4 w-4 text-green-600" />
                                                                    )}
                                                                </Button>
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                {page.is_published
                                                                    ? 'Unpublish'
                                                                    : 'Publish'}
                                                            </TooltipContent>
                                                        </Tooltip>

                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    onClick={() =>
                                                                        handleDelete(
                                                                            page,
                                                                        )
                                                                    }
                                                                >
                                                                    <Trash2 className="h-4 w-4 text-red-600" />
                                                                </Button>
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                Hapus
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <PaginationLinks links={pages.links} />
                            </>
                        ) : (
                            <p className="text-sm text-muted-foreground">
                                Belum ada halaman statis.
                            </p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
