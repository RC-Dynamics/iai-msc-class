// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Part 1: https://youtu.be/aKYlikFAV4k
// Part 2: https://youtu.be/EaZxUCWAjb0
// Part 3: https://youtu.be/jwRT4PCT6RU

// How many columns and rows?
var cols = 15;
var rows = 15;

// This will be the 2D array
var grid = new Array(cols);

// Open and closed set
var openSet = [];
var closedSet = [];
var finalPath = [];

// Start and end
var start;
var end;
var current;

// Width and height of each cell of grid
var w, h;

// The road taken
var path = [];
let total_f = 0;

function setup() {
  createCanvas(600, 600);

  // Grid cell size
  w = width / cols;
  h = height / rows;

  // Making a 2D array
  for (var i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Spot(i, j);
    }
  }

  // All the neighbors
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].addNeighbors(grid);
    }
  }

  clear_previous();

  // Start and end
  start = grid[0][0];
  init_search();
  start.wall = false;

}

function draw() {
  var search = true;

  if (current === end){
    if(path.length === 0){
      total_f++;
      
      start = end;
      init_search();
      clear_previous();

    }
    else {
      openSet = []
      closedSet = [];
      search = false;
    }
  }
  else {
    // Am I still searching?
    if (openSet.length > 0) {
      // Best next option
      current = openSet[0];
      
      // Did I finish?
      if (current !== end) {
        // Best option moves from openSet to closedSet
        openSet.shift()
        closedSet.push(current);
    
        // Check all the neighbors
        var neighbors = current.neighbors;
        for (var i = 0; i < neighbors.length; i++) {
          var neighbor = neighbors[i];
    
          // Valid next spot?
          if (!closedSet.includes(neighbor) && !openSet.includes(neighbor) && !neighbor.wall) {
            neighbor.previous = current;
            openSet.unshift(neighbor);
          }
        }
      }
    }
    // Uh oh, no solution
    else {
      console.log('no solution')
      noLoop();
      return;
    }
  }

  // If searching, Vehicle stay at start
  var pos = start;
  if(search === false){
     pos = path.shift()
  }
  else { // Otherwise it follows path
    // Find the current path and draw!
    path = [];
    var temp = current;
    path.push(temp);
    while (temp.previous) {
      path.push(temp.previous);
      temp = temp.previous;
    }
    path.reverse();
  }

  // Draw current state of everything
  background(255);
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }

  // Veiculo
  noFill();
  stroke(255, 0, 200);
  strokeWeight(w / 2);
  beginShape();
  vertex(pos.i * w + w / 2, pos.j * h + h / 2);
  vertex(pos.i * w + w / 2, pos.j * h + h / 2);
  endShape();

  // Comida
  beginShape();
  stroke(0, 255, 0);
  vertex(end.i * w + w / 2, end.j * h + h / 2);
  vertex(end.i * w + w / 2, end.j * h + h / 2);
  endShape();

  // ClosedSet
  stroke(0, 0, 255, 50);
  for (var i = 0; i < closedSet.length; i++) {
    if (closedSet[i] == start || closedSet[i] == end)
      continue;
    beginShape();
    vertex(closedSet[i].i * w + w / 2, closedSet[i].j * h + h / 2);
    vertex(closedSet[i].i * w + w / 2, closedSet[i].j * h + h / 2);
    endShape();
  }

  // OpenSet
  stroke(0, 0, 255, 100);
  for (var i = 0; i < openSet.length; i++) {
    if (openSet[i] == start)
      continue;
    beginShape();
    vertex(openSet[i].i * w + w / 2, openSet[i].j * h + h / 2);
    vertex(openSet[i].i * w + w / 2, openSet[i].j * h + h / 2);
    endShape();
  }

  // Path Draw
  noFill();
  stroke(255, 0, 0);
  strokeWeight(5);
  beginShape();
  for (var i = 0; i < path.length; i++) {
    vertex(path[i].i * w + w / 2, path[i].j * h + h / 2);
  }
  endShape();  

  // Pontuacao
  stroke(255);
  strokeWeight(3);
  fill(0, 100, 255);
  textSize(20);
  textStyle(BOLD);
  text('DFS - Foods: ' + str(total_f), 10, 30);
  
  sleep(200);
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function clear_previous(){
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].previous = undefined;
    }
  }
}

function init_search(){
  openSet = []
  openSet.push(start);
  closedSet = [];

  var c_end = Math.floor(random(cols));
  var r_end = Math.floor(random(rows));
  end = grid[c_end][r_end];
  while (end.wall){
    c_end = Math.floor(random(cols));
    r_end = Math.floor(random(rows));
    end = grid[c_end][r_end];
  }
}