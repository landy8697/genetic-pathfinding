var maxSteps = 400; 
/*maximum amount of steps a dot can take, based on the min of the 
previous generation
*/

/* current fitness function
void calculateFitness(){
    if(reachedGoal){
      fitness = 1.0/16.0 + 10000.0/(float)(brain.step*brain.step);
    }else{
      float distanceToGoal = dist(pos.x, pos.y, goal.x, goal.y);
      fitness = 1.0/ (distanceToGoal*distanceToGoal);
    }
  }
*/

/*
* Add fitness function for each dot
* CalcAllFitness for population
* check fitness function
* mutate() controls, use linear interpolation
* get parents through a proportional system based on fitness (try fitness^2 too??)
* top 5% elitism
* 
*/
class Population{
    constructor(size){
        this.size = size;
        this.dots = new Array(size);
        this.minSteps = 400;
        for(let i=0; i<size; i++){
            this.dots[i] = new Dot();
        }
    }

    update(){
        for(let i=0; i<this.size; i++){
            if(this.dots[i].controls.stepCnt > this.minSteps){
                this.dots[i].dead = true;
            }
            this.dots[i].update();
        }
    }

    
    draw(){
        for(let i=0; i<this.size; i++){
            this.dots[i].draw();
        }
    }

    nextGeneration(genSize){
        console.log("Generation");
        let fitnessSum = 0;
        this.calcAllFitness();
        for(let i=0; i<this.size; i++){
            fitnessSum += this.dots[i].fitness;
        }
        
        let newDots = new Array(genSize);
        
        for(let i=0; i<genSize; i++){
            newDots[i] = new Dot();
            newDots[i].controls = this.selectParent(fitnessSum).controls.clone();
            newDots[i].controls.mutate();
            //newDots[i].controls = this.dots[0].controls.clone();
        }
        
        newDots[0].controls = this.bestDot().controls.clone();
        this.size = genSize;
        this.dots = newDots;
        console.log(`Max Steps: ${this.minSteps}`)
    }
     
    bestDot(){
        let maxFitness = 0;
        let bestDot = 0;
        for(let i=0; i<this.size; i++){
            if(this.dots[i].fitness > maxFitness){
                maxFitness = this.dots[i].fitness;
                bestDot = i;
            }
        }
        let best = this.dots[bestDot];
        if(best.done){
            this.minSteps = best.controls.stepCnt;
        }
        
        return best;
    }
    calcAllFitness(){
        for(let i=0; i<this.size; i++){
            this.dots[i].calcFitness();
            //console.log(this.dots[i].fitness);
        }
    }

    allDead(){
        
        for(let i=0; i<this.size; i++){
            if(!(this.dots[i].dead||this.dots[i].done)){
                return false;
            }
        }
        return true;
    }

    selectParent(fitnessSum){
        let selector = random() * fitnessSum;
        let curSum = 0;
        for(let i=0; i<this.size; i++){
            curSum += this.dots[i].fitness;
            if(selector < curSum){
                return this.dots[i];
            }
        }
        return this.dots[this.size-1]; //should never reach here
    }
}
class Dot{
    constructor(){
        this.controls = new Controls(400)
        this.pos = createVector(startPos.x, startPos.y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.dead = false;
        this.done = false;
        this.fitness = 0.0;
    }

    draw(){
        stroke(255, 0, 0);  
        ellipse(this.pos.x, this.pos.y, 1, 1);
    }
    move(){
        if (this.controls.stepCnt < maxSteps){
            this.acc = this.controls.steps[this.controls.stepCnt];
        }else{
            this.dead = true;
        }

        this.vel.add(this.acc);
        this.vel.limit(5);
        this.pos.add(this.vel);
        this.controls.stepCnt += 1;
    }

    update(){
        
        if(this.dead)return;
        if(this.done)return;
        this.move();
        if(this.pos.x<2||this.pos.y<2||this.pos.x>width-2||this.pos.y>height-2){
            this.dead = true;
        }else if(p5.Vector.dist(this.pos, endPos) < 5){
            this.done = true;
        }else if(this.pos.x<600&&this.pos.y<260&&this.pos.x>0&&this.pos.y>250){
            this.dead = true;
        }else if(this.pos.x<800&&this.pos.y<510&&this.pos.x>200&&this.pos.y>500){
            this.dead = true;
        }
    }

    calcFitness(){
        if(this.done){
            this.fitness = 1.0/16.0 + 10000.0/(this.controls.stepCnt*this.controls.stepCnt);
          }else{
            let goalDistance = p5.Vector.dist(this.pos, endPos);
            //console.log(goalDistance, this.pos, endPos);
            this.fitness = 1.0/ (goalDistance*goalDistance);
        }
        //console.log(this.fitness);
    }
}

class Controls{
    constructor(size){
        this.steps = new Array(size);
        this.angles = new Array(size);
        this.stepCnt = 0;
        this.randomize();
    }

    randomize(){
        for(let i = 0; i<this.steps.length; i++){
            this.angles[i] = random(2*PI);
            this.steps[i] = p5.Vector.fromAngle(this.angles[i]);
        }
    }
    
    mutate(){
        for(let i = 0; i<this.steps.length; i++){
            if(random() < mutationRate){
                this.angles[i] = random(2*PI);
                this.steps[i] = p5.Vector.fromAngle(this.angles[i]);
            }
            //this.steps[i] = p5.Vector.fromAngle(lerp(this.angles[i], this.angles*(1+mutationRate), random(-1, 1)));
        }
    }

    clone(){
        let clone = new Controls(this.steps);
        for(let i = 0; i<this.steps.length; i++){
            clone.steps[i] = this.steps[i].copy();
        }
        return clone;
    }
}

/*
level.biases[i]=lerp(
    level.biases[i],
    Math.random()*2-1,
    amount
);
*/
function lerp(A, B, t){
    return A + (B-A) * t;
}


//for drawing triangles
/*
function setupTriangle(){
    t = radians(45);
    rev = radians(180);
    r = 3;
}
var t;
var rev;
var r;

let a = atan((this.vel.y*-1)/this.vel.x);
        if(this.vel.x<0)a += PI;
        let x = this.pos.x;
        let y = this.pos.y;
        triangle(x+r*cos(t), y-r*sin(t), x+r*cos(t+rev+a), 
                 y-r*sin(t+rev+a), x+r*cos(t+rev-a), y-r*sin(t+rev-a));
*/
