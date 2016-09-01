var canvas;
var up, down, left, right;
var preTitleAni, titleScreenAni;
var yOff;
var wavesSurfaceNear;
var wavesSurfaceFar;
var bathySky;
var ost;
var waterFilter;
var hudCol1, hudCol2, bgCol1, bgCol2, lsCol1, lsCol2, hudDetCol1, hudDetCol2, hudDetCol3, hudDetCol4, mountCol1, mountCol2, mountCol3;
var timeOfDay;
var north, northEast, east, southEast, south, southWest, west, Northwest, northFull;
var oxygenLevel;
var scene, captureSwitch;
var pixelFont;
var deathScreenImg, radioIco, logIco, logBlank, logHeader;
var logIsUp, capturePressed, isTransmission, transmissionCaptured;
var bathyDepth;
var fullTextArray, capturedTextArray;
var captureScreenImage0, captureScreenAnimation1, captureScreenAnimation2, captureScreenAnimation3, captureScreenAnimation4, glitchAni1;
var captureSprite;
var completeText, shuffledText, capturedText, whichText, transmissionLogText;
var scrambledAudio = [];
var whichAudio;
var smallFishCoordinates = [];
var smallFishScale = [];
var bottomFeederCoordinates;
var fishAnimation1, fishAnimation2, bottomFeederAnimation, fishAnimation4;
var speckAni = [];
var speckCoordinates = [];
var starAni = [];
var starCoordinates = [];
var helmetNormalImage;
var helmetIsBlinking;
var helmetBlinkingAnimation, helmetSeaweedAnimation;
var menuImg, menuIsUp, menuScroll;
var planet, oceanFloor;
var lookingAtHelmet, lookingAtPlanet, endgame, gameOver, fallingDown, fallBegins;
var gameOverAni;
var capturedCounter, readCounter;

var shutter, shutterSound;


function preload(){
  //SOUNDS
  
  for (i=0;i<11;i++){
    scrambledAudio[i] = loadSound('BathysphereSNAPGame/assets/scrambledAudio/scrambledAudio' + (i+1) + '.mp3');
  }
  shutterSound = loadSound('BathysphereSNAPGame/assets/audio/cameraShutter.ogg');
  //IMAGES & FONT
  pixelFont = loadFont('BathysphereSNAPGame/assets/text/pixelFont.TTF');
  deathScreenImg = loadImage('BathysphereSNAPGame/assets/imageScenes/deathScreen.png');
  menuImg = loadImage('BathysphereSNAPGame/assets/images/menu.png');
  radioIco = loadImage('BathysphereSNAPGame/assets/images/radio.png');
  logIco = loadImage('BathysphereSNAPGame/assets/images/logImg.png');
  logBlank = loadImage('BathysphereSNAPGame/assets/images/logBlank.png');
  logHeader = loadImage('BathysphereSNAPGame/assets/images/logHeader.png');
  bathySky = loadImage('BathysphereSNAPGame/assets/images/bathySky.png');
  helmetNormalImage = loadImage('BathysphereSNAPGame/assets/images/helmet.png');
  planet = loadImage('BathysphereSNAPGame/assets/images/planet.png');
  oceanFloor = loadImage('BathysphereSNAPGame/assets/images/oceanFloor.png');
  
  //ANIMATIONS
  preTitleAni = loadAnimation('BathysphereSNAPGame/assets/animations/preTitleScreen/preTitle_0000.png', 'BathysphereSNAPGame/assets/animations/preTitleScreen/preTitle_0025.png');
  titleScreenAni = loadAnimation('BathysphereSNAPGame/assets/animations/titleScreen/titleScreen_0000.png', 'BathysphereSNAPGame/assets/animations/titleScreen/titleScreen_0001.png');
  captureScreenAnimation1 = loadAnimation('BathysphereSNAPGame/assets/animations/comeDown/comeDown001.png', 'BathysphereSNAPGame/assets/animations/comeDown/comeDown010.png');
  captureScreenAnimation2 = loadAnimation('BathysphereSNAPGame/assets/animations/incoming/incoming001.png', 'BathysphereSNAPGame/assets/animations/incoming/incoming002.png');
  captureScreenAnimation3 = loadAnimation('BathysphereSNAPGame/assets/animations/captured/captured001.png', 'BathysphereSNAPGame/assets/animations/captured/captured006.png');
  captureScreenAnimation4 = loadAnimation('BathysphereSNAPGame/assets/animations/comeDown/comeDown010.png', 'BathysphereSNAPGame/assets/animations/comeDown/comeDown009.png', 'BathysphereSNAPGame/assets/animations/comeDown/comeDown008.png','BathysphereSNAPGame/assets/animations/comeDown/comeDown007.png','BathysphereSNAPGame/assets/animations/comeDown/comeDown006.png','BathysphereSNAPGame/assets/animations/comeDown/comeDown005.png','BathysphereSNAPGame/assets/animations/comeDown/comeDown004.png','BathysphereSNAPGame/assets/animations/comeDown/comeDown003.png', 'BathysphereSNAPGame/assets/animations/comeDown/comeDown002.png', 'BathysphereSNAPGame/assets/animations/comeDown/comeDown001.png');
  glitchAni1 = loadAnimation('BathysphereSNAPGame/assets/animations/glitchScreen/glitch_0000.png', 'BathysphereSNAPGame/assets/animations/glitchScreen/glitch_0006.png');
  fishAnimation1 = loadAnimation('BathysphereSNAPGame/assets/animations/smallFish/smallFish001.png', 'BathysphereSNAPGame/assets/animations/smallFish/smallFish004.png');
  fishAnimation2 = loadAnimation('BathysphereSNAPGame/assets/animations/smallFish/smallFish001.png', 'BathysphereSNAPGame/assets/animations/smallFish/smallFish004.png');
  bottomFeederAnimation = loadAnimation('BathysphereSNAPGame/assets/animations/bottomFeeder/bottomFeeder_0000.png', 'BathysphereSNAPGame/assets/animations/bottomFeeder/bottomFeeder_0008.png');
  captureScreenImage0 = loadImage('BathysphereSNAPGame/assets/animations/comeDown/comeDown000.png');
  for (i=0;i<3;i++){
    speckAni[i] = loadAnimation('BathysphereSNAPGame/assets/animations/speck/speck_0001.png', 'BathysphereSNAPGame/assets/animations/speck/speck_0008.png');
  }
  for (i=0;i<5;i++){
    starAni[i] = loadAnimation('BathysphereSNAPGame/assets/animations/stars/stars_0000.png', 'BathysphereSNAPGame/assets/animations/stars/stars_0007.png');
  }
  helmetBlinkingAnimation = loadAnimation('BathysphereSNAPGame/assets/animations/blinking/blinking_0000.png', 'BathysphereSNAPGame/assets/animations/blinking/blinking_0014.png');
  helmetSeaweedAnimation = loadAnimation('BathysphereSNAPGame/assets/animations/helmetSeaweed/helmetSeaweed_0000.png', 'BathysphereSNAPGame/assets/animations/helmetSeaweed/helmetSeaweed_0005.png');
  gameOverAni = loadAnimation('BathysphereSNAPGame/assets/animations/gameOverScreen/gameOver_0000.png', 'BathysphereSNAPGame/assets/animations/gameOverScreen/gameOver_0016.png');
  //TEXT
  completeText = loadStrings('BathysphereSNAPGame/assets/text/bathyCompleteText.txt');
  
}
                                                                                                      // SETUP
function setup() {
  yOff = 0;
  wavesSurfaceNear = 42;
  wavesSurfaceFar = 74;


  canvas = createCanvas(64, 64);
  frameRate(40);
  noSmooth();
  //SCENE BOOLEANS
  scene = 6;
  captureSwitch = 0;
  whichAudio = 0;
  menuScroll = 0;
  logIsUp = false;
  capturePressed = false;
  isTransmission = false;
  transmissionCaptured = false;
  endgame = false;
  fallingDown = false;
  lookingAtHelmet = false;
  lookingAtPlanet = false;
  gameOver = false;
  up = false;
  down = false;
  left = false;
  right = false;
  bathyDepth = 32;
  fallBegins = 0;
  capturedCounter = 0;
  readCounter = 0;
  shutter = 0;
  
  ost = loadSound('BathysphereSNAPGame/assets/audio/bathysphere_ost.mp3');
  //ost.stop();
  waterFilter = new p5.Filter('lowpass');
  
  
  //COLORS
  hudCol1 = color(33, 36, 42, 255);
  
  hudCol2 = color(56, 80, 79, 255);
  hudDetCol1 = color(150, 25, 29, 255);
  hudDetCol2 = color(244, 222, 32, 255);
  hudDetCol3 = color(30, 88, 51, 255);
  hudDetCol4 = color(245, 227, 169, 255);
  lsCol1 = color(28, 91, 187, 255);
  lsCol2 = color(97, 141, 191, 255);
  bgCol1 = color(158, 159, 141, 255);
  bgCol2 = color(231, 232, 227, 255);
  mountCol1 = lsCol2;
  mountCol2 = lerpColor(lsCol2, lsCol1, 0.2);
  mountCol3 = lerpColor(lsCol2, lsCol1, 0.3);
  
  timeOfDay = 'morning';
  
  //CARDINAL DIRECTIONS
  north = 0;
  northEast = HALF_PI/2;
  east = HALF_PI;
  southEast = 3*PI/4;
  south = PI;
  southWest = 5*PI/4;
  west = 3*TWO_PI/4;
  northWest = 7*TWO_PI/8;
  northFull = TWO_PI;
  
  //OXYGEN
  oxygenLevel = 100;
  
  //TEXT
  shuffledText = [];
  capturedText = [];
  transmissionLogText = "";
  whichText = 0;
  
  //SPRITES
  captureSprite = createSprite(38, 5, 48, 11);
  captureSprite.addImage('away', captureScreenImage0);
  captureSprite.addAnimation('comeDown', captureScreenAnimation1);
  captureSprite.addAnimation('incoming', captureScreenAnimation2);
  captureSprite.addAnimation('captured', captureScreenAnimation3);
  captureSprite.addAnimation('goUp', captureScreenAnimation4);
  captureSprite.addAnimation('glitch', glitchAni1);
  
}
                                                                                                 // DRAW
function draw() {

  
  switch(scene){
    
                                                 // case 0 : Randomizer & Re-Setter!
    case 0 :
      
      ost.stop();
      preTitleAni.rewind();
      menuIsUp = false;
      logIsUp = false;
      helmetIsBlinking = false;
      bathysphere.instruments.scroll = 0;
      oxygenLevel = 100;
      shuffledText = shuffle(completeText);
      
      while(capturedText.length > 0){
        capturedText = shorten(capturedText);
      }
      transmissionLogText = '';
      
      //RANDOMIZE MOUNTAINS
      for (i=0; i<8; i++){
    
        mountains.xMount[i] = i*12;
        mountains.xMount[i+8] = (i+8)*12;
        mountains.numMount[i] = floor(random(0, 4));
        mountains.numMount[i+8] = mountains.numMount[i];
        mountains.sizeMount[i] = int(random(0, 30));
        mountains.sizeMount[i+8] = mountains.sizeMount[i];
      }
      
      //RANDOMIZE FISH
      for (i=0;i<12;i++){
        smallFishCoordinates[i] = createVector(floor(random(0, 192)), floor(random(80, 256-32)));
        smallFishCoordinates[i+12] = createVector(smallFishCoordinates[i].x + 192, smallFishCoordinates[i].y);
        smallFishScale[i] = random(0.2, 1);
        smallFishScale[i+12] = smallFishScale[i];
      }
      bottomFeederCoordinates = createVector(floor(random(96, 160)), floor(random(235, 245)));
      //RANDOMIZE SPECKS
      for (i=0;i<100;i++){
        speckCoordinates[i] = createVector(floor(random(0, 192)), floor(random(70, 256)));
        speckCoordinates[i+100] = createVector(speckCoordinates[i].x + 192, speckCoordinates[i].y);
      }
      //RANDOMIZE STARS
      for (i=0;i<100;i++){
        starCoordinates[i] = createVector(floor(random(0, 192)), floor(random(32, 192)));
        starCoordinates[i+100] = createVector(starCoordinates[i].x + 192, starCoordinates[i].y);
      }
      ost.loop();
      ost.disconnect();
      ost.connect(waterFilter);
      
      scene = 1;
      break;
                                                 // case 1 : PRE TITLE
    case 1 :
      
      camera.off();
      preTitleScreen();
      
      break;
                                                 // case 2 : TITLE
    case 2 :
      
      camera.on();
      titleScreen();
      break;
      
                                                 // case 3 : GAME
    case 3 :
      
      camera.on();
        if (!endgame){
          sky();

          for (i=0;i<mountains.xMount.length;i++){
            if (mountains.numMount[i] == 1){
              push();
                mountains.drawMountains(mountains.xMount[i], mountains.numMount[i], mountains.sizeMount[i]);
              pop();
            }
          }
          
          for (i=0;i<mountains.xMount.length;i++){
            if (mountains.numMount[i] == 2){
              push();
                mountains.drawMountains(mountains.xMount[i], mountains.numMount[i], mountains.sizeMount[i]);
              pop();
            }
          }
          for (i=0;i<mountains.xMount.length;i++){
            if (mountains.numMount[i] == 3){
              push();
                mountains.drawMountains(mountains.xMount[i], mountains.numMount[i], mountains.sizeMount[i]);
              pop();
            }
          }
        }
        
        underWaterBG();
        fishies();
        speckDraw();
        noiseMover();
        waves();
        menu();
        
        
        //ENDGAME & HELMET
        space.drawStars();
        helmet();
        space.drawPlanet();
        
      
        bathysphere.rotateBathysphere();
        bathysphere.descend();
       
      camera.off();
        if (!menuIsUp){
          bathysphere.drawEye();
          bathysphere.instruments.compass();
          bathysphere.instruments.depthMeter();
          bathysphere.oxygenLevelHandler();
          bathysphere.instruments.oxygenMeter();
          bathysphere.instruments.radioLog();
          bathysphere.instruments.logView();
          transmitter();
          bathysphere.instruments.transmissionCapture();
          drawSprites();
        }
        menu();
        
        if (gameOver){
          scene = 5;
        }
        snapshotControl();
        
        
       break;
                                                 // case 4 : DEATH
    case 4 :
      camera.off();
      deathScreen();
      
      break;
                                                 // case 4 : GAME OVER
    case 5 :
      camera.off();
      gameOverScreen();
      
      break;
                                                     // case 4 : LOADING
    case 6 :
      camera.off();
      loadingScreen();
      drawSprites();
      
      if (ost.isLoaded()){
        scene = 0;
      }
      break;
      
    default :
    
      background(bgCol1);
      fill(hudCol1);
      textSize(10);
      textAlign(CENTER);
      text('bathysphere', 32, 32);
      
  }
  
  musicFilterer();
}
                                                                                                      // SKY
function sky(){
  var skyTop1 = color(97, 141, 191, 255);
  var skyBottom1 = color(231, 232, 227, 255);
  var skyTop2 = color(97, 141, 191, 255);
  if (timeOfDay == 'morning'){
    var skyBottom2 = hudDetCol1;
  }
  
  push();

    push();
      
      //SOLID
      image(bathySky, 0, 0);
      
      //POINTS
      for (i=1;i<20;i+=2){
        var pointSpacing = int(map(i, 1, 20, 1, 8));
        for (j=1;j<192;j+=pointSpacing){
          var skyLerpy1 = constrain(map(i, 1, 20, 0.4, 1), 0.4, 1);
          push();
            stroke(lerpColor(skyBottom1, skyTop1, skyLerpy1));
            point(j, i);
          pop();

        }
      }
      
      for (i=1;i<20;i+=2){
        var pointSpacing2 = int(map(i, 1, 20, 1, 8));
        for (j=193;j<256;j+=pointSpacing2){
          var skyLerpy2 = constrain(map(i, 1, 20, 0.4, 1), 0.4, 1);
          push();
            stroke(lerpColor(skyBottom1, skyTop1, skyLerpy2));
            point(j, i);
          pop();
          
        }
      }
      
    pop();
    
  pop();
}
                                                                                                      // MOUNTAINS
var mountains = {
  xMount : [],
  numMount : [],
  sizeMount : [],
  
  drawMountains :
      function(x, num, size){
        push();
          translate(x-32, 48);
          if (num <= 0){
            
          } else if (num == 1){
            push();
              //stroke(hudCol1);
              noStroke();
              fill(mountCol1);
              quad(x, 0, x+20, -size, x+35, -size/3, x+50, 0);
            pop();
          } else if (num == 2){
            push();
              //stroke(lsCol2);
              noStroke();
              fill(mountCol2);
              quad(x, 0, x+10, 0-size, x+50, -(3*size/4), x+70, 0);
            pop();
          } else if (num == 3){
            push();
              //stroke(lsCol2);
              noStroke();
              fill(mountCol3);
              triangle(x+10, 0, x+30, -(2*size/3), x+60, 0);
              triangle(x, 0, x+20, -size, x+50, 0);
            pop();
          } else if (num >= 4){
            
          }
        stroke(255);
        pop();
      }
  
}

                                                                                                      // WAVES
function waves(){
  var pov = constrain(map(camera.position.y, 32, 74, 10, 30), 10, 30);
  var surfaceFar = constrain(map(camera.position.y, 32, 80, 40, 45), 40, 45);
  var surfaceNear = constrain(map(camera.position.y, 32, 80, 74, 50), 50, 74);
  var xOff = 0;
  var wavCol1 = color(97, 141, 191, 255);
  var wavCol2 = color(231, 232, 227, 255);
  
  push();
    stroke(lsCol1);
    beginShape();
    for(i=-32;i<256;i+=5){
      for(j=surfaceFar;j<surfaceNear;j+=j/pov){
        var xNoise1 = int(noise(xOff, yOff) * 10);
        var yNoise1 = int(noise(yOff, xOff) * 10);
        var xNoise2 = int(noise(xOff, yOff));
        var yNoise2 = int(noise(yOff, xOff));
        var xNoise3 = int(noise(xOff + 1, yOff + 2) * 20);
        var yNoise3 = int(noise(yOff + 1, xOff + 2) * 20);
        var wavLerp2 = constrain(map(yNoise1, 0, 10, 0, 1), 0, 1);
        var x1 = i + xNoise1;
        var y1 = j + yNoise1;
        var x2 = i + 5 + xNoise1;
        var y2 = j + yNoise1;
        fill(lerpColor(wavCol1, wavCol2, wavLerp2));
        
        vertex(x1, y1);
        vertex(x2, y2);
        
        xOff += 0.005;
      }
      
    }
    endShape();
  pop();
}

                                                                                                      // UNDERWATER BG
function underWaterBG(){
  var depthLineCol1 = color(33, 36, 42, 255);
  var depthLineCol2 = color(33, 36, 42, 0);
  var pointsCol1 = color(231, 232, 227, 255);
  var pointsCol2 = color(97, 141, 191, 255);
  image(oceanFloor, 0, 224);
  push();
    noStroke();
      fill(lsCol1);
    rect(0, 48, 256, 176);
  pop();
  
  push();
    
    for (i=250;i>80;i-=350/(i)){
      if (i<210){
        var lerpy = constrain(map(i, 79, 210, 0, 0.9), 0, 1);
      } else if (i>=210){
        var lerpy = constrain(map(i, 210, 250, 0.9, 0), 0, 1);
      }
      stroke(lerpColor(depthLineCol2, depthLineCol1, lerpy));
      line(0, i, 256, i);
    }
  pop();
  
}
                                                                                                      // FISHIES!!!
function fishies(){
  var bottomFeederMove = 0;
  
  for (i=0;i<smallFishCoordinates.length;i+=2){
    if (smallFishCoordinates[i].y < 230){
      push();
        translate(smallFishCoordinates[i].x, smallFishCoordinates[i].y);
        scale(smallFishScale[i]);
        animation(fishAnimation1, 0, 0);
      pop();
      fishAnimation1.frameDelay = 200;
    }
  }
  
  for (i=1;i<smallFishCoordinates.length;i+=2){
    if (smallFishCoordinates[i].y < 230){
      push();
        translate(smallFishCoordinates[i].x, smallFishCoordinates[i].y);
        scale(smallFishScale[i]);
        animation(fishAnimation2, 0, 0);
      pop();
      fishAnimation2.frameDelay = 270;
    }
  }
  
  push();
  translate(bottomFeederCoordinates.x + bottomFeederMove, bottomFeederCoordinates.y);
  if (bottomFeederAnimation.getFrame() >= 4){
    translate(-1, 1);
  } else if (bottomFeederAnimation.getFrame() < 1){
    translate(-1, 0);
  }
  if (bottomFeederCoordinates.x < 160){
    if(frameCount%1000 == 0){
      bottomFeederMove++;
    }
  }
  
  animation(bottomFeederAnimation, 0, 0);
  bottomFeederAnimation.frameDelay = 75;
  pop();
  
}

                                                                                                      // SPECKS
function speckDraw(){
  for (i=0;i<speckCoordinates.length;i+=3){
    push();
      translate(speckCoordinates[i].x, speckCoordinates[i].y);
      rotate(i*2);
      animation(speckAni[0], 0, 0);
      speckAni[0].frameDelay = 1005;
    pop();
  }
  for (i=1;i<speckCoordinates.length;i+=3){
    push();
      translate(speckCoordinates[i].x, speckCoordinates[i].y);
      rotate(i);
      animation(speckAni[1], 0, 0);
      speckAni[1].frameDelay = 1521;
    pop();
  }
  for (i=2;i<speckCoordinates.length;i+=3){
    push();
      translate(speckCoordinates[i].x, speckCoordinates[i].y);
      rotate(i/2);
      animation(speckAni[2], 0, 0);
      speckAni[2].frameDelay = 850;
    pop();
  }
}
                                                                                                      // BATHYSPHERE
var bathysphere = {
  inSpace : false,
  xOff : 0,
  rotateBathysphere : 
        function (){
          //camera.position.x = constrain(camera.position.x, 32, 256 - 32);
          if (camera.position.x > 256-32){
            camera.position.x = 32;
          }
          if (camera.position.x < 32){
            camera.position.x = 256-32;
          }
          if (keyIsPressed){
            
            if (right){
              camera.position.x += 1;
            }
            
            if (left){
              camera.position.x -= 1;
            }
          }
        },
  
  drawEye : 
        function (){
          push();
            
            strokeWeight(1);
            noFill();
            for (i=60;i<100;i+=0.5){
              stroke(hudCol1);
              ellipse(32, 32, i, i);
            }
  
          pop();
          push();
          noFill();
            if (oxygenLevel > 10){
                stroke(hudCol1);
              } else if (oxygenLevel <=10){
                if (frameCount%50 < 25){
                  stroke(hudDetCol1);
                } else {
                  stroke (hudCol1);
                }
              }
            ellipse(32, 32, 60, 60);
            ellipse(32, 32, 61, 61);
            ellipse(32, 32, 65, 65);
            ellipse(32, 32, 66, 66);
          pop();
        },
  
  descend :
        function (){
          bathyDepth = camera.position.y;
          if (!endgame){
            camera.position.y = constrain(camera.position.y, 32, 256 - 32);
          } else if (endgame && bathysphere.inSpace){
            camera.position.y = constrain(camera.position.y, 288, 416);
          }
          if (fallingDown){
            bathysphere.xOff+=0.02
            if (camera.position.y < 272){
              camera.position.y = lerp(camera.position.y, 280, 0.01) + floor(random(-2, 3));
              camera.position.x = camera.position.x + floor(random(-1, 2));
            } else if (camera.position.y >= 272 && camera.position.y < 288){
              camera.position.y = lerp(camera.position.y, 290, 0.01) + floor(random(-2, 3));
              camera.position.x = camera.position.x + floor(random(-2, 3));
            } else if (camera.position.y >= 288 && camera.position.y < 350){
              camera.position.y = lerp(camera.position.y, 360, 0.01) + floor(random(-2, 3));
              camera.position.x = camera.position.x + floor(random(-2, 2));
            } else if (camera.position.y >= 350 && camera.position.y < 390){
              camera.position.y = lerp(camera.position.y, 390, 0.01) + floor(random(-1, 2));
              camera.position.x = camera.position.x + floor(random(-1, 2));
            }
          }
          if (camera.position.y > 380){
            fallingDown = false;
          }
          if (camera.position.y > 314){
              bathysphere.inSpace = true;
            }
          push();
            if (!logIsUp && !menuIsUp){
              if (keyIsPressed){
                if (down){
                  camera.position.y += 0.2;
                } 
                if (up){
                  camera.position.y -= 0.2;
                }
                // if (keyCode == 91){
                //   camera.position.y += 5;
                // }
                // if (keyCode == 93){
                //   camera.position.y -= 5;
                // }
              }
            }
            
            
          pop();
        },
        
                                                                                                          // O2 LEVEL HANDLER
  oxygenLevelHandler :
        function(){
          if (!endgame){
            if (camera.position.y <= 80){
              if (oxygenLevel < 100){
                oxygenLevel += 0.5
              } else {
                oxygenLevel = 100;
              }
            } else if (camera.position.y > 80  && !menuIsUp){
              if (oxygenLevel > 0){
                oxygenLevel -= 0.03;
              } else {
                oxygenLevel = 0;
              }
            } else {
              oxygenLevel = 100;
            }
            
          } else if (endgame){
              oxygenLevel = map(noise(bathysphere.xOff, yOff), 0, 1, 5, 100);
            if (frameCount%10 == 0){
              bathysphere.xOff += 0.02;
            }
          }
          
          // if (keyIsPressed){
          //   if (keyCode == BACKSPACE){
          //     oxygenLevel = 20;
          //   }
          // }
          if (int(oxygenLevel) === 0){
            ost.stop();
            scrambledAudio[whichAudio].stop();
            scene = 4;
          }
        },
                                                                                                      // INSTRUMENTS
  instruments : {
    scroll : 0,    
    xOff : 0,
    //COMPASS
    compass : function(){
      var rotationAngle;
      var cameraRotation;
      if (!endgame){
        cameraRotation = constrain(map(camera.position.x, 32, 256 - 32, 0, northFull), 0, northFull);
      } else if (endgame){
          cameraRotation = map(noise(bathysphere.instruments.xOff, yOff), 0, 1, 0, northFull);
        if (frameCount %5 == 0){
          bathysphere.instruments.xOff +=0.001;
        }
      }
      angleMode(RADIANS);
      push();
        //CIRCLE
        push();
          ellipseMode(CORNER);
          noStroke();
          fill(bgCol2);
          ellipse(1, 1, 11, 11);
        pop();
        //NEEDLE
        push();
          strokeCap(SQUARE);
          translate(6, 6);
          rotate(cameraRotation);
          stroke(hudCol1);
          line(0, -4, 0, 0);
        pop();
        // NORTH
        push();
          stroke(hudDetCol1);
          noFill();
          translate(6, 6);
          point(0, -5);
        pop();
        //POINTS
        push();
          stroke(hudCol1);
          translate(6, 6);
          point(5, 0);
          point(0, 5);
          point(-5, 0)
        pop();
        
      pop();
    },
                                                                                     //DEPTH METER
    depthMeter : function(){
      
      var depth;
      if (!endgame){
        depth = int(constrain(map(camera.position.y, 32, 256-32, -11, -2), -11, -2));
      } else if (endgame){
        bathysphere.instruments.xOff+=0.05;
        depth = map(noise(bathysphere.instruments.xOff, yOff), 0, 1, -11, -2);
      }
      push();
        translate(0, 64);
        fill(hudCol2);
        noStroke();
        rect(2, -1, 7, -10);
      pop();
      push();
        translate(5, 64);
        noFill();
        stroke(hudDetCol4);
        line(0, -3, 0, -10);
      pop();
      push();
        translate(5, 64);
        noFill();
        stroke(hudDetCol4);
        point(-2, -3);
        point(2, -3);
        point(-2, -5);
        point(2, -5);
        point(-2, -7);
        point(2, -7);
        point(-2, -9);
        point(2, -9);
      pop();
      push();
        translate(5, 64);
        noFill();
        strokeCap(SQUARE);
        stroke(hudDetCol2);
        line(-3, depth, 3, depth);
      pop();
      
    },
                                                                                     //OXYGEN METER
    oxygenMeter : function(){
      needleRotate = constrain(map(oxygenLevel, 0, 100, north, south), north, south);
      //METER BG
      push();
        translate(64-8, 64-2);
        noStroke();
        if (oxygenLevel > 45){
          fill(hudDetCol4);
        } else if (oxygenLevel > 25 && oxygenLevel <= 45){
          if (frameCount%50 < 25){
            fill (hudDetCol2);
          } else {
            fill (hudDetCol4);
          }
        } else if (oxygenLevel <= 25){
          if (frameCount%50 < 25){
            fill (hudDetCol1);
          } else {
            fill(hudDetCol4);
          }
        }
        arc(0, 1, 13, 14, south, north, CHORD);
        
      pop();
      //LAST 40%
      push();
        translate(64-8, 64-2);
        noStroke();
        fill(hudDetCol1);
        arc(0, 0, 10, 10, south, southWest + 0.2, PIE);
      pop();
      //NEEDLE
      push();
        translate(64-7, 64-2);
        noFill();
        stroke(hudCol1);
        rotate(needleRotate);
        line(0, 0, -5, 0);
      pop();
    },
                                                                                     //RADIO & LOG ICONS
    radioLog : function(){
      push();
      translate(64, 0);
        if (camera.position.y < 80){
          push();
          translate(-1, constrain(map(camera.position.y, 74, 79, 6, 1), 1, 6));
          rotate(PI);
          if (readCounter == capturedText.length){
            noTint();
          } else if (readCounter < capturedCounter){
            if (frameCount%20 < 5){
              tint(30, 88, 51);
            } else {
              noTint();
            }
          }
          image(logIco, 0, 0);
          pop();
        } else if (camera.position.y >= 80){
          image(radioIco, constrain(map(camera.position.y, 80, 93, -2, -15), -15, -2), -2);
        }

          push();
            translate(0, int(constrain(map(camera.position.y, 74, 81, 0, 6), 0, 6)));
            stroke(bgCol1);
            fill(bgCol2);
            rect(-11, 7, 10, 6);
          pop();
          push();
            translate(0, int(constrain(map(camera.position.y, 74, 81, 0, 6), 0, 6)));
            textFont(pixelFont);
            fill(hudCol1);
            noStroke();
            textSize(8);
            textAlign(LEFT, TOP);
            if (capturedText.length < 10){
              capturedCounter = ('0' + capturedText.length);
            } else if (capturedText.length >= 10){
              capturedCounter = (capturedText.length);
            }
            text(capturedCounter, -10, 5);
          pop();
        pop();
      pop();
    },
                                                                                     //LOG VIEW   
    logView : function(){
      if (logIsUp){
        readCounter = capturedText.length;
        background(bgCol2);
        
        push();
          if (keyIsPressed){
            if (down){
              if (bathysphere.instruments.scroll > -2040)
              bathysphere.instruments.scroll -= 2;
            }
            if (up){
              if (bathysphere.instruments.scroll < 0){
                bathysphere.instruments.scroll += 2;
              }
            }
          }
          
          translate(0, bathysphere.instruments.scroll);
          for(i=0;i<2096;i+=64){
            image(logBlank, 0, i);
          }
            image(logHeader, 0, 0);
            
          textFont(pixelFont);
          noStroke();
          fill(hudCol1);
          textSize(8);
          textAlign(LEFT);
          text(transmissionLogText, 7, 64, 60, 2000);

      }
        pop();
    },
                                                                                 //TRANSMISSION CAPTURE   
    transmissionCapture : function(){
      
      if (!capturePressed){
        captureSprite.changeAnimation('away');
      }
        switch(captureSwitch){
          case 0:
            if (isTransmission){
              if(helmetIsBlinking && lookingAtHelmet){
                whichAudio = scrambledAudio.length-1;
              } else if (endgame && lookingAtPlanet){
                whichAudio = scrambledAudio.length-1;
              } else {
                whichAudio = int(random(0, scrambledAudio.length-2));
              }
              scrambledAudio[whichAudio].loop();
              captureSprite.changeAnimation('comeDown');
              captureSprite.animation.rewind();
              
              if(helmetIsBlinking && lookingAtHelmet){
                captureSwitch = 6;
              } else {
              captureSwitch = 1;
              }
              
              if (endgame){
                captureSwitch = 6;
              }
            }
            break;
            
          case 1:
            push();
              captureSprite.changeAnimation('comeDown');
              captureSprite.animation.play();
              captureSprite.animation.frameDelay = 2;
              captureSprite.animation.looping = false;
              if (captureSprite.animation.getFrame() == 9){
                captureSwitch = 2;
              }
            pop();
            break;
          case 2:
            push();
              captureSprite.changeAnimation('incoming');
              captureSprite.animation.frameDelay = 20;
              captureSprite.animation.looping = true;
            pop();
            
            if (capturePressed){
              captureSprite.changeAnimation('captured');
              captureSprite.animation.rewind();
              captureSwitch = 3;
            }
            
            if (!isTransmission){
              captureSprite.changeAnimation('goUp');
              captureSprite.animation.rewind();
              captureSwitch = 4
            }
            break;
          
          case 3:
            push();
              captureSprite.changeAnimation('captured');
              captureSprite.animation.frameDelay = 40;
              captureSprite.animation.looping = false;
            pop();
            
            if (captureSprite.animation.getFrame() == 5){
              captureSprite.changeAnimation('goUp');
              captureSprite.animation.rewind();
              //TEXT CAPTURE
              append(capturedText, shuffledText[shuffledText.length-1]);
              shuffledText = shorten(shuffledText);
              transmissionLogText = join(capturedText, '\n \n');
              captureSwitch = 4;
            }
            break;
            
          case 4:
            push();
              captureSprite.changeAnimation('goUp');
              captureSprite.animation.frameDelay = 2;
              captureSprite.animation.looping = false;
              
              if (captureSprite.animation.getFrame() == 9){
                captureSwitch = 5;
              }
            pop();
            
            break;
          case 5:
            push();
              scrambledAudio[whichAudio].stop();
              transmissionCaptured = true;
              capturePressed = false;
              captureSwitch = 0;
            pop();
            
            break;
          //GLITCH TO ENDGAME
          case 6:
            push();
              captureSprite.changeAnimation('comeDown');
              captureSprite.animation.play();
              captureSprite.animation.frameDelay = 2;
              captureSprite.animation.looping = false;
              if (captureSprite.animation.getFrame() == 9){
                captureSwitch = 7;
              }
            pop();
            break;
          case 7:
            push();
              captureSprite.changeAnimation('glitch');
              captureSprite.animation.frameDelay = 5;
              captureSprite.animation.looping = true;
            pop();
            
            if (capturePressed){
              if (!endgame){
                fallBegins = frameCount;
                fallingDown = true;
                endgame = true;
              } else if (endgame){
                scrambledAudio[whichAudio].stop();
                gameOver = true;
              }
              captureSwitch = 4;
            }
            if (!isTransmission){
              captureSprite.changeAnimation('goUp');
              captureSprite.animation.rewind();
              captureSwitch = 4;
            }
            break;
            
          default:
          
            break;
        }

      
    }
  }
}

                                                                                                      // HELMET && OCEAN BOTTOM
function helmet(){

  if(!endgame){
    if (capturedText.length < 7){
      helmetIsBlinking = false;
      push();
      translate(64, 192);
      image(helmetNormalImage, 0, 0);
      animation(helmetSeaweedAnimation, 16, 32);
      helmetSeaweedAnimation.frameDelay = 100;
      pop();
    } else if (capturedText.length >= 7){
      helmetIsBlinking = true;
      push();
      translate(80, 224);
      animation(helmetBlinkingAnimation, 0, 0);
      helmetBlinkingAnimation.frameDelay = 4;
      animation(helmetSeaweedAnimation, 0, 0);
      helmetSeaweedAnimation.frameDelay = 100;
      pop();
    }
  } else if (endgame){
    push();
      translate(64, 192)
      image(helmetNormalImage, 0, 0);
    pop();
    push();
      translate(80, 224);
      animation(helmetBlinkingAnimation, 0, 0);
      helmetBlinkingAnimation.frameDelay = 4;
      animation(helmetSeaweedAnimation, 0, 0);
      helmetSeaweedAnimation.frameDelay = 100;
      pop();
  }
  
  if (helmetIsBlinking && camera.position.y > 192 && camera.position.x > 64 && camera.position.x < 192){
    lookingAtHelmet = true;
  }
  
}
                                                                                                      // SPACE
var space = {
  
  drawStars : function(){  

    if (endgame){
      push();
      
        translate(0, 256);
        
        //THE DEEP
        push();
          fill(0);
          rect(0, 32, 256, 192);
        pop();
        
        //STARS
      
      for (i=0;i<starCoordinates.length;i+=4){
        push();
          translate(starCoordinates[i].x, starCoordinates[i].y);
          rotate(i*2);
          animation(starAni[0], 0, 0);
          starAni[0].frameDelay = 1005;
        pop();
      }
      
      for (i=1;i<starCoordinates.length;i+=4){
        push();
          translate(starCoordinates[i].x, starCoordinates[i].y);
          rotate(i);
          animation(starAni[1], 0, 0);
          starAni[1].frameDelay = 1521;
        pop();
      }
      
      for (i=2;i<starCoordinates.length;i+=4){
        push();
          translate(starCoordinates[i].x, starCoordinates[i].y);
          rotate(i/2);
          animation(starAni[2], 0, 0);
          starAni[2].frameDelay = 850;
        pop();
      }
      
      for (i=3;i<starCoordinates.length;i+=4){
        push();
          translate(starCoordinates[i].x, starCoordinates[i].y);
          rotate(i/2);
          animation(starAni[3], 0, 0);
          starAni[3].frameDelay = 300;
        pop();
      }
      
    pop();
      
    }
  },
  
  drawPlanet : function(){
      //PLANET
      if (camera.position.y > 390 && camera.position.x > 64 && camera.position.x < 192){
        lookingAtPlanet = true;
      }
    push();
      translate(0, 265);
      image(planet, 64, 128);
      
    pop();
  }
  
}
                                                                                            
                                                                                                      // MUSIC FILTERER
function musicFilterer(){
  var frequency;
  var resonance = 0;
  if (camera.position.y <=80){
    frequency = 22000; 
  }else if (camera.position.y > 80){
    frequency = int(map(camera.position.y, 80, 256-32, 800, 90));
  } else {
    frequency = 22000;
  }
  waterFilter.freq(frequency);
  waterFilter.res(10);
}

                                                                                                      // TRANSMITTER
function transmitter(){
  if (!endgame){
    if (bathyDepth > 128 && frameCount%800 == 0 && !isTransmission && !transmissionCaptured && shuffledText.length > 0){
      isTransmission = true;
    } else if (transmissionCaptured || bathyDepth < 80){
      isTransmission = false;
    }
  } else if (endgame && !lookingAtPlanet){
    isTransmission = false
  } else if (endgame && lookingAtPlanet && frameCount%250 == 0){
    isTransmission = true;
  }
  
  if (!isTransmission){
    transmissionCaptured = false;
  }
  
  if (bathyDepth > 380 && endgame && transmissionCaptured){
    transmissionCaptured = false;
  }
}
                                                                                                      // PRE-TITLE SCREEN
function preTitleScreen(){
  animation(preTitleAni, 32, 32);
  preTitleAni.looping = false;
  preTitleAni.frameDelay = 10;
  if (preTitleAni.getFrame() == 24){
    scene = 2;
  }
}
                                                                                                      // TITLE SCREEN
function titleScreen(){
  sky();
    for (i=0;i<mountains.xMount.length;i++){
      if (mountains.numMount[i] == 1){
        push();
          mountains.drawMountains(mountains.xMount[i], mountains.numMount[i], mountains.sizeMount[i]);
        pop();
      }
    }
    
    for (i=0;i<mountains.xMount.length;i++){
      if (mountains.numMount[i] == 2){
        push();
          mountains.drawMountains(mountains.xMount[i], mountains.numMount[i], mountains.sizeMount[i]);
        pop();
      }
    }
    for (i=0;i<mountains.xMount.length;i++){
      if (mountains.numMount[i] == 3){
        push();
          mountains.drawMountains(mountains.xMount[i], mountains.numMount[i], mountains.sizeMount[i]);
        pop();
      }
    }
  underWaterBG();
  waves();
  noiseMover();
  animation(titleScreenAni, 32, 32);
  titleScreenAni.frameDelay = 25;
}
                                                                                              
                                                                                                      // MENU
function menu(){
  menuScroll = constrain(menuScroll, -295, 0);
  if (menuIsUp){
    background(lsCol2);
    if (logIsUp){
      logIsUp = false;
    }
    if (keyIsPressed){
      if (down){
        menuScroll -= 2;
      }
      if (up){
        menuScroll += 2;
      }
    }
    push();
    translate(0, menuScroll);

        image(menuImg, 0, 0);
        
        push();
        translate(4, 149);
        bathysphere.instruments.compass();
        pop();
        
        push();
        translate(5, 122);
        bathysphere.instruments.depthMeter();
        pop();
        
        push();
        translate(-45, 142);
        bathysphere.instruments.oxygenMeter();
        pop();
        
        push();
        translate(3, 217);
        image(radioIco, 0, 0);
        pop();
        
        push();
        translate(17, 249);
        rotate(south);
        image(logIco, 0, 0);
        pop();
    pop();
    
  }
  
}
                                                                                                      // DEATH SCREEN
function deathScreen(){
  
  background(hudCol1);
  
  
  push();
    translate(0, 0);
    image(bathySky, 0, 0);
    animation(bottomFeederAnimation, 32, 44);
    bottomFeederAnimation.frameDelay = 20;
    image(deathScreenImg, 0, 0);
  pop();
  
}
                                                                                                      // GAME OVER SCREEN
function gameOverScreen(){
  
  background(0);
  push();
    translate(0, 0);
    animation(helmetBlinkingAnimation, 32, 32);
    animation(gameOverAni, 32, 32);
    gameOverAni.looping = false;
    gameOverAni.frameDelay = 20;
  pop();
  
}
                                                                                                      // LOADING SCREEN
function loadingScreen(){
  
  background(0);
  push();
    translate(0, 0);
    fill(255);
    textFont(pixelFont);
    textSize(8);
    textAlign(CENTER);
    text('loading...', 32, 32);
    image(radioIco, 30, 40);
    captureSprite.changeAnimation('incoming');
    captureSprite.animation.frameDelay = 10;
    
  pop();
  
}
                                                                                                      // SCENE CHANGER

function sceneChange(){
  if (scene == 2){
    scene = 3;
  }
  if (scene == 4){
    scene = 0;
  }
}
                                                                                                      // SNAPSHOT CONTROL

function snapshotControl(){
  shutterSound.looping = false;
  switch(shutter){
    case 0:

      break;
    case 1:
      shutterSound.play();
      save('NMZA Bathysphere Snapshot.png');
      shutter = 2;
      break;
    case 2:

        shutterSound.onended(shutterOff);

    default:
      break;

  }

}
                                                                                                      // SHUTTER OFF
function shutterOff(){
  shutter = 0;
}


                                                                                                      // NOISE
function noiseMover(){
  yOff += 0.01;
}
                                                                                                      // KEYPRESSES
function keyPressed(){
  //RIGHT
  if (keyCode == 68){
    right = true;
  } else {
    right = false;
  }
  //LEFT
  if (keyCode == 65){
    left = true;
  } else {
    left = false;
  }
  //UP
  if (keyCode == 87){
    up = true;
  } else {
    up = false;
  }
  //DOWN
  if (keyCode == 83){
    down = true;
  } else {
    down = false;
  }
  //SCENE CHANGE
  if (keyCode == RETURN){
    if (scene == 2 || scene == 4){
      setTimeout(sceneChange, 500);
    }
  }

      //CAMERA GO
  if (keyCode == 16){
    if (shutter == 0){
      shutter = 1;
    }
  }
  
  if (scene == 3 && bathyDepth < 80){
    if (keyCode == 32){
      logIsUp = !logIsUp;
    }
  }
  if (scene == 3 && bathyDepth >= 80 && !transmissionCaptured && isTransmission){
    if (keyCode == 32){
      capturePressed = true;
    }
  }
  if (scene == 3){
    if (keyCode == RETURN){
      menuIsUp = !menuIsUp;
    }
    
  }
    
  return false;
}