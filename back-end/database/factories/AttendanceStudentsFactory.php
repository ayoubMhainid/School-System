<?php

namespace Database\Factories;

use App\Models\AttendanceStudents;
use App\Models\User;
use App\Models\Classe;
use App\Models\Student;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AttendanceStudents>
 */
class AttendanceStudentsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     * 
     */
    public function definition(): array
    {
        $timeSlots = [
            '8:30-10:30' => 2,
            '10:30-12:30' => 2,
            '14:30-16:30' => 2,
            '16:30-18:30' => 2,
            '8:30-12:30' => 4,
            '14:30-18:30' => 4,
            '8:30-18:30' => 8,
        ];

        $selectedTime = fake()->randomElement(array_keys($timeSlots));
        $status = fake()->randomElement(["absent", "late"]);


        $class = Classe::has('students')->inRandomOrder()->first();

        // Ensure there is a class with students
        if (!$class) {
            return [];
        }

        // Get a student from that class
        $student = $class->students()->inRandomOrder()->first();

        return [
            'student_id' => $student->id,
            'class_id' => $class->id,
            'time' => $selectedTime,
            'nbHours' => $status === "absent" ? $timeSlots[$selectedTime] : fake()->numberBetween(1, $timeSlots[$selectedTime]),
            'date' => fake()->dateTimeBetween('2024-10-01')->format('Y-m-d'),
            'status' => $status,
        ];
    }
}
