//GET UI 
const minnum = document.querySelector('.minnumber'),
    maxnum = document.querySelector('.maxnumber');

const getinput = document.querySelector('#guessnumber');
const getbtn = document.querySelector('#btn');

const message1 = document.querySelector('.message1');
const message2 = document.querySelector('.message2');

const getgamecnt = document.getElementById('game-container');

const micbtn = document.getElementById('mic-btn');

const getvoccnt = document.querySelector('.voice-container');

let min = 10,
    max = 100,
    gameleft = 3,
    // winningnum = 15;
    winningnum = Math.floor(Math.random()*(max-min)+1);

minnum.textContent = min;
maxnum.innerText = max;

function randomnum(min,max){
    let getrdm = Math.floor(Math.random()*(max-min)+1);
    return getrdm;
}
// console.log(winningnum);


// For Chrome Browser Support 
window.speechRecognition = window.speechRecognition || window.webkitSpeechRecognition;
let getrec = new window.speechRecognition;

micbtn.addEventListener('click',function(){
    // console.log('hey I am working');

    // console.log(getrec);

    // start Recognition , start() come from Recognition api
    getrec.start();

    getrec.addEventListener('result',(e)=>talking(e));
});

function talking(ele){
    // console.log(ele);
    const micresult = ele.results[0][0].transcript;
    // console.log(micresult);

    micmessage(micresult);
    getnumber(micresult);
}

function micmessage(msg){
    getvoccnt.innerHTML = `
    <span class="voicemessage">Did you say!! <span style='color:green;'> ${msg} </span> </span>
    `;
}

function getnumber(msg){
    const getnum = +msg;
    // console.log(typeof getnum);  

    getinput.value = getnum;
}

function setmessage1(msg,col){
    message1.textContent = msg;
    message1.style.color = col;
}

function setmessage2(msg,col){
    message2.textContent = msg;
    message2.style.color = col;
}

function gameover(won,msg){
    let color;
    won === true ? color = "green" : color = "red";

    getinput.disabled = true;

    getinput.style.borderColor = color;

    setmessage1(msg,color);

    getbtn.value = "Play Again";
    getbtn.classList.add('playagain');
}

getbtn.addEventListener('click',function(){
    let guess = +getinput.value
    // console.log(guess);
    if(guess < min || guess > max || isNaN(guess)){
        setmessage2(`Please enter a number between ${min} to ${max}`,"red");
    }

    if(guess === winningnum){
        // Game Over Won
        gameover(true,`${winningnum} is correct!! , You Won.`);
    }else{

        gameleft--;
        
        if(gameleft === 0){
            // Game Over Lose 
            gameover(false,`Game Over, You Lost , The correct number is ${winningnum}.`);
        }else{
            // Continue Game 
            getinput.style.borderColor = "red";

            getinput.value = "";

            setmessage1(`${guess} is not correct, ${gameleft} guess left,`,"blue");
        }
    }
});

getgamecnt.addEventListener('mousedown',function(e){
    // console.log(e.target);

    if(e.target.classList.contains('playagain')){
        window.location.reload();
    }
    
});
