# The "Food" class

class Food():

    def __init__(self, x, y):
        self.position = PVector(x, y)
        self.r = 6

    def update(self, vehicle):
        if PVector.dist(self.position, vehicle.position) < (2 * self.r):
            self.position = PVector(random(width), random(height))

    def display(self):
        fill(127)
        noStroke()
        strokeWeight(1)
        with pushMatrix():
            translate(self.position.x, self.position.y)
            rect(0, 0, self.r, self.r)
