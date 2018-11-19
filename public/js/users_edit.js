    (function(){
        'use strict';

        function initFields() {
            document.getElementById('inputId').value = '';
            document.getElementById('inputName').value = '';
            document.getElementById('inputEmail').value = '';
            document.getElementById('inputAge').value = '';
            document.getElementById('department_id').value = '';

        }

        function fillFields(user) {
            document.getElementById('inputId').value = user.id;
            document.getElementById('inputName').value = user.name;
            document.getElementById('inputEmail').value = user.email;
            document.getElementById('inputAge').value = user.age;
            document.getElementById('department_id').value = user.department_id;
            validator.resetForm();
        }

        function fieldsToUser() {
            var user = {};
            user.id = document.getElementById('inputId').value;
            user.name = document.getElementById('inputName').value;
            user.email = document.getElementById('inputEmail').value;
            user.age = document.getElementById('inputAge').value;
            user.department_id = document.getElementById('department_id').value;
            return user;
        }

        function loadUser(userID) {
           axios.get('/api/users/' + userID)
           .then(function (response) {
              fillFields(response.data.data);
          })
           .catch(function (error) {
               console.log(error);
           });
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

       function saveUser(user) {
        axios.put('/api/users/' + user.id, user)
        .then(function (response) {
            fillFields(response.data.data);
            window.alert('User has been updated correctly');
        })
        .catch(function (error) {
            console.log(error);
            window.alert("User was not updated");
        });

    }

    initFields();
    loadDepartments();

    var userID = window.location.pathname.split('/')[2];
    loadUser(userID);

    var btnCancel = document.getElementById('btnCancel');
    btnCancel.addEventListener('click', function(e){
        loadUser(userID);        
    });

    var btnSave = document.getElementById('btnSave');
    btnSave.addEventListener('click', function(e){
        if (validator.form()) {
            saveUser(fieldsToUser());
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
          data: { 
            email: function() {
                return $( "#inputEmail" ).val();
            },
            id: function() {
                return $( "#inputId" ).val();
            }
        }                   
    }
    },
    age: {
      digits: true,
      range: [18, 75]  
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
    }
    }
    });    

    $.validator.addMethod("regex", function(value, element, regexpr) {          
        return regexpr.test(value);
    }, "Please enter a valid format.");
})();
