// PImage b;

void setup() {
  img = loadImage("lu_library.jpg");

  size(180, 200);
  background(30);
  image(img, 0, 0, 180,200);
  frameRate(14);

}
float h=height;
float w=width;
float step = 4;
void draw(){
  noStroke();
  image(img, 0, 0, 180,200);
  img.loadPixels();
  color cp = get(mouseX,mouseY);
  fill(cp);
  int i=0;
  strokeWeight(1);
  stroke(250);
  rect(mouseX-10,mouseY-10,width/10,height/10);
  int fuck = 0;
  while (fuck<3){
  rect(random(0,width), random(0,height), 10,10);
  fuck+=1;
}

  // rect(width/2, h-10, width/15,height/15);
  // if (h>height){
  //   h=h-2;
  //   step = -4;
  // }
  // if (h<0) {
  //   h=h+2
  //   step = 4;
  // }
  // rect(w+40, height/2, width/15,height/15);
  // if (w>width-60){
  //   w=w-2;
  //   step = -4;
  // }
  // if (w<0) {
  //   w=w+2
  //   step = 4;
  // }
  // h+=step;
  // w+=step;
  textSize(15);
  fill(30, 47, 54);
  text('move your cursor around', 4, 20);

}
