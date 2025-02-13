<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Exam;
use Exception;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class ExamController extends Controller
{
    public function createExam(Request $request)
{
    try {
        $validator = $request->validate([
        "subject_id" => "required|exists:subjects,id",
        "class_id" => "required|exists:classes,id",
        "exam_name" => "required|string|max:255",
        "date" => "required|date",]);

        $exam = Exam::create($validator);

        return response()->json([
            "message" => "Exam created successfully",
            "exam" => $exam
        ], 201);

    } catch (Exception $e) {
        return response()->json([
            "message" => "An error occurred while creating the exam.",
            "error" => $e->getMessage()
        ], 500);
    }
}
    public function deleteExam($id){
        try{

            $exam = Exam::find($id);
            if(!$exam){
                return response()->json(["message"=> "exam not found"]);
            }
            $exam->delete();
            response()->json(["message"=>"Exam deleted successfully"]);

        }catch(Exception $e){
            response()->json(["message"=>$e->getMessage()]);
        }
    }
}
