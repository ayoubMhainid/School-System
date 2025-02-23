<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    use HasFactory;

    protected $fillable = ["full_name", "username", "phone", "address", "specialization", "user_id"];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function classes()
    {
        return $this->hasMany(Classe::class);
    }

    public function subjects()
    {
        return $this->hasMany(Subject::class);
    }

    public function getProfilePictureAttribute(){
        return asset("storage/users/teacherImage.png");
    }
}
