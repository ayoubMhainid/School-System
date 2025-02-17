<?php

namespace App\Http\Controllers;

use App\Models\Classe;
use Exception;
use Illuminate\Http\Request;

class ClassController extends Controller
{
    public function getClasses(){
        try{
            $classes = Classe::with("teacher.user")
                            ->paginate(15);

            return response()->json([
                "classes" => $classes
            ]);

        }catch(Exception $ex){
            return response()->json([
                "message" => $ex->getMessage(),
            ],500);
        }
    }


    public function createClass(Request $request){
        try{
            $request->validate([
                "class_name" => "required|string|max:20",
                "section" => "required|string|max:30",
                "teacher_id" => "required|integer|exists:teachers,id"
            ]);

            Classe::create([
                "class_name" => $request->class_name,
                "section" => $request->section,
                "teacher_id" => $request->teacher_id,
            ]);

            return response()->json([
                "message" => "New class created successfully!"
            ]);

        }catch(Exception $ex){
            return response()->json([
                "message" => $ex->getMessage(),
            ],500);
        }
    }


    public function deleteClass($id){
        try{
            $class = Classe::find($id);
            if($class){
                $class->delete();
                return response()->json([
                    "message" => "Class deleted Successfully!"
                ]);
            }else{
                return response()->json([
                    "message" => "Class not found"
                ],404);
            }
        }catch(Exception $ex){
            return response()->json([
                "message" => $ex->getMessage(),
            ],500);
        }
    }
}
