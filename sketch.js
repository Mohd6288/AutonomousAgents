let particles = [];
let target;
let circlesize;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
  target = createVector(0, 0);
  circlesize = 80;

  for (let i = 0; i < 20; i++) {
    let newparticles = new Particle(random(width), random(height), random(0, 10));
    particles.push(newparticles);
  }
}

function draw() {
  background(10, 10,10,10);

  text(circlesize -750 * -1, 10, 10);
  // paricles.entries returns an array whose elements are arrays corresponding to the enumerable string
  for (let [i, particle] of particles.entries()) { //
    particle.grow(); // grow the particle
    particle.update(target.x, target.y); // update the particle
    particle.show(); // show the particle
  }
  
  noStroke();
  strokeWeight(0.5)
  fill(255, 50, 0);
  target.x = cos((millis()/1000)%(TWO_PI))*80; // 200 is the radius of the orbit
  target.y = sin((millis()/1000)%(TWO_PI))*80; // 200 is the radius of the orbit
  target.x += windowWidth/2; // center the orbit
  target.y += windowHeight/2;//// center the orbit
  fill(252,15,20,50);
  stroke(125, 15, 20);
  circle(target.x, target.y, 80); // draw the target
  
 

  for(let i=0 ; i < particles.length; i++){
    let distance = dist(particles[i].newSegment.x, particles[i].newSegment.y, target.x, target.y);
  
    print(distance)
    if(distance < 40){
      particles.splice(i,1); // remove the particle if it gets close to the target
      circlesize += 1;
      fill(255,50,50,50) // draw the target
      circle(target.x, target.y, circlesize);
      particles.push(new Particle(random(width), random(height), random(0, 10))); // add a new particle
    } else if (distance < 100){
      particles[i].growRate = 1.5; // how fast the particle grows
    }
  }
  // condition to stop the loop if the circle zize get 750
  if(circlesize > 750){
    fill(255,150,150,50)
    textSize(200)
    text("BOOOOOOOOM", width/2 -800, height/2);
    noLoop();

  }


}
