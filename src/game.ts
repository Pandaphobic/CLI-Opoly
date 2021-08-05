import { Player } from "./player";
import { logTurn } from "./app";
import {
  Space,
  Property,
  Go,
  Jail,
  Free_Parking,
  Go_To_Jail,
  Community_Chest,
  Chance,
  Tax,
  Utility,
} from "./spaces";
import * as BOARD from "./boards/original.json";

export const board = () => {
  // const board_obj: [] = BOARD;

  for (let i = 0; i < BOARD.length; i++) {
    console.log(BOARD[i]);
  }
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
  logTurn(`${winner.name} rolled the highest: ${highRoll}`);
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

// export const movePlayer = (
//   turn: any[],
//   Board: Property[],
//   Players: Player[]
// ) => {
//   let [index, player] = turn;

//   // Players Rolls Dice
//   const roll = player.rollDice();
//   let newSpace = player.current_position + roll;

//   // Pass over 0
//   if (newSpace > Board.length) {
//     newSpace = newSpace - Board.length;
//     // GET PAID FOR PASSING 0
//   }

//   // Update Player current_position
//   player.current_position = newSpace;

//   // // Move user to the current position
//   Board[player.current_position].occupants.push(player);
//   logTurn(`${player.name} moved to ${player.current_position}`);

//   // Log Result
//   // log.log(Board[turn[1].current_position]);

//   // Change turn
//   player.turn = false;
//   if (index + 1 > Players.length - 1) {
//     Players[0].turn = true;
//   } else {
//     Players[index + 1].turn = true;
//   }
// };
