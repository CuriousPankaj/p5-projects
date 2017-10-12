

function setup() {
  createCanvas(600, 400);
}

function draw () {
  background(0);

  let angle = map(millis() % 2000, 0, 2000, 0, TWO_PI);

  translate(width/2, 0);

  push();
  {
    rotate(sin(angle) * 0.5);
    translate(0, height - 50);

    fill(255);
    drawClock(hour(), minute());
  }
  pop();

  push();
  {
    rotate(-sin(angle) * 0.5);
    translate(0, height - 50);
    
    fill(128);
    drawPeriod(hour());
  }
  pop();
}

function drawClock(hour, minute) {
  hour %= 12;
  if (hour == 0) {
    hour = 12;
  }

  if (hour >= 10) {
    drawCharacter(floor(hour / 10), -60, 0);
  }
  drawCharacter(hour % 10, -30, 0);

  drawCharacter(':', 0, 0);

  drawCharacter(floor(minute / 10), 30, 0);
  drawCharacter(minute % 10, 60, 0);
}

function drawPeriod(hour) {
  if (hour < 12) {
    drawCharacter('A', -15, 0);
  } else {
    drawCharacter('P', -15, 0);
  }
  drawCharacter('M', 15, 0);
}

function drawCharacter(character, x, y) {
  let dots = font[character];
  for (let row = 0; row < dots.length; row++) {
    for (let col = 0; col < dots[row].length; col++) {
      if (dots[row][col] === 1)
        ellipse(x + 5 * col - 10, y + 5 * row - 15, 5, 5);
    }
  }
}
