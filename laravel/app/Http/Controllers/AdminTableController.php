<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
 
class AdminTableController extends Controller
{
    public function actionTable()
    {   
        
        $users = DB::table('users_person')
            ->select(['users_person.id', 'users_person.login', 'users_person_status.name as status', 'users_person_status.color'])
            ->leftJoin('users_person_status', 'users_person_status.id', '=', 'users_person.status')
            ->when($_POST['sortBy'], function($query){

                $orderBy = ['id', 'login', 'status'];

                $orderType = filter_var($_POST['sortDesc'], FILTER_VALIDATE_BOOLEAN);

                if(in_array($_POST['sortBy'], $orderBy) AND is_bool($orderType)){

                    return $query->orderBy('users_person.' . $_POST['sortBy'], ($orderType? 'DESC' : 'ASC'));
                }
        })->get();

        $items = [];

        $i = 0;
        foreach ($users as $user) {
            $items[$i]['id'] = $user->id;
            $items[$i]['login'] = $user->login;
            $items[$i]['status'] = ['name' => $user->status, 'color' => $user->color];
            $i++;
        }
    	return response()->json($items);
    }
}