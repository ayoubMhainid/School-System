<?php

namespace App\Http\Controllers;

use App\Models\Classe;
use App\Models\Teacher;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Facades\JWTAuth;

class ClassController extends Controller
{
    public function getClasses()
    {
        try {
            $classes = Classe::with("teacher")
                ->latest()
                ->get();
            return response()->json([
                "classes" => $classes
            ]);
        } catch (Exception $ex) {
            return response()->json([
                "message" => $ex->getMessage(),
            ], 500);
        }
    }
    public function getClassesByTeacher($id)
    {
        try {
            $teacher = Teacher::find($id);
            if (!$teacher) {
                return response()->json([
                    "message" => "Teacher not found"
                ], 404);
            }
            $classes = Classe::where("teacher_id", $teacher->id)
                ->with("teacher")
                ->latest()
                ->take(3)
                ->get();
            return response()->json([
                "classes" => $classes
            ]);
        } catch (Exception $ex) {
            return response()->json([
                "message" => $ex->getMessage(),
            ], 500);
        }
    }

    public function getClassesAndStudentsByTeacher()
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            $teacher = Teacher::where("user_id", $user->id)->first();
            if (!$teacher) {
                return response()->json([
                    "message" => "Teacher not found"
                ], 404);
            }
            $studentCount = DB::table("students")
                ->join("classes", "students.class_id", "=", "classes.id")
                ->where("classes.teacher_id", $teacher->id)
                ->select('classes.id', 'classes.class_name', 'classes.section', DB::raw('COUNT(students.id) as student_count'))
                ->groupBy('classes.id', 'classes.class_name', 'classes.section')
                ->get();

            return response()->json([
                "students" => $studentCount
            ]);
        } catch (Exception $ex) {
            return response()->json([
                "message" => $ex->getMessage(),
            ], 500);
        }
    }
    public function getClassespaginate()
    {
        try {
            $classes = Classe::with("teacher")
                ->latest()
                ->paginate(10);
            return response()->json([
                "classes" => $classes
            ]);
        } catch (Exception $ex) {
            return response()->json([
                "message" => $ex->getMessage(),
            ], 500);
        }
    }
    public function createClass(Request $request)
    {
        try {
            $request->validate([
                "class_name" => "required|string|max:20",
                "section" => "required|string|max:30",
                "teacher_id" => "required|integer|exists:teachers,id"
            ]);

            Classe::create([
                "class_name" => $request->class_name,
                "section" => $request->section,
                "teacher_id" => $request->teacher_id,
            ]);

            return response()->json([
                "message" => "New class created successfully!"
            ]);
        } catch (Exception $ex) {
            return response()->json([
                "message" => $ex->getMessage(),
            ], 500);
        }
    }


    public function deleteClass($id)
    {
        try {
            $class = Classe::find($id);
            if ($class) {
                $class->delete();
                return response()->json([
                    "message" => "Class deleted Successfully!"
                ]);
            } else {
                return response()->json([
                    "message" => "Class not found"
                ], 404);
            }
        } catch (Exception $ex) {
            return response()->json([
                "message" => $ex->getMessage(),
            ], 500);
        }
    }
    public function updateClass(Request $request, $id)
    {
        try {
            $validation = $request->validate([
                "class_name" => "required|string|max:20",
                "section" => "required|string|max:30",
                "teacher_id" => "required|integer"
            ]);
            $class = Classe::find($id);
            if (!$class) {
                return response()->json([
                    "message" => "class not found"
                ], 404);
            }
            $class->update($validation);

            return response()->json([
                "message" => "updated successfully"
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                "message" =>  $e->getMessage()
            ], 500);
        }
    }
}
