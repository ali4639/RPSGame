window.onload = function(){

    let rockBtn = document.querySelector('.rock');
    let paperBtn = document.querySelector('.paper');
    let scissorsBtn = document.querySelector('.scissors');
    let gamerHand = document.querySelector('.gamerHand');
    let machineHand = document.querySelector('.machineHand');
    let msg = document.querySelector('.msg');
    let restartBtn = document.querySelector('.restart');
    let gamerHandLeftPosition = gamerHand.offsetLeft;
    let machineHandLeftPosition = machineHand.offsetLeft;
    let showYourScore = document.querySelector('.yourScore');
    let showSystemScore = document.querySelector('.systemScore');
    let newGameBtn = document.querySelector('.newGame');
    let cover = document.querySelector('.cover');
    let classes = {0:'machineRock', 1:'machinePaper', 2:'machineScissors'}
    let MachineHandType = {0:'rock', 1:'paper' , 2:'scissors'}
    var userScore;
    var systemScore;
    let loadSystemScoreData = window.localStorage.systemScore;
    let loadUserScoreData = window.localStorage.userScore;

    if(loadSystemScoreData){
        let getSystemScore = loadSystemScoreData.replace(/[^0]/g,"").length;
        let totalSystemScore = getSystemScore * 10;
        showSystemScore.innerHTML = totalSystemScore;
    }
    if(loadUserScoreData){
        let getUserScore = loadUserScoreData.replace(/[^0]/g,"").length;
        let totalUserScore = getUserScore * 10;
        showYourScore.innerHTML = totalUserScore;
    }
    
    rockBtn.addEventListener('click',rockSelected);
    paperBtn.addEventListener('click',paperSelected);
    scissorsBtn.addEventListener('click',scissorsSelected);
    restartBtn.addEventListener('click',restartGame);
    newGameBtn.addEventListener('click',startNewGame)


    function rockSelected(){

        let randomSelect = randomSelectHand();
        gamerHand.classList.add('rockSelected');
        machineHand.classList.add(`${classes[randomSelect]}`);
        movementHands();

        setTimeout(function(){

            if(MachineHandType[randomSelect] === 'rock'){
                showMessage('inc');
            }else if(MachineHandType[randomSelect] === 'paper'){
                showMessage('loser');
                calculateSystemScore();
            }else if(MachineHandType[randomSelect] === 'scissors'){
                showMessage('winner');
                calculateUserScore();
            }

        },270); //250
    }

    function paperSelected(){
        
        let randomSelect = randomSelectHand();                  //random Number(0,1,2)
        gamerHand.classList.add('paperSelected');               //set the gamer hand
        machineHand.classList.add(`${classes[randomSelect]}`);  //changes the hand type
        movementHands();                                        // move hands

        setTimeout(function(){

            if(MachineHandType[randomSelect] === 'rock'){
                showMessage('winner');
                calculateUserScore();
            }else if(MachineHandType[randomSelect] === 'paper'){
                showMessage('inc');
            }else if(MachineHandType[randomSelect] === 'scissors'){
                showMessage('loser');
                calculateSystemScore();
            }

        },270); //250

    }

    function scissorsSelected(){

        let randomSelect = randomSelectHand();
        gamerHand.classList.add('scissorsSelected');
        machineHand.classList.add(`${classes[randomSelect]}`);
        movementHands();

        setTimeout(function(){

            if(MachineHandType[randomSelect] === 'rock'){
                showMessage('loser');
                calculateSystemScore();
            }else if(MachineHandType[randomSelect] === 'paper'){
                showMessage('winner');
                calculateUserScore();
            }else if(MachineHandType[randomSelect] === 'scissors'){
                showMessage('inc');
            }

        },270); //250

    }

    function movementHands(){

        setInterval(function(){

            gamerHandLeftPosition+=15;
            machineHandLeftPosition-=25;

            if(gamerHandLeftPosition < 0){
                gamerHand.style.left = `${gamerHandLeftPosition}px`;
            }

            if(machineHandLeftPosition > 292){
                machineHand.style.left = `${machineHandLeftPosition}px`;
            }

        },0.01);
    }

    function randomSelectHand(){

        let randomSelect = Math.round(Math.random()*10);

        while(randomSelect>=3){
            randomSelect = Math.round(Math.random()*10);
        }

        return randomSelect;
    }

    function restartGame(){

        location.reload();

    }

    function showMessage(status){

        cover.style.display = 'block';

        switch(status){
            case 'winner':
                msg.innerHTML = 'بسیار عالی شما برنده این دور هستید!';
                msg.classList.add('winnerMsg');
            break;

            case 'loser':
                msg.innerHTML = 'شما باختید و سیستم برنده شد!';
                msg.classList.add('loserMsg');
            break;

            case 'inc':
                msg.innerHTML = 'هیچکدام امتیازی کسب نکردید!';
                msg.classList.add('inconclusiveMsg');
        }
        rockBtn.removeEventListener('click',rockSelected);
        paperBtn.removeEventListener('click',paperSelected);
        scissorsBtn.removeEventListener('click',scissorsSelected);
    }

    function calculateSystemScore(){

        systemScore = 0;
        if(window.localStorage.systemScore){
            systemScore = window.localStorage.systemScore += 10;
        }else{
            systemScore += 10;
        }
        localStorage.setItem('systemScore', systemScore);

    }

    function calculateUserScore(){

        userScore = 0;
        if(window.localStorage.userScore){
            userScore = window.localStorage.userScore += 10;
        }else{
            userScore += 10;
        }
        localStorage.setItem('userScore', userScore);

    }

    function startNewGame(){

        localStorage.clear();
        location.reload();

    }
}