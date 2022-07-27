p5.disableFriendlyErrors = true;

function setup() {
	var canvas = createCanvas(800, 800);
	canvas.parent("sketch-holder");
	textAlign(RIGHT, CENTER);
	textSize(18);
	speed = 1;
	gen = 1;
	
	test = new Population(300);
	test.update();
	test.draw();
}

function pause(){
	console.log(paused)
}

function play(){
	console.log(paused)
}
var speed;
var gen;
var test;
function draw() {
	background(255);
	stroke(0);
	strokeWeight(4);
	line(0, 0, 0, height);
	line(0, height, width, height);
	line(width, height, width, 0);
	line(width, 0, 0, 0);

	if(test.allDead()){
		if(!paused){
			test.nextGeneration();
		}
		
	}else{
		if(!paused){
			test.update();
		}
		
		test.draw();
	}
	

	strokeWeight(0)
	text(`Generation ${gen}`, 780, 25);	
	text(`Speed: ${speed}x`, 780, 50);	
}
