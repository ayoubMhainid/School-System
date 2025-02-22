<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Classe;
use Illuminate\Http\Request;
use App\Models\Exam;
use App\Models\Notification;
use App\Models\Student;
use App\Models\Subject;
use App\Models\Teacher;
use Carbon\Carbon;
use Exception;
use GuzzleHttp\Psr7\Message;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class ExamController extends Controller
{
    public function createExam(Request $request)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();

            $validator = $request->validate([
                "subject_id" => "required|exists:subjects,id",
                "class_id" => "required|exists:classes,id",
                "exam_name" => "required|string|max:255",
                "date" => "required|date",
            ]);

            if ($user->role !== "teacher") {
                return response()->json([
                    "message" => "Unauthorized",
                ], 401);
            }

            $teacher = Teacher::where("user_id", $user->id)->first();
            $subject = Subject::find($validator["subject_id"]);
            $students = Student::where("class_id", $validator['class_id'])->get();
            $date = Carbon::createFromFormat('d-m-Y', $validator['date'])->format('Y-m-d');

            Exam::create([
                "subject_id" => $validator["subject_id"],
                "class_id" => $validator['class_id'],
                "exam_name" => $validator['exam_name'],
                "date" => $date
            ]);


            foreach ($students as $student) {
                Notification::create([
                    "sender_id" => $teacher->id,
                    "receiver_id" => $student->id,
                    "content" => "The $subject->name teacher announced an exam on $date",
                    'status' => "delivred",
                ]);
            }

            return response()->json([
                "message" => "Exam created successfully",
            ]);
        } catch (Exception $e) {
            return response()->json([
                "message" => $e->getMessage()
            ], 500);
        }
    }

    public function getExams()
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            if ($user->role !== "teacher") {
                return response()->json([
                    "user" => $user,
                ]);
            }

            $teacher = Teacher::where("user_id", $user->id)->first();

            $subjects = Subject::where("teacher_id", $teacher->id)->get();

            // $listexam = [
            //     "current_page" => 0,
            //     "data" => [],
            //     "last_page" => 0,
            //     "total" => 0,
            // ];

            foreach ($subjects as $subject) {
                $exam = Exam::where("subject_id", $subject->id)
                    ->where("class_id", $subject->class_id)
                    ->with("subject")
                    ->with("class")
                    ->latest()
                    ->paginate(4);

                // array_push($listexam, $exam);
                // $listexam["current_page"] += $exam->current_page;
                // array_push($listexam["data"], $exam->data);
                // $listexam["last_page"] += $exam->last_page;
                // $listexam["total"] += $exam->total;
            }

            return response()->json([
                "teacher" => $teacher,
                "subject" => $subjects,
                "exams" => $exam,
                "cur" => $exam->current_page
            ]);
        } catch (Exception $e) {
            return response()->json([
                "message" => $e->getMessage()
            ], 500);
        }
    }

    public function deleteExam($id)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();

            if ($user->role !== "teacher" && $user->role !== "admin") {
                return response()->json([
                    "message" => "Unauthorized"
                ], 401);
            }

            $exam = Exam::find($id);
            if (!$exam) {
                return response()->json([
                    "message" => "Exam not found"
                ], 404);
            }
            if ($user->role === "admin") {
                $exam->delete();
                return response()->json([
                    "message" => "Exam deleted successfully"
                ]);
            }

            $teacher = Teacher::where("user_id", $user->id)->first();
            $subject = Subject::find($exam->subject_id);

            if ($teacher->id !== $subject->teacher_id && $exam->class_id !== $subject->class_id) {
                return response()->json([
                    "message" => "Unauthorized"
                ], 401);
            }

            $exam->delete();
            return response()->json([
                "message" => "Exam deleted successfully"
            ]);
        } catch (Exception $e) {
            response()->json(["message" => $e->getMessage()], 500);
        }
    }
}
