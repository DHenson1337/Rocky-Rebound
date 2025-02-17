// You can write more code here

/* START OF COMPILED CODE */

import PlatformGroupPrefab from "../prefabs/PlatformGroupPrefab.js";
import PlayerPrefab from "../prefabs/PlayerPrefab.js";
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

    // platformGroupPrefab
    const platformGroupPrefab = new PlatformGroupPrefab(this);
    this.add.existing(platformGroupPrefab);

    // player
    const player = new PlayerPrefab(this, 280, 273);
    this.add.existing(player);

    // playerWithPlatformsCollider
    this.physics.add.collider(player, platformGroupPrefab.group);

    this.player = player;
    this.leftKeyboard_key = leftKeyboard_key;
    this.rightKeyboard_key = rightKeyboard_key;

    this.events.emit("scene-awake");
  }

  /** @type {PlayerPrefab} */
  player;
  /** @type {Phaser.Input.Keyboard.Key} */
  leftKeyboard_key;
  /** @type {Phaser.Input.Keyboard.Key} */
  rightKeyboard_key;

  /* START-USER-CODE */
  firstJumpMade = false;

  // Write more your code here

  create() {
    this.editorCreate();
    this.cameras.main.startFollow(this.player, false, 0.1, 1, 0.1); //Player Camera
    this.firstJumpMade = false;
  }

  update() {
    //Calls player game Object to check is its touching down on another object
    const isTouchingDown = this.player.body.touching.down;
    if (isTouchingDown) {
      this.player.setVelocityY(-500);
      if (!this.firstJumpMade) {
        this.firstJumpMade = true;
      }
    }
    //Player Movement

    // Left
    if (this.leftKeyboard_key.isDown && !isTouchingDown && this.firstJumpMade) {
      this.player.setVelocityX(-300);
    }
    // Right
    else if (
      this.rightKeyboard_key.isDown &&
      !isTouchingDown &&
      this.firstJumpMade
    ) {
      this.player.setVelocityX(+300);
    }
    // Neutral
    else {
      this.player.setVelocityX(0);
    }
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
