// You can write more code here

/* START OF COMPILED CODE */

import WallPrefab from "../prefabs/WallPrefab.js";
import PlayerPrefab from "../prefabs/PlayerPrefab.js";
import PlatformGroupPrefab from "../prefabs/PlatformGroupPrefab.js";
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
    const player = new PlayerPrefab(this, 320, 273);
    playerLayer.add(player);

    // platformGroupPrefab
    const platformGroupPrefab = new PlatformGroupPrefab(this);
    this.add.existing(platformGroupPrefab);

    // lists
    const movingLevelTileSprites = [rightWallTileSprite, leftWallTileSprite];
    const walls = [rightWallTileSprite, leftWallTileSprite];

    // playerWithPlatformsCollider
    this.physics.add.collider(player, platformGroupPrefab.group);

    // playerWithWallsCollider
    this.physics.add.collider(player, walls);

    // rightWallTileSprite (prefab fields)
    rightWallTileSprite.tileOffsetY = -250;

    this.player = player;
    this.platformGroupPrefab = platformGroupPrefab;
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
  /** @type {Phaser.Input.Keyboard.Key} */
  leftKeyboard_key;
  /** @type {Phaser.Input.Keyboard.Key} */
  rightKeyboard_key;
  /** @type {WallPrefab[]} */
  movingLevelTileSprites;
  /** @type {WallPrefab[]} */
  walls;

  /* START-USER-CODE */
  firstJumpMade = false;

  // Write more your code here

  create() {
    this.editorCreate();
    this.cameras.main.startFollow(this.player, false, 0.1, 1, 0.1); //Player Camera
    this.cameras.main.setDeadzone(this.scale.width); //Sets Camera Deadzone
    this.firstJumpMade = false;
  }

  update() {
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
      }
    } else if (isMovingDown && !isTouchingDown) {
      // Player fall logic when player is moving down and not touching a platform
      this.player.play("playerFall", true); //true parameter forces the animation to play
    }

    //Player Movement

    // Left
    if (this.leftKeyboard_key.isDown && !isTouchingDown && this.firstJumpMade) {
      this.player.setVelocityX(-300);
      //Flips player to face left direction
      this.player.setFlipX(true);
    }
    // Right
    else if (
      this.rightKeyboard_key.isDown &&
      !isTouchingDown &&
      this.firstJumpMade
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
      tileSprite.tilePositionY = this.player.y * 0.2 + tileSprite.tileOffsetY; //includes tileoffset property;
    });

    //Walls
    this.walls.forEach((tileSprite) => {
      if (!tileSprite.flipX) {
        tileSprite.body.setOffset(0, this.cameras.main.worldView.y);
      } else {
        tileSprite.body.setOffset(0, this.cameras.main.worldView.y);
      }
    });

    // update for nw platform positions from PlatformGroupPrefab
    this.platformGroupPrefab.update();
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
