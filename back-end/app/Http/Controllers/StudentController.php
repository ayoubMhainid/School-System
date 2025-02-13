<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\User;
use App\Models\Student;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Tymon\JWTAuth\Facades\JWTAuth;

class StudentController extends Controller
{
    public function getStudents(){
        try{
            $students = Student::latest()
                                ->paginate(10);
            if($students){
                return response()->json([
                    "students" => $students,
                ]);
            }else{
                return response()->json([
                    "message" => "No students available"
                ],404);
            }

        }catch(Exception $ex){
            return response()->json([
                "message" => $ex->getMessage(),
            ],500);
        }
    }

    public function getStudent($id){
        try{
            $student = Student::where("id",$id)
                                ->with("class")
                                ->first();

            if($student){
                return response()->json([
                    "student" => $student,
                ]);
            }else{
                return response()->json([
                    "message" => "No student with this id"
                ],404);
            }

        }catch(Exception $ex){
            return response()->json([
                "message" => $ex->getMessage(),
            ]);
        }
    }
    public function SearchStudentsByUsername ($username ){
        try {
            $students = Student::where('username', 'LIKE', "%$username%")->get();
            if(!$student){
                response()->json([
                    "message" => "Student not found by this username"
                ],404);
            }

            return response()->json([
                "message" => "Search was successful",
                "student" => $student
            ]);

        }catch(Exception $e){
            return response()->json([
                "message" => $e.getMessage()
            ],500);
        }
    } 

    public function FilterStudentsByClass ($class_id){
        try{
            $students = Student::where("class_id",$class_id)->get();
            if(!$students){
                return response()->json([
                    "message" => "students not found"
                ],404);
            }
            return response()->json([
                "message" => "search was successful",
                "students" => $students
            ]);
        }catch(Exception $e){
            return response()->json([
                "message" => $e.getMessage()
            ],500);
        }
    }
    public function FIlterStudentsByGender($gender){
        try{
            $student_gender = Student::where("gender",$gender)->get();
            if(!$student_gender){
                return response()->json([
                    "message" => "Not Found"
                ],404);
            }
            return response()->json([
                "message" => "successfully",
                "students" => $student_gender
            ]);
        }catch(Exception $e){
            return response()->json([
                "message" => $e.getMessage()
            ],500);
        }
    }

    public function createStudent(Request $request){
        try{
            $request->validate([
                "full_name" => "string|required",
                "gender" => "required|in:male,female",
                "phone" => "required",
                "email" => "required|unique:users",
                "password" => "required|min:6",
                "class_id" => "required|exists:classes,id"
            ]);

            $user = User::create([
                "email" => $request->email,
                "password" => Hash::make($request->password),
                "role" => "student",
            ]);

            $randNumber = rand(100,999999);
            $randString = Str::random(4);
            $generatedUsername = $randString . $randNumber;

            Student::create([
                "user_id" => $user->id,
                "class_id" => $request->class_id,
                "full_name" => $request->full_name,
                "username" => $generatedUsername,
                "gender" => $request->gender,
                "phone" => $request->phone,
            ]);

            return response()->json([
                "message" => "New Student created successfully!",
            ]);

        }catch(Exception $ex){
            return response()->json([
                "message" => $ex->getMessage(),
            ],500);
        }
    }

    public function updateStudent(Request $request){
        try{

            $user = JWTAuth::parseToken()->authenticate();

            $student = Student::where("user_id",$user->id)->first();

            if(!$student){
                return response()->json([
                    'message' => 'Unauthorized'
                ],401);
            }

            $request->validate([
                'full_name' => 'required',
                'username' => [
                    Rule::unique('students', 'username')->ignore($student->id),
                ],
                'birth_date' => 'date',
                'gender' => 'required|in:male,female'
            ]);

            $student->full_name = $request->full_name;
            $student->username = $request->username;
            $student->date_of_birth = $request->birth_date;
            $student->gender = $request->gender;
            $student->address = $request->address;
            $student->phone = $request->phone;

            $student->save();

            return response()->json([
                'message' => "Student updated successfully"
            ]);
        }catch(Exception $ex){
            return response()->json([
                "message" => $ex->getMessage(),
            ]);
        }
    }

    public function deleteStudent($id){
        try{
            $student = Student::find($id);
            if(!$student){
                return response()->json([
                    'message' => 'Student not found'
            ], 404);
            }

            $user = User::find($student->user_id);

            if(!$user){
                return response()->json([
                    'message' => 'User not found'
                ], 404);
            }

            $student->delete();
            $user->delete();

            return response()->json([
                'message' => 'Student deleted successfully'
            ]);
        }catch(\Exception $e){
            return response()->json([
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
