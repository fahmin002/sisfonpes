import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { toast } from 'sonner';

export default function Create() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    role: 'user',
    password: '',
    password_confirmation: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('admin.users.store'), {
      onSuccess: () => toast.success('Pengguna berhasil ditambahkan.'),
      onError: () => toast.error('Gagal menambahkan pengguna.'),
    });
  };

  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Pengguna', href: '/admin/users' },
    { title: 'Tambah Pengguna', href: '/admin/users/create' },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Tambah Pengguna" />

      <div className="mx-auto w-full h-full bg-card p-6 shadow-sm">
        <div className="mb-4 max-w-2xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-semibold">Tambah Pengguna</h1>
          <Link href={route('admin.users.index')}>
            <Button variant="outline">Kembali</Button>
          </Link>
        </div>

        <Card className='max-w-2xl mx-auto'>
          <CardHeader>
            <CardTitle>Form Pengguna</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Nama</Label>
                <Input
                  id="name"
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                    className='mt-2'
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  className='mt-2'
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>

              <div>
                <Label htmlFor="role">Role</Label>
                <select
                  id="role"
                  className="mt-2 w-full rounded-md border bg-background p-2"
                  value={data.role}
                  onChange={(e) => setData('role', e.target.value)}
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={data.password}
                  onChange={(e) => setData('password', e.target.value)}
                  className='mt-2'
                />
              </div>

              <div>
                <Label htmlFor="password_confirmation">Konfirmasi Password</Label>
                <Input
                  id="password_confirmation"
                  type="password"
                  value={data.password_confirmation}
                  onChange={(e) =>
                    setData('password_confirmation', e.target.value)
                  }
                  className='mt-2'
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
