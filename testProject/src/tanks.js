import "kaplay/global";

export const createGreyTank = () => {
  loadSprite("greyTank", "sprites/greyTank.png");

  let greyTank = add([
    pos(1400, 400),
    sprite("greyTank"),
    rotate(180),
    anchor("center"),
    area(),
    body(),
  ]);

  return greyTank;
};

export const createGreenTank = () => {
  loadSprite("greenTank", "sprites/greenTank.png");

  let greenTank = add([
    pos(300, 400),
    sprite("greenTank"),
    rotate(0),
    anchor("center"),
    area(),
    body(),
  ]);

  return greenTank;
};
