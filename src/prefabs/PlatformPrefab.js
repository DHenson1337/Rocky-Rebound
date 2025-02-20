// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class PlatformPrefab extends Phaser.Physics.Arcade.Image {
  constructor(scene, x, y, texture, frame) {
    super(scene, x ?? 0, y ?? 0, texture || "platform", frame);

    this.scaleY = 0.3;
    scene.physics.add.existing(this, false);
    this.body.allowGravity = false;
    this.body.checkCollision.left = false;
    this.body.checkCollision.right = false;
    this.body.pushable = false;
    this.body.setSize(144, 48, false);

    /* START-USER-CTR-CODE */
    // Write your code here.
    /* END-USER-CTR-CODE */
  }

  /* START-USER-CODE */

  // Write your code here.

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
