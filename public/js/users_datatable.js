(function(){
    'use strict';
    var dataTable = undefined;

    var transformDataFromAPItoDataTableData = ((data, fields_array = [], headings_array = []) => {
        var result = {};
        var fields = [];
        if (fields_array!==undefined && fields_array.length > 0) {
            fields = fields_array;
        } else {
            fields = Object.keys(data[0]);
        }
        if (headings_array!==undefined && headings_array.length > 0) {
            result = {
                headings: headings_array,
                data: []
            };            
        } else {
            result = {
                headings: fields,
                data: []
            };            
        }
        for ( var i = 0; i < data.length; i++ ) {
            result.data[i] = [];
            for (var h in fields) {
                var propertyName = fields[h];
                if( data[i].hasOwnProperty(propertyName) ) {
                    result.data[i].push(data[i][propertyName]);
                }                
            }
        }
        return result;
    });

    var showUsersOnTable= function(users){
        if(dataTable){
          dataTable.destroy();
        }
        dataTable = new DataTable("#dataTable",{ 
            perPage: 5,    
            labels: {
                placeholder: "Pesquisar...",
                perPage: "{select} registos por página",
                noRows: "Não foram encontrados registos",
                info: "Mostrar registos de {start} a {end} de um total de {rows} registos",
            },
            // data: dataFromAPItoDataTableData(users)
            // data: dataFromAPItoDataTableData(users, ["name", "email", "age", "department", "id"])
            data: transformDataFromAPItoDataTableData(users, ["name", "email", "age", "department", "id"], ["Name", "E-Mail", "Age", "Department", "Actions"]),
            columns: [
            {
              select: 4,
              sortable: false,
              render: function(data, cell, row) {
                    return '<a class="btn btn-xs btn-primary" href="users/' + data + '/edit">Edit</a>'+
                           '<a class="btn btn-xs btn-danger delete-button" data-id="' + data + '">Delete</a></td>';
                }
            },
            ]
        });
        dataTable.on('datatable.page', function(page) {
            listenToClickDeleteEvents();
        });
    };        

    var loadDataFromServer= function(){
        axios.get('/api/users')
        .then(function (response) {     
            showUsersOnTable(response.data.data);
            listenToClickDeleteEvents();
        })
        .catch(function (error) {
            console.log(error);
        });
    };

    var clickToDelete = function (e){
        var idToDelete= e.target.getAttribute('data-id');
        axios.delete('/api/users/' + idToDelete)
        .then(function (response) {
            loadDataFromServer();
        })
        .catch(function (error) {
            console.log(error);
        });
    };    

    var listenToClickDeleteEvents= function(){
        var deleteBtns = document.getElementsByClassName('delete-button');
        for (var idx=0; idx < deleteBtns.length; idx++) {
            deleteBtns[idx].addEventListener('click', clickToDelete);        
        }
    };

    loadDataFromServer();

    // deleteButton - EVENTO

})();
