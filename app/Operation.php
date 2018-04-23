<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class Operation extends Model
{
    protected $guarded = [];

    /**
     * Get the user that owns operation
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function getOperationsForUser($userId)
    {
        return $this->whereHas('user', function ($query) use ($userId) {
            $query->where('id', $userId);
        })
            ->orderBy('created_at', 'DESC')
            ->get();
    }

}
