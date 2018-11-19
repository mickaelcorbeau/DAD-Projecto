@extends('master')

@section('metatags')
<meta name="csrf-token" content="{{ csrf_token() }}">
@endsection

@section('extrastyles')
<link href="https://unpkg.com/vanilla-datatables@latest/dist/vanilla-dataTables.min.css" rel="stylesheet" type="text/css">
@endsection

@section('title', 'List users')

@section('content')

<div><a class="btn btn-primary" href="{{ route('users.create')}}">Add user</a></div>

<div class="container">
	<table class="table table-striped" id="dataTable"></table>	
</div>
@endsection
@section('pagescript')
<!--     <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
 -->    
	<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
 	<script src="https://unpkg.com/vanilla-datatables@latest/dist/vanilla-dataTables.min.js" type="text/javascript"></script>
	<script src="/js/users_datatable.js"></script>

@endsection
