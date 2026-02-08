import kaplay from "kaplay";
import "kaplay/global";
import { createGreenTank, createGreyTank } from "./tanks.js";
import { createWalls } from "./walls.js";

kaplay();

loadRoot("./");

loadSprite("bg", "sprites/background.jpg");

add([sprite("bg"), pos(0, 0), fixed(), z(-1), tile(width(), height())]);

const walls = createWalls();

const { greyTank, greyTurret } = createGreyTank();
const { greenTank, greenTurret } = createGreenTank();

// Collision detection between car and bean
onUpdate(() => {
  // Handle counter-based speed for green tank
  const upCurrentlyPressed = isKeyDown("w");

  if (upCurrentlyPressed && !upPreviouslyPressed) {
    upCounter = 0;
  } else if (upCurrentlyPressed) {
    // Key is held down - increment counter and move
    upCounter++;
    const speedMultiplier = upCounter * 0.01; // Adjust multiplier for desired acceleration
    const angleRad = greenTank.angle * (Math.PI / 180);
    const moveX = Math.cos(angleRad) * SPEEDGREEN * speedMultiplier;
    const moveY = Math.sin(angleRad) * SPEEDGREEN * speedMultiplier;
    greenTank.move(moveX, moveY);
  }

  upPreviouslyPressed = upCurrentlyPressed;

  // Handle counter-based speed for green tank
  const wCurrentlyPressed = isKeyDown("8");

  if (wCurrentlyPressed && !wPreviouslyPressed) {
    // Key just pressed - reset counter
    wCounter = 0;
  } else if (wCurrentlyPressed) {
    // Key is held down - increment counter and move
    wCounter++;
    const speedMultiplier = wCounter * 0.01; // Adjust multiplier for desired acceleration
    const angleRad = greyTank.angle * (Math.PI / 180);
    const moveX = Math.cos(angleRad) * SPEEDGREEN * speedMultiplier;
    const moveY = Math.sin(angleRad) * SPEEDGREEN * speedMultiplier;
    greyTank.move(moveX, moveY);
  }

  wPreviouslyPressed = wCurrentlyPressed;

  if (greenTank.isColliding(greyTank)) {
    addKaboom(greenTank.pos.lerp(greyTank.pos, 0.5));
  }

  for (let wall of walls) {
    if (greenTank.isColliding(wall)) {
      addKaboom(greenTank.pos);
    }
    if (greyTank.isColliding(wall)) {
      addKaboom(greyTank.pos);
    }
  }
});

const SPEEDGREEN = 100;
const SPEEDGRAY = 100;

let upPreviouslyPressed = false;
let upCounter = 0;
let wPreviouslyPressed = false;
let wCounter = 0;

// greenTank controls
onKeyDown("a", () => {
  greenTank.angle -= 2; // Rotate clockwise
});
onKeyDown("d", () => {
  greenTank.angle += 2; // Rotate counter-clockwise
});

onKeyDown("s", () => {
  const angleRad = greenTank.angle * (Math.PI / 180);

  // Reverse the direction by subtracting
  const moveX = Math.cos(angleRad) * SPEEDGREEN;
  const moveY = Math.sin(angleRad) * SPEEDGREEN;

  greenTank.move(-moveX, -moveY);
});

// greyTank controls
onKeyDown("6", () => {
  greyTank.angle -= 2; // Rotate clockwise
});
onKeyDown("4", () => {
  greyTank.angle += 2; // Rotate counter-clockwise
});

onKeyDown("5", () => {
  const angleRad = greyTank.angle * (Math.PI / 180);

  // Reverse the direction by subtracting
  const moveX = Math.cos(angleRad) * SPEEDGRAY;
  const moveY = Math.sin(angleRad) * SPEEDGRAY;

  greyTank.move(-moveX, -moveY);
});

onKeyDown("7", () => {
  greyTurret.angle += 2;
});

onKeyDown("9", () => {
  greyTurret.angle -= 2;
});

onKeyDown("q", () => {
  greenTurret.angle += 2;
});

onKeyDown("e", () => {
  greenTurret.angle -= 2;
});
