import { Player } from "./player";
import { BuildBoard } from "./game";
const blessed = require("blessed");
import contrib from "blessed-contrib";
import fs from "fs";
import path from "path";
import { whoGoesFirst, whosTurnIsIt, movePlayer } from "./game";
var emoji = require("node-emoji");
import chalk = require("chalk");

var [coffee, blueSquare] = [emoji.get("coffee"), emoji.get("blueSquare")];

const Players: Player[] = [];
const Board = BuildBoard();

// console.log(Board);
Players.push(new Player("Chris", false, 1500, [], 0));
Players.push(new Player("Michael", false, 1500, [], 0));
Players.push(new Player("Calista", false, 1500, [], 0));
Players.push(new Player("Megan", false, 1500, [], 0));

var screen = blessed.screen();
screen.title = "CLI-Opoly - A CLI Take on the Classic Game!";
//create layout and widgets
var grid = new contrib.grid({ rows: 4, cols: 12, screen: screen });

var player_details = grid.set(2, 0, 1, 2, contrib.table, {
  keys: true,
  fg: "white",
  selectedFg: "black",
  selectedBg: "cyan",
  interactive: true,
  label: `${chalk.bold("Details")}`,
  width: "30%",
  height: "30%",
  border: { type: "line", fg: "cyan" },
  columnSpacing: 0, //in chars
  columnWidth: [0, 0, 0] /*in chars*/,
});

var player_explorer = grid.set(0, 0, 2, 2, contrib.tree, {
  style: {
    fg: "white",
  },
  selectedBg: "cyan",
  template: { lines: true },
  label: `${chalk.bold("Player Explorer")}`,
  padding: 0,
});

//set tree
player_explorer.setData({
  extended: true,
  children: {
    Chris: {
      children: {
        Properties: ["baltic", "boardwalk"],
        Wallet: {
          Cash: "$500",
          Loans: "$0",
          Cards: {},
        },
      },
    },
    Calista: {
      children: {
        Properties: ["baltic", "boardwalk"],
        Wallet: {
          Cash: "500",
          Loans: {},
          Cards: {},
        },
      },
    },
    Michael: {
      children: {
        Properties: ["baltic", "boardwalk"],
        Wallet: {
          Cash: "500",
          Loans: {},
          Cards: {},
        },
      },
    },
    Megan: {
      children: {
        Properties: ["baltic", "boardwalk"],
        Wallet: {
          Cash: "500",
          Loans: {},
          Cards: {},
        },
      },
    },
  },
});

var trade = grid.set(3, 0, 1, 3, contrib.table, {
  keys: true,
  fg: "white",
  selectedFg: "white",
  selectedBg: "blue",
  interactive: true,
  label: "Trade",
  width: "30%",
  height: "30%",
  border: { type: "line", fg: "cyan" },
  columnSpacing: 10, //in chars
  columnWidth: [16, 12, 12] /*in chars*/,
});

var buy_sell_houses = grid.set(3, 3, 1, 3, contrib.table, {
  keys: true,
  fg: "white",
  selectedFg: "white",
  selectedBg: "blue",
  interactive: true,
  label: "Buy/Sell Houses",
  width: "30%",
  height: "30%",
  border: { type: "line", fg: "cyan" },
  columnSpacing: 10, //in chars
  columnWidth: [16, 12, 12] /*in chars*/,
});

var turn_prompts = grid.set(3, 6, 1, 3, contrib.table, {
  keys: true,
  fg: "white",
  selectedFg: "white",
  selectedBg: "blue",
  interactive: true,
  label: "Turn Prompts",
  width: "30%",
  height: "30%",
  border: { type: "line", fg: "cyan" },
  columnSpacing: 10, //in chars
  columnWidth: [16, 12, 12] /*in chars*/,
});

var chat_box = grid.set(1, 9, 3, 3, contrib.table, {
  keys: true,
  fg: "white",
  selectedFg: "white",
  selectedBg: "blue",
  interactive: true,
  label: "Chat",
  width: "30%",
  height: "30%",
  border: { type: "line", fg: "cyan" },
  columnSpacing: 10, //in chars
  columnWidth: [16, 12, 12] /*in chars*/,
});

var log = grid.set(0, 9, 1, 3, contrib.log, {
  fg: "green",
  selectedFg: "green",
  label: "Turn History",
});

var map = grid.set(0, 2, 3, 7, contrib.map, { label: "Board" });

//set tree

screen.key(["escape", "q", "C-c"], function () {
  return process.exit(0);
});

screen.key(["tab"], function () {
  screen.focusNext();
  focusedDraw();
  screen.render();
});

function focusedDraw() {
  // if (screen.focused === player_explorer.rows) {
  //   player_explorer.setLabel(`${chalk.bgMagentaBright("Soemthing")}`);
  // } else {
  //   player_explorer.setLabel(`${chalk.bgWhiteBright.black("Players")}`);
  // }
  // player_details
  // trade
  // buy_sell_houses
  // chat
}

player_explorer.focus();
focusedDraw();
screen.render();

export function logTurn(message: string) {
  log.log(message);
}

// Determine who goes first
whoGoesFirst(Players);
movePlayer(whosTurnIsIt(Players), Board, Players);
movePlayer(whosTurnIsIt(Players), Board, Players);
movePlayer(whosTurnIsIt(Players), Board, Players);
movePlayer(whosTurnIsIt(Players), Board, Players);
