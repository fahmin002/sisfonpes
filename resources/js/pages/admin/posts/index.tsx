import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
export default function Index({ posts }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Berita & Kegiatan',
            href: '/admin/posts',
        },
    ];
    const handleTogglePublish = (post) => {
        if (post.is_published) {
            router.patch(route('admin.posts.unpublish', post.id), post);
        } else {
            router.patch(route('admin.posts.publish', post.id));
        }
    };

    const handleDelete = (post) => {
        if (confirm(`Hapus berita "${post.title}"?`)) {
            router.delete(route('admin.posts.destroy', post.id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manajemen Berita" />

            <div className="p-4">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Manajemen Berita</h1>
                    <Link href="/admin/posts/create">
                        <Button>
                            {' '}
                            <Plus className="mr-2 h-4 w-4" /> Tambah Berita
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Berita</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {posts.length > 0 ? (
                            <TooltipProvider>
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="py-2 text-left">
                                                Judul
                                            </th>
                                            <th className="py-2 text-left">
                                                Tanggal
                                            </th>
                                            <th className="py-2 text-left">
                                                Status
                                            </th>
                                            <th className="py-2 text-right">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {posts.map((post) => (
                                            <tr
                                                key={post.id}
                                                className={cn(
                                                    'border-b transition-colors hover:bg-muted/40',
                                                )}
                                            >
                                                <td className="py-2">
                                                    {post.title}
                                                </td>
                                                <td className="py-2">
                                                    {new Date(
                                                        post.created_at,
                                                    ).toLocaleDateString(
                                                        'id-ID',
                                                    )}
                                                </td>
                                                <td className="py-2">
                                                    <Badge
                                                        variant={
                                                            post.is_published
                                                                ? 'success'
                                                                : 'secondary'
                                                        }
                                                        className="font-medium"
                                                    >
                                                        {post.is_published
                                                            ? 'Published'
                                                            : 'Draft'}
                                                    </Badge>
                                                </td>
                                                <td className="space-x-1 py-2 text-right">
                                                    {/* Tombol edit */}
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Link
                                                                href={route(
                                                                    'admin.posts.edit',
                                                                    post.id,
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
                                                        <TooltipContent>
                                                            Edit
                                                        </TooltipContent>
                                                    </Tooltip>

                                                    {/* Tombol publish/unpublish */}
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() =>
                                                                    handleTogglePublish(
                                                                        post,
                                                                    )
                                                                }
                                                            >
                                                                {post.is_published ? (
                                                                    <EyeOff className="h-4 w-4 text-yellow-600" />
                                                                ) : (
                                                                    <Eye className="h-4 w-4 text-green-600" />
                                                                )}
                                                            </Button>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            {post.is_published
                                                                ? 'Unpublish'
                                                                : 'Publish'}
                                                        </TooltipContent>
                                                    </Tooltip>

                                                    {/* Tombol hapus */}
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        post,
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
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </TooltipProvider>
                        ) : (
                            <p className="text-sm text-muted-foreground">
                                Belum ada berita.
                            </p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
