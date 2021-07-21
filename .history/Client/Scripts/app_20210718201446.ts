// IIFE -- Immediately Invoked Function Expression
(function () {
    
    function confirmDelete()
    {
      // confirm deletion
      $("a.delete").on("click", function(event){
        if(!confirm("Are you sure?"))
        {
          event.preventDefault();
          location.href = '/clothing-list';
        }       
      });
    }

    function Start()
    {
        console.log("App Started......")
        confirmDelete();
    }

    window.addEventListener("load",Start);
    
})();
