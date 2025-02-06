<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Exam extends Model
{
    public function subject(){
        return $this->belongsTo(Subject::class);
    }

    public function class(){
        return $this->belongsTo(Classe::class);
    }

    public function marks(){
        return $this->hasMany(Mark::class);
    }
}
