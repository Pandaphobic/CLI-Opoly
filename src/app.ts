import { Player } from "./player";
import { BuildBoard } from "./game";
const blessed = require("blessed");
import contrib = require("blessed-contrib");
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

// INSTANTIATE GRID LAYOUT
var grid = new contrib.grid({ rows: 4, cols: 12, screen: screen });

// THIS SHOULD BE REPLACED WITH PLAYER OBJECT
const player_properties_details: object = {
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

var player_explorer = grid.set(0, 0, 1, 3, blessed.list, {
  style: {
    fg: "white",
  },
  selectedBg: "cyan",
  template: { lines: true },
  label: `${chalk.bold.greenBright("Player Explorer")}`,
  padding: 0,
  interactive: true,
  mouse: true,
  keys: true,
  items: Players.map(player => player.name),
});

var player_properties = grid.set(1, 0, 1, 3, contrib.table, {
  keys: true,
  fg: "white",
  selectedFg: "white",
  selectedBg: "black",
  interactive: true,
  label: `${chalk.bold.greenBright("Properties")}`,
  width: "30%",
  height: "30%",
  border: { type: "line", fg: "cyan" },
  columnSpacing: 4, //in chars
  columnWidth: [16, 5, 5] /*in chars*/,
});

var current_space_details = grid.set(2, 0, 1, 3, contrib.table, {
  keys: true,
  fg: "white",
  selectedFg: "white",
  selectedBg: "black",
  interactive: true,
  label: `${chalk.bold.yellowBright("Current Space")}`,
  width: "30%",
  height: "30%",
  border: { type: "line", fg: "cyan" },
  columnSpacing: 4, //in chars
  columnWidth: [16, 5, 5] /*in chars*/,
});

// THIS WILL NEED TO CHANGE TO ACCOMODATE PLAYER TYPE
player_explorer.on("select", function (node: any) {
  const playerName = node.content;
  const playerProperties: [] = player_properties_details[playerName].properties;

  // console.log(playerProperties[0].name);

  // let properties = node.properties;
  var data: any[] = [];

  for (let i = 0; i < playerProperties.length; i++) {
    data.push([
      playerProperties[i].name,
      playerProperties[i].price,
      playerProperties[i].mortgaged,
    ]);
  }

  player_properties.setData({
    headers: ["Name", "Price", "Mortgaged"],
    data: data,
  });

  screen.render();
});

var trade = grid.set(3, 0, 1, 3, contrib.table, {
  keys: true,
  fg: "white",
  selectedFg: "white",
  selectedBg: "blue",
  interactive: true,
  label: `${chalk.bold.yellowBright("Trade")}`,
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

var map = grid.set(0, 3, 3, 6, contrib.map, { label: "Board" });

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
