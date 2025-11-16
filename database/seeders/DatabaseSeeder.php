<?php

namespace Database\Seeders;

use App\Models\User;
use Carbon\Carbon;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::firstOrCreate(
        //     ['email' => 'test@example.com'],
        //     [
        //         'name' => 'Test User',
        //         'password' => 'password',
        //         'email_verified_at' => now(),
        //     ]
        // );
        // admin user seeder
        if (!User::where('email', 'admin@example.com')->exists()) {
            User::create([
                'name' => 'Admin',
                'email' => 'admin@example.com',
                'password' => Hash::make('admin123'), // ubah sesuai keinginan
                'role' => 'admin',
            ]);
        }

        $this->call([
            AnnouncementSeeder::class,
            MenuSeeder::class,
            MessageSeeder::class,
            PageSeeder::class,
            PostSeeder::class,
            ProgramSeeder::class,
            RegistrationSeeder::class,
            SettingSeeder::class,
        ]);
    }
}
