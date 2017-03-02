/*********************************************************************
 * Project 2
 * Brett Ratner
 *
 * The purpose of this assignment is to create a memory match game
 * The user will select a square and try to find a square matching in color.
 * If the two squares colors match then they stay that color, if they are a 
 * missmatch then they stay on the screen for 1 second and then go back to white.
 * The grid is made by creating a table and adding data cells that all have a uniqu id
 * then giving each data cell a color that is one of 5 pre set colors. 
 ************************************************************************/

// ;(function() {
	//runs the code once the DOM has loaded.(was a fix from getting an error: document.body was null)
	document.addEventListener('DOMContentLoaded', function (){
		//this function will build the table with the parameters of the number of rows, number of collums,
		//and the size of each cell(square).
		function buildTable(numbrows, numbcols, size){
	
  // Create table and tbody elements
  var table   = document.createElement('table');
  table.style.borderCollapse = "collapse";
  var tbody = document.createElement('tbody');

  // Create rows
  for (var r=0; r<numbrows; r++) {
    var tr = document.createElement('tr');

    // Create cells in each row
    for (var c=0; c<numbcols; c++) {
      var td = document.createElement('td');
      td.id = (r*numbcols)+c;
      td.style.width  = size;
      td.style.height = size;
      td.style.border = '1px solid #ccc';

      // Add element click event handler
      td.addEventListener('click', tdClick, false);

      // Add td to tr
      tr.appendChild(td);
    }
    // Add tr to tbody
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);
  // Add table to the document.body
  document.body.appendChild(table);
}
//calls the function to make the table.
buildTable(10, 10, '50px');

});

var shuffleMyColors = function(){
//thiis function will shuffle the array and will randomly pick on of the 5 preset colors and will assing it to a single square
function shuffle(array) {
    var counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        var index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        var temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}
//This will check to make sure that there are exactly 20 of each of the 5 colors.
// doing this check will alwyas make the game completeable and allow the user to match all the sqaure.
var colorarray = [];
for(var i = 0; i < 100; i++){

	if(i < 20){
		colorarray.push('blue');
	}
	else if(i >= 20 && i < 40){
		colorarray.push('red');
	}
	else if(i >= 40 && i < 60){
		colorarray.push('green');
	}
	else if(i >= 60 && i < 80){
		colorarray.push('orange');
	}
	else if(i >= 80 && i < 100){
		colorarray.push('yellow');
	}
}
return shuffle(colorarray);

}

var h1 = document.getElementsByTagName('h2')[0],
    start = document.getElementById('start'),
    stop = document.getElementById('stop'),
    clear = document.getElementById('clear'),
    seconds = 0, minutes = 0, hours = 0,
    t;

function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    
    h1.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

    timer();
}
function timer() {
    t = setTimeout(add, 1000);
}
timer();


var colorarray = shuffleMyColors();
//holds the value for the first square that is clicked
var firstClick;
//holds the value for the second swaure that is clicked
var secondClick;
var count = 0;
var counting = 0; 
var timing;
var prevFirst;
var prevSecond

//this function will set the sqaures back to the color white.
//it is called when the sqaures are not a match.
var setwhite = function(element){
	element.style.backgroundColor = 'white';

 }
// this function is called by the event listener and sets what happens when squares are clikced
var tdClick = function() {
	//if the user doesnt want to wait the 1 second they can just keep clicking and the clear timeout will 
	//skip the timmer and instantly turn the missmatched square white.
	clearTimeout(timing);
	//this is the check to turn the two previous square that were a missmatch white
	if(timing != null && colorarray[prevFirst.id] != colorarray[prevSecond.id]){
	setwhite(prevFirst);
	setwhite(prevSecond);
}	
	// sets "this" to the variable clicked
	var clicked = this;
	//checks to make sure that no squares have been clicked and will change the 
	//color of the first clicked square
	if(count === 0){
		this.style.backgroundColor = colorarray[this.id];
		firstClick = this;
		count++;
		//console.log("firstClick " + colorarray[firstClick.id]);
	}
	else{
		secondClick = this;
		this.style.backgroundColor = colorarray[this.id];
		//console.log("SecondClick " + colorarray[secondClick.id]);
		//this makes it so that nothing happens if you click the same square twice in a row.
		if(firstClick.id === secondClick.id){

		}
		//checks to make sure the two squares picked have the same color
		// if they do have the same color then disable the event listener so that the user cannor click that square again.
		//resets the count variable to 0 so that the user can pick two new squares to compare. 
		else if(colorarray[firstClick.id] === colorarray[secondClick.id]){
			prevFirst = firstClick;
			prevSecond = secondClick;
			firstClick.removeEventListener('click', tdClick, false);
			secondClick.removeEventListener('click', tdClick, false);
			count = 0;
			counting = counting +1;
			console.log("Click " + counting);

			if(counting == 50 ){
				clearTimeout(t);
				alert("Congratulations!! You Won \nYour time was: "+h1.textContent+"\n  Press Enter to restart");
				window.location.reload();

			}

		}
		//if the two square are not a match then we set the color of those squares to white after a second
		// set the count variable to 0 so the user can pick two new squares to compare.
		else if(colorarray[firstClick.id] != colorarray[secondClick.id]){
			prevFirst = firstClick;
			prevSecond = secondClick;

	 timing = setTimeout(function(){
				setwhite(firstClick); 
				setwhite(secondClick);
			}, 1000);
			count = 0;

		}
		
		//console.log("Click " + count);


	}

	
};
// })();