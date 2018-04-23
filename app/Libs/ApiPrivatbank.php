<?php
/**
 * Created by PhpStorm.
 * User: Gorobec
 * Date: 23.04.2018
 * Time: 15:42
 */

namespace App\Libs;

use GuzzleHttp\Client;

class ApiPrivatbank
{
    /**
     * Get current exchange rates
     * @param $ccy - Currency code 'rur'||'eur'||'usd'
     * @return null or purchase rate
     */
    public static function getCourse($ccy)
    {
        $client = new Client();
        $response = $client->request('GET', 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5');
        $res = json_decode($response->getBody());

        $rate = null;

        if ($response->getStatusCode() === 200) {
            foreach ($res as $item) {
                if ($item->ccy == strtoupper($ccy)) {
                    $rate = $item->buy;
                };
            }
        }

        return $rate;
    }
}