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

Route::redirect('/', '/users', 301);

Route::model('user', 'App\User');
Route::resource('users', 'UserController');
Route::resource('departments', 'DepartmentController');

Route::get('userstable', 'UserController@indexTable')->name('users.index.table');
