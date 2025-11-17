import { Head, Link, usePage } from "@inertiajs/react"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, CheckCircle2 } from "lucide-react"
import { useEffect } from "react"
import { toast, Toaster } from "sonner"

export default function RegistrationSuccess() {
    const { props } = usePage()
    const code = props.code

    return (
        <>
            <Head title="Pendaftaran Berhasil" />

            <div className="container max-w-lg mx-auto py-16">
                <Card className="text-center p-6 border-border shadow-md">

                    <CardHeader>
                        <CheckCircle className="w-14 h-14 text-green-600 mx-auto mb-4" />
                        <CardTitle className="text-2xl font-semibold">
                            Pendaftaran Berhasil!
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <p className="text-muted-foreground">
                            Terima kasih telah mendaftar sebagai calon santri.
                        </p>

                        <div className="bg-muted p-4 rounded-lg">
                            <p className="text-sm text-muted-foreground mb-1">
                                Kode Pendaftaran Anda:
                            </p>
                            <p className="text-xl font-bold tracking-widest text-primary">
                                {code}
                            </p>
                        </div>

                        <p className="text-sm text-muted-foreground">
                            Simpan kode ini untuk mengecek status pendaftaran Anda.
                        </p>
                    </CardContent>

                    <CardFooter className="flex flex-col gap-3">
                        <Link href={route("registration.check")}>
                            <Button variant="default" className="w-full">
                                Cek Status Pendaftaran
                            </Button>
                        </Link>

                        <Link href="/">
                            <Button variant="outline" className="w-full">
                                Kembali ke Beranda
                            </Button>
                        </Link>
                    </CardFooter>

                </Card>
            </div>
        </>
    )
}
