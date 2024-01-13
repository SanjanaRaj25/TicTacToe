// selectors- get inputs from all boxes


// game variables
// whose turn is it
var turn="star";
// how many moves have been made (once it hits 9, game ends, eval draw)
var moves=0;
// has someone gotten three in a row?
var winner=null;
// object to keep track of score: [row1, row2, row3, col1, col2, col3, diag] --> each starts at 0, add 1 for a star, subtract 1 for a heart. if any sums to 3, star wins. if it sums to -3, heart wins.
var scoreBoard = {
    'row-1':0, 'row-2':0, 'row-3':0, 'col-1':0, 'col-2':0, 'col-3':0, 'diag':0,
};

// functions

    function playCell(cellID){
        const cell = document.getElementById(String(cellID));
        // if the cell is not null, hasn't already been played, and game is still in progress
        if (cell && winner===null && cell.parentElement.childElementCount < 2) {
          // update the player, status, and board
            switch(turn){
                case "star":
                    // add the icon to the cell div
                    const starIcon = document.createElement("star");
                    starIcon.innerHTML = `<i class="fas fa-star"></i>`;
                    cell.parentElement.appendChild(starIcon);

                    // resize the form so the icon is centered
                    cell.classList.add("used");

                    // update scoreboard
                    scoreBoard[String(cell.parentElement.parentElement.className)]+=1;
                    const starList = cell.parentElement.classList;
                    starList.forEach((currentClass) => {
                        scoreBoard[String(currentClass)]+=1;
                      });
                    
                    // update the status at the bottom 
                    document.querySelector('.status').innerHTML=`it is player  <i class="fas fa-heart" id="turn"></i>'s turn!`;
                    turn="heart";
                    moves += 1;
                    break;

                case "heart":
                    // add the icon to the cell div
                    const heartIcon = document.createElement("heart");
                    heartIcon.innerHTML = `<i class="fas fa-heart"></i>`;
                    cell.parentElement.appendChild(heartIcon);

                    // resize the form so the icon is centered
                    cell.classList.add("used");

                    // update scoreboard
                    scoreBoard[String(cell.parentElement.parentElement.className)]-=1;
                    const heartList = cell.parentElement.classList;
                    heartList.forEach((currentClass) => {
                        scoreBoard[String(currentClass)]-=1;
                      });

                    // update the status at the bottom 
                    document.querySelector('.status').innerHTML=`it is player  <i class="fas fa-star" id="turn"></i>'s turn!`;
                    turn="star";
                    moves += 1;
                    break;
                }
        } else {
          console.log("you can't play this cell");
        }
    }

        function gameStatus(){
            // check if someone has won
            for(var key in scoreBoard) {
                var value = scoreBoard[key];
                if(value==3){
                    winner="star";
                    break;
                }
                else if(value==-3){
                    winner="heart";
                    break;
                }
              }
            // end the game if someone has won
            if(winner==="star"){
                document.querySelector('.status').innerHTML=`player <i class="fas fa-star" id="turn"></i> has gotten 3 in a row! hit the button to start over!`
            }
            else if(winner==="heart"){
                document.querySelector('.status').innerHTML=`player <i class="fas fa-heart" id="turn"></i> has gotten 3 in a row! hit the button to start over!`
            }
            // check if game has ended in a draw
            else if(moves==9 && winner===null){
                document.querySelector('.status').innerHTML=`game ends in a draw! hit the button to start over!`;
            }
        }

        function resetGame(){
            location.reload(); 
        }



