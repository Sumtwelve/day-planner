// TODO: IDEAS!!!
// A "save all" button
// an auto-save feature? When you type it just waits a second or two then saves it
// A delete-all button that clears local storage


// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  
  // PUT CURRENT DAY IN THE H1
  var currentDayEl = $("#currentDay");
  var now = dayjs().format("MMMM DD, YYYY");
  currentDayEl.text("Today's Date: " + now);


  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  
  // get current hour
  currentHour = dayjs().hour();
  // LOOP THROUGH ALL EVENT ROWS, GET THEIR HOUR, AND STYLE THEM ACCORDING TO CURRENT HOUR
  var eventsContainer = $(".events-container");
  var rows = eventsContainer.children(); // type array

  for (var i = 0; i < rows.length; i++) {
    // loop through the div elements in events[], get all text in id after the hyphen,
    // then parse that into a number. That gives us the hour of that row.
    var thisRow = rows.eq(i);
    var thisHour = parseInt(thisRow.attr("id").split("-")[1]);
    
    // compare the hour to the current hour
    if (thisHour < currentHour) {
      thisRow.addClass("past");
    } else if (thisHour === currentHour) {
      thisRow.addClass("present");
    } else {
      thisRow.addClass("future");
    }
  }
  
  
  
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  for (var i = 0; i < rows.length; i++) {
    var rowHour = i + 7; // I need i to be 0, but current row's hour will always be i + 7
    var itemTitle = ("hour-" + rowHour);
    var rowData = (localStorage.getItem(itemTitle));
    console.log(itemTitle + ": " + rowData + " (" + typeof rowData + ")");
    if (rowData != null) {
      rows.eq(i).children().eq(1).val(rowData);
    }
  }






  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  $(".saveBtn").on("click", function() {
    // get the hour
    var parentDiv = $(this).parent();
    var hour = parseInt(parentDiv.attr("id").split("-")[1]);
    console.log("User clicked on save button for hour " + hour);

    // now save the textarea content to local storage
    var textAreaContent = parentDiv.children().eq(1).val();
    var hourItem = ("hour-" + hour);
    localStorage.setItem(hourItem, textAreaContent);
  });

  $("textarea").keypress(function(event) {
    if ((event.keyCode == 10 || event.keyCode == 13) && event.ctrlKey) {
      // get the hour
      var parentDiv = $(this).parent();
      var hour = parseInt(parentDiv.attr("id").split("-")[1]);
      console.log("User did CTRL+ENTER for hour " + hour);

      // now save the textarea content to local storage
      var textAreaContent = parentDiv.children().eq(1).val();
      var hourItem = ("hour-" + hour);
      localStorage.setItem(hourItem, textAreaContent);
    }
  })




  


  //
  // TODO: Add code to display the current date in the header of the page.
  // 

});
