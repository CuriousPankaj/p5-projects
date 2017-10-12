let smoke = [];
let randSide = Math.random(1)<0.5 ? "right" : "left";
let chimneyL, chimneyR;

class Chimney {
  constructor(side){
    this.side = side;
    this.height = height/5;
  }
  
  show(){
    if (this.side === "left"){
      push();
      textSize(20);
      fill(0);
      stroke(40);
      strokeWeight(1);
      translate(width/4, height/6);
      text("Chimney 1", 0, 0);
      pop();
      push();
      translate(width/4, height);
      stroke(0);
      strokeWeight(2);
      fill(0);
      rect(0, 0, 50, -this.height);
      // rect(30, 20, 55, 55);
      translate(-35, -this.height - 60);
      beginShape(TRIANGLE_STRIP);
      vertex(30, 75);
      vertex(40, 20);
      vertex(50, 75);
      vertex(60, 20);
      vertex(70, 75);
      vertex(80, 20);
      vertex(90, 75);
      endShape();
      pop();
    } else if (this.side === "right") {
      push();
      textSize(20);
      fill(0);
      stroke(40);
      strokeWeight(1);
      translate(width/1.3, height/6);
      text("Chimney 2", 0, 0);
      pop();
      push();
      translate(width/1.3, height);
      stroke(0);
      strokeWeight(2);
      fill(0);
      rect(0, 0, 50, -this.height);
      // rect(30, 20, 55, 55);
      translate(-35, -this.height - 60);
      beginShape(TRIANGLE_STRIP);
      vertex(30, 75);
      vertex(40, 20);
      vertex(50, 75);
      vertex(60, 20);
      vertex(70, 75);
      vertex(80, 20);
      vertex(90, 75);
      endShape();
      pop();      
    }
  }
}




class Particle {
  constructor(side, velX, velY) {
    this.side = side;
    this.alpha = 230;
    
    if(this.side === "left"){
      this.x = width/4+20;
      this.y = height-chimneyL.height-50;
    } else if (side === "right") {
      this.x = width/1.3+20;
      this.y = height-chimneyR.height-50;
    }
    this.velX = random(-1, 1);
    this.velY = random(-1, -3);
    
  }
  
  move() {
    this.x += this.velX;
    this.y += this.velY;
    this.alpha -= 2;
  }
  
  show() { 
    let size = map(this.alpha, 0, 200, 2, 30)
    fill(100, this.alpha);
    // stroke(100);
    noStroke();
    ellipse(this.x, this.y, size);
  }
  
  finished() {
    return this.alpha < 0;
  }
}

function setup() {
  let canvas = createCanvas(windowWidth-20, windowHeight-50);
  canvas.mouseMoved(moreSmoke);
  chimneyL = new Chimney("left");
  chimneyR = new Chimney("right");
}

function draw() {
  background(255);
  chimneyL.show();
  chimneyR.show();
  for (let i=0; i<3; i++){
    let p = new Particle(randSide, 1, 1);
    smoke.push(p);
  }
  
  for (let i = smoke.length-1; i >= 0; i--) {
    smoke[i].move();
    smoke[i].show();
    
    if(smoke[i].finished()) {
      smoke.splice(i, 1);
    }
  }
}

function moreSmoke(){
  if (mouseX < width/2){
    randSide = "left";
  } else {
    randSide = "right";
  }

}