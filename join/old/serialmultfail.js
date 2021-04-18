let serial; // variable to hold an instance of the serialport library
let portName = '/dev/tty.usbmodem14101';  // fill in your serial port name here
let inData; 
var portSelector; // a select menu for the port list

var locH = 0;
var locV = 0;        // location of the circle
var circleColor = 255; // color of the circle

function setup() {
  serial = new p5.SerialPort();       // make a new instance of the serialport library
  smooth();
  // serial.on('list', printList);  // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing

  // serial.list();                      // list the serial ports
  serial.open(portName);              // open a serial port
  createCanvas(400, 300);
}


function draw() {
  background(0);               // black background
  fill(circleColor);           // fill depends on the button
  ellipse(locH, locV, 50, 50); // draw the circle
}

// get the list of ports:
function printList(portList) {
  // make a select menu and position it:
  portSelector = createSelect();
  portSelector.position(10,10);
   
  // portList is an array of serial port names
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    // console.log(i + " " + portList[i]);
    // add item to the select menu:
    portSelector.option(portList[i]);
  }
  // set a handler for when a port is selected from the menu:
  portSelector.changed(openPort);
}


function openPort() {
  var thisPort = portSelector.value();
  if (thisPort != null) {
    serial.open(thisPort);
  }
}

// // get the list of ports:
// function printList(portList) {
//   // portList is an array of serial port names
//   for (var i = 0; i < portList.length; i++) {
//     // Display the list the console:
//     console.log(i + portList[i]);
//   }
// }

  function serverConnected() {
    console.log('connected to server.');
  }
   
  function portOpen() {
    console.log('the serial port opened.')
  }
   
  function serialEvent() {
    // read a string from the serial port
    // until you get carriage return and newline:
    var inString = serial.readStringUntil('\r\n');
    //check to see that there's actually a string there:
    if (inString.length > 0 ) {
      var sensors = split(inString, ',');            // split the string on the commas
      console.log("hello");

      if (sensors.length > 1) {     
        // if there are three elements
        locH = map(sensors[0], 250, 410, 0, width);   // element 0 is the locH
        locV = map(sensors[1], 250, 410, 0, height); // element 1 is the locV
        circleColor = 255 - (sensors[2] * 255);      // element 2 is the button
      }
    }
  }
   
  function serialError(err) {
    console.log('Something went wrong with the serial port. ' + err);
  }
   
  function portClose() {
    console.log('The serial port closed.');
  }