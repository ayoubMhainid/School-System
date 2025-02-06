<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Teacher>
 */
class TeacherFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::inRandomOrder()->value('id'),
            'full_name' => fake()->unique()->name(),
            'phone' => fake()->unique()->numerify('+212 6 ## ## ## ##'),
            'username' => fake()->unique()->name(),
            'address' => fake()->address(),
            'specialization' => fake()->name()
        ];
    }
}
