let input, addBtn, delBtn, deleteBtn, holder;
let myQueue = [];

function setup() {
  let canvas = createCanvas(500, 300);
  holder = select('#queue-holder');
  canvas.parent(holder);
  input = select('#add-item-input');
  addBtn = select('#add-item-btn');
  delBtn = select('#delete-item-btn');
  deleteBtn = select('#delete-queue-btn');
  addBtn.mousePressed(addQueueItem);
  delBtn.mousePressed(removeQueueItem);
  deleteBtn.mousePressed(deleteQueue);
}

function addQueueItem() {
  myQueue.push(input.value());
}

function removeQueueItem() {
  myQueue.splice(0, 1);
}

function deleteQueue() {
  myQueue = [];
}

function showQueue() {
  let x = 0;
  if (myQueue.length > 0) {
    textSize(30);
    strokeWeight(2);
    fill(255)
    stroke(255, 0, 0);
    myQueue.forEach(function (item) {
      text(item, x+50, 50);
      x += textWidth(item) + 10;
    }) 
  }
  else {
    text("Empty Queue!", x+50, 50);
  }
}

function draw() {
  background(0);
  showQueue();
}