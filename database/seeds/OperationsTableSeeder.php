<?php

use Illuminate\Database\Seeder;

class OperationsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker\Factory::create();

        foreach (range(1,10) as $index) {

            $sum = $faker->randomFloat($nbMaxDecimals = 2, $min = 0, $max = 10000);
            $sumUsd = $sum / App\Libs\ApiPrivatbank::getCourse('usd');

            DB::table('operations')->insert([
                'title' => $faker->sentence($nbWords = 4, $variableNbWords = true),
                'type' => $faker->randomElement(['debit', 'credit']),
                'sum' =>$sum,
                'sum_usd' => $sumUsd,
                'user_id' => $faker->numberBetween($min = 1, $max = 3),
                'created_at' => $faker->dateTimeThisYear($max = 'now'),
                'updated_at' => $faker->dateTimeThisYear($max = 'now'),
            ]);
        }
    }
}
