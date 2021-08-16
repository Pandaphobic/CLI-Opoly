// Libs
const blessed = require("blessed");
const colors = require("colors/safe");
const contrib = require("blessed-contrib");
import { line } from "blessed-contrib";
import { screen } from "./app";
import { carousel } from "./app";

var grid_page_2 = new contrib.grid({ rows: 12, cols: 10, screen: screen });

export const title_page = (screen: any) => {
  var form = blessed.form({
    parent: screen,
    keys: true,
    left: 35,
    top: 30,
    width: 80,
    height: 15,
    // bg: "blue",
    content: `                             ${colors.bold.brightWhite(
      "Welcome to CLI-Opoly"
    )}`,
    border: {
      type: "bg",
      ch: "*",
    },
  });

  var monopoly_artwork = blessed.image({
    parent: screen,
    top: 0,
    left: 0,
    type: "overlay",
    width: "shrink",
    height: "shrink",
    file: __dirname + "/icon1.png",
    search: true,
  });

  var welcome_message = blessed.text({
    parent: form,
    mouse: true,
    keys: true,
    shrink: true,
    padding: {
      left: 1,
      right: 1,
    },
    left: 6,
    top: 2,
    name: "start_game",
    content: "Setup and start a game or enter you game code to join a session!",
    style: {
      fg: "white",
    },
  });

  var start_game = blessed.button({
    parent: form,
    mouse: true,
    keys: true,
    shrink: true,
    padding: {
      left: 1,
      right: 1,
    },
    left: 10,
    top: 11,
    name: "start_game",
    content: "Start Game",
    style: {
      bg: "blue",
      focus: {
        bg: "red",
      },
      hover: {
        bg: "red",
      },
    },
  });

  var join_game = blessed.button({
    parent: form,
    mouse: true,
    keys: true,
    shrink: true,
    padding: {
      left: 1,
      right: 1,
    },
    right: 10,
    top: 11,
    name: "join_game",
    content: "Join Game",
    style: {
      bg: "blue",
      focus: {
        bg: "red",
      },
      hover: {
        bg: "red",
      },
    },
  });

  start_game.on("press", function () {
    carousel.next();
  });

  join_game.on("press", function () {
    form.reset();
  });

  form.on("submit", function (data: any) {
    form.setContent("Submitted.");
    screen.render();
  });

  form.on("reset", function (data: any) {
    form.setContent("Canceled.");
    screen.render();
  });
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
  var board_view = grid_page_2.set(0, 6, 8, 4, contrib.table, {
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
    border: "none",
    columnSpacing: 3, //in chars
    columnWidth: [8, 19] /*in chars*/,
  });

  board_details.setData({
    headers: ["Player", "Position"],
    data: [
      ["Chris", "L1 - Lt Purp. - 1"],
      ["Calista", "L8 - Gold - 2"],
      ["Michael", "T3 - RED - 2"],
      ["Megan", "JAIL - JAIL"],
      ,
    ],
  });
};
