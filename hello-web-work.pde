void setup() {
  size(innerWidth, innerHeight);
  background(255);
}
float new_range_h = height;
float old_range_h = 255;
float new_range_w = width;
float old_range_w = 255;
void draw(){
  float new_height = ((mouseY-old_range_h)*new_range_h)/old_range_h;
  float new_width = ((mouseX-old_range_w)*new_range_w)/old_range_w;
  strokeWeight(.2);
  stroke(0);
  // noStroke();
  fill(new_width,new_height,100, random(50, 100));
  rect(mouseX, mouseY, width/100, width/100);
  if (mousePressed== true) {
    background(255);
  }
}


  // if (mousePressed == true) {
  //
  //   int random_color1 = int(random(0,250));
  //   int random_color2 = int(random(0,250));
  //   int random_color3 = int(random(0,250));
  // fill(random_color1, random_color2, random_color3,random(40,150)); }
    // int o=0;
    // while (o<10) {
    // ellipse(width/2, height-2*mouseY+o*70, width-width/100+i%100, height-height*.9+100);
    // o+=1;
// }

    // i+=1;


// Bubble b1 = new Bubble(width/2, height/2, 2);
// Bubble b2 = new Bubble(width/3, height/3, 8);
// Bubble b3 = new Bubble(width/3, height/3, 8);
// Bubble b4 = new Bubble(width/2, height/2, 2);
// Bubble b5 = new Bubble(width/3, height/3, 8);
// Bubble b6 = new Bubble(width/3, height/3, 8);
// Bubble[] bubbles;
// int num;
// int unit = 10;
//
// void setup(){
//   size(window.innerWidth, window.innerHeight);
//   background(0,0,250,25);
//   frameRate(10);
//   // num = width/unit;
//   // for (int i=0, i<num, i++) {
//   //   index = i;
//   //   bubbles[index]=new Bubble(200.0, 200.0, 4);
//   // }
// }
//
// int col1=0;
// int col2=0;
// int col3=0;
//
// void draw(){
//   size(window.innerWidth, window.innerHeight);
//   // background(#FFA6DB);
//   background(0,0,250,25);
//   // background(col1%250, col2%250, col3%250, 120);
//   col1+=1;
//   col2+=2;
//   col3+=3;
//
//   // for (int i=0, i<num, i++) {
//   //   bubbles[i].update();
//   // }
//   b1.update();
//   b2.update();
//   b3.update();
//   b4.update();
//   b5.update();
//   b6.update();
// // console.log(window.innerWidth);
// }
//
// class Bubble {
//   float xpos, ypos;
//   int i, o;
//
//   Bubble(float x, float y, int ii) {
//     xpos = x;
//     ypos = y;
//     i = ii;
//   }
//
//   void update() {
//      if (mousePressed==true) {
//       xpos=(mouseX-random(-width/100, width/100));
//       ypos=(mouseY-random(-height/100, height/100));
//
//      } else {
//     xpos=mouseX+random(-width*.4, width*.4);
//     ypos=mouseY+random(-height*.4, height*.4);
//   }
//
//   strokeWeight(2);
//   fill(xpos%250, ypos%250, (xpos*ypos)%250, random(20,200));
//
//   rect(xpos, ypos, width/20, height/20);
//   }
// }
