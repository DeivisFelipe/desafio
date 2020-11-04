<?php

use Illuminate\Support\Facades\Route;



Route::get('/', [App\Http\Controllers\HomeController::class, 'index'])->name('desafio');
Route::get('/profile',  [App\Http\Controllers\HomeController::class, 'index'])->name('desafio');
Route::get('/dash',  [App\Http\Controllers\HomeController::class, 'index'])->name('desafio');
