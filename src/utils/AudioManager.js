// AudioManager.js
export default class AudioManager {
  constructor(scene) {
    this.scene = scene;
    this.sounds = new Map();
    this.currentBGM = null;
  }

  // Initialize all game audio
  init() {
    // BGM
    this.addSound("title", "assets/audio/bgm/title.wav", {
      loop: true,
      volume: 0.6,
    });
    this.addSound("level", "assets/audio/bgm/level.wav", {
      loop: true,
      volume: 0.25,
    });
    this.addSound("gameover", "assets/audio/bgm/gameover.wav", {
      loop: true,
      volume: 0.4,
    });

    // SFX
    this.addSound("jump", "assets/audio/sfx/jump.wav", { volume: 0.5 });
    this.addSound("fall", "assets/audio/sfx/fall.wav", { volume: 0.4 });
    this.addSound("wallCollision", "assets/audio/sfx/wallCollision.mp3", {
      volume: 0.3,
    });
    this.addSound("spin", "assets/audio/sfx/spin.mp3", { volume: 0.07 });
  }

  // Add a new sound to the manager
  addSound(key, path, config = {}) {
    this.sounds.set(key, { path, config });
  }

  // Load all sounds into the current scene
  loadSounds() {
    for (const [key, sound] of this.sounds.entries()) {
      if (!this.scene.cache.audio.exists(key)) {
        this.scene.load.audio(key, sound.path);
      }
    }
  }

  // Play a sound effect
  playSFX(key) {
    if (this.sounds.has(key)) {
      const sound = this.sounds.get(key);
      this.scene.sound.play(key, sound.config);
    }
  }

  // Play background music
  playBGM(key) {
    if (this.currentBGM) {
      this.currentBGM.stop();
    }

    if (this.sounds.has(key)) {
      const sound = this.sounds.get(key);
      this.currentBGM = this.scene.sound.add(key, sound.config);
      this.currentBGM.play();
    }
  }

  // Stop the current background music
  stopBGM() {
    if (this.currentBGM) {
      this.currentBGM.stop();
      this.currentBGM = null;
    }
  }

  // Pause all audio
  pauseAll() {
    this.scene.sound.pauseAll();
  }

  // Resume all audio
  resumeAll() {
    this.scene.sound.resumeAll();
  }

  // Cross-fade between two BGMs
  crossFadeBGM(newKey, duration = 1000) {
    if (!this.currentBGM || !this.sounds.has(newKey)) return;

    const oldBGM = this.currentBGM;
    const sound = this.sounds.get(newKey);
    this.currentBGM = this.scene.sound.add(newKey, sound.config);

    // Fade out current BGM
    this.scene.tweens.add({
      targets: oldBGM,
      volume: 0,
      duration: duration,
      onComplete: () => oldBGM.stop(),
    });

    // Fade in new BGM
    this.currentBGM.setVolume(0);
    this.currentBGM.play();
    this.scene.tweens.add({
      targets: this.currentBGM,
      volume: sound.config.volume || 1,
      duration: duration,
    });
  }
}
