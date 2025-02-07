<?php

namespace Database\Factories;

use App\Models\Exam;
use App\Models\Student;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Mark>
 */
class MarkFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'exam_id' => Exam::inRandomOrder()->value('id'),
            'student_id' => Student::inRandomOrder()->value('id'),
            'mark' => fake()->numberBetween(0,20),
            'remark' => fake()->text(100),
        ];
    }
}
