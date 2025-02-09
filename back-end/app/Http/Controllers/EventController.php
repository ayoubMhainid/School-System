<?php

namespace App\Http\Controllers;


use App\Models\Event;
use Exception;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;






class EventController extends Controller
{
    public function getEvents()
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            $events = Event::with('admin')->latest()->get();
            if ($events) {
                return response()->json([
                    'events' => $events,
                ]);
            }
            return response()->json([
                "messge" => "Events is not found",
            ]);
        } catch (Exception $ex) {
            return response()->json([
                'message' => $ex->getMessage(),
            ], 500);
        };
    }

    public function deleteEventById(Request $request, $id)
    {
        try {
            // $user = JWTAuth::parseToken()->authenticate();

            $event = Event::where("id", $id)->with("admin")->first();
            if ($event) {
                return response()->json([
                    "event" => $event,
                    "admin_id" => $event->admin_id,
                    "user_id" => $event->admin->user_id,
                ]);
            }
            return response()->json([
                "message" => "Event not found",
            ]);
        } catch (Exception $ex) {
            return response()->json([
                'message' => $ex->getMessage(),
            ], 500);
        };
    }
}
