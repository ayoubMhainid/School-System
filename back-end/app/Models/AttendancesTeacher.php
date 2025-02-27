<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttendancesTeacher extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'time', 'status', 'nbHours', 'date'];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
