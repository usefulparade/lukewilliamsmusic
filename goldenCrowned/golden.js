
var t1 = 0;
var song;
var fft = new p5.FFT();
var smallW;
var smallH;
var albumArt;
var randArray = [];
var camera;
var intensity;
var intenseToggle;
var typing = [" "];
var titleCard;
var texture1, texture2, texture3, texture4;
var lyric1, lyric2,lyric3,lyric4,lyric5,lyric6,lyric7;
var loading;
var intensityToggle;
var SCENE_SELECT;

function preload() {
  
}



function setup() {
  loading = loadImage('goldenCrowned/lyrics/loading.png');
  titleCard = loadImage('goldenCrowned/img/titleCard.png');

  texture1 = loadImage('goldenCrowned/img/texture1.png');
  texture2 = loadImage('goldenCrowned/img/texture2.png');
  texture3 = loadImage('goldenCrowned/img/texture3.png');
  texture4 = loadImage('goldenCrowned/img/texture4.png');

  lyric1 = loadImage('goldenCrowned/lyrics/lyric1.png');
  lyric2 = loadImage('goldenCrowned/lyrics/lyric2.png');
  lyric3 = loadImage('goldenCrowned/lyrics/lyric3.png');
  lyric4 = loadImage('goldenCrowned/lyrics/lyric4.png');
  lyric5 = loadImage('goldenCrowned/lyrics/lyric5.png');
  lyric6 = loadImage('goldenCrowned/lyrics/lyric6.png');
  lyric7 = loadImage('goldenCrowned/lyrics/lyric7.png');
  //song = loadSound('js2/goldenCrowned.mp3');
  albumArt = loadImage('goldenCrowned/img/albumArt.jpg');
  song = loadSound('goldenCrowned/goldenCrowned.mp3');
  SCENE_SELECT = 0;
  intensity = 3;
  var canvas = createCanvas(800, 600);
  canvas.parent('goldenID');
  cursor(CROSS);
  frameRate(24);
  song.setVolume(1);
  
  smallW = 700;
  smallH = 500;
  for (i=0;i<1000;i++){
    randArray[i] = random(0, 25);
  }
  
  // slider = createSlider(1, 10, 6);
  // slider.position(100, 50);
  // slider.style('width', '100px');
  
  sky1 = color(200, 200, 255);
  sky2 = color(50, 125, 100);
  ground1 = color(40);
  ground2 = color(210);
  
  

}

function draw() {

  if (!song.isLoaded()){
    background(250);
      push();
       translate(0, 0);
       image(loading, 0, 0, width, height);
       image(albumArt, width/4, height/4, width/2, height/2);
       filter(THRESHOLD, 0.3);
       //translate(width/2, height/2);
       //noFill();
       for (i=0;i<7;i+=2){
        stroke(40, 125, 100 + i*10);
        noFill();
        strokeWeight(1);
        rectMode(CENTER);
        rotate(0.18);
        translate(0, -50);
        quad(width/2 - 50, 
             50, 
             width/2 + x6(t1 + i) * 5/7, 
             height/2, 
             width/2 + 50, 
             height - 50,
             width/2 - x6(t1 + i) * 5/7, 
             height/2);
 
        beginShape();
          vertex(width/2 + x6(t1 + i) * 5/7, height/2);
          vertex(width/2 - x6(t1 + i) * 5/7, height/2);
        endShape();
 
       }
       //TEXTURE
      pop();
      push();
       tint(255, 255, 255, 75);
       image(texture4, 0, 0, width, height);
      pop();

    } else if (song.isLoaded()){

      if (SCENE_SELECT == 0){
        background(210);
        image(titleCard, 0, 0, width, height);
        image(albumArt, width/4, height/4, width/2, height/2);
        filter(THRESHOLD, 0.3);

        //TEXTURE
      pop();
      push();
       tint(255, 255, 255, 75);
       image(texture4, 0, 0, width, height);
      pop();

      } else if (SCENE_SELECT == 1){

      var waveform = fft.waveform();
      var analyze = fft.analyze();
      //background(40);
      stroke(230);
      strokeWeight(1);
      
      //INTENSITY
      //intensity = map(mouseX, 0, width, 0, 10);
      if (keyIsDown(RIGHT_ARROW) || keyIsDown(77)){
       if (intensity > 0.1){
        intensity -=0.25;
        } else {
         intensity = 0.1;
        }
      } else if (keyIsDown(LEFT_ARROW) || keyIsDown(78)){
       if (intensity < 10){
        intensity +=0.25;
        } else {
         intensity = 10;
        }
       }else if (keyIsDown (UP_ARROW) || keyIsDown(69)){
        intensity = 10;
       } else if (keyIsDown(DOWN_ARROW) || keyIsDown(87)){
        intensity = 1;
       
      }
      
      push();
      
      switch (camera){
      
        case 'f':

         background(100);
         push();
          translate(100, 100);
         for(i=0;i<20;i+=2){
           stroke(40);
           fill(210);
           noFill();
           //rotate(PI/i);
           for (j=0;j<700;j+=100){
            for (k=0;k<500;k+=100){
             //translate(j, k);
             polygon(10 + j, 10 + k, 50 - i*2, abs(analyze[60 * i]/2));
            }
           }
         }
         pop();
         
         push();
          translate(width/2, height/2);
         for(i=0;i<10;i++){
           rotate(TWO_PI/i);
           polygon(10, 10, 100, abs(x1(t1)/100) * intensity);
          
         }
         pop();
         
         //TEXTURE
          push();
           tint(255, 255, 255, 50);
           image(texture2, 0, 0, width, height);
          pop();

         break;
        
        case 'v':
         background(100);
         
         push();
          translate(100, 100);
         for(i=0;i<20;i+=2){
           stroke(40);
           fill(210);
           noFill();
           //rotate(PI/i);
           for (j=0;j<700;j+=100){
            for (k=0;k<500;k+=100){
             //translate(j, k);
             polygon(10 + j, 10 + k, 50 - i*2, abs(analyze[60 * i])/200 * intensity);
            }
           }
         }
         pop();
         
         
         push();
          translate(width/2, height/2);
         for(i=0;i<15;i++){
           stroke(180);
           fill(200);
           rotate(PI/i + abs(x6(t1)/100) / intensity);
           translate(0, 0);
           polygon(10, 10, 200, abs(x1(t1)/100) * intensity);
          
         }
         pop();
         
         push();
          translate(width/2, height/2);
         for(i=0;i<20;i++){
           stroke(200);
           fill(250);
           rotate(PI/i);
           translate(10, 0);
           polygon(10, 10, 100, abs(x3(t1)/50) * intensity);
          
         }
         pop();
         //TEXTURE
          push();
           tint(255, 255, 255, 50);
           image(texture1, 0, 0, width, height);
          pop();
         break;
         
        case 'd':
          background(250);
          push();
           translate(0, 0);
           image(albumArt, width/4, height/4, width/2, height/2);
           filter(THRESHOLD, map(intensity, 0, 10, 0.3, 0.7));
           //translate(width/2, height/2);
           //noFill();
           for (i=0;i<7;i+=2){
            stroke(40, 125, 100 + i*10);
            noFill();
            strokeWeight(1);
            rectMode(CENTER);
            rotate(0.18);
            translate(0, -50);
            quad(width/2 - 50, 
                 50, 
                 width/2 + x6(t1 + i) * intensity/7, 
                 height/2, 
                 width/2 + 50, 
                 height - 50,
                 width/2 - x6(t1 + i) * intensity/7, 
                 height/2);
     
            beginShape();
              vertex(width/2 + x6(t1 + i) * intensity/7, height/2);
              vertex(width/2 - x6(t1 + i) * intensity/7, height/2);
            endShape();
     
           }
           //TEXTURE
          pop();
          push();
           tint(255, 255, 255, 75);
           image(texture4, 0, 0, width, height);
          pop();
          break;
          
        case 'c':
          background(150);
          push();
           translate(0, 0);
           image(albumArt, width/4, height/4, width/2, height/2);
           filter(THRESHOLD, 0.3);
           noFill();
           
           for (i=0;i<7;i+=2){
            stroke(40);
            noFill();
            strokeWeight(1);
            rectMode(CENTER);
            rotate(-0.05);
            translate(0, 10);
            quad(width/2 - 50, 
                 50, 
                 width/2 + x6(t1 + i) * intensity/7, 
                 height/2, 
                 width/2 + 50, 
                 height - 50,
                 width/2 - x6(t1 + i) * intensity/7, 
                 height/2);
     
            beginShape();
              vertex(width/2 + x6(t1 + i) * intensity/7, height/2);
              vertex(width/2 - x6(t1 + i) * intensity/7, height/2);
            endShape();
     
           }
          pop();
          //TEXTURE
          push();
           tint(255, 255, 255, 100);
           image(texture3, 0, 0, width, height);
          pop();
          
          break;
          
        case 's':
          background(210);
          translate(0, 0);
            for (k=0;k<700;k+=100){
              for(l=0;l<500;l+=100){
                stroke(174);
                noFill();
                beginShape();
                vertex(75 + k, 75 + l);
                vertex(75 + k + randArray[k+10], 75 + l + randArray[k+10]);
                vertex(125 + k, 75 + l);
                //vertex(75 + k + randArray[k+1], 125 + l - randArray[l+1]);
                vertex(125 + k, 125 + l);
                endShape();
              }
            }
          
          translate(width/2.5, height/2.5);

          
          //BLACK QUADS
          for(i=0;i<10;i++){
            stroke(0 + i*20);
            noFill();
              quad(x1(t1 + i), 
                   y1(t1 + i),
                   x2(t1 + i), 
                   y2(t1 + i),
                   x3(t1 + i), 
                   y3(t1 + i),
                   x4(t1 + i), 
                   y4(t1 + i));
              
          }
          
          //BLUEGREEN QUADS
          for(j=0;j<10;j+=2){
            stroke(75, 125, 100 + j*20);
            noFill();
              quad(x3(t1 + j), 
                   y3(t1 + j),
                   x4(t1 + j), 
                   y4(t1 + j),
                   x5(t1 + j), 
                   y5(t1 + j),
                   x6(t1 + j), 
                   y6(t1 + j));
              
          }
          //TEXTURE
          push();
           tint(255, 255, 255, 50);
           image(texture2, 0, 0, width, height);
          pop();
          
          break;
          
        case 'x':
         push();
          background(210);
          translate(0, 0);
            for (k=0;k<700;k+=100){
              for(l=0;l<500;l+=100){
                stroke(174);
                noFill();
                beginShape();
                vertex(75 + k, 75 + l);
                vertex(75 + k + randArray[k+11], 75 + l + randArray[k+11] + analyze[60 + k]/2);
                vertex(125 + k, 75 + l);
                
                vertex(125 + k, 125 + l);
                endShape();
              }
            }
          
          translate(width/3, height/3);
          rotate(0.3);

          //BLACK WORMS
          for(i=0;i<10;i+=2){
            stroke(0 + i*20);
            noFill();
              rect(x2(t1+i) + analyze[60+i]/intensity, 
                   y2(t1+i) + analyze[600+i]/intensity, 
                   abs(x3(t1 + i))*2, 
                   abs(y3(t1 + i)), 
                   10, 
                   10);
              
          }
          
          //BLUEGREEN WORMS
          for(j=0;j<10;j+=2){
            stroke(75, 125, 100 + j*20);
            noFill();
              rect(x2(t1+j), 
                   y4(t1+j), 
                   abs(x1(t1+j) + analyze[70 + j]/intensity), 
                   abs(y1(t1+j) + analyze[700 + j]/intensity), 
                   50, 
                   50);
              
          }
          
         pop();
         //TEXTURE
         push();
          tint(255, 255, 255, 50);
          image(texture3, 0, 0, width, height);
         pop();
          break;
          
        case 'z':
         background(40);
            translate(0, 0);
            for (k=0;k<700;k+=100){
              for(l=0;l<500;l+=100){
                stroke(100);
                noFill();
                beginShape();
                vertex(75 + k, 75 + l);
                //vertex(75 + k + randArray[k+10], 75 + l + randArray[k+10]);
                vertex(75 + k, 125 + l);
                vertex(75 + k + randArray[k], 125 + l - randArray[l] - analyze[60 + k]/2);
                vertex(125 + k, 125 + l);
                endShape();
              }
            }
          push();
           translate(width/2, height/2);
           //WHITE TRIANGLES
           for(i=0;i<10;i++){
             stroke(100 + i*20);
             noFill();
               triangle(x2(t1+i), 
                        y2(t1+i), 
                        x3(t1+i) + analyze[60+i]/(intensity/2), 
                        y3(t1+i) + analyze[600+i]/(intensity/2), 
                        x4(t1), 
                        y4(t1));
           }
           
           //ORANGE TRIANGLES
           for(j=0;j<12;j+=3){
             stroke(230, 100, 50 + j*10);
             noFill();
               triangle(x4(t1+j) + analyze[50+i]/(intensity/3), 
                        y4(t1+j) + analyze[300 + j]/(intensity/3), 
                        x5(t1+j), 
                        y5(t1+j), 
                        x6(t1+j), 
                        y6(t1+j));
           }
          pop();
          //TEXTURE
          push();
           tint(255, 255, 255, 50);
           image(texture2, 0, 0, width, height);
          pop();
          
          break;
          
        case 'a':
        default:
            background(40);
            translate(0, 0);
            for (k=0;k<700;k+=100){
              for(l=0;l<500;l+=100){
                stroke(100);
                noFill();
                beginShape();
                vertex(75 + k, 75 + l);
                //vertex(75 + k + randArray[k+10], 75 + l + randArray[k+10]);
                vertex(75 + k, 125 + l);
                vertex(75 + k + randArray[k], 125 + l - randArray[l]);
                vertex(125 + k, 125 + l);
                endShape();
              }
            }
            
         push();
          translate(width/2, height/2);
          //WHITE TRIANGLES
          for(i=0;i<10;i++){
            stroke(100 + i*20);
            noFill();
              triangle(x1(t1+i), 
                       y1(t1+i), 
                       x2(t1+i), 
                       y2(t1+i), 
                       x3(t1), 
                       y3(t1));
          }
          
          //ORANGE TRIANGLES
          for(j=0;j<12;j+=3){
            stroke(230, 100, 50 + j*10);
            noFill();
              triangle(x4(t1+j),
                       y4(t1+j), 
                       x5(t1+j), 
                       y5(t1+j), 
                       x1(t1+j), 
                       y1(t1+j));
          }
         pop();
          
        push();
         tint(255, 255, 255, 50);
         image(texture1, 0, 0, width, height);
        pop();
        
      break;
          

          
         
      }
      pop();
      
      //LYRICS
      push();
      textAlign(LEFT, CENTER)
       //IF ONLY I COULD
       if (keyIsDown(76)){
        tint(240, 150);
        image(lyric1, 0, abs(x6(t1))/5, width, height);
       }
       //WIN THIS LOT
       if (keyIsDown(85)){
        tint(255, 255, 255, 150);
        image(lyric2, abs(y6(t1))/5, 0, width, height);
       }
       //OH GOLDEN CROWNED
       if (keyIsDown(72)){
        tint(255, 255, 255, 200);
        image(lyric3, 0, -(abs(x6(t1)))/5, width, height);
       }
       //A
       if (keyIsDown(73)){
        tint(255, 255, 255, 200);
        image(lyric4, x3(t1)/5, 0, width, height);
       }
       //PHRO
       if (keyIsDown(75)){
        tint(255, 255, 255, 200);
        image(lyric5, 0, 0, width, height);
       }
       //DI
       if (keyIsDown(89)){
        tint(255, 255, 255, 200);
        image(lyric6, abs(x1(t1))/5, y1(t1), width, height);
       }
       //TE
       if (keyIsDown(74)){
        tint(255, 255, 255, 200);
        image(lyric7, 0, -(abs(y2(t1)/5)), width, height);
       }
      pop();
     
     
        //TIME
        

        if (song.currentTime() >= song.duration() - 2){
          SCENE_SELECT = 2;
        }



      } else if (SCENE_SELECT == 2){

        image(titleCard, 0, 0, width, height);
        image(albumArt, width/4, height/4, width/2, height/2);
        filter(THRESHOLD, 0.3);

      }

  }
  t1+=0.02;

}


// function mousePressed(){
//   if (SCENE_SELECT == 0){
//     song.play();
//     SCENE_SELECT = 1;
//   } else if (SCENE_SELECT == 1){
//     SCENE_SELECT = 2;
//     song.stop();
//   } else if (SCENE_SELECT == 2){
//     song.playMode('restart');
//     song.play();
//     SCENE_SELECT = 1;
//   }
// }


  //CAMERA//
  
  function keyTyped(){

    if(song.isLoaded()){

      if (SCENE_SELECT == 0){
        song.play();
        SCENE_SELECT = 1;
      } else if (SCENE_SELECT == 1){

        if (key == 'q'){
          camera = 'a';
        } else if (key == 'e'){
          camera = 'd';
        }else if (key == 'w'){
          camera = 's';
        } else if (key == 'r'){
         camera = 'f';
        } else if (key == 'a'){
         camera = 'z';
        } else if (key == 's'){
         camera = 'x';
        } else if (key == 'd'){
         camera = 'c';
        } else if (key == 'f'){
         camera = 'v';
        }

      } else if (SCENE_SELECT == 2){
        song.playMode('restart');
        song.play();
        SCENE_SELECT = 1;
      }

      
      return false;
    }
  }
  
  //FIRST COORDINATE//
function x1(t1){
  return cos(t1 / 6) * 130 + sin(t1 / 30) + 30;
}

function y1(t1){
  return sin(t1 / 10) * 100;
}

  //SECOND COORDINATE//
function x2(t1){
  return cos(t1 / 20) * 300 + sin(t1/2) * 60;
}

function y2(t1){
  return cos(t1 / 15) * 250;
}

  //THIRD COORDINATE//
function x3(t1){
  return sin(t1 / 5) * 50 + sin(t1/40) * 120;
}

function y3(t1){
  return sin(t1 / 12) * 90;
}

  //FOURTH COORDINATE//
function x4(t1){
  return cos(t1 / 2) * 10 + sin(t1 / 3) * 35;
}

function y4(t1){
  return sin(t1 / 5) * 180;
}

  //FIFTH COORDINATE//
function x5(t1){
  return sin(t1 / 90) * 128 + cos(t1 / 83) * 200;
}

function y5(t1){
  return cos(t1 / 12) * 70;
}

 //SIXTH COORDINATE//
 function x6(t1){
  return sin(t1 / 5) * 125 + sin(t1 / 5) * 125;
 }
 function y6(t1){
  return cos(t1 / 5) * 125 + cos(t1 / 5) * 125;
 }
//sin(t / FREQ) * AMP


 //POLYGON CREATOR//
 
 function polygon(x, y, radius, npoints) {
  var angle = TWO_PI / npoints;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius;
    var sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}