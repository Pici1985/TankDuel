import "kaplay/global";

// Pause Scene
export function createPauseScene() {
  scene("pause", () => {
    // Background
    add([sprite("bg"), pos(0, 0), z(-1), tile(width(), height())]);
    
    // Help image centered
    add([sprite("help"), pos(width() / 2, height() / 2), anchor("center"), z(1)]);

    // Resume button (left side)
    const resumeButton = add([
      rect(200, 80),
      pos(width() / 2 - 110, height() / 2 + 280),
      anchor("center"),
      color(100, 200, 100),
      area(),
      z(1),
      "button",
    ]);

    add([
      text("RESUME", { size: 32 }),
      pos(width() / 2 - 110, height() / 2 + 280),
      anchor("center"),
      color(255, 255, 255),
      z(2),
    ]);

    resumeButton.onHoverUpdate(() => {
      resumeButton.color = rgb(120, 220, 120);
    });

    resumeButton.onHoverEnd(() => {
      resumeButton.color = rgb(100, 200, 100);
    });

    resumeButton.onClick(() => {
      go("game");
    });

    // Menu button (right side)
    const menuButton = add([
      rect(200, 80),
      pos(width() / 2 + 110, height() / 2 + 280),
      anchor("center"),
      color(100, 100, 200),
      area(),
      z(1),
      "button",
    ]);

    add([
      text("MENU", { size: 32 }),
      pos(width() / 2 + 110, height() / 2 + 280),
      anchor("center"),
      color(255, 255, 255),
      z(2),
    ]);

    menuButton.onHoverUpdate(() => {
      menuButton.color = rgb(120, 120, 220);
    });

    menuButton.onHoverEnd(() => {
      menuButton.color = rgb(100, 100, 200);
    });

    menuButton.onClick(() => {
      go("start");
    });

    // Keyboard shortcuts
    onKeyPress("escape", () => {
      go("game");
    });

    onKeyPress("p", () => {
      go("game");
    });
  });
}

// Start Screen Scene
export function createStartScene() {
  scene("start", () => {
    // Background
    add([sprite("bg"), pos(0, 0), z(-1), tile(width(), height())]);
    
    // Dark transparent overlay
    add([
      rect(600, 500),
      pos(width() / 2, height() / 2),
      anchor("center"),
      color(0, 0, 0),
      opacity(0.7),
      z(0),
    ]);
    
    // Title
    add([
      text("TANK BATTLE", { size: 64 }),
      pos(width() / 2, height() / 2 - 100),
      anchor("center"),
      color(255, 255, 0),
      z(1),
    ]);
    
    // Start button
    const startButton = add([
      rect(200, 80),
      pos(width() / 2, height() / 2 ),
      anchor("center"),
      color(100, 200, 100),
      area(),
      z(1),
      "button",
    ]);
    
    // Button text
    add([
      text("START", { size: 32 }),
      pos(width() / 2, height() / 2 ),
      anchor("center"),
      color(255, 255, 255),
      z(2),
    ]);
    
    // Button hover effect
    startButton.onHoverUpdate(() => {
      startButton.color = rgb(120, 220, 120);
    });
    
    startButton.onHoverEnd(() => {
      startButton.color = rgb(100, 200, 100);
    });
    
    // Button click
    startButton.onClick(() => {
      go("game");
    });
    
    // Also allow Enter key to start
    onKeyPress("enter", () => {
      go("game");
    });
    
    // Instructions
    add([
      text("Press ENTER or click START to begin", { size: 20 }),
      pos(width() / 2, height() / 2 + 90),
      anchor("center"),
      color(200, 200, 200),
      z(1),
    ]);

    // Help button
    const helpButton = add([
      rect(200, 80),
      pos(width() / 2, height() / 2 + 180),
      anchor("center"),
      color(100, 100, 200),
      area(),
      z(1),
      "button",
    ]);

    // Help button text
    add([
      text("CONTROLS", { size: 32 }),
      pos(width() / 2, height() / 2 + 180),
      anchor("center"),
      color(255, 255, 255),
      z(2),
    ]);

    // Help button hover effect
    helpButton.onHoverUpdate(() => {
      helpButton.color = rgb(120, 120, 220);
    });
    
    helpButton.onHoverEnd(() => {
      helpButton.color = rgb(100, 100, 200);
    });
    helpButton.onClick(() => {
      go("help");
    });
  });
}

// Help Scene
export function createHelpScene() {
  scene("help", () => {
    // Background
    add([sprite("bg"), pos(0, 0), z(-1), tile(width(), height())]);
    
    // Help image centered
    add([sprite("help"), pos(width() / 2, height() / 2), anchor("center"), z(1)]);

    // Back button
    const backButton = add([
      rect(200, 80),
      pos(width() / 2, height() / 2 + 280),
      anchor("center"),
      color(100, 100, 200),
      area(),
      z(1),
      "button",
    ]);

    // Back button text
    add([
      text("BACK", { size: 32 }),
      pos(width() / 2, height() / 2 + 280),
      anchor("center"),
      color(255, 255, 255),
      z(2),
    ]);

    // Back button hover effect
    backButton.onHoverUpdate(() => {
      backButton.color = rgb(120, 120, 220);
    });

    backButton.onHoverEnd(() => {
      backButton.color = rgb(100, 100, 200);
    });

    backButton.onClick(() => {
      go("start");
    });

    // Also allow Escape key to go back
    onKeyPress("escape", () => {
      go("start");
    });
  });
}

// Game Over Scene
export function createGameOverScene() {
  scene("gameover", (winner) => {
    // Background
    add([sprite("bg"), pos(0, 0), z(-1), tile(width(), height())]);

    // Dark transparent overlay
    add([
      rect(600, 400),
      pos(width() / 2, height() / 2),
      anchor("center"),
      color(0, 0, 0),
      opacity(0.8),
      z(0),
    ]);

    // Game Over title
    add([
      text("GAME OVER", { size: 64 }),
      pos(width() / 2, height() / 2 - 100),
      anchor("center"),
      color(255, 50, 50),
      z(1),
    ]);

    // Winner announcement
    const winnerColor = winner === "Green Tank" ? rgb(0, 255, 0) : rgb(200, 200, 200);
    
    add([
      text(`${winner} Wins!`, { size: 48 }),
      pos(width() / 2, height() / 2),
      anchor("center"),
      color(winnerColor),
      z(1),
    ]);

    // Play Again button (left side)
    const playAgainButton = add([
      rect(200, 80),
      pos(width() / 2 - 110, height() / 2 + 100),
      anchor("center"),
      color(100, 200, 100),
      area(),
      z(1),
      "button",
    ]);

    add([
      text("AGAIN", { size: 32 }),
      pos(width() / 2 - 110, height() / 2 + 100),
      anchor("center"),
      color(255, 255, 255),
      z(2),
    ]);

    playAgainButton.onHoverUpdate(() => {
      playAgainButton.color = rgb(120, 220, 120);
    });

    playAgainButton.onHoverEnd(() => {
      playAgainButton.color = rgb(100, 200, 100);
    });

    playAgainButton.onClick(() => {
      go("game");
    });

    // Main Menu button (right side)
    const menuButton = add([
      rect(200, 80),
      pos(width() / 2 + 110, height() / 2 + 100),
      anchor("center"),
      color(100, 100, 200),
      area(),
      z(1),
      "button",
    ]);

    add([
      text("MENU", { size: 32 }),
      pos(width() / 2 + 110, height() / 2 + 100),
      anchor("center"),
      color(255, 255, 255),
      z(2),
    ]);

    menuButton.onHoverUpdate(() => {
      menuButton.color = rgb(120, 120, 220);
    });

    menuButton.onHoverEnd(() => {
      menuButton.color = rgb(100, 100, 200);
    });

    menuButton.onClick(() => {
      go("start");
    });

    // Keyboard shortcuts
    onKeyPress("enter", () => {
      go("game");
    });

    onKeyPress("escape", () => {
      go("start");
    });
  });
}
