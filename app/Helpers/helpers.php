<?php

use App\Models\Setting;
use Illuminate\Support\Facades\Cache;

if (!function_exists('setting')) {
    function setting(string $key, $default = null)
    {
        return Setting::where('key', $key)->value('value') ?? $default;
    }
}

if (!function_exists('setting_cached')) {
    function setting_cached(string $key, $default = null)
    {
        return Cache::rememberForever("setting_{$key}", function () use ($key, $default) {
            return Setting::where('key', $key)->value('value') ?? $default;
        });
    }
}

if (!function_exists('clear_setting_cache')) {
    function clear_setting_cache(string $key)
    {
        Cache::forget("setting_{$key}");
    }
}
