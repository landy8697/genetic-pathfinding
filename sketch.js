p5.disableFriendlyErrors = true;

function setup() {
	var canvas = createCanvas(800, 800);
	canvas.parent("sketch-holder");
	textAlign(RIGHT, CENTER);
	textSize(18);
	speed = 1;
	gen = 1;
	
	//setupTriangle();
	startPos = createVector(400, 790);
	endPos = createVector(400, 10);
	test = new Population(genSize);
	test.update();
	test.draw();
}

function pause(){
	console.log("paused");
	noLoop();
}

function play(){
	console.log("unpaused");
	loop();
}

function speedChange(){
	draw();
}

function resetGenerations(){
	gen = 1;
	test = new Population(genSize);
}

var speed = 1;
var gen = 1;
var replayGen = 1;
var test;
var paused = false;
var genSize = 500;

var startPos;
var endPos;
function draw() {
	background(255);
	stroke(0);
	strokeWeight(4);
	line(0, 0, 0, height);
	line(0, height, width, height);
	line(width, height, width, 0);
	line(width, 0, 0, 0);

	strokeWeight(0);
	fill(0, 0, 255);
	strokeWeight(2);
	ellipse(startPos.x, startPos.y, 8);
	fill(15, 163, 54);
	ellipse(endPos.x, endPos.y, 8);
	strokeWeight(3);
	if(test.allDead()){
		console.log(`New Generation, Size = ${genSize}`)
		test.nextGeneration(genSize);
		gen+=1;
	}else{
		if(!paused){
			test.update();
		}
		test.draw();
	}
	
	
	strokeWeight(0);
	fill(100, 100, 100);
	text(`Generation ${gen}`, 780, 25);	
	text(`Speed: ${speed}x`, 780, 50);	

}
