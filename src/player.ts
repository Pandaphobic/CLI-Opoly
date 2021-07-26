import { Property } from "./spaces";

// prettier-ignore
export class Player {
  name: string;                                 // Player display name
  turn: boolean;                                // Is it this players turn?
  money: number;                                // Amount of money player has
  owned_properties: Property[];                 // Array of properties owened by player

  constructor(a: string, b: boolean, c: number, d: Property[]) {
    this.name = a;
    this.turn = b;
    this.money = c;
    this.owned_properties = d;
  }

  pay = (recipient: string, money: number) => {
    console.log(`${this.name} has paid ${recipient} $${money}`)
  }
}
