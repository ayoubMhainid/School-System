<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttendanceStudents extends Model
{
    use HasFactory;


    protected $fillable = ['student_id', 'class_id', 'time', 'status','nbHours','date'];

    public function class(){
        return $this->belongsTo(Classe::class, 'class_id');
    }

    public function student()
{
    return $this->belongsTo(Student::class, 'student_id');
}
}
