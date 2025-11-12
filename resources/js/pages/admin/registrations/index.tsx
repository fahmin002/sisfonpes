import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, MoreHorizontal } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import AppLayout from "@/layouts/app-layout";
import { cn } from "@/lib/utils";
import { type BreadcrumbItem } from "@/types";
import { Head, Link, router } from "@inertiajs/react";
import { Edit2, Plus, Trash2 } from "lucide-react";
import { route } from "ziggy-js";
import StatusActionDropdown from "./components/statusActionDropdown";
import SearchBar from "@/components/ui/search-bar";
import PaginationLinks from "@/components/ui/pagination-links";



export default function Index({ registrations, filters }) {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: "Pendaftaran Santri",
      href: "/admin/registrations",
    },
  ];

  // const handleToggleVerify = (registration) => {
  //   router.patch(route("admin.registrations.toggle", registration.id));
  // };
  const handleStatusChange = (status, registration) => {
    router.patch(
      route("admin.registrations.updateStatus", registration.id),
      { status }
    )
  }


  const handleDelete = (registration) => {
    if (confirm(`Hapus pendaftar "${registration.full_name}"?`)) {
      router.delete(route("admin.registrations.destroy", registration.id));
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Pendaftaran Santri" />

      <div className="p-4">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Manajemen Pendaftaran Santri</h1>
          <div className="flex gap-2">
            <SearchBar
              routeName="admin.registrations.index"
              placeholder="Cari Pendaftar..."
              initialValue={filters?.search || ''}
            />
          <Link href="/admin/registrations/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Tambah Pendaftar
            </Button>
          </Link>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Daftar Pendaftar</CardTitle>
          </CardHeader>
          <CardContent>
            {registrations.data.length > 0 ? (
              <TooltipProvider>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 text-left">Nama Lengkap</th>
                      <th className="py-2 text-left">Tanggal Daftar</th>
                      <th className="py-2 text-left">Status</th>
                      <th className="py-2 text-left">Detail</th>
                      <th className="py-2 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrations.data.map((reg) => (
                      <tr
                        key={reg.id}
                        className={cn("border-b transition-colors hover:bg-muted/40")}
                      >
                        <td className="py-2">{reg.full_name}</td>
                        <td className="py-2">
                          {new Date(reg.created_at).toLocaleDateString("id-ID")}
                        </td>
                        <td className="py-2">
                          <Badge
                            variant={
                              reg.status === 'accepted'
                                ? 'success'
                                : reg.status === 'rejected'
                                  ? 'destructive'
                                  : 'secondary'
                            }
                          >
                            {reg.status === 'accepted'
                              ? 'Diterima'
                              : reg.status === 'rejected'
                                ? 'Ditolak'
                                : 'Menunggu'}
                          </Badge>

                        </td>
                        <td className="py-2">
                          <Link
                            href={route("admin.registrations.show", reg.id)}
                            className="text-emerald-600 underline"
                          >
                            <Eye className="inline-block mr-1 h-4 w-4" />
                            Lihat Detail
                          </Link>
                        </td>
                        <td className="space-x-1 py-2 text-right">
                          {/* Edit */}
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Link href={route("admin.registrations.edit", reg.id)}>
                                <Button variant="ghost" size="icon">
                                  <Edit2 className="h-4 w-4" />
                                </Button>
                              </Link>
                            </TooltipTrigger>
                            <TooltipContent>Edit</TooltipContent>
                          </Tooltip>

                          {/* Verifikasi */}
                          <Tooltip>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <TooltipTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Aksi Status</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <StatusActionDropdown reg={reg} handleStatusChange={handleStatusChange} />
                              </DropdownMenuContent>
                            </DropdownMenu>
                            <TooltipContent>
                              Aksi Status
                            </TooltipContent>
                          </Tooltip>
                          {/* Hapus */}
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDelete(reg)}
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
                <PaginationLinks links={registrations.links} />
              </TooltipProvider>
            ) : (
              <p className="text-sm text-muted-foreground">Belum ada pendaftar.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
