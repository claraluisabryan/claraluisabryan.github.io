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
}

var canvas;
function setup(){
  //canvas init
  canvas = createCanvas(windowWidth/9*2.8, windowWidth/16*2.8);
  canvas.parent("pastWords");

  //voice rec init
  myRec.onResult = parseResult; // now in the constructor
  myRec.start(); // start engine

  background(112, 139, 176);

}

var personCount = 0;

var within = false;
var done = false;
var i = 0;
var phoneDown = false;

var serialArray = new Array(50);
var grow = 0;
var speed = 0;
var currWord = 0;
var wordLen = 0;

function draw(){
  if (keyIsPressed === true){
    within = true;
    phoneDown=true;
    grow = speed + grow;
    if (doGrow && grow<15){
      grow+=3; }
    else if (!doGrow && grow > 0) {
      grow-=3;
    }
    //console.log(grow);

    blendMode(BLEND);
    background(112, 139, 176);
    //noStroke();
    blendMode(MULTIPLY);
    noStroke();
    translate(width/2,height/2);
    fill(0,0,250);
    drawLiq(22,50,20,100, grow);
    fill(0,250,0);
    drawLiq(19,60,25,120, grow);
    fill(250,0,0);
    drawLiq(16,45,15,150, grow);
    //ellipse(width / 2, height/2, h, h);
  }
  else {
      within = false;
      done = false;
      phoneDown=false;
      textSize(100);
      noStroke();
      textFont(GS);
      blendMode(BLEND);
      fill(250);
      textAlign(CENTER, CENTER);
      background(112, 139, 176);
      if (paragraph[currWord] !=null && paragraph[currWord+1] !=null){
        for (i = 0; i<paragraph[currWord].length; i++){
          wordLen +=1;
        }
        if (wordLen <= 5){
          textSize(40);
        }
        else if (wordLen > 5 && wordLen <=10){
          textSize(35);
        }
        else if (wordLen > 10 && wordLen <=15){
          textSize(30);
        }
        else if (wordLen > 15 && wordLen <=20){
          textSize(25);
        }
        else if (wordLen > 20 && wordLen <=25){
          textSize(20);
        }
        else if (wordLen > 25 && wordLen <=30){
          textSize(15);
        }
      text(paragraph[currWord].toUpperCase(), width/2, height/3); 
      wordLen = 0;

        for (i = 0; i<paragraph[currWord+1].length; i++){
          wordLen +=1;
        }
        if (wordLen <= 5){
          textSize(40);
        }
        else if (wordLen > 5 && wordLen <=10){
          textSize(35);
        }
        else if (wordLen > 10 && wordLen <=15){
          textSize(30);
        }
        else if (wordLen > 15 && wordLen <=20){
          textSize(25);
        }
        else if (wordLen > 20 && wordLen <=25){
          textSize(20);
        }
        else if (wordLen > 25 && wordLen <=30){
          textSize(15);
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
    //fontDisplay();
    done = true;
    if (phoneDown){
      background(112, 139, 176);
      paragraph=[];
    personCount+=1;
    console.log(personCount);
    }
  }
  }
  let words =  [];
  var synonym = "";
  var paragraph = [];
  var i = 1;
  var writeonscreen = "";
  var doGrow = false;
  
function parseResult()
{     
  const data = null;
  
  var mostrecentword = myRec.resultString.split(' ').pop();


  if (words[0]!=mostrecentword){ 
      if (phoneDown){
        doGrow=true;
        words.unshift(mostrecentword);
        paragraph.push(mostrecentword);
        console.log(paragraph);

      }
      else {
        writeonscreen = paragraph.join(" ");
        text(writeonscreen, 10, 10);
        //paragraph = [];
      }
    }
    else{
      doGrow = false;
    }

  if (words.length>5){
      words.pop()
  }
}


//windowresize handling
function windowResized() {
  resizeCanvas(windowWidth/9*2.8, windowWidth/16*2.8);
  background(112, 139, 176);

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
	endShape();
	pop();
}

