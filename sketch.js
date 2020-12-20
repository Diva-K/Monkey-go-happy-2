var monkey,ground,invisibleGround,ObstaclesGroup,count,BananasGroup;
var bananaImg,jungleImg,MonkeyImg,stoneImg;

function preload(){
bananaImg=loadImage("images/banana.png");
jungleImg=loadImage("images/jungle.jpg");
MonkeyImg=loadAnimation("images/Monkey_01.png","images/Monkey_02.png","images/Monkey_03.png")
stoneImg=loadImage("images/stone.png")
}
function setup() {
  createCanvas(800,400);
  createSprite(400, 200, 50, 50);
   monkey=createSprite(100,340,20,50);
monkey.addAnimation("monkey",MonkeyImg);
monkey.scale=0.1;

 ground=createSprite(400,370,800,10);
ground.velocityX=-4;
ground.x=ground.width/2;
ground.addImage("ground",jungleImg);
ground.scale=1.5;

 invisibleGround = createSprite(400,375,800,10);
invisibleGround.visible = false;

 count=0;

ObstaclesGroup=createGroup();
 BananasGroup=createGroup();
}

function draw() {
  background(255,255,255);
  background(255);
      if (ground.x < 0){
      ground.x = ground.width/2;
    }
     if(keyDown("space") && monkey.y >= 339){
      monkey.velocityY = -12 ;
    }
    if(BananasGroup.isTouching(monkey)){
      BananasGroup.destroyEach();
      count=count+1;
    }
 
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8;
   
    monkey.collide(invisibleGround);
   
    spawnObstacles();
    spawnBananas();
    if(frameCount%5===0){
      count++
    }
    drawSprites();
    text ("score:"+count,350,50);
  

  
   
 
}

  
function spawnBananas() {
 
  if (World.frameCount % 120 === 0) {
    var banana = createSprite(400,200,40,10);
    banana.y = random(250,320);
    banana.addImage(bananaImg);
    banana.scale = 0.07;
    banana.velocityX = -3;
   
     //assign lifetime to the variable
    banana.lifetime = 134;
   
    //adjust the depth
    banana.depth=monkey.depth;
    monkey.depth=monkey.depth+1;
    //add each banana to the group
      BananasGroup.add(banana);
  }
 
}
function spawnObstacles() {
  if(World.frameCount % 60 === 0) {
    var obstacle = createSprite(400,341,10,40);
    obstacle.velocityX = - (6 + 3*count/100);
   
    //generate random obstacles
    //var rand = Math.round (random(1,6));
    obstacle.addImage(stoneImg);
   
    //assign scale and lifetime to the obstacle          
    obstacle.scale = 0.15;
    obstacle.lifetime = 70;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }
}  