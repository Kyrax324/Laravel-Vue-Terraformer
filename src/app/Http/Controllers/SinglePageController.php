<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SinglePageController extends Controller
{	
    public function index(Request $request) {

    	$app_name = config('app.name');
    	$title = ucwords($app_name);
    	$image = "/images/og.png";
    	$description = "Welcome to $title.";

    	$data = [
    		'title' => $title,
    		'image' => $image,
    		'description' => $description,
    	];

	    return view('welcome',$data);
	}
}
