<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Exam;

class ExamController extends Controller
{
    public function getExams($class_id)
    {
        try {
            $exams = Exam::where('class_id', $class_id)->get();

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
}
