var w, h;
var drums, r, drums2, play;

var bass;
var bassCrush;
var freq;

var jan, jPosX, jPosY;

var patterns;
var randP;
var speeds;
var randS;


function setup(){
	w = windowWidth;
	h = windowHeight;
	createCanvas (w, h);

	patterns = ['xxxoxo-', 'x*x*...x-', 'o.', 'x....x...x...o-......x.', ''];
	randP = 0;
	speeds = [1, 1/2, 1/4, 1/16, 1/32];
	randS = 0;
	Clock.rate = 1.1;
	play = false;

	drums = EDrums(patterns[0], speeds[2]);
	//drums.pitch.seq(.5, 1, 2, 4, 1.8);
	r = RingMod({
		amp: 1,
		frequency: 440,
	});
	drums.fx.add( Delay(1.3) );
	drums2 = Drums('**.', 1/8);
	drums2.pan(-1);
	drums2.fx.add( Schizo(0.25, 250, 4000));

	bass = Mono({ waveform:'Sine', filterMult:0, resonance:1, detune2:.05, detune3:-.05 });	
	bassCrush = Crush(16, 1);

	bass.play( [80, 70, 80, 49], 1/4 );
	bass.fx.add(bassCrush);

}



function draw(){
	background( 225 )
	fill(80);
	noStroke();
	textSize(100);
	text("JAN!!!", w/2, h/2);
	freq = map(mouseX, 0, width, 220, 440);

	bassCrush.bitDepth = map(mouseX, 0, w, 2, 16);
	bassCrush.sampleRate = map(mouseY, 0, h, 0, 1);



	r.frequency = freq;

	playEverything();



}

function playEverything(){
	if (mouseIsPressed){
		if (!play){
			play = true;
			drums.start();
			drums2.start();
			bass.start();
		}else{
			play = false;
			drums.stop();
			drums2.stop();
			bass.stop();
		};
	};
}