import { Player } from "./player";
import { BuildBoard } from "./game";

const Players: Player[] = [];
const Board = BuildBoard();
// console.log(Board);

Players.push(new Player("Chris", false, 1500, [], 0));
Players.push(new Player("Michael", false, 1500, [], 0));
Players.push(new Player("Calista", false, 1500, [], 0));
Players.push(new Player("Megan", false, 1500, [], 0));

const whoGoesFirst = (Players: Player[]) => {
  let highRoll = 0;
  let winner: Player = Players[0];
  let winnerIndex = 0;

  // each player roll, update highest when roll >= last roll
  Players.forEach((player, index) => {
    let roll = player.rollDice();
    if (roll >= highRoll) {
      highRoll = roll;
      winner = Players[index];
      winnerIndex = index;
    }
  });

  // It is now the winners turn
  Players[winnerIndex].turn = true;
  console.log(`${winner.name} won the highest roll with ${highRoll}`);
};

const whosTurnIsIt = (Players: Player[]) => {
  let index = 0;
  let turn: Player;
  let result: any[] = [];

  Players.forEach((player, i) => {
    if (player.turn == true) {
      index = i;
      turn = player;
      result.push(index);
      result.push(turn);
    }
  });

  return result;
};

const movePlayer = (turn: any[]) => {
  console.log(turn[0]);
  console.log(turn[1]);
  // console.log(`Move: ${Player.name}`);
  const roll = turn[1].rollDice();
  const newSpace = turn[1].current_position + roll;

  // Update Player current_position
  turn[1].current_position = newSpace;

  // // Move user to the current position
  Board[turn[1].current_position].occupants.push(whosTurnIsIt(Players)[1]);

  // Log Result
  console.log(Board[turn[1].current_position]);

  // Change turn
  turn[1].turn = false;
  if (turn[0] + 1 > Players.length - 1) {
    Players[0].turn = true;
  } else {
    Players[turn[0] + 1].turn = true;
  }

  console.log(Players);
};

// Determine who goes first
whoGoesFirst(Players);
movePlayer(whosTurnIsIt(Players));
// console.log(whosTurnIsItAnyway(Players));
