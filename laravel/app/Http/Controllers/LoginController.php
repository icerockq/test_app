<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\User;
 
class LoginController extends Controller
{

    public function auth(Request $request){
        if(!User::checkAuth( $request)){
            $login = $request->input('login');
            $password = $request->input('password');

            if($login AND $password){
                $user = DB::table('users_person')->where('login', $login)->where('password', md5($password))->first();
                if($user){
                    $hash = md5($user->id.rand(0, 1000).time());
                    DB::table('users_person_hash')->insert(
                        ['user_id' => $user->id, 'hash' => $hash]
                    );
                    $responseMessage = ['error' => 0, 'message' => 'Вы успешно авторизованы', 'user_id' => $user->id, 'hash' => $hash];
                }else{
                    $responseMessage = ['error' => 1, 'message' => 'Неверный логин или пароль'];
                }
            }else{
                $responseMessage = ['error' => 1, 'message' => 'Неверный логин или пароль'];
            }
            return response()->json($responseMessage); 
        }else{
            return route('admin');
        }
    }
}