var canvas;
var xx=100;
var yy=100;

function setup(){
  canvas = createCanvas(windowWidth, windowHeight*1.35);
  canvas.position(0,0);
  canvas.style('z-index', '-1');
  background('#333333');
}

function draw() {
  background('#333333');
  indec();
}

function indec(){
  noStroke();
  fill('#C76176');
  ellipse(mouseX, mouseY, xx, yy);
  if (frameCount%100<50){
    xx+=.5;
    yy+=.5;
  }
  if (frameCount%100>50){
    xx-=.5;
    yy-=.5;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight*1.35);
  background('#333333');
}
