function modeSimulate(){
    document.getElementById("select-mode").innerText="Mode: Simulate";
}

function modeReplay(){
    document.getElementById("select-mode").innerText="Mode: Replay";
}

function modeCustomize(){
    document.getElementById("select-mode").innerText="Mode: Customize";
}

var play = false;
function changePausePlay(){
    let btn = document.getElementById("pause-play");
    if(play){
        btn.innerText = "Pause";
        play = false;
    }else{
        btn.innerText = "Play";
        play = true;
    }
}

function changeGenSize(){
    console.log(document.getElementById("gen-size-range").value);
}