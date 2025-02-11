<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Exception;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\JWT;

class NotificationController extends Controller
{
    public function getNotifications(){
        try{
            $user = JWTAuth::parseToken()->authenticate();
            
            $notification = Notification::where('receiver_id',$user->id)
                                        ->with('sender')
                                        ->get();
            if($notification){
                return response()->json([
                    "notification" => $notification,
                ]);
            }else{
                return response()->json([
                    "message" => "No notification found"
                ],404);
            }
        }catch(Exception $ex){
            return response()->json([
                "message" => $ex->getMessage(),
            ],500);
        }
    }
    public function createNotification(Request $request){
        try{
            $user = JWTAuth::parseToken()->authenticate();
            $request->validate([
                "receiver_id" => "required|exists:users,id",
                "content" => "required|string|max:300",
            ]);
            Notification::create([
                'sender_id' => $user->id,
                'receiver_id' => $request->receiver_id,
                'content' => $request->content,
                'status' => "delivred",
            ]);
            return response()->json([
                "message" => "New notification created successfully!"
            ]);
        }catch(Exception $ex){
            return response()->json([
                "message" => $ex->getMessage(),
            ],500);
        }
    }
    public function makeNotificationSeend($id){
        try{
           $notification = Notification::find($id);
           if($notification->status === 'seen'){
                return response()->json([
                    'message' => 'the status is aleredy seen'
                ]);
           }else{
                $notification->status = 'seen';
                $notification->save();
                return response()->json([
                    'message' => "notification marked as seen"
                ]);
           };
        }catch(Exception $ex){
            return response()->json([
                "message" => $ex->getMessage(),
            ]);
        }
    }
    public function deleteNotification($id){
        try{
            $user = JWTAuth::parseToken()->authenticate();
            $notification = Notification::find($id);
            if($notification->receiver_id === $user->id){
                $notification->delete();
                return response()->json([
                    'message' => 'delete notification  successfully!'
                ]);
            }else{
                return response()->json([
                    "message" => "Unauthorized"
                ],400);
            }
        }catch(\Exception $e){
            return response()->json([
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
