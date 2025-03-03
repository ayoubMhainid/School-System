<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\AttendancesTeacher;
use App\Models\AttendanceStudents;
use App\Models\Classe;
use App\Models\Event;
use App\Models\Exam;
use App\Models\Student;
use App\Models\Subject;
use App\Models\Teacher;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class DashboardController extends Controller
{
    public function getAdminDashboardData()
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            $adminName = Admin::where("user_id", $user->id)
                ->select("full_name")
                ->first();

            $counts = [
                'teachers' => Teacher::count(),
                'students' => Student::count(),
                'subjects' => Subject::count(),
                'classes' => Classe::count(),
                'admins' => Admin::count(),
                'events' => Event::count(),
                'maleStudents' => Student::where('gender', 'male')
                    ->count(),
            ];

            $upcomingEvents = Event::latest()
                ->with('admin')
                ->take(6)
                ->get();
            $upcomingExams = Exam::where('date', '>', now()->toDateString())
                ->with('class')
                ->with('subject')
                ->take(6)
                ->latest()
                ->get();

            $sixMonthsAgo = Carbon::now()->subMonths(6);
            $teacherAttendances = AttendancesTeacher::selectRaw('
                                    YEAR(date) as year,
                                    MONTH(date) as month,
                                    sum(case when status = "absent" and user_id in (select user_id from teachers) then 1 else 0 end) as absent_teachers
                                ')
                ->groupBy('year', 'month')
                ->orderBy('year', 'asc')
                ->orderBy('month', 'asc')
                ->where('date', '>=', $sixMonthsAgo)
                ->get();

            $studentAttendances = AttendanceStudents::selectRaw('
                                YEAR(date) as year,
                                MONTH(date) as month,
                                sum(case when status = "absent" and student_id in (select user_id from students) then 1 else 0 end) as absent_students
                            ')
                ->groupBy('year', 'month')
                ->orderBy('year', 'asc')
                ->orderBy('month', 'asc')
                ->where('date', '>=', $sixMonthsAgo)
                ->get();

            return response()->json([
                'teacherAttendances' => $teacherAttendances,
                'studentAttendances' => $studentAttendances,
                'counts' => $counts,
                'famaleStudents' => $counts['students'] - $counts['maleStudents'],
                'adminName' => $adminName,
                'upcomingEvents' => $upcomingEvents,
                'upcomingExams' => $upcomingExams
            ]);
        } catch (Exception $ex) {
            return response()->json([
                "message" => $ex->getMessage(),
            ], 500);
        }
    }
}
