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
    protected static $usedIds = [];

    public function definition(): array
    {
        // Get the next available user ID with the 'student' role
        $id = User::where('role', 'student')
            ->whereNotIn('id', self::$usedIds) // Exclude used IDs
            ->orderBy('id')
            ->value('id');

        if ($id) {
            self::$usedIds[] = $id; // Mark this ID as used
        }

        return [
            'user_id' => $id,
            'class_id' => Classe::orderBy('id')->value('id'), // Assign class in order
            'full_name' => fake()->unique()->name(),
            'date_of_birth' => fake()->dateTimeBetween('2000-01-01', '2012-12-31')->format('Y-m-d'),
            'gender' => fake()->randomElement(["female", "male"]),
            'address' => fake()->address(),
            'phone' => fake()->unique()->numerify('+212 6 ## ## ## ##'),
            'username' => fake()->unique()->userName(),            
        ];
    }
}
