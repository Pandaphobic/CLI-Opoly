import { Player } from "./player";
import { BuildBoard } from "./game";

const Players: Player[] = [];
const Board = BuildBoard();
console.log(Board);

Players.push(new Player("Chris", false, 1500, []));
Players.push(new Player("Michael", false, 1500, []));
Players.push(new Player("Calista", false, 1500, []));
Players.push(new Player("Megan", false, 1500, []));

// Chris.pay("Mark", 50);
// Chris.rollDice();
// console.log(BuildBoard());

const whoGoesFirst = (Players: Player[]) => {
  let highRoll = 0;
  let winner: Player = Players[0];
  let winnerIndex = 0;

  Players.forEach((player, index) => {
    let roll = player.rollDice();
    if (roll >= highRoll) {
      highRoll = roll;
      winner = Players[index];
      winnerIndex = index;
    }
  });

  Players[winnerIndex].turn = true;
  console.log(`${winner.name} won the highest roll with ${highRoll}`);
};

const whosTurnIsIt = (Players: Player[]) => {
  const turn = Players.filter(Player => Player.turn == true);
  return turn[0];
};

// Determine who goes first
whoGoesFirst(Players);

// Highest first roll of the dice by the winner
const winnerDice = whosTurnIsIt(Players).rollDice();

// Move user to the appropriate space
Board[winnerDice].occupants.push(whosTurnIsIt(Players));
console.log(Board[winnerDice]);
