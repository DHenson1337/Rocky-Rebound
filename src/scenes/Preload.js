// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
import AudioManager from "../utils/AudioManager.js";
/* END-USER-IMPORTS */

export default class Preload extends Phaser.Scene {
  constructor() {
    super("Preload");

    /* START-USER-CTR-CODE */
    // Write your code here.
    /* END-USER-CTR-CODE */
  }

  /** @returns {void} */
  editorPreload() {
    this.load.pack("asset-pack", "assets/asset-pack.json");
  }

  /** @returns {void} */
  editorCreate() {
    // progressBar
    const progressBar = this.add.rectangle(177, 277, 256, 20);
    progressBar.setOrigin(0, 0);
    progressBar.isFilled = true;
    progressBar.fillColor = 14737632;

    // progressBarBg
    const progressBarBg = this.add.rectangle(177, 277, 256, 20);
    progressBarBg.setOrigin(0, 0);
    progressBarBg.fillColor = 14737632;
    progressBarBg.isStroked = true;

    // loadingText
    const loadingText = this.add.text(206, 187, "", {});
    loadingText.text = "Loading...";
    loadingText.setStyle({
      color: "#e0e0e0",
      fontFamily: "arial",
      fontSize: "20px",
    });

    this.progressBar = progressBar;

    this.events.emit("scene-awake");
  }

  /** @type {Phaser.GameObjects.Rectangle} */
  progressBar;

  /* START-USER-CODE */

  // Write your code here

  preload() {
    this.editorCreate();
    this.editorPreload();

    // Initialize AudioManager
    this.game.registry.set("audioManager", new AudioManager(this));
    const audioManager = this.game.registry.get("audioManager");
    audioManager.init();

    const width = this.progressBar.width;
    this.load.on("progress", (progress) => {
      this.progressBar.width = progress * width;
    });
  }

  create() {
    this.scene.start("Title");
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
