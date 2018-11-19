    (function(){
        'use strict';

        function initFields() {
            document.getElementById('inputId').value = '';
            document.getElementById('inputName').value = '';
            document.getElementById('inputEmail').value = '';
            document.getElementById('inputAge').value = '';
            document.getElementById('department_id').value = '';
            document.getElementById('inputPassword').value = '';
            document.getElementById('inputPasswordConfirmation').value = '';
        }

        function fillFields(user) {
            document.getElementById('inputId').value = user.id;
            document.getElementById('inputName').value = user.name;
            document.getElementById('inputEmail').value = user.email;
            document.getElementById('inputPassword').value = '';
            document.getElementById('inputPasswordConfirmation').value = '';
            validator.resetForm();
        }

        function fieldsToUser() {
            var user = {};
            user.id = document.getElementById('inputId').value;
            user.name = document.getElementById('inputName').value;
            user.email = document.getElementById('inputEmail').value;
            user.age = document.getElementById('inputAge').value;
            user.department_id = document.getElementById('department_id').value;
            user.password = document.getElementById('inputPassword').value;
            return user;
        }

        function loadDepartments() {
          axios.get('/api/departments/')
          .then(function (response) {
            var selectDepartment = document.getElementById('department_id');
              response.data.data.forEach(function(department) {
                var option = document.createElement('option');
                option.setAttribute('value', department.id);
                option.textContent = department.name;
                selectDepartment.appendChild(option);
              });                     
          })
          .catch(function (error) {
              console.log(error);
          });
        }

        function saveNewUser(user) {
            axios.post('/api/users', user)
            .then(function (response) {
                fillFields(response.data);
                userID = response.data.id;
                window.alert("User with id= " + userID +" record was created");
                window.location.href="/users/" + userID;
            })
            .catch(function (error) {
                console.log(error);
                window.alert("User was not created");
            });
        }

    initFields();
    loadDepartments();

    var userID = "";

    var btnCancel = document.getElementById('btnCancel');
    btnCancel.addEventListener('click', function(e){
        initFields(userID);    
    });

    var btnSave = document.getElementById('btnSave');
    btnSave.addEventListener('click', function(e){
        if (validator.form()) {
            saveNewUser(fieldsToUser());
        }
    });

    var validator = $("form").validate({
      rules: {
        name: {
          required: true,
          minlength: 3,
          regex: /^[A-Za-záàâãéèêíóôõúçÁÀÂÃÉÈÍÓÔÕÚÇ ]+$/,
      },
      email: {
          required: true,
          email: true,  
          remote:{ type: "GET",
            url:  "/api/users/emailavailable/",
          }
      },
      age: {
        digits: true,
        range: [18, 75]  
      },
      password: {
          required: true,
          minlength: 3
      },
      password_confirmation: {
          equalTo: '#inputPassword'
      }
    },
    messages: {
        name: {
          required: "Name is required",
          regex: "Name only accepts letters and spaces",
      },
      email: {
          required: "Email is required for us to contact you",
          email: "Email is  not valid",
          remote: "Email is already taken"
      },
      age: {
        digit: "Age must be an integer",
        range: "We only accept user from 18 to 75 years old"
      },
      password: {
          required: "Users always require a password",
          minlength: "Password must have at least 3 characters"
      },
      password_confirmation: {
          equalTo: 'Password confirmation must be equal to password'
      }
    }
    });    

    $.validator.addMethod("regex", function(value, element, regexpr) {          
        return regexpr.test(value);
    }, "Please enter a valid format.");
})();
