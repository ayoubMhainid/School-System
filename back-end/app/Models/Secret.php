<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Secret extends Model
{
    protected $fillable = ['admin_id',
                            'secretKey',
                            'expires_at'];

    public function admin(){
        return $this->belongsTo(Admin::class);
    }
}
