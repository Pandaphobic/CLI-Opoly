import { Player } from "./player";
import { logTurn } from "./app";
import { Space } from "./spaces";
import * as BOARD from "./boards/original.json";

export const board = () => {
  // init board
  let board: Space[] = [];

  for (let i = 0; i < 40; i++) {
    if (BOARD[i].type == "go") {
      let name: string = BOARD[i].name,
        type: string = BOARD[i].type;

      let go = new Space(name, type);
      board.push(go);
    }

    if (BOARD[i].type == "property") {
      let name: string = BOARD[i].name,
        type: string = BOARD[i].type,
        cost: number = BOARD[i].cost!,
        color: string = BOARD[i].color!,
        rent: number[] = BOARD[i].rent!,
        group: number[] = BOARD[i].group!,
        house: number = BOARD[i].house!;

      let prop = new Space(name, type, cost, color, rent, group, house);
      board.push(prop);
    }
    if (BOARD[i].type == "community-chest") {
      let name: string = BOARD[i].name,
        type: string = BOARD[i].type;

      let comm = new Space(name, type);
      board.push(comm);
    }
    // TAX
    if (BOARD[i].type == "tax") {
      let name: string = BOARD[i].name,
        type: string = BOARD[i].type,
        cost: number = BOARD[i].cost!,
        color: string = BOARD[i].color!;

      let tax = new Space(name, type, cost, color);
      board.push(tax);
    }
    if (BOARD[i].type == "railroad") {
      let name: string = BOARD[i].name,
        type: string = BOARD[i].type,
        cost: number = BOARD[i].cost!,
        group: number[] = BOARD[i].group!;

      let railroad = new Space(name, type, cost, undefined, undefined, group);
      board.push(railroad);
    }
    if (BOARD[i].type == "chance") {
      let name: string = BOARD[i].name,
        type: string = BOARD[i].type;

      let chance = new Space(name, type);
      board.push(chance);
    }
    if (BOARD[i].type == "jail") {
      let name: string = BOARD[i].name,
        type: string = BOARD[i].type,
        color: string = BOARD[i].color!,
        corner: boolean = true;

      let jail = new Space(
        name,
        type,
        undefined,
        color,
        undefined,
        undefined,
        undefined,
        corner
      );
      board.push(jail);
    }
    if (BOARD[i].type == "utility") {
      let name: string = BOARD[i].name,
        type: string = BOARD[i].type,
        cost: number = BOARD[i].cost!,
        color: string = BOARD[i].color!,
        group: number[] = BOARD[i].group!;

      let utility = new Space(
        name,
        type,
        cost,
        color,
        undefined,
        group,
        undefined,
        undefined
      );
      board.push(utility);
    }
    if (BOARD[i].type == "free-parking") {
      let name: string = BOARD[i].name,
        type: string = BOARD[i].type,
        cost: number = BOARD[i].cost!,
        color: string = BOARD[i].color!,
        corner: boolean = BOARD[i].corner!;

      let free_parking = new Space(
        name,
        type,
        cost,
        color,
        undefined,
        undefined,
        undefined,
        corner
      );
      board.push(free_parking);
    }
    if (BOARD[i].type == "go-to-jail") {
      let name: string = BOARD[i].name,
        type: string = BOARD[i].type,
        color: string = BOARD[i].color!,
        corner: boolean = BOARD[i].corner!;

      let go_to_jail = new Space(
        name,
        type,
        undefined,
        color,
        undefined,
        undefined,
        undefined,
        corner
      );
      board.push(go_to_jail);
    }
  }
  console.log(board);
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
