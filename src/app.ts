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

// var player_explorer = grid.set(0, 0, 2, 3, blessed.list, {
//   style: {
//     focus: {
//       border: {
//         fg: "blue",
//       },
//     },
//   },
//   selectedBg: "cyan",
//   template: { lines: true },
//   label: `${chalk.bold.greenBright("Player Explorer")}`,
//   padding: 0,
//   interactive: true,
//   mouse: true,
//   keys: true,
//   items: Players.map(player => player.name),
// });

// var player_properties = grid.set(2, 0, 2, 3, blessed.list, {
//   interactive: true,
//   mouse: true,
//   keys: true,
//   style: {
//     focus: {
//       border: {
//         fg: "blue",
//       },
//     },
//   },
//   label: `${chalk.bold.greenBright("Properties")}`,
//   items: "",
// });

// var current_space_details = grid.set(4, 0, 3, 3, blessed.list, {
//   interactive: true,
//   mouse: true,
//   keys: true,
//   label: `${chalk.bold.bgYellowBright("Current Space")}`,
//   columnSpacing: 4, //in chars
//   columnWidth: [16, 5, 5] /*in chars*/,
//   items: ["one", "two", "three"],
//   style: {
//     focus: {
//       border: {
//         fg: "blue",
//       },
//     },
//   },
// });

// current_space_details.on("element focus", e => {
//   e.parent.border.fg = "blue";
// });

// THIS WILL NEED TO CHANGE TO ACCOMODATE PLAYER TYPE
// player_explorer.on("select", function (node: any) {
//   const playerName: string = node.content;
//   const playerProperties = player_properties_object[playerName].properties;

//   // console.log(playerProperties[0].name);

//   // let properties = node.properties;
//   var data: string[] = [];

//   for (let i = 0; i < playerProperties.length; i++) {
//     data.push(
//       playerProperties[i].name.toString(),
//       playerProperties[i].price.toString(),
//       playerProperties[i].mortgaged.toString()
//     );
//   }
//   player_properties.setItem(data);

//   // player_properties.items.pushItem(data);

//   // player_properties.setData({
//   //   // headers: ["Name", "Price", "Mortgaged"],
//   //   data: data,
//   // });

//   screen.render();
// });

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
  label: `${chalk.bold.bgYellowBright("Property Mgmt.")}`,
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
  label: `${chalk.bold.bgYellowBright("Board Details")}`,
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

var board_view = grid.set(0, 8, 8, 4, blessed.scrollabletext, {
  label: "Board",
  style: {
    focus: {
      border: {
        fg: "blue",
      },
    },
  },
  content: `

        [1]${chalk.bgRedBright.bold(" ▢ ")}[🤞]${chalk.bgRedBright.bold(
    " ▢ "
  )}${chalk.bold.bgRedBright(" ▢ ")}[🚂]${chalk.bgYellowBright.bold(
    " ▢ "
  )}${chalk.bgYellowBright.bold(" ▢ ")}[🚰]${chalk.bgYellowBright.bold(
    " ▢ "
  )}[🚔] 
        ${chalk.bgYellow.bold(
          " ▢ "
        )}                           ${chalk.bgGreenBright.bold(" ▢ ")} 
        ${chalk.bgYellow.bold(
          " ▢ "
        )}                           ${chalk.bgGreenBright.bold(" ▢ ")} 
        [2]                           [3] 
        ${chalk.bgYellow.bold(
          " ▢ "
        )}                           ${chalk.bgGreenBright.bold(" ▢ ")}   
        [3]      CLI-Opoly Board      [1] 
        ${chalk.bgMagenta.bold(" ▢ ")}                           [2] 
        ${chalk.bgMagenta.bold(
          " ▢ "
        )}                           ${chalk.bgBlueBright.bold(" ▢ ")} 
        [4]                           [🏦] 
        ${chalk.bgMagenta.bold(
          " ▢ "
        )}                           ${chalk.bgBlueBright.bold(" ▢ ")} 
        [5]${chalk.bgCyanBright.bold(" ▢ ")}${chalk.bgCyanBright.bold(
    " ▢ "
  )}[🤞]${chalk.bgCyanBright.bold(" ▢ ")}[🚂][🏛️]${chalk.bgRed.bold(
    " ▢ "
  )}[💰]${chalk.bgRed.bold(" ▢ ")}[🏁] 
`,
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
