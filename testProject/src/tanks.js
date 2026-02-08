import "kaplay/global";

export const createGreyTank = () => {
  loadSprite("greyTank", "sprites/greyTank.png");
  loadSprite("turret", "sprites/turret.png");

  let greyTank = add([
    pos(1400, 400),
    sprite("greyTank"),
    rotate(180),
    anchor("center"),
    area(),
    body(),
  ]);

  let turret = greyTank.add([
    sprite("turret"),
    pos(20, 0),
    rotate(180),
    anchor("center"),
  ]);

  return { greyTank, turret };
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
