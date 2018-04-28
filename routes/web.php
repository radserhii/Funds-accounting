<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');


//Api for React
Route::group(['middleware' => ['auth'], 'prefix' => 'api'], function () {
    Route::get('operations/{startDate?}/{endDate?}', 'OperationController@index');
    Route::post('operations', 'OperationController@store');
    Route::get('operation/{id}/edit', 'OperationController@edit');
    Route::put('operations/{id}', 'OperationController@update');
    Route::delete('operations/{id}', 'OperationController@destroy');
});

