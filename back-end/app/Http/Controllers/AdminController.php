<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Admin;
use App\Models\Secret;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Tymon\JWTAuth\Facades\JWTAuth;

class AdminController extends Controller
{
    public function getAdmins(Request $request){
        try{
            $user = JWTAuth::parseToken()->authenticate();

            $admins = Admin::where('user_id','!=',$user->id)
                            ->with('user')
                            ->paginate(15);

            return response()->json([
                "admins" => $admins
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function createAdmin(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'full_name' => 'required|string',
                'phone' => 'required|string|unique:admins',
                'email' => 'required|email|unique:users',
                'password' => 'required|string|min:6'
            ]);

            $existingUser = User::where('email', $validatedData['email'])->first();
            if ($existingUser) {
                return response()->json(['error' => 'User already exists'], 409);
            }

            $randNumber = rand(100, 999999);
            $randString = Str::random(4);
            $generatedUsername = $randString . $randNumber;

            $user = User::create([
                'email' => $validatedData['email'],
                'password' => Hash::make($validatedData['password']),
                'role' => 'admin'
            ]);

            $admin = Admin::create([
                'full_name' => $validatedData['full_name'],
                'phone' => $validatedData['phone'],
                'user_id' => $user->id,
                "username" => $generatedUsername
            ]);
            return response()->json([
                "message" => "New Admin created successfully!",
                "admin" => $admin,
            ], 200);
        } catch (ValidationException $e) {
            return response()->json(['error' => 'Validation Error', 'message' => $e->getMessage()], 422);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }

    public function updateAdmin(Request $request)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            $admin = Admin::where('user_id',$user->id)->first();

            $request->validate([
                'full_name' => 'sometimes|string',
                'phone' => 'sometimes|string|unique:admins,phone,' . $admin->id,
                'username' => [
                    Rule::unique('admins', 'username')->ignore($admin->id),
                ],
                'secretKey' => 'required'
            ]);

            $secretKey = Secret::where("secretKey",$request->secretKey)
                                ->where("expires_at",">",now())
                                ->first();

            if(!$secretKey){
                return response()->json([
                    'message' => "Invalid secret Key"
                ],404);
            }

            $admin->full_name = $request->full_name;
            $admin->phone = $request->phone;
            $admin->username = $request->username;

            $admin->save();

            return response()->json([
                'message' => "Admin data updated successfully"
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }

    public function deleteAdmin(Request $request)
    {
        try {
            $admin = Admin::find($request->id);
            if (!$admin) {
                return response()->json(['error' => 'Admin not found'], 404);
            }
            $user = User::find($admin->user_id);
            if (!$user) {
                return response()->json(['error' => 'User not found'], 404);
            }
            $admin->delete();
            $user->delete();
            return response()->json(['message' => 'Admin deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }
}
