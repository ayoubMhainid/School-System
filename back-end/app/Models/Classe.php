<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Classe extends Model
{
    public function students(){
        return $this->hasMany(Student::class);
    }

    public function teacher(){
        return $this->belongsTo(Teacher::class);
    }

    public function subjects(){
        return $this->hasMany(Subject::class);
    }
}
