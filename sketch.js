const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var rocket, rocketAnimation, offrocket;
var bg_img;
var invisibleGround, ground;
var GameOverIMG, GameOver;
var BGM;
var playAgainBtn;
var blank1, blank2;
var launchSide1, launchSide2, launchSide3;
var invisibleWall1, invisibleWall2;
var leftTurnIMG, rightTurnIMG;

var score = 100;


function preload() {

rocketAnimation = loadAnimation('./assets/ship.on.png','./assets/ship.half.png');
offrocket = loadAnimation('./assets/ship.off.png');
leftTurnIMG = loadAnimation('./assets/LeftSide.png', './assets/LeftHalf.png');
rightTurnIMG = loadAnimation('./assets/RightSide.png', './assets/RightHalf.png');

GameOverIMG = loadAnimation('./assets/GameOver.png');
playAgainIMG = loadAnimation('./assets/Enter.png');
blank1 = loadAnimation("./assets/blankscreen1.png");
blank2 = loadAnimation("./assets/blankscreen2.png");

bg_img = loadImage('./assets/bgIMG.jpg');

BGM = loadSound("BGM.mp3");

}


function setup() {
  createCanvas(1250,700);

  BGM.play();
  BGM.setVolume(0.15);  

  rocket = createSprite(625, 500, 50, 50);
  rocket.addAnimation('boom', rocketAnimation);
  rocket.addAnimation('no', offrocket);
  rocket.addAnimation('left', leftTurnIMG);
  rocket.addAnimation('right', rightTurnIMG);
  rocket.changeAnimation('no')
  rocket.scale = 0.5;

  invisibleGround = createSprite(1, 695, 9999999999999999999999999999999999999999999, 5);
  invisibleWall1 = createSprite(1249, 350, 5, 999999999999999999999999999999999999999);
  invisibleWall2 = createSprite(1, 1, 9999999999999999999999999999999999999999999999, 5);
  invisibleWall3 = createSprite(1, 359, 5, 999999999999999999999999999999999999999999);

  ground = createSprite(625, 590, 140, 40);
  ground.shapeColor = "blue"

  playAgainBtn = createSprite(625, 500, 0.1, 0.1);
  playAgainBtn.addAnimation("again", playAgainIMG);
  playAgainBtn.addAnimation("huh2", blank2);
  playAgainBtn.changeAnimation("huh2");

  GameOver = createSprite(625, 260, 0.1, 0.1);
  GameOver.addAnimation("done", GameOverIMG);
  GameOver.addAnimation("huh", blank1);
  GameOver.changeAnimation("huh");

  launchSide1 = createSprite(685, 520, 20, 100);
  launchSide1.shapeColor = "blue"

  launchSide2 = createSprite(565, 520, 20, 100);
  launchSide2.shapeColor = "blue"


  engine = Engine.create();
  world = engine.world;                

}


function draw() 
{
  background(54);
  image(bg_img,0,0,width,height);
  Engine.update(engine);

  rocket.velocityY = rocket.velocityY + 0.5

  textSize(20);
  stroke("blue");
  text("Fuel: " + score, 50, 20)

  if (keyIsDown(UP_ARROW)) {
    rocket.changeAnimation('boom'); 
    rocket.velocityY = rocket.velocityY - 1.5
    score += -1
  }
  else{
    rocket.changeAnimation('no');
  }

  if (keyIsDown(LEFT_ARROW) && keyIsDown(UP_ARROW)) {
    rocket.x += -10
    rocket.changeAnimation('left')
  }
  else {
    if (keyIsDown(LEFT_ARROW)){
      rocket.x += -10
    }
  }

  if (keyIsDown(RIGHT_ARROW) && keyIsDown(UP_ARROW)) {
    rocket.x += 10
    rocket.changeAnimation('right')
  }
  else {
    if (keyIsDown(RIGHT_ARROW)){
      rocket.x += 10
    }
  }

  if (rocket.x < 1){
    rocket.x = 99999999999999999999999999
  }

  if (rocket.collide(invisibleGround)) {
    GameIsOver();
  }

  if (score == 0){
    GameIsOver();
  }

  if (rocket.collide(ground)) {
    score = 100
    for (i=0; i<=30; i+10) {

    }
  }

  text("Fuel Platform", 570, 640);
  
  rocket.collide(ground);
  rocket.collide(launchSide1);
  rocket.collide(launchSide2);
  rocket.collide(invisibleWall1);
  rocket.collide(invisibleWall2);
  rocket.collide(invisibleWall3);

  
  drawSprites();
}

function retry() {
  rocket.x = 625;
  rocket.y = 500;
  GameOver.changeAnimation("huh");
  playAgainBtn.changeAnimation("huh2");
  score = 100;
  ground.x = 625;
  launchSide1.x = 685;
  launchSide2.x = 565;
  BGM.play();
}

function createRetryBtn() {
  playAgainBtn.changeAnimation("again");
  playAgainBtn.scale = 1
}

function createOverscreen() {
  GameOver.changeAnimation("done");
  GameOver.scale = 2.5;
}

function GameIsOver() {
  rocket.x = 99999999999999999999999999999999999999;
  createOverscreen();
  createRetryBtn();
  BGM.stop();
  ground.x = 999999999999999999999999999999999999999;
  launchSide1.x = 9999999999999999999999999999999999;
  launchSide2.x = 9999999999999999999999999999999999; 
  if (keyIsDown(ENTER)) {
    retry();
  }
}