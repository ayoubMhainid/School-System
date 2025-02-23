<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'message', 'event_picture', 'admin_id'];


    public function admin()
    {
        return $this->belongsTo(Admin::class);
    }

    public function getEventPictureAttribute($value){
        return $value ? asset('/storage/events/'.$value) :
                        asset('/storage/events/eventImage.png');
    }
}
