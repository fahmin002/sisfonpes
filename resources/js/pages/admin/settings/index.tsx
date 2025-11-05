import { useState } from 'react';
import { setActiveTheme, themes } from "@/themes";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { type BreadcrumbItem } from '@/types';

export default function Settings({ settings = {} }) {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Pengaturan Umum',
      href: '/admin/settings',
    },
  ];

  const { data, setData, post, processing } = useForm({
    site_name: settings.site_name || 'Sistem Informasi Pesantren',
    site_tagline: settings.site_tagline || '',
    contact_email: settings.contact_email || '',
    contact_phone: settings.contact_phone || '',
    address: settings.address || '',
    dark_mode: settings.dark_mode === 'true',
    theme_color: settings.theme_color || '#16a34a',
    show_announcements: settings.show_announcements === 'true',
    show_gallery: settings.show_gallery === 'true',
    show_blog: settings.show_blog === 'true',
    maintenance_mode: settings.maintenance_mode === 'true',
    maintenance_message:
      settings.maintenance_message ||
      'Situs sedang dalam pemeliharaan. Silakan kembali lagi nanti.',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('admin.settings.update'), {
      onSuccess: () => toast.success('Pengaturan berhasil diperbarui ✅'),
      onError: () => toast.error('Gagal memperbarui pengaturan'),
    });
  };

  const handleSync = () => {
    window.location.reload();
    toast.info('Sinkronisasi selesai 🔄');
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Pengaturan Umum" />

      <div className="mx-auto w-full max-w-5xl rounded-xl border border-border/50 bg-card p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Pengaturan Umum</h1>
          <div className="space-x-2">
            <Button variant="secondary" onClick={handleSync}>
              Sinkronkan
            </Button>
            <Button onClick={handleSubmit} disabled={processing}>
              Simpan Perubahan
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Form Pengaturan</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Tabs defaultValue="general">
                <TabsList className="mb-4 grid w-full grid-cols-4">
                  <TabsTrigger value="general">Umum</TabsTrigger>
                  <TabsTrigger value="appearance">Tampilan</TabsTrigger>
                  <TabsTrigger value="content">Konten</TabsTrigger>
                  <TabsTrigger value="system">Sistem</TabsTrigger>
                </TabsList>

                {/* Tab Umum */}
                <TabsContent value="general" className="space-y-4">
                  <div>
                    <Label>Nama Situs</Label>
                    <Input
                      value={data.site_name}
                      onChange={(e) => setData('site_name', e.target.value)}
                      placeholder="Nama situs pesantren"
                    />
                  </div>
                  <div>
                    <Label>Tagline</Label>
                    <Input
                      value={data.site_tagline}
                      onChange={(e) => setData('site_tagline', e.target.value)}
                      placeholder="Tagline atau slogan"
                    />
                  </div>
                  <div>
                    <Label>Email Kontak</Label>
                    <Input
                      value={data.contact_email}
                      onChange={(e) =>
                        setData('contact_email', e.target.value)
                      }
                      placeholder="contoh@domain.com"
                    />
                  </div>
                  <div>
                    <Label>Nomor Telepon</Label>
                    <Input
                      value={data.contact_phone}
                      onChange={(e) =>
                        setData('contact_phone', e.target.value)
                      }
                      placeholder="08xxxxxxxxxx"
                    />
                  </div>
                  <div>
                    <Label>Alamat</Label>
                    <Input
                      value={data.address}
                      onChange={(e) => setData('address', e.target.value)}
                      placeholder="Alamat lengkap pesantren"
                    />
                  </div>
                </TabsContent>

                {/* Tab Tampilan */}
                <TabsContent value="appearance" className="space-y-4">
                  {/* 🌗 Mode Gelap */}
                  <div className="flex items-center justify-between rounded-md border p-3">
                    <div>
                      <Label>Mode Gelap</Label>
                      <p className="text-xs text-muted-foreground">
                        Aktifkan mode gelap untuk tampilan admin.
                      </p>
                    </div>
                    <Switch
                      checked={data.dark_mode}
                      onCheckedChange={(val) => {
                        setData("dark_mode", val);
                        setActiveTheme(data.theme_name || "material", val ? "dark" : "light");
                      }}
                    />
                  </div>

                  {/* 🎨 Pilihan Tema */}
                  <div className="space-y-2">
                    <Label>Warna Tema</Label>
                    <Select
                      value={data.theme_name}
                      onValueChange={(val) => {
                        setData("theme_name", val);
                        setActiveTheme(val, data.dark_mode ? "dark" : "light");
                      }}
                    >
                      <SelectTrigger className="w-[250px]">
                        <SelectValue placeholder="Pilih Tema" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(themes).map((key) => (
                          <SelectItem key={key} value={key}>
                            {key}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>

                {/* Tab Konten */}
                <TabsContent value="content" className="space-y-4">
                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <Label>Tampilkan Pengumuman</Label>
                    <Switch
                      checked={data.show_announcements}
                      onCheckedChange={(val) =>
                        setData('show_announcements', val)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <Label>Tampilkan Galeri</Label>
                    <Switch
                      checked={data.show_gallery}
                      onCheckedChange={(val) => setData('show_gallery', val)}
                    />
                  </div>
                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <Label>Tampilkan Berita</Label>
                    <Switch
                      checked={data.show_blog}
                      onCheckedChange={(val) => setData('show_blog', val)}
                    />
                  </div>
                </TabsContent>

                {/* Tab Sistem */}
                <TabsContent value="system" className="space-y-4">
                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <Label>Mode Pemeliharaan</Label>
                    <Switch
                      checked={data.maintenance_mode}
                      onCheckedChange={(val) =>
                        setData('maintenance_mode', val)
                      }
                    />
                  </div>
                  <div>
                    <Label>Pesan Pemeliharaan</Label>
                    <textarea
                      className="mt-2 w-full rounded-md border bg-background p-2"
                      rows={3}
                      value={data.maintenance_message}
                      onChange={(e) =>
                        setData('maintenance_message', e.target.value)
                      }
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
