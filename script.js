var boardheight = 10;
var boardwidth = 10;
var x = Math.floor(Math.random() * (boardheight - 1))+1;
var y = Math.floor(Math.random() * (boardwidth - 1))+1;
var fx = Math.floor(Math.random() * (boardheight - 1))+1;
var fy = Math.floor(Math.random() * (boardwidth - 1))+1;
var score = 0;
var time = 500;
var total_time = 0;

function gamegenerater()
{
	var gameBoard = document.createElement('table');
  

  for(i=1; i < boardheight; i++)
  {
    var tableRow = document.createElement('tr');

    for(j=1; j < boardwidth; j++)
    {
      var tableCell = document.createElement('td');
      tableCell.setAttribute("id","cell"+j+'-'+i);
      tableCell.setAttribute("class","board_cell");
      tableRow.appendChild(tableCell);

    }
    
    if(i == 9)
    {
      tableRow.setAttribute('style','border-bottom:1px blue');
    }

    gameBoard.appendChild(tableRow);
  }

  document.getElementById('gameborders').appendChild(gameBoard);

  document.getElementById('cell'+x+'-'+y).classList.add('Player');
  food();
  var timer = setInterval(Counter, 10);
}

document.onkeydown = arrowkeys;
function arrowkeys(e) {
    e = e || window.event;

    if (e.keyCode == '38') {direction = "up";}
    else if (e.keyCode == '40') {direction = "down";}
    else if (e.keyCode == '37') {direction = "left";}
    else if (e.keyCode == '39') {direction = "right";}
    move();
}

function move() {
    if(direction == "up")
    {
        document.getElementById('cell'+x+'-'+y).classList.remove('Player');
        y = y - 1;
        borders();
        eat();
        document.getElementById('cell'+x+'-'+y).classList.add('Player');
    } else
    if(direction == "down")
    {
        document.getElementById('cell'+x+'-'+y).classList.remove('Player');
        y = y + 1;
        borders();
        eat();
        document.getElementById('cell'+x+'-'+y).classList.add('Player');
    } else
    if(direction == "left")
    {
        document.getElementById('cell'+x+'-'+y).classList.remove('Player');
        x = x - 1;
        borders();
        eat();
        document.getElementById('cell'+x+'-'+y).classList.add('Player');
    } else
    if(direction == "right")
    {
        document.getElementById('cell'+x+'-'+y).classList.remove('Player');
        x = x + 1;
        borders();
        eat();
        document.getElementById('cell'+x+'-'+y).classList.add('Player');
    }
}

function borders() {
    if(x==boardheight||y==boardwidth||x==0||y==0)
    {
        if(direction == "up"){y = 1};
        if(direction == "down"){y = boardheight - 1};
        if(direction == "left"){x = 1};
        if(direction == "right"){x = boardwidth - 1};
    }
}

function food() {
    document.getElementById('cell'+fx+'-'+fy).classList.add('food');
    if(x==fx&&y==fy){
        fx = Math.floor(Math.random() * (boardheight - 1))+1;
        fy = Math.floor(Math.random() * (boardwidth - 1))+1;
        document.getElementById('cell'+fx+'-'+fy).classList.add('food');
    }
}

function eat() {
    if(x==fx&&y==fy)
    {
        document.getElementById('cell'+fx+'-'+fy).classList.remove('food');
        fx = Math.floor(Math.random() * (boardheight - 1))+1;
        fy = Math.floor(Math.random() * (boardwidth - 1))+1;
        document.getElementById('cell'+fx+'-'+fy).classList.add('food');
        score = score + 1;
        document.getElementById("score").innerHTML = `Score: ${score} points`;
        time = time + 100;
        document.getElementById("time").innerHTML = `Time: ${time} miliseconds`;
    }
}

function Counter() {
    document.getElementById("time").innerHTML = `Time: ${--time} miliseconds`;
    ++total_time;
    if(time == 0){gameover()}
  }

function gameover() {
    alert(`Time's up! Your score was ${score} and your points per second was ${score/(total_time/100)}.`);
    location.reload();
}