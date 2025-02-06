<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    public function announcements(){
        return $this->hasMany(Announcement::class);
    }

    public function events(){
        return $this->hasMany(Event::class);
    }
}
