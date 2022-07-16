function setup() {
	var canvas = createCanvas(800, 800);
	canvas.parent("sketch-holder");
}

function draw() {
	background(255);
	stroke(0);
	strokeWeight(4);
	line(0, 0, 0, height);
	line(0, height, width, height);
	line(width, height, width, 0);
	line(width, 0, 0, 0);
}
