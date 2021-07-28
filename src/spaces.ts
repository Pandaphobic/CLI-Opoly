/*  Using Classes to Describe the traits for each space type on the board  */

import { Player } from "./player";

export class Space {
  name: string;                             // Name Ex. Boardwalk, Go, Jail
  occupants: Player[];                        // Array of players currently on space
  symbol: string;

  constructor(name: string, occupants: Player[], symbol: string) {
    this.name = name;
    this.occupants = occupants;
    this.symbol = symbol;
  }
}

export class Property extends Space { 
  color: string;                            // What color this property belongs to
  price: number;                            // Price to purchaseint
  rent: number;                             // Base rent price
  mortgage_status: boolean;                 // Is this propery mortgaged
  owner: string;                            // Name of Player who owns property (validated)
  


  constructor(name: string, occupants: Player[], symbol: string, owner: string, color: string, price: number, rent: number, mortgage_status: boolean)  {
  
    super(name, occupants, symbol);
    this.owner = owner;
    this.symbol = symbol;
    this.color = color;                     
    this.price = price;                     
    this.rent = rent;                       
    this.mortgage_status = mortgage_status; 
    
  }
}

// class Go extends Space {
//   salary: number;                           // Base amount received when passed
//   bonus: number;                            // Bonus amount **likely to change to multiplier

//   constructor(a: string, b: number, c: number, d: number) {
//     super(a, b);
//     this.salary = c;
//     this.bonus = d;
//   }
// }

// class Tax extends Space {
//   amount_owed: number;                      // Amount owed to kitty

//   constructor(a: string, b: number, c: number ) {
//     super(a,b)
//     this.amount_owed = c;         
//   }
// }

// class Free_Parking extends Space {
//   kitty_value: number;                      // Money payed in taxes to be paid to free space

//   constructor(a: string, b: number, c: number) {
//     super(a,b)
//     this.kitty_value = c;         
//   }
// }

// class Community_Chest extends Space {
//   constructor(a: string, b: number) {
//     super(a, b);
//   }
// }

// class Chance extends Space {
//   constructor(a: string, b: number) {
//     super(a, b);
//   }
// }

// class Utility extends Space {
//   constructor(a: string, b: number) {
//     super(a, b);
//   }
// }

// class Railroad extends Space {
//   constructor(a: string, b: number) {
//     super(a, b);
//   }
// }

// class Jail extends Space {
//   constructor(a: string, b: number) {
//     super(a, b);
//   }
// }
