var canvas;
var posX;
var posY;

var destX;
var destY;

var posie;

var moveLerp = 0;
var moveStep = 0.01;

var thirst = 20;
var thirstStepDown = 0.1;
var thirstStepUp = 0.5;
var thirstWidth;

var parched = true;

var poolX;
var poolY;
var poolW;
var poolH;

var pool1, pool2, pool3, pool4, pool5, pool6, pool7, pool8, pool9, pool10;



function setup(){
	canvas = createCanvas(800, 600);
	canvas.parent("italyID");
	posie = new mainChar;
	posX = width/2;
	posY = height/2;
	destX = posX;
	destY = posY;
	thirst = 20;
	thirstWidth = 240;
	pool1 = new poolObject(random(0, 800), random(0, 800), random(10, 200), random(100, 500));
	pool2 = new poolObject(random(0, 800), random(0, 800), random(10, 200), random(100, 500));
	pool3 = new poolObject(random(0, 800), random(0, 800), random(10, 200), random(100, 500));
	pool4 = new poolObject(random(0, 800), random(0, 800), random(10, 200), random(100, 500));

	/*poolX = 600;
	poolY = height/2;
	poolW = 200;
	poolH = 500;*/

}

function draw(){
	background('#E3DA5F');
	pool1.drawPool();
	pool2.drawPool();
	pool3.drawPool();
	pool4.drawPool();



	mainChar();
	//wet();
	pool1.poolOver();
	pool2.poolOver();
	pool3.poolOver();
	pool4.poolOver();
	parchedMeter();

}

function mainChar(){
	fill('black');
	stroke('white');
	rectMode(CENTER);
	rect(posX, posY, 80, 80, 30, 30, 30, 5);

	if (touchIsDown){
		destX = touches[0].x;
		destY = touches[0].y;
	} else if (mouseIsPressed) {
		destX = mouseX;
		destY = mouseY;
	}

	posX = lerp(posX, destX, moveLerp);
	posY = lerp(posY, destY, moveLerp);

	if (posX !== destX){
		moveLerp += moveStep;
	} else if (moveLerp >= 0.7){
		moveLerp = 0;
	}

}

function poolObject(x, y, w, h){

		var poolX = x;
		var poolY = y;
		var poolW = w;
		var poolH = h;

	this.drawPool = function(){
		rectMode(CENTER);
		fill('#00aeef');
		stroke('black');
		rect(poolX, poolY, poolW, poolH);
	}

	this.poolOver = function(){
	if (posX >= (poolX - poolW/2) && posX <= (poolX + poolW/2)){
		parched = false;
	} else {
		parched = true;
	}

	}
}

function wet(){
	if (posX >= (poolX - poolW/2) && posX <= (poolX + poolW/2)){
		parched = false;
	} else {
		parched = true;
	}
}

function parchedMeter(){

	thirstWidth = constrain(map(thirst, 0, 100, 0, 240), 0, 240);
	if (parched == false && thirst < 100){
		thirst += thirstStepUp;
	} else if (parched == true && thirst > 0){
		thirst -= thirstStepDown;
	}

	/*textSize(30);
	textAlign(CORNER);
	text(thirst, 50, 50);*/

	rectMode(CORNER);

	push();
	fill('#a3bfce');
	noStroke();
	rect(40, 40, thirstWidth, 60);
	pop();

	push();
	noFill();
	strokeWeight(3);
	stroke('#464646');
	rect(40, 40, 240, 60);
	pop();

}









//color scheme: https://color.adobe.com/create/color-wheel/?base=2&rule=Analogous&selected=3&name=My%20Color%20Theme&mode=rgb&rgbvalues=0.4343271805314516,0.8500000000000001,0.3554361833671178,0.640227125886727,0.89,0.37216259199615853,0.7471593167925489,0.8,0.3745281725808168,0.89,0.854990496872023,0.37216259199615853,0.8500000000000001,0.761475276667745,0.3326244526699651&swatchOrder=0,1,2,3,4