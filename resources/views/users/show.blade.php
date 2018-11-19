@extends('master')

@section('title', 'Show user')

@section('content')

@if (count($errors) > 0)
    @include('shared.errors')
@endif

<div class="form-group">
    <label for="inputName">Name</label>
    <input
        type="text" class="form-control"
        name="name" id="inputName" readonly="readonly"
        placeholder="Fullname" value="{{$user->name}}" />
</div>
<div class="form-group">
    <label for="inputEmail">Email</label>
    <input
        type="email" class="form-control"
        name="email" id="inputEmail" readonly="readonly"
        placeholder="Email address" value="{{$user->email}}"/>
</div>
<div class="form-group">
    <label for="inputAge">Age</label>
    <input
        type="number" class="form-control"
        name="age" id="inputAge" readonly="readonly"
        placeholder="Age" value="{{ $user->age }}"/>
</div>
<div class="form-group">
    <label for="department_id">Department:</label>
    <select class="form-control" id="department_id" name="department_id"
            value="{{old('department_id', $user->department_id)}}" disabled="disabled">
        @foreach ($departments as $department)
            @if ($department->id == $user->department_id)
                <option value="{{$department->id}}" selected>{{$department->name}}</option>
            @else
                <option value="{{$department->id}}">{{$department->name}}</option>
            @endif
        @endforeach
    </select>
</div>
@endsection