// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
import PlatformGroupPrefab from "./PlatformGroupPrefab.js";
/* END-USER-IMPORTS */

export default class PlatformPrefab extends Phaser.Physics.Arcade.Image {
  constructor(scene, x, y, texture, frame) {
    super(scene, x ?? 0, y ?? 0, texture || "platform", frame);

    this.scaleX = 0.7;
    this.scaleY = 0.3;
    scene.physics.add.existing(this, false);
    this.body.allowGravity = false;
    this.body.checkCollision.left = false;
    this.body.checkCollision.right = false;
    this.body.pushable = false;
    this.body.setSize(144, 48, false);

    /* START-USER-CTR-CODE */

    // Write your code here.

    // Moving Platform settings
    this.enablePlatformMovement = false;
    this.horizontalVelocity = 160; //speed of moving platform
    this.minXPosition = 135;
    this.maxXPosition = 500;

    /* END-USER-CTR-CODE */
  }

  /* START-USER-CODE */

  // Write your code here.

  // Moving Platform Variables
  horizontalVelocity;
  minXPosition;
  maxXPosition;
  enablePlatformMovement;

  update() {
    // logic for moving platforms range
    if (!this.enablePlatformMovement) {
      return;
    }

    // Get speed from PlatformGroupPrefab if possible
    const platformGroup = this.scene.children
      .getChildren()
      .find(
        (child) =>
          child instanceof Phaser.GameObjects.Layer &&
          child.platformSpeed !== undefined
      );

    // Use the platform group speed or fallback to default
    const speed = platformGroup
      ? platformGroup.platformSpeed
      : this.horizontalVelocity;

    const velocity = this.body.velocity;
    if (this.x < this.minXPosition) {
      velocity.x = speed;
    } else if (this.x > this.maxXPosition) {
      velocity.x = -speed;
    }
  }

  startPlatformMovement() {
    // Get speed from PlatformGroupPrefab if possible
    const platformGroup = this.scene.children
      .getChildren()
      .find(
        (child) =>
          child instanceof Phaser.GameObjects.Layer &&
          child.platformSpeed !== undefined
      );

    // Use the platform group speed or fallback to default
    const speed = platformGroup
      ? platformGroup.platformSpeed
      : this.horizontalVelocity;

    // Set a random direction
    const direction = Phaser.Math.RND.pick([-1, 1]);

    // Apply velocity
    this.body.velocity.x = speed * direction;
    this.enablePlatformMovement = true;
  }

  stopPlatformMovement() {
    this.body.velocity.x = 0;
    this.enablePlatformMovement = false;
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
