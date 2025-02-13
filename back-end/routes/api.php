<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AnnouncementController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClassController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\StudentController;
use App\Http\Middleware\CheckRole;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ExamController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\SubjectController;
use App\Http\Middleware\CheckAuthentication;


Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});


Route::prefix("auth")->group(function () {
    Route::post("/checkUserLogin", [AuthController::class, "checkUserLogin"]); // check withen user credentials is valid
    Route::post("/logout", [AuthController::class, "logout"])->middleware(CheckAuthentication::class);
});


Route::prefix("admin")->middleware(CheckRole::class . ":admin")->group(function () {
    Route::get("/getAdmins", [AdminController::class, "getAdmins"]);
    Route::post("/createAdmin", [AdminController::class, "createAdmin"]);
    Route::put("/updateAdmin/{id}", [AdminController::class, "updateAdmin"]);
    Route::delete("/deleteAdmin/{id}", [AdminController::class, "deleteAdmin"]);
});


Route::prefix('event')->group(function () {
    Route::get("/getEvents", [EventController::class, 'getEvents']);
    Route::delete("/deletEvent/{id}", [EventController::class, 'deleteEventById'])->middleware(CheckRole::class . ":admin");
    Route::post("/createEvent", [EventController::class, 'createEvent'])->middleware(CheckRole::class . ':admin');
});

Route::prefix("teacher")->group(function () {
    Route::get("/getTeachers", [TeacherController::class, "getTeachers"]);
    Route::post("/createTeacher", [TeacherController::class, "createTeacher"]);
    Route::put("/updateTeacher/{id}", [TeacherController::class, "updateTeacher"]);
    Route::delete("/deleteTeacher/{id}", [TeacherController::class, "deleteTeacher"]);
});

Route::prefix("user")->middleware(CheckRole::class . ":admin")->group(function () {
    Route::put("/updateUserData/{id}", [UserController::class, 'updateUserCredentials']);
});


Route::prefix("student")->group(function () {
    Route::get("/getStudents", [StudentController::class, "getStudents"])->middleware(CheckAuthentication::class);
    Route::get("/getStudent/{id}", [StudentController::class, "getStudent"])->middleware(CheckAuthentication::class);
    Route::post("/createStudent", [StudentController::class, "createStudent"])->middleware(CheckRole::class . ':admin');
    Route::put("/updateStudentData", [StudentController::class, "updateStudent"])->middleware(CheckAuthentication::class);
    Route::delete("/deleteStudent/{id}", [StudentController::class, "deleteStudent"])->middleware(CheckRole::class . ':admin');
    Route::get("/SearchStudentsByUsername/{username}",[StudentController::class,"SearchStudentsByUsername"])->middleware(CheckRole::class . ':admin');
});


Route::prefix("teacher")->group(function () {
    Route::get("/getTeachers", [TeacherController::class, "getTeachers"])->middleware(CheckRole::class . ":admin");
    Route::get("/getTeacher/{id}", [TeacherController::class, "getTeacher"])->middleware(CheckAuthentication::class);
    Route::post("/createTeacher", [TeacherController::class, "createTeacher"])->middleware(CheckRole::class . ":admin");
    Route::put("/updateTeacher", [TeacherController::class, "updateTeacher"])->middleware(CheckAuthentication::class);
    Route::delete("/deleteTeacher/{id}", [TeacherController::class, "deleteTeacher"])->middleware(CheckRole::class . ":admin");
});


Route::prefix("class")->group(function () {
    Route::get("/getClasses", [ClassController::class, "getClasses"])->middleware(CheckAuthentication::class);
    Route::post("/createClass", [ClassController::class, "createClass"])->middleware(CheckRole::class . ":admin");
    Route::delete("/deleteClass/{id}", [ClassController::class, "deleteClass"])->middleware(CheckRole::class . ":admin");
});

Route::prefix("exam")->group(function () {
    Route::post('/createExam', [ExamController::class, "createExam"])->middleware(CheckRole::class . ":teacher");
    Route::delete("/deleteExam/{id} ",[ExamController::class,"deleteExam"])->middleware(CheckRole::class .":teacher");
});


Route::prefix("announcement")->group(function () {
    Route::get("/getAnnouncements", [AnnouncementController::class, "getAnnouncements"])->middleware(CheckAuthentication::class);
    Route::post("/createNotification", [AnnouncementController::class, "createAnnouncement"])->middleware(CheckRole::class . ":admin");
    Route::delete("/deleteAnnouncement/{id}", [AnnouncementController::class, "deleteAnnouncement"])->middleware(CheckRole::class . ":admin");
});

Route::prefix("notification")->middleware(CheckAuthentication::class)->group(function () {
    Route::get("/getNotifications", [NotificationController::class, "getNotifications"]);
    Route::post("/createNotification", [NotificationController::class, "createNotification"]);
    Route::delete("/deleteNotification/{id}", [NotificationController::class, "deleteNotification"]);
    Route::put("/makeNotificationSeend/{id}", [NotificationController::class, "makeNotificationSeend"]);
});


Route::prefix("subject")->middleware(CheckRole::class . ":admin")->group(function(){
    Route::get("/getSubjects", [SubjectController::class, "getSubjects"]);
    Route::post("/createSubject", [SubjectController::class, "createSubject"]);
    Route::delete("/deleteSubject/{id}", [SubjectController::class, "deleteSubject"]);
});
