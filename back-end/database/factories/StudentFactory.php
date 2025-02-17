<?php

namespace Database\Factories;

use App\Models\Classe;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Student>
 */
class StudentFactory extends Factory
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
            'class_id' => Classe::inRandomOrder()->value('id'),
            'full_name' => fake()->unique()->name(),
            'date_of_birth' => fake()->dateTimeBetween('2000-01-01', '2012-12-31')->format('Y-m-d'),
            'gender' => fake()->randomElement(["female","male"]),
            'address' => fake()->address(),
            'phone' => fake()->unique()->numerify('+212 6 ## ## ## ##'),
            'username' => fake()->unique()->userName(),            
        ];
    }
}
