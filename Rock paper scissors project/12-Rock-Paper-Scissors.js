let score = JSON.parse(localStorage.getItem('score')) || {
    wins : 0,
    losses : 0,
    ties : 0
};                                          //gets a value out of the local storage
                                            //When something doesn't exist in localstorage, its gonna be null.


updateScoreElement();


let isAutoPlaying = false;
let intervalID;

function autoplay()
{
    if(!isAutoPlaying){
        intervalID = setInterval(() => {
            const playerMove =  pickComputerMove();
            playGame(playerMove);
        }, 1000);
        isAutoPlaying = true;
    }
    else {
        clearInterval(intervalID);  //to stop setinterval
        isAutoPlaying = false;
    }
}

document.querySelector('.js-rock-button')
    .addEventListener('click',() => {
        playGame('Rock');
    });

document.querySelector('.js-paper-button')
    .addEventListener('click',() => {
        playGame('Paper');
    });

document.querySelector('.js-scissors-button')
    .addEventListener('click',() => {
        playGame('Scissors');
    });


document.body.addEventListener('keydown',(event) => {
    if(event.key === 'r'){
        playGame('Rock');
    }
    else if(event.key === 'p'){
        playGame('Paper');
    }
    else if(event.key === 's'){
        playGame('Scissors');
    }
}); 
//AddeventListener also provides the event object, but in the parameter of the function it has as a parameter


function playGame(playerMove)
{
    const computerMove = pickComputerMove();

    let result = '';

    if(playerMove === 'Scissors')
    {
        if(computerMove === 'Rock')
        {
            result = 'You lose';
        }
        else if(computerMove === 'Paper')
        {
            result = 'You win';
        }
        else if(computerMove === 'Scissors')
        {
            result = 'Tie';
        }
    }

    else if(playerMove === 'Rock')
    {
        if(computerMove === 'Rock')
        {
            result = 'Tie';
        }
        else if(computerMove === 'Paper')
        {
            result = 'You lose';
        }
        else if(computerMove === 'Scissors')
        {
            result = 'You win';
        }
    }

    else if(playerMove === 'Paper')
    {
        if(computerMove === 'Rock')
        {
            result = 'You win';
        }
        else if(computerMove === 'Paper')
        {
            result = 'Tie';
        }
        else if(computerMove === 'Scissors')
        {
            result = 'You lose';
        }
    }

    if(result === 'You win')
    {
        score.wins++;
    }
    else if(result == 'You lose')
    {
        score.losses++;
    }
    else
    {
        score.ties++;
    }

    localStorage.setItem('score', JSON.stringify(score));   //localstorage only supports strings

    updateScoreElement();
    document.querySelector('.js-moves').innerHTML = `You
    <img src="images/${playerMove}-emoji.png" class="move-icon">
    <img src="images/${computerMove}-emoji.png" class="move-icon">
    Computer`;
    document.querySelector('.js-result').innerHTML = result; 
}

function updateScoreElement(){
    document.querySelector('.js-score')
        .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}


function pickComputerMove()
{
    let computerMove = '';
    const randomNumber = Math.random();   //Generated a random number bw 0 and 1
    if(randomNumber >= 0 && randomNumber < 1/3) 
    {
        computerMove = 'Rock';
    }
    else if(randomNumber >= 1/3 && randomNumber < 2/3)
    {
        computerMove = 'Paper';
    }
    else if(randomNumber >= 2/3 && randomNumber < 1)
    {
        computerMove = 'Scissors';
    }
    return computerMove;
}
//Using return statement ends the function immediately

