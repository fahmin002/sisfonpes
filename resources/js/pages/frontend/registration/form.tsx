import { Head, useForm } from "@inertiajs/react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import FrontendLayout from "@/layouts/frontend-layout";

export default function RegistrationForm() {
    const { data, setData, post, processing, errors, reset } = useForm({
        full_name: "",
        gender: "",
        birth_place: "",
        birth_date: "",
        address: "",
        previous_school: "",
        parent_name: "",
        parent_contact: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("registration.submit"), {
            onSuccess: () => reset(),
        });
    };

    return (
        <>
            <FrontendLayout>
                <Head title="Pendaftaran Santri" />

                <div className="container max-w-3xl mx-auto p-10">
                    <Card className="border-border shadow-md">
                        <CardHeader>
                            <CardTitle className="text-xl font-bold">
                                Formulir Pendaftaran Calon Santri
                            </CardTitle>
                        </CardHeader>

                        <form onSubmit={submit}>
                            <CardContent className="space-y-6">

                                {/* Nama Lengkap */}
                                <div className="space-y-1">
                                    <Label>Nama Lengkap</Label>
                                    <Input
                                        value={data.full_name}
                                        className="mt-2"
                                        onChange={(e) => setData("full_name", e.target.value)}
                                    />
                                    {errors.full_name && (
                                        <p className="text-red-600 text-sm">{errors.full_name}</p>
                                    )}
                                </div>

                                {/* Gender */}
                                <div className="space-y-1">
                                    <Label>Jenis Kelamin</Label>
                                    <select
                                        className="border mt-2 rounded-md p-2 w-full"
                                        value={data.gender}
                                        onChange={(e) => setData("gender", e.target.value)}
                                    >
                                        <option value="">-- Pilih --</option>
                                        <option value="male">Laki-laki</option>
                                        <option value="female">Perempuan</option>
                                    </select>
                                    {errors.gender && (
                                        <p className="text-red-600 text-sm">{errors.gender}</p>
                                    )}
                                </div>

                                {/* Tempat Lahir */}
                                <div className="space-y-1">
                                    <Label>Tempat Lahir</Label>
                                    <Input
                                        value={data.birth_place}
                                        className="mt-2"
                                        onChange={(e) => setData("birth_place", e.target.value)}
                                    />
                                    {errors.birth_place && (
                                        <p className="text-red-600 text-sm">{errors.birth_place}</p>
                                    )}
                                </div>

                                {/* Tanggal Lahir */}
                                <div className="space-y-1">
                                    <Label>Tanggal Lahir</Label>
                                    <Input
                                        type="date"
                                        value={data.birth_date}
                                        className="mt-2"
                                        onChange={(e) => setData("birth_date", e.target.value)}
                                    />
                                    {errors.birth_date && (
                                        <p className="text-red-600 text-sm">{errors.birth_date}</p>
                                    )}
                                </div>

                                {/* Alamat */}
                                <div className="space-y-1">
                                    <Label>Alamat</Label>
                                    <Textarea
                                        value={data.address}
                                        className="mt-2"
                                        onChange={(e) => setData("address", e.target.value)}
                                    />
                                    {errors.address && (
                                        <p className="text-red-600 text-sm">{errors.address}</p>
                                    )}
                                </div>

                                {/* Sekolah Asal */}
                                <div className="space-y-1">
                                    <Label>Sekolah Asal</Label>
                                    <Input
                                        value={data.previous_school}
                                        className="mt-2"
                                        onChange={(e) =>
                                            setData("previous_school", e.target.value)
                                        }
                                    />
                                    {errors.previous_school && (
                                        <p className="text-red-600 text-sm">
                                            {errors.previous_school}
                                        </p>
                                    )}
                                </div>

                                {/* Nama Orang Tua */}
                                <div className="space-y-1">
                                    <Label>Nama Orang Tua</Label>
                                    <Input
                                        value={data.parent_name}
                                        className="mt-2"
                                        onChange={(e) =>
                                            setData("parent_name", e.target.value)
                                        }
                                    />
                                    {errors.parent_name && (
                                        <p className="text-red-600 text-sm">
                                            {errors.parent_name}
                                        </p>
                                    )}
                                </div>

                                {/* Kontak Orang Tua */}
                                <div className="space-y-1">
                                    <Label>Kontak Orang Tua</Label>
                                    <Input
                                        value={data.parent_contact}
                                        className="mt-2"
                                        onChange={(e) =>
                                            setData("parent_contact", e.target.value)
                                        }
                                    />
                                    {errors.parent_contact && (
                                        <p className="text-red-600 text-sm">
                                            {errors.parent_contact}
                                        </p>
                                    )}
                                </div>
                            </CardContent>

                            <CardFooter className="flex justify-end mt-4">
                                <Button type="submit" disabled={processing} className="bg-emerald-600 hover:bg-emerald-800">
                                    {processing ? "Mengirim..." : "Daftar Sekarang"}
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </div>
            </FrontendLayout>
            </>
            );
}
