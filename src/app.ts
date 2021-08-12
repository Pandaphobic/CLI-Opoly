// Libs
const blessed = require("blessed");
const colors = require("colors/safe");
const contrib = require("blessed-contrib");

import fs from "fs";
import path from "path";

// Types
import { Player } from "./player";
import { Board } from "./game";
import { Space } from "./spaces";

// Init CLUI
export var screen = blessed.screen();
screen.title = "CLI-Opoly - A CLI Take on the Classic Game!";

// Assemble Player List
const Players: Player[] = [];
Players.push(new Player("Chris", false, 1500, [], 0));
Players.push(new Player("Michael", false, 1500, [], 0));
Players.push(new Player("Calista", false, 1500, [], 0));
Players.push(new Player("Megan", false, 1500, [], 0));

// Pages
import { title_page, game_view_page } from "./pages";

const page1 = () => title_page(screen);
const page2 = () => game_view_page(screen, Players);

// Functions
import { whoGoesFirst, whosTurnIsIt, movePlayer } from "./game"; // movePlayer

export var carousel = new contrib.carousel([page1, page2], {
  screen: screen,
  controlKeys: true,
});

screen.key(["escape", "q", "C-c"], function () {
  //ch: any, key: any
  return process.exit(0);
  // carousel.next(); --> goto next page
});

carousel.start();

screen.key(["tab"], function () {
  // console.log(screen.focused);
  screen.focusNext();
  screen.render();
});

screen.render();
let GAME_BOARD = Board();
