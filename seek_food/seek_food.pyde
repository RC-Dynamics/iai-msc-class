# The Nature of Code
# Daniel Shiffman
# http://natureofcode.com
#
# Modified by Filipe Calegario

# Draws a "vehicle" on the screen

# Implements Craig Reynold's autonomous steering behaviors
# One vehicle "seeks"
# See: http://www.red3d.com/cwr/

from Vehicle import Vehicle
from Food import Food

def setup():
    global vehicle
    global food
    size(640, 360)
    velocity = PVector(0, 0)
    vehicle = Vehicle(width / 2, height / 2, velocity)
    food = Food(random(width), random(height))

def draw():
    background(255)
    mouse = PVector(mouseX, mouseY)
    vehicle.update()
    vehicle.display()
    food.update(vehicle)
    food.display()
    
def keyTyped():
    if key == 'w':
        f = PVector(0,-0.1)
        vehicle.applyForce(f)
    elif key == 'a':
        f = PVector(-0.1,0)
        vehicle.applyForce(f)
    elif key == 'd':
        f = PVector(0.1,0)
        vehicle.applyForce(f)
    elif key == 's':
        f = PVector(0,0.1)
        vehicle.applyForce(f)
        
def keyReleased():
    vehicle.velocity = PVector(0,0)
