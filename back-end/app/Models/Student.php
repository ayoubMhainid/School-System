<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function class(){
        return $this->belongsTo(Classe::class);
    }

    public function marks(){
        return $this->hasMany(Mark::class);
    }
}
