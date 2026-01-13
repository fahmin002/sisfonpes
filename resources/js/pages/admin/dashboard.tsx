import React from "react";
import AppLayout from "@/layouts/app-layout";
import { Head, Link } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Newspaper, Image, Users, Mail, Bell, FileText } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { route } from "ziggy-js";

export default function DashboardPremium({ stats = {}, recentPosts = [], recentMessages = [], registrationsTrend = [], registrationsStatus = [], heroGalleries = [], settings = {} }) {
  const breadcrumbs = [
    { title: "Dashboard", href: "/admin/dashboard" },
  ];

  // Simple color palette (relies on theme for final look)
  const COLORS = ["#34D399", "#60A5FA", "#F59E0B", "#F87171"];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard — Premium" />

      <div className="flex flex-col gap-4 p-4 overflow-x-auto rounded-xl h-full flex-1">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Selamat Datang, {stats.userName ?? "Admin"}</h1>
            <p className="text-muted-foreground">Ringkasan aktivitas terbaru sistem informasi pesantren</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Tema aktif</div>
              <div className="font-medium">{settings.appearance_theme_name ?? 'default'}</div>
            </div>
            <Link
              href={route('admin.settings.index')}
            >
              <Button size="sm">Buka Pengaturan</Button>
            </Link>
          </div>
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
              <p className="text-xs text-muted-foreground">Total berita dipublikasikan</p>
            </CardContent>
          </Card>

          <Card className="border border-sidebar-border/70 dark:border-sidebar-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Pengumuman Aktif</CardTitle>
              <Bell className="w-4 h-4 text-indigo-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeAnnouncements ?? 0}</div>
              <p className="text-xs text-muted-foreground">Pengumuman yang sedang ditayangkan</p>
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
              <CardTitle className="text-sm font-medium">Pesan Masuk</CardTitle>
              <Mail className="w-4 h-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.unreadMessages ?? 0}</div>
              <p className="text-xs text-muted-foreground">Belum dibaca</p>
            </CardContent>
          </Card>
        </div>

        {/* Upper content: charts + hero gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="col-span-2 rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-4 min-h-[260px]">
            <h2 className="text-lg font-semibold mb-2">Tren Pendaftaran (30 hari)</h2>
            {registrationsTrend && registrationsTrend.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={registrationsTrend}>
                  <XAxis dataKey="date" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey="count" stroke="#3B82F6" strokeWidth={2} dot={{ r: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-sm text-muted-foreground">Tidak ada data pendaftaran.</p>
            )}

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-2">
              <div className="text-xs text-muted-foreground">Minggu ini: <span className="font-medium">{stats.registrations_week ?? 0}</span></div>
              <div className="text-xs text-muted-foreground">Total pendaftar: <span className="font-medium">{stats.registrations_total ?? 0}</span></div>
              <div className="text-xs text-muted-foreground">Status diterima: <span className="font-medium">{stats.registrations_accepted ?? 0}</span></div>
            </div>
          </div>

          <div className="rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-4 min-h-[260px]">
            <h2 className="text-lg font-semibold mb-2">Status Pendaftaran</h2>
            {registrationsStatus && registrationsStatus.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={registrationsStatus} dataKey="value" nameKey="name" innerRadius={40} outerRadius={70} paddingAngle={2} label>
                    {registrationsStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-sm text-muted-foreground">Tidak ada data status pendaftaran.</p>
            )}
          </div>
        </div>

        {/* Recent Posts & Messages */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="col-span-2 border border-sidebar-border/70 dark:border-sidebar-border">
            <CardHeader>
              <CardTitle>Berita Terbaru</CardTitle>
            </CardHeader>
            <CardContent>
              {recentPosts.length > 0 ? (
                <ul className="space-y-2 text-sm">
                  {recentPosts.map((post) => (
                    <li key={post.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-8 rounded overflow-hidden bg-neutral-100">
                          {post.thumbnail ? (
                            <img src={`/storage/${post.thumbnail}`} alt={post.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">No Image</div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{post.title}</div>
                          <div className="text-xs text-muted-foreground">{new Date(post.created_at).toLocaleDateString()}</div>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">{post.is_published ? 'Published' : 'Draft'}</div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">Belum ada berita terbaru.</p>
              )}
            </CardContent>
          </Card>

          <Card className="border border-sidebar-border/70 dark:border-sidebar-border">
            <CardHeader>
              <CardTitle>Pesan Terbaru</CardTitle>
            </CardHeader>
            <CardContent>
              {recentMessages.length > 0 ? (
                <ul className="space-y-2 text-sm">
                  {recentMessages.map((m) => (
                    <li key={m.id} className="flex flex-col">
                      <div className="font-medium">{m.name} <span className="text-xs text-muted-foreground">— {m.subject ?? '-'}</span></div>
                      <div className="text-xs text-muted-foreground">{new Date(m.created_at).toLocaleString()}</div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">Belum ada pesan masuk.</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Hero gallery */}
        <div className="rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-4">
          <h2 className="text-lg font-semibold mb-2">Hero Gallery</h2>
          <div className="flex gap-3 overflow-x-auto py-2">
            {heroGalleries && heroGalleries.length > 0 ? (
              heroGalleries.map((g) => (
                <div key={g.id} className="w-48 rounded overflow-hidden shadow-sm border">
                  <img src={`/storage/${g.image}`} alt={g.title} className="w-full h-28 object-cover" />
                  <div className="p-2 text-sm">
                    <div className="font-medium">{g.title}</div>
                    <div className="text-xs text-muted-foreground">{g.is_published ? 'Published' : 'Draft'}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-sm text-muted-foreground">Tidak ada hero gallery aktif.</div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}



