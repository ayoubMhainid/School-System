<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Attendance>
 */
class AttendanceFactory extends Factory
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
            'time' => fake()->randomElement([
            '8:00-10:00', '10:00-12:00', '14:00-16:00', 
            '16:00-18:00', '8:00-12:00', '14:00-18:00'
        ]),
            'status' => fake()->randomElement(["absent","late"]),
        ];
    }
}
