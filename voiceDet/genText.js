var myRec = new p5.SpeechRec('en-US', parseResult); // new P5.SpeechRec object
	// myRec.continuous = true; // do continuous recognition
	  myRec.interimResults = true; // allow partial recognition (faster, less accurate)

    myRec.continuous = false; // turn continuous off!
    myRec.onError = restart;
    myRec.onEnd = restart;
    myRec.interimResults = true;
    //myRec.interrupt = false;

    let serial; // variable to hold an instance of the serialport library
    let portName = '/dev/tty.usbmodem14101';  // fill in your serial port name here
    let inData; 

    function restart(){
        myRec.start();
    }


// let stream = ['luisa', 'loves', 'u', 'yes', 'yes', 'pizza', 'one', 'two', 'three', 'yerba', 'is', 'caffene', 'lsdkjfks', 'sk', 
// 'yes', 'okay', 'bestie', 'yes', 'okay', 'bestie', 'yes', 'okay', 'bestie', 'yes', 'okay', 'bestie', 'yes', 'okay', 'bestie',
// 'yes', 'okay', 'bestie', 'yes', 'okay', 'bestie', 'yes', 'okay', 'bestie', 'yes', 'okay', 'bestie',
// 'okay', 'bestie', 'yes', 'okay', 'bestie', 'yes', 'okay', 'bestie',
// 'yes', 'okay', 'bestie', 'yes', 'okay', 'bestie', 'yes', 'okay', 'bestie', 'yes', 'okay', 'bestie'];

let GS;
function preload() {
  GS = loadFont('../fonts/Gill Sans.otf');
}

var canvas;
function setup(){
  //canvas init
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0);
  canvas.style('z-index', '-1');

  //voice rec init
  myRec.onResult = parseResult; // now in the constructor
  myRec.start(); // start engine

  //serial init
  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', printList);  // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing
  serial.list();                      // list the serial ports
  serial.open(portName);              // open a serial port
}

var personCount = 0;

var within = false;
var done = false;
var i = 0;
var phoneDown = false;

var serialArray = new Array(50);

function draw(){
  if (serialArray.length>30){
  serialArray.pop()
  }
  else{
  serialArray.unshift(inData);

  }
  var total = 0;
  for (var i = 0; i < serialArray.length; i++){
    total += serialArray[i];
  }
  var avg = total/serialArray.length;
  //console.log(avg);
  if (avg<=10){
    within = true;
    phoneDown=true;
    //i=i + 1;
  }
  else {
      within = false;
      done = false;
      phoneDown=false;
      fadeInEffect();
    i=0;
  }
  if (within && !done){
    fadeOutEffect();
    //fontDisplay();
    done = true;
    if (phoneDown){
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
  
function parseResult()
{     
  background(250);   
  const data = null;

  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  
  var mostrecentword = myRec.resultString.split(' ').pop();

  xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
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

  if (words[0]!=synonym && words[0]!=mostrecentword){ 
      if (phoneDown){
        i = oneOrTwo();
        if (i==1){ 
        words.unshift(synonym);
        paragraph.push(synonym); }
        else {
        words.unshift(mostrecentword);
        paragraph.push(mostrecentword);
        }
        console.log(paragraph);
      }
      else {
        writeonscreen = paragraph.join(" ");
        text(writeonscreen, 10, 10);
        paragraph = [];
      }
    }

  if (words.length>5){
      words.pop()
  }
}
 
//transition from video to text... add serial code here
function fadeOutEffect() {
  var fadeTarget = document.getElementById("target");
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
  var fadeTarget = document.getElementById("target");
  fadeTarget.style.opacity = 1;
}  

let points;
function fontDisplay(){
  displayParagraph = paragraph.join(" ").match(/.{1,40}/g);
  for (i=1; i<=displayParagraph.length; i++){
      points = GS.textToPoints(displayParagraph[i-1], 0, i*50+height/displayParagraph.length, 50, {
      sampleFactor: .2,
      simplifyThreshold: 0
    });
    for (let i = 0; i < points.length; i++) {
      let p = points[i]; 
      ellipse(p.x, p.y, 1, 1);
    }
  }
}
//reset stream as empty when phone is lifted up and also call a function on stream (saved somewhere else so it dissipates again.)

// get the list of ports:
function printList(portList) {
  // portList is an array of serial port names
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    console.log(i + portList[i]);
  }
}

function serverConnected() {
  console.log('connected to server.');
}
 
function portOpen() {
  console.log('the serial port opened.')
}

function serialEvent() {
  inData = Number(serial.read());
}
 
function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}
 
function portClose() {
  console.log('The serial port closed.');
}

//windowresize handling
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setGradient(0, 0, width / 2, height, b1, b2, X_AXIS);
  setGradient(width / 2, 0, width / 2, height, b2, b1, X_AXIS);
}

function oneOrTwo(){
  var y = Math.random();
  if (y < 0.5) {
    return 0; }
  else {
    return 1; }
}