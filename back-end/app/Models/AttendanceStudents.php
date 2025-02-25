<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttendanceStudents extends Model
{
    use HasFactory;


    protected $fillable = ['user_id', 'class_id', 'time', 'status','nbHours','date'];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function class(){
        return $this->belongsTo(Classe::class, 'class_id');
    }
}
