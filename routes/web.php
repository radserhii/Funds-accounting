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
Route::get('api/operations', 'OperationController@index');
Route::post('api/operations', 'OperationController@store');
Route::get('api/operations/{id}/edit', 'OperationController@edit');
Route::put('api/operations/{id}', 'OperationController@update');
Route::delete('api/operations/{id}', 'OperationController@destroy');