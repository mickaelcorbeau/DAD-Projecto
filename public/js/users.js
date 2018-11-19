(function(){
    'use strict';

    function generateUsersRows(users) {
        var getCRSF_Token = function() {
            var element = document.querySelector('meta[name="csrf-token"]');
            return element.getAttribute("content");
        };
        var addRow = function(parentNode, CRSFToken, id, name, email, age, department) {
            var newtr = document.createElement('tr');
            // Primeira célula (Nome)
            var newtd = document.createElement('td');
            var newlink = document.createElement('a');
            newlink.href= 'users/' + id;
            newlink.textContent =  name;
            newtd.appendChild(newlink);
            newtr.appendChild(newtd);
            // Segunda célula (Email)
            newtd = document.createElement('td');
            newtd.textContent =  email;
            newtr.appendChild(newtd);
            // Terceira célula (Age)
            newtd = document.createElement('td');
            newtd.textContent =  age;
            newtr.appendChild(newtd);
            // Quarta célula (department)
            newtd = document.createElement('td');
            newtd.textContent =  department;
            newtr.appendChild(newtd);
            // Quinta Célula (1 link - edit  - e um formulário para delete)
            // Link:
            newtd = document.createElement('td');       
            var newNode = document.createElement('a');
            newNode.textContent = 'Edit';
            newNode.classList.add('btn', 'btn-xs', 'btn-primary');
            newNode.href = window.location.hostname + '/users/' + id + '/edit';
            newNode.href = 'users/' + id + '/edit';
            newtd.appendChild(newNode);

            /*---------------------------------------
            ORIGINAL: Formulário para botão delete
            ---------------------------------------

            // Form
            var formNode = document.createElement('form');
            formNode.action = 'http://' + window.location.hostname + '/users/' + id;
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
            */

            //Botão delete feito com link
            newNode = document.createElement('a');
            newNode.textContent = 'Delete';
            newNode.classList.add('btn', 'btn-xs', 'btn-danger');
            newNode.setAttribute('data-id', id);
            newNode.onclick = clickToDelete;
            newtd.appendChild(newNode);

            newtr.appendChild(newtd);
            parentNode.appendChild(newtr);      
        };

        var tbodyElement = document.getElementsByTagName('tbody')[0];
        tbodyElement.innerHTML = '';
        var CRSFToken = getCRSF_Token();
        users.forEach(function(user) {
            addRow(tbodyElement, CRSFToken, user.id, user.name, user.email, user.age, user.department);
            });
    }

    var showPage= function(activePage){
        axios.get('/api/users?page=' + activePage)
        .then(function (response) {
            generateUsersRows(response.data.data);
            var container = document.getElementById('containerNav');
            container.innerHTML='';
            //console.log(response.data);
            addNavigation(container, response.data.meta); 
        })
        .catch(function (error) {
            console.log(error);
        });
    };

    var showAll= function(){
        axios.get('/api/users')
        .then(function (response) {
            generateUsersRows(response.data.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    };

    var clickToDelete = function (e){
        var idToDelete= e.target.getAttribute('data-id');
        axios.delete('/api/users/' + idToDelete)
        .then(function (response) {
            // Testar Paginação:
            showPage(1);
            // Testar Todos:
            //showAll();
        })
        .catch(function (error) {
            console.log(error);
        });
    };


    var addNavigation = function(parentNode, navigationData) {
        if(navigationData.last_page){
            var previous = document.createElement('li');
            previous.classList.add('page-item');
            var link = document.createElement('a');
            link.addEventListener('click',clickNavigation);
            previous.appendChild(link);
            link.classList.add('page-link');
            link.textContent = 'Previous';
            link.setAttribute('data-page-number', navigationData.current_page - 1);
            parentNode.appendChild(previous);
            for(var i = 1; i<=navigationData.last_page; i++){
                var element = document.createElement('li');
                element.classList.add('page-item');
                if (navigationData.current_page === i) {
                    element.classList.add('active');
                }
                var link = document.createElement('a');
                link.addEventListener('click', clickNavigation);
                element.appendChild(link);
                link.classList.add('page-link');
                link.textContent = i;
                link.setAttribute('data-page-number', i);
                parentNode.appendChild(element);
            }
            var next = document.createElement('li');
            next.classList.add('page-item');
            var link = document.createElement('a');
            link.addEventListener('click', clickNavigation);
            next.appendChild(link);
            link.classList.add('page-link');
            link.textContent = 'Next';
            if (navigationData.current_page < navigationData.last_page) {
                link.setAttribute('data-page-number', navigationData.current_page + 1);
            } else {
                link.setAttribute('data-page-number', navigationData.current_page);
            }
            parentNode.appendChild(next);
        }
    };

    var clickNavigation = function (e){
        showPage(e.target.getAttribute("data-page-number"));
    };


    // Testar Paginação:
    showPage(1);
    // Testar Todos:
    //showAll();

})();
