<?php

namespace App\Http\Controllers;

use App\Models\Busca;
use Illuminate\Http\Request;

class BuscaController extends Controller
{
    // busca o histórico de Buscas
    public function buscar(Request $request)
    {
       try {
            $buscas = Busca::orderBy('data_busca', 'desc')->get();
            return response()->json([
                'status' => 'ok',
                'dados' => $buscas
            ], 200);

        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Ocorreu um erro ao buscar os registros.',
                'detalhes' => $e->getMessage()
            ], 500);
        }
    }

    // salva cada busca feita
    private function salvar(Request $request)
    {
        try {
            Busca::create([
                'descricao' => $request->descricao,
                'data_busca' => now()
            ]);

            return response()->json([
                'status' => 'ok',
                'message' => 'Busca salva com sucesso!'
            ], 201);

        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Ocorreu um erro ao salvar a busca.',
                'detalhes' => $e->getMessage()
            ], 500);
        }
    }
}