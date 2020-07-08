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

// Start and end
var start;
var end;

// Width and height of each cell of grid
var w, h;

// The road taken
var path = [];

function setup() {
  createCanvas(400, 400);

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
  end = grid[cols - 1][rows - 1]; // TODO: Posicao aleatoria
  start.wall = false;
  end.wall = false;

  // openSet starts with beginning only
  openSet.push(start);
}

function draw() {
  // closedSet = []

  // Am I still searching?
  while (openSet.length > 0) {
    // Best next option
    console.log(openSet[0])
    var current = openSet[0];

    // Did I finish?
    if (current === end) {
      console.log('end')
      break;
    }

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
        openSet.push(neighbor);
      }
    }
    // Uh oh, no solution
  }

  if (current !== end) {
      console.log('no solution');
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

  // Find the path by working backwards
  path = [];
  var temp = current;
  while (temp.previous) {
    path.push(temp.previous);
    temp = temp.previous;
  }
  path.reverse();
  start = path[1]
  openSet = []
  openSet.push(start);


  // Drawing path as continuous line
  noFill();
  stroke(255, 0, 200);
  strokeWeight(w / 2);
  beginShape();
  vertex(path[0].i * w + w / 2, path[0].j * h + h / 2);
  vertex(path[0].i * w + w / 2, path[0].j * h + h / 2);
  endShape();
  
  beginShape();
  stroke(0, 255, 200);
  vertex(end.i * w + w / 2, end.j * h + h / 2);
  vertex(end.i * w + w / 2, end.j * h + h / 2);
  endShape();
  // sleep(200);
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}