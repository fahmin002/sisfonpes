import FrontendLayout from "@/layouts/frontend-layout";
import { Head, Link } from "@inertiajs/react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function CheckRegistrationResult({ registration, code }) {
    return (
        <FrontendLayout>
            <Head title="Hasil Pencarian Pendaftaran" />

            <div className="container max-w-3xl mx-auto p-10 flex flex-col items-center">
                <Card className="w-full max-w-lg shadow-md">
                    <CardHeader>
                        <CardTitle className="text-center text-2xl">
                            Hasil Pencarian Pendaftaran
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        {/* Jika data tidak ditemukan */}
                        {!registration && (
                            <div className="text-center space-y-4">
                                <p className="text-red-600 font-semibold">
                                    Data dengan kode{" "}
                                    <span className="font-bold">{code}</span> tidak ditemukan.
                                </p>

                                <Button asChild variant="outline" className="text-green-700 border-green-700">
                                    <Link href="/cek-pendaftaran">
                                        Coba lagi
                                    </Link>
                                </Button>
                            </div>
                        )}

                        {/* Jika data ditemukan */}
                        {registration && (
                            <div className="space-y-6">
                                <div>
                                    <p className="text-gray-500">Nama Lengkap</p>
                                    <p className="font-semibold text-lg">{registration.full_name}</p>
                                </div>

                                <div>
                                    <p className="text-gray-500">Nomor Registrasi</p>
                                    <p className="font-semibold">{registration.registration_code}</p>
                                </div>

                                <div>
                                    <p className="text-gray-500">Status</p>
                                    <Badge
                                        className={
                                            registration.status === "pending"
                                                ? "bg-yellow-500"
                                                : registration.status === "accepted"
                                                ? "bg-green-600"
                                                : "bg-red-600"
                                        }
                                    >
                                        {registration.status.toUpperCase()}
                                    </Badge>
                                </div>

                                <div className="text-center pt-2">
                                    <Button asChild variant="link" className="text-green-700">
                                        <Link href="/cek-pendaftaran">Cek kode lain</Link>
                                    </Button>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </FrontendLayout>
    );
}
