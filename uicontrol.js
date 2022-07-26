
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
});


function modeSimulate(){
    document.getElementById("select-mode").innerText="Mode: Simulate";
    let hide = document.querySelectorAll('.show-replay, .show-customize');
    hide.forEach(element => {
        element.classList.add("d-none");
    });
    let show = document.getElementsByClassName('show-simulate');
    show.forEach(element => {
        element.classList.remove("d-none");
    });
}

function modeReplay(){
    document.getElementById("select-mode").innerText="Mode: Replay";
    let hide = document.querySelectorAll('.show-simulate, .show-customize');
    hide.forEach(element => {
        element.classList.add("d-none");
    });
    let show = document.getElementsByClassName('show-replay');
    show.forEach(element => {
        element.classList.remove("d-none");
    });
}

function modeCustomize(){
    document.getElementById("select-mode").innerText="Mode: Customize";
    let hide = document.querySelectorAll('.show-simulate, .show-replay');
    hide.forEach(element => {
        element.classList.add("d-none");
    });
    let show = document.getElementsByClassName('show-customize');
    show.forEach(element => {
        element.classList.remove("d-none");
    });
}

var paused = false;
function changePausePlay(){
    let btn = document.getElementById("pause-play");
    if(paused){
        btn.innerHTML = `<span class="bi bi-pause-fill align-middle"></span> Pause`;
        paused = false;
        play();
    }else{
        btn.innerHTML = `<span class="bi bi-play-fill align-middle"></span> Play`;
        paused = true;
        pause();
    }
    console.log(startX, startY)
}
function reset(){
    console.log("resetting...")
}
function changeGenSize(){
    let amt = parseInt(document.getElementById("gen-size-range").value);
    document.getElementById("gen-size-label").innerHTML = 
    `<small>Generation size: ${amt}</small>`;
}

function changeMutationRate(){
    let amt = parseFloat(document.getElementById("mutation-rate-range").value);
    amt = amt.toFixed(3)
    document.getElementById("mutation-rate-label").innerHTML = 
    `<small>Mutation rate: ${amt}</small>`;
}
function changeBest(){
    
}

function changeAll(){

}

function multiplySpeed(){
    speed = speed*2;
}

function divideSpeed(){
    if(speed!=1){
        speed = speed/2;
    }
}

var gradientColors = true;
function switchGradient(){
    console.log(`Gradient: ${gradientColors}`)
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
}