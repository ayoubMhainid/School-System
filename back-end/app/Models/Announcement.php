<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Announcement extends Model
{
    public function admin(){
        return $this->belongsTo(Admin::class);
    }
}
