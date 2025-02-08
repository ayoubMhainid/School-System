<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    use HasFactory;

    protected $fillable = ['full_name', 'phone', 'user_id'];

    public function announcements(){
        return $this->hasMany(Announcement::class);
    }

    public function events(){
        return $this->hasMany(Event::class);
    }
}
