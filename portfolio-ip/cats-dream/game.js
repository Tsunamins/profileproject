import GameScene from './src/game/GameScene.js'
import TitleScene from './src/game/TitleScene.js'

// const userInfoForm = document.getElementById('user-info-form');
// const userEmailInput = document.getElementById('user-email')
// const logoutLink = document.getElementById('reload');

// logoutLink.addEventListener('click', () => {
//   localStorage.removeItem('user_id');
// })



let config = {
    type: Phaser.AUTO, 
    width: 800,
    height: 600,
    parent: 'canvas',
    pixelArt: true,
    physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 0 },
          debug: false
      }
  },
    scene: [TitleScene, 
    GameScene,]
   
  };

  const game = new Phaser.Game(config);
 