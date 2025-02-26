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
    // Create a group to manage all platform instances
    this.group = scene.add.group({
      classType: PlatformPrefab,
      runChildUpdate: true, // Calls child game objects from class above
    });

    // Platform settings
    const BASE_Y = 0; // Starting Y position for first platform
    const PLATFORM_GAP = 350; // Consistent vertical gap between platforms
    const PLATFORM_COUNT = 5; // Initial number of platforms
    const MIN_X = 135; // Leftmost spawn position
    const MAX_X = 500; // Rightmost spawn position
    const MIN_X_GAP = 100; // Minimum horizontal gap between platforms

    // Create base platform (centered)
    this.group.get(320, BASE_Y);

    // Initial Platform setup
    let lastX = 320; // Track last platform X position
    let currentY = BASE_Y; // Track current Y position

    // Generate initial platforms with consistent spacing
    for (let i = 1; i < PLATFORM_COUNT; i += 1) {
      // Get new X position with minimum distance from last platform
      let newX;
      do {
        newX = Phaser.Math.Between(MIN_X, MAX_X);
      } while (Math.abs(newX - lastX) < MIN_X_GAP);

      // Move up by consistent gap
      currentY -= PLATFORM_GAP;

      // Create new platform
      this.group.get(newX, currentY);
      lastX = newX;
    }

    // Store settings for use in update()
    this.PLATFORM_GAP = PLATFORM_GAP;
    this.MIN_X = MIN_X;
    this.MAX_X = MAX_X;
    this.MIN_X_GAP = MIN_X_GAP;

    // Set up camera and viewport boundaries
    this.viewportHeight = scene.scale.height;
    this.maxPlatformDistance = scene.scale.height * 3; // Distance before platforms respawn
    this.minPlatformDistance = -this.viewportHeight;

    //Lowest platform position
    this.bottomMostPlatformYPosition = 0;

    // Performance optimization
    this._lastScrollY = 0; // Track camera position for updates

    /* END-USER-CTR-CODE */
  }

  /* START-USER-CODE */
  /** @type {Phaser.GameObjects.Group} */
  group;
  /** @type {number} */
  maxPlatformDistance;
  /** @type {number} */
  bottomMostPlatformYPosition;
  /** @type {boolean} */
  enableMovingPlatforms = false;
  /** @type {number} */
  platformSpeed = 30;
  /** @type {number} */
  movingPlatformChance = 0.5;

  update() {
    // Get current camera scroll position
    const scrollY = this.scene.cameras.main.scrollY;

    // Only update if camera has moved significantly (optimization)
    if (Math.abs(this._lastScrollY - scrollY) < 50) {
      return;
    }
    this._lastScrollY = scrollY;

    // Find all platforms that need to be repositioned
    const children = this.group.getChildren();
    const platformsToMove = [];

    //Lowest platform
    this.bottomMostPlatformYPosition = children[0].y;

    children.forEach((platform) => {
      if (platform.y >= scrollY + this.maxPlatformDistance) {
        platformsToMove.push(platform);
      }
      // Update bottommost platform Y position
      if (platform.y > this.bottomMostPlatformYPosition) {
        this.bottomMostPlatformYPosition = platform.y;
      }
    });

    // Find the highest platform's Y position
    const highestPlatform = children.reduce((highest, platform) => {
      return platform.y < highest.y ? platform : highest;
    });

    // Reposition platforms above the highest one
    let lastX = null;
    platformsToMove.forEach((platform) => {
      // Generate new X position with minimum spacing
      let newX;
      do {
        newX = Phaser.Math.Between(this.MIN_X, this.MAX_X);
      } while (lastX !== null && Math.abs(newX - lastX) < this.MIN_X_GAP);

      lastX = newX;
      platform.x = newX;

      // Position above highest platform with consistent gap
      platform.y = highestPlatform.y - this.PLATFORM_GAP;

      // Enable moving platforms
      if (this.enableMovingPlatforms) {
        // Use probability for moving platforms
        if (Math.random() < this.movingPlatformChance) {
          platform.startPlatformMovement();
        } else {
          platform.stopPlatformMovement();
        }
      }
    });
  }

  /**
   * Adjusts platform spacing based on difficulty level
   * @param {number} difficultyLevel - Current difficulty level (0-10)
   */
  adjustSpacingForDifficulty(difficultyLevel) {
    // Adjust platform spacing and movement based on difficulty
    switch (difficultyLevel) {
      case 1: // 200 points
        this.platformSpeed = 50;
        this.movingPlatformChance = 0.55;
        this.MIN_X_GAP = 90;
        break;
      case 2: // 400 points
        this.platformSpeed = 68;
        this.movingPlatformChance = 0.61;
        this.MIN_X_GAP = 86;
        break;
      case 3: // 600 points
        this.platformSpeed = 85;
        this.movingPlatformChance = 0.68;
        this.MIN_X_GAP = 83;
        break;
      case 4: // 800 points
        this.platformSpeed = 103;
        this.movingPlatformChance = 0.74;
        this.MIN_X_GAP = 79;
        break;
      case 5: // 1000 points
        this.platformSpeed = 120;
        this.movingPlatformChance = 0.8;
        this.MIN_X_GAP = 75;
        break;
      case 6: // 1200 points - Steeper difficulty increase begins
        this.platformSpeed = 136;
        this.movingPlatformChance = 0.84;
        this.MIN_X_GAP = 71;
        break;
      case 7: // 1400 points
        this.platformSpeed = 152;
        this.movingPlatformChance = 0.88;
        this.MIN_X_GAP = 67;
        break;
      case 8: // 1600 points
        this.platformSpeed = 168;
        this.movingPlatformChance = 0.92;
        this.MIN_X_GAP = 63;
        break;
      case 9: // 1800 points
        this.platformSpeed = 184;
        this.movingPlatformChance = 0.96;
        this.MIN_X_GAP = 59;
        break;
      case 10: // 2000 points - Maximum difficulty
        this.platformSpeed = 200;
        this.movingPlatformChance = 1.0; // All platforms move
        this.MIN_X_GAP = 55;
        break;
      default:
        // Default values
        this.platformSpeed = 30;
        this.movingPlatformChance = 0.5;
        this.MIN_X_GAP = 100;
    }

    console.log(
      `Difficulty Level ${difficultyLevel}: Speed=${
        this.platformSpeed
      }, Moving=${(this.movingPlatformChance * 100).toFixed(0)}%, Gap=${
        this.MIN_X_GAP
      }px`
    );
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
