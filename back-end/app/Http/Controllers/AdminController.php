<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AdminController extends Controller
{
    public function getAdmins(Request $request){
        try{
            $admins = Admin::all();
            return response()->json($admins, 200);
        }catch(\Exception $e){
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }

    public function createAdmin(Request $request){
        try{
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
            
            $user = User::create([
                'email' => $validatedData['email'],
                'password' => Hash::make($validatedData['password']),
                'role' => 'admin'
            ]);

            $admin = Admin::create([
                'full_name' => $validatedData['full_name'],
                'phone' => $validatedData['phone'],
                'user_id' => $user->id
            ]);
            return response()->json($admin, 201);

        }catch (ValidationException $e) {
            return response()->json(['error' => 'Validation Error', 'message' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }

    public function updateAdmin(Request $request, $id)
    {
        try {
            $validatedData = $request->validate([
                'full_name' => 'sometimes|string',
                'phone' => 'sometimes|string|unique:admins,phone,' . $id,
                'email' => 'sometimes|email|unique:users,email',
                'password' => 'sometimes|string|min:6'
            ]);

            $admin = Admin::find($id);
            if (!$admin) {
                return response()->json(['error' => 'Admin not found'], 404);
            }

            $user = User::find($admin->user_id);
            if (!$user) {
                return response()->json(['error' => 'User not found'], 404);
            }

            if (isset($validatedData['email'])) {
                $user->email = $validatedData['email'];
            }
            if (isset($validatedData['password'])) {
                $user->password = Hash::make($validatedData['password']);
            }
            $user->save();

            $admin->update($request->except(['profile_picture', 'email', 'password']));

            return response()->json(['message' => 'Admin updated successfully', 'admin' => $admin], 200);

        } catch (ValidationException $e) {
            return response()->json(['error' => 'Validation Error', 'message' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }

    public function deleteAdmin(Request $request){
        try{
            $admin = Admin::find($request->id);
            if(!$admin){
                return response()->json(['error' => 'Admin not found'], 404);
            }
            $user = User::find($admin->user_id);
            if(!$user){
                return response()->json(['error' => 'User not found'], 404);
            }
            $admin->delete();
            $user->delete();
            return response()->json(['message' => 'Admin deleted successfully'], 200);
        }catch(\Exception $e){
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }
}
