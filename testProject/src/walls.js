import "kaplay/global";

const wallThickness = 20;

export const createWalls = () => {
  const screenWidth = width();
  const screenHeight = height();

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

  return [topWall, bottomWall, leftWall, rightWall];
};

export { wallThickness };
