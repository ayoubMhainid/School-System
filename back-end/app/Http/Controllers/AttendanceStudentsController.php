<?php

namespace App\Http\Controllers;

use App\Models\AttendanceStudents;
use Exception;
use Illuminate\Http\Request;

class AttendanceStudentsController extends Controller
{
    public function getAttendance()
{
    try{
        $attendances = AttendanceStudents::all();

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

public function getAttendanceByClass($class_id){
    try{
        $attendances = AttendanceStudents::where('class_id', $class_id)->get();

    if (!$attendances) {
        return response()->json([
            'message' => 'No attendance found'
        ], 404);
    }

    return response()->json(['attendances' => $attendances]);
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
            'class_id' => 'required|exists:classes,id',
            'time' => 'required|string',
            'status' => 'required|in:absent,late',
            'date' => 'required|date',
            'nbHours' => 'required'
        ]);

        $attendance = AttendanceStudents::create([
            'user_id' => $validated['user_id'],
            'class_id' => $validated['class_id'],
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
        $attendance = AttendanceStudents::findorFail($id);

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
