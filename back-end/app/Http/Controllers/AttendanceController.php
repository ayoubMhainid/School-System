<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use Exception;
use Illuminate\Http\Request;

class AttendanceController extends Controller
{
    public function getAttendance()
{
    try{
        $attendances = Attendance::all();

    if (!$attendances) {
        return response()->json([
            'message' => 'No attendance found'
        ], 404);
    }

    return response()->json($attendances);
    } catch (Exception $e){ {
        return response()->json([
            'message' => $e->getMessage()
        ], 500);
    }
}
}



public function store(Request $request)
{
    try{
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'time' => 'required|string',
            'status' => 'required|in:absent,late',
            'date' => 'required|date',
            'nbHours' => 'required'
        ]);

        $attendance = Attendance::create([
            'user_id' => $validated['user_id'],
            'time' => $validated['time'],
            'status' => $validated['status'],
            'date' => $validated['date'],
            'nbHours' => $validated['nbHours']
        ]);

        return response()->json([
            'attendance' => $attendance,
            'message' => "New record created successfully!"
        ], 200);
    }catch (Exception $e){
        return response()->json([
            'message' => $e->getMessage()
        ], 500);
    }
}

public function delete($id)
{
    try{
        $attendance = Attendance::findorFail($id);

    if (!$attendance) {
        return response()->json([
            'message' => 'Attendance record not found.'
        ], 404);
    }

    // Delete the attendance record
    $attendance->delete();

    return response()->json([
        'message' => 'Attendance record deleted successfully'
    ]);
    }catch (Exception $e){
        return response()->json([
            'message' => $e->getMessage()
        ], 500);
    }

}

}
