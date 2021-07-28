import { Property } from "./spaces";

// prettier-ignore
export class Player {
  name: string;                                 // Player display name
  turn: boolean;                                // Is it this players turn?
  money: number;                                // Amount of money player has
  owned_properties: Property[];                 // Array of properties owened by player

  constructor(name: string, turn: boolean, money: number, owned_properties: Property[]) {
    this.name = name;
    this.turn = turn;
    this.money = money;
    this.owned_properties = owned_properties;
    //COLLATERAL - ROLLING COUNT
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
}
