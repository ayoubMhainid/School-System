<?php

namespace App\Http\Controllers;

use App\Models\AttendancesTeacher;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use function Laravel\Prompts\select;

class AttendancesTeacherController extends Controller
{
    public function getAttendancesTeacher()
    {
        try {

            $attendance = AttendancesTeacher::selectRaw('
                    user_id,
                    YEAR(date) as year,
                    MONTH(date) as month,
                    SUM(nbHours) as total_hours
                    ')
                ->groupBy('user_id', DB::raw('YEAR(date)'), DB::raw('MONTH(date)'))
                ->orderBy(DB::raw('YEAR(date)'), 'asc')
                ->with('user.teacher')
                ->latest()
                ->paginate(5);

            if (!$attendance) {
                return response()->json([
                    'message' => 'No attendance found'
                ], 404);
            }

            return response()->json([
                "attendanceTeacher" => $attendance
            ]);
        } catch (Exception $e) { {
                return response()->json([
                    'message' => $e->getMessage()
                ], 500);
            }
        }
    }

    public function createAttendanceTeacher(Request $request)
    {
        try {
            $validated = $request->validate([
                'user_id' => 'required|exists:users,id',
                'time' => 'required|string',
                'status' => 'required|in:absent,late',
                'date' => 'required|date',
                'nbHours' => 'required'
            ]);

            $attendance = AttendancesTeacher::create([
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
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function deleteAttendanceTeacher($id)
    {
        try {
            $attendance = AttendancesTeacher::findorFail($id);

            if (!$attendance) {
                return response()->json([
                    'message' => 'Attendance record not found.'
                ], 404);
            }

            $attendance->delete();

            return response()->json([
                'message' => 'Attendance record deleted successfully'
            ]);
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
