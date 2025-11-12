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
import { Edit2, Eye, EyeOff, ImagePlus, Trash2 } from 'lucide-react';
import { route } from 'ziggy-js';
export default function Index({ galleries, filters }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Galeri',
            href: '/admin/galleries',
        },
    ];

    const handleTogglePublish = (gallery) => {
        if (gallery.is_published) {
            router.patch(route('admin.galleries.unpublish', gallery.id, false));
        } else {
            router.patch(route('admin.galleries.publish', gallery.id, false));
        }
    };

    const handleDelete = (gallery) => {
        if (confirm(`Hapus foto "${gallery.title}"?`)) {
            router.delete(route('admin.galleries.destroy', gallery.id, false));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manajemen Galeri" />

            <div className="p-4">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Manajemen Galeri</h1>
                    <div className="flex gap-2">
                        <SearchBar
                            routeName='admin.galleries.index'
                            initialValue={filters?.search || ''}
                            placeholder='Cari Gambar...'
                        />
                        <Link href="/admin/galleries/create">
                            <Button>
                                <ImagePlus className="mr-2 h-4 w-4" />
                                Tambah Foto
                            </Button>
                        </Link>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Galeri</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {galleries.data.length > 0 ? (
                            <TooltipProvider>
                                <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
                                    {galleries.data.map((gallery) => (
                                        <div
                                            key={gallery.id}
                                            className={cn(
                                                'overflow-hidden rounded-lg border bg-card shadow-sm transition hover:shadow-md',
                                            )}
                                        >
                                            <div className="relative aspect-video">
                                                <img
                                                    src={`/storage/${gallery.image}`}
                                                    alt={gallery.title}
                                                    className="h-full w-full object-cover"
                                                />
                                                {!gallery.is_published && (
                                                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                                                        <span className="text-sm font-medium text-white">
                                                            Draft
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="p-3">
                                                <h3 className="mb-2 truncate text-sm font-medium">
                                                    {gallery.title}
                                                </h3>
                                                <div className="flex items-center justify-between">
                                                    <Badge
                                                        variant={
                                                            gallery.is_published
                                                                ? 'success'
                                                                : 'secondary'
                                                        }
                                                    >
                                                        {gallery.is_published
                                                            ? 'Published'
                                                            : 'Draft'}
                                                    </Badge>

                                                    <div className="flex space-x-1">
                                                        {/* Tooltip: Edit */}
                                                        <Tooltip>
                                                            <TooltipTrigger
                                                                asChild
                                                            >
                                                                <Link
                                                                    href={route(
                                                                        'admin.galleries.edit',
                                                                        gallery.id,
                                                                    )}
                                                                >
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        className="text-blue-600"
                                                                    >
                                                                        <Edit2 className="h-4 w-4" />
                                                                    </Button>
                                                                </Link>
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <p>Edit foto</p>
                                                            </TooltipContent>
                                                        </Tooltip>

                                                        {/* Tooltip: Publish / Unpublish */}
                                                        <Tooltip>
                                                            <TooltipTrigger
                                                                asChild
                                                            >
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    onClick={() =>
                                                                        handleTogglePublish(
                                                                            gallery,
                                                                        )
                                                                    }
                                                                >
                                                                    {gallery.is_published ? (
                                                                        <EyeOff className="h-4 w-4 text-yellow-600" />
                                                                    ) : (
                                                                        <Eye className="h-4 w-4 text-green-600" />
                                                                    )}
                                                                </Button>
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <p>
                                                                    {gallery.is_published
                                                                        ? 'Unpublish foto'
                                                                        : 'Publish foto'}
                                                                </p>
                                                            </TooltipContent>
                                                        </Tooltip>

                                                        {/* Tooltip: Hapus */}
                                                        <Tooltip>
                                                            <TooltipTrigger
                                                                asChild
                                                            >
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    onClick={() =>
                                                                        handleDelete(
                                                                            gallery,
                                                                        )
                                                                    }
                                                                    className="text-red-600"
                                                                >
                                                                    <Trash2 className="h-4 w-4" />
                                                                </Button>
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <p>
                                                                    Hapus foto
                                                                </p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <PaginationLinks links={galleries.links} />
                            </TooltipProvider>
                        ) : (
                            <p className="text-sm text-muted-foreground">
                                Belum ada foto dalam galeri.
                            </p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
