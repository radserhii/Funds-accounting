<?php

namespace App\Http\Controllers;

use App\Operation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OperationController extends Controller
{
    /**
     * Display a listing of operations from the registered user
     * @param Operation $operation
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Operation $operation)
    {
        $userId = Auth::id();
        $operation = $operation->getOperationsForUser($userId);
        return response()->json($operation, 200);
    }

    /**
     * Store a newly operation in storage
     * @param Request $request
     * @param Operation $operation
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request, Operation $operation)
    {
        $userId = Auth::id();
        $operation = $operation->storeOperationForUser($userId, $request);

        return response()->json($operation, 201);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Operation $operation
     * @return \Illuminate\Http\Response
     */
    public function edit()
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\Operation $operation
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Operation $operation)
    {
        //
    }


    public function destroy($id, Operation $operation)
    {
        $operation->deleteOperation($id);
        return response()->json('Successful delete', 200);
    }
}
