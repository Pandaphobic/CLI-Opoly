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
  let [index, player] = turn;

  // Players Rolls Dice
  const roll = player.rollDice();
  let newSpace = player.current_position + roll;

  // Pass over 0
  if (newSpace > Board.length) {
    newSpace = newSpace - Board.length;
    // GET PAID FOR PASSING 0
  }

  // Update Player current_position
  player.current_position = newSpace;

  // // Move user to the current position
  Board[player.current_position].occupants.push(player);
  console.log(`${player.name} moved to ${player.current_position}`);

  // Log Result
  // console.log(Board[turn[1].current_position]);

  // Change turn
  player.turn = false;
  if (index + 1 > Players.length - 1) {
    Players[0].turn = true;
  } else {
    Players[index + 1].turn = true;
  }
};

// Determine who goes first
whoGoesFirst(Players);
movePlayer(whosTurnIsIt(Players));
movePlayer(whosTurnIsIt(Players));
movePlayer(whosTurnIsIt(Players));
movePlayer(whosTurnIsIt(Players));
movePlayer(whosTurnIsIt(Players));
movePlayer(whosTurnIsIt(Players));
movePlayer(whosTurnIsIt(Players));
movePlayer(whosTurnIsIt(Players));
movePlayer(whosTurnIsIt(Players));
