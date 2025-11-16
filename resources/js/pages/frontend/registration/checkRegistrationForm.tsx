import { useState } from "react";
import { Head, router } from "@inertiajs/react";
import FrontendLayout from "@/layouts/frontend-layout";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function CheckRegistrationForm() {
    const [code, setCode] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!code.trim()) return;
        router.get(`/cek-pendaftaran/${code}`);
    };

    return (
        <FrontendLayout>
            <Head title="Cek Status Pendaftaran" />

            <div className="container max-w-3xl mx-auto p-10 flex flex-col items-center">
                <Card className="w-full max-w-md shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-center text-2xl font-bold">
                            Cek Status Pendaftaran
                        </CardTitle>
                        <p className="text-gray-600 text-center">
                            Masukkan nomor registrasi yang Anda terima saat pendaftaran.
                        </p>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-1">
                                <Label htmlFor="code">Nomor Registrasi</Label>
                                <Input
                                    id="code"
                                    type="text"
                                    placeholder="Contoh: PSB2025-00123"
                                    value={code}
                                    className="mt-2"
                                    onChange={(e) => setCode(e.target.value)}
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-green-600 hover:bg-green-700"
                            >
                                Cek Status
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </FrontendLayout>
    );
}
