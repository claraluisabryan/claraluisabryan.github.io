

var canvas;

function setup(){
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0);
  canvas.style('z-index', '-1');
  background('#333333');
}

function draw() {
	background('#333333');
	noStroke();
  translate(width/2,height/2);
	// fill(0,150,240,100);
	// drawLiq(40,50,30);
	fill('#ffcccc');
	drawLiq(60,60,25);
	fill('#C76176');
	drawLiq(80,45,20);
}

function drawLiq(vNnum,nm,sm){
  push();
  //blendMode(BURN);
	let dr = TWO_PI/vNnum;
	beginShape();
	for(let i = 0; i  < vNnum + 3; i++){
		let ind = i%vNnum;
		let rad = dr *ind;
		let r = sm/30*height*0.4 + noise((pmouseY-mouseY)/nm + ind) * height*0.1 + sin((frameCount)/sm + ind)*height*0.05;
		curveVertex(cos(rad)*r * 1.3, sin(rad)*r);
	}
	endShape();
	pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background('#333333');

}
