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
    rect(screenWidth, wallThickness * 2),
    pos(0, screenHeight - (wallThickness * 2)),
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

  // Hit counters
  let greenTankHits = 0;
  let greyTankHits = 0;

  // Counter displays on bottom wall
  const greenTankCounter = add([
    text("Green Tank Hits: 0", { size: 20 }),
    pos(50, screenHeight - (wallThickness * 2) + 10),
    color(0, 255, 0),
    z(10),
  ]);

  const greyTankCounter = add([
    text("Grey Tank Hits: 0", { size: 20 }),
    pos(screenWidth - 250, screenHeight - (wallThickness * 2) + 10),
    color(128, 128, 128),
    z(10),
  ]);

  // Functions to increment counters
  const incrementGreenTankHits = () => {
    greenTankHits++;
    greenTankCounter.text = `Green Tank Hits: ${greenTankHits}`;
  };

  const incrementGreyTankHits = () => {
    greyTankHits++;
    greyTankCounter.text = `Grey Tank Hits: ${greyTankHits}`;
  };

  return {
    walls: [topWall, bottomWall, leftWall, rightWall, centerWall],
    incrementGreenTankHits,
    incrementGreyTankHits
  };
};

export { wallThickness };

