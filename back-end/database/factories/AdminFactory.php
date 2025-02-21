<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Admin>
 */
class AdminFactory extends Factory
{
    protected static $usedIds = [];

    public function definition(): array
    {
        // Get the next available user ID with the 'admin' role
        $id = User::where('role', 'admin')
            ->whereNotIn('id', self::$usedIds) // Exclude used IDs
            ->orderBy('id')
            ->value('id');

        if ($id) {
            self::$usedIds[] = $id; // Mark this ID as used
        }

        return [
            'user_id' => $id,
            'full_name' => fake()->unique()->name(),
            'phone' => fake()->unique()->numerify('+212 6 ## ## ## ##'),
            'username' => fake()->unique()->userName(),
        ];
    }
}
