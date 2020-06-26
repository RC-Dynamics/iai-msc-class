# The Nature of Code
# Daniel Shiffman
# http://natureofcode.com
#
# Modified by Lucas Cavalcanti and Roberto Fernandes

# Vehicle that seeks food

# Implements Craig Reynold's autonomous steering behaviors
# One vehicle "seeks"
# See: http://www.red3d.com/cwr/

from Vehicle import Vehicle
from Food import Food

total_food = 0

def setup():
    global vehicle
    global food
    size(640, 360)
    velocity = PVector(0, 0)
    vehicle = Vehicle(width / 2, height / 2, velocity)
    food = Food(random(width), random(height))

def draw():
    global total_food
    background(255)
    mouse = PVector(mouseX, mouseY)
    vehicle.update()
    vehicle.display()
    total_food += food.update(vehicle)
    food.display()
    vehicle.seek(food.position)
    textSize(20)
    text('Comidas coletadas: ' + str(total_food), 10, 30)
    
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
