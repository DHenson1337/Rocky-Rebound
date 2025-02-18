// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class WallPrefab extends Phaser.GameObjects.TileSprite {
  constructor(scene, x, y, width, height, texture, frame) {
    super(
      scene,
      x ?? 0,
      y ?? 0,
      width ?? 64,
      height ?? 480,
      texture || "wall",
      frame
    );

    this.setOrigin(0, 0);

    /* START-USER-CTR-CODE */
    // Write your code here.

    //Enable Wall Scrolling across level
    this.setScrollFactor(0);

    /** @type {Phaser.scene} */
    const _scene = scene; //references this scene
    // physics for walls
    _scene.physics.world.enable(this);
    this.body
      .setImmovable(true)
      .setAllowGravity(false)
      .setSize(this.width, this.height)
      .setOffset(0, 0);

    /* END-USER-CTR-CODE */
  }

  /** @type {number} */
  tileOffsetY = 0;

  /* START-USER-CODE */

  // Write your code here.

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
