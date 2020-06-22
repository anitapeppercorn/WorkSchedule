
// Declaration of initial variables
var currentHour = moment().format("H");
var currentDateHourMinute = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
var toDoItems = [];

// instead of typing $, you can type jQuery, 
//with exactly the same results $ is just a synonym for jQuery, 
// instead of $.get() you could say jQuery.get().
//$ is the name of a function, and the parentheses represent a 
//call to that function. It’s a multi-purpose function 
// can create new DOM elements
// or select elements when used with a CSS selector:
var currentTime = $("#currentTime");
var scheduleArea = $(".schedule");
var timeRow = $(".time-row");


// An array of objects
function startSchedule(){

    timeRow.each(function(){
    var thisRow = $(this);
    var thisRowHr = parseInt(thisRow.attr("data-hour"));

    var todoObj = {
      hour: thisRowHr,
      text: "",
    }
    toDoItems.push(todoObj);
  });
  // Loop all rows, save to local storage
  localStorage.setItem("todos", JSON.stringify(toDoItems)); 
};

function saveIt(){
  var hourToUpdate = $(this).parent().attr("data-hour");
  var itemToAdd = (($(this).parent()).children("textarea")).val(); 
  for (var j = 0; j < toDoItems.length; j++){
    if (toDoItems[j].hour == hourToUpdate){
     
      toDoItems[j].text = itemToAdd;
    }
  }
  localStorage.setItem("todos", JSON.stringify(toDoItems));
  renderSchedule();
}

//format the rows colors depending on time
function setUpRows(){
  timeRow.each(function(){
  var thisRow = $(this);
  var thisRowHr = parseInt(thisRow.attr("data-hour"));

  // style rows to show where we are in the day
  if (thisRowHr == currentHour) {
    thisRow.addClass("present").removeClass("past future");
  }
  if (thisRowHr < currentHour) {
    thisRow.addClass("past").removeClass("present future");
  }
  if (thisRowHr > currentHour) {
    thisRow.addClass("future").removeClass("past present");
  }
});
}

function renderSchedule(){
  
  toDoItems = localStorage.getItem("todos");
  toDoItems = JSON.parse(toDoItems);
    
  for (var i = 0; i < toDoItems.length; i++){
    var itemHour = toDoItems[i].hour;
    var itemText = toDoItems[i].text; 
   
    $("[data-hour=" + itemHour + "]").children("textarea").val(itemText);
  }
}
$(document).ready(function(){
  setUpRows();

if(!localStorage.getItem("todos")){
  //initialize the array of objects
  startSchedule();
} //otherwise we will get it from local storage


//display current time
currentTime.text(currentDateHourMinute);

//render schedule from local storage
renderSchedule();
//when a todo item save button is clicked, save it
scheduleArea.on("click", "button", saveIt);

});

