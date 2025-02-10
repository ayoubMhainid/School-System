<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use Exception;
use Illuminate\Http\Request;

class AnnouncementController extends Controller
{
    public function getAnnouncements(){
        try{
            $announcement = Announcement::latest()
                                        ->get();

            if($announcement){
                return response()->json([
                    'announcement' => $announcement
                ]);
            }else{
                return response()->json([
                    'message' => 'No announcement available'
                ],404);
            }
        }catch(Exception $ex){
            return response()->json([
                "message" => $ex->getMessage(),
            ],500);
        }
    }
    public function createAnnouncements(Request $request){
        try{
            $request->validate([
                "receiver" => "required|in:students,teachers",
                "title" => "required|string|max:30",
                "message" => "required|string|max:300",
                "admin_id" => "required|integer|exists:admins,id",
            ]);

            Announcement::created([
                "receiver" => $request->receiver,
                "title" => $request->title,
                "message" => $request->message,
                "admin_id" => $request->admin_id,
            ]);

            return response()->json([
                "message" => "New announcement created successfully!"
            ]);
        }catch(Exception $ex){
            return response()->json([
                "message" => $ex->getMessage(),
            ],500);
        }
    }

    public function deleteAnnouncements($id){
        try{
            $announcement = Announcement::find($id);
            if($announcement){
                return response()->json([
                    "message" => "Announcement deleted Successfully!"
                ]);
            }else{
                return response()->json([
                    "message" => "Announcement not found"
                ]);
            }
        }catch(Exception $ex){
            return response()->json([
                "message" => $ex->getMessage(),
            ],500);
        }
    }
}
