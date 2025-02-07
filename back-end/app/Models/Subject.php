<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    use HasFactory;

    public function teacher(){
        return $this->belongsTo(Teacher::class);
    }

    public function exams(){
        return $this->hasMany(Exam::class);
    }
}
