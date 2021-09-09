// Libs
import { prompt } from "enquirer";

import { Player, ImportBoard } from "./game_state";
import { newGame, GameState, whoGoesFirst, whosTurnIsIt } from "./game_state";
import * as BOARD from "./boards/original.json"; // make this user specifiable
import { board } from "./boards/monopoly";

// Init Game Board from JSON File
const Game_Board = ImportBoard(BOARD);
let Game_State: GameState;

// Init Player List
const Players: Player[] = [];

async function main() {
  // Prompt user for player names

  // SETUP PHASE
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
  // Create a player object with names from promptPlayerNames()
  async function setPlayers() {
    const playerNames = await promptPlayerNames();
    // Assemble Player List
    Players.push(new Player(playerNames.name_1, false, 1500, [], 0));
    Players.push(new Player(playerNames.name_2, false, 1500, [], 0));
    Players.push(new Player(playerNames.name_3, false, 1500, [], 0));
    Players.push(new Player(playerNames.name_4, false, 1500, [], 0));

    Game_State = newGame(Players, Game_Board);
    initialRoll();
  }
  setPlayers();

  // Determine who goes first
  function initialRoll() {
    const highRollWinner = whoGoesFirst(Game_State.Players);

    console.log(
      `${Game_State.Players[highRollWinner[0]].name} won the high roll with ${
        highRollWinner[2]
      }`
    );
    firstTurn()
  }

  function firstTurn(){
    const firstPlayer = whosTurnIsIt(Game_State.Players)
    const playerIndex = firstPlayer[0]
    const playerInfo = firstPlayer[1]
    const roll = Players[firstPlayer[0]].rollDice()

    console.log(playerInfo)
    
    Game_State.Players[playerIndex].move(roll, playerInfo.current_position)

    nextTurn(playerIndex)
  }

  function nextTurn(previousPlayerIndex: number){
    // Set the current player turn to false
    const nextIndex = (previousPlayerIndex+1)

    Game_State.Players[previousPlayerIndex].endTurn()
    // Set turn true for next player
    if(Game_State.Players.length > nextIndex){
      Game_State.Players[nextIndex].startTurn()
    } else {
      Game_State.Players[0].startTurn()
    }
    playTurn()
  }

  function playTurn(){
    const currentPlayer = whosTurnIsIt(Game_State.Players)
    const playerIndex = currentPlayer[0]
    const playerInfo = currentPlayer[1]
    let roll = 0;

    // Present Options to Current Player
    async function choicePrompts() {
      const response: any = await prompt([
        {
          type: "Input",
          name: "options",
          message: `What would you like to do?
          (R)oll (T)rade` 
        }
      ]);
      return response;
    }
    /*
      This is the Phase 1 of the turn.
      Player prompted to Roll Dice or Trade
      TODO:
        - add property options
        - conditional prompts / questions

    */
    async function presentOptions() {
      // Trigger the prompts
      const choice = await choicePrompts();
      // Parse Response and execute corresponding action
      if(choice.options === "r" || "R"){
        roll = Game_State.Players[playerIndex].rollDice()
        Game_State.Players[playerIndex].movePlayer(Game_Board, Players, roll)
        // console.log(playerIndex)
        nextTurn(playerIndex)
      }
    }
    presentOptions();
  }
}

main();
