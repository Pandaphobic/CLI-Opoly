// Libs
import { prompt } from "enquirer";

import { Player, ImportBoard } from "./game_state";
import { newGame } from "./game_state";
import * as BOARD from "./boards/original.json"; // make this user specifiable

// Assemble Player List
const Players: Player[] = [];

async function promptPlayerNames() {
  const response: any = await prompt([
    {
      type: "Input",
      name: "name_1",
      message: "Enter Username For Player 1:",
    },
    {
      type: "Input",
      name: "name_2",
      message: "Enter Username For Player 2:",
    },
    {
      type: "Input",
      name: "name_3",
      message: "Enter Username For Player 3:",
    },
    {
      type: "Input",
      name: "name_4",
      message: "Enter Username For Player 4:",
    },
  ]);
  return response;
}

async function setPlayers() {
  const playerNames = await promptPlayerNames();
  // Assemble Player List
  Players.push(new Player(playerNames.name_1, false, 1500, [], 0));
  Players.push(new Player(playerNames.name_2, false, 1500, [], 0));
  Players.push(new Player(playerNames.name_3, false, 1500, [], 0));
  Players.push(new Player(playerNames.name_4, false, 1500, [], 0));

  console.log(Players);
}
setPlayers();

const Game_Board = ImportBoard(BOARD);
const Game_State = newGame(Players, Game_Board);
