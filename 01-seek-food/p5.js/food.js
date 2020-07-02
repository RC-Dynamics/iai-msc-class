// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// The "Vehicle" class

class Food {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.r = 6;
  }

  // Method to update location
  update(vehicle) {
    if (p5.Vector.dist(this.position, vehicle.position) < (2 * this.r)) {
			this.position = createVector(Math.random()*width, Math.random()*height);
			return 1;
		} else {
			return 0;
		}
  }

  display() {
		fill(0);
		noStroke();
    strokeWeight(1);
    push();
    translate(this.position.x, this.position.y);
    rect(0, 0, this.r, this.r);
    pop();
  }
}