@extends('master')

@section('metatags')
<meta name="csrf-token" content="{{ csrf_token() }}">
@endsection

@section('title', 'List users')

@section('content')

<div><a class="btn btn-primary" href="{{ route('users.create')}}">Add user</a></div>

@if (count($users))
    <table class="table table-striped">
    <thead>
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Department</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>    
    </tbody>
    </table>
    <div id="containerNav" class="pagination">
    </div>
@else
    <h2>No users found</h2>
@endif
@section('pagescript')
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script src="/js/users.js"></script>
@stop
@endsection
