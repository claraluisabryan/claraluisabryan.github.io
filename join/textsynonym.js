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

    // let GS;
    // function preload() {
    //   GS = loadFont('../join/fonts/EuclidSquare-Light.ttf');
    // //   PRETTY = loadFont('https://use.typekit.net/xvf7vtv.css');
    // }

    var thecol;
    var canvas;


	function setup()
	{
        canvas = createCanvas(windowWidth*.4, windowHeight*.4);
        canvas.parent("textsynonym");
        canvas.style('z-index', '-1');

		myRec.onResult = parseResult; // now in the constructor
		myRec.start(); // start engine
    background(112, 139, 176);
	}

var personCount = 0;

var within = false;
var done = false;
var i = 0;
var phoneDown = false;


function draw(){

  if (mouseIsPressed === true){
    within = true;
    phoneDown=true;
    //i=i + 1;
  }
  else {
      within = false;
      done = false;
      phoneDown=false;
      fadeInEffect()
    i=0;
  }
  if (within && !done){
    fadeOutEffect()
    done = true;
    if (phoneDown){
    personCount+=1;
    console.log(personCount);
    }
  }
  }


  //windowresize handling
    function windowResized() {
        resizeCanvas(windowWidth*.4, windowHeight*.4);
        background(112, 139, 176);
      }

let words =  [];
var urword = "";

let stream = [[]];;
let personwords = [];

	function parseResult()
	{     
    background(112, 139, 176);

        const data = null;

        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        
        var mostrecentword = myRec.resultString.split(' ').pop();

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                // console.log(this.responseText);
                // console.log(JSON.parse(this.responseText).synonyms[0]);
                urword = JSON.parse(this.responseText).synonyms[0];
                if (JSON.parse(this.responseText).synonyms.length == 0){
                urword = mostrecentword;
                }
            }
        });
        
        var url1 = "https://wordsapiv1.p.rapidapi.com/words/";
        var word = mostrecentword;
        var relationship = "/synonyms";
        
        xhr.open("GET", url1+word+relationship);
        xhr.setRequestHeader("x-rapidapi-key", "52f1a5186amshecce29a56fb039dp1b34c4jsn157612765481");
        xhr.setRequestHeader("x-rapidapi-host", "wordsapiv1.p.rapidapi.com");
        
        xhr.send(data);

        if (words[0]!=urword){ 
            words.unshift(urword);
            if (phoneDown){
              stream[personCount-1].push(urword);
              within = true;
              for (var i = 0; i < personCount; i++){
                stream[i]=stream[i];
                stream[personCount]=[];
              }
              console.log(stream);
            }
          
          }

        if (words.length>5){
            words.pop()
        }

        
        
        if (typeof words[1] == 'undefined' || typeof words[2] == 'undefined' || typeof words[3] == 'undefined'){
          bigword();
        }
        else{
          wordfunpicker();
        }
	}

    function wordfunpicker(){
      let picker = Math.floor(Math.random() * 2); //random num 1 or 2
      if (picker == 0){
        return bigword();
      }
      else{
        return threewordsvert();
      }
    }

    //word layout functions
    var wordLen = 0;
    function bigword(){
      textFont(GS);
      fill("#FFFFFF");
      noStroke();
		  textAlign(CENTER, CENTER);
      for (i = 0; i<words[0].length; i++){
        wordLen +=1;
      }
      if (wordLen <= 5){
        textSize(200);
      }
      else if (wordLen > 5 && wordLen <=10){
        textSize(180);
      }
      else if (wordLen > 10 && wordLen <=15){
        textSize(140);
      }
      else if (wordLen > 15 && wordLen <=20){
        textSize(120);
      }
      else if (wordLen > 20 && wordLen <=25){
        textSize(95);
      }
      else if (wordLen > 25 && wordLen <=30){
        textSize(75);
      }
		  text(words[0].toUpperCase(),width/2,height/2);
      wordLen=0;
    }

    function threewordsvert(){
      textFont(GS);
      fill("#FFFFFF");
      noStroke();
      textAlign(CENTER, CENTER);

      for (i = 0; i<words[0].length; i++){
        wordLen +=1;
      }
      if (wordLen <= 5){
        textSize(200);
      }
      else if (wordLen > 5 && wordLen <=10){
        textSize(180);
      }
      else if (wordLen > 10 && wordLen <=15){
        textSize(140);
      }
      else if (wordLen > 15 && wordLen <=20){
        textSize(120);
      }
      else if (wordLen > 20 && wordLen <=25){
        textSize(95);
      }
      else if (wordLen > 25 && wordLen <=30){
        textSize(75);
      }
		  text(words[0].toUpperCase(),width/2,3*height/4);

      wordLen=0;
      for (i = 0; i<words[1].length; i++){
        wordLen +=1;
      }
      if (wordLen <= 5){
        textSize(200);
      }
      else if (wordLen > 5 && wordLen <=10){
        textSize(180);
      }
      else if (wordLen > 10 && wordLen <=15){
        textSize(140);
      }
      else if (wordLen > 15 && wordLen <=20){
        textSize(120);
      }
      else if (wordLen > 20 && wordLen <=25){
        textSize(95);
      }
      else if (wordLen > 25 && wordLen <=30){
        textSize(75);
      }
      text(words[1].toUpperCase(),width/2,2*height/4);

      wordLen=0;
      for (i = 0; i<words[2].length; i++){
        wordLen +=1;
      }
      if (wordLen <= 5){
        textSize(200);
      }
      else if (wordLen > 5 && wordLen <=10){
        textSize(180);
      }
      else if (wordLen > 10 && wordLen <=15){
        textSize(140);
      }
      else if (wordLen > 15 && wordLen <=20){
        textSize(120);
      }
      else if (wordLen > 20 && wordLen <=25){
        textSize(95);
      }
      else if (wordLen > 25 && wordLen <=30){
        textSize(75);
      }
      text(words[2].toUpperCase(),width/2, height/4);
      wordLen=0;
    }


    //transition from video to text... add serial code here
  function fadeOutEffect() {
    var fadeTarget = document.getElementById("synonymHide");
    var fadeEffect = setInterval(function () {
        if (!fadeTarget.style.opacity) {
            fadeTarget.style.opacity = 1;
        }
        if (fadeTarget.style.opacity > 0) {
            fadeTarget.style.opacity -= 0.2;
        } else {
            clearInterval(fadeEffect);
        }
    }, 50);
}

function fadeInEffect() {
  var fadeTarget = document.getElementById("synonymHide");
  fadeTarget.style.opacity = 1;
}