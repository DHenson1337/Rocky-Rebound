// You can write more code here

/* START OF COMPILED CODE */

import PlatformPrefab from "../prefabs/PlatformPrefab.js";
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

		// platformPrefab
		const platformPrefab = new PlatformPrefab(this, 300, 374);
		this.add.existing(platformPrefab);

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

  // Write more your code here

  create() {
    this.editorCreate();
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
