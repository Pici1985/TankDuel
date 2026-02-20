import kaplay from "kaplay";
import "kaplay/global";
import { createGreenTank, createGreyTank, setupGreenTankControls, setupGreyTankControls } from "./tanks.js";
import { createWalls } from "./walls.js";
import { createStartScene, createHelpScene, createGameOverScene } from "./scenes.js";

kaplay();

loadRoot("./");

// Load background sprite
loadSprite("bg", "sprites/background.jpg");

// Register scenes
createStartScene();
createHelpScene();
createGameOverScene();

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
