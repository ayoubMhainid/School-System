<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mark extends Model
{
    protected $fillable = ['student_id','exam_id','mark','remark'];
    use HasFactory;

    public function exam(){
        return $this->belongsTo(Exam::class);
    }

    public function student(){
        return $this->belongsTo(Student::class);
    }
}
