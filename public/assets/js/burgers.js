console.log("Hello world");

$(function() {
    $(".change-devour").on("click", function(event) {
      const id = $(this).data("id");
      const newDevour = $(this).data("devoured");
  
      const newDevourState = {
        devoured: 1
      };
  
      // This sends the PUT request.
      $.ajax("/api/burgers/" + id, {
        type: "PUT",
        data: newDevourState
      }).then(
        function() {
          console.log("changed devour to", newDevour);
          // Then this .reload method refreshes the page to get the updated list
          location.reload();
        }
      );
    });
  
    $(".create-form").on("submit", function(event) {
      // This is the standard method to make sure to prevent refreshing on a submit event for forms.
      event.preventDefault();
      // The newBurger created by being trimmed of excess spaces and a value placed on it by its id
      const newBurger = {
        burger_name: $("#ca").val().trim(),
        // devoured: $("[name=devoured]:checked").val().trim(),
        devoured: 0
      };
  
      // This sends the POST request.
      $.ajax("/api/burgers", {
        type: "POST",
        data: newBurger
      }).then(
        function() {
          console.log("New burger, order up!");
          location.reload();
        }
      );
    });
  });