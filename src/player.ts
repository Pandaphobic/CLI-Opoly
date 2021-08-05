import { Property } from "./spaces";

// prettier-ignore
export class Player {
  name: string;                                 // Player display name
  turn: boolean;                                // Is it this players turn?
  money: number;                                // Amount of money player has
  owned_properties: Property[];                 // Array of properties owened by player
  current_position: number;

  constructor(name: string, turn: boolean, money: number, owned_properties: Property[], current_position: number) {
    this.name = name;
    this.turn = turn;
    this.money = money;
    this.owned_properties = owned_properties;
    this.current_position = current_position;
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

  getName(){
    return this.name
  }

  addProperty(property_to_add: Property){
    this.owned_properties.push(property_to_add)
  }

  // removeProperty(property_to_remove: Property){
  //   let newPropArray = this.owned_properties.filter([property_to_remove.name])
  //   owned_properties = newPropArray;
  // }


}
