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
  textFont(venus_font);
  textAlign(CENTER);
  fill(250);
  text('Accept the prompt to allow access to your microphone. Talk out loud to your phone.', width/2, height/2);
}

function draw(){

}

//windowresize 
  function windowResized() {
      resizeCanvas(windowWidth, windowHeight);
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
    var new_shuffle_colors = shuffle(rainbow)[0];
    background(new_shuffle_colors[0]);
    fill(new_shuffle_colors[1]);
    textSize(20);
  }
  if (scatter_dictionary.length < 10){
    scatter_dictionary.unshift(words[0]);
    console.log(scatter_dictionary);
    scatter_word=scatter_dictionary[0];
    text(scatter_word, random(windowWidth/2-400, windowWidth/2+400), random(windowHeight/2-400, windowHeight/2+400));
  }
  else if (scatter_dictionary.length <= 15){
    background(0);
    fill(250);
    textSize(100);
    for (let i=0; i<scatter_dictionary.length; i++){
      text(scatter_dictionary[i], windowWidth/2, windowHeight/10 + i*200);
      console.log(i);
      console.log(scatter_dictionary);
    }
    scatter_dictionary.unshift(words[0]);
  }
  else if (scatter_dictionary.length <= 30){
    background(250,0,0);
    fill(0,0,250);
    textSize(100);
    scatter_dictionary.unshift(words[0]);
    for (let i=0; i<scatter_dictionary.length; i++){
      background(250,0,0);
      text(scatter_dictionary[0], windowWidth/2, windowHeight/2);
      console.log(i);
      console.log(scatter_dictionary);
    }
  }
  else if (scatter_dictionary.length <= 32){
    background(0,0,0);
    fill(10,0,250);
    textSize(200);
    scatter_dictionary.unshift(words[0]);
    for (let i=0; i<scatter_dictionary.length; i++){
      background(0,0,0);
      text(scatter_dictionary[0], windowWidth/2, windowHeight/2);
      console.log(i);
      console.log(scatter_dictionary);
    }
    if (scatter_dictionary.length == 32){
      scatter_dictionary=[];
    }
  }
}