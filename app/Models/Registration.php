<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Registration extends Model
{
    use HasFactory;

    protected $fillable = [
        'registration_code',
        'full_name',
        'nik',
        'gender',
        'birth_place',
        'birth_date',
        'address',
        'previous_school',
        'parent_name',
        'parent_contact',
        'status',
        'payment_proof'
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($registration) {
            $last = self::latest('id')->first();
            $nextId = $last ? $last->id + 1 : 1;
            $registration->registration_code = 'PSB' . date('Y') . '-' . str_pad($nextId, 5, '0', STR_PAD_LEFT);
        });
    }
    // protected static function boot()
    // {
    //     parent::boot();

    //     static::creating(function ($registration) {
    //         $random = strtoupper(substr(md5(uniqid()), 0, 4));

    //         $registration->registration_code = 'PSB' . date('Y') . '-' . $registration->id . $random;
    //         $registration->save();
    //     });
    // }


    protected $casts = [
        'is_verified' => 'boolean',
        'birth_date' => 'date',
    ];
}
