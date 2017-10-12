
let x = 10;
let y = 10;
let spacing = 20;
let r, g, b;

function setup() {
  createCanvas(windowWidth - 20, windowHeight);
  // createCanvas(200, 200);
  background(0);
}

function draw() {
  for (let i=0; i<5; i++){
    drawShape(random(1));
  }
}


function drawShape(what) {
  stroke(190);
  strokeWeight(2);
  if(what < 0.5) {
    r = random(255);
    g = random(255);
    b = random(255);
    fill(r, g, b);
    ellipse(x, y, spacing);
  } else {
    //draw nothing
  }
  x += spacing;
  if(x > width){
    x = 10;
    y += spacing;
  }
  if(y > height){
    background(0);
    x = y = 10;
  }
}