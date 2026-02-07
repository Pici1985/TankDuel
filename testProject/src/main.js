import kaplay from "kaplay";
import "kaplay/global";

kaplay();

loadRoot("./"); // A good idea for Itch.io publishing later

loadSprite("greenTank", "sprites/greenTank.png");
loadSprite("greyTank", "sprites/greyTank.png");
loadSprite("bg", "path/to/your/image.png");

// Create perimeter walls
const wallThickness = 20;
const screenWidth = width();
const screenHeight = height();

// Top wall
const topWall = add([
  rect(screenWidth, wallThickness),
  pos(0, 0),
  area(),
  body({ isStatic: true }),
]);

// Bottom wall
const bottomWall = add([
  rect(screenWidth, wallThickness),
  pos(0, screenHeight - wallThickness),
  area(),
  body({ isStatic: true }),
]);

// Left wall
const leftWall = add([
  rect(wallThickness, screenHeight),
  pos(0, 0),
  area(),
  body({ isStatic: true }),
]);

// Right wall
const rightWall = add([
  rect(wallThickness, screenHeight),
  pos(screenWidth - wallThickness, 0),
  area(),
  body({ isStatic: true }),
]);

const greyTank = add([
  pos(1400, 400),
  sprite("greyTank"),
  rotate(180),
  anchor("center"),
  area(),
  body(),
]);

const greenTank = add([
  pos(300, 400),
  sprite("greenTank"),
  rotate(0),
  anchor("center"),
  area(),
  body(),
]);

let draggedObject = null;

// Handle clicking on car
greyTank.onClick(() => {
  if (draggedObject === greyTank) {
    draggedObject = null; // Release
  } else {
    draggedObject = greyTank; // Pick up
  }
});

// Handle clicking on car
greenTank.onClick(() => {
  if (draggedObject === greenTank) {
    draggedObject = null; // Release
  } else {
    draggedObject = greenTank; // Pick up
  }
});

// Update dragged object position with mouse
onMouseMove(() => {
  if (draggedObject) {
    draggedObject.pos = mousePos();
  }
});

// Collision detection between car and bean
onUpdate(() => {
  // Handle counter-based speed for green tank
  const upCurrentlyPressed = isKeyDown("up");

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
  const wCurrentlyPressed = isKeyDown("w");

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

  // Check collisions with walls
  const walls = [topWall, bottomWall, leftWall, rightWall];
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
onKeyDown("left", () => {
  greenTank.angle -= 2; // Rotate clockwise
});
onKeyDown("right", () => {
  greenTank.angle += 2; // Rotate counter-clockwise
});

onKeyDown("down", () => {
  const angleRad = greenTank.angle * (Math.PI / 180);

  // Reverse the direction by subtracting
  const moveX = Math.cos(angleRad) * SPEEDGREEN;
  const moveY = Math.sin(angleRad) * SPEEDGREEN;

  greenTank.move(-moveX, -moveY);
});

// greyTank controls
onKeyDown("a", () => {
  greyTank.angle -= 2; // Rotate clockwise
});
onKeyDown("d", () => {
  greyTank.angle += 2; // Rotate counter-clockwise
});

onKeyDown("s", () => {
  const angleRad = greyTank.angle * (Math.PI / 180);

  // Reverse the direction by subtracting
  const moveX = Math.cos(angleRad) * SPEEDGRAY;
  const moveY = Math.sin(angleRad) * SPEEDGRAY;

  greyTank.move(-moveX, -moveY);
});
