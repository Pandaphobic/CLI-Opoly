/*  Using Classes to Describe the traits for each space type on the board  */

export class Space {
  name: string;
  type: string;

  constructor(name: string, type: string) {
    this.name = name;
    this.type = type;
  }
}

export class Property extends Space {
  color: string; // What color to display on board
  cost: number; // Price to purchase
  rent: number[]; // Base rent price
  group: number[]; // [group, index, total] ex. park place:[8, 1, 2]
  house: number; // Pricer per house

  constructor(
    name: string,
    type: string,
    color: string,
    cost: number,
    rent: number[],
    group: number[],
    house: number
  ) {
    super(name, type);
    this.cost = cost;
    this.color = color;
    this.rent = rent;
    this.group = group;
    this.house = house;
  }
}

export class Go extends Space {
  color: string; // What color to display on board
  corner: true; // You guessed it

  constructor(name: string, type: string, color: string, corner: true) {
    super(name, type);
    this.color = color;
    this.corner = corner;
  }
}

export class Jail extends Space {
  color: string; // What color to display on board
  corner: true; // You guessed it

  constructor(name: string, type: string, color: string, corner: true) {
    super(name, type);
    this.color = color;
    this.corner = corner;
  }
}

export class Free_Parking extends Space {
  color: string; // What color to display on board
  corner: true; // You guessed it

  constructor(name: string, type: string, color: string, corner: true) {
    super(name, type);
    this.color = color;
    this.corner = corner;
  }
}

export class Go_To_Jail extends Space {
  color: string; // What color to display on board
  corner: true; // You guessed it

  constructor(name: string, type: string, color: string, corner: true) {
    super(name, type);
    this.color = color;
    this.corner = corner;
  }
}

export class Community_Chest extends Space {
  constructor(name: string, type: string) {
    super(name, type);
  }
}

export class Chance extends Space {
  constructor(name: string, type: string) {
    super(name, type);
  }
}

export class Tax extends Space {
  cost: number; // amount to pay
  color: string; // What color to display on board

  constructor(name: string, type: string, cost: number, color: string) {
    super(name, type);
    this.cost = cost;
    this.color = color;
  }
}

export class Utility extends Space {
  cost: number; // amount to pay
  group: number[];
  color: string; // What color to display on board

  constructor(
    name: string,
    type: string,
    cost: number,
    group: number[],
    color: string
  ) {
    super(name, type);
    this.cost = cost;
    this.group = group;
    this.color = color;
  }
}
