import AppLayout from "@/layouts/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Head } from "@inertiajs/react";
import { Newspaper, Image, Users, Mail } from "lucide-react";
import { type BreadcrumbItem } from "@/types";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
  },
];

export default function Dashboard({ stats = {}, recentPosts = [] }) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="flex flex-col gap-4 p-4 overflow-x-auto rounded-xl h-full flex-1">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Selamat Datang, {stats.userName ?? "Admin"}
          </h1>
          <p className="text-muted-foreground">
            Ringkasan aktivitas terbaru sistem informasi pesantren
          </p>
        </div>

        {/* Statistik Cepat */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border border-sidebar-border/70 dark:border-sidebar-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Berita</CardTitle>
              <Newspaper className="w-4 h-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.posts ?? 0}</div>
              <p className="text-xs text-muted-foreground">Total berita aktif</p>
            </CardContent>
          </Card>

          <Card className="border border-sidebar-border/70 dark:border-sidebar-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Galeri</CardTitle>
              <Image className="w-4 h-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.galleries ?? 0}</div>
              <p className="text-xs text-muted-foreground">Foto kegiatan</p>
            </CardContent>
          </Card>

          <Card className="border border-sidebar-border/70 dark:border-sidebar-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Pendaftar</CardTitle>
              <Users className="w-4 h-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.registrations ?? 0}</div>
              <p className="text-xs text-muted-foreground">Santri baru bulan ini</p>
            </CardContent>
          </Card>

          <Card className="border border-sidebar-border/70 dark:border-sidebar-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Pesan Masuk</CardTitle>
              <Mail className="w-4 h-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.contacts ?? 0}</div>
              <p className="text-xs text-muted-foreground">Belum dibaca</p>
            </CardContent>
          </Card>
        </div>

        {/* Aktivitas Terbaru */}
        <div className="relative flex-1 min-h-[50vh] overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">

          <div className="relative z-10 p-4">
            <h2 className="text-lg font-semibold mb-2">Berita Terbaru</h2>
            {recentPosts.length > 0 ? (
              <ul className="space-y-1 text-sm">
                {recentPosts.map((post) => (
                  <li
                    key={post.id}
                    className="flex justify-between border-b border-border/40 py-1"
                  >
                    <span>{post.title}</span>
                    <span className="text-muted-foreground text-xs">
                      {new Date(post.created_at).toLocaleDateString()}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">
                Belum ada berita terbaru.
              </p>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
