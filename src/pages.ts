// Libs
const blessed = require("blessed");
const colors = require("colors/safe");
const contrib = require("blessed-contrib");
import { screen } from "./app";

var grid_page_1 = new contrib.grid({ rows: 4, cols: 4, screen: screen });
var grid_page_2 = new contrib.grid({ rows: 12, cols: 10, screen: screen });

export const title_page = (screen: any) => {
  var line = grid_page_1.set(1, 0, 2, 2, contrib.line, {
    style: { line: "yellow", text: "green", baseline: "black" },
    xLabelPadding: 3,
    xPadding: 5,
    label: "Stocks",
  });

  var map = grid_page_1.set(1, 2, 2, 2, contrib.map, {
    label: "Servers Location",
  });

  var box = blessed.box({
    content:
      "click right-left arrows or wait 3 seconds for the next layout in the carousel",
    top: "80%",
    left: "10%",
  });
  screen.append(box);

  var lineData = {
    x: ["t1", "t2", "t3", "t4"],
    y: [5, 1, 7, 5],
  };

  line.setData([lineData]);
};

export const game_view_page = (screen: any, Players: any) => {
  var player_bar = grid_page_2.set(0, 0, 1, 6, blessed.listbar, {
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
    items: (() => {
      let name_arr: string[] = [];

      for (let i = 0; i < Players.length; i++) {
        name_arr.push(Players[i].name);
      }
      return name_arr;
    })(),
  });

  var player_details = grid_page_2.set(1, 0, 3, 3, blessed.list, {
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

  var chat_box = grid_page_2.set(4, 0, 6, 3, blessed.log, {
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
    columnWidth: [16] /*in chars*/,
  });

  chat_box.log(`⚀ ⚁ ⚂ ⚃ ⚄ ⚅
  ☠ ★
  ☂ ☘
  ☣ ☮
  ☭ ☯
  ♛ ☃
  ☗ ☖ 
  `);

  // TEMP FIX
  var turn_history = grid_page_2.set(4, 3, 3, 3, blessed.log, {
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
  var board_view = grid_page_2.set(0, 6, 9, 4, contrib.table, {
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

  var board_details = grid_page_2.set(1, 3, 3, 3, contrib.table, {
    // label: `${colors.bold("Board Details")}`,
    style: {
      fg: "yellow",
      bold: true,
    },
    fg: "brightBlue",
    selectedFg: "cyan",
    selectedBg: "none",
    interactive: true,
    border: { type: "line", fg: "black" },
    columnSpacing: 3, //in chars
    columnWidth: [8, 19, 4] /*in chars*/,
  });

  board_details.setData({
    headers: ["Player", "Position", "Turn"],
    data: [
      ["Chris", "L1 - Lt Purp. - 1", "*"],
      ["Calista", "L8 - Gold - 2", " "],
      ["Michael", "T3 - RED - 2", " "],
      ["Megan", "JAIL - JAIL", " "],
      ,
    ],
  });
};
