<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Classe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Support\Str;
use Exception;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Tymon\JWTAuth\Facades\JWTAuth;

class TeacherController extends Controller
{
    public function getTeachers()
    {
        try {
            $teachers = Teacher::latest()
                ->paginate(10);
            return response()->json([
                "teachers" => $teachers
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                "message" => $e->getMessage()
            ], 500);
        }
    }

    public function getTeacher($id)
    {
        try {
            $teacher = Teacher::find($id);
            if ($teacher) {
                return response()->json([
                    "teacher" => $teacher
                ]);
            }

            return response()->json([
                "message" => "No teacher with this id"
            ]);
        } catch (Exception $ex) {
            return response()->json([
                "message" => $ex->getMessage(),
            ]);
        }
    }

    public function getTeachersByUser($user)
    {
        try {
            $teacher = Teacher::where("username", "LIKE", "%$user%")
                ->latest()
                ->paginate(10);
            if ($teacher) {
                return response()->json(["teachers" => $teacher]);
            }

            return response()->json(["message" => "No teacher with this username"]);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        };
    }

    public function getTeachersByClass($id)
    {
        try {
            $class = Classe::find($id);
            if (!$class) {
                return response()->json(["message" => "Class not found"], 404);
            }

            $teachers = Teacher::whereHas('class', function ($query) use ($id) {
                $query->where('id', $id);
            })->get();
            if (!$teachers) {
                return response()->json(["message" => "No teacher with this class"]);
            }

            return response()->json(["teachers" => $teachers]);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()], 500);
        }
    }

    public function createTeacher(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'full_name' => 'required|string|max:255',
                'phone' => 'required|string|max:13|unique:teachers,phone',
                'address' => 'required|string|max:500',
                'specialization' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|string|min:6'
            ]);

            $user = User::create([
                'email' => $validatedData['email'],
                'password' => Hash::make($validatedData['password']),
                'role' => 'teacher'
            ]);

            if (!$user) {
                return response()->json([
                    'message' => 'failed to create teacher '
                ], 500);
            }

            $randNumber = rand(100, 999999);
            $randString = Str::random(4);
            $generatedUsername = $randNumber . $randString;
            $teacher = Teacher::create([
                'full_name' => $validatedData['full_name'],
                'username' => $generatedUsername,
                'phone' => $validatedData['phone'],
                'address' => $validatedData['address'],
                'specialization' => $validatedData['specialization'],
                'user_id' => $user->id
            ]);

            return response()->json([
                'message' => 'teacher created successfully',
                'teacher' => $teacher
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    }
    public function updateTeacher(Request $request)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            $teacher = Teacher::where("id", $user->id)->first();

            if (!$teacher) {
                return response()->json([
                    "message" => "Unauthorized"
                ], 401);
            }

            $validation = $request->validate([
                'full_name' => 'required|string|max:255',
                'username' => [
                    Rule::unique('teachers', 'username')->ignore($teacher->id),
                ],
                'phone' => 'required|string|max:13|unique:teachers,phone,' . $teacher->id,
                'address' => 'required|string|max:500',
                'specialization' => 'required|string|max:255',
            ]);

            $teacher->update($validation);

            return response()->json([
                "message" => "teacher updated successfully"
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Data verification failed',
                'errors' => $e->errors()
            ], 422);
        } catch (Exception $e) {
            return response()->json([
                "message" => $e->getMessage()
            ], 500);
        };
    }
    public function deleteTeacher($id)
    {
        try {
            $teacher = Teacher::find($id);
            if (!$teacher) {
                return response()->json(['error' => 'Teacher not found'], 404);
            }
            $user = User::find($teacher->user_id);
            if (!$user) {
                return response()->json(['error' => 'User Not found'], 404);
            }
            $teacher->delete();
            $user->delete();
            return response()->json(["message" => "Teacher deleted successfully"]);
        } catch (Exception $e) {
            return response()->json([
                "message" => $e->getMessage()
            ]);
        }
    }
}
