import "kaplay/global";

kaplay();

const topWall = add([
  rect(screenWidth, wallThickness),
  pos(0, 0),
  area(),
  body({ isStatic: true }),
]);

const bottomWall = add([
  rect(screenWidth, wallThickness),
  pos(0, screenHeight - wallThickness),
  area(),
  body({ isStatic: true }),
]);

const leftWall = add([
  rect(wallThickness, screenHeight),
  pos(0, 0),
  area(),
  body({ isStatic: true }),
]);

const rightWall = add([
  rect(wallThickness, screenHeight),
  pos(screenWidth - wallThickness, 0),
  area(),
  body({ isStatic: true }),
]);

const walls = [topWall, bottomWall, leftWall, rightWall];

export default {
  wallThickness,
  screenWidth,
  screenHeight,
  topWall,
  bottomWall,
  leftWall,
  rightWall,
  walls,
};
