<?php

namespace App\Http\Controllers;

use App\Models\AttendanceStudents;
use App\Models\Teacher;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class AttendanceStudentsController extends Controller
{
    public function getAttendance()
    {
        try {
            $attendances = AttendanceStudents::all();

            if (!$attendances) {
                return response()->json([
                    'message' => 'No attendance found'
                ], 404);
            }

            return response()->json($attendances);
        } catch (Exception $e) { {
                return response()->json([
                    'message' => $e->getMessage()
                ], 500);
            }
        }
    }

    public function getAttendanceByClass($class_id)
    {
        try {
            $attendances = AttendanceStudents::where('class_id', $class_id)
            ->paginate(1);

            if (!$attendances) {
                return response()->json([
                    'message' => 'No attendance found'
                ], 404);
            }

            return response()->json(['attendances' => $attendances], 200);
        } catch (Exception $e) { {
                return response()->json([
                    'message' => $e->getMessage()
                ], 500);
            }
        }
    }

    public function store(Request $request)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            $teacher = Teacher::where("user_id", $user->id)->first();
            if (!$teacher) {
                return response()->json([
                    "message" => "Teacher not found"
                ], 404);
            }
            $validated = $request->validate([
                'student_id' => 'required|exists:students,id',
                'class_id' => 'required|exists:classes,id',
                'time' => 'required|string',
                'status' => 'required|in:absent,late',
                'date' => 'required|date',
                'nbHours' => 'required'
            ]);

            $attendance = AttendanceStudents::create([
                'student_id' => $validated['student_id'],
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
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function getNbHoursOfAbsentStudents($class_id)
    {
        try {
            $absentHours = AttendanceStudents::where('class_id', $class_id)
            ->selectRaw('
            student_id,
            YEAR(date) as year,
            MONTH(date) as month,
            sum(nbHours) as total_hours
        ')
        ->groupBy('student_id', DB::raw('YEAR(date)'), DB::raw('MONTH(date)'))
        ->orderBy(DB::raw('YEAR(date)'), 'asc')
        ->orderBy(DB::raw('MONTH(date)'), 'asc')
        ->orderByDesc('total_hours')
        ->get();

            return response()->json([
                'absent_hours' => $absentHours
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function delete($id)
    {
        try {
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
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
