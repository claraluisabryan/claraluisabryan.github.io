var myRec = new p5.SpeechRec('en-US', parseResult); // new P5.SpeechRec object
// myRec.continuous = true; // do continuous recognition
  myRec.interimResults = true; // allow partial recognition (faster, less accurate)

  myRec.continuous = false; // turn continuous off!
  myRec.onError = restart;
  myRec.onEnd = restart;
  myRec.interimResults = true;
  //myRec.interrupt = false;




  function restart(){
      myRec.start();
  }

  let venus_font;
  function preload() {
    venus_font = loadFont('../fonts/Venus-Rising.ttf');
  //   PRETTY = loadFont('https://use.typekit.net/xvf7vtv.css');
  }

  var thecol;
  var canvas;

function setup()
{
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0);
  canvas.style('z-index', '100');

  myRec.onResult = parseResult; // now in the constructor
  myRec.start(); // start engine
  rainbow = [[color('#a7b9c9'), color('#ffffff')], [color('#40575d'), color('#ffffff')], [color('#4e4e60'), color('#ffffff')], [color('#000000'), color('#ffffff')]];
  background(0);
  // textFont(venus_font);
  textAlign(CENTER);
  fill(250);
  textFont(venus_font, windowWidth/30);
  text('Accept the prompt - ', width/2, height/2-50);
  text('allow access to your microphone', width/2, height/2);

  text('Talk out loud to your device', width/2, height/2+50);
  text('for a long time.', width/2, height/2+100);
  if (windowWidth<=800){
    textFont("Helvetica", windowWidth/40);
    text('Some mobile devices do not support this feature.', width/2, height/2+150);
    text('Try again on a laptop!', width/2, height/2+200);

  }
  textFont(venus_font, windowWidth/30);
}

function draw(){

}

//windowresize 
  function windowResized() {
    centerCanvas();
    resizeCanvas(windowWidth,windowHeight);
    }

let words =  [];
function parseResult()
{     
      var mostrecentword = myRec.resultString.split(' ').pop();
      if (words[0]!=mostrecentword){ 
          words.unshift(mostrecentword);
          scatter();
        }

}

let scatter_dictionary = [];

function scatter(){


  if (scatter_dictionary.length==0){
    // var new_shuffle_colors = shuffle(rainbow)[0];
    // background(new_shuffle_colors[0]);
    // fill(new_shuffle_colors[1]);
    //fill("#FF4FDC");
    fill("#efcaf4")
    stroke("#a0232b");
    strokeWeight(4);
    textSize(50);
    // console.log(1);
    background("#384053");
  }

  // small scattered text
  if (scatter_dictionary.length < 6){
    scatter_dictionary.unshift(words[0]);
    console.log(scatter_dictionary);
    scatter_word=scatter_dictionary[0];
    text(scatter_word, random(windowWidth/2-100, windowWidth/2+100), random(windowHeight/2-400, windowHeight/2+400));
    console.log(2);
  }

  // big 1 at a time text
  else if (scatter_dictionary.length <= 10){
    background("#a0232b");
    fill("#384053");
    stroke(250);
    strokeWeight(1);
    textSize(windowWidth/4);
    scatter_dictionary.unshift(words[0]);
    for (let i=0; i<scatter_dictionary.length; i++){
      background("#a0232b");
      text(scatter_dictionary[0], windowWidth/2, windowHeight/2);
      console.log(8);
      console.log(scatter_dictionary);
    }
  }

  // vertical shif text green w outline
  else if (scatter_dictionary.length <= 16){
    background("#dddcdb");
    fill(0, 255, 0);
    textSize(100);
    stroke(2);
    for (let i=0; i<scatter_dictionary.length; i++){
      text(scatter_dictionary[i], windowWidth/2, windowHeight/10 + i*200);
      console.log(scatter_dictionary);
    }
    scatter_dictionary.unshift(words[0]);
    console.log(3);
  }

  // dark grey horizontal
  else if (scatter_dictionary.length <= 18){
    //background(207, 207, 238);
    // fill(250);
    textSize(90);
    scatter_dictionary.unshift(words[0]);
      fill("#384053");
      // rotate(PI%2);
      text(scatter_dictionary[0], windowWidth/2+random(-200,240), windowHeight/2);
      console.log(scatter_dictionary);
    console.log(4);
  }



// stroke no fill big
else if (scatter_dictionary.length <= 20){
  // background(0);
  textSize(440);
  scatter_dictionary.unshift(words[0]);
  // for (let i=0; i<scatter_dictionary.length; i++){
    noFill();
    stroke("#384053");
    rotate(PI/8.0);
    text(scatter_dictionary[0], 
      windowWidth/2+100, windowHeight/2+random(-60, 100));
    console.log(scatter_dictionary);
  // }
  console.log(6);
}  

// stack text red fill blue outline
else if (scatter_dictionary.length <= 28){
  textSize(200);
  scatter_dictionary.unshift(words[0]);
  // for (let i=0; i<scatter_dictionary.length; i++){
    fill("#a0232b");
    stroke("#384053");
    strokeWeight(4);
    text(scatter_dictionary[0], 
      windowWidth/2, windowHeight/2);
    console.log(scatter_dictionary);
  // }
  console.log(6);
}  

// small lots of text blue grey
else if (scatter_dictionary.length <= 31){
  background(20,190,50);
  fill(0);
  noStroke();
  textSize(100);
  scatter_dictionary.unshift(words[0]);
  for (let i=0; i<scatter_dictionary.length; i++){
    // background(250,0,0);
    rotate(PI/8.0);
    text(scatter_dictionary.join(" ")[i,scatter_dictionary.length], windowWidth/2, windowHeight/2);
    console.log(scatter_dictionary);
  }
  console.log(7);
}

  // small lots of terminal colors
  else if (scatter_dictionary.length <= 38){
    background(0);
    fill(20,190,50);
    textSize(18);
    scatter_dictionary.unshift(words.join(" ")[0]);
    for (let i=0; i<scatter_dictionary.length; i++){
      // background(250,0,0);
      rotate(PI/8.0);
      text(scatter_dictionary.join(" "), windowWidth/2, windowHeight/2);
      console.log(scatter_dictionary);
    }
    console.log(9);
    if (scatter_dictionary.length == 38){
      scatter_dictionary=[];
    }
  }

}
