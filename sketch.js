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

function setMutationRate(index){
	mutationRate = mutationRates[index];
}
var speed = 1;
var gen = 1;
var replayGen = 1;
var test;
var paused = false;
var genSize = 500;
var mutationRate = 0.01;
var mutationRates = [0.0001, 0.0002, 0.0005, 0.001, 0.002, 0.005, 0.01, 0.02, 0.05, 0.1, 0.2, 0.5, 1]
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
	strokeWeight(1);

	fill(150);
	rect(0, 250, 600, 10);
	rect(200, 500, 600, 10);
	strokeWeight(3);
	for(let i =0; i <speed; i++){
		if(test.allDead()){
			test.draw();
			console.log(`New Generation, Size = ${genSize}`)
			test.nextGeneration(genSize);
			gen+=1;
			test.draw();
		}else{
			if(!paused){
				test.update();
			}
			
		}
	}
	test.draw();
	strokeWeight(0);
	fill(100, 100, 100);
	text(`Generation ${gen}`, 780, 25);	
	text(`Speed: ${speed}x`, 780, 50);	

}
