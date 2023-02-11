
function preload() {
  img = loadImage('picsandvids/bunnies.png');
}

function setup() {
  canvas = createCanvas(200, 200, WEBGL);
  canvas.parent('bunnyholder');
}

var theta=0;
function draw() {
background(0);
  rotateZ(theta * mouseX * 0.001);
  rotateX(theta * mouseX * 0.001);
  rotateY(theta * mouseY * 0.001);
  //pass image as texture
  texture(img);
  sphere(80);
  noStroke();
  theta += 0.06;
}

var clicks = 0;
function mousePressed() {
  //add 1 to variable clicks
  clicks ++;
  if (clicks==1){ 
    $(intro_text).text("click again");
  }

  if (clicks==2){ 
    $(intro_text).text("1 more time ");
    }

    // (｡◕‿◕｡)
  if (clicks==3){ 
    $(intro_text).text("okay, u can come in...");
    $(intro_background).delay(200).fadeOut(2500);
    setTimeout(function(){ window.location.href= 'landing_page.html';}, 2500);

    }

  console.log(clicks);
}

