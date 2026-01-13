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
import TiptapEditor from '@/components/TiptapEditor';

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
    site_logo: settings.site_logo || null,
    contact_email: settings.contact_email || '',
    contact_phone: settings.contact_phone || '',
    contact_address: settings.contact_address || '',
    social_facebook: settings.social_facebook || '',
    social_instagram: settings.social_instagram || '',
    social_twitter: settings.social_twitter || '',
    social_youtube: settings.social_youtube || '',
    appearance_dark_mode: Boolean(
      localStorage.getItem('theme-mode') === 'dark' ||
      settings.appearance_dark_mode === true ||
      settings.appearance_dark_mode === '1'
    ),
    appearance_theme_name: localStorage.getItem('theme-name') || settings.appearance_theme_name || 'defaultTheme',
    feature_announcements: Boolean(settings.feature_announcements === '1' ? true : false),
    feature_gallery: Boolean(settings.feature_gallery === '1' ? true : false),
    feature_blog: Boolean(settings.feature_blog === '1' ? true : false),
    registration_qris: settings.registration_qris || null,
    registration_flyer: settings.registration_flyer || null,
    registration_fee: settings.registration_fee || '',
    registration_note: settings.registration_note || '',
    system_maintenance: Boolean(
      settings.system_maintenance === true ||
      settings.system_maintenance === '1'
    ),
    system_maintenance_message:
      settings.system_maintenance_message || '',
    profile_vision: settings.profile_vision || '',
    profile_mission: settings.profile_mission || '',
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('admin.settings.update'));
  };

  const handleSync = () => {
    window.location.reload();
    toast.info('Sinkronisasi selesai 🔄');
  };
  // Preview logo sebelum diupload
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const handleLogoChange = (file: File | null) => {
    setData("site_logo", file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogoPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setLogoPreview(null);
    }
  };
  // qris image preview
  const [qrisPreview, setQrisPreview] = useState<string | null>(null);
  const handleQrisChange = (file: File | null) => {
    setData("registration_qris", file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setQrisPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setQrisPreview(null);
    }
  }
  // registration flyer image preview
  const [regFlyerPreview, setRegFlyerPreview] = useState<string | null>(null);
  const handleRegFlyerChange = (file: File | null) => {
    setData("registration_flyer", file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setRegFlyerPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setRegFlyerPreview(null);
    }
  }
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
                <TabsList className="mb-4 grid w-full grid-cols-3 md:grid-cols-6">
                  <TabsTrigger value="general">Umum</TabsTrigger>
                  <TabsTrigger value="appearance">Tampilan</TabsTrigger>
                  <TabsTrigger value="social">Sosial Media</TabsTrigger>
                  <TabsTrigger value="registration">Flyer & QRIS</TabsTrigger>
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
                      value={data.contact_address}
                      onChange={(e) => setData('contact_address', e.target.value)}
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

                    {(logoPreview || settings.site_logo) && (
                      <div className="mt-3">
                        <p className="mb-1 text-sm text-muted-foreground">
                          Logo saat ini:
                        </p>
                        <img
                          src={logoPreview || `/storage/${settings.site_logo}`}
                          alt={settings.site_name}
                          className="w-56 rounded-md border"
                        />
                      </div>
                    )}
                    {errors.site_logo && (
                      <p className="text-sm text-red-500">
                        {errors.site_logo}
                      </p>
                    )}
                  </div>
                  {/* Visi (Dengan TipTapEditor) */}
                  <div>
                    <TiptapEditor
                      label='Visi Pesantren'
                      value={data.profile_vision}
                      onChange={(value) => setData('profile_vision', value)}
                      error={errors.profile_vision}
                    />
                  </div>
                  {/* Misi (Dengan TipTapEditor) */}
                  <div>
                    <TiptapEditor
                      label='Misi Pesantren'
                      value={data.profile_mission}
                      onChange={(value) => setData('profile_mission', value)}
                      error={errors.profile_mission}
                    />
                  </div>
                </TabsContent>

                {/* Tab Flyer Pendaftaran dan Pembayaran */}
                <TabsContent value="registration" className="space-y-4">
                  <div>
                    <Label>
                      Flyer Pendaftaran
                    </Label>
                    <Input
                      id="reg_flyer"
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleRegFlyerChange(
                          e.target.files?.[0] ?? null
                        )
                      }
                      className="mt-2"
                    />

                    {(regFlyerPreview || settings.registration_flyer) && (
                      <div className="mt-3">
                        <p className="mb-1 text-sm text-muted-foreground">
                          Flyer pendaftaran saat ini:
                        </p>
                        <img
                          src={regFlyerPreview || `/storage/${settings.registration_flyer}`}
                          alt={settings.site_name}
                          className="w-56 rounded-md border"
                        />
                      </div>
                    )}
                    {errors.registration_flyer && (
                      <p className="text-sm text-red-500">
                        {errors.registration_flyer}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label>
                      QRIS Pembayaran
                    </Label>
                    <Input
                      id="qris"
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleQrisChange(
                          e.target.files?.[0] ?? null
                        )
                      }
                      className="mt-2"
                    />

                    {(qrisPreview || settings.registration_qris) && (
                      <div className="mt-3">
                        <p className="mb-1 text-sm text-muted-foreground">
                          QRIS pembayaran saat ini:
                        </p>
                        <img
                          src={qrisPreview || `/storage/${settings.registration_qris}`}
                          alt={settings.site_name}
                          className="w-56 rounded-md border"
                        />
                      </div>
                    )}
                    {errors.registration_qris && (
                      <p className="text-sm text-red-500">
                        {errors.registration_qris}
                      </p>
                    )}
                  </div>
                  {/* registration fee */}
                  <div>
                    <Label>Biaya Pendaftaran</Label>
                    <Input
                      value={data.registration_fee}
                      onChange={(e) =>
                        setData('registration_fee', e.target.value)
                      }
                      placeholder="Biaya pendaftaran siswa baru"
                      className='mt-2'
                    />
                  </div>
                  {/* registration note */}
                  <div>
                    <Label>Catatan Pendaftaran</Label>
                    <Input
                      value={data.registration_note}
                      onChange={(e) =>
                        setData('registration_note', e.target.value)
                      }
                      placeholder="Catatan penting terkait pendaftaran"
                      className='mt-2'
                    />
                  </div>
                </TabsContent>
                {/* Tab Sosial Media */}
                <TabsContent value="social" className="space-y-4">
                  <div>
                    <Label htmlFor="facebook">Facebook</Label>
                    <Input
                      id="facebook"
                      value={data.social_facebook}
                      onChange={(e) => setData("social_facebook", e.target.value)}
                      placeholder="https://www.facebook.com/..."
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input
                      id="instagram"
                      value={data.social_instagram}
                      onChange={(e) => setData("social_instagram", e.target.value)}
                      placeholder="https://www.instagram.com/..."
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="youtube">YouTube</Label>
                    <Input
                      id="youtube"
                      value={data.social_youtube}
                      onChange={(e) => setData("social_youtube", e.target.value)}
                      placeholder="https://www.youtube.com/..."
                      className="mt-2"
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
                      checked={data.appearance_dark_mode}
                      onCheckedChange={(val) => {
                        setData("appearance_dark_mode", val);
                        setActiveTheme(data.appearance_theme_name || "defaultTheme", val ? "dark" : "light");
                      }}
                    />
                  </div>

                  {/* 🎨 Pilihan Tema */}
                  <div className="space-y-2">
                    <Label>Warna Tema</Label>
                    <Select
                      value={data.appearance_theme_name}
                      onValueChange={(val) => {
                        setData("appearance_theme_name", val);
                        setActiveTheme(val, data.appearance_dark_mode ? "dark" : "light");
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
                      checked={data.feature_announcements}
                      onCheckedChange={(val) =>
                        setData('feature_announcements', val)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <Label>Tampilkan Galeri</Label>
                    <Switch
                      checked={data.feature_gallery}
                      onCheckedChange={(val) => setData('feature_gallery', val)}
                    />
                  </div>
                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <Label>Tampilkan Berita</Label>
                    <Switch
                      checked={data.feature_blog}
                      onCheckedChange={(val) => setData('feature_blog', val)}
                    />
                  </div>
                </TabsContent>

                {/* Tab Sistem */}
                <TabsContent value="system" className="space-y-4">
                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <Label>Mode Pemeliharaan</Label>
                    <Switch
                      checked={data.system_maintenance}
                      onCheckedChange={(val) =>
                        setData('system_maintenance', val)
                      }
                    />
                  </div>
                  <div>
                    <Label>Pesan Pemeliharaan</Label>
                    <textarea
                      className="mt-2 w-full rounded-md border bg-background p-2"
                      rows={3}
                      value={data.system_maintenance_message}
                      onChange={(e) =>
                        setData('system_maintenance_message', e.target.value)
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
