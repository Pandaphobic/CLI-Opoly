import { Property } from "./spaces";
import { Player } from "./player";
import { logTurn } from "./app";

class Board {
  /* The Board Object shall be treated as the Game State
  
  Keep track of and modify the following:
  - players position
  - board spaces
      - symbol
      - color
      - layout
  - turn
  */

  // Spaces
  properties: Property[];
  players: Player[];

  constructor(properties: Property[], players: Player[]) {
    this.properties = properties;
    this.players = players;
  }
}

// Board Builder
export const BuildBoard = () => {
  const board: Property[] = [];

  board[0] = new Property("Prop0", [], "🟦", "", "blue", 50, 100, false);
  board[1] = new Property("Prop1", [], "🟫", "", "brown", 50, 100, false);
  board[2] = new Property("Prop2", [], "⬜", "", "white", 50, 100, false);
  board[3] = new Property("Prop3", [], "🟪", "", "purple", 50, 100, false);
  board[4] = new Property("Prop4", [], "🟧", "", "orange", 50, 100, false);
  board[5] = new Property("Prop5", [], "🟥", "", "red", 50, 100, false);
  board[6] = new Property("Prop6", [], "🟫", "", "brown", 50, 100, false);
  board[7] = new Property("Prop7", [], "⬜", "", "white", 50, 100, false);
  board[8] = new Property("Prop8", [], "🟪", "", "purple", 50, 100, false);
  board[9] = new Property("Prop9", [], "🟧", "", "orange", 50, 100, false);
  board[10] = new Property("Prop10", [], "🟥", "", "red", 50, 100, false);
  board[11] = new Property("Prop11", [], "🟫", "", "brown", 50, 100, false);
  board[12] = new Property("Prop12", [], "⬜", "", "white", 50, 100, false);
  board[13] = new Property("Prop13", [], "🟪", "", "purple", 50, 100, false);
  board[14] = new Property("Prop14", [], "🟧", "", "orange", 50, 100, false);
  board[15] = new Property("Prop15", [], "🟥", "", "red", 50, 100, false);
  board[16] = new Property("Prop16", [], "🟫", "", "brown", 50, 100, false);
  board[17] = new Property("Prop17", [], "⬜", "", "white", 50, 100, false);
  board[18] = new Property("Prop18", [], "🟪", "", "purple", 50, 100, false);
  board[19] = new Property("Prop19", [], "🟧", "", "orange", 50, 100, false);
  board[20] = new Property("Prop20", [], "🟥", "", "red", 50, 100, false);

  return board;
};

export const whoGoesFirst = (Players: Player[]) => {
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
  logTurn(`${winner.name} won the highest roll with ${highRoll}`);
};

export const whosTurnIsIt = (Players: Player[]) => {
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

export const movePlayer = (
  turn: any[],
  Board: Property[],
  Players: Player[]
) => {
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
  logTurn(`${player.name} moved to ${player.current_position}`);

  // Log Result
  // log.log(Board[turn[1].current_position]);

  // Change turn
  player.turn = false;
  if (index + 1 > Players.length - 1) {
    Players[0].turn = true;
  } else {
    Players[index + 1].turn = true;
  }
};
