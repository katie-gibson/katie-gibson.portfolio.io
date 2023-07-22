//catch as many fish as you can without the shark eating your line!!

let fishes = [];
let sharks = [];
let catchCount = 0;
let sketch = 1;

function preload(){
  fishIMG = loadImage('piranha.png')
  sharkIMG = loadImage('shark.png');
  oceanSounds = loadSound('OS.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 8; i++) {
    fishes.push(new fish());
  }
  
    for (let i = 0; i < 1; i++) {
    sharks.push(new shark());
  }
}

function draw() {
if (sketch == 1) {
      sketch1();
    } else if (sketch == 2) {
      sketch2();
    } else if (sketch == 3) {
      sketch3();
      oceanSounds.stop();
    }
}

function mousePressed() {
  //if mousepressed sketch++ until i=3, then reset sketch back to 1
  sketch++
  if (sketch > 3) {
    sketch = 1;
  }
  if (sketch == 2) {
    oceanSounds.play();
  } else if (sketch == 1 || sketch == 3) {
    oceanSounds.stop();
  }
}
function sketch1() {
  background(224, 246, 255);
  
  catchCount = 0;
  
//this is just a cute element for the start
  for(let i = 0; i < 8; i++){
    fishes[i].move();
    fishes[i].display();
  }
//displays number of fish that have been caught
  textSize(100); noStroke(); fill(0); textAlign(CENTER);
  text('HOOK, LINE', windowWidth/2, windowHeight/2-50);
  text('& SINKER', windowWidth/2, windowHeight/2+50);
  textSize(40);
  text('CLICK TO PLAY', windowWidth/2, windowHeight/2+150)
}

function sketch2() {
//the water that is not very accurately colored but pretty  
  background(224, 246, 255);

//displays number of fish that have been caught
  textSize(25); noStroke(); fill(0);
  text('fish:'+ catchCount, windowWidth-100, 100);

//show the fishing line and hook
  fishLine.display();

//shows the fish
  for(let i = 0; i < 8; i++){
    fishes[i].move();
    fishes[i].display();
    if(mouseX > fishes[i].x && mouseX < fishes[i].x+110 && mouseY+125 > fishes[i].y && mouseY+125 < fishes[i].y+46) {
      fishes[i].x = -300;
      catchCount++;
    } //this detects if the fish are touching the hook
  }
  
//shows the shark
  for(let i = 0; i < 1; i++){
    sharks[i].move();
    sharks[i].display();
    if(mouseX > sharks[i].x && mouseX < sharks[i].x+110 && mouseY+125 >sharks[i].y && mouseY+125 < fishes[i].y+46) {
      sketch = 3;
    } //this ends the game
  }
}

function sketch3() {
  background(224, 246, 255);

//this is a cute element for the end screen
    for(let i = 0; i < 1; i++){
    sharks[i].move();
    sharks[i].display();
    }
  //displays number of fish that have been caught
  textSize(100); noStroke(); fill(0); textAlign(CENTER);
  text('GAME OVER', windowWidth/2, windowHeight/2);
  textSize(40);
  text('CLICK TO PLAY AGAIN', windowWidth/2, windowHeight/2+80);
}

let fishLine = {//fishing line and hook
  display: function() {
    noFill();  
    strokeWeight(3);
    stroke(0);
    arc(mouseX, mouseY+95, 30, 60, 0, HALF_PI);//hook
    stroke(0);
    line(mouseX, mouseY-700, mouseX, mouseY+125);//fishing line
  }
}

class fish {
  constructor() {
    this.img = fishIMG;
    this.x = random(width);
    this.y = random(100, height);  
    this.xSpeed = random(1, 3);
    this.ySpeed = random(-1,1);
  }
  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    if(this.y < 150||this.y > height) {
      this.ySpeed = random(-1,1);
    }
    if(this.x > width) {
      this.x = random(-500, -100);
      this.y = random(100, height);
    }  
  }
  display(){
    image(fishIMG, this.x, this.y, 110, 46);
  }  
}

class shark {
  constructor() {
    this.img = sharkIMG;
    this.x = random(width);
    this.y = random(100, height);  
    this.xSpeed = random(1, 3);
    this.ySpeed = random(-1,1);
  }
  move() {
    this.x -= this.xSpeed;
    this.y += this.ySpeed;
    if(this.y < 150||this.y > height) {
      this.ySpeed = random(-1,1);
    }
    if(this.x + 350 < 0) {
      this.x = random(width+500, width+100);
      this.y = random(100, height);
    }  
  }
  display(){
    image(sharkIMG, this.x, this.y, 300, 170);
  }    
}
