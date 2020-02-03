//link to processing page explaining printing out pdfs: https://processing.org/tutorials/print/
import processing.pdf.*;  // Import PDF code
boolean saveOneFrame = false;

Petri Petri1;
//PImage comp;

void setup() {
  size(1440, 720);
  // background(181, 200, 230); // old background color
  //background(82,161,243); // blue
  background(213,108,170);
  Petri1 = new Petri(new PVector(width/2, height/2));
  //comp = loadImage("comp.png");
}

void draw() {
  if (saveOneFrame == true) {             // When the saveOneFrame boolean is true,
    beginRecord(PDF, "line-####.pdf");    // start recording to the PDF
  }
  //background(82,161,243); //blue
  //background(181, 200, 230); // old background color}

  background(213,108,170);
  if ((keyPressed==true) & ((key == 'a') | (key == 's') | (key == 'd') | (key == 'f')
    | (key == 'g') | (key == 'h') | (key == 'j') | (key == 'k') | (key == 'l') )) {
    Petri1.addCell();
  }
  Petri1.run();
  //if (keyPressed==true && key == 'p'){
  //image(comp,width-(width/.96),height-(height/.96), width*1.08, height*1.38);}

  if (saveOneFrame == true) {             // If the PDF has been recording,</em>
    endRecord();                          // stop recording, -
    saveOneFrame = false;                 // and set the boolean value to false
  }
}


void keyPressed() {                     // When a mouse button is pressed,
  if (key == 'p') {
    saveOneFrame = true;                    // trigger PDF recording within the draw()
  }
}


class Cell { // cell class

  PVector position; // starting point
  PVector velocity;
  int r; // r g b used in fill
  int g;
  int b;
  int transparency; // transparency used in fill
  PVector center;
  boolean freeze;
  boolean wigg; //controlls if squares shake
  float STROKE; //controls stroke

   Cell(PVector l, int rr, int gg, int bb, int trans) { // constructor. initializes.
     l.x=mouseX;
     l.y=mouseY;
    position=l.copy(); // starting point
    velocity = new PVector(random(-.5,.5), random(-.5,.5)); // controls where on the screen rects move
    r = rr;
    g = gg;
    b = bb;
    transparency=trans; // placeholder
    center = new PVector(mouseX, mouseY); // controls where squares are being "stretched" towards
    freeze = true;
    wigg = false; // bool controlling if squares wiggle
    STROKE = 1;
    }


  void STROKE(){ // conrrols
    if (key == CODED) {
        if (keyCode == UP){
          STROKE=1.8;
        }
        if (keyCode == DOWN) {
          if (STROKE>=.1){
          STROKE=.6;}
    }}}


  void transparency() {
        //changes transparency based off a s d f
      if ((keyPressed==true) & (key == 'a')) {
      transparency = 250;
    }
     if ((keyPressed==true) & (key == 's')) {
      transparency = 219;
    }
      if ((keyPressed==true) & (key == 'd')) {
      transparency = 188;
    }
      if ((keyPressed==true) & (key == 'f')) {
      transparency = 157;
    }
      if ((keyPressed==true) & (key == 'g')) {
      transparency = 126;
    }
      if ((keyPressed==true) & (key == 'h')) {
      transparency = 95;
    }
      if ((keyPressed==true) & (key == 'j')) {
      transparency = 64;
    }
      if ((keyPressed==true) & (key == 'k')) {
      transparency = 33;
    }
      if ((keyPressed==true) & (key == 'l')) {
      transparency = 0;
    }
  }

  void center() { //changes center basd off 1 2 3 4
      if ((keyPressed==true) & (key == '1')) {
      center.x=width/.2;
      center.y=height/4;
    }

      if ((keyPressed==true) & (key == '2')) {
      center.x=(width/4);
      center.y=height/4;
    }

      if ((keyPressed==true) & (key == '3')) {
      center.x=width/2;
      center.y=height/2;
    }

      if ((keyPressed==true) & (key == '4')) {
      center.x=(width/4)*3;
      center.y=height/4;
      }

      if ((keyPressed==true) & (key == '5')) {
      center.x=(-width/3);
      center.y=width/4;
    }
      if ((keyPressed==true) & (key == '6')) {
      center.x=mouseX;
      center.y=mouseY;
    }
  }
  //the 5 color options
  void color1(){
    r = 45;
    g = 54;
    b = 173; }
  void color2(){
    r=131;
    g=145;
    b=237; }
  void color3(){
    r = 175;
    g = 135;
    b = 230; }
  void color4(){
    r = 37;
    g = 42;
    b = 155; }
   void color5(){
    r = 108;
    g = 100;
    b = 238; }

  //chooses one of the 5 colors at random
  void colorpicker(){
    float rand_num = random(1,4);
    if (rand_num <= 1) {
      color1(); }
    if ((1.0 <= rand_num) & (rand_num<=2)){
      color2(); }
    if ((2.0 <= rand_num) & (rand_num<=3)){
      color3(); }
    if ((3.0 <= rand_num) & (rand_num<=4)){
      color4(); }
    if ((4.0 <= rand_num) & (rand_num<=5)){
      color5(); }

  }


   void update(){ // updates all variables! calls transparency, center, adds velocity to position
    position.add(velocity); // to each invididual cell, updates position, making them move
    //if (r<=50){
    r+=random(-8,8);
    g+=random(-8,8);
    b+=random(-8,8);

    //r+=random(-30,30); // updating color
    ////if (g<100) {
    //g+=random(-30,30);

    //b+=random(-0,55);
    colorpicker(); // calls color picker
    transparency();
    center();
    STROKE();
     }

  void control_bool() { // controls boolean features of cell (wiggle, freeze)
     if ((keyPressed == true) & (key == 'w')) { //sets wigg to true if we press w
       wigg = true;
     }

     if ((keyPressed == true) & (key == 'o')) { //sets wigg to true if we press w
       wigg = false;
     }

      if ((keyPressed == true) & (key == ' ')) {
      freeze = false;
    }
  }

   void wiggle(){ // adds shake
     position.x += random(-5,5);
     position.y += random(-5,5);
   }

   void no_wiggle(){ // removes shake
     position.x += 0;
     position.y += 0;
   }

   boolean alive() { // bool alive that is called in petri, so when space bar is pressed, screen is cleared
    if ((keyPressed == true) & (key == 'E')) {
      return true;
    } else {
      return false;
    }
  }

   void display(){ // draws shapes
     fill(r,g,b,transparency);
     strokeWeight(STROKE);
     //ellipse(position.x,position.y,(position.x-center.x)/10, (position.y-center.y)/10);
     rect(position.x,position.y, position.x-center.x, position.y-center.y); // makes rects at position, stretched to center
  }

    void run(){ // calls all the functions, including display
    control_bool(); // calling wigg bool
    if (wigg) { // if wigg is true, call wiggle
        wiggle();
    } else { // if wigg is false, call no wiggle
          no_wiggle();
    }
    if (freeze) { // if freeze is true, call update
    update();
    }
    display(); // always displays
  }

  }

class Petri{
  ArrayList<Cell> cells; // arraylist of cells
  PVector origin; // placeholder.
  int transparency; //placeholder. transparency is updated in cell class
  boolean frozone;

  Petri(PVector coffee){
    origin=coffee; // does nothing
    cells = new ArrayList<Cell>();
    frozone = true;
  }

  void addCell() {
      cells.add(new Cell(origin,43,54,240,transparency)); // makes new cells
  }

  void run() {

    for (int i = cells.size()-1; i>=0; i--) {
      Cell p = cells.get(i);

      p.run();
      if (p.alive()) {
        cells.remove(i);

      }
    }}
}
