<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AnnouncementController;
use App\Http\Controllers\AttendancesTeacherController;
use App\Http\Controllers\AttendanceStudentsController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClassController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\StudentController;
use App\Http\Middleware\CheckRole;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ExamController;
use App\Http\Controllers\MarkController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\SecretController;
use App\Http\Controllers\SubjectController;
use App\Http\Middleware\CheckAuthentication;


Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});


Route::prefix("auth")->group(function () {
    Route::post("/checkUserLogin", [AuthController::class, "checkUserLogin"]); // check withen user credentials is valid
    Route::post("/logout", [AuthController::class, "logout"])->middleware(CheckAuthentication::class);
});


Route::prefix("admin")->group(function () {
    Route::get("/getAdmins", [AdminController::class, "getAdmins"])->middleware(CheckAuthentication::class);
    Route::post("/createAdmin", [AdminController::class, "createAdmin"])->middleware(CheckRole::class . ":admin");
    Route::put("/updateAdminData", [AdminController::class, "updateAdmin"])->middleware(CheckRole::class . ":admin");
    Route::delete("/deleteAdmin/{id}", [AdminController::class, "deleteAdmin"])->middleware(CheckRole::class . ":admin");
});


Route::prefix('event')->group(function () {
    Route::get("/getEvents", [EventController::class, 'getEvents']);
    Route::get("/getEventsPaginate", [EventController::class, 'getEventsPaginate'])->middleware(CheckAuthentication::class);;
    Route::delete("/deletEvent/{id}", [EventController::class, 'deleteEventById'])->middleware(CheckRole::class . ":admin");
    Route::post("/createEvent", [EventController::class, 'createEvent'])->middleware(CheckRole::class . ':admin');
});

Route::prefix("teacher")->group(function () {
    Route::get("/getTeachers", [TeacherController::class, "getTeachers"]);
    Route::post("/createTeacher", [TeacherController::class, "createTeacher"]);
    Route::put("/updateTeacher/{id}", [TeacherController::class, "updateTeacher"]);
    Route::delete("/deleteTeacher/{id}", [TeacherController::class, "deleteTeacher"]);
});

Route::prefix("user")->group(function () {
    Route::put("/updateUserData/{id}", [UserController::class, 'updateUserCredentials'])->middleware(CheckRole::class . ":admin");
    Route::delete("/deleteUser/{id}", [UserController::class, 'deleteUser'])->middleware(CheckRole::class . ":admin");
    Route::get("/getUserById/{id}", [UserController::class, "getUserById"])->middleware(CheckAuthentication::class);
    Route::get("/getAuthUserData", [UserController::class, "getAuthUserData"])->middleware(CheckAuthentication::class);
});


Route::prefix("student")->group(function () {
    Route::get("/getStudents", [StudentController::class, "getStudents"])->middleware(CheckAuthentication::class);
    Route::get("/getStudent/{id}", [StudentController::class, "getStudent"])->middleware(CheckAuthentication::class);
    Route::get("/searchStudentsByUsername/{username}", [StudentController::class, "searchStudentsByUsername"])->middleware(CheckRole::class . ':admin');
    Route::get("/filterStudentsByClass/{class_id}", [StudentController::class, "filterStudentsByClass"]); //->middleware(CheckRole::class . ':teacher');
    Route::get("/filterStudentsByGender/{gender}", [StudentController::class, "filterStudentsByGender"])->middleware(CheckRole::class . ':admin');
    Route::post("/createStudent", [StudentController::class, "createStudent"])->middleware(CheckRole::class . ':admin');
    Route::put("/updateStudentData", [StudentController::class, "updateStudent"])->middleware(CheckAuthentication::class);
    Route::delete("/deleteStudent/{id}", [StudentController::class, "deleteStudent"])->middleware(CheckRole::class . ':admin');
});


Route::prefix("teacher")->group(function () {
    Route::get("/getTeachers", [TeacherController::class, "getTeachers"])->middleware(CheckRole::class . ":admin");
    Route::get("/getTeachersGet", [TeacherController::class, "getTeachersGet"])->middleware(CheckRole::class . ":admin");
    Route::get("/getAllTeachers", [TeacherController::class, "getAllTeachers"])->middleware(CheckRole::class . ":admin");
    Route::get("/getTeacher/{id}", [TeacherController::class, "getTeacher"])->middleware(CheckAuthentication::class);
    Route::get("/getAllTeacherOfStudent", [TeacherController::class, "getAllTeacherOfStudent"])->middleware(CheckRole::class . ":student");
    Route::get("/searchTeachersByUsername/{username}", [TeacherController::class, "searchTeachersByUsername"])->middleware(CheckAuthentication::class);
    Route::get("/getTeachersByClass/{id}", [TeacherController::class, "getTeachersByClass"])->middleware(CheckAuthentication::class);
    Route::post("/createTeacher", [TeacherController::class, "createTeacher"])->middleware(CheckRole::class . ":admin");
    Route::put("/updateTeacher", [TeacherController::class, "updateTeacher"])->middleware(CheckAuthentication::class);
    Route::delete("/deleteTeacher/{id}", [TeacherController::class, "deleteTeacher"])->middleware(CheckRole::class . ":admin");
});


Route::prefix("class")->group(function () {
    Route::get("/getClasses", [ClassController::class, "getClasses"])->middleware(CheckAuthentication::class);
    Route::get("/getClassesByTeacher/{id}", [ClassController::class, "getClassesByTeacher"])->middleware(CheckAuthentication::class);
    Route::get("/getClassesByTeacher_2", [ClassController::class, "getClassesByTeacher_2"])->middleware(CheckRole::class . ":teacher");
    Route::get("/getClassesAndStudentsByTeacher", [ClassController::class, "getClassesAndStudentsByTeacher"])->middleware(CheckAuthentication::class);
    Route::get("/getClassespaginate", [ClassController::class, "getClassespaginate"])->middleware(CheckAuthentication::class);
    Route::post("/createClass", [ClassController::class, "createClass"])->middleware(CheckRole::class . ":admin");
    Route::put("/updateClass/{id}", [ClassController::class, "updateClass"])->middleware(CheckRole::class . ":admin");
    Route::delete("/deleteClass/{id}", [ClassController::class, "deleteClass"])->middleware(CheckRole::class . ":admin");
    Route::get("/getClassesByTeacherAuth", [ClassController::class, "getClassesByTeacherAuth"])->middleware(CheckRole::class . ":teacher");
});

Route::prefix("exam")->group(function () {
    Route::post('/createExam', [ExamController::class, "createExam"])->middleware(CheckRole::class . ":teacher");
    Route::delete("/deleteExam/{id} ", [ExamController::class, "deleteExam"])->middleware(CheckRole::class . ":teacher");
    Route::put("/updateExam/{id} ", [ExamController::class, "updateExam"])->middleware(CheckRole::class . ":teacher");
    Route::get("/getExams ", [ExamController::class, "getExams"]);
    Route::get("/getExamsBySubject/{subjectId}", [ExamController::class, 'getExamsBySubject']);
    Route::get("/getExamsOfStudent", [ExamController::class, "getExamsOfStudent"])->middleware(CheckRole::class . ":student");
    Route::get("/getExamById/{id} ", [ExamController::class, "getExamById"]);
});

Route::prefix("mark")->group(function () {
    Route::get('/getMark/{studentId}/{examId}', [MarkController::class, 'getMark'])->middleware(CheckRole::class . ':teacher');
    Route::post('/addMark', [MarkController::class, 'addMark'])->middleware(CheckRole::class . ':teacher');
});

Route::prefix("announcement")->group(function () {
    Route::get("/getAnnouncements", [AnnouncementController::class, "getAnnouncements"])->middleware(CheckAuthentication::class);
    Route::get("/getAnnouncementsPaginate", [AnnouncementController::class, "getAnnouncementsPaginate"])->middleware(CheckAuthentication::class);
    Route::post("/createAnnouncements", [AnnouncementController::class, "createAnnouncement"])->middleware(CheckRole::class . ":admin");
    Route::delete("/deleteAnnouncement/{id}", [AnnouncementController::class, "deleteAnnouncement"])->middleware(CheckRole::class . ":admin");
});


Route::prefix("notification")->middleware(CheckAuthentication::class)->group(function () {
    Route::get("/getNotifications", [NotificationController::class, "getNotifications"]);
    Route::post("/createNotification", [NotificationController::class, "createNotification"]);
    Route::delete("/deleteNotification/{id}", [NotificationController::class, "deleteNotification"]);
    Route::put("/makeNotificationSeen/{id}", [NotificationController::class, "makeNotificationSeen"]);
});


Route::prefix("subject")->group(function () {
    Route::get("/getSubjects", [SubjectController::class, "getSubjects"])->middleware(CheckRole::class . ":admin");
    Route::get("/getSubjectsByTeacher", [SubjectController::class, "getSubjectsByTeacher"])->middleware(CheckRole::class . ":teacher");
    Route::post("/createSubject", [SubjectController::class, "createSubject"])->middleware(CheckRole::class . ":admin");
    Route::delete("/deleteSubject/{id}", [SubjectController::class, "deleteSubject"])->middleware(CheckRole::class . ":admin");
    Route::put("/updateSubject", [SubjectController::class, "updateSubject"])->middleware(CheckRole::class . ":admin");
    Route::get("/getSubjectsByteacherAndClass/{class_id}", [SubjectController::class, "getSubjectsByteacherAndClass"])->middleware(CheckRole::class . ":teacher");
});

Route::prefix('attendancesTeacher')->middleware(CheckRole::class . ":admin")->group(function () {
    Route::get('/getAttendancesTeacher', [AttendancesTeacherController::class, 'getAttendancesTeacher']);
    Route::post('/createAttendanceTeacher', [AttendancesTeacherController::class, 'createAttendanceTeacher']);
    Route::delete('/deleteAttendanceTeacher/{id}', [AttendancesTeacherController::class, 'deleteAttendanceTeacher']);
});

Route::prefix('attendanceStud')->group(function () {
    Route::get('/getAttendance', [AttendanceStudentsController::class, 'getAttendance'])->middleware(CheckRole::class . ":teacher");
    Route::get('/getAttendanceByClass/{class_id}', [AttendanceStudentsController::class, 'getAttendanceByClass'])->middleware(CheckRole::class . ":teacher");
    Route::post('/createAttendance', [AttendanceStudentsController::class, 'store'])->middleware(CheckRole::class . ":teacher");
    Route::get("/getNbHoursOfAbsentStudents/{class_id}", [AttendanceStudentsController::class, 'getNbHoursOfAbsentStudents'])->middleware(CheckRole::class . ":teacher");
    Route::delete('/deleteAttendance/{id}', [AttendanceStudentsController::class, 'delete'])->middleware(CheckRole::class . ":teacher");
});

Route::prefix("secret")->middleware(CheckRole::class . ":admin")->group(function () {
    Route::get("/getSecrets", [SecretController::class, 'getSecrets']);
    Route::post("/createSecret", [SecretController::class, 'createSecretKey']);
    Route::delete("/deleteSecret/{id}", [SecretController::class, 'deleteSecret']);
});


Route::prefix('dashboard')->group(function () {
    Route::get("/getAdmindashboardData", [DashboardController::class, 'getAdminDashboardData'])->middleware(CheckRole::class . ':admin');
});
