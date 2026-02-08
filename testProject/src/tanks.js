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

  let greyTurret = greyTank.add([
    sprite("turret"),
    pos(0, 0),
    rotate(180),    
    anchor(vec2(0.4, 0)),
  ]);

  return { greyTank, greyTurret };
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

  let greenTurret = greenTank.add([
    sprite("turret"),
    pos(0, 0),
    rotate(180),    
    anchor(vec2(0.4, 0)),
  ]);

  return { greenTank, greenTurret };
};
