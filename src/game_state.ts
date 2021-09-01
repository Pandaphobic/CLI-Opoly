import { Space } from "./spaces";

export class GameState {
  Players: Player[];
  Board: Space[];

  constructor(Players: Player[], Board: Space[]) {
    this.Players = Players;
    this.Board = Board;
  }
}

// Creates a New Game State - Only 1 time at the begining of game
export function newGame(Players: Player[], Board: Space[]) {
  const new_game_state = new GameState(Players, Board);
  return new_game_state;
}

// prettier-ignore
export class Player {
  name: string;                             // Player display name
  turn: boolean;                            // Is it this players turn?
  money: number;                            // Amount of money player has
  owned_properties: Space[];                // Array of properties owened by player
  current_position: number;

  constructor(name: string, turn: boolean, money: number, owned_properties: Space[], current_position: number) {
    this.name = name;
    this.turn = turn;
    this.money = money;
    this.owned_properties = owned_properties;
    this.current_position = current_position;
    //COLLATERAL - ROLLING COUNT
  }

  // MOVE
  move = (newPosition: number, current_position: number)=>{

    if(current_position === this.current_position){
      this.current_position = newPosition
      console.log(`${this.name} moved to ${this.current_position}`)
    } 
    else {
      console.log("Player position improperly changed")
    }
  }

  movePlayer = (Board: Space[], Players: Player[], Roll: number) => {
    let [index, player] = whosTurnIsIt(Players);
  
    let newSpace = player.current_position + Roll;
  
    // Pass over 0
    if (newSpace > Board.length) {
      newSpace = newSpace - Board.length;
      // GET PAID FOR PASSING 0
    }
  
    // Update Player current_position
    player.current_position = newSpace;
    
    // Change turn
    player.turn = false;
    if (index + 1 > Players.length - 1) {
      Players[0].turn = true;
    } else {
      Players[index + 1].turn = true;
    }};

  endTurn = () => {
    this.turn = false
  }

  startTurn = () => {
    this.turn = true
    console.log(`It is now ${this.name}'s turn`)
  }

  pay = (recipient: string, money: number) => {
    console.log(`${this.name} has paid ${recipient} $${money}`)
  }

  rollDice = () => {
    const dice_1 = Math.floor(Math.random() *6) + 1
    const dice_2 = Math.floor(Math.random() *6) + 1
    const diceValue = dice_1 + dice_2

    console.log(`${this.name} rolled: ${diceValue}`)
    return diceValue;
  }

  getName(){
    return this.name
  }

  getTurn(){
    return this.turn
  }

  getMoney(){
    return this.money
  }

  getProperties(){
    return this.owned_properties
  }

  getCurrentPosition(){
    return this.current_position
  }

  addProperty(property_to_add: Space){
    this.owned_properties.push(property_to_add)
  }

}

// this should change names
export const ImportBoard = (BOARD: Space[]) => {
  // init board
  let board: Space[] = [];

  // Parse original.json into a space
  for (let i = 0; i < 40; i++) {
    if (BOARD[i].type == "go") {
      let id: number = BOARD[i].id,
        name: string = BOARD[i].name,
        type: string = BOARD[i].type;

      let go = new Space(id, name, type);
      board.push(go);
    }

    if (BOARD[i].type == "property") {
      let id: number = BOARD[i].id,
        name: string = BOARD[i].name,
        type: string = BOARD[i].type,
        cost: number = BOARD[i].cost!,
        color: string = BOARD[i].color!,
        rent: number[] = BOARD[i].rent!,
        group: number[] = BOARD[i].group!,
        house: number = BOARD[i].house!;

      let prop = new Space(id, name, type, cost, color, rent, group, house);
      board.push(prop);
    }
    if (BOARD[i].type == "community-chest") {
      let id: number = BOARD[i].id,
        name: string = BOARD[i].name,
        type: string = BOARD[i].type;

      let comm = new Space(id, name, type);
      board.push(comm);
    }
    // TAX
    if (BOARD[i].type == "tax") {
      let id: number = BOARD[i].id,
        name: string = BOARD[i].name,
        type: string = BOARD[i].type,
        cost: number = BOARD[i].cost!,
        color: string = BOARD[i].color!;

      let tax = new Space(id, name, type, cost, color);
      board.push(tax);
    }
    if (BOARD[i].type == "railroad") {
      let id: number = BOARD[i].id,
        name: string = BOARD[i].name,
        type: string = BOARD[i].type,
        cost: number = BOARD[i].cost!,
        group: number[] = BOARD[i].group!;

      let railroad = new Space(
        id,
        name,
        type,
        cost,
        undefined,
        undefined,
        group
      );
      board.push(railroad);
    }
    if (BOARD[i].type == "chance") {
      let id: number = BOARD[i].id,
        name: string = BOARD[i].name,
        type: string = BOARD[i].type;

      let chance = new Space(id, name, type);
      board.push(chance);
    }
    if (BOARD[i].type == "jail") {
      let id: number = BOARD[i].id,
        name: string = BOARD[i].name,
        type: string = BOARD[i].type,
        color: string = BOARD[i].color!,
        corner: boolean = true;

      let jail = new Space(
        id,
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
      let id: number = BOARD[i].id,
        name: string = BOARD[i].name,
        type: string = BOARD[i].type,
        cost: number = BOARD[i].cost!,
        color: string = BOARD[i].color!,
        group: number[] = BOARD[i].group!;

      let utility = new Space(
        id,
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
      let id: number = BOARD[i].id,
        name: string = BOARD[i].name,
        type: string = BOARD[i].type,
        cost: number = BOARD[i].cost!,
        color: string = BOARD[i].color!,
        corner: boolean = BOARD[i].corner!;

      let free_parking = new Space(
        id,
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
      let id: number = BOARD[i].id,
        name: string = BOARD[i].name,
        type: string = BOARD[i].type,
        color: string = BOARD[i].color!,
        corner: boolean = BOARD[i].corner!;

      let go_to_jail = new Space(
        id,
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
  const result = whosTurnIsIt(Players);
  result.push(highRoll);
  /* RESULT = [INDEX OF PLAYER, PLAYER WHO'S TURN IT IS, HIGHEST ROLL VALUE] */
  return result;
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
  /* RESULT = [INDEX OF PLAYER, PLAYER WHO'S TURN IT IS] */
  return result;
};
