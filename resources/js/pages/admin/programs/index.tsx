import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head, Link, router } from "@inertiajs/react";
import { Edit2, Plus, Trash2 } from "lucide-react";
import { route } from "ziggy-js";
import { toast } from "sonner";
import SearchBar from "@/components/ui/search-bar";
import PaginationLinks from "@/components/ui/pagination-links";

interface Program {
    id: number;
    title: string;
    order: number;
    image: string | null;
}

export default function Index({ programs = [] }: { programs: Program[] }, filters) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: "Program Pendidikan", href: "/admin/programs" },
    ];

    const handleDelete = (program: Program) => {
        if (confirm(`Hapus program "${program.title}"?`)) {
            router.delete(route("admin.programs.destroy", program.id), {
                onSuccess: () => toast.success("Program berhasil dihapus."),
                onError: () => toast.error("Gagal menghapus program."),
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manajemen Program Pendidikan" />

            <div className="p-4">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Program Pendidikan</h1>
                    <div className="flex gap-2">
                        <SearchBar
                            routeName="admin.programs.index"
                            initialValue={filters?.search || ''}
                            placeholder="Cari Program..."
                        />
                        <Link href={route("admin.programs.create")}>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" /> Tambah Program
                            </Button>
                        </Link>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Program</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {programs.data.length > 0 ? (
                            <>
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b text-left">
                                            <th className="py-2">Judul</th>
                                            <th className="py-2">Gambar</th>
                                            <th className="py-2">Urutan</th>
                                            <th className="py-2 text-right">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {programs.data.map((program) => (
                                            <tr key={program.id} className="border-b hover:bg-muted/40">
                                                <td className="py-2">{program.title}</td>
                                                <td className="py-2">
                                                    {program.image ? (
                                                        <img
                                                            src={`/storage/${program.image}`}
                                                            alt={program.title}
                                                            className="h-10 w-16 object-cover rounded"
                                                        />
                                                    ) : (
                                                        <span className="text-xs text-muted-foreground italic">
                                                            (tidak ada)
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="py-2">{program.order}</td>
                                                <td className="py-2 text-right space-x-2">
                                                    <Link href={route("admin.programs.edit", program.id)}>
                                                        <Button variant="ghost" size="icon" title="Edit">
                                                            <Edit2 className="h-4 w-4 text-blue-600" />
                                                        </Button>
                                                    </Link>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        title="Hapus"
                                                        onClick={() => handleDelete(program)}
                                                    >
                                                        <Trash2 className="h-4 w-4 text-red-600" />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <PaginationLinks links={programs.links} />
                            </>
                        ) : (
                            <p className="text-sm text-muted-foreground">
                                Belum ada program.
                            </p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
