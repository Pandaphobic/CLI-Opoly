import { Space } from "./spaces";
import { Board, Player } from "./game";

// Assemble Player List
const Players: Player[] = [];
Players.push(new Player("Chris", false, 1500, [], 0));
Players.push(new Player("Michael", false, 1500, [], 0));
Players.push(new Player("Calista", false, 1500, [], 0));
Players.push(new Player("Megan", false, 1500, [], 0));

class GameState {
  Players: Player[];
  Board: Space[];

  constructor(Players: Player[], Board: Space[]) {
    this.Players = Players;
    this.Board = Board;
  }
}

export const newGame = () => {
  const new_game_state = new GameState(Players, Board());
  return new_game_state;
};
