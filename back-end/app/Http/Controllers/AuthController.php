<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function checkUserLogin(Request $request)
    {
        try {
            $user_credentials = $request->only("email", "password");

            if (!$token = JWTAuth::attempt($user_credentials)) {
                return response()->json([
                    "message" => "Email or password incorrect!",
                ], 401);
            }

            return response()->json([
                "role" => JWTAuth::user()->role,
                "token" => $token,
            ]);
        } catch (Exception $ex) {
            return response()->json([
                "message" => $ex->getMessage(),
            ],500);
        }
    }
}
