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
    return view('index');
});

Route::get('login', function () {
    return view('index');
})->name('login');

Route::post('login/auth', 'LoginController@auth');

Route::get('admin', function () {
    return view('index');
})->name('admin')->middleware('auth');



Route::post('admin/datatable', 'AdminTableController@actionTable');