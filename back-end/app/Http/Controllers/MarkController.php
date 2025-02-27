<?php

namespace App\Http\Controllers;

use App\Models\Mark;
use Exception;
use Illuminate\Http\Request;

class MarkController extends Controller
{
    public function getMark($studentId,$examId){
        try{
            $mark = Mark::where("student_id",$studentId)
                        ->where("exam_id",$examId)
                        ->first();

            if(!$mark){
                return response()->json([
                    "message" => "No mark founded"
                ],404);
            }
            return response()->json([
                "mark" => [
                    "studentId" => $mark->student_id,
                    "examId" => $mark->exam_id,
                    "mark" => $mark->mark,
                    "remark" => $mark->remark,
                ]
            ]);

        }catch(Exception $ex){
            return response()->json([
                "message" => $ex->getMessage(),
            ],500);
        }
    }

    public function addMark(Request $request){
        try{
            $request->validate([
                "studentId" => "required|exists:students,id",
                "examId" => "required|exists:exams,id",
                "mark" => "required|max:20|min:0|numeric",
                "remark" => "required|max:200",
            ]);

            $mark = Mark::where('student_id',$request->studentId)
                            ->where('exam_id',$request->examId)
                            ->first();
            if($mark){
                $mark->mark = $request->mark;
                $mark->remark = $request->remark;
                $mark->save();

                return response()->json([
                    'message' => 'Student mark updated successfully!'
                ]);
            }

            Mark::create([
                "student_id" => $request->studentId,
                "exam_id" => $request->examId,
                "mark" => $request->mark,
                "remark" => $request->remark,
            ]);

            return response()->json([
                "message" => "Mark added successfully!"
            ]);

        }catch(Exception $ex){
            return response()->json([
                "message" => $ex->getMessage(),
            ],500);
        }
    }
}
