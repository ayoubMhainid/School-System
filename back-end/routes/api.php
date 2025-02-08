<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClassController;
use App\Http\Middleware\CheckRole;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});


Route::prefix("auth")->group(function() {
    Route::post("/checkUserLogin", [AuthController::class, "checkUserLogin"]); // check withen user credentials is valid
});
//


Route::prefix("admin")->middleware(CheckRole::class . ":admin")->group(function(){
    Route::get("/getAdmins", [AdminController::class, "getAdmins"]);
    Route::post("/createAdmin", [AdminController::class, "createAdmin"]);
    Route::put("/updateAdmin/{id}", [AdminController::class, "updateAdmin"]);
    Route::delete("/deleteAdmin/{id}", [AdminController::class, "deleteAdmin"]);
});

Route::prefix("class")->group(function(){
    Route::get("/getClasses", [ClassController::class ,"getClasses"]);
    Route::post("/createClass", [ClassController::class ,"createClass"]);
    Route::delete("/deleteClass/{id}", [ClassController::class, "deleteClass"]);
});
