// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Part 1: https://youtu.be/aKYlikFAV4k
// Part 2: https://youtu.be/EaZxUCWAjb0
// Part 3: https://youtu.be/jwRT4PCT6RU

// An object to describe a spot in the grid
function Spot(i, j) {

    // Location
    this.i = i;
    this.j = j;
  
    // Neighbors
    this.neighbors = [];
  
    // Where did I come from?
    this.previous = undefined;

     // f, g, and h values for A*
    this.f = 0;
    this.g = 0;
    this.h = 0;

  
    // Am I a wall?
    this.wall = false;
    if (random(1) < 0.2) {
      this.wall = true;
    }
  
    // Display me
    this.show = function(col) {
      if (this.wall) {
        fill(170);
        noStroke();
        ellipse(this.i * w + w / 2, this.j * h + h / 2, w / 2, h / 2);
      } else if (col) {
        fill(col);
        rect(this.i * w, this.j * h, w, h);
      }
    }
  
    // Figure out who my neighbors are
    this.addNeighbors = function(grid) {
      var i = this.i;
      var j = this.j;
      if (i > 0 && j > 0) {
        this.neighbors.push(grid[i - 1][j - 1]);
      }
      if (j > 0) {
        this.neighbors.push(grid[i][j - 1]);
      }
      if (i < cols - 1 && j > 0) {
        this.neighbors.push(grid[i + 1][j - 1]);
      }
      if (i > 0) {
        this.neighbors.push(grid[i - 1][j]);
      }
      if (i < cols - 1) {
        this.neighbors.push(grid[i + 1][j]);
      }
      if (i > 0 && j < rows - 1) {
        this.neighbors.push(grid[i - 1][j + 1]);
      }
      if (j < rows - 1) {
        this.neighbors.push(grid[i][j + 1]);
      }
      if (i < cols - 1 && j < rows - 1) {
        this.neighbors.push(grid[i + 1][j + 1]);
      }
    }
    
    this.distance = function(a) {
      var d = dist(this.i, this.j, a.i, a.j);
      return d;
    }
  }