/*  Using Classes to Describe the traits for each space type on the board  */

// prettier-ignore
export class Space {
  name: string;                             // Name Ex. Boardwalk, Go, Jail
  occupants: number;                        // Array of players currently on space

  constructor(a: string, b: number) {
    this.name = a;
    this.occupants = b;
  }
}

// prettier-ignore
export class Property extends Space { 
  color: string;                            // What color this property belongs to
  price: number;                            // Price to purchaseint
  rent: number;                             // Base rent price
  mortgage_status: boolean;                 // Is this propery mortgaged
  owner: string;                            // Name of Player who owns property (validated)


  constructor(a: string, b: number, c: string, d: number, e: number, f: boolean, g: string) {
    super(a, b);
    this.color = c;                     
    this.price = d;                     
    this.rent = e;                       
    this.mortgage_status = f; 
    this.owner = g;
  }
}
// prettier-ignore
class Go extends Space {
  salary: number;                           // Base amount received when passed
  bonus: number;                            // Bonus amount **likely to change to multiplier

  constructor(a: string, b: number, c: number, d: number) {
    super(a, b);
    this.salary = c;
    this.bonus = d;
  }
}
// prettier-ignore
class Tax extends Space {
  amount_owed: number;                      // Amount owed to kitty

  constructor(a: string, b: number, c: number ) {
    super(a,b)
    this.amount_owed = c;         
  }
}
// prettier-ignore
class Free_Parking extends Space {
  kitty_value: number;                      // Money payed in taxes to be paid to free space

  constructor(a: string, b: number, c: number) {
    super(a,b)
    this.kitty_value = c;         
  }
}
class Community_Chest extends Space {
  constructor(a: string, b: number) {
    super(a, b);
  }
}

class Chance extends Space {
  constructor(a: string, b: number) {
    super(a, b);
  }
}

class Utility extends Space {
  constructor(a: string, b: number) {
    super(a, b);
  }
}
class Railroad extends Space {
  constructor(a: string, b: number) {
    super(a, b);
  }
}
class Jail extends Space {
  constructor(a: string, b: number) {
    super(a, b);
  }
}
