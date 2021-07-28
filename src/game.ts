import { Property } from "./spaces";
import { Player } from "./player";

class Board {
  /* The Board Object shall be treated as the Game State
  
  Keep track of and modify the following:
  - players position
  - board spaces
      - symbol
      - color
      - layout
  - turn
  */

  // Spaces
  properties: Property[];
  players: Player[];

  constructor(properties: Property[], players: Player[]) {
    this.properties = properties;
    this.players = players;
  }
}

// Board Builder
export const BuildBoard = () => {
  const board: Property[] = [];

  board[0] = new Property("Prop0", [], "🟦", "", "blue", 50, 100, false);
  board[1] = new Property("Prop1", [], "🟫", "", "brown", 50, 100, false);
  board[2] = new Property("Prop2", [], "⬜", "", "white", 50, 100, false);
  board[3] = new Property("Prop3", [], "🟪", "", "purple", 50, 100, false);
  board[4] = new Property("Prop4", [], "🟧", "", "orange", 50, 100, false);
  board[5] = new Property("Prop5", [], "🟥", "", "red", 50, 100, false);
  board[6] = new Property("Prop6", [], "🟫", "", "brown", 50, 100, false);
  board[7] = new Property("Prop7", [], "⬜", "", "white", 50, 100, false);
  board[8] = new Property("Prop8", [], "🟪", "", "purple", 50, 100, false);
  board[9] = new Property("Prop9", [], "🟧", "", "orange", 50, 100, false);
  board[10] = new Property("Prop10", [], "🟥", "", "red", 50, 100, false);
  board[11] = new Property("Prop11", [], "🟫", "", "brown", 50, 100, false);
  board[12] = new Property("Prop12", [], "⬜", "", "white", 50, 100, false);
  board[13] = new Property("Prop13", [], "🟪", "", "purple", 50, 100, false);
  board[14] = new Property("Prop14", [], "🟧", "", "orange", 50, 100, false);
  board[15] = new Property("Prop15", [], "🟥", "", "red", 50, 100, false);
  board[16] = new Property("Prop16", [], "🟫", "", "brown", 50, 100, false);
  board[17] = new Property("Prop17", [], "⬜", "", "white", 50, 100, false);
  board[18] = new Property("Prop18", [], "🟪", "", "purple", 50, 100, false);
  board[19] = new Property("Prop19", [], "🟧", "", "orange", 50, 100, false);
  board[20] = new Property("Prop20", [], "🟥", "", "red", 50, 100, false);

  return board;
};

/*

[                 LEGEND                   ]
🏁 - Go Space             🆓 - Free Parking
💰 - Community Chest      🟦 - Blue Property
🚂 - Railroad             🟩 - Green Property
🤞 - Chance               🟨 - Yellow Property
🏛️ - Pay Taxes            🟥 - Red Property
🏦 - Jail                 🟧 - Orange Property
🚔 - Goto Jail            🟪 - Purple Property
💡 - Electric Company     ⬜ - White Property
🚰 - Water                🟫 - Brown Property


[🆓][🟥][🤞][🟥][🟥][🚂][🟨][🟨][🚰][🟨][🚔] 
[🟧]                                     [🟩] 
[🟧]                                     [🟩] 
[💰]                                     [💰] 
[🟧]                                     [🟩] 
[🚂]         CLI-Opoly Board             [🚂] 
[🟪]                                     [🤞] 
[🟪]                                     [🟦] 
[💡]                                     [🏦] 
[🟪]                                     [🟦] 
[🏦][⬜][⬜][🤞][⬜][🚂][🏛️][🟫][💰][🟫][🏁] 

*/
