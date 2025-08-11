<?php

use App\Http\Controllers\BuscaController;

Route::post('/salvar', [BuscaController::class, 'salvar']);
Route::get('/buscarHistorico', [BuscaController::class, 'buscar']);