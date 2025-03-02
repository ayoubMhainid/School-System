<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\Secret;
use Exception;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class SecretController extends Controller
{
    public function getSecrets()
    {
        try {
            $secrets = Secret::latest()
                ->with('admin')
                ->paginate(10);

            if ($secrets) {
                return response()->json([
                    'secrets' => $secrets
                ]);
            }

            return response()->json([
                'message' => "No secrets available"
            ], 404);
        } catch (Exception $ex) {
            return response()->json([
                'message' => $ex->getMessage(),
            ], 500);
        }
    }

    public function createSecretKey(Request $request)
    {
        try {
            $request->validate([
                "secretKey" => "required|min:6|max:30",
                "expiresAt" => "required|in:2,5,10,20,30",
            ]);

            $user = JWTAuth::parseToken()->authenticate();
            $admin = Admin::where("user_id", $user->id)->first();

            Secret::create([
                "admin_id" => $admin->id,
                "secretKey" => $request->secretKey,
                "expires_at" => now()->addDays((int) $request->expiresAt),
            ]);
            return response()->json([
                'message' => "New secret key created successfully!"
            ]);
        } catch (Exception $ex) {
            return response()->json([
                'message' => $ex->getMessage(),
            ], 500);
        }
    }

    public function deleteSecret($id)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            $admin = Admin::where("user_id", $user->id)->first();
            $secretKey = Secret::find($id);

            if ($secretKey->admin_id !== $admin->id) {
                return response()->json([
                    "message" => "You are unauthorized to delete this!"
                ], 401);
            }
            $secretKey->delete();
            return response()->json([
                "message" => "Deleted successfully!"
            ]);
        } catch (Exception $ex) {
            return response()->json([
                'message' => $ex->getMessage(),
            ], 500);
        }
    }
}
