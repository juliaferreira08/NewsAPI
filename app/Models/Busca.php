<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Busca extends Model
{
    protected $fillable = [
        'descricao',
        'data_busca'
    ];
}