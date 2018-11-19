(function(){
    'use strict';
    var addNavigation = function(parentNode, navigationData) {
        var addNavButton = function(parentUl, pageNumber, textOnly) {
            var newLi = document.createElement('li');
            if (textOnly) {
                newLi.classList.add('active');
                var newSpan = document.createElement('span');
                newSpan.innerHTML = pageNumber;
                newLi.appendChild(newSpan);
            } else {
                var newLink = document.createElement('a');
                newLink.setAttribute('data-page-number', pageNumber);
                newLink.onclick = clickNavigation; 
                newLink.text = pageNumber;
                newLi.appendChild(newLink);
                
            }
            parentUl.appendChild(newLi);
        };
    
        var newUl = document.createElement('ul');
        newUl.classList.add('pagination');
        var newLi = document.createElement('li');

        var newLink = document.createElement('a');
        newLink.setAttribute('data-page-number', 1);
        newLink.onclick = clickNavigation; 

        newLink.innerHTML = '&laquo;';
        newLink.setAttribute('rel', 'prev');

        newLi.appendChild(newLink);
        newUl.appendChild(newLi);

        // marginPages = pages on the left and right of navigator
        var marginPages = 3;  
        var startPage = navigationData.current_page - marginPages;
        
        if (startPage < 1) {
            startPage = 1;
        }

        var endPage = navigationData.current_page - marginPages;
        if (endPage > navigationData.last_page) {
            endPage = navigationData.last_page;
        }

        if ((startPage + 2 * marginPages) >= endPage) {
            endPage = startPage + 2* marginPages; 
            if (endPage > navigationData.last_page) {
                endPage = navigationData.last_page;
            }
        } 
        if ((endPage -  2 * marginPages) <= startPage) {
            startPage = endPage - 2 * marginPages;
            if (startPage < 1) {
                startPage = 1;
            }
        }     

        for (var i = startPage; i <= endPage; i++) {
            addNavButton(newUl, i, navigationData.current_page == i);
        }

        newLi = document.createElement('li');

        newLink = document.createElement('a');
        newLink.setAttribute('data-page-number', navigationData.last_page);
        newLink.onclick = clickNavigation; 
        newLink.innerHTML = '&raquo;';
        newLink.setAttribute('rel', 'next');

        newLi.appendChild(newLink);
        newUl.appendChild(newLi);
        parentNode.appendChild(newUl);
    };
})();