// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Modified by Lucas Cavalcanti and Roberto Fernandes

let v;
let f;
let total_f = 0;

function setup() {
  createCanvas(640, 360);
  v = new Vehicle(width / 2, height / 2);
  f = new Food(Math.random()*width, Math.random()*height);
}

function draw() {
  background(240, 240, 240);
  // let mouse = createVector(mouseX, mouseY);
  v.update();
  v.display();
  total_f += f.update(v);
  f.display();
  v.seek(f.position);
  
  textSize(20);
  text('Comidas: ' + str(total_f), 10, 30);
}