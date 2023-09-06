class Particle {
  constructor(x, y, offset = 0){ // offset is how much the particle is offset from the ground
    this.particle = []; // the particle array
    this.newSegment = createVector(x, y); // the new segment of the particle
    this.particle.push(this.newSegment);
    this.newLength = 5; // how long the new segment is
    this.growRate = 26; // how fast the particle grows
    this.segmentMax = 30; // how long the particle can grow before it starts a new segment
    this.offset = offset; // how much the particle is offset from the ground
    this.radius = random (5,15); // how big the particle is
    this.wave = 10; // the wave of the particle
  }
  
  // grow new segment to the particle array until it reaches a maximum length, then start new segment
  grow(){
    this.newLength += this.growRate;
    if(this.newLength > this.segmentMax){
      //push new end point to this.particle array
      this.particle.push(this.newSegment);
      this.newLength = .001;
    }
    // trim trail length 
    if(this.particle.length > 50){
      this.particle.splice(0,1);
    }
  }
  
  update(x, y){
    let currentEndPoint = this.particle[this.particle.length -1]; // get the current end point of the particle
    let goal = createVector(x, y); // set the goal to the sun
    let newVector = p5.Vector.sub(goal, currentEndPoint); // get the vector from the current end point to the goal
    let newHeading = newVector.heading();// get the angle of the new vector
    this.newSegment = newVector; // set the new segment to the new vector
    this.newSegment.rotate(cos(this.wave)); // rotate the particle
    this.newSegment.setMag(this.newLength); // set the length of the new segment
    this.newSegment.x += currentEndPoint.x; // offset the particle to make it look like it's growing from the ground
    this.newSegment.y += currentEndPoint.y - this.offset;  // offset the particle to make it look like it's growing from the ground
    this.wave = sin((millis()/100)%(cos(PI)))/(this.newLength); // 200 is the radius of the orbit
  }

  show(){
    noStroke();
    fill(150,50,40,100);
    circle(this.newSegment.x, this.newSegment.y, this.radius);

    noFill();
    stroke(125, 15, 20);
    // noStroke()
    beginShape();
    // fill(100,140,200,50)
    for(let i = 0; i < this.particle.length; i++){
      vertex(this.particle[i].x, this.particle[i].y); // draw the particle
    }
      vertex(this.newSegment.x, this.newSegment.y);// draw the new segment
    endShape();
    
  }
  
}