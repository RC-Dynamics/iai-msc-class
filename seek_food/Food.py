# The "Food" class

class Food():

    def __init__(self, x, y):
        self.position = PVector(x, y)
        self.r = 6

    def update(self):
        pass

    def display(self):
        fill(127)
        noStroke()
        strokeWeight(1)
        with pushMatrix():
            translate(self.position.x, self.position.y)
            rect(0, 0, self.r, self.r)
