// // Libs
// const blessed = require("blessed");
// const colors = require("colors/safe");
// const contrib = require("blessed-contrib");

// import fs from "fs";
// import path from "path";

// // Types
// import { Board } from "./game_state";

// // Functions
// import { whoGoesFirst, whosTurnIsIt, movePlayer } from "./game_state"; // movePlayer

// // Init CLUI
// export var screen = blessed.screen();
// screen.title = "CLI-Opoly - A CLI Take on the Classic Game!";

// // Pages Import + Init (Blessed Carousel Screens)
// import { title_page, game_view_page } from "./pages";
// const page1 = () => title_page(screen);
// // const page2 = () => game_view_page(screen, Players);

// export var carousel = new contrib.carousel([page1], {
//   //, page2
//   screen: screen,
//   controlKeys: true,
// });

// screen.key(["escape", "q", "C-c"], function () {
//   //ch: any, key: any
//   return process.exit(0);
//   // carousel.next(); --> goto next page
// });

// screen.key(["tab"], function () {
//   // console.log(screen.focused);
//   screen.focusNext();
//   screen.render();
// });

// screen.render();
// let GAME_BOARD = Board();
