import Enemy from './Enemy.js';

export default class Enemies extends Phaser.Physics.Arcade.Group {
    constructor (world, scene, children) {
      super(world, scene, children);
      this.scene = scene;
     
      this.repeat = 4;
      this.key = 'enemy'
  
      
      
    }
}