function tabs(){
    var container = document.getElementById('tabs');
    if(container==null){return}
    var tabs = [].slice.call(container.querySelectorAll('li[data-tabctrl]'));
    var pages = [].slice.call(container.querySelectorAll('div[data-tab]'));
    var tabLinks = [].slice.call(document.querySelectorAll('*[data-tab-link]'));
    
    
    function hideAllPages(){
      pages.forEach(function(x,i){
        x.style.display = 'none';
        tabs[i].className = '';
      })
    }
    
    tabs.forEach(function(x,i){
      x.onclick = function(){
        var oldHeight = container.offsetHeight;
        hideAllPages();
        pages[i].style.display = 'block';
        container.style.height='auto';
        var newHeight = container.offsetHeight;
        container.style.height=oldHeight+'px';
        requestAnimationFrame(function() {
          container.style.height= newHeight+'px';
        });
        x.className = 'active';
      }
    })
    
    tabLinks.forEach(function(x){
      var index = parseInt(x.dataset.tabLink); 
      x.onclick = function(){
        tabs[index].click();
        container.scrollIntoView();
      }
       })
    
    hideAllPages();
    pages[0].style.display = 'block';
    tabs[0].className = 'active';
    }
    
    tabs();