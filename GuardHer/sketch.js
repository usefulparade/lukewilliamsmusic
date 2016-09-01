//colors:  231, 185, 117, 0
var song;
var rate;
var mainLerp;
var player;
var cat;
var camX, camY, camTargetX, camTargetY;
var sceneW;
var rPressed, lPressed, shiftPressed;
var adjTouchX;
var c;

var standingL, standingR;
var bg, kitchen, stuff, light, tree, catRest, catFlick, table, bigWindow;
var walkR, walkL;

function preload(){
  song = loadSound('GuardHer/assets/music/guardher.mp3');
  standingL = loadAnimation('GuardHer/assets/sprites/standLeft_0001.png');
  standingR = loadAnimation('GuardHer/assets/sprites/standRight_0001.png');
  bg = loadAnimation('GuardHer/assets/sprites/bg.png');
  kitchen = loadAnimation('GuardHer/assets/sprites/kitchen.png');
  light = loadAnimation('GuardHer/assets/sprites/light.png');
  stuff = loadAnimation('GuardHer/assets/sprites/kitchen-stuff.png');
  tree = loadAnimation('GuardHer/assets/sprites/tree/tree_001.png');
  catRest = loadAnimation('GuardHer/assets/sprites/cat/catRest_001.png', 'GuardHer/assets/sprites/cat/catRest_007.png');
  catFlick = loadAnimation('GuardHer/assets/sprites/cat/cat_001.png', 'GuardHer/assets/sprites/cat/cat_009.png');
  table = loadAnimation('GuardHer/assets/sprites/table-and-chair.png');
  bigWindow = loadAnimation('GuardHer/assets/sprites/window.png');
  standingR = loadAnimation('GuardHer/assets/sprites/standRight_0001.png');
  walkR = loadAnimation('GuardHer/assets/sprites/walkRight/walkRight_0001.png', 'GuardHer/assets/sprites/walkRight/walkRight_0010.png');
  walkL = loadAnimation('GuardHer/assets/sprites/walkLeft/walkLeft_0001.png', 'GuardHer/assets/sprites/walkLeft/walkLeft_0010.png');
}

function setup() {
  c = createCanvas(320,192);
  c.parent('guardCanvas');
  mainLerp = 0.001;
  song.play();
  rate = 0.001;
  player = new Player(-50, 54, mainLerp);
  cat = new Cat(0, 0);
  sceneW = 40000;
  rPressed = false;
  lPressed = false;
  pixelDensity(1);
}

function draw() {
  background(231);
  rate = lerp(0.001, 1, mainLerp);
  rate = constrain(rate, 0.001, 1);
  song.rate(rate);
  controller();
  cameraControl();
  animation(bg, 0, 0);
  animation(kitchen, 0, 0);
  animation(stuff, 0, 0);
  cat.show();
  animation(tree, 0, 15);
  animation(bigWindow, 0, 15);
  player.go();
  player.show();
  animation(light, 0, 15);
  animation(table, 0, 0);
}


function controller() {
  adjTouchX = (touchX - width)/2
  if (rPressed){
      player.moveRight = true;
      player.moveLeft = false;
        if (mainLerp < 1 && player.x < player.rightBound){
          mainLerp += 0.02;
        } else {
          mainLerp -= 0.008;
          player.sprite.changeAnimation('standR');
        }
      } else if (lPressed){
      player.moveLeft = true;
      player.moveRight = false;
        if (mainLerp < 1 && player.x > player.leftBound){
          mainLerp += 0.02
        } else {
          mainLerp -= 0.008;
          player.sprite.changeAnimation('standL');
        }
    } else {
      player.moveLeft = false;
      player.moveRight = false;
        if (mainLerp > 0.02){
          mainLerp -= 0.008;
        }
      }

}

function cameraControl(){
  camera.position.x = 0;
  camera.position.y = 32;
  // camTargetX = player.x + 100;
  // camTargetY = player.y - 100;
  // if (camera.position.x < camTargetX){
  //   camX = camX + (camTargetX - camera.position.x)/10;
  // } else {
  //   camX = camTargetX;
  // }
  // camY = player.y - 100;
  // camera.position.x = camX;
  // camera.position.y = camY;
}


function keyPressed(){
  if (keyCode == 16){
    shiftPressed = true;
  }
  if (key == ' '){
    pixelDensity(map(mainLerp, 0, 1, 0.2, 1));
  }
  if (keyCode == RIGHT_ARROW){
    rPressed = true;
    lPressed = false;
  } else if (keyCode == LEFT_ARROW){
    lPressed = true;
    rPressed = false;
  }
}

function keyReleased(){
  if (keyCode == RIGHT_ARROW){
    player.sprite.changeAnimation('standR');
    rPressed = false;
  } else if (keyCode == LEFT_ARROW){
    player.sprite.changeAnimation('standL');
    lPressed = false;
  }

  if (keyCode == 16){
    shiftPressed = false;
  }
}

function touchStarted(){

  if (adjTouchX < player.x){
    lPressed = true;
    rPressed = false;
  } else if (adjTouchX > player.x){
    rPressed = true;
    lPressed = false;
  }
}

function touchMoved(){
  if (adjTouchX < player.x){
    lPressed = true;
    rPressed = false;
  } else if (adjTouchX > player.x){
    rPressed = true;
    lPressed = false;
  }
}

function touchEnded(){
  lPressed = false;
  rPressed = false;

  if (adjTouchX < player.x){
    player.sprite.changeAnimation('standL');
  } else if (adjTouchX > player.x){
    player.sprite.changeAnimation('standR');
  }
}
