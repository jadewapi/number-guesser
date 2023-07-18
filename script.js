'use strict';
//
// MADE BY JADE PINEDA :)

//////////////////////////////////////////////
const check = document.querySelector('.check');
const guess = document.querySelector('.guess');
const mysteryNumber = document.querySelector('.mysteryNumber');
const guessStatus = document.querySelector('.status');
const scoreSpan = document.querySelector('.scoreSpan');
const leaderboards = document.querySelector('.leaderboards');
const putName = document.querySelector('.putName');
const userName = document.querySelector('.userInputName');
const submit = document.querySelector('.submit');
const noName = document.querySelector('.noName');
const userInfoContainer = document.querySelector('.displayUsers');
const highest = document.querySelector('.highest');
const recent = document.querySelector('.recent');
const tryAgain = document.querySelector('.tryAgain');
const pRank = document.querySelector('.pRank');
const highScoreSpan = document.querySelector('.highScoreSpan')
/////////////////////////////////////////////

//////////////////////////////////////////////////////////
// the number that the user has to guess.
let number = Math.trunc(Math.random () * 20) + 1;
console.log(number);
////////////////////////////////////////////////////////////

// this variable needs to be decreased by one initially because the HTML content is 20. 
//it will take two failed attempts to decrease this variable by 1.
let initialScore = 19;

// when the user has done guessing the number, userScore will assign to initialScore
// this will then be the value to the key "score" in allUsers variable.
let userScore = 0;
let highestScore = 0;

////////////////////////////////////////////////////////
///_________________________________________________///
// user data:
let allUsers = [
];


///////////////////////////////////////////////////////
// we need to get a copy of the array
let allUsersCOPY = JSON.parse(JSON.stringify(allUsers));
//

// this button listener will MUTATE the COPY array.
highest.addEventListener('click', function(){
    pRank.textContent = 'Rank'
    allUsersCOPY.sort((a, b) => b.score - a.score);
    userInfoContainer.innerHTML = '';
    allUsersCOPY.forEach(function(mov, i){
        const {name, score} = mov;
        const html = 
            `<li class="userInfo">
                <div class="userRank">${i + 1}</div>
                <div class="userName">${name}</div>
                <div class="userScore">${score}</div>
            </li>`;
        userInfoContainer.insertAdjacentHTML('beforeend', html);
    });
});

// this button listener will MUTATE the original array.
recent.addEventListener('click', function(){
    pRank.textContent = 'Recent'
    userInfoContainer.innerHTML = '';
    allUsers.forEach(function(mov, i){
        const {name, score} = mov;
        const html = 
            `<li class="userInfo">
                <div class="userRank"></div>
                <div class="userName">${name}</div>
                <div class="userScore">${score}</div>
            </li>`;
        userInfoContainer.insertAdjacentHTML("afterbegin", html);
    });
});

check.addEventListener('click', function(){
    const guessNum = Number(guess.value);
    
    //if the value is empty when check is clicked, its 0. Also 0 is not in the range (1-20).
    if (guessNum === 0) {
        guessStatus.textContent = 'Guess cannot be 0';
    } 
    //if the value is not a number i.e. a string
    else if (isNaN(guessNum)){
        guessStatus.textContent = 'That is not a number';
    }
    //if the value is a number and >1
    else if (guessNum > 0) {
        if (guessNum > number){
            guessStatus.textContent = 'Guess is higher than the number';
            scoreSpan.textContent = initialScore--;
            if (initialScore === -1) {
                mysteryNumber.textContent = number;
                guessStatus.textContent = 'Game over!'
                check.disabled = true;
                guess.value = '';
            };
        }
        else if (guessNum < number){
            guessStatus.textContent = 'Guess is lower than the number';
            scoreSpan.textContent = initialScore--;
            if (initialScore === -1) {
                guessStatus.textContent = 'Game over!'
                mysteryNumber.textContent = number;
                check.disabled = true;
                guess.value = '';
            };
        }
        else if (guessNum === number){
            mysteryNumber.textContent = number;
            guessStatus.textContent = 'You guessed the number!';
            //since the global scope "initial score is set to 19, we need to add 1 so if the user guesses..."
            //the number correctly, it will be 20, the highest score.
            userScore = initialScore + 1;
            //when the user guesses the number, the check can no longer be clicked.
            check.disabled = true;
            //leaderboards will disappear and putName will be displayed
            leaderboards.style.visibility = 'hidden';
            putName.style.visibility = 'visible';
            //needs to stay hidden until the user clicks the submit button.
            noName.style.visibility = 'hidden';
            tryAgain.style.visibility = 'hidden';
            /////////////////////////////////////////////////////////////////
            
            submit.addEventListener('click', function() {
            if (userName.value === '' || userName.value === null) {
                //this will undo the visibile of hiddem
                noName.style.visibility = '';
            } else {
                //the pop up for name will disappear
                putName.style.visibility = 'hidden';
                //if the user enters a string it will remove it self
                // it will also remove it self for the second time it reappears when another attempt is done.
                tryAgain.style.visibility = 'visible';
                noName.style.visibility = 'hidden';
                leaderboards.style.visibility = 'visible';
                check.disabled = false;
                guess.value = '';
                guessStatus.textContent = 'Enter any number from 1 to 20';
                //reset the score and score status
                initialScore = 19;
                scoreSpan.textContent = '20';
                //
                console.log(userName.value, userScore);
                //make a new entry to push inside of the array, 'assUsers'
                const user = {
                    name: userName.value,
                    score: userScore
                };
                allUsers.push(user);
                //change the allUsersCopy by DEEP cloning it to the allUsers.push();
                allUsersCOPY = JSON.parse(JSON.stringify(allUsers));
                //userName will be reset
                userName.value = '';
                //new random number
                number = Math.trunc(Math.random() * 20) + 1;
                console.log(allUsers);
                console.log(number);
                const displayUsers = function(user){
                    userInfoContainer.innerHTML ='';
                    user.forEach(function (user, index){
                        const {name, score} = user;
                        // incorporate it into HTML:
                        const html =
                        `<li class="userInfo">
                            <div class="userRank">${index + 1}</div>
                            <div class="userName">${name}</div>
                            <div class="userScore">${score}</div>
                        </li>`;
                        // put the HTML in the parent of the div elemnent:
                        userInfoContainer.insertAdjacentHTML('beforeend', html);
                    })
                }
                displayUsers(allUsers);
                }
                // check high scores;
                if (userScore > highestScore) {
                    highestScore = userScore;
                    highScoreSpan.textContent = highestScore;
                };            
            });
        }
    }
});


tryAgain.addEventListener('click', function(){
    number = Math.trunc(Math.random() * 20) + 1;
    console.log(number);
    guess.value = '';
    check.values = '';
    initialScore = 19;
    userScore = initialScore;
    scoreSpan.textContent = '20';
})