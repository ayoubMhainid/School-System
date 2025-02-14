<?php

namespace App\Http\Controllers;

use App\Models\Subject;
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
            $subjects = Subject::all();
        } elseif ($user->role === 'teacher') {
            $subjects = Subject::where('teacher_id', $user->id)->get();
        }else{
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        return response()->json($subjects);
    }

    public function createSubject(Request $request){
        $user = JWTAuth::parseToken()->authenticate();
        $validateData = $request->validate(rules: [
            'name' => 'required|string',
            'class_id' => 'required|integer',
            'teacher_id' => 'required|integer|exists:teachers,id'
        ]);
        if($user->role !== 'admin'){
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        $subject = Subject::create([
            'name' => $validateData['name'],
            'class_id' => $validateData['class_id'],
            'teacher_id' => $validateData['teacher_id']
        ]);
        return response()->json(['message' => 'Subject created successfully'], 201);
    }

    public function deleteSubject($id){
        try{
            $user = JWTAuth::parseToken()->authenticate();
            if($user->role !== 'admin'){
            return response()->json(['message' => 'Unauthorized'], 401);
            }
            $subject = Subject::find($id);
            if($subject === null){
                return response()->json(['message' => 'Subject not found'], 404);
            }
            $subject->delete();
            return response()->json(['message' => 'Subject deleted successfully'], 200);
        }catch(Exception $e){
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}