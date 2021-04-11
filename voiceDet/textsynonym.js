var myRec = new p5.SpeechRec('en-US', parseResult); // new P5.SpeechRec object
	// myRec.continuous = true; // do continuous recognition
	  myRec.interimResults = true; // allow partial recognition (faster, less accurate)

    myRec.continuous = false; // turn continuous off!
    myRec.onError = restart;
    myRec.onEnd = restart;
    myRec.interimResults = true;
    //myRec.interrupt = false;

    let serial; // variable to hold an instance of the serialport library
    let portNameLuLaptop = '/dev/tty.usbmodem14101';  // fill in your serial port name here
    let portName = '/dev/tty.usbmodemFA121';
    let inData; 

    function restart(){
        myRec.start();
    }

    let GS;
    function preload() {
      GS = loadFont('../fonts/Gill Sans.otf');
    //   PRETTY = loadFont('https://use.typekit.net/xvf7vtv.css');
    }

    var thecol;
    var canvas;

    const Y_AXIS = 1;
    const X_AXIS = 2;
    let b1, b2, c1, c2;

	function setup()
	{
        canvas = createCanvas(windowWidth, windowHeight);
        canvas.position(0,0);
        canvas.style('z-index', '-1');

		myRec.onResult = parseResult; // now in the constructor
		myRec.start(); // start engine

        //gradient colors
        b1 = color(219, 234, 254);
        b2 = color(251, 207, 232);
        c1 = color(204, 102, 0);
        c2 = color(0, 102, 153);
        setGradient(0, 0, width / 2, height, b1, b2, X_AXIS);
        setGradient(width / 2, 0, width / 2, height, b2, b1, X_AXIS);
      //serial
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
  if (avg<=10){
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

  //gradient function
      function setGradient(x, y, w, h, c1, c2, axis) {
        noFill();
      
        if (axis === Y_AXIS) {
          // Top to bottom gradient
          for (let i = y; i <= y + h; i++) {
            let inter = map(i, y, y + h, 0, 1);
            let c = lerpColor(c1, c2, inter);
            stroke(c);
            line(x, i, x + w, i);
          }
        } else if (axis === X_AXIS) {
          // Left to right gradient
          for (let i = x; i <= x + w; i++) {
            let inter = map(i, x, x + w, 0, 1);
            let c = lerpColor(c1, c2, inter);
            stroke(c);
            line(i, y, i, y + h);
          }
        }
      }

let words =  [];
var urword = "";

let stream = [[]];;
let personwords = [];

	function parseResult()
	{     
        setGradient(0, 0, width / 2, height, b1, b2, X_AXIS);
        setGradient(width / 2, 0, width / 2, height, b2, b1, X_AXIS);

          
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
        xhr.setRequestHeader("x-rapidapi-key", "d55585893cmshacd11762eca23bbp142e09jsna74478ff2108");
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
    function wordquad(){
	  	textSize(80);
      textFont(GS);
      fill("#000000");
		  textAlign(CENTER, CENTER); 
		  text(words[0].toUpperCase(),4*width/5,5*height/7);
	  	text(words[1].toUpperCase(),1*width/5,5*height/7);
		  text(words[2].toUpperCase(),4*width/5,2*height/7);
		  text(words[3].toUpperCase(),1*width/5,2*height/7);
    }

    function bigword(){
		  textSize(200);
      textFont(GS);
      fill("#FFFFFF");
      stroke("#000000");
		  textAlign(CENTER, CENTER);
		  text(words[0].toUpperCase(),width/2,height/2);
    }

    function twowordshoriz(){
		  textSize(140);
      textFont(GS);
      fill("#FFFFFF");
      stroke("#000000");
		  textAlign(CENTER, CENTER);
		  text(words[0].toUpperCase(),4*width/5,height/2);
      text(words[1].toUpperCase(),width/5,height/2);
    }

    function threewordsvert(){
		  textSize(170);
      textFont(GS);
      fill("#FFFFFF");
      stroke("#000000");
		  textAlign(CENTER, CENTER);
		  text(words[0].toUpperCase(),width/2,3*height/4);
      text(words[1].toUpperCase(),width/2,2*height/4);
      text(words[2].toUpperCase(),width/2, height/4);
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