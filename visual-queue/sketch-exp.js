let myQueue, bgcolor, q;
let queueDiv;
let input, addBtn, delBtn, deleteBtn, total=0, prev, temp;

class node {
	constructor (data){
		this.data = data;
		this.next = null;
	}
}

class queueManager {
  constructor(){
    let head = null;
    // let total = 0;
  }
  
	addQueueItem()	{
    // let inputValue = select('#add-item-input').value();
    // select('#add-item-input').value('');
    let val = input.value();
    //console.log(input.value);
    if(val != ""){
      let newNode = new node(val);
      temp = this.head;
      prev;
      console.log("Val: " + val);
      if(!temp){
        this.head = newNode;
        total++;
      } else {
          while(temp){
            prev = temp;
            temp = temp.next;
          }
          temp = newNode;
          prev.next = temp;
          total++;
      }  
    }
    console.log("Total items: " + total);
    //this.showQueue();
    //return false;
	}

	removeQueueItem() {
		temp = this.head;
    if(!temp){
      console.log("Queue already empty");
    } else {
      this.head = this.head.next;
      total--;
    }
    //this.showQueue();
    //return false;
	}
	
  deleteQueue() {
    if(!this.head){
      console.log("Queue already empty");
    } else {
      this.head = null;
      total = 0;
    }
    //this.showQueue();
    //return false;
  }
  
  showQueue() {
    temp = this.head;
    let x = 20;
    q = "";
    if(!temp){
      textSize(20);
      stroke(255);
      strokeWeight(3);
      // queueDiv.html('NULL');
      text("NULL", x+50, 50);
    } else {
      while(temp){
        textSize(20);
        stroke(255, 0, 159);
        // queueDiv.html(temp.data + " - ");
        text(temp.data, x, 50);
        q += temp.data+", ";
        stroke(255);
        strokeWeight(3);
        x += textWidth(temp.data)+10;
        line(x, 40, x+10, 40);
        x += 20;
        temp = temp.next;
      }
      textSize(20);
      stroke(255);
      strokeWeight(3);
      // queueDiv.html("NULL");
      text("NULL", x, 50);
    }
    // console.log(q);
  } 
}

function showQ() {
  console.log(q);
}

function setup(){
  var canvas = createCanvas(600, 500);
	//background(0);
  let canvasHolder = select('#queue-holder');
  canvas.parent(canvasHolder);
  // noCanvas();
  myQueue = new queueManager();
  // queueDiv = select('#queue-holder');
  // input = createInput('');
  input = select('#add-item-input');
  addBtn = select('#add-item-btn');
  delBtn = select('#delete-item-btn');
  deleteBtn = select('#delete-queue-btn');
  addBtn.mousePressed(myQueue.addQueueItem);
  delBtn.mousePressed(myQueue.removeQueueItem);
  deleteBtn.mousePressed(myQueue.deleteQueue);
  
  myQueue.showQueue();
}


function draw() {
  // bgcolor = random(255);
  background(0);
  myQueue.showQueue();
}
