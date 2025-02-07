<?php

namespace Database\Factories;


use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Foundation\Auth\User;

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
            'sender_id' => User::inRandomOrder()->value('id'),
            'receiver_id' => User::inRandomOrder()->value('id'),
            'content' => fake()->text(50),
            'status' => fake()->randomElement(["seen","delivred"]),
        ];
    }
}
