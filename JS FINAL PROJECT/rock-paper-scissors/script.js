let userscore = 0;
let compscore = 0;
//DOM Elements selection html se
const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

//Score paragraph elements
const userscorepara = document.querySelector("#user-score");
const compscorepara = document.querySelector("#comp-score");
//Function to generate computer choice
const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randidx = Math.floor(Math.random() * 3);
  return options[randidx];
};
//Function to handle draw game
const drawGame = () => {
  msg.innerText = "Game was Draw. Play again."; //jab barabar hoto to ye msg ayega
  msg.style.backgroundColor = "#081b31"; //neutral color for draw
};
//Function to show winner and update scores
const showWinner = (userwin, userchoice, compchoice) => {
  if (userwin) {
    userscore++;
    userscorepara.innerText = userscore;
    msg.innerText = `You win! Your ${userchoice} beats ${compchoice}`;
    msg.style.backgroundColor = "green";
  } else {
    compscore++;
    compscorepara.innerText = compscore;
    msg.innerText = `You lost. ${compchoice} beats your ${userchoice}`;
    msg.style.backgroundColor = "red";
  }
};
//Main game function
const playGame = (userchoice) => {
  //Generate computer choice
  const compchoice = genCompChoice();
  if (userchoice === compchoice) {
    //Draw Game
    drawGame();
  } else {
    let userwin = true;
    if (userchoice === "rock") {
      //scissors, paper
      userwin = compchoice === "paper" ? false : true;
    } else if (userchoice === "paper") {
      //rock, scissors
      userwin = compchoice === "scissors" ? false : true;
    } else {
      //rock, paper
      userwin = compchoice === "rock" ? false : true;
    }
    showWinner(userwin, userchoice, compchoice);
  }
};
//Event listeners for user choices
choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userchoice = choice.getAttribute("id");
    playGame(userchoice);
  });
});
