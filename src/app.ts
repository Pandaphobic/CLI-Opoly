import { Player } from "./player";
import { BuildBoard } from "./game";
const blessed = require("blessed");
import contrib = require("blessed-contrib");
import fs from "fs";
import path from "path";
import { whoGoesFirst, whosTurnIsIt, movePlayer } from "./game";
var emoji = require("node-emoji");
import chalk = require("chalk");
import { triggerAsyncId } from "async_hooks";

import { board as MONOPOLY_BOARD } from "./monopoly";

var [redSquare, blueSquare] = [
  emoji.get("red-square"),
  emoji.get("blueSquare"),
];

const Players: Player[] = [];
const Board = BuildBoard();

// console.log(Board);
Players.push(new Player("Chris", false, 1500, [], 0));
Players.push(new Player("Michael", false, 1500, [], 0));
Players.push(new Player("Calista", false, 1500, [], 0));
Players.push(new Player("Megan", false, 1500, [], 0));

var screen = blessed.screen();
screen.title = "CLI-Opoly - A CLI Take on the Classic Game!";

// INSTANTIATE GRID LAYOUT
var grid = new contrib.grid({ rows: 12, cols: 12, screen: screen });

// THIS SHOULD BE REPLACED WITH PLAYER OBJECT
const player_properties_object: object = {
  Chris: {
    properties: [
      { name: "Baltic", price: 500, mortgaged: "yes" },
      { name: "Boardwalk", price: 1000, mortgaged: "yes" },
      { name: "Cherry Ave", price: 250, mortgaged: "no" },
    ],
  },
  Calista: {
    properties: [
      { name: "Sommerset", price: 150, mortgaged: "no" },
      { name: "Chincy", price: 500, mortgaged: "no" },
      { name: "Varro", price: 200, mortgaged: "no" },
      { name: "Zulex", price: 50, mortgaged: "no" },
      { name: "Varro", price: 200, mortgaged: "yes" },
      { name: "Campala", price: 50, mortgaged: "no" },
      { name: "Getzchen", price: 200, mortgaged: "yes" },
      { name: "Fourth Manor", price: 50, mortgaged: "no" },
    ],
  },
  Megan: {
    properties: [
      { name: "Canto", price: 150, mortgaged: "yes" },
      { name: "Marvintyne", price: 500, mortgaged: "yes" },
      { name: "Esto Besto", price: 200, mortgaged: "no" },
      { name: "The Shore", price: 50, mortgaged: "no" },
      { name: "Antabanto", price: 200, mortgaged: "yes" },
      { name: "Solef", price: 50, mortgaged: "no" },
      { name: "Carjuste", price: 200, mortgaged: "no" },
    ],
  },
  Michael: {
    properties: [
      { name: "Chadsworth", price: 150, mortgaged: "yes" },
      { name: "Douchington", price: 500, mortgaged: "no" },
      { name: "Mesaclynn", price: 200, mortgaged: "no" },
      { name: "MlonEusk", price: 50, mortgaged: "no" },
      { name: "Bud Fight", price: 200, mortgaged: "no" },
      { name: "Titsdale", price: 50, mortgaged: "no" },
      { name: "Soda Valley", price: 200, mortgaged: "no" },
      { name: "Bronx", price: 50, mortgaged: "no" },
    ],
  },
};

var property_mgmt = grid.set(8, 3, 4, 4, blessed.list, {
  style: {
    focus: {
      border: {
        fg: "blue",
      },
    },
  },
  keys: true,
  mouse: true,
  fg: "white",
  selectedFg: "white",
  selectedBg: "blue",
  interactive: true,
  label: `${chalk.bold.yellowBright("Property Mgmt.")}`,
  border: { type: "line", fg: "cyan" },
  columnSpacing: 10, //in chars
  columnWidth: [16, 12, 12] /*in chars*/,
});

var board_details = grid.set(8, 7, 4, 5, blessed.list, {
  style: {
    focus: {
      border: {
        fg: "blue",
      },
    },
  },
  keys: true,
  mouse: true,
  fg: "white",
  selectedFg: "white",
  selectedBg: "blue",
  interactive: true,
  label: `${chalk.bold.yellowBright("Board Details")}`,
  border: { type: "line", fg: "cyan" },
  columnSpacing: 10, //in chars
  columnWidth: [16, 12, 12] /*in chars*/,
});

var player_bar = grid.set(0, 0, 1, 6, blessed.listbar, {
  interactive: true,
  mouse: true,
  keys: true,
  style: {
    focus: {
      border: {
        fg: "blue",
      },
    },
  },
  label: `${chalk.bold.greenBright("Players")}`,
  items: ["Chris", "Calista", "Michael", "Megan"],
});

var player_details = grid.set(1, 0, 4, 3, blessed.list, {
  style: {
    focus: {
      border: {
        fg: "blue",
      },
    },
  },
  keys: true,
  fg: "white",
  selectedFg: "white",
  selectedBg: "blue",
  interactive: true,
  mouse: true,
  label: `${chalk.bold.greenBright("Assets")}`,
  width: "30%",
  height: "30%",
  border: { type: "line", fg: "cyan" },
  columnSpacing: 10, //in chars
  columnWidth: [16, 12, 12] /*in chars*/,
});

var trade = grid.set(1, 3, 4, 3, blessed.list, {
  style: {
    focus: {
      border: {
        fg: "blue",
      },
    },
  },
  keys: true,
  fg: "white",
  selectedFg: "white",
  selectedBg: "blue",
  interactive: true,
  mouse: true,
  label: `${chalk.bold.greenBright("Details")}`,
  width: "30%",
  height: "30%",
  border: { type: "line", fg: "cyan" },
  // columnSpacing: 10, //in chars
  // columnWidth: [16, 12, 12] /*in chars*/,
});

var chat_box = grid.set(5, 0, 6, 3, blessed.log, {
  style: {
    focus: {
      border: {
        fg: "blue",
      },
    },
  },
  keys: true,
  mouse: true,
  fg: "white",
  selectedFg: "white",
  selectedBg: "blue",
  interactive: true,
  label: "Chat",
  border: { type: "line", fg: "cyan" },
  columnSpacing: 10, //in chars
  columnWidth: [16, 12, 12] /*in chars*/,
});

var chat_input = grid.set(11, 0, 1, 3, blessed.input, {
  style: {
    focus: {
      border: {
        fg: "blue",
      },
    },
  },
  interactive: true,
  mouse: true,
  keys: true,
});

var turn_history = grid.set(5, 3, 3, 3, blessed.log, {
  style: {
    focus: {
      border: {
        fg: "blue",
      },
    },
  },
  mouse: true,
  interactive: true,
  keys: true,
  fg: "green",
  selectedFg: "green",
  label: "Turn History",
  scroll: {
    fg: "blue",
    bg: "cyan",
  },
});

const b = MONOPOLY_BOARD;
let row_a = [];
let row_b = [];
let row_c = () => {
  let row;

  return row;
};
let row_d = [];

for (let i = 20; i < 31; i++) {
  if (b[i].color) {
    let ch = b[i].color;
    let col = chalk.bgHex(ch:string);
    let char = col.bold("0000");
    row_a.push(char);
    row_b.push(col.bold("    "));
    // top_row.push(`${char}`);
  }
  if (b[i].type === "free-parking") {
    row_a.push(chalk.bgWhiteBright.black("FREE"));
    row_b.push(chalk.bgWhiteBright.black("PARK"));
  }
  if (b[i].type === "chance") {
    row_a.push(chalk.bgWhiteBright.black("LUCK"));
    row_b.push(chalk.bgWhiteBright.black("    "));
  }
  if (b[i].type === "railroad") {
    row_a.push(chalk.bgWhiteBright.black("CHOO"));
    row_b.push(chalk.bgWhiteBright.black("CHOO"));
  }
  if (b[i].type === "utility") {
    row_a.push(chalk.bgWhiteBright.black("UTIL"));
    row_b.push(chalk.bgWhiteBright.black("    "));
  }
  if (b[i].type === "go-to-jail") {
    row_a.push(chalk.bgWhiteBright.black("GOTO"));
    row_b.push(chalk.bgWhiteBright.black("JAIL"));
  }
}

// prettier-ignore
var board_view = grid.set(0, 6, 8, 6, blessed.scrollabletext, {
  label: "Board",
  style: {
    focus: {
      border: {
        fg: "blue",
      },
    },
  },
  content: `
    ${row_a.join('')}
    ${row_b.join('')}`,
});

screen.key(["escape", "q", "C-c"], function () {
  return process.exit(0);
});

screen.key(["tab"], function () {
  // console.log(screen.focused);
  screen.focusNext();
  screen.render();
});

player_bar.focus();
screen.render();

export function logTurn(message: string) {
  turn_history.log(message);
}

// Determine who goes first
whoGoesFirst(Players);
movePlayer(whosTurnIsIt(Players), Board, Players);
movePlayer(whosTurnIsIt(Players), Board, Players);
movePlayer(whosTurnIsIt(Players), Board, Players);
movePlayer(whosTurnIsIt(Players), Board, Players);
