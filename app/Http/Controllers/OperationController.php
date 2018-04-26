<?php

namespace App\Http\Controllers;

use App\Operation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Libs\ApiPrivatbank;

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

        return response()->json($operation, 200);
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

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Operation $operation
     * @return \Illuminate\Http\Response
     */
    public function destroy(Operation $operation)
    {
        //
    }
}
