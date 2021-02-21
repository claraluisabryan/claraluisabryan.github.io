

var canvas;
var fillcolor = '#C76176';
var strokecolor = '#ffcccc';
//var pressCount = 0;

function setup(){
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0);
  canvas.style('z-index', '-1');
  background('#333333');
}

function draw() {
	//background('#333333');
  //noStroke();
  //check();
  fill(fillcolor);
  stroke(strokecolor);
  strokeWeight(3);
  ellipse(pmouseX, pmouseY, 20, 20);
}


function check(){

  // if (abs(mouseX-pmouseX)>=30){
  //   fillcolor = '#ffcccc';
  //   strokecolor='#C76176';
  // }
  // else{
  //   fillcolor='#C76176';
  //   strokecolor='#ffcccc';
  // }
  if (mouseX%200<=100){
    // if(false){
    fillcolor = '#ffcccc';
    strokecolor='#C76176';
  }
  else{
    fillcolor='#C76176';
    strokecolor='#ffcccc';
  }

}

function mousePressed(){
  background('#333333');
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background('#333333');

}
