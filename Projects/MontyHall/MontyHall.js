/***************************************************************************************************
* Project01.js
* Brett Ratner
* This project simulates the monte hall problem where is consists of three doors, one of which 
* has a car and the other two doors have goats. Once the user picks a door then one of the goat
* doors is reviled, then the player will either keep or switch their door. This program will simulate
* the outsomes for winning if you were to switch your door compare to if you were to keep your door.
***************************************************************************************************/

// Will run however many times the user decides when they call the funciton
var simulate = function(numbOfTrials) {
     //craeates the 3 doors
      var doors = 3;
      //creates the varable to sotre the door with the car, the door the player chooses, the door the player knows that has th goat and the door the player swithes to.
      var carDoor, ogSelect, goatDoor, switchDoor;
      //keeps count of how mnay times the user would have won if they stayed with the original door.
      var nstay = 0;
      //keeps count of how many times the user would have wone if they switched their door.
      var nswitch = 0;
 
      // this will randomly pick a door to place the car, goat, and the door the player will switch to at the end.
      function play(notDoorA, notDoorB) {
            //var door;
            var door = ['goat', 'goat', 'car'];
          

            /*This will pick a number betweeen 1-3 and when it runs carDoor = play() it will assign a random number
            then when it runs ogSelect it will assign a random number to that as long as it isn't the number it 
            assigned to the door with the wall. Then when it runes goatDoor = play(carDoor, ogSelect) it will make 
            sure that the door that is revilved with the goat has not been once of the two numbers that have been chosen
            to be the car or the players door. Then it will switch door with the door with the other door that still reamins
            that the player didnt start out with. */

           do {
                  door = Math.floor(Math.random() * doors);
            } while (door === notDoorA || door === notDoorB);
            return door;
      }
 
      // run the game as many times as the user entered when they called the function.
      for (var i = 0; i < numbOfTrials; i ++) {
 
            //picks what number gets assignend to which door.
            carDoor = play();
            ogSelect = play();
            goatDoor = play(carDoor, ogSelect);
            switchDoor = play(ogSelect, goatDoor);
 
            // console.log("carDoor: " + carDoor);
            // console.log("ogSelect: " + ogSelect);
            // console.log("goatDoor: " + goatDoor);
            // console.log("switchDoor: " + switchDoor);


            // checks to see if the door the player selcted was the car door and if yes then increment the stay door variable. 
            if (ogSelect === carDoor) {
                  nstay ++;
            } 
            // otherwise it will check to see if the player would have won if they have switched doors then increments the switch door variable
            else if (switchDoor === carDoor) {
                  nswitch ++;
            }
      }
     

      //prints out a message to the user and tells them the percentage of how many times they would have won if they kept the door and how many times they would have won if they switched.
      confirm("Percent wins from Stay: " + (nstay * 100 / numbOfTrials) +  "%" + " \nPercent wins from switch: " + (nswitch * 100 / numbOfTrials) + "%");
      console.log("Percent wins from Stay: " + (nstay * 100 / numbOfTrials) +  "%" + " \nPercent wins from switch: " + (nswitch * 100 / numbOfTrials) + "%");
     
 }