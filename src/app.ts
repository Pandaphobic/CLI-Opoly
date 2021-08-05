import { Player } from "./player";
import { board } from "./game";
const blessed = require("blessed");
import contrib = require("blessed-contrib");
import { Property } from "./spaces";
import { whoGoesFirst, whosTurnIsIt } from "./game"; // movePlayer
import fs from "fs";
import path from "path";
// import { board } from "./boards/monopoly";
const colors = require("colors/safe");

const Players: Player[] = [];

// console.log(Board);
Players.push(new Player("Chris", false, 1500, [], 0));
Players.push(new Player("Michael", false, 1500, [], 0));
Players.push(new Player("Calista", false, 1500, [], 0));
Players.push(new Player("Megan", false, 1500, [], 0));

var screen = blessed.screen();
screen.title = "CLI-Opoly - A CLI Take on the Classic Game!";

// INSTANTIATE GRID LAYOUT
var grid = new contrib.grid({ rows: 12, cols: 12, screen: screen });

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
    selected: {
      fg: "yellow",
      bold: true,
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

player_details.setData;

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

var chat_input = grid.set(11, 0, 1, 3, blessed.textbox, {
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
  pad: 1,
  label: "Monopoly Board",
  border: { type: "line", fg: "cyan" },
  columnSpacing: 1,
  columnWidth: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
});

board_view.setData({
  headers: [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  data: [
    [
      colors.bgWhite.black("FREE"),
      colors.bgRed.black("⌂⌂⌂⌂"),
      colors.bgBrightWhite.black("LUCK"),
      colors.bgRed.black("⌂⌂⌂⌂"),
      colors.bgRed.black("⌂⌂⌂⌂"),
      colors.bgBlack.white("CHOO"),
      colors.bgBrightYellow.black("⌂⌂⌂⌂"),
      colors.bgBrightYellow.black("⌂⌂⌂⌂"),
      colors.bgWhite.black("UTIL"),
      colors.bgBrightYellow.black("⌂⌂⌂⌂"),
      colors.bgWhite.black("GOTO"),
    ],
    [
      colors.bgWhite.black("PARK"),
      colors.bgRed.black("    "),
      colors.bgBrightWhite.black("    "),
      colors.bgRed.black("    "),
      colors.bgRed.black("    "),
      colors.bgBlack.white("CHOO"),
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
      colors.bgBlack.white("CHOO"),
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      colors.bgBlack.white("CHOO"),
    ],
    [
      colors.bgBlack.white("CHOO"),
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      "    ",
      colors.bgBlack.white("CHOO"),
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
      colors.bgBlack.white("CHOO"),
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
      colors.bgBlack.white("CHOO"),
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

board();
// Determine who goes first
// whoGoesFirst(Players);
// movePlayer(whosTurnIsIt(Players), Board, Players);
// movePlayer(whosTurnIsIt(Players), Board, Players);
// movePlayer(whosTurnIsIt(Players), Board, Players);
// movePlayer(whosTurnIsIt(Players), Board, Players);
