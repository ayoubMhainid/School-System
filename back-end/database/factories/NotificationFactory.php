<?php

namespace Database\Factories;

use App\Models\Student;
use App\Models\Teacher;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Notification>
 */
class NotificationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'student_id' => Student::inRandomOrder()->value('id'),
            'teacher_id' => Teacher::inRandomOrder()->value('id'),
            'content' => fake()->text(50),
            'status' => fake()->randomElement(["seen","delivred"]),
        ];
    }
}
