<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Libs\ApiPrivatbank;


class Operation extends Model
{

    protected $fillable = ['title', 'type', 'sum'];

    /**
     * Get the user that owns operation
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo('App\User');
    }

    /**
     * Get all operations for authenticated user
     * @param $userId
     * @return mixed
     */
    public function getOperationsForUser($userId)
    {
        return $this->whereHas('user', function ($query) use ($userId) {
            $query->where('id', $userId);
        })->orderBy('created_at', 'DESC')
            ->get();
    }

    /**
     * Store newly operation in db for authenticated user
     * @param $userId
     * @param $request
     * @return Operation
     */
    public function storeOperationForUser($userId, $request)
    {
        $operation = new Operation;

        $operation->title = $request->title;
        $operation->type = $request->type;
        $operation->sum = $request->sum;
        $operation->sum_usd = round($request->sum / ApiPrivatbank::getCourse('usd'), 2);
        $operation->user_id = $userId;
        $operation->save();

        return $operation;
    }

    /**
     * Get a single operation by id
     * @param $id
     * @return mixed
     */
    public function getOperation($id)
    {
        $operation = $this->findOrFail($id);
        return $operation;
    }


    /**
     * Update the operation in db
     * @param $id
     * @param $request
     */
    public function updateOperation($id, $request)
    {
        $operation = $this->findOrFail($id);
        $operation->title = $request->title;
        $operation->type = $request->type;
        $operation->sum = $request->sum;
        $operation->sum_usd = round($request->sum / ApiPrivatbank::getCourse('usd'), 2);
        $operation->save();
    }

    /**
     * Delete the operation from the db
     * @param $id - operation id
     */
    public function deleteOperation($id)
    {
        $operation = $this->find($id);
        $operation->delete();
    }
}
