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
		const leftKeyboard_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);

		// rightKeyboard_key
		const rightKeyboard_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

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
		const fadeEffectCameraActionScript_1 = new FadeEffectCameraActionScript(onAwakeActionScript);

		// launchSceneActionScript
		const launchSceneActionScript = new LaunchSceneActionScript(fadeEffectCameraActionScript_1);

		// timeEventActionScriptForSceneTransition
		const timeEventActionScriptForSceneTransition = new TimeEventActionScript(this);

		// fadeEffectCameraActionScript
		const fadeEffectCameraActionScript = new FadeEffectCameraActionScript(timeEventActionScriptForSceneTransition);

		// startSceneActionScript
		const startSceneActionScript = new StartSceneActionScript(fadeEffectCameraActionScript);

		// stopSceneActionScript
		const stopSceneActionScript = new StopSceneActionScript(timeEventActionScriptForSceneTransition);

		// lists
		const movingLevelTileSprites = [rightWallTileSprite, leftWallTileSprite, background4Prefab];
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
		this.timeEventActionScriptForSceneTransition = timeEventActionScriptForSceneTransition;
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

      //Checks if jump animation completed then plays spin animation
      this.player.once(
        Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + "playerJump",
        () => {
          this.player.play("playerSpin");
        }
      );
      this.player.setVelocityY(-500);
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
      this.currentScore = Math.floor(
        (this.maxHeight - this.startingMaxHeight) / 10
      );
      this.scene.get("UI").updateScoreText(this.currentScore);

      // Turn on moving platforms
      if (this.level === 0 && this.currentScore > 200) {
        this.platformGroupPrefab.enableMovingPlatforms = true;
      }
    }

    //Condition for Game Over
    if (
      this.player.y >
      this.platformGroupPrefab.bottomMostPlatformYPosition + 50
    ) {
      this.isGameOver = true;

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
