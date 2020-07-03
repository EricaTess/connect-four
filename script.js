
// ENUM/Constant Declarations
const colors = {
    RED: 'red',
    BLACK: 'black'
}

// Class Declarations

class Player {
  constructor(name, color) {
    console.log("Creating player " + name + " as " + color);
    this.name = name
    this.color = color;
  }
}
// Erica's first comment
class Token {
  constructor(color, turn_count) {
    console.log("Creating token with: " + color +" "+ turn_count);
    this.color = color;
    this.turn_count = turn_count;
  }
  toString(){
    return this.color;
  }
}

class Board {

  constructor(height, width) {
    this.height = height; //6
    this.width = width; //7
    console.log("Setting up a " + this.height + "x" + this.width + " board");
    this.grid = [];
    for (var i=0; i < this.width; i++){
        this.grid[i] = new Array(this.height);
        for (var j=0; j < this.height; j++){
          this.grid[i][j] = null;
        }
    }
  }
  token_at_location(x,y){
    console.log("Fetching token at location ("+x+","+y+")")
    return this.grid[x][y];
  }

  drop_token(column, color, turn_count){
    console.log("Dropping a " + color + " token at col " + column);
    if(null != this.grid[column][0]){
        console.log("Unable to drop the token in this column");
        return false; // We weren't able to drop the token
    }
    else{
        var placement_row = this.height - 1;
        console.log("Determining which row to drop");
        while(null != this.grid[column][placement_row]){
            placement_row--;
        }
        console.log("Placing at row: " + placement_row);
        var new_token = new Token(color, turn_count);
        this.grid[column][placement_row] = new_token;
        return true; // We were able to drop the token
    }
  }

  winning_color(){

    let colors = ['red', 'black'];

// This checks for a vertical win
    for(let i=0; i < this.width; i++){ //i = column; j = row

      for(let j=0; j < 3; j++){

        for(let x=0; x < colors.length; x++){


          if(
            this.grid[i][j] && this.grid[i][j].color === colors[x] &&// 0,0 // 0,1
            this.grid[i][j + 1] && this.grid[i][j + 1].color === colors[x] &&// 0,1 // 0,2
            this.grid[i][j + 2] && this.grid[i][j + 2].color === colors[x] &&// 0,2 // 0,3
            this.grid[i][j + 3] && this.grid[i][j + 3].color === colors[x]
          ){
            return colors[x];
          }
        }
      }
    }


//This checks for a horizontal win
    for(let i=0; i < 4; i++){  //i = column; j = row

      for(let j=0; j < this.height; j++){

        for(let x=0; x < colors.length; x++){

          console.log(this.grid[i][j]);
          console.log(this.grid[i + 1][j]);
          console.log(this.grid[i + 2][j]);
          console.log(this.grid[i + 3][j]);


          if(
            this.grid[i][j] && this.grid[i][j].color === colors[x] &&// 0,0 // 0,1
            this.grid[i + 1][j] && this.grid[i + 1][j].color === colors[x] &&// 0,1 // 0,2
            this.grid[i + 2][j] && this.grid[i + 2][j].color === colors[x] &&// 0,2 // 0,3
            this.grid[i + 3][j] && this.grid[i + 3][j].color === colors[x]
          ){
            return colors[x];
          }
        }
      }
    }


  //Checks for a diagonal win (downward slope)
    for(let i=0; i < 4; i++){  //i = column; j = row
      console.log('ITERATING EACH ROW - DIAGONAL DOWNWARD');
      for(let j=0; j < 3; j++){
        console.log('ITERATING EACH COLUMN - DIAGONAL DOWNWARD');
        for(let x=0; x < colors.length; x++){
          console.log('ITERATING EACH COLOR - DIAGONAL DOWNWARD');

          if(
            this.grid[i][j] && this.grid[i][j].color === colors[x] &&
            this.grid[i + 1][j + 1] && this.grid[i + 1][j + 1].color === colors[x] &&
            this.grid[i + 2][j + 2] && this.grid[i + 2][j + 2].color === colors[x] &&
            this.grid[i + 3][j + 3] && this.grid[i + 3][j + 3].color === colors[x]
          ){
            return colors[x];
          }
        }
      }
    }

  //Checks for a diagonal win (upward slope)
    for(let i=0; i < 4; i++){  //i = column; j = row
      console.log('ITERATING EACH ROW - DIAGONAL UPWARD');
      for(let j=0; j < 3; j++){
        console.log('ITERATING EACH COLUMN - DIAGONAL UPWARD');
        for(let x=0; x < colors.length; x++){
          console.log('ITERATING EACH COLOR - DIAGONAL UPWARD');

          if(
            this.grid[i][j + 3] && this.grid[i][j + 3].color === colors[x] &&
            this.grid[i + 1][j + 2] && this.grid[i + 1][j + 2].color === colors[x] &&
            this.grid[i + 2][j + 1] && this.grid[i + 2][j + 1].color === colors[x] &&
            this.grid[i + 3][j] && this.grid[i + 3][j].color === colors[x]
          ){
            return colors[x];
          }
        }
      }
    }

    return null;
  }

  toString(){
      var string = "";
      for (var j=0; j < this.height; j++){
          for (var i=0; i < this.width; i++){
              string += this.grid[i][j] + " ";
          }
          string += "\n";
      }
      return string;
  }
}

class Game{

    constructor(players, board) {
        this.winning_player = null;
        this.players = players;
        this.board = board;
        this.turn_count = 1;
    }

    current_turn_player() {
        return this.players[this.turn_count % this.players.length];
    }

    player_move(column){
        var token_color = this.current_turn_player().color;
        var could_drop = this.board.drop_token(column, token_color, this.turn_count);
        if (could_drop){
            this.turn_count += 1;
        }
        // winning_color --> winning_player
        var winning_color = this.board.winning_color();

        console.log('THIS IS THE PLAYER:');
        console.log(this.players);
        for(var i=0; i < players.length; i++){
          console.log(this.players[i].color);
          if(winning_color === this.players[i].color){
            this.winning_player = this.players[i];
            console.log('WINNING PLAYER:');
            console.log(this.winning_player);
          }
        }


        console.log('THIS IS THE WINNING COLOR' + winning_color);

    }
    toString(){
      return this.board;
    }
}

// UI Drawing Stuff

function draw_board(board) {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');

    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, 350, 300);

    for (var i = 0; i < 7; i++) {
        for (var j = 0; j < 6; j++) {

          token = game.board.token_at_location(i,j);

          if(token)
          {
              center_x = 50 * i + 25;
              center_y = 50 * j + 25;

              ctx.fillStyle = token.color;

              console.log("This is the turn count" + token.turn_count);

              ctx.beginPath();
              ctx.arc(center_x, center_y, 20, 0, Math.PI * 2, true);
              ctx.fill();
              ctx.stroke();

              ctx.fillStyle = 'white';
              ctx.font = '20px serif';
              ctx.textAlign = 'center';
              ctx.fillText(token.turn_count, center_x, center_y);
          }
        }
    }

    if (game.winning_player != null){
      ctx.fillStyle = 'green';
      ctx.font = '35px serif';
      ctx.textAlign = 'center';
      ctx.fillText(game.winning_player.name + ' won the game!', 175, 150);
    }
  }
}

function drop(column) {
    console.log(column);
    game.player_move(column)
    draw_board()
    console.log(game)
}


// Setting up the game to play it!

var players = [new Player("Ben", colors.RED), new Player("Erica", colors.BLACK)];
var board = new Board(6, 7);
var game = new Game(players, board);