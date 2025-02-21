// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class GameOver extends Phaser.Scene {
  constructor() {
    super("GameOver");

    /* START-USER-CTR-CODE */
    // Write your code here.
    /* END-USER-CTR-CODE */
  }

  /** @returns {void} */
  editorCreate() {
    // gameOverTextGameObject
    const gameOverTextGameObject = this.add.text(90, 99, "", {});
    gameOverTextGameObject.scaleX = 2.5;
    gameOverTextGameObject.scaleY = 2.5;
    gameOverTextGameObject.text = "Game Over";
    gameOverTextGameObject.setStyle({
      fontFamily: "PressStart2P-Regular",
      fontSize: "20px",
    });

    // scoreTextGameObject_1
    const scoreTextGameObject_1 = this.add.text(305, 282, "", {});
    scoreTextGameObject_1.scaleX = 2.5;
    scoreTextGameObject_1.scaleY = 2.5;
    scoreTextGameObject_1.setOrigin(0.5, 0.5);
    scoreTextGameObject_1.text = "Score";
    scoreTextGameObject_1.setStyle({
      fontFamily: "PressStart2P-Regular",
      fontSize: "10px",
    });

    // scoreValueTextGameObject
    const scoreValueTextGameObject = this.add.text(304, 374, "", {});
    scoreValueTextGameObject.scaleX = 2.5;
    scoreValueTextGameObject.scaleY = 2.5;
    scoreValueTextGameObject.setOrigin(0.5, 0.5);
    scoreValueTextGameObject.text = "0\n";
    scoreValueTextGameObject.setStyle({
      fontFamily: "PressStart2P-Regular",
      fontSize: "10px",
    });

    this.scoreValueTextGameObject = scoreValueTextGameObject;

    this.events.emit("scene-awake");
  }

  /** @type {Phaser.GameObjects.Text} */
  scoreValueTextGameObject;

  /* START-USER-CODE */

  // Write your code here

  create() {
    this.editorCreate();

    //Get the score to display on Game Over Scene
    const score = this.registry.get("score");
    this.scoreValueTextGameObject.setText(score);
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
