<?php

namespace Database\Seeders;

use App\Models\Admin;
use App\Models\Announcement;
<<<<<<< HEAD
use App\Models\AttendancesTeacher;
=======
use App\Models\Attendance;
use App\Models\AttendanceStudents;
>>>>>>> 14d31a1691143608f46a72ab919698f2b7490b98
use App\Models\Classe;
use App\Models\Event;
use App\Models\Exam;
use App\Models\Mark;
use App\Models\Notification;
use App\Models\Student;
use App\Models\Subject;
use App\Models\Teacher;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Notifications\Notification as NotificationsNotification;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {


        User::factory(80)->create();
        Teacher::factory(20)->create();
        Classe::factory(20)->create();
        Student::factory(20)->create();
        Admin::factory(20)->create();
        Subject::factory(20)->create();
        Announcement::factory(20)->create();
        Event::factory(20)->create();
        Exam::factory(20)->create();
        Mark::factory(20)->create();
        Notification::factory(20)->create();
<<<<<<< HEAD
        AttendancesTeacher::factory(50)->create();
=======
        Attendance::factory(50)->create();
        AttendanceStudents::factory(50)->create();
>>>>>>> 14d31a1691143608f46a72ab919698f2b7490b98
    }
}
