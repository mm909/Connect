function roughDistance(x0, y0, x1, y1) {
  let dx = abs(x1 - x0)
  let dy = abs(y1 - y0)
  let dist = 0.5 * (dx + dy + max(dx, dy))
  return dist;
}

let speed = 5;
class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-speed, speed), random(-speed, speed));
    this.r = random(255)
    this.g = random(255)
    this.b = random(255)
  }

  fall() {
    if (this.pos.y > height || this.pos.y < 0) {
      this.vel.y *= -1;
    }
    if (this.pos.x > width || this.pos.x < 0) {
      this.vel.x *= -1;
    }
    this.pos.add(this.vel);
  }

  string(target) {
    let distance_valid = 300;
    let currDistance = roughDistance(this.pos.x, this.pos.y, target.x, target.y)
    if (roughDistance(this.pos.x, this.pos.y, target.x, target.y) <= distance_valid) {
      let c = map(currDistance, 0, distance_valid, 200, 0)
      stroke(255, 255, 255, c);
      line(this.pos.x, this.pos.y, target.x, target.y);
      return true;
    }
    return false;
  }
}

let particles = [];
let total = 100;

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < total; i++) {
    particles[i] = new Particle(random(0, width), random(0, height));
  }
}

let i = 0;

function draw() {
  background(50, 210);
  for (let i = 0; i < particles.length; i++) {
    for (let j = 0; j < particles.length - i; j++) {
      if (i != j)
        particles[j].string(particles[i].pos)
    }
    particles[i].fall()
    particles[i].string({
      x: mouseX,
      y: mouseY
    })
  }
}