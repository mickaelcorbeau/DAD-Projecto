@extends('master')

@section('title', 'Add department')

@section('content')

@if (count($errors) > 0)
    @include('shared.errors')
@endif

<form action="{{route('departments.store')}}" method="post" class="form-group">
    @include('departments.partials.add-edit')
    <div class="form-group">
        <button type="submit" class="btn btn-primary" name="ok">Add</button>
        <a type="submit"  class="btn btn-default" href="{{route('departments.index')}}">Cancel</a>
    </div>
</form>
@endsection