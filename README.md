# Upheaval - A Vertical Platformer Game

![Upheaval Game Screenshot](screenshot.png)

Upheaval is a challenging vertical platformer built with Phaser 3, where players bounce between platforms trying to reach ever-higher scores while avoiding falling to their doom.

## 🎮 Play the Game

Play Upheaval now at: [https://upheaval-game.netlify.app](https://upheaval-game.netlify.app)

## 🕹️ How to Play

- **Auto-Jump**: The character automatically bounces off platforms
- **Controls**: Use LEFT and RIGHT arrow keys to control your character's movement in the air
- **Goal**: Climb as high as possible to achieve the highest score
- **Challenge**: The game gets progressively more difficult as your score increases

## 🏆 Difficulty Progression

The game features a comprehensive difficulty system with 10 levels:

| Score | Gravity | Platform Speed | Moving Platforms | Features |
|-------|---------|---------------|-----------------|----------|
| 200   | +10%    | 50            | 55%             | Basic difficulty |
| 400   | +20%    | 68            | 61%             | Faster gameplay |
| 600   | +30%    | 85            | 68%             | More moving platforms |
| 800   | +40%    | 103           | 74%             | Reduced platform spacing |
| 1000  | +50%    | 120           | 80%             | Significant challenge begins |
| 1200  | +70%    | 136           | 84%             | Steeper difficulty curve |
| 1400  | +95%    | 152           | 88%             | Precision jumping required |
| 1600  | +125%   | 168           | 92%             | Very challenging |
| 1800  | +160%   | 184           | 96%             | Extreme precision needed |
| 2000  | +200%   | 200           | 100%            | Maximum difficulty |

## 🔧 Development

This game was built using:
- [Phaser 3](https://phaser.io/phaser3) - HTML5 Game Framework
- [Phaser Editor v4](https://phasereditor2d.com/) - Visual game editor for Phaser

### Local Development

1. Clone the repository:
```
git clone https://github.com/your-username/upheaval.git
```

2. Navigate to the project directory:
```
cd upheaval
```

3. Open the project in Phaser Editor v4 or serve it with a local web server.

## 🎵 Audio Credits

- **Level BGM**: Boss Battle Loop #3 by Sirkoto51 -- [FreeSoundLink](https://freesound.org/s/443128/) -- License: Attribution 4.0
- **Bounce Sound Effect**: Jump_C_08 by cabled_mess -- [FreeSoundLink](https://freesound.org/s/350898/) -- License: Creative Commons 0
- **Intro BGM**: [YouTube Source](https://www.youtube.com/watch?v=woPsQroEWCM&ab_channel=Tyops)
- **Falling Sound Effect**: GustOfWind002.wav by TaraMG -- [FreeSoundLink](https://freesound.org/s/386032/) -- License: Attribution 3.0
- **Game Over**: 8-bit Game Over Sound/Tune by EVRetro -- [FreeSoundLink](https://freesound.org/s/533034/) -- License: Creative Commons 0
- **Wall Collision**: Hitting a padded wall 02 Single Shot by velcronator -- [FreeSoundLink](https://freesound.org/s/733138/) -- License: Creative Commons 0
- **Jump SFX**: Jump_C_08 by cabled_mess -- [FreeSoundLink](https://freesound.org/s/350898/) -- License: Creative Commons 0

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🧰 Technical Details

### Game Architecture

The game consists of several key scenes:
- **Preload**: Handles asset loading
- **Title**: Displays the intro animation
- **Level**: Main gameplay
- **UI**: HUD for displaying score
- **GameOver**: Displays the final score

### Progressive Difficulty System

Upheaval features a sophisticated difficulty progression system:
- Gravity increases with score, making the game faster and more challenging
- Jump mechanics are carefully balanced to maintain playability
- Platform movement speed and probability increase with difficulty
- Platform spacing adjusts to create a tighter, more precise gameplay experience

### Audio System

The game includes a comprehensive audio system:
- Background music for different scenes
- Sound effects for player actions (jumping, bouncing, collisions)
- Audio cues for difficulty transitions

## 🙏 Acknowledgments

- Thanks to Phaser Editor v4 for making game development more accessible
- All sound and music creators for their excellent work
- The Phaser community for their support and resources

