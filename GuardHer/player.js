function Player(x, y, ler) {
  this.x = x;
  this.y = y;
  this.w = 50;
  this.moveRight = false;
  this.moveLeft = false;
  this.velLerp = 0;
  this.musicLerp;
  this.r = 0;
  this.rightBound = width*0.5 - this.w*0.5;
  this.leftBound = -width*0.5 + this.w*0.5;
  this.sprite = createSprite(0, 0, 64, 64);
  this.sprite.addAnimation('standR', standingR);
  this.sprite.addAnimation('standL', standingL);
  this.sprite.addAnimation('walkR', walkR);
  this.sprite.addAnimation('walkL', walkL);
  
  this.show = function(){
    push();
      translate(this.x, this.y);
      // noFill();
      // stroke(20);
      // rectMode(CENTER);
      // rect(0, 0, 25, 25);
      // ellipse(0, 0, this.w);
      this.sprite.animation.frameDelay = 20;
      if(this.moveRight){
        
        if (this.x < this.rightBound){
          this.sprite.changeAnimation('walkR');
        } else {
          this.sprite.changeAnimation('standR');
        }
        
      } else if (this.moveLeft){
        if (this.x > this.leftBound){
          this.sprite.changeAnimation('walkL');
        } else {
          this.sprite.changeAnimation('standL');
        }
      }
      drawSprite(this.sprite);
    pop();
  }
  
  this.go = function(){
    this.x = constrain(this.x, this.leftBound, this.rightBound);
    if (shiftPressed){
      this.velocity = lerp(0, 4, this.velLerp);
    } else {
      this.velocity = lerp(0, 0.15, this.velLerp);
    }
    this.velocity = constrain(this.velocity, 0, 5);
    
    if (this.moveRight){
      this.x += this.velocity;
    } else if (this.moveLeft){
      this.x -= this.velocity;
    }
    
    if (this.moveRight || this.moveLeft){
      if (this.velLerp < 1){
        this.velLerp+=0.1;
      }
    } else {
      if (this.velLerp > 0){
        this.velLerp-=0.1;
      }
    }
  }
}