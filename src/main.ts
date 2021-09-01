// Libs
import { prompt } from "enquirer";
var deasync = require('deasync');
var cp = require('child_process');
var exec = deasync(cp.exec);

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
    if(Game_State.Players.length > nextIndex){
      console.log(`${Game_State.Players.length} is smaller than ${nextIndex}`)
      
      Game_State.Players[nextIndex].turn = true

    } else {
      Game_State.Players[0].turn = true
      console.log(`${Game_State.Players.length} is bigger than ${nextIndex}`)        
    }

    playTurn()
  }

  function playTurn(){
    const currentPlayer = whosTurnIsIt(Game_State.Players)
    console.log(`the current player is ${currentPlayer[1].name}`)
    const playerIndex = currentPlayer[0]
    const playerInfo = currentPlayer[1]
    let roll = 0;


    // Prompt user for player names
    async function makeChoice() {
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
    // Create a player object with names from promptPlayerNames()
    async function afterPrompts() {
      const choice = await makeChoice();
      // Assemble Player List
      if(choice.options === "r" || "R"){
        roll = Game_State.Players[playerIndex].rollDice()
        Game_State.Players[playerIndex].movePlayer(Game_Board, Players, roll)
        console.log(playerIndex)
        nextTurn(playerIndex)
      }
    }
    afterPrompts();
  }
}

main();
