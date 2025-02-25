// You can write more code here

/* START OF COMPILED CODE */

import Background1Prefab from "../prefabs/Background1Prefab.js";
import Background2Prefab from "../prefabs/Background2Prefab.js";
import Background3Prefab from "../prefabs/Background3Prefab.js";
import Background4Prefab from "../prefabs/Background4Prefab.js";
import WallPrefab from "../prefabs/WallPrefab.js";
import PlayerPrefab from "../prefabs/PlayerPrefab.js";
import PlatformGroupPrefab from "../prefabs/PlatformGroupPrefab.js";
import OnAwakeActionScript from "../scriptnodes/utils/OnAwakeActionScript.js";
import FadeEffectCameraActionScript from "../scriptnodes/camera/FadeEffectCameraActionScript.js";
import LaunchSceneActionScript from "../scriptnodes/scene/LaunchSceneActionScript.js";
import TimeEventActionScript from "../scriptnodes/timer/TimeEventActionScript.js";
import StartSceneActionScript from "../scriptnodes/scene/StartSceneActionScript.js";
import StopSceneActionScript from "../scriptnodes/scene/StopSceneActionScript.js";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Level extends Phaser.Scene {
  constructor() {
    super("Level");

    /* START-USER-CTR-CODE */
    // Write your code here.
    /* END-USER-CTR-CODE */
  }

  /** @returns {void} */
  editorCreate() {
    // leftKeyboard_key
    const leftKeyboard_key = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.LEFT
    );

    // rightKeyboard_key
    const rightKeyboard_key = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.RIGHT
    );

    // levelLayer
    const levelLayer = this.add.layer();
    levelLayer.blendMode = Phaser.BlendModes.SKIP_CHECK;

    // background1Prefab
    const background1Prefab = new Background1Prefab(this, 0, 0);
    levelLayer.add(background1Prefab);

    // background2Prefab
    const background2Prefab = new Background2Prefab(this, 0, 0);
    levelLayer.add(background2Prefab);

    // background3Prefab
    const background3Prefab = new Background3Prefab(this, 0, 0);
    levelLayer.add(background3Prefab);

    // background4Prefab
    const background4Prefab = new Background4Prefab(this, 0, 0);
    levelLayer.add(background4Prefab);

    // leftWallTileSprite
    const leftWallTileSprite = new WallPrefab(this, 0, 0);
    levelLayer.add(leftWallTileSprite);

    // rightWallTileSprite
    const rightWallTileSprite = new WallPrefab(this, 576, 0);
    rightWallTileSprite.flipX = true;
    rightWallTileSprite.flipY = false;
    levelLayer.add(rightWallTileSprite);

    // playerLayer
    const playerLayer = this.add.layer();
    playerLayer.blendMode = Phaser.BlendModes.SKIP_CHECK;

    // player
    const player = new PlayerPrefab(this, 320, -164);
    playerLayer.add(player);

    // platformGroupPrefab
    const platformGroupPrefab = new PlatformGroupPrefab(this);
    this.add.existing(platformGroupPrefab);

    // onAwakeActionScript
    const onAwakeActionScript = new OnAwakeActionScript(this);

    // fadeEffectCameraActionScript_1
    const fadeEffectCameraActionScript_1 = new FadeEffectCameraActionScript(
      onAwakeActionScript
    );

    // launchSceneActionScript
    const launchSceneActionScript = new LaunchSceneActionScript(
      fadeEffectCameraActionScript_1
    );

    // timeEventActionScriptForSceneTransition
    const timeEventActionScriptForSceneTransition = new TimeEventActionScript(
      this
    );

    // fadeEffectCameraActionScript
    const fadeEffectCameraActionScript = new FadeEffectCameraActionScript(
      timeEventActionScriptForSceneTransition
    );

    // startSceneActionScript
    const startSceneActionScript = new StartSceneActionScript(
      fadeEffectCameraActionScript
    );

    // stopSceneActionScript
    const stopSceneActionScript = new StopSceneActionScript(
      timeEventActionScriptForSceneTransition
    );

    // lists
    const movingLevelTileSprites = [
      rightWallTileSprite,
      leftWallTileSprite,
      background4Prefab,
    ];
    const walls = [rightWallTileSprite, leftWallTileSprite];

    // playerWithPlatformsCollider
    this.physics.add.collider(player, platformGroupPrefab.group);

    // playerWithWallsCollider
    this.physics.add.collider(player, walls);

    // rightWallTileSprite (prefab fields)
    rightWallTileSprite.tileOffsetY = -250;

    // fadeEffectCameraActionScript_1 (prefab fields)
    fadeEffectCameraActionScript_1.duration = 500;
    fadeEffectCameraActionScript_1.fadeEvent = "camerafadeincomplete";

    // launchSceneActionScript (prefab fields)
    launchSceneActionScript.sceneKey = "UI";

    // fadeEffectCameraActionScript (prefab fields)
    fadeEffectCameraActionScript.duration = 500;
    fadeEffectCameraActionScript.fadeEvent = "camerafadeoutcomplete";

    // startSceneActionScript (prefab fields)
    startSceneActionScript.sceneKey = "GameOver";

    // stopSceneActionScript (prefab fields)
    stopSceneActionScript.sceneKey = "UI";

    this.player = player;
    this.platformGroupPrefab = platformGroupPrefab;
    this.timeEventActionScriptForSceneTransition =
      timeEventActionScriptForSceneTransition;
    this.leftKeyboard_key = leftKeyboard_key;
    this.rightKeyboard_key = rightKeyboard_key;
    this.movingLevelTileSprites = movingLevelTileSprites;
    this.walls = walls;

    this.events.emit("scene-awake");
  }

  /** @type {PlayerPrefab} */
  player;
  /** @type {PlatformGroupPrefab} */
  platformGroupPrefab;
  /** @type {TimeEventActionScript} */
  timeEventActionScriptForSceneTransition;
  /** @type {Phaser.Input.Keyboard.Key} */
  leftKeyboard_key;
  /** @type {Phaser.Input.Keyboard.Key} */
  rightKeyboard_key;
  /** @type {Array<WallPrefab|Background4Prefab>} */
  movingLevelTileSprites;
  /** @type {WallPrefab[]} */
  walls;

  /* START-USER-CODE */
  firstJumpMade = false;
  isGameOver = false;
  currentScore = 0;
  maxHeight = 0;
  startingMaxHeight = 0;
  level = 0;

  // Difficulty settings with tighter jump parameters
  baseGravity = 350;
  baseJumpVelocity = -716;
  currentGravity = 350;
  currentJumpVelocity = -716;

  // Carefully balanced difficulty thresholds
  // Gradual increase from 200-1000, then steeper from 1000-2000
  // Jump multipliers create progressively tighter jumps (less excess height)
  difficultyThresholds = [
    { score: 200, gravityMultiplier: 1.1, jumpMultiplier: 0.995 }, // 90.0% of base height
    { score: 400, gravityMultiplier: 1.2, jumpMultiplier: 1.0247 }, // 87.5% of base height
    { score: 600, gravityMultiplier: 1.3, jumpMultiplier: 1.0512 }, // 85.0% of base height
    { score: 800, gravityMultiplier: 1.4, jumpMultiplier: 1.0747 }, // 82.5% of base height
    { score: 1000, gravityMultiplier: 1.5, jumpMultiplier: 1.0954 }, // 80.0% of base height
    { score: 1200, gravityMultiplier: 1.7, jumpMultiplier: 1.1515 }, // 78.0% of base height
    { score: 1400, gravityMultiplier: 1.95, jumpMultiplier: 1.2174 }, // 76.0% of base height
    { score: 1600, gravityMultiplier: 2.25, jumpMultiplier: 1.2903 }, // 74.0% of base height
    { score: 1800, gravityMultiplier: 2.6, jumpMultiplier: 1.3682 }, // 72.0% of base height
    { score: 2000, gravityMultiplier: 3.0, jumpMultiplier: 1.4491 }, // 70.0% of base height
  ];
  // Write more your code here

  create() {
    this.editorCreate();
    this.cameras.main.startFollow(this.player, false, 0.1, 1, 0.1); //Player Camera
    this.cameras.main.setDeadzone(this.scale.width); //Sets Camera Deadzone
    this.firstJumpMade = false;
    this.isGameOver = false;
    this.currentScore = 0;
    this.maxHeight = 0;
    this.startingMaxHeight = 0;
    this.level = 0;

    // Initialize physics values
    this.currentGravity = this.baseGravity;
    this.currentJumpVelocity = this.baseJumpVelocity;
    this.player.body.setGravityY(this.currentGravity);

    // Start BGM
    const audioManager = this.game.registry.get("audioManager");
    if (audioManager) {
      audioManager.playBGM("level");
    }

    // Optional: Add debug visualization for jump height
    if (this.physics.config.debug) {
      const graphics = this.add.graphics();
      const maxJumpHeight = Math.pow(500, 2) / (2 * 300); // Same calculation as in PlatformGroupPrefab
      this.events.on("update", () => {
        graphics.clear();
        graphics.lineStyle(1, 0x00ff00);
        graphics.strokeCircle(this.player.x, this.player.y - maxJumpHeight, 5);
      });
    }
  }

  update() {
    //Gives current Y position for player
    const distance = Math.floor(Math.abs(this.player.body.bottom));

    //Calls player game Object to check is its touching down on another object
    const isTouchingDown = this.player.body.touching.down;
    const isMovingDown = this.player.body.velocity.y > 0; //Checks if falling

    if (isTouchingDown) {
      //Play jump animation
      this.player.play("playerJump");

      // Play jump sound
      const audioManager = this.game.registry.get("audioManager");
      if (audioManager) {
        audioManager.playSFX("jump");
      }

      //Checks if jump animation completed then plays spin animation
      this.player.once(
        Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + "playerJump",
        () => {
          this.player.play("playerSpin");

          // Play spin sound
          const audioManager = this.game.registry.get("audioManager");
          if (audioManager) {
            audioManager.playSFX("spin");
          }
        }
      );
      this.player.setVelocityY(this.currentJumpVelocity);
      if (!this.firstJumpMade) {
        this.firstJumpMade = true;
        this.startingMaxHeight = distance; //Initial starting max height for score
      }
    } else if (isMovingDown && !isTouchingDown) {
      // Player fall logic when player is moving down and not touching a platform
      this.player.play("playerFall", true); //true parameter forces the animation to play
    }

    //Player Movement

    // Left
    if (
      this.leftKeyboard_key.isDown &&
      !isTouchingDown &&
      this.firstJumpMade &&
      !this.isGameOver
    ) {
      this.player.setVelocityX(-300);
      //Flips player to face left direction
      this.player.setFlipX(true);
    }
    // Right
    else if (
      this.rightKeyboard_key.isDown &&
      !isTouchingDown &&
      this.firstJumpMade &&
      !this.isGameOver
    ) {
      this.player.setVelocityX(+300);
      //Flips player to face right direction
      this.player.setFlipX(false);
    }
    // Neutral
    else {
      this.player.setVelocityX(0);
    }

    // Moving tilesprite logic
    this.movingLevelTileSprites.forEach((tileSprite) => {
      tileSprite.tilePositionY =
        this.player.y * 0.2 + (tileSprite.tileOffsetY || 0); //includes tileoffset property;
    });

    //Walls
    this.walls.forEach((tileSprite) => {
      if (!tileSprite.flipX) {
        tileSprite.body.setOffset(0, this.cameras.main.worldView.y);
      } else {
        tileSprite.body.setOffset(0, this.cameras.main.worldView.y);
      }
    });

    // Checks if GameOver is triggered
    if (this.isGameOver) {
      this.player.setVelocityY(15);
      return;
    }

    // Score Tracker & difficulty setter
    if (distance > this.maxHeight && this.firstJumpMade) {
      this.maxHeight = distance;
      const newScore = Math.floor(
        (this.maxHeight - this.startingMaxHeight) / 10
      );

      // Check if we've reached a new difficulty threshold
      if (newScore > this.currentScore) {
        const previousLevel = this.level;

        // Check all thresholds to see if we've crossed any
        this.difficultyThresholds.forEach((threshold, index) => {
          if (
            newScore >= threshold.score &&
            this.currentScore < threshold.score
          ) {
            this.level = index + 1;

            // Apply new physics settings
            this.currentGravity =
              this.baseGravity * threshold.gravityMultiplier;
            this.currentJumpVelocity =
              this.baseJumpVelocity * threshold.jumpMultiplier;
            this.player.body.setGravityY(this.currentGravity);

            // Visual feedback for difficulty increase
            // this.cameras.main.flash(500, 255, 255, 255, 0.3);

            // Play sound effect if available (Todo find a nice sound)
            // const audioManager = this.game.registry.get("audioManager");
            // if (audioManager) {
            //   audioManager.playSFX("jump"); // Use an appropriate sound for level up
            // }

            console.log(`Difficulty increased to level ${this.level}: 
          Gravity: ${this.currentGravity.toFixed(0)}, 
          Jump: ${this.currentJumpVelocity.toFixed(0)}`);
          }
        });

        // Turn on moving platforms at level 1 (200 points)
        if (previousLevel === 0 && this.level >= 1) {
          this.platformGroupPrefab.enableMovingPlatforms = true;
        }

        // Adjust platform spacing if we cross specific thresholds
        if (this.level >= 3) {
          // 600+ points
          // Tell PlatformGroupPrefab to use tighter spacing for higher difficulty
          this.platformGroupPrefab.adjustSpacingForDifficulty(this.level);
        }
      }

      // Update the score
      this.currentScore = newScore;
      this.scene.get("UI").updateScoreText(this.currentScore);
    }

    //Condition for Game Over
    if (
      this.player.y >
      this.platformGroupPrefab.bottomMostPlatformYPosition + 50
    ) {
      this.isGameOver = true;

      // Play fall sound
      const audioManager = this.game.registry.get("audioManager");
      if (audioManager) {
        audioManager.playSFX("fall");
        audioManager.stopBGM();
      }

      this.player.setVelocityY(15);

      // Special effects to play on player falling death
      const wipeFx = this.player.postFX.addWipe(0.1, 0, 1);
      this.tweens.add({
        targets: wipeFx,
        progress: 1,
        duration: 3000,
        onComplete: () => {
          this.player.body.enable = false;
          this.registry.set("score", this.currentScore); //store score value
          console.log("GameOver💔");

          // Referencing Scripts
          this.timeEventActionScriptForSceneTransition.execute();
        },
      });
    }

    // update for nw platform positions from PlatformGroupPrefab
    this.platformGroupPrefab.update();
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
