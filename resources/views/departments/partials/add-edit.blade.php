{{ csrf_field() }}

<div class="form-group">
    <label for="inputName">Designation</label>
    <input
        type="text" class="form-control"
        name="name" id="inputName"
        placeholder="Designation" value="{{old('name', $department->name)}}" />
</div>

