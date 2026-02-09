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
    "walls",
  ]);

  const bottomWall = add([
    rect(screenWidth, wallThickness),
    pos(0, screenHeight - wallThickness),
    area(),
    body({ isStatic: true }),
    "walls",
  ]);

  const leftWall = add([
    rect(wallThickness, screenHeight),
    pos(0, 0),
    area(),
    body({ isStatic: true }),
    "walls",
  ]);

  const rightWall = add([
    rect(wallThickness, screenHeight),
    pos(screenWidth - wallThickness, 0),
    area(),
    body({ isStatic: true }),
    "walls",
  ]);

  const centerWall = add([
    rect(wallThickness, screenHeight - 400),
    pos((screenWidth/2) - (wallThickness/2), 200 ),
    area(),
    body({ isStatic: true }),
    "walls",
  ]);

  return [topWall, bottomWall, leftWall, rightWall, centerWall];
};

export { wallThickness };

