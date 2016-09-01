

var shapes, floor, door, simon;
var scene;
var jumpCounter;

var doorCounter;

var w, h;
var doorHeight;

function setup(){
	w = 600;
	h = 500
	scene = createCanvas (w, h);
	numberOfShapes = 1;
	doorHeight = height-80;

	scene.parent("shapeID");
	shapes = new Group();

	floor = createSprite(width/2, height, width*2, 100)
	//floor.setCollider(0, -200, width, 500);
	floor.shapeColor = color(40);
	floor.immovable = true;

	simon = createSprite(100, 100, 30, 40);

	door = createSprite(width-60, height-180, 10, 60)
	door.shapeColor = color("red");

	jumpCounter = 0;
	doorCounter = 1;
}

function draw(){

	if (doorCounter < 15){

		background(225);
		
		shapesHandler();
		resetHandler();

		fill(80);
		noStroke();

		drawSprites(shapes);
		drawSprite(floor);
		drawSprite(door);
		simonCharacter();

		shapes.collide(floor);
		simon.collide(floor);
		simon.collide(shapes);
		shapes.collide(shapes);


		fill(100);
		textAlign(CENTER, CENTER);
		textSize(40);
		text("SCORE:" + doorCounter, width/2, height/7);

		fill(225);
		textSize(20);
		text("a & d to move, w to jump. Drag the boxes to build!", width/2, height - 20)

	if (keyWentDown("m")){
		doorCounter = 15;
	}

	} else if (doorCounter >= 15){

		background(225);
		noStroke();

		fill(random(50, 255));
		textAlign(CENTER, CENTER);
		textSize(70);
		text("YOU WIN!!!!!", width/2, height/3);

		fill(color("blue"));
		textSize(40);
		text("HAPPY BIRTHDAY, SIMON!!", width/2, height/2);

		fill(color("red"));
		text("Love, Luke — Feb 17, 2016", width/2, 2*height/3);
	};


}

function simonCharacter (){
	var grav = 1;
	var walkSpeed = 5;
	var jump = 15;

	simon.shapeColor = color("blue");
	simon.velocity.y += grav;


	if (simon.collide(floor)){

		simon.velocity.y = 0;
		
	}
			// JUMPING //
	if (jumpCounter <= 0){
		jumpCounter = 0;
	} else if (jumpCounter > 0){
		jumpCounter -= 1;
	}

	if (jumpCounter < 1){
		if (keyWentDown("w")){
			simon.velocity.y = -jump;
			jumpCounter = 30;
		}
	}

	if (simon.collide(shapes)){

		simon.velocity.y = 0;

	if (keyWentDown("w")){
			simon.velocity.y = -jump;
		}
	}

	if (keyWentDown("a")){
		simon.velocity.x -= walkSpeed;
	} else if (keyWentUp("a")){
		simon.velocity.x = 0;
	}

	if (keyWentDown("d")){
		simon.velocity.x += walkSpeed;
	} else if (keyWentUp("d")){
		simon.velocity.x = 0;
	}

	//simon.collide(shapes);
	//simon.collide(floor);

	drawSprite(simon);

	if (simon.position.x < 0){
		simon.position.x = 0;
		//simon.position.y = 100;
	} else if (simon.position.x > w){
		simon.position.x = w;
		//simon.position.y = 100;
	};
	if (simon.position.y <= 0){
		simon.position.y = 0;
	} else if (simon.position.y >= h){
		simon.position.x = 100;
		simon.position.y = 100;
	};

	

};


function resetHandler(){
	if (simon.collide(door)){
		simon.position.x = 100;
		simon.position.y = 100;

		var width = random(10, 100);
		var height = random(10, 80);
		var newShape = createSprite(random(50, width), random(50, height-20), width, height);
		//newShape.setCollider("rectangle", 0, 0, width+2, height+2);
		newShape.shapeColor = color(random(100, 200));
		shapes.add(newShape);

		door.position.y -=20;

		doorCounter +=1;
	}
}
function shapesHandler(){


	for(i=0;i<shapes.length;i++){


		shapes[i].velocity.y += 1;


		shapes[i].mouseActive = true;

		if (shapes[i].mouseIsPressed){
			shapes[i].velocity.y = 0;
			shapes[i].position.y = mouseY;
			shapes[i].position.x = mouseX;

		};

		for (j=0; j<shapes.length; j++){
			if (shapes[i].collide(shapes[j])){
				shapes[i].velocity.y = 0;
			}
		}
		if (shapes[i].collide(simon)){
			shapes[i].velocity.y = 0;
			simon.velocity.y = 0;
			shapes[i].velocity.y = 0;
			shapes[i].immovable = true;
		} else {
			shapes[i].immovable = false;
		}
		if (shapes[i].collide(door)){
			shapes[i].velocity.y = 0;
		} 
		if (shapes[i].collide(floor)){
			shapes[i].velocity.y = 0;
		}
		if (shapes[i].position.x < 0){
			shapes[i].position.x = 0;
		}

		shapes[i].collide(simon);
		shapes[i].collide(floor);

		// fill(0);
	// var newestShape = shapes.length-1;
	// text(shapes[newestShape].velocity.y, width/2, 400);

	};



	// simon.collide(shapes);
	// shapes.collide(simon);
}






