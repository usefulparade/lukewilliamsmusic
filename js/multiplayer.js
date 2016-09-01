

var start;
var player1, player2, player3;

var masterX, masterY;

var bezierX
var bezierY;

var sampler;
var speed, panner;

var delay;
var delayY;

var yOff1;

var p1Counter, p2Counter, p3Counter;

var noon;
var osc2;
var osc3;
var noonEnv;
var osc2Env;
var dNote;
var p2Freq;

var fft;
var analyze;
var waveform;

var circleFillColors;
var circleFill;
var circleOver;
var circlePosX;
var circlePosY;
var circleBackground;
var p2LineColor;

var p3Osc;
var p3Env;
var p3Note;
var p3Freq;
var p3Attack;
var p3Decay;

function preload(){
	sampler = loadSound('mp3/folkmusic.mp3');
}

function setup(){
	canvas = createCanvas(windowWidth, windowHeight);
	canvas.parent("multID");
	start = true;
	player1 = false;
	player2 = false;
	player3 = false;

	delay = new p5.Delay();

	bezierX = width/2;
	bezierY = height/2;

	yOff1 = 0;
	xOff1 = 0;

	p1Counter = 0;
	p2Counter = 0;
	p3Counter = 0;

	dNote = 272.54;
	p2Freq = [
		dNote, 9*dNote/8, 5*dNote/4, 45*dNote/32, 3*dNote/2, 5*dNote/3, 15*dNote/8, 2*dNote
	]
	p3Note = 200;
	p3Freq = [
		p3Note, 9*p3Note/8, 5*p3Note/4, 45*p3Note/32, 3*p3Note/2, 5*p3Note/3, 15*p3Note/8, 2*p3Note
	]

	noon = new p5.TriOsc();
	noon.amp(0);
	noon.freq(200);
	noonEnv = new p5.Env(0.5, 0.5, 0.1, 0.3, 0.5, 0.3, 1, 0);
	noon.start();

	osc2 = new p5.Pulse();
	osc2.freq(200);
	osc2.amp(0);
	osc2Env = new p5.Env(0.1, 0.1, 0.2, 0);
	osc2.start();

	osc3 = new p5.TriOsc();
	osc3.freq(200);
	osc3.amp(0);
	osc3.start();

	fft = new p5.FFT;

	circlePosX = width/2;
	circlePosY = 0.9*height/3;
	circleOver = false;
	circleFillColors = [255, 1];
	circleFill = circleFillColors[1];

	p3Attack = 0.05;
	p3Decay = 0.1;
	p3Osc = new p5.SinOsc();
	p3Osc.amp(0);
	p3Osc.freq(80);
	//p3Osc.width(0.1);
	p3Env = new p5.Env(p3Attack, 0.6, p3Decay, 0);
	p3Osc.start();
}

function draw(){

	if (touchIsDown){
		masterX = touches[0].x;
		masterY = touches[0].y;
	} else {
		masterX = mouseX;
		masterY = mouseY;
	}

	background(255);


	if (start){
		ChooseYourPlayer();
	} else if (player1){
		Player1();
	} else if (player2){
		Player2();
	} else if (player3){
		Player3();
	}

}

function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
}




function ChooseYourPlayer(){
	//background(130, 170, 200);

	var xOff1 = 0;
	for (var i=0; i<height; i+=height/30){

		var j = map(noise(xOff1, yOff1), 0, 1, -width/2, width/2);
		var l = map(noise(xOff1, yOff1), 0, 1, -width/6, width/6);

		//strokeWeight(0.5);
		noStroke();
		//fill(i/10, i/7, i/5);
		fill(i/10);
		rect(0, i, width, height/30 + j);	
		//rect(width/3 + i, 0, height/30 + j, height);


		fill(1);
		//stroke(255-(i/2), 255-(i/6), 255-(i/4));
		stroke(255-i/2);
		strokeWeight(2);

		for (var k=0; k<width; k+=width/25){
			line(k, i, k + j, i+height/25);

		}	

		xOff1 += 0.05;
	}

	yOff1 += 0.01;

	noFill();
	stroke(255);
	strokeWeight(1);
	textFont("Helvetica");
	textStyle(ITALIC);
	textAlign(CENTER);
	textSize((width + height)/28);
	push();
	rotate(radians(10));
	text("WHO ARE YOU?", width/2, height/10);
	pop();
	stroke(200);
	strokeWeight(2);
	textAlign(LEFT);
	textSize((width + height)/24);
	text("THE BUILDER", width/12, 2*height/5);
	stroke(175);
	strokeWeight(3);
	textAlign(CENTER);
	text("THE CLOCKS", width/2, 3*height/5);
	stroke(150);
	strokeWeight(4);
	textAlign(RIGHT);
	text("GARO-YASSA", 11*width/12, 4*height/5);

	if (mouseIsPressed || touchIsDown){
		if (masterY < 2.5*height/5){
			player1 = true;
			start = false;
			sampler.play();
			sampler.rate(1);
		} else if (masterY >= 2.5*height/5 && masterY < 3.5*height/5){
			player2 = true;
			start = false;
		} else if (masterY >= 3.5*height/5){
			player3 = true;
			start = false;
		} 
	}
		
}




function Player1(){

	p1Counter += 2;
	fill(1);
	//text(p1Counter, 10, 10);

	if (!touchIsDown){
			bezierX = mouseX;
			bezierY = mouseY;
		} else {
			bezierX = touches[0].x;
			bezierY = touches[0].y;
		}


	for (var i = 0; i < 20; i++){
		fill(20*i);
		stroke(12*i);
		bezier(0, (i * height/16), (map(bezierX, 0, width, -width, width*2)), 0, width, height/2, map(bezierY, 0, height, width, 0), (i * height/16));
	}

	speed = map(bezierX, 0, width, 0.2, 3);
	panner = map(bezierY, 0, height, -1, 1);
	sampler.rate(speed);
	sampler.pan(panner)
	delay.process(sampler, constrain(map(bezierY, 0, height, 0, 1), 0, 1), constrain(map(bezierY, height, 0, 0.5, 1), 0.5, 1), 20000);

	//////////////////////////////////////////////////////TEXT PLAYER 1///////////////////////////////
	textAlign(CENTER);
	if (p1Counter > 1000 && p1Counter < 1200){
		fill(255);
		stroke(1);
		textSize(int((width + height)/23));
		text("Okay,", width/2, height/3);
	} else if (p1Counter > 1200 && p1Counter < 1500){
		fill(255);
		stroke(1);
		textSize(int((width + height)/18));
		text("So you're", width/2, height/3);
		text("The Builder,", width/2, 1.5*height/3);
		text("huh?", width/2, 2*height/3);
	} else if (p1Counter > 1700 && p1Counter < 2000){
		fill(255);
		stroke(1);
		textSize(int((width + height)/18));
		text("Well,", width/2, height/3);
		textSize(int((width + height)/16))
		text("BUILD!", width/2, 1.5*height/3);
	} else if (p1Counter > 2500 && p1Counter < 2600){
		fill(255);
		stroke(1);
		textSize(int((width + height)/18));
		text("Oh,", width/2, height/3);
	} else if (p1Counter > 2800 && p1Counter < 2900){
		fill(255);
		stroke(1);
		textSize(int((width + height)/18));
		text("P.S.", width/2, height/3);
	} else if (p1Counter > 3000 && p1Counter < 3100){
		fill(255);
		stroke(1);
		textSize(int((width + height)/18));
		text("The Clocks are", width/2, height/3);

		fill(255);
		stroke(1);
		textSize(int((width + height)/18));
		text("pretty loud.", width/2, height/2);
	} else if (p1Counter > 3200 && p1Counter < 3300){
		fill(255);
		stroke(1);
		textSize(int((width + height)/18));
		text("try to", width/2, height/3);

		fill(255);
		stroke(1);
		textSize(int((width + height)/18));
		text("take turns,", width/2, height/2);

		fill(255);
		stroke(1);
		textSize(int((width + height)/18));
		text("okay?", width/2, 2*height/3);
	}
}

function Player2(){

	p1Counter += 2;
	circlePosX = width/2;
	circlePosY = 0.9*height/3;

	background(255);

	var circleWidth = (width + height)/10;

	if (abs(masterX-circlePosX) < circleWidth/2 && abs(masterY-circlePosY) < circleWidth/2){
		circleOver = true;
	} else {
		circleOver = false;
	}

	fill();

	analyze = fft.analyze();
	waveform = fft.waveform();



	/*if (circleFill == circleFillColors[1]){
		if (mouseIsPressed && circleOver){
			circleFill = circleFillColors[0];
		}
	} else if (circleFill = circleFillColors[0]){
		if (mouseIsPressed && circleOver){
			circleFill = circleFillColors[1];
		}
	}*/


	stroke(1);
	for (var k=0; k<height; k+=30){
		for (var l=int(width/3); l<width; l+=30){
			line(l - analyze[int(l/2)], k, l-30, k+20);
		}
	}

	fill(circleFill);
	stroke(1);
	ellipse(circlePosX, circlePosY, circleWidth, circleWidth);

	stroke(1);

	for (var i=int(2.2*int(height/6)); i<height; i+=10){
		for (var j = 0; j<width; j+=30){
			line(j, i+waveform[i], j+30, i+waveform[i+10]);
		}
	}

		//////////////////////////////////////////////////////TEXT PLAYER 2///////////////////////////////
	textAlign(CENTER);
	strokeWeight(2);
	if (p1Counter > 1000 && p1Counter < 1100){
		fill(255);
		stroke(1);
		textSize(int((width + height)/23));
		text("tick", width/2, height/2);
	} else if (p1Counter > 1200 && p1Counter < 1300){
		fill(255);
		stroke(1);
		textSize(int((width + height)/18));
		text("tock", width/2, 2*height/3);
	} else if (p1Counter > 1700 && p1Counter < 1800){
		fill(255);
		stroke(1);
		textSize(int((width + height)/18));
		text("tick", width/2, height/2);
	} else if (p1Counter > 1900 && p1Counter < 2000){
		fill(255);
		stroke(1);
		textSize(int((width + height)/18));
		text("tick", width/2, height/2);
	} else if (p1Counter > 2800 && p1Counter < 2900){
		fill(255);
		stroke(1);
		textSize(int((width + height)/18));
		text("ha!", width/2, 2*height/3);
	} else if (p1Counter > 3000 && p1Counter < 3100){
		fill(255);
		stroke(1);
		textSize(int((width + height)/18));
		text("you never liked", width/2, height/2);

		fill(255);
		stroke(1);
		textSize(int((width + height)/18));
		text("steadiness", width/2, 2*height/3);
	} else if (p1Counter > 3200 && p1Counter < 3300){
		fill(255);
		stroke(1);
		textSize(int((width + height)/18));
		text("but you love", width/2, height/3);

		fill(255);
		stroke(1);
		textSize(int((width + height)/18));
		text("The Builder,", width/2, height/2);

		fill(255);
		stroke(1);
		textSize(int((width + height)/18));
		text("still?", width/2, 2*height/3);
	} else if (p1Counter > 3400 && p1Counter < 3500){
		fill(255);
		stroke(1);
		textSize(int((width + height)/18));
		text("Well, don't", width/2, height/3);

		fill(255);
		stroke(1);
		textSize(int((width + height)/18));
		text("step on", width/2, height/2);

		fill(255);
		stroke(1);
		textSize(int((width + height)/18));
		text("her toes.", width/2, 2*height/3);
	} else if (p1Counter > 3600 && p1Counter < 3700){
		fill(255);
		stroke(1);
		textSize(int((width + height)/18));
		text("(she loves", width/2, height/3);

		fill(255);
		stroke(1);
		textSize(int((width + height)/18));
		text("GARO-YASSA.)", width/2, height/2);

		fill(255);
		stroke(1);
		textSize(int((width + height)/18));
		text("(sorry.)", width/2, 2*height/3);
	}
}


function Player3(){

	p3Env.set(map(masterX, 0, width, 0.01, 1), 0.6, map(masterX, 0, width, 0.01, 1), 0);

	p1Counter += 2;

	waveform = fft.waveform();
	background(100);
	strokeWeight(2);
	stroke(200);
	for (var i=0; i<height; i++) {
		line(width/2 + waveform[i], i, width/2 + waveform[i+1], i+1);
		xOff1 +=0.01;

	}

	//p3Osc.width(constrain(map(masterX, 0, width, 0, 1), 0, 1));

	for (var i = 0; i<8; i++){
		if (masterY > i*height/8 && masterY <= (i+1)*height/8){
			p3Osc.freq(p3Freq[i]);
		}
	}

		//////////////////////////////////////////////////////TEXT PLAYER 3///////////////////////////////
	textAlign(CENTER);
	strokeWeight(2);
	fill(255);
	stroke(1);
	strokeWeight(2);
	if (p1Counter > 1000 && p1Counter < 1100){
		text("oggh", width/3, height/2);
	} else if (p1Counter > 1200 && p1Counter < 1300){
		text("OrGGH", width/3, height/2);
	} else if (p1Counter > 1400 && p1Counter < 1500){
		text("OARGHGH!!!!!", width/3, height/2);
	} else if (p1Counter > 1600 && p1Counter < 1700){
		text("GPHhb.", width/3, height/2);
	} else if (p1Counter > 1600 && p1Counter < 1700){
		text("Low low low", width/3, height/2);
	} else if (p1Counter > 1800 && p1Counter < 1900){
		text("play slower!", width/3, height/2);
	} else if (p1Counter > 2000 && p1Counter < 2100){
		text("SLOW DOWN!", width/3, height/2);
	} else if (p1Counter > 2200 && p1Counter < 2300){
		text("That's better.", width/3, height/2);
	} else if (p1Counter > 2400 && p1Counter < 2500){
		text("Just right.", width/3, height/2);
	} else if (p1Counter > 2600 && p1Counter < 2700){
		text("garo!", width/3, height/2);
	} else if (p1Counter > 2800 && p1Counter < 2900){
		text("YASSSA!", width/3, height/2);
	}

}


function touchStarted(){
	if (player2){

		if (circleFill == circleFillColors[1]){
			if (circleOver){
				circleFill = circleFillColors[0];
			}
		} else if (circleFill = circleFillColors[0]){
			if (!circleOver){
				circleFill = circleFillColors[1];
			}
		}


		if (circleOver){
			osc2.amp(0);
			noon.amp(0);

			//noon.stop();
			osc3.freq(map(masterX, 1.3*width/3, 1.7*width/3, p2Freq[0], 4*p2Freq[7]));
			osc3.amp(0);
			noonEnv.play(osc3);

		} else if (!circleOver){
			osc3.amp(0);

			osc2.freq(map(masterX, 0, width, p2Freq[0]/3, p2Freq[7]*2));
			osc2.width(map(masterY, 0, height, 0, 1));
			osc2.amp(noon);
			//osc2Env.triggerAttack(osc2);
			noon.freq(map(masterX, 0, width, p2Freq[0]/5, p2Freq[7]/2));
			noonEnv.play(noon);

			//osc3.freq(map(masterY, 0, height, p2Freq[5]/3, p2Freq[6]))
			//noonEnv.play(osc3);
		}

	}

	if (player3){

		p3Env.play(p3Osc);
	}

}

function mouseClicked(){

	if (player2){

		if (circleFill == circleFillColors[1]){
			if (circleOver){
				circleFill = circleFillColors[0];
			}
		} else if (circleFill = circleFillColors[0]){
			if (!circleOver){
				circleFill = circleFillColors[1];
			}
		}

		if (circleOver){
			osc2.amp(0);
			noon.amp(0);

			//noon.stop();
			osc3.freq(map(masterX, 1.3*width/3, 1.7*width/3, p2Freq[0], 4*p2Freq[7]));
			osc3.amp(0);
			noonEnv.play(osc3);

		} else if (!circleOver){
			osc3.amp(0);

			osc2.freq(map(masterX, 0, width, p2Freq[0]/3, p2Freq[7]*2));
			osc2.width(map(masterY, 0, height, 0, 1));
			osc2.amp(noon);
			//osc2Env.triggerAttack(osc2);
			noon.freq(map(masterX, 0, width, p2Freq[0]/5, p2Freq[7]/2));
			noonEnv.play(noon);

			//osc3.freq(map(masterY, 0, height, p2Freq[5]/3, p2Freq[6]))
			//noonEnv.play(osc3);
		}

	}

		if (player3){
			p3Env.play(p3Osc);

		}

}




