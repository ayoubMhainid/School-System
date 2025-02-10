<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Exam;
use Exception;
use Illuminate\Support\Facades\Validator;


class ExamController extends Controller
{
    public function getExams($class_id)
    {
        try {
            $exams = Exam::where('class_id', $class_id)->paginate(10);

            if ($exams->isEmpty()) {
                return response()->json([
                    'message' => 'No exams found for the given class ID.',
                ], 404);
            }
            return response()->json([
                'message' => 'Exams retrieved successfully.',
                'data' => $exams,
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 500);
        }
    }

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

    } catch (\Exception $e) {
        return response()->json([
            "message" => "An error occurred while creating the exam.",
            "error" => $e->getMessage()
        ], 500);
    }
}
}
