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
    });

    // Platform settings
    const BASE_Y = 450; // Starting Y position for first platform
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

    // Performance optimization
    this._lastScrollY = 0; // Track camera position for updates

    /* END-USER-CTR-CODE */
  }

  /* START-USER-CODE */
  /** @type {Phaser.GameObjects.Group} */
  group;
  /** @type {number} */
  maxPlatformDistance;

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

    children.forEach((platform) => {
      if (platform.y >= scrollY + this.maxPlatformDistance) {
        platformsToMove.push(platform);
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
    });
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
