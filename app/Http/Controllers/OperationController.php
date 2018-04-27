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
     * Show the form for editing the operation
     * @param $id - operation id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function edit($id, Operation $operation)
    {
        $operation = $operation->getOperation($id);
        return view('edit-operation', ['operation' => $operation]);
    }

    /**
     * Update the operation in storage
     * @param $id - id operation
     * @param Request $request
     * @param Operation $operation
     * @return \Illuminate\Http\JsonResponse
     */
    public function update($id, Request $request, Operation $operation)
    {
        $operation->updateOperation($id, $request);

        return response()->json("Operation updated successful", 200);
    }

    /**
     * Delete the operation from the storage
     * @param $id - operation id
     * @param Operation $operation
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id, Operation $operation)
    {
        $operation->deleteOperation($id);
        return response()->json('Successful delete', 200);
    }
}
