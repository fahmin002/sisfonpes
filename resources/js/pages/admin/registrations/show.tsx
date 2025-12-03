import { Head, usePage, Link, useForm, router } from "@inertiajs/react"
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
import { route } from "ziggy-js"
import AppLayout from "@/layouts/app-layout"

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

    const breadcrumbs = [
        {
            title: "Pendaftaran Santri",
            href: "/admin/registrations",
        },
        {
            title: `Detail Pendaftar - ${registration.full_name}`,
            href: `/admin/registrations/${registration.id}`,
        },
    ];

    const handleStatusChange = (status, registration) => {
        router.patch(
            route("admin.registrations.updateStatus", registration.id),
            { status }
        )
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Detail Pendaftar - ${registration.full_name}`} />

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
                                <CardTitle>{registration.full_name}</CardTitle>
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
                                <dl className="text-sm space-y-1 flex flex-col gap-2">
                                    <div>
                                        <dt className="font-semibold">NIK</dt>
                                        <dd>{registration.nik}</dd>
                                    </div>
                                    <div>
                                        <dt className="font-semibold">Nama Lengkap</dt>
                                        <dd>{registration.full_name}</dd>
                                    </div>

                                    <div>
                                        <dt className="font-semibold">Jenis Kelamin</dt>
                                        <dd>
                                            {registration.gender === "male"
                                                ? "Laki-laki"
                                                : registration.gender === "female"
                                                    ? "Perempuan"
                                                    : "-"}
                                        </dd>
                                    </div>

                                    <div>
                                        <dt className="font-semibold">Tempat Lahir</dt>
                                        <dd>{registration.birth_place ?? "-"}</dd>
                                    </div>

                                    <div>
                                        <dt className="font-semibold">Tanggal Lahir</dt>
                                        <dd>
                                            {registration.birth_date
                                                ? new Date(registration.birth_date).toLocaleDateString("id-ID")
                                                : "-"}
                                        </dd>
                                    </div>
                                </dl>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-2">Data Orang Tua</h3>
                                <dl className="text-sm space-y-1 flex flex-col gap-2">
                                    <div>
                                        <dt className="font-semibold">Nama Orang Tua/Wali</dt>
                                        <dd>{registration.parent_name ?? "-"}</dd>
                                    </div>
                                    <div>
                                        <dt className="font-semibold">Nomor Kontak Orang Tua</dt>
                                        <dd>{registration.parent_contact ?? "-"}</dd>
                                    </div>
                                </dl>
                            </div>
                        </div>

                        <Separator />

                        <div>
                            <h3 className="font-semibold mb-2">Alamat & Sekolah Asal</h3>
                            <dl className="text-sm space-y-1 flex-col flex gap-2">
                                <div>
                                    <dt className="font-semibold">Alamat</dt>
                                    <dd>{registration.address ?? "-"}</dd>
                                </div>
                                <div>
                                    <dt className="font-semibold">Sekolah Asal</dt>
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
                        <Separator />
                        <div className="mt-4">
                            <h3 className="font-medium mb-2">Bukti Pembayaran</h3>

                            {!registration.payment_proof ? (
                                <p className="text-sm text-muted-foreground">Tidak ada bukti pembayaran.</p>
                            ) : registration.payment_proof.toLowerCase().endsWith(".pdf") ? (
                                <iframe
                                    src={`/storage/${registration.payment_proof}`}
                                    className="w-full h-96 border rounded"
                                ></iframe>
                            ) : (
                                <img
                                    src={`/storage/${registration.payment_proof}`}
                                    className="w-full max-w-md rounded border object-cover"
                                    alt="Payment Proof"
                                />
                            )}
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
                                    handleStatusChange("pending", registration)
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
                                    handleStatusChange("accepted", registration)
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
                                    handleStatusChange("rejected", registration)
                                }
                            />
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </AppLayout>
    )
}
