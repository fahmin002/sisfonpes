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
  const { data, setData, post, processing, errors } = useForm({
    site_name: settings.site_name || 'Sistem Informasi Pesantren',
    site_tagline: settings.site_tagline || '',
    contact_email: settings.contact_email || '',
    contact_phone: settings.contact_phone || '',
    address: settings.address || '',
    dark_mode: localStorage.getItem('theme-mode') === 'dark' || settings.dark_mode === '1' ? true : false,
    theme_name: localStorage.getItem('theme-name') || settings.theme_name || 'defaultTheme',
    show_announcements: settings.show_announcements === '1' ? true : false,
    show_gallery: settings.show_gallery === '1' ? true : false,
    show_blog: settings.show_blog === '1' ? true : false,
    maintenance_mode: settings.maintenance_mode === '1' ? true : false,
    maintenance_message:
      settings.maintenance_message ||
      'Situs sedang dalam pemeliharaan. Silakan kembali lagi nanti.',
    logo: settings.logo || null
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('admin.settings.update'));
  };

  const handleSync = () => {
    window.location.reload();
    toast.info('Sinkronisasi selesai 🔄');
  };
  const [preview, setPreview] = useState<string | null>(null);
  const handleLogoChange = (file: File | null) => {
    setData("logo", file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Pengaturan Umum" />

      <div className="mx-auto h-full w-full bg-card p-6 shadow-sm">
        <div className="mb-4 max-w-2xl mx-auto flex items-center justify-between">
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

        <Card className='max-w-2xl mx-auto'>
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
                      className='mt-2'
                    />
                  </div>
                  <div>
                    <Label>Tagline</Label>
                    <Input
                      value={data.site_tagline}
                      onChange={(e) => setData('site_tagline', e.target.value)}
                      placeholder="Tagline atau slogan"
                      className='mt-2'
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
                      className='mt-2'
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
                      className='mt-2'
                    />
                  </div>
                  <div>
                    <Label>Alamat</Label>
                    <Input
                      value={data.address}
                      onChange={(e) => setData('address', e.target.value)}
                      placeholder="Alamat lengkap pesantren"
                      className='mt-2'
                    />
                  </div>
                  <div>
                    <Label>
                      Logo
                    </Label>
                    <Input
                      id="logo"
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleLogoChange(
                          e.target.files?.[0] ?? null
                        )
                      }
                      className="mt-2"
                    />

                    {(preview || settings.logo) && (
                      <div className="mt-3">
                        <p className="mb-1 text-sm text-muted-foreground">
                          Logo saat ini:
                        </p>
                        <img
                          src={preview || `/storage/${settings.logo}`}
                          alt={settings.site_name}
                          className="w-56 rounded-md border"
                        />
                      </div>
                    )}
                    {errors.logo && (
                      <p className="text-sm text-red-500">
                        {errors.logo}
                      </p>
                    )}
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
                        setActiveTheme(data.theme_name || "defaultTheme", val ? "dark" : "light");
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
                      <SelectTrigger className="w-[250px] mt-2">
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
