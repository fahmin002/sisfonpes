<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;

class RegistrationSeeder extends Seeder
{
    /**
     * Jalankan seeder untuk tabel registrations.
     */
    public function run(): void
    {
        $now = Carbon::now();

        DB::table('registrations')->insert([
            [
                'registration_code' => 'REG-' . strtoupper(Str::random(6)),
                'full_name' => 'Ahmad Fauzan',
                'gender' => 'male',
                'birth_place' => 'Kediri',
                'birth_date' => '2010-04-15',
                'address' => 'Jl. Pesantren No. 1, Kediri',
                'previous_school' => 'SDN Kediri 1',
                'parent_name' => 'H. Mulyono',
                'parent_contact' => '081234567890',
                'status' => 'pending',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'registration_code' => 'REG-' . strtoupper(Str::random(6)),
                'full_name' => 'Siti Aminah',
                'gender' => 'female',
                'birth_place' => 'Blitar',
                'birth_date' => '2011-08-20',
                'address' => 'Desa Sukamaju, Blitar',
                'previous_school' => 'MI Al-Hidayah',
                'parent_name' => 'Hj. Rukiyah',
                'parent_contact' => '082198765432',
                'status' => 'accepted',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'registration_code' => 'REG-' . strtoupper(Str::random(6)),
                'full_name' => 'Rizky Nur Rahman',
                'gender' => 'male',
                'birth_place' => 'Tulungagung',
                'birth_date' => '2010-12-10',
                'address' => 'Jl. Raya Selatan No. 5, Tulungagung',
                'previous_school' => 'SD Muhammadiyah 3',
                'parent_name' => 'Bapak Nurhadi',
                'parent_contact' => '085322445566',
                'status' => 'rejected',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'registration_code' => 'REG-' . strtoupper(Str::random(6)),
                'full_name' => 'Fatimah Zahra',
                'gender' => 'female',
                'birth_place' => 'Malang',
                'birth_date' => '2011-02-02',
                'address' => 'Jl. Santri No. 8, Malang',
                'previous_school' => 'SD Islam Terpadu Al-Falah',
                'parent_name' => 'Bapak Hidayat',
                'parent_contact' => '081355558888',
                'status' => 'pending',
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ]);
    }
}
