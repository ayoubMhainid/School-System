<?php

namespace App\Http\Controllers;

use App\Models\Admin;
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
            $user = JWTAuth::parseToken()->authenticate();

            $event = Event::where("id", $id)
                ->with("admin")
                ->first();

            if ($event) {
                $event->delete();
                return response()->json([
                    "message" => "Event deleted Successfully!"
                ]);
            }
            return response()->json([
                "message" => "Event not found",
            ], 404);
        } catch (Exception $ex) {
            return response()->json([
                'message' => $ex->getMessage(),
            ], 500);
        };
    }

    public function createEvent(Request $request)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();

            $request->validate([
                'title' => 'required',
                'message' => 'required|max:400',
                'image' => 'mimes:jpeg,jpg,png,webp|max:2048',
            ]);

            $file = $request->file('image');
            $fileName = time() . "_" . $file->getClientOriginalName();

            $title = $request->input("title");
            $message = $request->input("message");
            $event_picture = $fileName;

            $admin = Admin::where('user_id', $user->id)
                ->first();
            if (!$admin) {
                return response()->json([
                    "message" => 'Unauthorized',
                ], 401);
            }
            $file->move('storage/events', $fileName);
            Event::create([
                "admin_id" => $admin->id,
                "title" => $title,
                "message" => $message,
                "event_picture" => $event_picture,
            ]);
            return response()->json([
                "message" => "New event created successfully!",
            ]);
        } catch (Exception $ex) {
            return response()->json([
                "message" => $ex->getMessage(),
            ], 500);
        }
    }
}
