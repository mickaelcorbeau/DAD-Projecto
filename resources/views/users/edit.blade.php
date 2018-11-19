@extends('master')

@section('title', 'Edit user')

@section('content')

@if (count($errors) > 0)
    @include('shared.errors')
@endif

<form method="post" class="form-group">
    @include('users.partials.add-edit')
    <div class="form-group">
        <button type="button" class="btn btn-primary" name="ok" id="btnSave">Save</button>
       <a type="button"  class="btn btn-default" id="btnCancel">Cancel</a>
    </div>
</form>
@endsection
@section('pagescript')
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.17.0/jquery.validate.min.js"></script>
    <script src="/js/users_edit.js"></script>    
@endsection
