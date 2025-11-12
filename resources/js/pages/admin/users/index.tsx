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
import { Edit2, Trash2, EyeOff, Eye, Plus } from 'lucide-react';
import { route } from 'ziggy-js';

export default function Index({ users, filters }) {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Pengguna',
      href: '/admin/users',
    },
  ];

  const handleToggleActive = (user) => {
    router.patch(route('admin.users.toggleActive', user.id));
  };

  const handleDelete = (user) => {
    if (confirm(`Hapus pengguna "${user.name}"?`)) {
      router.delete(route('admin.users.destroy', user.id));
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Manajemen Pengguna" />

      <div className="p-4">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Manajemen Pengguna</h1>
          <div className="flex gap-2">
            <SearchBar 
              routeName='admin.users.index'
              placeholder='Cari Pengguna...'
              initialValue={filters?.search || ''}
            />
              <Link href={route('admin.users.create')}>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Tambah Pengguna
              </Button>
            </Link>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Daftar Pengguna</CardTitle>
          </CardHeader>
          <CardContent>
            {users.data.length > 0 ? (
              <TooltipProvider>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 text-left">Nama</th>
                      <th className="py-2 text-left">Email</th>
                      <th className="py-2 text-left">Role</th>
                      <th className="py-2 text-left">Status</th>
                      <th className="py-2 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.data.map((user) => (
                      <tr
                        key={user.id}
                        className={cn('border-b transition-colors hover:bg-muted/40')}
                      >
                        <td className="py-2">{user.name}</td>
                        <td className="py-2">{user.email}</td>
                        <td className="py-2 capitalize">{user.role}</td>
                        <td className="py-2">
                          <Badge
                            variant={user.is_active ? 'success' : 'secondary'}
                            className="font-medium"
                          >
                            {user.is_active ? 'Aktif' : 'Nonaktif'}
                          </Badge>
                        </td>
                        <td className="space-x-1 py-2 text-right">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Link href={route('admin.users.edit', user.id)}>
                                <Button variant="ghost" size="icon">
                                  <Edit2 className="h-4 w-4" />
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
                                onClick={() => handleToggleActive(user)}
                              >
                                {user.is_active ? (
                                  <EyeOff className="h-4 w-4 text-yellow-600" />
                                ) : (
                                  <Eye className="h-4 w-4 text-green-600" />
                                )}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              {user.is_active ? 'Nonaktifkan' : 'Aktifkan'}
                            </TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDelete(user)}
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
                <PaginationLinks links={users.links} />
              </TooltipProvider>
            ) : (
              <p className="text-sm text-muted-foreground">Belum ada pengguna.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
