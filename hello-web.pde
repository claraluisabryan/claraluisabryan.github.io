int numBalls = 12;
float spring = 0.08;
float gravity = -.02;
float friction = -0.9;
Ball[] balls = new Ball[numBalls];

void setup() {
  size(window.innerWidth, window.innerHeight);
   background(255);
  for (int i = 0; i < numBalls; i++) {
    balls[i] = new Ball(random(width), random(height), random(0, 255), i, balls, random(100,255), random(5, 140));
  }
  frameRate(20);
}

void draw() {
  background(255);
  for (Ball ball : balls) {
    ball.collide();
    ball.move();
    ball.display();
  }
  fill(0);
}
class Ball {

  float x, y;
  float diameter;
  float vx = 0;
  float vy = 0;
  int id;
  Ball[] others;
  int r;
  int a;
  float speedx;
  float speedy;
  float speed;


  Ball(float xin, float yin, float din, int idin, Ball[] oin, int rr, int aa) {
    x = xin;
    y = yin;
    diameter = din;
    id = idin;
    others = oin;
    r=rr;
    a=aa;
  }

  void collide() {
    float speed = abs(mouseX-pmouseX) + abs(mouseY-pmouseY);
    float speedx = abs(mouseX-pmouseX);
    float speedy= abs(mouseY-pmouseY);
    for (int i = id + 1; i < numBalls; i++) {
      float dx = others[i].x - x;
      float dy = others[i].y - y;
      float distance = sqrt(dx*dx + dy*dy);
      float minDist = others[i].diameter/2.5 + diameter/2.5;
      if (distance < minDist) {
        float angle = atan2(dy, dx);
        float targetX = x + cos(angle) * minDist;
        float targetY = y + sin(angle) * minDist;
        float ax = (targetX - others[i].x) * spring;
        float ay = (targetY - others[i].y) * spring;
        vx -= ax;
        vy -= ay;
        others[i].vx += ax+speedx*.15;
        others[i].vy += ay+speedy*.15;
      }
    }
  }

  void move() {
    float speedx = abs(mouseX-pmouseX);
    float speedy= abs(mouseY-pmouseY);
    float speed = abs(mouseX-pmouseX) + abs(mouseY-pmouseY);
    gravity=random(-.5,.2);
    vy += gravity;
    x+=vx;
    y+=vy;
    // x += vx-mouseX*.009+height/140;
    // y += vy-mouseY*.007+height/180;
    //-mouseY*.005;
    if (x + diameter/2 > width) {
      x = width - diameter/2;
      vx *= friction;
    }
    else if (x - diameter/2 < 0) {
      x = diameter/2;
      vx *= friction;
    }
    if (y + diameter/2 > height) {
      y = height - diameter/2;
      vy *= friction;
    }
    else if (y - diameter/2 < 0) {
      y = diameter/2;
      vy *= friction;
    }

  }

  void display() {
    // float speedx = abs(mouseX-pmouseX);
    // float speedy= abs(mouseY-pmouseY);
    int color1 = map(mouseX, 0, width, 0, 255);
    int color2 = map(mouseY, 0, height, 0, 255);
    fill(0);
    strokeWeight(.7);
    // noStroke();
    fill(r, color1, color2, a);
    distance = abs(width/2-mouseX);
    // rect(x+speedx*.4, y-speedy*.4, diameter*.4, diameter*.4);
    rect(x, y, diameter*(width/2500), diameter*(height/2500));
    // rect(x%pmouseX*2, y%pmouseY, diameter*.4, diameter*.4);
    // rect(mouseX/x, mouseY/y, diameter*.4, diameter*.4);
    // fill(r, color1, color2, a*.8);
    // arc(x, y, diameter*.1*r, diameter, radians(20*.001*-mouseY), radians(20*.0009*mouseY));
  }
}
//bottom is PI/2
//right is 0
//left is PI
//last elem of arc must be > second to last elem
