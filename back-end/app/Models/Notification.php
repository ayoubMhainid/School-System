<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    public function sender(){
        return $this->belongsTo(User::class,"sender_id");
    }
}
