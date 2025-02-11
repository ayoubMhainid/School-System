<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Announcement extends Model
{
    use HasFactory;
    
    protected $fillable = ["receiver","title","message","admin_id"];

    public function admin()
    {
        
        return $this->belongsTo(Admin::class);
    }
}
