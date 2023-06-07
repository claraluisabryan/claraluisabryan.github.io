
function setup() {
    background(200);
    frameRate(10); // Attempt to refresh at starting FPS
    textList = [
    ("GENESIS"),
    ('EARTH WORKS'), 
    ('EXPIRE'), 
    ('MEMORY FULL'), 

    ('TRICKLINE'),
    ('PLASTIC | GLASS'),
    ('DISSOLVE'),
    ('REALITY'),
    ('GRID TIE'),
    ("GIVE UP"),
    ("I LOVE HIM"),
    ('WAVE POINT'),
    ("EVERYBODY"),
    ('VENMO DIAGRAM'),
    ('QUIT SMOKING!'),
    ('CODEPENDENCY'),
    ('AFFINITY'),
    ('PERFECT PERFECT BEEF'),
    ('BROKEN PROMISES'),
    ("WON'T CALLBACK"),
    ("LAST SPLASH"),
    ("FOREVER"),  ("PROMISE"),
    ("INTERCHANGE"),
    ("PROMISE"),
    ("WHAT ABOUT CHARLIE?"),
    ("GRID"),
    ("LUISA REMOVER"),
    ("I'M MOVING TOO FAST"),
    ("I'M MOVING TOO FAST")
    
  ];
  
    i=0;
    createCanvas(windowWidth, windowHeight);
    textAlign(CENTER);
  }

  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }
  
  function draw() {
    
    background(0);
    //print(textList.length);
    
    //print(frameCount);
    if (frameCount%15<1){
      if (i<textList.length-1){ 
        i+=1;
      }
      else{
        i=0;
      }
    }
    fill(350);
    textFont('Helvetica', 20, 300);
    text(textList[i], width/2, height/2);

  }