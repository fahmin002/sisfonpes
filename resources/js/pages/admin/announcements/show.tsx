import { Head, usePage, Link } from "@inertiajs/react"
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft } from "lucide-react"
import AppLayout from "@/layouts/app-layout"

export default function Show() {
    const { props }: any = usePage()
    const announcement = props.announcement
    const breadcrumbs = [
        { title: "Pengumuman", href: "/admin/announcements" },
        { title: "Detail Pengumuman", href: `/admin/announcements/${announcement.id}` },
    ]
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Detail Pengumuman - ${announcement.title}`} />

            <div className="container max-w-3xl mx-auto py-10 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">Detail Pengumuman</h1>
                        <p className="text-muted-foreground text-sm">
                            Informasi lengkap pengumuman.
                        </p>
                    </div>
                    <Link href={route("admin.announcements.index")}>
                        <Button variant="outline">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Kembali
                        </Button>
                    </Link>
                </div>

                {/* Card Utama */}
                <Card className="shadow-md border-border">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>{announcement.title}</CardTitle>
                                <CardDescription>
                                    ID:{" "}
                                    <span className="font-mono text-sm">
                                        {announcement.id}
                                    </span>
                                </CardDescription>
                            </div>

                            <Badge
                                className={
                                    announcement.is_active
                                        ? "bg-green-100 text-green-800 border-green-200"
                                        : "bg-red-100 text-red-800 border-red-200"
                                }
                            >
                                {announcement.is_active ? "AKTIF" : "TIDAK AKTIF"}
                            </Badge>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {/* Content */}
                        <div>
                            <h3 className="font-semibold mb-2">Isi Pengumuman</h3>
                            <p className="text-sm whitespace-pre-wrap">
                                {announcement.content}
                            </p>
                        </div>

                        <Separator />

                        {/* Tanggal */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-semibold mb-2">Tanggal Mulai</h3>
                                <p className="text-sm">
                                    {announcement.start_date
                                        ? new Date(
                                              announcement.start_date
                                          ).toLocaleDateString("id-ID")
                                        : "-"}
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">Tanggal Berakhir</h3>
                                <p className="text-sm">
                                    {announcement.end_date
                                        ? new Date(
                                              announcement.end_date
                                          ).toLocaleDateString("id-ID")
                                        : "-"}
                                </p>
                            </div>
                        </div>

                        <Separator />

                        {/* Metadata */}
                        <div className="text-xs text-muted-foreground space-y-1">
                            <p>
                                Dibuat pada:{" "}
                                {new Date(announcement.created_at).toLocaleString(
                                    "id-ID"
                                )}
                            </p>
                            <p>
                                Diperbarui pada:{" "}
                                {new Date(announcement.updated_at).toLocaleString(
                                    "id-ID"
                                )}
                            </p>
                        </div>
                    </CardContent>

                    <CardFooter></CardFooter>
                </Card>
            </div>
        </AppLayout>
    )
}
