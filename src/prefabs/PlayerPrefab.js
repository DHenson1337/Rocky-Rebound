
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class PlayerPrefab extends Phaser.Physics.Arcade.Sprite {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "player", frame ?? 0);

		this.scaleX = 2.2;
		this.scaleY = 2.2;
		scene.physics.add.existing(this, false);
		this.body.checkCollision.up = false;
		this.body.setOffset(18, 6);
		this.body.setSize(12, 30, false);
		this.play("playerIdle");

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
