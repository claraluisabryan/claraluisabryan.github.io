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
      GS = loadFont('../fonts/Gill Sans.otf');
    //   PRETTY = loadFont('https://use.typekit.net/xvf7vtv.css');
    }

    var thecol;
    var canvas;
    // var clouds;

    const Y_AXIS = 1;
    const X_AXIS = 2;
    let b1, b2, c1, c2;

	function setup()
	{
        canvas = createCanvas(windowWidth, windowHeight);
        canvas.position(0,0);
        canvas.style('z-index', '1');

		myRec.onResult = parseResult; // now in the constructor
		myRec.start(); // start engine

        //gradient colors
        b1 = color(219, 234, 254);
        b2 = color(251, 207, 232);
        c1 = color(204, 102, 0);
        c2 = color(0, 102, 153);
        setGradient(0, 0, width / 2, height, b1, b2, X_AXIS);
        setGradient(width / 2, 0, width / 2, height, b2, b1, X_AXIS);

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
	function parseResult()
	{     
        //background("#FFFFF");

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

        //var lastwords = mostrecentword.slice(mostrecentword.length-5,mostrecentword.length-1);
        if (words[0]!=urword){ 
            words.unshift(urword);}
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