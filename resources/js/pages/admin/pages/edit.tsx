import TiptapEditor from '@/components/TiptapEditor';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { route } from 'ziggy-js';

interface ParentMenu {
  id: number;
  name: string;
}

interface Page {
  id: number;
  title: string;
  slug: string;
  content: string;
  // menu?: { id: number; parent_id?: number | null } | null;
  is_info_link: boolean | string;
  thumbnail: string | null;
  excerpt: string;
  is_published: boolean;
}

export default function Edit({
  parents = [],
  page,
}: {
  parents: ParentMenu[];
  page: Page;
}) {
  const { menu_parent_id, is_in_menu } = usePage().props;

  const { data, setData, processing, errors } = useForm({
    title: page.title || '',
    slug: page.slug || '',
    content: page.content || '',
    // add_to_menu: Boolean(is_in_menu),
    // menu_parent_id: menu_parent_id || '',
    is_info_link: page.is_info_link === '0' ? false : Boolean(page.is_info_link),
    thumbnail: null as File | null,
    excerpt: page.excerpt || '',
  });

  // const isAlreadyInMenu = page.menu !== null;
  // const [showParentSelect, setShowParentSelect] = useState(data.add_to_menu);

  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Halaman Statis', href: '/admin/pages' },
    { title: 'Edit Halaman', href: `/admin/pages/${page.id}/edit` },
  ];

  const handleNameSlugChange = (name: string) => {
    setData('title', name);
    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    setData('slug', slug);
  };

  /** ✅ FIX utama di sini */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('_method', 'PUT'); // spoof PUT agar Laravel paham

    formData.append('title', data.title.trim());
    formData.append('slug', data.slug.trim());
    formData.append('content', data.content || '');
    formData.append('excerpt', data.excerpt || '');
    // formData.append('add_to_menu', data.add_to_menu ? '1' : '0');
    formData.append('is_info_link', data.is_info_link ? '1' : '0');

    // if (data.menu_parent_id) {
    //   formData.append('menu_parent_id', String(data.menu_parent_id));
    // }

    if (data.thumbnail instanceof File) {
      formData.append('thumbnail', data.thumbnail);
    }

    router.post(route('admin.pages.update', page.id), formData, {
      forceFormData: true,
      onError: (err) => {
        console.error('❌ Error saat update halaman:', err);
        toast.error('Gagal memperbarui halaman');
      },
    });
  };

  const [preview, setPreview] = useState<string | null>(null);
  const handleThumbnailChange = (file: File | null) => {
    setData("thumbnail", file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };


  // useEffect(() => {
  //   setShowParentSelect(data.add_to_menu);
  // }, [data.add_to_menu]);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Edit: ${page.title}`} />

      <div className="mx-auto w-full h-full bg-card p-6">
        <div className="mb-4 mx-auto max-w-2xl flex items-center justify-between">
          <h1 className="text-xl font-semibold">Edit Halaman: {page.title}</h1>
          <Link href={route('admin.pages.index')}>
            <Button variant="outline">Kembali</Button>
          </Link>
        </div>

        <Card className="mx-auto max-w-2xl">
          <CardHeader>
            <CardTitle>Form Edit Halaman</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Judul */}
              <div>
                <Label htmlFor="title">Judul</Label>
                <Input
                  id="title"
                  value={data.title}
                  onChange={(e) => handleNameSlugChange(e.target.value)}
                  placeholder="Judul halaman"
                  className="mt-2"
                />
                {errors.title && (
                  <p className="text-sm text-red-500">{errors.title}</p>
                )}
              </div>

              {/* Slug */}
              <div>
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={data.slug}
                  disabled
                  placeholder="contoh: profil-pesantren"
                  className="mt-2"
                />
                {errors.slug && (
                  <p className="text-sm text-red-500">{errors.slug}</p>
                )}
              </div>

              {/* Excerpt */}
              <div>
                <Label htmlFor="excerpt">Kutipan</Label>
                <Input
                  id="excerpt"
                  value={data.excerpt}
                  placeholder="Kutipan singkat halaman ini"
                  className="mt-2"
                  onChange={(e) => setData('excerpt', e.target.value)}
                />
                {errors.excerpt && (
                  <p className="text-sm text-red-500">{errors.excerpt}</p>
                )}
              </div>

              {/* Editor */}
              <TiptapEditor
                label="Isi Halaman"
                value={data.content}
                onChange={(html) => setData('content', html)}
                error={errors.content}
              />

              {/* Thumbnail */}
              <div>
                <Label htmlFor="thumbnail">Ganti Thumbnail (opsional)</Label>
                <Input
                  id="thumbnail"
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleThumbnailChange(e.target.files?.[0] ?? null)
                  }
                  className="mt-2"
                />
                {(preview || page.thumbnail) && (
                  <div className="mt-3">
                    <p className="mb-1 text-sm text-muted-foreground">
                      Gambar saat ini:
                    </p>
                    <img
                      src={preview || `/storage/${page.thumbnail}`}
                      alt={page.title}
                      className="w-56 rounded-md border"
                    />
                  </div>
                )}
                {errors.thumbnail && (
                  <p className="text-sm text-red-500">{errors.thumbnail}</p>
                )}
              </div>

              {/* Info Link */}
              <div className="flex items-center justify-between rounded-md border p-3">
                <div>
                  <Label htmlFor="is_info_link">Jadikan Info Link</Label>
                  <p className="text-xs text-muted-foreground">
                    Tandai halaman ini agar muncul di bagian Info Links.
                  </p>
                </div>

                <Switch
                  id="is_info_link"
                  checked={Boolean(data.is_info_link)}
                  onCheckedChange={(val) => setData('is_info_link', val)}
                />
              </div>

              {/* Tambahkan ke menu navigasi */}
              {/* <div className="flex items-center justify-between rounded-md border p-3">
                <div>
                  <Label htmlFor="add_to_menu">Tambahkan ke menu navigasi</Label>
                  <p className="text-xs text-muted-foreground">
                    {isAlreadyInMenu
                      ? 'Halaman ini sudah terhubung dengan menu navigasi. Anda hanya dapat mengubah parent menu.'
                      : 'Aktifkan untuk menambahkan halaman ini ke navigasi.'}
                  </p>
                </div>

                <Switch
                  id="add_to_menu"
                  checked={data.add_to_menu}
                  disabled={isAlreadyInMenu}
                  onCheckedChange={(val) => {
                    setData('add_to_menu', val);
                    setShowParentSelect(val);
                  }}
                />
              </div> */}

              {/* Parent Menu */}
              {/* {showParentSelect && (
                <div>
                  <Label htmlFor="menu_parent_id">Parent Menu (Opsional)</Label>
                  <select
                    id="menu_parent_id"
                    className="mt-2 w-full rounded-md border bg-background p-2"
                    value={data.menu_parent_id || ''}
                    onChange={(e) => setData('menu_parent_id', e.target.value)}
                  >
                    <option value="">(Tidak ada)</option>
                    {parents.map((parent) => (
                      <option key={parent.id} value={parent.id}>
                        {parent.name}
                      </option>
                    ))}
                  </select>
                </div>
              )} */}

              <Button type="submit" disabled={processing}>
                Perbarui
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
