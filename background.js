
function preload() {
  img = loadImage('picsandvids/bunnies.png');
}

function setup() {
  canvas = createCanvas(200, 200, WEBGL);
  canvas.parent('bunnyholder');
  if (windowWidth>415){
    $(intro_text).text("click");
  }
}

var theta=0;
function draw() {
background(0);
if (windowWidth>415){

rotateZ(theta * mouseX * 0.001);
  rotateX(theta * mouseX * 0.001);
  rotateY(theta * mouseY * 0.001);
  //pass image as texture
  texture(img);
  sphere(80);
  noStroke();
  theta += 0.02;
}

  else if (windowWidth<=415){
    rotateZ(theta + 5 * mouseX * 0.01);
    rotateX(theta + -10 * mouseX * 0.01);
    rotateY(theta + 4 * mouseY * 0.01);
    //pass image as texture
    texture(img);
    sphere(80);
    noStroke();
    theta += 0.01;
    $(intro_text).text("press anywhere, come in");
    $(intro_background).delay(1400).fadeOut(3000);
    setTimeout(function(){ window.location.href= 'index.html';},2900);
  }
}

var clicks = 0;
function mousePressed() {
  //add 1 to variable clicks
  if (windowWidth>=415){
  clicks ++;
  if (clicks==1){ 
    $(intro_text).text("click again");
  }

  if (clicks==2){ 
    $(intro_text).text("one more time");
    }

    // (｡◕‿◕｡)
  if (clicks==3){ 
    $(intro_text).text("enter");
    $(intro_background).delay(200).fadeOut(2500);
    setTimeout(function(){ window.location.href= 'index.html';}, 2500);

    }

  console.log(clicks);
  }
}

