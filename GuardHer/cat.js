function Cat(x, y){
  
  this.x = x;
  this.y = y;
  this.sprite = createSprite(0, 0);
  this.sprite.addAnimation('resting', catRest);
  this.sprite.addAnimation('flick', catFlick);
  
  this.show = function(){
    push();
      translate(this.x, this.y);
      if (frameCount%1000 === 0){
        this.sprite.changeAnimation('flick');
        this.sprite.animation.rewind();
        this.sprite.animation.play();
        this.sprite.animation.frameDelay = 20;
        this.sprite.animation.looping = false;
      } else if (frameCount%1000 <=200){
        if (frameCount < 200){
         this.sprite.animation.frameDelay = 120;
        } else {
         this.sprite.animation.frameDelay = int(random(18, 32));
        }
      } else if (frameCount%1500 > 200){
        this.sprite.changeAnimation('resting');
        this.sprite.animation.play();
        this.sprite.looping = true;
        this.sprite.animation.frameDelay = int(random(100, 300));
      }
    pop();
    
    drawSprite(this.sprite);
  }
}