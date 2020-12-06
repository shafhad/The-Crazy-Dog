var dog,dogRunning;
var obstacle,coin,coinimg;
var bird,box;
var backgroundImg
var bg1,bg1img;
var bg2,bg2img;
var portalimg;
var portal;
var obstaclesGroup;
var birdsGroup;
var boxesGroup;
var portalGroup;
var portalGroup;
var gameState="play";
var gameState="end";
var invisibleground;
var coyote,coyoteimg;


 function preload(){
  getBackgroundImg();
  dogRunning=loadAnimation( "dog1.png","dog2.png","dog3.png","dog4.png");
  portalimg=loadImage( "portal4.png");
  bg1img=loadImage("bg1.jpg");
  bg2img=loadImage("bg2.jpg");

obstacle1 = loadAnimation( "barrel4.png","barrel4.png","barrel4.png");
obstacle1.scale=0.4;
obstacle2 = loadAnimation( "fire1.png","fire2.png","fire3.png","fire4.png","fire5.png","fire5.png","fire6.png","fire7.png","fire8.png","fire9.png","fire10.png","fire11.png");
obstacle2.scale=0.5;
obstacle3 = loadAnimation( "snail4.png","snail4.png","snail4.png");
obstacle3.scale=0.2;
obstacle4=loadAnimation( "rock3.png","rock3.png","rock3.png");
bird1 =loadAnimation( "bd1.png","bd2.png","bd3.png","bd4.png","bd5.png","bd6.png","bd7.png","bd8.png",);
bird2 =loadAnimation( "bd1.png","bd2.png","bd3.png","bd4.png","bd5.png","bd6.png","bd7.png","bd8.png",);
coinimg=loadAnimation("coin1.png","coin2.png","coin3.png","coin4.png","coin5.png","coin6.png","coin7.png","coin8.png","coin9.png","coin1.png")
coyoteimg=loadAnimation("coyote1.png","coyote2.png","coyote3.png");

box1=loadAnimation("3boxes.jpg","3boxes.jpg","3boxes.jpg");
box2=loadAnimation("4boxes.jpg","4boxes.jpg","4boxes.jpg");

}



function setup() {
createCanvas(windowWidth,windowHeight);
  
  bg1=createSprite(windowWidth/2,windowHeight/5);
  bg1.addImage("background",bg1img);
  bg1.scale=3.5;
 
  dog=createSprite(200, 660, 50, 50);
  dog.addAnimation("running", dogRunning);
  dog.scale=3;

  invisibleground=createSprite(windowWidth/2,695,windowWidth,10);
  invisibleground.visible=false;

  coyote=createSprite(50,630);
  coyote.addAnimation("coyoteimg",coyoteimg);
  coyote.scale=1.4;
  coyote.debug=true;
   
 obstaclesGroup = new Group();
 birdsGroup= new Group();
 boxesGroup=new Group();
 portalGroup= new Group();
  
}

function draw() {
  background(255); 

  
/*if(keyDown(RIGHT_ARROW)){
  dog.x=dog.x+15;
}
if(keyDown(LEFT_ARROW)){
  dog.x=dog.x-3;
}*/

dog.collide(invisibleground);
dog.debug=true;
console.log(dog.x);
dog.setCollider("rectangle",0,0,20,20);
bg1.velocityX=-3;
if(gameState==="play"){
    if(keyDown(UP_ARROW)){
      dog.x=dog.x+0.8;
       }
  dog.x=150;
    if(bg1.x<0){
      bg1.x=displayWidth/2;
    }
    dog.x=camera.position.x-450;

    if(frameCount%220===0){
      spawnCoins();
    }

    if(frameCount===90){
      portal=createSprite(358,655);
      portal.addImage("portal",portalimg);
      portal.debug=true;
      portalGroup.add(portal);
    }
    if(portalGroup.isTouching(dog)){
     bg1.changeImage("bg2img",bg2img);
     portalGroup.destroyEach();
   }
  
   if(keyDown(UP_ARROW) && dog.y>600){
    dog.velocityY=-18;
    camera.position.y=dog.y;
  }
  dog.velocityY=dog.velocityY+0.8;
    
  spanObstacles();
  spawnBirds();
  spawnBoxes();

  if(obstaclesGroup.isTouching(dog)){
    gameState="end"
  }
}
if(gameState==="end"){
  dog.velocityX=0;
  dog.velocityY=0;
  obstaclesGroup.velocityX=0;
  portalGroup.velocityX=0;
  birdsGroup.velocityX=0;
  boxesGroup.velocityX=0;
  
  
}  
console.log(obstaclesGroup);
console.log(gameState);
drawSprites();
}

function spanObstacles() {
  if(frameCount%150===0){
    var randy=Math.round(random(590,610))
    obstacle = createSprite(displayWidth,620,10,40);
    obstacle.scale=0.5;
     obstacle.debug=true; 
     obstacle.setCollider("rectangle",0,0,250,320)
      //generate random obstacles
      var randy= Math.round(random(1,3));
      obstacle.velocityX=-7;
      //obstacle.scale=0.5;
      switch(randy) {
        case 1: obstacle.addAnimation( "obstacle", obstacle1);
                obstacle1.scale=0.5;                                             
                break;
        case 2: obstacle.addAnimation( "obstacle2", obstacle2);
                obstacle2.scale=0.5;
                break;
        case 3: obstacle.addAnimation( "obstacle3", obstacle4);
                obstacle3.scale=0.5;
                break;
        case 4: obstacle.addAnimation( "obstacle4", obstacle3);
                obstacle4.scale=0.5;
                 break;
        default: break;

      }
      
  obstaclesGroup.add(obstacle);
}}
function spawnBirds(){
  if(frameCount%400===0){
    var randx=Math.round(random(580,640))
    bird = createSprite(displayWidth,220,10,40);
    bird.velocityX=-7;
    bird.debug=true;
    var rand=Math.round(random(1,2))
    switch(rand){
     case 1:bird.addAnimation("bird1", bird1);
            bird.scale=0.5;
            break;

     case 2:bird.addAnimation("bird2", bird2);
             bird.scale=0.5;
             break;
    default: break;
    }

    birdsGroup.add(bird);
  }
}

function spawnCoins() {
  var rand=Math.round(random(3,7));
  var y=random(300,500);
 
  for(var i=0;i<rand ;i++){

    coin=createSprite(600+i*50, y);
    coin.addAnimation("coinimg" , coinimg);
    coin.debug=true;
    coin.velocityX=-5;
    coin.scale=0.5;
    
  }
}

function spawnBoxes(){
  if(frameCount % 300===0){
    var rand=Math.round(random(1,2))
    box=createSprite(590,440);
    box.velocityX=-3;
    

    switch(rand){
      case 1:box.addAnimation("box1", box1);
             box.scale=0.2;
             break;

      case 2:box.addAnimation("box2",box2);
              box.scale=0.2;
              break;

       default:break;
          }

      boxesGroup.add(box);
  }
}
async  function  getBackgroundImg(){
  var  response = await fetch ("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var  responseJSON = await response.json();

  var datetime =responseJSON.datetime;
  var hour =datetime.slice(11,13);
 

 if(hour>=00 && hour<=24){
       bg="bg1.jpg";
 }}


