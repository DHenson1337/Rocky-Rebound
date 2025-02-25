// You can write more code here

/* START OF COMPILED CODE */

import Background1Prefab from "../prefabs/Background1Prefab.js";
import Background2Prefab from "../prefabs/Background2Prefab.js";
import Background3Prefab from "../prefabs/Background3Prefab.js";
import Background4Prefab from "../prefabs/Background4Prefab.js";
import WallPrefab from "../prefabs/WallPrefab.js";
import PlayerPrefab from "../prefabs/PlayerPrefab.js";
import OnAwakeActionScript from "../scriptnodes/utils/OnAwakeActionScript.js";
import FadeEffectCameraActionScript from "../scriptnodes/camera/FadeEffectCameraActionScript.js";
import TweenActionScript from "../scriptnodes/animation/TweenActionScript.js";
import SceneOnPointerDownActionScript from "../scriptnodes/scene/SceneOnPointerDownActionScript.js";
import CallbackActionScript from "../scriptnodes/utils/CallbackActionScript.js";
import StartSceneActionScript from "../scriptnodes/scene/StartSceneActionScript.js";
import TimeEventActionScript from "../scriptnodes/timer/TimeEventActionScript.js";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Title extends Phaser.Scene {
  constructor() {
    super("Title");

    /* START-USER-CTR-CODE */
    // Write your code here.
    /* END-USER-CTR-CODE */
  }

  /** @returns {void} */
  editorCreate() {
    // levelLayer
    const levelLayer = this.add.layer();
    levelLayer.blendMode = Phaser.BlendModes.SKIP_CHECK;

    // background1Prefab
    const background1Prefab = new Background1Prefab(this, 0, 0);
    levelLayer.add(background1Prefab);

    // background2Prefab
    const background2Prefab = new Background2Prefab(this, 0, 0);
    levelLayer.add(background2Prefab);

    // background3Prefab
    const background3Prefab = new Background3Prefab(this, 0, 0);
    levelLayer.add(background3Prefab);

    // background4Prefab
    const background4Prefab = new Background4Prefab(this, 0, 0);
    levelLayer.add(background4Prefab);

    // leftWallTileSprite
    const leftWallTileSprite = new WallPrefab(this, 0, 0);
    levelLayer.add(leftWallTileSprite);

    // rightWallTileSprite
    const rightWallTileSprite = new WallPrefab(this, 576, 0);
    rightWallTileSprite.flipX = true;
    rightWallTileSprite.flipY = false;
    levelLayer.add(rightWallTileSprite);

    // Add walls to a list for collisions
    const walls = [rightWallTileSprite, leftWallTileSprite];

    // Set up wall physics
    walls.forEach((wall) => {
      this.physics.world.enable(wall);
      wall.body
        .setImmovable(true)
        .setAllowGravity(false)
        .setSize(wall.width, wall.height);
    });

    // Store walls reference
    this.walls = walls;

    // ground
    const ground = this.add.image(81, 384, "ground");
    ground.setOrigin(0, 0);
    levelLayer.add(ground);

    // playerLayer
    const playerLayer = this.add.layer();
    playerLayer.blendMode = Phaser.BlendModes.SKIP_CHECK;

    // player
    const player = new PlayerPrefab(this, 325, 398);
    playerLayer.add(player);

    // titleTextGameObject
    const titleTextGameObject = this.add.text(167, 84, "", {});
    titleTextGameObject.text = "Upheaval";
    titleTextGameObject.setStyle({
      align: "center",
      color: "#0086ddff",
      fontFamily: "PressStart2P-Regular",
      fontSize: "40px",
      stroke: "#00ffff",
      "shadow.offsetX": 6,
      "shadow.offsetY": 2,
      "shadow.stroke": true,
      "shadow.fill": true,
    });
    titleTextGameObject.setLineSpacing(3);

    // clickToPlayTextGameObject
    const clickToPlayTextGameObject = this.add.text(211, 196, "", {});
    clickToPlayTextGameObject.text = "Click To Start";
    clickToPlayTextGameObject.setStyle({
      color: "#89cae8ff",
      fontFamily: "PressStart2P-Regular",
      stroke: "#000000ff",
      "shadow.offsetX": 3,
      "shadow.offsetY": 1,
    });

    // onAwakeActionScript
    const onAwakeActionScript = new OnAwakeActionScript(this);

    // fadeEffectCameraActionScript
    const fadeEffectCameraActionScript = new FadeEffectCameraActionScript(
      onAwakeActionScript
    );

    // tweenActionScript
    const tweenActionScript = new TweenActionScript(onAwakeActionScript);

    // sceneOnPointerDownActionScript
    const sceneOnPointerDownActionScript = new SceneOnPointerDownActionScript(
      onAwakeActionScript
    );

    // callbackActionScript
    const callbackActionScript = new CallbackActionScript(
      sceneOnPointerDownActionScript
    );

    // rightWallTileSprite (prefab fields)
    rightWallTileSprite.tileOffsetY = -250;

    // fadeEffectCameraActionScript (prefab fields)
    fadeEffectCameraActionScript.duration = 500;
    fadeEffectCameraActionScript.fadeEvent = "camerafadeincomplete";

    // tweenActionScript (prefab fields)
    tweenActionScript.target = clickToPlayTextGameObject;
    tweenActionScript.duration = 1200;
    tweenActionScript.yoyo = true;
    tweenActionScript.repeat = -1;
    tweenActionScript.delay = 500;
    tweenActionScript.loopDelay = 500;
    tweenActionScript.tweenProperty = "alpha";
    tweenActionScript.tweenPropertyValue = 0.2;

    // sceneOnPointerDownActionScript (prefab fields)
    sceneOnPointerDownActionScript.once = true;

    // timeEventActionScriptForSceneTransition
    const timeEventActionScriptForSceneTransition = new TimeEventActionScript(
      this
    );

    // fadeEffectCameraActionScript_1
    const fadeEffectCameraActionScript_1 = new FadeEffectCameraActionScript(
      timeEventActionScriptForSceneTransition
    );

    // startSceneActionScript
    const startSceneActionScript = new StartSceneActionScript(
      fadeEffectCameraActionScript_1
    );

    // Configure them
    fadeEffectCameraActionScript_1.duration = 500;
    fadeEffectCameraActionScript_1.fadeEvent = "camerafadeoutcomplete";
    startSceneActionScript.sceneKey = "Level";

    // Store reference
    this.timeEventActionScriptForSceneTransition =
      timeEventActionScriptForSceneTransition;

    // callbackActionScript (prefab fields)
    callbackActionScript.callback = () => {
      this.startGame();
    };

    this.player = player;

    this.events.emit("scene-awake");
  }

  /** @type {PlayerPrefab} */
  player;
  /** @type {WallPrefab[]} */
  walls;
  /** @type {TimeEventActionScript} */
  timeEventActionScriptForSceneTransition;
  /** @type {boolean} */
  isTransitioning = false;

  /* START-USER-CODE */

  // Write your code here

  create() {
    this.editorCreate();

    // Play title music
    const audioManager = this.game.registry.get("audioManager");
    if (audioManager) {
      audioManager.playBGM("title");
    }

    // Disable player body (For title scene so they don't fall thorugh the world)
    this.player.body.enable = false;

    this.player.play("playerIdle2");
    this.isTransitioning = false; // Reset transition flag
  }

  startGame() {
    this.player.stop();
    this.player.play("playerSwordSheathe");

    // Wait for sword sheathe to complete before starting movement sequence
    this.player.once(
      Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + "playerSwordSheathe",
      () => {
        // Run sequence
        this.player.play("playerRun");
        this.player.setFlipX(false);

        // Run to wall
        this.tweens.add({
          targets: this.player,
          x: 500,
          duration: 1000,
          onComplete: () => this.executeJumpSequence(),
        });
      }
    );
  }

  executeJumpSequence() {
    // Now enable physics as we're about to jump
    this.player.body.enable = true;

    // Initial jump
    this.player.play("playerJumpTitle");

    // Play jump sound
    const audioManager = this.game.registry.get("audioManager");
    if (audioManager) {
      audioManager.playSFX("jump");
    }

    this.player.setVelocityY(-300);
    this.player.setVelocityX(100); // Slight movement towards wall

    // Listen for wall collision
    this.physics.add.collider(this.player, this.walls, () => {
      this.player.play("playerWallSlide");

      // Play wall collision sound
      const audioManager = this.game.registry.get("audioManager");
      if (audioManager) {
        audioManager.playSFX("wallCollision");
      }

      // Short delay then final jump
      this.time.delayedCall(400, () => {
        // Big jump off wall
        this.player.setVelocityY(-600);
        this.player.setVelocityX(-200); // Push away from wall
        this.player.setFlipX(true); //Turn the opposite direction
        this.player.play("playerJumpTitle");

        // Play jump sound
        const audioManager = this.game.registry.get("audioManager");
        if (audioManager) {
          audioManager.playSFX("jump");
        }

        // Chain to spin after jump animation
        this.player.once(
          Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + "playerJumpTitle",
          () => {
            this.player.play("playerSpin");

            // Play spin sound
            const audioManager = this.game.registry.get("audioManager");
            if (audioManager) {
              audioManager.playSFX("spin");
            }
          }
        );

        // Check when player goes off screen
        this.time.addEvent({
          delay: 100,
          callback: () => {
            if (this.player.y < -50 && !this.isTransitioning) {
              console.log("🎮 Ready for scene transition");
              this.isTransitioning = true; // Set flag
              this.timeEventActionScriptForSceneTransition.execute();
            }
          },
          loop: true,
        });
      });
    });

    // Chain spin after initial jump animation
    this.player.once(
      Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + "playerJumpTitle",
      () => {
        this.player.play("playerSpin");
      }
    );
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
