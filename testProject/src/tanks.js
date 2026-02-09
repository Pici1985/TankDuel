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
    "greyTank",
  ]);

  let greyTurret = greyTank.add([
    sprite("turret"),
    pos(0, 0),
    rotate(180),    
    anchor(vec2(0.4, 0)),
  ]);

  return { greyTank, greyTurret };
};

export const setupGreyTankControls = (greyTank, greyTurret) => {
  const SPEEDGRAY = 100;
  let wPreviouslyPressed = false;
  let wCounter = 0;

  // Add cooldown tracking
  let lastFireTime = 0;
  const fireRate = 333; 

  // Forward movement with acceleration
  onUpdate(() => {
    const wCurrentlyPressed = isKeyDown("8");

    if (wCurrentlyPressed && !wPreviouslyPressed) {
      wCounter = 0;
    } else if (wCurrentlyPressed) {
      wCounter++;
      const speedMultiplier = wCounter * 0.01;
      const angleRad = greyTank.angle * (Math.PI / 180);
      const moveX = Math.cos(angleRad) * SPEEDGRAY * speedMultiplier;
      const moveY = Math.sin(angleRad) * SPEEDGRAY * speedMultiplier;
      greyTank.move(moveX, moveY);
    }
    
    wPreviouslyPressed = wCurrentlyPressed;
  });

  // Rotation controls
  onKeyDown("4", () => {
    greyTank.angle -= 2;
  });

  onKeyDown("6", () => {
    greyTank.angle += 2;
  });

  // Reverse
  onKeyDown("5", () => {
    const angleRad = greyTank.angle * (Math.PI / 180);
    const moveX = Math.cos(angleRad) * SPEEDGRAY;
    const moveY = Math.sin(angleRad) * SPEEDGRAY;
    greyTank.move(-moveX, -moveY);
  });

  // Turret controls
  onKeyDown("9", () => {
    greyTurret.angle += 2;
  });
  
  onKeyDown("7", () => {
    greyTurret.angle -= 2;
  });
  
  onKeyDown("home", () => {    
    const currentTime = time() * 1000; // Convert to milliseconds
    if (currentTime - lastFireTime < fireRate) {
      return; // Exit if still in cooldown
    }
    lastFireTime = currentTime; // Update last fire time
    
    // Get turret's world position
    const turretWorldPos = greyTurret.worldPos();
    
    // Calculate offset from turret (adjust the distance as needed)
    const offsetDistance = 105; // How far from turret center
    const combinedAngle = greyTurret.angle + greyTank.angle + 180;
    const angleRad = combinedAngle * (Math.PI / 180);
    
    // Calculate spawn position offset to the side
    const spawnOffset = vec2(
      Math.cos(angleRad) * offsetDistance,
      Math.sin(angleRad) * offsetDistance
    );
    
    // Create the bullet in the world (not as child)
    const bullet = add([
      rect(10, 5),        
      pos(turretWorldPos.add(spawnOffset)), // Add offset to turret position
      color(0, 0, 0),     
      body(),
      anchor("center"),
      rotate(combinedAngle),
      area(),
    ]);
    
    // Set the bullet's velocity based on turret direction
    const bulletSpeed = 500;
    bullet.vel = Vec2.fromAngle(combinedAngle).scale(bulletSpeed); 
    
    bullet.onCollide("greenTank", (target) => {
      destroy(bullet);  // Destroy the bullet
      addKaboom(bullet.pos);  // Add explosion effect      
    });
    
     // Collision with walls
    bullet.onCollide("walls", () => {
      addKaboom(bullet.pos, { scale: 0.4 });  // Play kaboom effect
      destroy(bullet);        // Destroy the bullet
    });
    
    wait(2, () => {
      destroy(bullet);
    });
  });  
};

export const createGreenTank = () => {
  loadSprite("greenTank", "sprites/greenTank.png");
  loadSprite("turret", "sprites/turret.png");
  
  let greenTank = add([
    pos(300, 400),
    sprite("greenTank"),
    rotate(0),
    anchor("center"),
    area(),
    body(),
    "greenTank",
  ]);

  let greenTurret = greenTank.add([
    sprite("turret"),
    pos(0, 0),
    rotate(180),    
    anchor(vec2(0.4, 0)),
  ]);
  
  return { greenTank, greenTurret };
};

export const setupGreenTankControls = (greenTank, greenTurret) => {
  const SPEEDGREEN = 100;
  let upPreviouslyPressed = false;
  let upCounter = 0;

  // Add cooldown tracking
  let lastFireTime = 0;
  const fireRate = 333; 
  
  // Forward movement with acceleration
  onUpdate(() => {
    const upCurrentlyPressed = isKeyDown("w");

    if (upCurrentlyPressed && !upPreviouslyPressed) {
      upCounter = 0;
    } else if (upCurrentlyPressed) {
      upCounter++;
      const speedMultiplier = upCounter * 0.01;
      const angleRad = greenTank.angle * (Math.PI / 180);
      const moveX = Math.cos(angleRad) * SPEEDGREEN * speedMultiplier;
      const moveY = Math.sin(angleRad) * SPEEDGREEN * speedMultiplier;
      greenTank.move(moveX, moveY);
    }

    upPreviouslyPressed = upCurrentlyPressed;
  });

  // Rotation controls
  onKeyDown("a", () => {
    greenTank.angle -= 2;
  });

  onKeyDown("d", () => {
    greenTank.angle += 2;
  });

  // Reverse
  onKeyDown("s", () => {
    const angleRad = greenTank.angle * (Math.PI / 180);
    const moveX = Math.cos(angleRad) * SPEEDGREEN;
    const moveY = Math.sin(angleRad) * SPEEDGREEN;
    greenTank.move(-moveX, -moveY);
  });

  // Turret controls
  onKeyDown("e", () => {
    greenTurret.angle += 2;
  });

  onKeyDown("q", () => {
    greenTurret.angle -= 2;
  });
  
  onKeyDown("space", () => {    
    const currentTime = time() * 1000; // Convert to milliseconds
    if (currentTime - lastFireTime < fireRate) {
      return; // Exit if still in cooldown
    }
    lastFireTime = currentTime; // Update last fire time
    
    // Get turret's world position
    const turretWorldPos = greenTurret.worldPos();
    
    // Calculate offset from turret (adjust the distance as needed)
    const offsetDistance = 105; // How far from turret center
    const combinedAngle = greenTurret.angle + greenTank.angle + 180;
    const angleRad = combinedAngle * (Math.PI / 180);
    
    // Calculate spawn position offset to the side
    const spawnOffset = vec2(
      Math.cos(angleRad) * offsetDistance,
      Math.sin(angleRad) * offsetDistance
    );
    
    // Create the bullet in the world (not as child)
    const bullet = add([
      rect(10, 5),        
      pos(turretWorldPos.add(spawnOffset)), // Add offset to turret position
      color(0, 0, 0),     
      body(),
      anchor("center"),
      rotate(combinedAngle), // Set initial rotation
      area(),
    ]);
    
    // Set the bullet's velocity based on turret direction
    const bulletSpeed = 500;
    bullet.vel = Vec2.fromAngle(combinedAngle).scale(bulletSpeed); 
    
    bullet.onCollide("greyTank", (target) => {
      destroy(bullet);  // Destroy the bullet
      addKaboom(bullet.pos);  // Add explosion effect      
    });

    // Collision with walls
    bullet.onCollide("walls", () => {
      addKaboom(bullet.pos, { scale: 0.4 });  // Play kaboom effect
      destroy(bullet);        // Destroy the bullet
    });

    wait(2, () => {
      destroy(bullet);
    });
  });  
};

