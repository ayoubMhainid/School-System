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

            $notifications = Notification::where('receiver_id',$user->id)
                                        ->with('sender')
                                        ->latest()
                                        ->paginate(7);

            if($notifications){
                return response()->json([
                    "notifications" => $notifications,
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
                "message" => "Your message sended successfully!"
            ]);
        }catch(Exception $ex){
            return response()->json([
                "message" => $ex->getMessage(),
            ],500);
        }
    }
    public function makeNotificationSeen($id){
        try{
           $notification = Notification::find($id);
           if($notification->status === 'seen'){
                return response()->json([
                    'message' => 'The notification is already setted to seen'
                ],400);
           }else{
                $notification->status = 'seen';
                $notification->save();
                return response()->json([
                    'message' => "Notification marked as seen"
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
                    'message' => 'Notification deleted successfully!'
                ]);
            }else{
                return response()->json([
                    "message" => "Unauthorized"
                ],401);
            }
        }catch(\Exception $e){
            return response()->json([
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
