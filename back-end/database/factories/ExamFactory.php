<?php

namespace Database\Factories;

use App\Models\Classe;
use App\Models\Subject;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Exam>
 */
class ExamFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => Subject::inRandomOrder()->value('id'),
            'class_id' => Classe::inRandomOrder()->value('id'),
            'exam_name' => fake()->name(),
            'date' => fake()->dateTimeBetween('2024-10-01', '2025-06-31')->format('Y-m-d'),
            
        ];
    }
}
