import kaplay from "kaplay";
import "kaplay/global";
import { createGreenTank, createGreyTank, setupGreenTankControls, setupGreyTankControls } from "./tanks.js";
import { createWalls } from "./walls.js";

kaplay();

loadRoot("./");

// Main Background
loadSprite("bg", "sprites/background.jpg");
add([sprite("bg"), pos(0, 0), fixed(), z(-1), tile(width(), height())]);

// Walls 
const { walls, incrementGreenTankHits, incrementGreyTankHits } = createWalls();

// Tanks
const { greyTank, greyTurret } = createGreyTank();
const { greenTank, greenTurret } = createGreenTank();

setupGreyTankControls(greyTank, greyTurret, walls, incrementGreenTankHits);
setupGreenTankControls(greenTank, greenTurret, walls, incrementGreyTankHits);


// Collision detection
onUpdate(() => {
  if (greenTank.isColliding(greyTank)) {
    addKaboom(greenTank.pos.lerp(greyTank.pos, 0.5));
  }  
});
