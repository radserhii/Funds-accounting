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
     * Get all operations for authenticated user and operations by date
     * @param $userId - id auth user
     * @param $startDate
     * @param $endDate
     * @return mixed
     */
    public function getOperationsForUser($userId, $startDate, $endDate)
    {
        $operations =  $this->whereHas('user', function ($query) use ($userId) {
            $query->where('id', $userId);
        });

        if($startDate &&  $endDate) {
            $operations = $operations->where('created_at', '>=', $startDate)
                ->where('created_at', '<=', $endDate);
        }

        $operations = $operations->orderBy('created_at', 'DESC')->get();

        return $operations;
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
        $currentCourse = ApiPrivatbank::getCourse('usd');

        $operation->title = $request->title;
        $operation->type = $request->type;
        $operation->sum = $request->sum;

        if($currentCourse) {
            $operation->sum_usd = round($request->sum / $currentCourse, 2);
        } else {
            $operation->sum_usd = 0;
        }

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
