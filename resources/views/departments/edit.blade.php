@extends('master')

@section('title', 'Edit department')

@section('content')

@if (count($errors) > 0)
    @include('shared.errors')
@endif

<form action="{{route('departments.update', $department)}}" method="post" class="form-group">
    {{method_field('PUT')}}
    @include('departments.partials.add-edit')
    <div class="form-group">
        <button type="submit" class="btn btn-primary" name="ok">Save</button>
       <a type="submit"  class="btn btn-default" href="{{route('departments.index')}}">Cancel</a>
    </div>
</form>
@endsection
