function roughDistance(x0, y0, x1, y1) {
  let dx = abs(x1 - x0)
  let dy = abs(y1 - y0)
  let dist = 0.5 * (dx + dy + max(dx, dy))
  return dist;
}

class Particle{
	constructor(x,y){
		this.pos = createVector(x,y);
		this.vel = createVector(0,0.08);
	}

	draw(){
		rect(this.pos.x,this.pos.y,5,5);
	}

	fall(target){
		this.follow(target);
		if(this.pos.y > height){
			 this.pos.y = 0;
		}
		this.pos.add(this.vel);
	}

	follow(target){
		// this.draw();
		let distance_valid =150;
		if(roughDistance(this.pos.x,this.pos.y,target.x,target.y) <= distance_valid){
			this.draw();
			stroke(255,255,255);
			line(this.pos.x,this.pos.y,target.x,target.y);
		}
	}
}

let particles = [];
let total = 200;
let miuseData;
function setup() {
  createCanvas(windowWidth, windowHeight);
	for(let i=0;i<total;i++){
		particles[i] = new Particle(random(width,-width),random(-height,height));

	}


}
let i = 0;
function draw() {
  background(50);
	for(let i=0;i<particles.length;i++){
		for(let j=0;j<particles.length - i;j++){
			particles[j].fall(particles[i].pos)
		}
	}
}
