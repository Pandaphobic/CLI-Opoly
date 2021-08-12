/*  Using Classes to Describe the traits for each space type on the board  */

export class Space {
  id: number;
  name: string;
  type: string;
  cost?: number;
  color?: string; // What color to display on board
  rent?: number[]; // Base rent price
  group?: number[]; // [group, index, total] ex. park place:[8, 1, 2]
  house?: number; // Pricer per house
  corner?: boolean; //

  constructor(
    id: number,
    name: string,
    type: string,
    cost?: number,
    color?: string,
    rent?: number[],
    group?: number[],
    house?: number,
    corner?: boolean
  ) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.cost = cost;
    this.color = color;
    this.rent = rent;
    this.group = group;
    this.house = house;
    this.corner = corner;
  }
}
