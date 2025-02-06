<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    use HasFactory;

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function class(){
        return $this->hasMany(Classe::class);
    }

    public function subjects(){
        return $this->hasMany(Subject::class);
    }
}
