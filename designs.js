// Select color input
// Select size input

// When size is submitted by the user, call makeGrid()
let newHeight;
let newWidth;

function makeGrid(event) {
  //avoid the default value to be loaded
  event.preventDefault();
  //everytime, "submit" event is called, table is cleared to be created again
  $("#pixelCanvas").empty();
  newHeight = $('#inputHeight').val();
  newWidth = $('#inputWidth').val();
  //create the grid dynamically based on user input
  for(var row=0; row<newHeight; row++){
    var newRow = $( "<tr> </tr>" ).appendTo("#pixelCanvas");
    for(var col=0; col<newWidth; col++){
      var newCol = $( "<td> </td>" ).appendTo(newRow);
    }
  }
}

function colorGrid(event) {
  const colorPicked = $("#colorPicker").val();
  newHeight = $('#inputHeight').val();
  newWidth = $('#inputWidth').val();
  //colorCell is a 2D array where every cell is assigned with an unique value
  var colorCell = [];
  var count = 0;
  for(var row=0; row<newHeight; row++){
    colorCell[row] = [];
  }
  for(var row=0; row<newHeight; row++){
    for(var col=0; col<newWidth; col++){
      colorCell[row][col] = count;
      count++;
    }
  }

  var cellX = event.pageX;
  var cellY = event.pageY;
  var gridX = $(this).offset().left;
  var gridY = $(this).offset().top;
  var gridFinalX = gridX + newWidth*21 + 1;
  var gridFinalY = gridY + newHeight*21 + 1;

  if((cellX > gridX && cellY > gridY) && (cellX < gridFinalX && cellY < gridFinalY)){
    var initialX = gridX+1;
    var initialY = gridY+1;
    var rowCount = 0;
    var columnCount = 0;
    while(cellX >= initialX && cellX < gridFinalX){
      initialX += 21;
        columnCount++;
    }
    while(cellY > initialY && cellY < gridFinalY){
      initialY += 21;
        rowCount++;
    }

    if(rowCount == 0)
      rowCount = 1;
    if(columnCount == 0)
      columnCount = 1;
    //find the index based on the cell row and column
    var index = colorCell[rowCount-1][columnCount-1];
    var isColored = $("td").slice(index,index+1).css("background-color");
    //if the cell is not colored, color it otherwise remove the color
    if (isColored == "rgba(0, 0, 0, 0)")
    $("td").slice(index,index+1).css("background-color", colorPicked);
    else {
      $("td").slice(index,index+1).css("background-color", "rgba(0, 0, 0, 0)");
    }
  }
}

//call the event "submit" and "click" only when DOM is ready
$(document).ready(function () {
  $("#sizePicker").on("submit",makeGrid);
  $("#pixelCanvas").on("click",colorGrid);
});
