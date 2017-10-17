let populationR;
let lifespan = 300;
let count = 0;
let targetR;
let barrierR;
let loc, xOffset, yOffset;



function target(vec, size) {
	if (size) {
		this.size = size;
	} else {
		this.size = 20;
	}
	
	if(vec){
		this.pos = vec.copy();
	} else {
		this.pos = createVector(width/2, height/5);
	}
	
	this.show = function() {
		ellipse(this.pos.x, this.pos.y, this.size);
	}
	
	this.move = function(xOff, yOff) {
		let tVector = createVector(this.pos.x, this.pos.y);
		let mouseVector = createVector(mouseX, mouseY);
		if (p5.Vector.dist(tVector, mouseVector) < this.size) {
			this.pos.x = mouseX-xOff;
			this.pos.y = mouseY-yOff;
		}
	}
}	

function barrier(vec, h, w) {
	this.h = h ? h : 20;
	this.w = w ? w : width/3;
	if(vec){
		this.pos = vec.copy();
	} else {
		this.pos = createVector(width/3, height/2);
	}
	
	this.show = function() {
		rect(this.pos.x, this.pos.y, this.w, this.h);
	}
	
}	
	


function DNA(genes){
	this.genes = [];
	if(genes) {
		this.genes = genes;
	} else {
		for (let i=0; i<lifespan; i++) {
			this.genes[i] = p5.Vector.random2D();
			this.genes[i].setMag(0.2);
		}
	}
		
	this.crossOver = function(spouse) {
		let newGenes = [];
		let mid = floor(random(this.genes.length));
		for (let i=0; i<this.genes.length; i++) {
			if (i < mid){
				newGenes[i] = this.genes[i];
			} else {
				newGenes[i] = spouse.genes[i];
			}
		}
		return new DNA(newGenes);
	}
	
	this.mutation = function() {
    for (var i = 0; i < this.genes.length; i++) {
      // if random number less than 0.01, new gene is then random vector
      if (random(1) < 0.01) {
        this.genes[i] = p5.Vector.random2D();
        this.genes[i].setMag(0.2);
      }
    }
	}

}

function population() {
	this.rockets = [];
	this.size = 25;
	this.matingPool = [];
	
	for (let i=0; i<this.size; i++) {
		this.rockets[i] = new Rocket();
	}
	
	this.init = function() {
		for (let i=0; i<this.size; i++) {
			this.rockets[i].update();
			this.rockets[i].show();
		}
	}

  this.evaluate = function() {
    // Iterate through all rockets and calcultes their fitness
    for (var i = 0; i < this.size; i++) {
			// Calculate Fitness
			this.rockets[i].calculateFitness();
    }
		
    this.matingPool = [];
    // A rocket with high fitness will highly likely will be in the mating pool
    for (var i = 0; i < this.size; i++) {
      var n = this.rockets[i].fitness;
      for (var j = 0; j < n; j++) {
        this.matingPool.push(this.rockets[i]);
      }
    }
	}	
	
	
	this.selection = function() {
		let newRockets = [];
		for (let i=0; i<this.rockets.length; i++){
			let parentAdna = random(this.matingPool).dna;
			let parentBdna = random(this.matingPool).dna;
			let childDna = parentAdna.crossOver(parentBdna);
			childDna.mutation();
			newRockets[i] = new Rocket(childDna);
		}
		this.rockets = newRockets;
	}
}

class Rocket {
	constructor(dna)	{
		this.pos = createVector(width/2, height);
		this.acc = createVector(0, -1);
		this.vel = createVector();
		if(dna){
			this.dna = dna;
		} else {
			this.dna = new DNA();
		}
		this.trail = [];
		this.crashed = false;
		this.reachedTarget = false;
		this.fitness = 0;
	}
	
	applyForce(force) {
		this.acc.add(force);
	}
	
	calculateFitness() {
		let distance = dist(targetR.pos.x, targetR.pos.y, this.pos.x, this.pos.y);
		this.fitness = map(distance, 0, height, 100, 0);
		
		if(this.crashed) { this.fitness = 0;}
	}
	
	update() {
		// Only move the rocket if not crashed.
		if (!this.crashed && !this.targetReached){
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
		
		if(this.targetReached) {
			this.fitness *= 10;
		}
		
		// Check for crashing with screen edges
		if (this.pos.x < 5 || this.pos.x > width-5 || this.pos.y > height || this.pos.y < 10) {
			this.crashed = true;
		}
		
		// Check for crashing into the barrier
		let checkX = this.pos.x > barrierR.pos.x && this.pos.x < barrierR.pos.x + barrierR.w;
		let checkY = this.pos.y > barrierR.pos.y && this.pos.y < barrierR.pos.y + barrierR.h;
		
		if (checkX && checkY) {
			this.crashed = true;
		}
		
		// Check if a rocket has hit the target
		if (p5.Vector.dist(this.pos, targetR.pos) < 15) {
			this.targetReached = true;
		}
	}
	
	show() {
		
		// draw rocket
		let col = map(count, 0, lifespan, 0, 255);
		push();
		stroke(255);
		fill(col, col, col, 100);
		translate(this.pos.x, this.pos.y);
		rotate(this.vel.heading()+PI/2);
		this.drawRocket();
		pop();
		
		// draw trail
		for (let i= this.trail.length-1; i >=0; i--) {
			stroke(col+i, col+i, col+i, 100);
			let posT = this.trail[i];
			point(posT.x, posT.y);	
		}
	}
  
  drawRocket() {
    // triangle(0, 0, 5, -15, 10, 0);
    beginShape();
    vertex(0, 0);
    vertex(-7, 7);
    vertex(0, -10);
    vertex(7, 7);
    endShape(CLOSE);
  }
}

function setup() {
	let canvas = createCanvas(400, 400);
	colorMode(HSB);
	populationR = new population();
	targetR = new target();
	barrierR = new barrier();
}



function draw() {
	background(0);
	populationR.init();
	count++;
	
	
	// create a target
	targetR.show();
	
	// creata a barrier
	barrierR.show();
	
	// if count reaches lifespan, reset population
	if (count === lifespan) {
		populationR.evaluate();
		populationR.selection();
		count = 0;
	}
}

function mouseDragged() {
	// console.log("mouse dragged");
	xOffset = mouseX-targetR.pos.x; 
  yOffset = mouseY-targetR.pos.y;
	targetR.move(xOffset, yOffset);
}