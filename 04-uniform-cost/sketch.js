// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Part 1: https://youtu.be/aKYlikFAV4k
// Part 2: https://youtu.be/EaZxUCWAjb0
// Part 3: https://youtu.be/jwRT4PCT6RU

// How many columns and rows?
var cols = 10;
var rows = 10;

// This will be the 2D array
var grid = new Array(cols);

// Open and closed set
var openSet = [];
var closedSet = [];
var finalPath = [];

// Start and end
var start;
var end;

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


  // Start and end
  start = grid[0][0]; // TODO: Posicao aleatoria
  var c_end = Math.floor(random(cols));
  var r_end = Math.floor(random(rows));
  end = grid[c_end][r_end];
  start.g = 0;
  start.wall = false;
  end.wall = false;
  
  openSet.push(start);
}

function draw() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].previous = undefined;
    }
  }
  var current;
  

  // Am I still searching?
  if (openSet.length > 0) {
    // Best next option
    openSet.sort(compare);
    current = openSet[0];
    console.log(openSet);
    
    // Did I finish?
    if (current !== end) {
      // Best option moves from openSet to closedSet
      openSet.shift();
      closedSet.push(current);
  
      // Check all the neighbors
      var neighbors = current.neighbors;
      for (var i = 0; i < neighbors.length; i++) {
        var neighbor = neighbors[i];
  
        // Valid next spot?
        if (!closedSet.includes(neighbor) && !neighbor.wall) {
          tempD = current.g + current.distance(neighbor);
          
          var newPath = false;
          if(openSet.includes(neighbor)){
            if(tempD < neighbor.g) {
              neighbor.g = tempD;
              newPath = true
            } // else: best neighbor already in OpenSet
          }
          else {
            neighbor.g = tempD;
            openSet.push(neighbor)
            newPath = true
          }
          if(newPath){
            neighbor.h = 0;
            neighbor.f = neighbor.g + neighbor.h;
            neighbor.previous = current;
          }
          
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
  vertex(start.i * w + w / 2, start.j * h + h / 2);
  vertex(start.i * w + w / 2, start.j * h + h / 2);
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

  // Pontuacao
  noStroke();
  fill(0, 100, 255);
  textSize(20);
  textStyle(BOLD);
  text('Foods: ' + str(total_f), 10, 30);

  if (current === end){
    start = end;
    total_f++;

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
  
  
  sleep(200);
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function compare (a, b) {
  if (a.f < b.f) {
    return -1;
  }
  if (a.f > b.f) {
    return 1;
  }
  return 0;
}