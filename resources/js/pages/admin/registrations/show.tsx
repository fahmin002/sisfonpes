import { Head, usePage, Link, useForm } from "@inertiajs/react"
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
import { ArrowLeft, CheckCircle, XCircle, RefreshCw } from "lucide-react"
import { GlobalConfirmDialog } from "@/components/global-confirm-dialog"

export default function Show() {
    const { props }: any = usePage()
    const registration = props.registration

    const getStatusBadge = (status: string) => {
        const colors: Record<string, string> = {
            pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
            accepted: "bg-green-100 text-green-800 border-green-200",
            rejected: "bg-red-100 text-red-800 border-red-200",
        }
        return (
            <Badge className={colors[status] || "bg-gray-100 text-gray-800"}>
                {status.toUpperCase()}
            </Badge>
        )
    }

    const { patch } = useForm();

    return (
        <>
            <Head title={`Detail Pendaftar - ${registration.name}`} />

            <div className="container max-w-4xl mx-auto py-10 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">Detail Pendaftar</h1>
                        <p className="text-muted-foreground text-sm">
                            Informasi lengkap calon santri.
                        </p>
                    </div>
                    <Link href={route("admin.registrations.index")}>
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
                                <CardTitle>{registration.name}</CardTitle>
                                <CardDescription>
                                    Kode Pendaftaran:{" "}
                                    <span className="font-mono text-sm">
                                        {registration.registration_code}
                                    </span>
                                </CardDescription>
                            </div>
                            {getStatusBadge(registration.status)}
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-semibold mb-2">Informasi Pribadi</h3>
                                <dl className="text-sm space-y-1">
                                    <div>
                                        <dt className="font-medium">Nama Lengkap</dt>
                                        <dd>{registration.name}</dd>
                                    </div>
                                    <div>
                                        <dt className="font-medium">Email</dt>
                                        <dd>{registration.email ?? "-"}</dd>
                                    </div>
                                    <div>
                                        <dt className="font-medium">Nomor Telepon</dt>
                                        <dd>{registration.phone ?? "-"}</dd>
                                    </div>
                                    <div>
                                        <dt className="font-medium">Tanggal Lahir</dt>
                                        <dd>{registration.birth_date ?? "-"}</dd>
                                    </div>
                                </dl>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-2">Data Orang Tua</h3>
                                <dl className="text-sm space-y-1">
                                    <div>
                                        <dt className="font-medium">Nama Ayah</dt>
                                        <dd>{registration.father_name ?? "-"}</dd>
                                    </div>
                                    <div>
                                        <dt className="font-medium">Nama Ibu</dt>
                                        <dd>{registration.mother_name ?? "-"}</dd>
                                    </div>
                                    <div>
                                        <dt className="font-medium">Nomor Kontak Orang Tua</dt>
                                        <dd>{registration.parent_contact ?? "-"}</dd>
                                    </div>
                                </dl>
                            </div>
                        </div>

                        <Separator />

                        <div>
                            <h3 className="font-semibold mb-2">Alamat & Sekolah Asal</h3>
                            <dl className="text-sm space-y-1">
                                <div>
                                    <dt className="font-medium">Alamat</dt>
                                    <dd>{registration.address ?? "-"}</dd>
                                </div>
                                <div>
                                    <dt className="font-medium">Sekolah Asal</dt>
                                    <dd>{registration.previous_school ?? "-"}</dd>
                                </div>
                            </dl>
                        </div>

                        <Separator />

                        <div>
                            <h3 className="font-semibold mb-2">Catatan Tambahan</h3>
                            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                                {registration.note || "Tidak ada catatan tambahan."}
                            </p>
                        </div>
                    </CardContent>

                    <CardFooter className="flex justify-between">
                        <div className="text-xs text-muted-foreground">
                            Didaftarkan pada:{" "}
                            {new Date(registration.created_at).toLocaleDateString("id-ID")}
                        </div>

                        <div className="flex gap-2">
                            <GlobalConfirmDialog
                                trigger={
                                    <Button variant="outline" className="flex items-center gap-1">
                                        <RefreshCw className="h-4 w-4" /> Reset Status
                                    </Button>
                                }
                                title="Reset Status Pendaftar?"
                                description="Tindakan ini akan mengatur ulang status pendaftar."
                                confirmText="Reset"
                                confirmVariant="outline"
                                onConfirm={() =>
                                    patch(route("admin.registrations.updateStatus", { id: registration.id }), {
                                        data: { status: "pending" },
                                    })
                                }
                            />

                            <GlobalConfirmDialog
                                trigger={
                                    <Button className="flex items-center gap-1">
                                        <CheckCircle className="h-4 w-4" /> Terima
                                    </Button>
                                }
                                title="Terima Pendaftar?"
                                description="Santri ini akan diterima dan statusnya berubah menjadi 'Diterima'."
                                confirmText="Terima"
                                confirmVariant="default"
                                onConfirm={() =>
                                    patch(route("admin.registrations.updateStatus", { id: registration.id }), {
                                        data: { status: "accepted" },
                                    })
                                }
                            />

                            <GlobalConfirmDialog
                                trigger={
                                    <Button variant="destructive" className="flex items-center gap-1">
                                        <XCircle className="h-4 w-4" /> Tolak
                                    </Button>
                                }
                                title="Tolak Pendaftar?"
                                description="Tindakan ini akan menandai pendaftar sebagai 'Ditolak'."
                                confirmText="Tolak"
                                confirmVariant="destructive"
                                onConfirm={() =>
                                    patch(route("admin.registrations.updateStatus", { id: registration.id }), {
                                        data: { status: "rejected" },
                                    })
                                }
                            />
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </>
    )
}
