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
    color(150, 100, 50),  // Brown color for brick
    outline(2, rgb(100, 50, 0)),  // Dark outline
    "walls",
  ]);

  const bottomWall = add([
    rect(screenWidth, wallThickness),
    pos(0, screenHeight - wallThickness),
    area(),
    body({ isStatic: true }),
    color(150, 100, 50),  // Brown color for brick
    outline(2, rgb(100, 50, 0)),  // Dark outline
    "walls",
  ]);

  const leftWall = add([
    rect(wallThickness, screenHeight),
    pos(0, 0),
    area(),
    body({ isStatic: true }),
    color(150, 100, 50),  // Brown color for brick
    outline(2, rgb(100, 50, 0)),  // Dark outline
    "walls",
  ]);

  const rightWall = add([
    rect(wallThickness, screenHeight),
    pos(screenWidth - wallThickness, 0),
    area(),
    body({ isStatic: true }),
    color(150, 100, 50),  // Brown color for brick
    outline(2, rgb(100, 50, 0)),  // Dark outline
    "walls",
  ]);

  const centerWall = add([
    rect(wallThickness, screenHeight - 400),
    pos((screenWidth/2) - (wallThickness/2), 200 ),
    area(),
    body({ isStatic: true }),
    color(150, 100, 50),  // Brown color for brick
    outline(2, rgb(100, 50, 0)),  // Dark outline
    "walls",
  ]);

  return [topWall, bottomWall, leftWall, rightWall, centerWall];
};

export { wallThickness };

