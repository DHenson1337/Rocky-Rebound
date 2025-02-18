// You can write more code here

import PlatformPrefab from "./PlatformPrefab.js";

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */

/* END-USER-IMPORTS */

export default class PlatformGroupPrefab extends Phaser.GameObjects.Layer {
  constructor(scene) {
    super(scene);

    this.blendMode = Phaser.BlendModes.SKIP_CHECK;

    /* START-USER-CTR-CODE */
    // Write your code here.

    //Game Object PlatformPrefab
    this.group = scene.add.group({
      classType: PlatformPrefab,
    });

    //Platform base settings
    const BASE_Y = 450;
    const PLATFORM_GAP = 350;
    const PLATFORM_COUNT = 5;

    //Create base platform
    this.group.get(320, BASE_Y);

    //Loop for amount of platforms to be randomy generated and location
    for (let i = 1; i < PLATFORM_COUNT; i += 1) {
      const x = Phaser.Math.Between(125, 550); //x value for random spawned platforms
      const y = BASE_Y - PLATFORM_GAP * i; //Subtract gap for each platform
      this.group.get(x, y);
    }
    /* END-USER-CTR-CODE */
  }

  /* START-USER-CODE */
  /** @type {Phaser.GameObjects.Group} */
  group;

  // Write your code here.

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
