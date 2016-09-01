var canvas;
var triOver = false;

var bitBass;
var bitEnv;

var piano;
var pianoEnv;
var pianoNotes = [];
var pianoStep = 0;
var pianoOver = false;
var pianoWidth;
var pianoHeight;
var pianoFill;
var colorStep = 0.01;
var pianoLerp = 1;

var triFill, triRand;
var avatarFill;
var avatarRotate;

var posX, posY, size;

var triSize;

var dNote = 272.54;

var posLerp = 0;
var posStep = 0.1;

var happy;
var happyEnv;
var happyOver = false;
var yOff = 0;
//var happyStroke = color(1);
var avatarSpin;

var pianoLyrics, bassLyrics, happyLyrics = [];

var fft;

function setup(){
	masterVolume(0.1);

	pianoNotes = [dNote, 9*dNote/8, 5*dNote/4, 45*dNote/32, 3*dNote/2, 5*dNote/3, 15*dNote/8, 2*dNote]
	pianoLyrics = ["up in Carol-Town", "a barrel just as round", "when Carol met the whale", "the "]
	canvas = createCanvas(windowWidth, windowHeight);
	canvas.parent("folkID");
	background(1);

	bitBass = new p5.Oscillator();
	bitBass.setType('triangle');
	bitBass.amp(0);
	bitBass.freq(80);
	bitEnv = new p5.Env(0.01, 0.5, 1, 0.5);
	bitBass.start();

	piano = new p5.SinOsc();
	piano.amp(0);
	piano.freq(272.54);
	pianoEnv = new p5.Env();
	pianoEnv.setADSR(0.01, 0.8, 0.5, 0.1);
	pianoEnv.setRange(0.5, 0);
	piano.start();

	happy = new p5.SawOsc();
	happy.amp(0);
	happy.freq(272.54);
	happyEnv = new p5.Env();
	happyEnv.setADSR(0.01, 0.2, 0.2, 0.5);
	happyEnv.setRange(0.5, 0);
	happy.start();

	triFill = color(204, 190, 0);
	var blue = color(21, 167, 212);
	avatarFill = lerpColor(triFill, blue, 0.5);

	reverb = new p5.Reverb();
	reverb.process(bitBass, 3, 1);
	reverb.process(piano, 5, 0.2);
	reverb.process(happy, 1, 1);

	fft = new p5.FFT;
	var waveform;


	delay = new p5.Delay();
	delay.setType("pingPong");
	delay.process(piano, 0.5, 0.2, 1000);
	delay.process(happy, 0.25, 0.4, 500);

	modW = new p5.Pulse();
	modW.freq(70);
	//var w = constrain(map(posX, width/2, 2*width/3, 0, 1), 0, 1);
	//modW.width(w);
	modW.amp(0);
	modW.start();
	modW.amp(happy);
	modW.mult(0.5);

	reverb.process(delay, 2, 2);

	posX = height/3;
	posY = height/3;


}

function draw(){

	background(21, 167, 212);
	triangleBass();
	rectPiano();
	push();
	blackKeys();
	pop();
	push();
	avatar();
	pop();
	push();
	happyShape();
	pop();
	controlPanel();


	if (touchIsDown){
		touchX = posX;
		touchY = posY;
	} 
}

function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
}

function touchStarted(){
	posX = touches[0].x;
	posY = touches[0].y;

	if(triOver){
		triRand = random(30, 150);
		triNote = pianoNotes[int(random(0, 7))];
		triFill = color(204, triRand, 0);
		bitBass.freq(triNote/5);
		bitEnv.play(bitBass);
	}
	if (pianoOver){
		constrain(pianoStep, 0, 7);
		pianoLerp = 0;
		randNote = int(random(0, 7));
		piano.freq(pianoNotes[randNote]);
		pianoEnv.play(piano);
	}
	if (happyOver){
		happyNote = pianoNotes[int(random(0, 7))];
		happy.freq(happyNote*2);
		happyEnv.play(happy);
	}
}

function touchMoved(){
	posX = touches[0].x;
	posY = touches[0].y;
	/*if(triOver){
		triNote = pianoNotes[int(random(0, 7))];
		triFill = color(204, triRand, 0);
		bitBass.freq(triNote/5);
		bitEnv.triggerAttack(bitBass);
	}
	if (pianoOver){
		constrain(pianoStep, 0, 7);
		pianoLerp = 0;
		randNote = int(random(0, 7));
		piano.freq(pianoNotes[randNote]);
		pianoEnv.triggerAttack(piano);
	}
	if (happyOver){
		happyNote = pianoNotes[int(random(0, 7))];
		happy.freq(happyNote*2);
		happyEnv.play(happy);
	}*/
}

function keyPressed(){

	var upDist = (height + width)/70;
	var downDist = height;
	var rightDist = width;
	posLerp = 0;


	if  (triOver
		&& keyCode != UP_ARROW 
		&& keyCode != DOWN_ARROW
		&& keyCode != LEFT_ARROW
		&& keyCode != RIGHT_ARROW

		){
		triRand = random(30, 150);
		triNote = pianoNotes[int(random(0, 7))];
		triFill = color(204, triRand, 0);
		bitBass.freq(triNote/5);
		bitEnv.play(bitBass);

	}

	if  (pianoOver
		&& keyCode != UP_ARROW 
		&& keyCode != DOWN_ARROW
		&& keyCode != LEFT_ARROW
		&& keyCode != RIGHT_ARROW

		){

		if (pianoStep = 7){
			pianoStep += int(random(-4, -1));
		} else if (pianoStep = 0){
			pianoStep += int(random(1, 4));
		} else {
			pianoStep += int(random(-3, 7));
		}

		constrain(pianoStep, 0, 7);

		pianoLerp = 0;
		randNote = int(random(0, 7));

		piano.freq(pianoNotes[randNote]);
		//pianoEnv.play(modW);
		pianoEnv.play(piano);
		
	}

	if  (happyOver
		&& keyCode != UP_ARROW 
		&& keyCode != DOWN_ARROW
		&& keyCode != LEFT_ARROW
		&& keyCode != RIGHT_ARROW

		){

		modW.freq(70);
		modW.width(constrain(map(posX, width/2, 2*width/3, 0, 1), 0, 1));
		happyNote = pianoNotes[int(random(0, 7))];
		happy.freq(happyNote*2);
		happyEnv.play(happy);
		happyEnv.play(modW);


	}

	posLerp += posStep;
		if (!happyOver){
			if (keyCode == UP_ARROW){
				posY = lerp(posY, upDist, posLerp);
				avatarRotate = radians(270);
			} else if (keyCode == RIGHT_ARROW){
				posX = lerp(posX, rightDist, posLerp);
				avatarRotate = radians(0);
			} else if (keyCode == DOWN_ARROW){
				posY = lerp(posY, downDist, posLerp);
				avatarRotate = radians(90);
			} else if (keyCode == LEFT_ARROW){
				posX = lerp(posX, upDist, posLerp);
				avatarRotate = radians(180);
			}
		} else {
			if (keyCode == UP_ARROW){
				posY = lerp(posY, upDist, posLerp);
				avatarRotate = happySpin;
			} else if (keyCode == RIGHT_ARROW){
				posX = lerp(posX, rightDist, posLerp);
				avatarRotate = happySpin;
			} else if (keyCode == DOWN_ARROW){
				posY = lerp(posY, downDist, posLerp);
				avatarRotate = happySpin;
			} else if (keyCode == LEFT_ARROW){
				posX = lerp(posX, upDist, posLerp);
				avatarRotate = happySpin;
			}
		}


	return false;

}

function triangleBass(){
	triSize = (width + height)/14;

	
	if (abs(posX - width/2) < triSize && abs(posY - height/2) < triSize){
		triOver = true;
	} else {
		triOver = false;
	}
	//THE SHADOW OF THE TRIANGLE
	// push();
	// fill(30, 150);
	// noStroke();
	// translate(20, 10);
	// triangle(width/2 - triSize, height/2 + triSize, 
	// 	width/2 + triSize, height/2 + triSize, 
	// 	width/2, height/2 - triSize);
	// pop();
	//THE TRIANGLE
	push();
	fill(triFill);
	noStroke();
	triangle(width/2 - triSize, height/2 + triSize, 
		width/2 + triSize, height/2 + triSize, 
		width/2, height/2 - triSize);
	pop();
}

function rectPiano(){

	if (pianoLerp <= 1){
		pianoLerp += colorStep;
	}

	pianoFill = lerpColor(155, 255, pianoLerp);
	//pianoWidth = (1.5*width + height)/4;
	//pianoHeight = (width + 1.5*height)/30;
	pianoWidth = 1.1*width/2;
	pianoHeight = height/10;


	if (posX > width/14 && posX < width/12 + (2*pianoWidth/3) && posY > height/6 && posY < height/6 + (2.7*pianoWidth/3)){
		pianoOver = true;
	} else {
		pianoOver = false;
	}
	//THE SHADOW OF THE PIANOO
	push();
	rectMode(CORNER);
	fill (30, 100);
	noStroke();
	translate(width/12+30, height/6+13);
	rotate(radians(45));
	rect(0, 0, pianoWidth, pianoHeight);
	pop();

	//THE PIANOOO
	push();
	rectMode(CORNER);
	fill (pianoFill);
	noStroke();
	translate(width/12, height/6);
	rotate(radians(45));
	rect(0, 0, pianoWidth, pianoHeight);
	pop();


}

function avatar(){
	var white = color(255, 255, 255);
	var black = color(1, 1, 1);
	var red = color(153, 9, 52);
	
	
	avatarWidth = (width+height)/24;
	avatarHeight = (width+height)/18;

	//HIS S H A D O W . . . . .
	push();
	fill(30, 100);
	noStroke();
	translate(posX + 10, posY + 20);
	rotate(avatarRotate);
	rectMode(CENTER);
	ellipse(0, 0, avatarHeight, avatarHeight);
	rect(avatarWidth, 0, avatarWidth/2, avatarHeight/2);
	pop();

	//THE TURTLE!!!
	push();
	fill(avatarFill);
	noStroke();
	translate(posX, posY);
	rotate(avatarRotate);
	rectMode(CENTER);
	ellipse(0, 0, avatarHeight, avatarHeight);
	rect(avatarWidth, 0, avatarWidth/2, avatarHeight/2);
	pop();

	

}

function controlPanel(){
	fill(255);
	noStroke();
	textAlign(CENTER, CENTER);
	textSize((width + height)/110);
	text("use the arrow keys to MOVE YOUR TURTLE!", width/2, height - (height/20));
	
	if (triOver || pianoOver || happyOver){
		textAlign(CENTER, CENTER);
		if (triOver){
			fill (triFill);
		} else if (pianoOver){
			fill (255);
		} else if (happyOver){
			fill(65, 0, 135);
		} else {
			fill (1);
		}

		text("type anything to play some FOLK MUSIC!", width/2, height - (height/40));
	}	
}

function blackKeys(){

	fill(1);
	stroke(50);
	var keyHeight = 2*pianoHeight/3;
	var keyWidth = pianoWidth/14;
	rectMode(CORNER);
	translate(width/12, height/6);
	rotate(radians(45));
	rect (width/36, 0, keyWidth, keyHeight);
	rect (3*width/36, 0, keyWidth, keyHeight);
	rect (7*width/36, 0, keyWidth, keyHeight);
	rect (9*width/36, 0, keyWidth, keyHeight);
	rect (11*width/36, 0, keyWidth, keyHeight);
	rect (15*width/36, 0, keyWidth, keyHeight);
	rect (17*width/36, 0, keyWidth, keyHeight);

}

function happyShape(){

	waveform = fft.analyze();
	
	///THE SHAPE///

	push();

	noFill();
	strokeWeight(3);
	stroke(65, 0, 135);
	translate(4*width/6, height/3);
	beginShape();


	var xOff = 0;
	for (i=-width/8; i<width/8; i+=2){

		var j = map(noise(xOff, yOff), 0, 1, -width/20, width/20);
		
		
		vertex(i, waveform[i + width/8] - j);
		constrain(map(waveform, 0, 200, -100, 100), -100, 100);

		if (happyOver){
			rotate(radians(j/10));
			happySpin = j/10;
		}

		xOff += 0.05;

	}


	yOff += 0.01;

	endShape();
	pop();

	///THE SHADOW OF THE SHAPE///
	
	push();

	noFill();
	strokeWeight(3);
	stroke(30, 100);
	translate(4.5*width/6, 1.2*height/3);
	beginShape();


	var xOff = 0;
	for (i=-width/8; i<width/8; i+=2){

		var j = map(noise(xOff, yOff), 0, 1, -width/20, width/20);
		
		
		vertex(i, waveform[i + width/8] - j);
		constrain(map(waveform, 0, 200, -100, 100), -100, 100);

		if (happyOver){
			rotate(radians(j/10));
			happySpin = j/10;
		}

		xOff += 0.05;

	}


	yOff += 0.01;

	endShape();
	pop();

	if (posX > 3.2*width/6 && posX < 4.7*width/6 && posY > 0.5*height/3 && posY < 1.5*height/3){
		happyOver = true;
	} else {
		happyOver = false;
	}


}


