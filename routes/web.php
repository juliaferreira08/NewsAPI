<?php
use Illuminate\Support\Facades\Route;

Route::get('/{any}', function () {
    return view('welcome'); // ou sua view principal que carrega o Vue
})->where('any', '.*');
