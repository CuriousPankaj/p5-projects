let sliders = [];
let angle = 0;
let col;
let w = $(window).width();
let h = $(window).height();
function setup(){
	let bodyElement = select('body');
	// console.log(bodyElement.style("width") + bodyElement.style("height"))
	// createCanvas(bodyElement.style("width").split('px')[0]-20, window.innerHeight);
	createCanvas(windowWidth, windowHeight);
	//background(0);
	for(let i=0; i<3; i++){
		sliders[i] = createSlider(0, 255, 255);
		let sliderdiv = select('#sliders');
		sliders[i].parent(sliderdiv);
		sliderdiv.style("display", "none");
		angle = random(TWO_PI);
		col = map(sin(angle), -1, 1, 0, 255);
		sliders[i].value(col);
		console.log(col);
	}
	
}


function draw() {
	let offset = 0;
	//col = map(sin(angle), -1, 1, 0, 255);
	//sliders[0].value(col);
	//colors[i] = map(sin(angle), -1, 1, 0, 255);
	for (let i=0; i<sliders.length; i++){
		col = map(sin(angle+offset), -1, 1, 0, 255);
		sliders[i].value(col);
		offset += 0.75;
	}
	background(sliders[0].value(), sliders[1].value(), sliders[2].value());
	angle += 0.01;
}