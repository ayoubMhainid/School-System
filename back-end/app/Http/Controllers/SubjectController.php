<?php

namespace App\Http\Controllers;

use App\Models\Subject;
use App\Models\Teacher;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;

class SubjectController extends Controller
{
    public function getSubjects()
    {
        $user = Auth::user();
        if ($user->role === 'admin') {
            $subjects = Subject::with('teacher')
                ->with('class')
                ->latest()
                ->paginate(15);
        } elseif ($user->role === 'teacher') {
            $subjects = Subject::where('teacher_id', $user->id)->get()->paginate(15);
        } else {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        return response()->json($subjects);
    }

    public function getSubjectsByTeacher()
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            $teacher = Teacher::where("user_id", $user->id)->first();
            if (!$teacher) {
                return response()->json([
                    "message" => "Teacher not found"
                ], 404);
            }
            $subjects = Subject::join("classes", "subjects.class_id", "=", "classes.id")
                ->where("subjects.teacher_id", $teacher->id)
                ->select("subjects.id", "classes.class_name", "subjects.name")
                ->get();

            if (!$subjects) {
                return response()->json(['message' => "No subjects found for this teacher"], 404);
            }
            return response([
                "subjects" => $subjects
            ]);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function createSubject(Request $request)
    {
        $user = JWTAuth::parseToken()->authenticate();
        $validateData = $request->validate(rules: [
            'name' => 'required|string',
            'class_id' => 'required|integer',
            'teacher_id' => 'required|integer|exists:teachers,id'
        ]);
        if ($user->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        $subject = Subject::create([
            'name' => $validateData['name'],
            'class_id' => $validateData['class_id'],
            'teacher_id' => $validateData['teacher_id']
        ]);
        return response()->json(['message' => 'Subject created successfully'], 201);
    }

    public function deleteSubject($id)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            if ($user->role !== 'admin') {
                return response()->json(['message' => 'Unauthorized'], 401);
            }
            $subject = Subject::find($id);
            if ($subject === null) {
                return response()->json(['message' => 'Subject not found'], 404);
            }
            $subject->delete();
            return response()->json(['message' => 'Subject deleted successfully'], 200);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
    public function updateSubject(Request $request)
    {
        try {


            $subject = Subject::where('id', $request->id)->first();
            $request->validate([
                "classId" => "required",
                "teacherId" => "required",
                "subject_name" => "required|string|max:100"
            ]);

            $subject->teacher_id = $request->teacherId;
            $subject->class_id = $request->classId;
            $subject->name = $request->subject_name;

            $subject->save();

            return response()->json([
                'message' => "Subject updated successfully"
            ]);
        } catch (Exception $ex) {
            return response()->json([
                "message" => $ex->getMessage(),
            ]);
        }
    }

    public function getSubjectsByteacherAndClass($class_id)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            $teacher = Teacher::where("user_id", $user->id)->first();
            if (!$teacher) {
                return response()->json([
                    "message" => "Teacher not found"
                ], 404);
            }
            $subjects = Subject::where("teacher_id", $teacher->id)
                ->where("class_id", $class_id)
                ->get();

            if (!$subjects) {
                return response()->json(['message' => "No subjects found for this class"], 404);
            }
            return response([
                "subjects" => $subjects
            ]);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}
