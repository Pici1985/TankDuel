import kaplay from "kaplay";
import "kaplay/global";
import { createGreenTank, createGreyTank, setupGreenTankControls, setupGreyTankControls } from "./tanks.js";
import { createWalls } from "./walls.js";

kaplay();

loadRoot("./");

// Load background sprite
loadSprite("bg", "sprites/background.jpg");

// Start Screen Scene
scene("start", () => {
  // Background
  add([sprite("bg"), pos(0, 0), z(-1), tile(width(), height())]);
  
  // Dark transparent overlay
  add([
    rect(600, 500),
    pos(width() / 2, height() / 2),
    anchor("center"),
    color(0, 0, 0),
    opacity(0.7),
    z(0),
  ]);
  
  // Title
  add([
    text("TANK BATTLE", { size: 64 }),
    pos(width() / 2, height() / 2 - 100),
    anchor("center"),
    color(255, 255, 0),
    z(1),
  ]);
  
  // Start button
  const startButton = add([
    rect(200, 60),
    pos(width() / 2, height() / 2 + 50),
    anchor("center"),
    color(100, 200, 100),
    area(),
    z(1),
    "button",
  ]);
  
  // Button text
  add([
    text("START GAME", { size: 24 }),
    pos(width() / 2, height() / 2 + 50),
    anchor("center"),
    color(255, 255, 255),
    z(2),
  ]);
  
  // Button hover effect
  startButton.onHoverUpdate(() => {
    startButton.color = rgb(120, 220, 120);
  });
  
  startButton.onHoverEnd(() => {
    startButton.color = rgb(100, 200, 100);
  });
  
  // Button click
  startButton.onClick(() => {
    go("game");
  });
  
  // Also allow Enter key to start
  onKeyPress("enter", () => {
    go("game");
  });
  
  onKeyPress("h", () => {
    go("help");
  });


  // Instructions
  add([
    text("Press ENTER or click START to begin", { size: 20 }),
    pos(width() / 2, height() / 2 + 150),
    anchor("center"),
    color(200, 200, 200),
    z(1),
  ]);

  // Help button
  const helpButton = add([
    rect(100, 30),
    pos(width() / 2, height() / 2 + 230),
    anchor("center"),
    color(100, 100, 200),
    area(),
    z(1),
    "button",
  ]);

  // Help button text
  add([
    text("HELP (h)", { size: 18 }),
    pos(width() / 2, height() / 2 + 230),
    anchor("center"),
    color(255, 255, 255),
    z(2),
  ]);

  // Help button hover effect
  helpButton.onHoverUpdate(() => {
    helpButton.color = rgb(120, 120, 220);
  });
  
  helpButton.onHoverEnd(() => {
    helpButton.color = rgb(100, 100, 200);
  });
  helpButton.onClick(() => {
    go("help");
  });
});

// Help Scene
scene("help", () => {
  // Background
  add([sprite("bg"), pos(0, 0), z(-1), tile(width(), height())]);
  
  // Help text
  add([text("Help", { size: 24 }), pos(width() / 2, height() / 2), anchor("center"), color(255, 255, 255), z(1)]);
});

// Game Scene
scene("game", () => {
  // Background
  add([sprite("bg"), pos(0, 0), z(-1), tile(width(), height())]);
  
  // Walls 
  const { walls, incrementGreenTankScore, incrementGreyTankScore } = createWalls();
  
  // Tanks
  const { greyTank, greyTurret } = createGreyTank();
  const { greenTank, greenTurret } = createGreenTank();
  
  setupGreyTankControls(greyTank, greyTurret, walls, incrementGreyTankScore);
  setupGreenTankControls(greenTank, greenTurret, walls, incrementGreenTankScore);
  
  // Collision detection
  onUpdate(() => {
    if (greenTank.isColliding(greyTank)) {
      addKaboom(greenTank.pos.lerp(greyTank.pos, 0.5));
    }  
  });
});

// Start with the start screen
go("start");
