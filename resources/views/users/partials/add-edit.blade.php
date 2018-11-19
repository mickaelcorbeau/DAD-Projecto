{{ csrf_field() }}

<input type="hidden" name="id" id="inputId" value="" />

<div class="form-group">
    <label for="inputName">Name</label>
    <input
        type="text" class="form-control"
        name="name" id="inputName"
        placeholder="Fullname" value="" />
</div>
<div class="form-group">
    <label for="inputEmail">Email</label>
    <input
        type="email" class="form-control"
        name="email" id="inputEmail"
        placeholder="Email address" value=""/>
</div>
<div class="form-group">
    <label for="inputAge">Age</label>
    <input
        type="number" class="form-control"
        name="age" id="inputAge"
        placeholder="Age" value=""/>
</div>
<div class="form-group">
    <label for="department_id">Department:</label>
    <select class="form-control" id="department_id" name="department_id"
            value="">
    </select>
</div>
