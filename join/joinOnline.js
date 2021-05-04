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

    let GS;
    function preload() {
      GS = loadFont('../join/fonts/EuclidSquare-Light.ttf');
    //   PRETTY = loadFont('https://use.typekit.net/xvf7vtv.css');
    }

    var thecol;
    var canvas;


	function setup()
	{
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0,0);
    canvas.style('z-index', '-1');

		myRec.onResult = parseResult; // now in the constructor
		myRec.start(); // start engine
    background(0);
	}

var personCount = 0;

var within = false;
var done = false;
var i = 0;
var phoneDown = false;
var grow = 0;
var speed = 0;
var currWord = 0;


function draw(){

  if (keyIsPressed === true){
    within = true;
    phoneDown=true;
    //i=i + 1;
    grow = speed + grow;
    if (doGrow && grow<15){
      grow+=3; }
    else if (!doGrow && grow > 0) {
      grow-=3;
    }
    //console.log(grow);

    // blendMode(BLEND);
    // fill(112, 139, 176);
    // rectMode(CENTER);
    // rect(width/2, height/2, 300, 300);
    // //noStroke();
    // blendMode(MULTIPLY);
    // noStroke();
    // fill(0,0,250);
    // drawLiq(22,50,20,100, grow);
    // fill(0,250,0);
    // drawLiq(19,60,25,120, grow);
    // fill(250,0,0);
    // drawLiq(16,45,15,150, grow);
    // blendMode(BLEND);
  }
  else {
      within = false;
      done = false;
      phoneDown=false;
      fadeInEffectv1();
      fadeInEffectv2();
      //background(0);
      // rectMode(CENTER);
      // noStroke();
      // fill(112, 139, 176);
      // rect(width/4, height/2, width/3, height/3);
      //rect(3*width/4, height/2, 2*width/3, height/3);

      textSize(100);
      noStroke();
      textFont(GS);
      blendMode(BLEND);
      fill(250);
      textAlign(CENTER, CENTER);

      
      if (paragraph[currWord] !=null && paragraph[currWord+1] !=null){
        for (i = 0; i<paragraph[currWord].length; i++){
          wordLen +=1;
        }
        if (wordLen <= 5){
          textSize(50);
        }
        else if (wordLen > 5 && wordLen <=10){
          textSize(45);
        }
        else if (wordLen > 10 && wordLen <=15){
          textSize(40);
        }
        else if (wordLen > 15 && wordLen <=20){
          textSize(35);
        }
        else if (wordLen > 20 && wordLen <=25){
          textSize(30);
        }
        else if (wordLen > 25 && wordLen <=30){
          textSize(25);
        }
      text(paragraph[currWord].toUpperCase(), width/2, height/3); 
      wordLen = 0;

        for (i = 0; i<paragraph[currWord+1].length; i++){
          wordLen +=1;
        }
        if (wordLen <= 5){
          textSize(50);
        }
        else if (wordLen > 5 && wordLen <=10){
          textSize(45);
        }
        else if (wordLen > 10 && wordLen <=15){
          textSize(40);
        }
        else if (wordLen > 15 && wordLen <=20){
          textSize(35);
        }
        else if (wordLen > 20 && wordLen <=25){
          textSize(30);
        }
        else if (wordLen > 25 && wordLen <=30){
          textSize(25);
        }
      text(paragraph[currWord+1].toUpperCase(), width/2, 2*height/3); 
      wordLen = 0;
    }
    
      if (currWord<paragraph.length && frameCount%70==0){
      currWord+=2; }
      if (currWord>=paragraph.length-1) {
      currWord = 0;
      }
  }
  if (within && !done){
    fadeOutEffectv1();
    fadeOutEffectv2();
    done = true;
    if (phoneDown){
    personCount+=1;
    paragraph=[];
    console.log(personCount);
    }
  }
  }


  //windowresize handling
    function windowResized() {
        resizeCanvas(windowWidth, windowHeight);
        background(0);
      }

let synonyms =  [];
let words = [];
var synonym = "";
var paragraph = [];
//var urword = "";

let stream = [[]];;
let personwords = [];

var i = 1;
var writeonscreen = "";
var doGrow = false;

	function parseResult()
	{     
    background(0);

        const data = null;

        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        
        var mostrecentword = myRec.resultString.split(' ').pop();

        if (words[0]!=mostrecentword){ 
          words.unshift(mostrecentword);

          if (phoneDown){
            
            stream[personCount-1].push(mostrecentword);
            within = true;
            for (var i = 0; i < personCount; i++){
              stream[i]=stream[i];
              stream[personCount]=[];
            }
          }
        }
        if (words.length>5){
          words.pop()
        }


        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                // console.log(this.responseText);
                // console.log(JSON.parse(this.responseText).synonyms[0]);
                synonym = JSON.parse(this.responseText).synonyms[0];
                if (JSON.parse(this.responseText).synonyms.length == 0){
                synonym = mostrecentword;
                }
            }
        });
        
        var url1 = "https://wordsapiv1.p.rapidapi.com/words/";
        var word = mostrecentword;
        var relationship = "/synonyms";
        
        xhr.open("GET", url1+word+relationship);
        xhr.setRequestHeader("x-rapidapi-key", "d55585893cmshacd11762eca23bbp142e09jsna74478ff2108");
        xhr.setRequestHeader("x-rapidapi-host", "wordsapiv1.p.rapidapi.com");
        
        xhr.send(data);

        if (synonyms[0]!=synonym){ 
            synonyms.unshift(synonym);
            if (phoneDown){
              stream[personCount-1].push(synonym);
              within = true;
              for (var i = 0; i < personCount; i++){
                stream[i]=stream[i];
                stream[personCount]=[];
              }
              //console.log(stream);
            }
          
          }

        if (synonyms.length>5){
            synonyms.pop()
        }

        if (words[0]!=synonym && words[0]!=mostrecentword){ 
          if (phoneDown){
            i = oneOrTwo();
            if (i==1){
              paragraph.push(synonym);
            }
            else {
              paragraph.push(mostrecentword);
            }
            console.log(paragraph);
          }
        }
        else {
          writeonscreen = paragraph.join(" ");
          text(writeonscreen, 10, 10);

        }

        
        if ((typeof synonyms[1] == 'undefined' || typeof words[1] == 'undefined') || (typeof synonyms[2] == 'undefined' || typeof words[2] == 'undefined') || (typeof synonyms[3] == 'undefined' || typeof words[2] == 'undefined')){
          bigwordSyn();
          bigword();
        }
        else{
          wordfunpickerSyn();
        }
	}

    function wordfunpickerSyn(){
      let picker = Math.floor(Math.random() * 2); //random num 1 or 2
      if (picker == 0){
        return bigwordSyn(), bigword();
      }
      else{
        return threewordsvertSyn(), threewordsvert();
        
      }
    }

    //word layout functions
    var wordLen = 0;
    function bigwordSyn(){
      textFont(GS);
      fill("#FFFFFF");
      noStroke();
		  textAlign(CENTER, CENTER);
      for (i = 0; i<synonyms[0].length; i++){
        wordLen +=1;
      }
      if (wordLen <= 5){
        textSize(50);
      }
      else if (wordLen > 5 && wordLen <=10){
        textSize(45);
      }
      else if (wordLen > 10 && wordLen <=15){
        textSize(40);
      }
      else if (wordLen > 15 && wordLen <=20){
        textSize(35);
      }
      else if (wordLen > 20 && wordLen <=25){
        textSize(30);
      }
      else if (wordLen > 25 && wordLen <=30){
        textSize(25);
      }
		  text(synonyms[0].toUpperCase(),width/4,height/2);
      wordLen=0;
    }

    function threewordsvertSyn(){
      textFont(GS);
      fill("#FFFFFF");
      noStroke();
      textAlign(CENTER, CENTER);

      for (i = 0; i<synonyms[0].length; i++){
        wordLen +=1;
      }
      if (wordLen <= 5){
        textSize(50);
      }
      else if (wordLen > 5 && wordLen <=10){
        textSize(45);
      }
      else if (wordLen > 10 && wordLen <=15){
        textSize(40);
      }
      else if (wordLen > 15 && wordLen <=20){
        textSize(35);
      }
      else if (wordLen > 20 && wordLen <=25){
        textSize(30);
      }
      else if (wordLen > 25 && wordLen <=30){
        textSize(25);
      }
		  text(synonyms[0].toUpperCase(),width/4,4*height/10);

      wordLen=0;
      for (i = 0; i<synonyms[1].length; i++){
        wordLen +=1;
      }
      if (wordLen <= 5){
        textSize(50);
      }
      else if (wordLen > 5 && wordLen <=10){
        textSize(45);
      }
      else if (wordLen > 10 && wordLen <=15){
        textSize(40);
      }
      else if (wordLen > 15 && wordLen <=20){
        textSize(35);
      }
      else if (wordLen > 20 && wordLen <=25){
        textSize(30);
      }
      else if (wordLen > 25 && wordLen <=30){
        textSize(25);
      }
      text(synonyms[1].toUpperCase(),width/4,5*height/10);

      wordLen=0;
      for (i = 0; i<synonyms[2].length; i++){
        wordLen +=1;
      }
      if (wordLen <= 5){
        textSize(50);
      }
      else if (wordLen > 5 && wordLen <=10){
        textSize(45);
      }
      else if (wordLen > 10 && wordLen <=15){
        textSize(40);
      }
      else if (wordLen > 15 && wordLen <=20){
        textSize(35);
      }
      else if (wordLen > 20 && wordLen <=25){
        textSize(30);
      }
      else if (wordLen > 25 && wordLen <=30){
        textSize(25);
      }
      text(synonyms[2].toUpperCase(),width/4, 6*height/10);
      wordLen=0; 
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
       textSize(50);
     }
     else if (wordLen > 5 && wordLen <=10){
       textSize(45);
     }
     else if (wordLen > 10 && wordLen <=15){
       textSize(40);
     }
     else if (wordLen > 15 && wordLen <=20){
       textSize(35);
     }
     else if (wordLen > 20 && wordLen <=25){
       textSize(30);
     }
     else if (wordLen > 25 && wordLen <=30){
       textSize(25);
     }
     text(words[0].toUpperCase(),3*width/4,height/2);
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
       textSize(50);
     }
     else if (wordLen > 5 && wordLen <=10){
       textSize(45);
     }
     else if (wordLen > 10 && wordLen <=15){
       textSize(40);
     }
     else if (wordLen > 15 && wordLen <=20){
       textSize(35);
     }
     else if (wordLen > 20 && wordLen <=25){
       textSize(30);
     }
     else if (wordLen > 25 && wordLen <=30){
       textSize(25);
     }
     text(words[0].toUpperCase(),3*width/4,4*height/10);

     wordLen=0;
     for (i = 0; i<words[1].length; i++){
       wordLen +=1;
     }
     if (wordLen <= 5){
       textSize(50);
     }
     else if (wordLen > 5 && wordLen <=10){
       textSize(45);
     }
     else if (wordLen > 10 && wordLen <=15){
       textSize(40);
     }
     else if (wordLen > 15 && wordLen <=20){
       textSize(35);
     }
     else if (wordLen > 20 && wordLen <=25){
       textSize(30);
     }
     else if (wordLen > 25 && wordLen <=30){
       textSize(25);
     }
     text(words[1].toUpperCase(),3*width/4,5*height/10);

     wordLen=0;
     for (i = 0; i<words[2].length; i++){
       wordLen +=1;
     }
     if (wordLen <= 5){
       textSize(50);
     }
     else if (wordLen > 5 && wordLen <=10){
       textSize(45);
     }
     else if (wordLen > 10 && wordLen <=15){
       textSize(40);
     }
     else if (wordLen > 15 && wordLen <=20){
       textSize(35);
     }
     else if (wordLen > 20 && wordLen <=25){
       textSize(30);
     }
     else if (wordLen > 25 && wordLen <=30){
       textSize(25);
     }
     text(words[2].toUpperCase(),3*width/4, 6*height/10);
     wordLen=0; 
   }



    //transition from video to text... add serial code here
  function fadeOutEffectv1() {
    var fadeTarget = document.getElementById("video1");
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

function fadeInEffectv1() {
  var fadeTarget = document.getElementById("video1");
  fadeTarget.style.opacity = 1;
}

function fadeOutEffectv2() {
  var fadeTarget = document.getElementById("video2");
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

function fadeInEffectv2() {
var fadeTarget = document.getElementById("video2");
fadeTarget.style.opacity = 1;
}

function oneOrTwo(){
  var y = Math.random();
  if (y < 0.5) {
    return 0; }
  else {
    return 1; }
}

function drawLiq(vNnum,nm,sm,fcm, grow){
	push();
	rotate(frameCount/fcm);
	let dr = TWO_PI/vNnum;
	beginShape();
	for(let i = 0; i  < vNnum + 3; i++){
		let ind = i%vNnum;
		let rad = dr *ind;
		let r = height*0.3 + noise(frameCount/nm + ind) * height*0.1+grow + sin(frameCount/sm + ind)*height*0.05+grow;
		curveVertex(cos(rad)*r, sin(rad)*r);
	}
  scale(0.5, .5);
	endShape();
	pop();
   translate(width/2,height/2);

}

