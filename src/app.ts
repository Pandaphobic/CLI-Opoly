import { Player } from "./player";
import { BuildBoard } from "./game";
const blessed = require("blessed");
import contrib = require("blessed-contrib");
import { Property } from "./spaces";
import fs from "fs";
import path from "path";
const colors = require("colors/safe");
import { whoGoesFirst, whosTurnIsIt, movePlayer } from "./game";

const Players: Player[] = [];
const Board: Property[] = BuildBoard();

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
  label: `${colors.bold("Property Mgmt.")}`,
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
  label: `${colors.bold("Board Details")}`,
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
  label: `${colors.bold("Players")}`,
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
  label: `${colors.bold("Assets")}`,
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
  label: `${colors.bold("Details")}`,
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
  label: `${colors.bold("Chat")}`,
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
  label: `${colors.bold("Turn History")}`,
  scroll: {
    fg: "blue",
    bg: "cyan",
  },
});

// prettier-ignore
var board_view = grid.set(0, 6, 8, 6, contrib.table, {
  keys: true,
  fg: "white",
  selectedFg: "white",
  selectedBg: "blue",
  interactive: false,
  label: "Monopoly Board",
  border: { type: "line", fg: "cyan" },
  columnSpacing: 0,
  columnWidth: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
});

board_view.setData({
  headers: [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  data: [
    [
      colors.bgWhite.black("FREE"),
      colors.bgRed.black("⌂⌂⌂⌂"),
      colors.bgWhite.black("LUCK"),
      colors.bgRed.black("⌂⌂⌂⌂"),
      colors.bgRed.black("⌂⌂⌂⌂"),
      colors.bgWhite.black("CHOO"),
      colors.bgBrightYellow.black("⌂⌂⌂⌂"),
      colors.bgBrightYellow.black("⌂⌂⌂⌂"),
      colors.bgWhite.black("UTIL"),
      colors.bgBrightYellow.black("⌂⌂⌂⌂"),
      colors.bgWhite.black("GOTO"),
    ],
    [
      colors.bgWhite.black("PARK"),
      colors.bgRed.black("    "),
      colors.bgWhite.black("    "),
      colors.bgRed.black("    "),
      colors.bgRed.black("    "),
      colors.bgWhite.black("CHOO"),
      colors.bgBrightYellow.black("    "),
      colors.bgBrightYellow.black("    "),
      colors.bgWhite.black("    "),
      colors.bgBrightYellow.black("    "),
      colors.bgWhite.black("JAIL"),
    ],
    // ROW 2
    [
      colors.bgYellow.black("⌂⌂⌂⌂"),
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      colors.bgGreen.black("⌂⌂⌂⌂"),
    ],
    [
      colors.bgYellow.black("    "),
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      colors.bgGreen.black("    "),
    ],
    // ROW 3
    [
      colors.bgYellow.black("⌂⌂⌂⌂"),
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      colors.bgGreen.black("⌂⌂⌂⌂"),
    ],
    [
      colors.bgYellow.black("    "),
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      colors.bgGreen.black("    "),
    ],
    // ROW 4
    [
      colors.bgWhite.black("COMM"),
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      colors.bgWhite.black("COMM"),
    ],
    [
      colors.bgWhite.black("    "),
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      colors.bgWhite.black("    "),
    ],
    // ROW 5
    [
      colors.bgYellow.black("⌂⌂⌂⌂"),
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      colors.bgGreen.black("⌂⌂⌂⌂"),
    ],
    [
      colors.bgYellow.black("    "),
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      colors.bgGreen.black("    "),
    ],
    // ROW 6
    [
      colors.bgWhite.black("CHOO"),
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      colors.bgWhite.black("CHOO"),
    ],
    [
      colors.bgWhite.black("CHOO"),
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      colors.bgWhite.black("CHOO"),
    ],
    // ROW 7
    [
      colors.bgBrightMagenta.black("⌂⌂⌂⌂"),
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      colors.bgBrightWhite.black("LUCK"),
    ],
    [
      colors.bgBrightMagenta.black("    "),
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      colors.bgBrightWhite.black("    "),
    ],
    // ROW 8
    [
      colors.bgBrightMagenta.black("⌂⌂⌂⌂"),
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      colors.bgBlue.black("⌂⌂⌂⌂"),
    ],
    [
      colors.bgBrightMagenta.black("    "),
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      colors.bgBlue.black("    "),
    ],
    // ROW 9
    [
      colors.bgWhite.black("UTIL"),
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      colors.bgWhite.black("WLTH"),
    ],
    [
      colors.bgWhite.black("    "),
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      colors.bgWhite.black(" TAX"),
    ],
    // ROW 10
    [
      colors.bgBrightMagenta.black("⌂⌂⌂⌂"),
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      colors.bgBlue.black("⌂⌂⌂⌂"),
    ],
    [
      colors.bgBrightMagenta.black("    "),
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      colors.bgBlue.black("    "),
    ],
    [
      colors.bgWhite.black("JAIL"),
      colors.bgCyan.black("⌂⌂⌂⌂"),
      colors.bgCyan.black("⌂⌂⌂⌂"),
      colors.bgBrightWhite.black("LUCK"),
      colors.bgCyan.black("⌂⌂⌂⌂"),
      colors.bgWhite.black("CHOO"),
      colors.bgWhite.black("LXRY"),
      colors.bgMagenta.black("⌂⌂⌂⌂"),
      colors.bgWhite.black("UTIL"),
      colors.bgMagenta.black("⌂⌂⌂⌂"),
      colors.bgWhite.black(" GO "),
    ],
    [
      colors.bgWhite.black("JAIL"),
      colors.bgCyan.black("    "),
      colors.bgCyan.black("    "),
      colors.bgBrightWhite.black("    "),
      colors.bgCyan.black("    "),
      colors.bgWhite.black("CHOO"),
      colors.bgWhite.black(" TAX"),
      colors.bgMagenta.black("    "),
      colors.bgWhite.black("    "),
      colors.bgMagenta.black("    "),
      colors.bgWhite.black(" GO "),
    ],
  ],
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
