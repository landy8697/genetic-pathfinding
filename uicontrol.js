
document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("simulate").addEventListener("click", modeSimulate);
    document.getElementById("replay").addEventListener("click", modeReplay);
    document.getElementById("customize").addEventListener("click", modeCustomize);

    document.getElementById("pause-play").addEventListener("click", changePausePlay);
    document.getElementById("reset").addEventListener("click", reset);

    document.getElementById("gen-size-range").addEventListener("input", changeGenSize);
    document.getElementById("mutation-rate-range").addEventListener("input", changeMutationRate);

    document.getElementById("speed-multiply").addEventListener("click", multiplySpeed);
    document.getElementById("speed-divide").addEventListener("click", divideSpeed);

    document.getElementById("gradient-switch").addEventListener("click", switchGradient);
    document.getElementById("replay-all").addEventListener("click", replayAll);
    document.getElementById("replay-done").addEventListener("click", replayDone);
    document.getElementById("replay-best").addEventListener("click", replayBest);

    document.getElementById("double-back").addEventListener("click", replayBackMany);
    document.getElementById("back").addEventListener("click", replayBack);
    document.getElementById("pause-replay").addEventListener("click", changePauseReplay);
    document.getElementById("forward").addEventListener("click", replayForward);
    document.getElementById("double-forward").addEventListener("click", replayForwardMany);

    document.getElementById("undo-btn").addEventListener("click", undo);
    document.getElementById("redo-btn").addEventListener("click", redo);

    document.getElementById("draw-rect").addEventListener("click", drawRect);
    document.getElementById("move-rect").addEventListener("click", moveRect);
    document.getElementById("del-rect").addEventListener("click", delRect);
    document.getElementById("move-start").addEventListener("click", moveStart);
    document.getElementById("move-goal").addEventListener("click", moveGoal);
});

var mode = "simulate"
function modeSimulate(){
    if(mode=="simulate")return;
    paused = true;
    changePausePlay();
    document.getElementById("select-mode").innerText="Mode: Simulate";
    let hide = document.querySelectorAll('.show-replay, .show-customize');
    hide.forEach(element => {
        element.classList.add("d-none");
    });
    let show = document.getElementsByClassName('show-simulate');
    show.forEach(element => {
        element.classList.remove("d-none");
    });
    mode = "simulate"
}
function modeReplay(){
    if(mode=="replay")return;
    paused = false;
    changePauseReplay();
    document.getElementById("select-mode").innerText="Mode: Replay";
    let hide = document.querySelectorAll('.show-simulate, .show-customize');
    hide.forEach(element => {
        element.classList.add("d-none");
    });
    let show = document.getElementsByClassName('show-replay');
    show.forEach(element => {
        element.classList.remove("d-none");
    });
    mode = "replay"
}
function modeCustomize(){
    if(mode=="customize")return;
    paused = false;
    changePauseReplay();
    document.getElementById("select-mode").innerText="Mode: Customize";
    let hide = document.querySelectorAll('.show-simulate, .show-replay');
    hide.forEach(element => {
        element.classList.add("d-none");
    });
    let show = document.getElementsByClassName('show-customize');
    show.forEach(element => {
        element.classList.remove("d-none");
    });
    mode = "customize"
}


function changePausePlay(){
    let btn = document.getElementById("pause-play");
    if(paused){
        btn.innerHTML = `<span class="bi bi-pause-fill align-middle"></span> Pause`;
        btn.title = "Pause the Simulation"
        paused = false;
        play();
    }else{
        btn.innerHTML = `<span class="bi bi-play-fill align-middle"></span> Play`;
        btn.title = "Continue the Simulation"
        paused = true;
        pause();
    }
}
function reset(){
    console.log("resetting...")
    
    resetGenerations();
    paused = true;
    changePausePlay();
}

function changeGenSize(){
    let amt = parseInt(document.getElementById("gen-size-range").value);
    genSize = amt;
    //console.log(`Next Generation Size: ${genSize}`);
    document.getElementById("gen-size-label").innerHTML = 
    `<small>Generation size: ${amt}</small>`;
}
function changeMutationRate(){
    let amt = parseFloat(document.getElementById("mutation-rate-range").value);
    setMutationRate(amt);
    document.getElementById("mutation-rate-label").innerHTML = 
    `<small>Mutation rate: ${mutationRate}</small>`;
}

function multiplySpeed(){
    if(speed!=64){
        speed = speed*2;
        speedChange();
    }
    
}
function divideSpeed(){
    if(speed!=1){
        speed = speed/2;
        speedChange();
    }
    
}


function replayAll(){
    console.log("Replaying all dots")
}
function replayDone(){
    console.log("Replaying all dots that finished")
}
function replayBest(){
    console.log("Replaying the best dot")
}

var gradientColors = true;
function switchGradient(){
    let btn = document.getElementById("gradient-switch");
    if(!gradientColors){
        btn.innerText = `Gradient: On`;
        btn.classList.remove("btn-danger")
        btn.classList.add("btn-success")
        gradientColors = true;
    }else{
        btn.innerText = `Gradient: Off`;
        btn.classList.remove("btn-success")
        btn.classList.add("btn-danger")
        gradientColors = false;
    }
    console.log(`Gradient: ${gradientColors}`)
}

function replayBackMany(){
    console.log("Back 10 generations")
}
function replayBack(){
    console.log("Back 1 generation")
}
function changePauseReplay(){
    let btn = document.getElementById("pause-replay");
    if(paused){
        btn.innerHTML = `<i class="bi bi-pause"></i>`;
        paused = false;
        play();
    }else{
        btn.innerHTML = `<i class="bi bi-play"></i>`;
        paused = true;
        pause();
    }
}
function replayForward(){
    console.log("Forward 1 generation")
}
function replayForwardMany(){
    console.log("Forward 10 generations")
}

function undo(){
    console.log("undo")
}
function redo(){
    console.log("redo")
}

function drawRect(){
    let message = document.getElementById("customize-info");
    message.innerHTML = `<p class="mt-3"><small>Click or drag to draw an obstacle</small></p>`;
}
function moveRect(){
    let message = document.getElementById("customize-info");
    message.innerHTML = `<p class="mt-3"><small>Click or drag to change obstacle position</small></p>`;
}
function delRect(){
    let message = document.getElementById("customize-info");
    message.innerHTML = `<p class="mt-3"><small>Click or drag to delete obstacle</small></p>`;
}
function moveStart(){
    let message = document.getElementById("customize-info");
    message.innerHTML = `<p class="mt-3"><small>Click to set start point (green dot)</small></p>`;
}
function moveGoal(){
    let message = document.getElementById("customize-info");
    message.innerHTML = `<p class="mt-3"><small>Click to set end point (red dot)</small></p>`;
}