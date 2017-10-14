let populationR;
let lifespan = 300;
let count = 0;
let targetR;
let barrierR;
let loc;


function target(vec, size) {
	this.size = size;
	if(vec){
		this.pos = vec.copy();
	} else {
		this.pos = createVector(width/2, height/5);
	}
	
	this.show = function() {
		ellipse(this.pos.x, this.pos.y, (this.size) ? this.size : 20);
	}
}	

function barrier(vec, h, w) {
	this.h = h ? h : 20;
	this.w = w ? w : width/2;
	if(vec){
		this.pos = vec.copy();
	} else {
		this.pos = createVector(width/4, height/2);
	}
	
	this.show = function() {
		rect(this.pos.x, this.pos.y, this.w, this.h);
	}
	
}	
	


function DNA(){
	this.genes = [];
	for (let i=0; i<lifespan; i++) {
		this.genes[i] = p5.Vector.random2D();
		this.genes[i].setMag(0.1);
	}
}

function population() {
	this.rockets = [];
	this.size = 25;
	
	for (let i=0; i<this.size; i++) {
		this.rockets[i] = new Rocket();
	}
	
	this.create = function() {
		for (let i=0; i<this.size; i++) {
			this.rockets[i].update();
			this.rockets[i].show();
		}
	}
}

class Rocket {
	constructor()	{
		this.pos = createVector(width/2, height);
		this.acc = createVector();
		this.vel = p5.Vector.random2D();
		this.dna = new DNA();
		this.trail = [];
		this.crashed = false;
	}
	
	applyForce(force) {
		this.acc.add(force);
	}
	
	update() {
		//Only move the rocket if not crashed.
		if (!this.crashed){
			this.applyForce(this.dna.genes[count]);	
			this.vel.add(this.acc);
			this.pos.add(this.vel);
			this.acc.mult(0);
			
			loc = createVector(this.pos.x, this.pos.y);
			this.trail.push(loc);
			// console.log(this.trail.length);
			if(this.trail.length > 300) {
				this.trail.splice(0, 1);
			}
			if (this.crashed) {
				this.trail = [];
			}
		}
		
		//Check for crashing with screen edges
		if (this.pos.x < 5 || this.pos.x > width-5 || this.pos.y > height || this.pos.y < 10) {
			this.crashed = true;
		}
		
		// Check for crashing into the barrier
		let checkX = this.pos.x > barrierR.pos.x && this.pos.x < barrierR.pos.x + barrierR.w;
		let checkY = this.pos.y > barrierR.pos.y && this.pos.y < barrierR.pos.y + barrierR.h;
		
		if (checkX && checkY) {
			this.crashed = true;
		}
		
		
	}
	
	show() {
		push();
		stroke(255);
		fill(255, 100);
		translate(this.pos.x, this.pos.y);
		rotate(this.vel.heading()+PI/2);
		triangle(0, 0, 5, -15, 10, 0);
		pop();
		
		for (let i= this.trail.length-1; i >=0; i--) {
			stroke(255, 100);
			let posT = this.trail[i];
			point(posT.x, posT.y);	
		}
	}
}

function setup() {
	let canvas = createCanvas(400, 600);
	// angleMode(DEGREES);
	// frameRate(10);
	populationR = new population();
	targetR = new target();
	barrierR = new barrier();
	
}



function draw() {
	background(0);
	populationR.create();
	count++;
	
	
	//create a target
	targetR.show();
	
	//creata a barrier
	barrierR.show();
	
	if (count === lifespan) {
		populationR = new population();
		count = 0;
	}
	

}