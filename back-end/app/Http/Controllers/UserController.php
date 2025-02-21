<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserController extends Controller
{
    public function getUserById($id){
        try{
            $user = User::find($id);
            if($user->role === "student"){
                $student = Student::where('user_id',$user->id)->with('user')->first();
                return response()->json([
                    "user" => $student
                ]);
            }if($user->role === "admin"){
                $admin = Admin::where('user_id',$user->id)->with('user')->first();
                return response()->json([
                    "user" => $admin
                ]);
            }if($user->role === "teacher"){
                $teacher = Teacher::where('user_id',$user->id)->with('user')->first()   ;
                return response()->json([
                    "user" => $teacher
                ]);
            }else{
                return response()->json([
                    "message" => "Couldn't find the user"
                ],404);
            }
        }catch (Exception $ex) {
            return response()->json([
                "message" => $ex->getMessage(),
            ],500);
        }
    }


    public function getAuthUserData(Request $request){
        try{
            $user = JWTAuth::parseToken()->authenticate();
            if($user->role === 'admin'){
                $userData = Admin::where("user_id",$user->id)
                                    ->first();
                return response()->json([
                    "role" => "admin",
                    "userData" => $userData,
                ]);
            }else if($user->role === 'teacher'){
                $userData = Teacher::where("user_id",$user->id)
                                    ->first();
                return response()->json([
                    "role" => "teacher",
                    "userData" => $userData,
                ]);
            }else if($user->role === 'student'){
                $userData = Student::where("user_id",$user->id)
                                    ->with('class')
                                    ->first();
                return response()->json([
                    "role" => "student",
                    "userData" => $userData,
                ]);
            }

            return response()->json([
                "message" => "User not found",
            ],404);

        }catch(Exception $ex){
            return response()->json([
                "message" => $ex->getMessage(),
            ]);
        }
    }
    public function updateUserCredentials(Request $request,$id){
        try {
            $user = User::find($id);

            if(!$user){
                return response()->json([
                    "message" => "Couldn't find the user"
                ],404);
            }

            $request->validate([
                "email" => ["required",
                            "email",
                            Rule::unique('users', 'email')->ignore($id),
                            ],
                "password" => "required|min:6",
            ]);

            $user->email = $request->email;
            $user->password = $request->password;
            $user->save();

            return response()->json([
                "message" => "User credentials updated successfully!"
            ]);

        } catch (Exception $ex) {
            return response()->json([
                "message" => $ex->getMessage(),
            ],500);
        }
    }

    public function deleteUser($id){
        try{
            $user = User::find($id);
            if(!$user){
                return response()->json([
                    'message' => 'User not found'
                ],404);
            }

            $user->delete();
            return response()->json([
                'message' => 'User deleted successfully!'
            ]);

        }catch(Exception $ex){
            return response()->json([
                'message' => $ex->getMessage(),
            ],500);
        }
    }
}
