<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function updateUserCredentials(Request $request,$id){
        try {
            $user = User::find($id);

            if(!$user){
                return response()->json([
                    "message" => "Couldn't find the user"
                ]);
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
            ]);
        }
    }
}
