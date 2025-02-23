<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    protected $fillable = [
        'user_id',
        'full_name',
        'date_of_birth',
        'gender',
        'adress',
        'phone',
        'username',
        'class_id'];

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

    public function getProfilePictureAttribute(){
        return asset("storage/users/studentImage.png");
    }
}
