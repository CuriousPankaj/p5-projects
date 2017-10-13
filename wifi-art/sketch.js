

function setup() {
  let canvas = createCanvas(300, 300);
  canvas.addClass('cnv');
  background(255);
  angleMode(DEGREES);
  
}


function draw() {
  translate(0, height);
  fill(0);
  ellipse(50, -50, 50);
  noFill();
  stroke(0);
  strokeWeight(15);
  arc(30, -30, 200, 200, -90, 0);
  strokeWeight(25);
  arc(30, -30, 300, 300, -90, 0);
  strokeWeight(35);
  arc(30, -30, 450, 450, -90, 0);
  
}