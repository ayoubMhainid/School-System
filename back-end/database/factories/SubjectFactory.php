<?php

namespace Database\Factories;

use App\Models\Classe;
use App\Models\Teacher;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Subject>
 */
class SubjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'teacher_id' => Teacher::inRandomOrder()->value('id'),
            'class_id' => Classe::inRandomOrder()->value('id'),
            'name' => fake()->name(),
        ];
    }
}
