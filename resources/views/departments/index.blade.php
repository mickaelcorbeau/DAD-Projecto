@extends('master')

@section('metatags')
<meta name="csrf-token" content="{{ csrf_token() }}">
@endsection

@section('title', 'List departments')

@section('content')

<div><a class="btn btn-primary" href="{{ route('departments.create')}}">Add department</a></div>

@if (count($departments))
    <table class="table table-striped">
    <thead>
        <tr>
            <th>Name</th>
            <th>Created</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
    </tbody>
    </table>
@else
    <h2>No departments found</h2>
@endif
@endsection
@section('pagescript')
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script src="/js/departments.js"></script>
@endsection

