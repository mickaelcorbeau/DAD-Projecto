(function(){
    'use strict';

    function generateDepartmentsRows(departments) {
        var getCRSF_Token = function() {
            var element = document.querySelector('meta[name="csrf-token"]');
            return element.getAttribute("content");
        };
        var addRow = function(parentNode, CRSFToken, id, name, date) {
            var newtr = document.createElement('tr');
            // Primeira célula (Nome)
            var newtd = document.createElement('td');
            newtd.textContent =  name;
            newtr.appendChild(newtd);
            // Segunda célula (Data)
            newtd = document.createElement('td');
            newtd.textContent =  date;
            newtr.appendChild(newtd);
            // Terceira Célula (1 link - edit  - e um formulário para delete)
            // Link:
            newtd = document.createElement('td');       
            var newNode = document.createElement('a');
            newNode.textContent = 'Edit';
            newNode.classList.add('btn', 'btn-xs', 'btn-primary');
            newNode.href = window.location.hostname + '/departments/' + id + '/edit';
            newtd.appendChild(newNode);
            // Form
            var formNode = document.createElement('form');
            formNode.action = 'http://' + window.location.hostname + '/departments/' + id;
            formNode.method = 'post';
            formNode.classList.add('inline');
            newNode = document.createElement('input');
            newNode.type = 'hidden';
            newNode.name = '_method';
            newNode.value = 'DELETE';
            formNode.appendChild(newNode);
            newNode = document.createElement('input');
            newNode.type = 'hidden';
            newNode.name = '_token';
            newNode.value = CRSFToken;
            formNode.appendChild(newNode);
            var divNode = document.createElement('div');
            divNode.classList.add('form-group');
            newNode = document.createElement('button');
            newNode.type = 'submit';
            newNode.textContent = 'Delete';
            newNode.classList.add('btn', 'btn-xs', 'btn-danger');
            divNode.appendChild(newNode);
            formNode.appendChild(divNode);
            newtd.appendChild(formNode);
            newtr.appendChild(newtd);
            parentNode.appendChild(newtr);      
        };
        var tbodyElement = document.getElementsByTagName('tbody')[0];
        var CRSFToken = getCRSF_Token();
        departments.forEach(function(department) {
            addRow(tbodyElement, CRSFToken, department.id, department.name, department.date);
            });                     
    }

    axios.get('/api/departments')
    .then(function (response) {
        generateDepartmentsRows(response.data.data); 
    })
    .catch(function (error) {
        console.log(error);
    });

    // var departmentsToTest = [
    //     {id:430, name:'Department Teste 430', date: '2017-08-04 10:06:46'},
    //     {id:12333, name:'Department Teste 12333', date: '2017-08-04 11:16:26'},
    //     {id:333, name:'Department Teste 333', date: '2017-08-04 13:06:21'},
    //     {id:6633, name:'Department Teste 6633', date: '2017-08-04 08:23:45'},
    //     {id:178, name:'Department Teste 178', date: '2017-08-04 21:45:52'}
    //     ];

    // generateDepartmentsRows(departmentsToTest); 
})();
