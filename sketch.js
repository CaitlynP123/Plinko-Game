const Engine = Matter.Engine
const World = Matter.World
const Events = Matter.Events
const Bodies = Matter.Bodies 

var particles = [];
var plinkos = [];
var divisions =[];

var divisionHeight=300;

var score = 0;
var count = 0;

var gameState ="play";

function setup() {
  createCanvas(800, 800);

  engine = Engine.create();
  world = engine.world;
  
  ground = new Ground(400,800,800,10);

  wall1 = new Ground(0,400,10,800)
  wall2 = new Ground(800,400,10,800);
  wall3 = new Ground(400,800,800,10);
  wall4 = new Ground(400,0,800,10);

  for (var k = 0; k <=width; k = k + 80) {
    divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
  }

  for (var j = 75; j <=width; j=j+50) {
    plinkos.push(new Plinko(j,75));
  }

  for (var j = 50; j <=width-10; j=j+50) {
    plinkos.push(new Plinko(j,175));
  }

  for (var j = 75; j <=width; j=j+50) {
    plinkos.push(new Plinko(j,275));
  }

  for (var j = 50; j <=width-10; j=j+50) {
    plinkos.push(new Plinko(j,375));
  }  
}
 
function draw() {
  background("black");
  
  textSize(35)
  text("Score : "+score,20,40);
  text("Count : "+count,600,40);
  fill("white");

  textSize(30)
  fill("white")
  text("500",15,700)
  text("400",95,700)
  text("300",175,700)
  text("200",255,700)
  text("100",335,700)
  text("100",415,700)
  text("200",495,700)
  text("300",575,700)
  text("400",655,700)
  text("500",735,700)
  
  Engine.update(engine);
  
  if(frameCount % 60==0){
    count++;
    particles.push(new Particle(Math.round(random(10,790)), 10, 10, 10)); 
  }

  if (count >= 10) {
    gameState ="end";

    textSize(100);
    text("GameOver", 150, 250);
  }

  for (var i = 0; i < plinkos.length; i++) {
     plinkos[i].display();  
  }
 
  for (var i = 0; i < particles.length; i++) {
     particles[i].display();
      
     if (particles[i].body.position.x > 0 && particles[i].body.position.x < 80
      && particles[i].body.position.y > 760 || particles[i].body.position.x < 800 
      && particles[i].body.position.x > 720 && particles[i].body.position.y>760) 
    {
      score=score+500;
      particles.pop();
     }

    else if (particles[i].body.position.x > 80 && particles[i].body.position.x < 160
      && particles[i].body.position.y > 760 || particles[i].body.position.x < 720 
      && particles[i].body.position.x > 640 && particles[i].body.position.y>760) 
    {
      score=score+400;
      particles.pop();
    }

    else if (particles[i].body.position.x > 160 && particles[i].body.position.x < 240
      && particles[i].body.position.y > 760 || particles[i].body.position.x < 640 
      && particles[i].body.position.x > 560 && particles[i].body.position.y>760) 
    {
      score=score+300;
      particles.pop();
    }

    else if (particles[i].body.position.x > 240 && particles[i].body.position.x < 360
      && particles[i].body.position.y > 760 || particles[i].body.position.x < 560 
      && particles[i].body.position.x > 480 && particles[i].body.position.y>760)
    {
      score=score+200;
      particles.pop();
    }

    else if (particles[i].body.position.x > 360 && particles[i].body.position.x < 480
      && particles[i].body.position.y > 760) 
    {
      score=score+100;
      particles.pop();
    }
   }

   for (var k = 0; k < divisions.length; k++) {
     divisions[k].display();
   }

   ground.display();
   
   wall1.display()
   wall2.display()
   wall3.display()
   wall4.display()
  }