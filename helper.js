var startX = 400;
var startY = 780;
var maxSteps = 400; 
/*maximum amount of steps a dot can take, based on the min of the 
previous generation
*/

class Population{
    constructor(size){
        this.size = size;
        this.dots = new Array(size);
        for(let i=0; i<size; i++){
            this.dots[i] = new Dot();
        }
    }

    update(){
        for(let i=0; i<this.size; i++){
            this.dots[i].update();
        }
    }

    draw(){
        for(let i=0; i<this.size; i++){
            this.dots[i].draw();
        }
    }

    nextGeneration(){
        console.log("Generation")
        let newDots = new Array(this.size);
        for(let i=0; i<this.size; i++){
            newDots[i] = new Dot();
            //newDots[i].controls = this.dots[0].controls.clone();
        }
        this.dots = newDots;
    }
    allDead(){
        for(let i=0; i<this.size; i++){
            if(!this.dots[i].dead){
                return false;
            }
        }
        return true;
    }
}
class Dot{
    constructor(){
        this.controls = new Controls(400)
        this.pos = createVector(startX, startY);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.dead = false;
    }

    draw(){
        stroke(255, 0, 0);
        ellipse(this.pos.x, this.pos.y, 2, 2);
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
        this.move();
        if(this.pos.x<2||this.pos.y<2||this.pos.x>width-2||this.pos.y>height-2){
            this.dead = true;
        }
    }
}

class Controls{
    constructor(size){
        this.steps = new Array(size);
        this.stepCnt = 0;
        this.randomize();
    }

    randomize(){
        for(let i = 0; i<this.steps.length; i++){
            this.steps[i] = p5.Vector.fromAngle(random(2*PI));
        }
    }
    
    mutate(){

    }

    clone(){
        let clone = new Controls(this.steps);
        for(let i = 0; i<this.steps.length; i++){
            clone.steps[i] = this.steps[i].copy();
        }
        return clone;
    }
}

function lerp(A, B, t){
    return A + (B-A) * t;
}