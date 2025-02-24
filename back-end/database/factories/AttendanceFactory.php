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

        return [
            'user_id' => User::inRandomOrder()->value('id'),
            'time' => $selectedTime,
            'nbHours' => $status === "absent" ? $timeSlots[$selectedTime] : fake()->numberBetween(1, $timeSlots[$selectedTime]),
            'date' => fake()->date('Y-m-d'),
            'status' => $status,
        ];
    }

}
