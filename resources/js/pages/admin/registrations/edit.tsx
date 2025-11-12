import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head, Link, useForm } from "@inertiajs/react";
import { toast } from "sonner";

export default function Edit({ registration }) {
  const { data, setData, put, processing, errors } = useForm({
    full_name: registration.full_name || "",
    gender: registration.gender || "",
    birth_place: registration.birth_place || "",
    birth_date: registration.birth_date || "",
    address: registration.address || "",
    previous_school: registration.previous_school || "",
    parent_name: registration.parent_name || "",
    parent_contact: registration.parent_contact || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route("admin.registrations.update", registration.id), {
      onSuccess: () => toast.info("Data pendaftar berhasil diperbarui."),
    });
  };

  const breadcrumbs: BreadcrumbItem[] = [
    { title: "Pendaftaran Santri", href: "/admin/registrations" },
    { title: "Edit Data", href: `/admin/registrations/${registration.id}/edit` },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit Pendaftar" />
      <div className="mx-auto w-full h-full bg-card p-6 shadow-sm">
        <div className="mb-4 flex items-center max-w-2xl mx-auto justify-between">
          <h1 className="text-xl font-semibold">Edit Data Pendaftar</h1>
          <Link href="/admin/registrations">
            <Button variant="outline">Kembali</Button>
          </Link>
        </div>

        <Card className="mx-auto max-w-2xl">
          <CardHeader>
            <CardTitle>Form Edit Pendaftaran</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
              <div>
                <Label>Nama Lengkap</Label>
                <Input
                  value={data.full_name}
                  onChange={(e) => setData("full_name", e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Jenis Kelamin</Label>
                <select
                  className="mt-2 w-full rounded-md border bg-background p-2"
                  value={data.gender}
                  onChange={(e) => setData("gender", e.target.value)}
                >
                  <option value="">Pilih</option>
                  <option value="male">Laki-laki</option>
                  <option value="female">Perempuan</option>
                </select>
              </div>

              <div>
                <Label>Tempat Lahir</Label>
                <Input
                  value={data.birth_place}
                  onChange={(e) => setData("birth_place", e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Tanggal Lahir</Label>
                <Input
                  type="date"
                  value={data.birth_date}
                  onChange={(e) => setData("birth_date", e.target.value)}
                  className="mt-2"
                />
              </div>

              <div className="col-span-2">
                <Label>Alamat</Label>
                <Input
                  value={data.address}
                  onChange={(e) => setData("address", e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Sekolah Asal</Label>
                <Input
                  value={data.previous_school}
                  onChange={(e) => setData("previous_school", e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Nama Orang Tua</Label>
                <Input
                  value={data.parent_name}
                  onChange={(e) => setData("parent_name", e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Kontak Orang Tua</Label>
                <Input
                  value={data.parent_contact}
                  onChange={(e) => setData("parent_contact", e.target.value)}
                  className="mt-2"
                />
              </div>

              <div className="col-span-2">
                <Button type="submit" disabled={processing}>
                  Simpan Perubahan
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
