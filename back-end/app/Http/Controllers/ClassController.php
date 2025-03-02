<?php

namespace App\Http\Controllers;

use App\Models\Classe;
use App\Models\Student;
use App\Models\Subject;
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
            $classes = Classe::latest()
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

    public function getClassByStudent()
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            $student = Student::where("user_id", $user->id)->first();
            if (!$student) {
                return response()->json([
                    "message" => "Student not found"
                ], 404);
            }
            $classe = Classe::where("id", $student->class_id)
                ->latest()
                ->get();

            return response()->json([
                "classe" => $classe
            ], 200);
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

            $classes = Classe::whereHas("subjects", function ($query) use ($teacher) {
                $query->where("teacher_id", $teacher->id);
            })
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

    public function getClassesByTeacher_2()
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            $teacher = Teacher::where("user_id", $user->id)->first();
            if (!$teacher) {
                return response()->json([
                    "message" => "Teacher not found"
                ], 404);
            }
            $classes = Classe::whereHas("subjects", function ($query) use ($teacher) {
                $query->where("teacher_id", $teacher->id);
            })->latest()->get();
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
            $studentCount = Classe::whereHas("subjects", function ($query) use ($teacher) {
                $query->where("teacher_id", $teacher->id);
            })
                ->withCount("students")
                ->latest()
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
            $classes = Classe::latest()
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
            ]);

            Classe::create([
                "class_name" => $request->class_name,
                "section" => $request->section,
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

    public function getClassesByTeacherAuth()
    { {
            try {
                $user = JWTAuth::parseToken()->authenticate();
                $teacher = Teacher::where("user_id", $user->id)->first();
                if (!$teacher) {
                    return response()->json([
                        "message" => "Teacher not found"
                    ], 404);
                }
                $classes = Classe::whereHas("subjects", function ($query) use ($teacher) {
                    $query->where("teacher_id", $teacher->id);
                })
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
    }
}
