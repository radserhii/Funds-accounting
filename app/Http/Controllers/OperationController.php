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
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Operation $operation)
    {
        $userId = Auth::id();
        $operation = $operation->storeOperationForUser($userId, $request);

        return response()->json($operation, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Operation $operation
     * @return \Illuminate\Http\Response
     */
    public function show(Operation $operation)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Operation $operation
     * @return \Illuminate\Http\Response
     */
    public function edit(Operation $operation)
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
