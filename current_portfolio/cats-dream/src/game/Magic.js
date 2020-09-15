

var Magic = new Phaser.Class({
    Extends: Phaser.GameObjects.Sprite,
    initialize:
      function Magic (scene)
      {     
            
          Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'magic'); //this is undefined
         
          this.speed = 1;
          this.born = 0;
          this.direction = 0;
          this.xSpeed = 0;
          this.ySpeed = 0;
          this.setSize(12, 12, true);
          
      },
      fire: function (player)
      {
          this.setPosition(player.x, player.y);
          if (player.flipX)
          {
              //face left
              this.speed = Phaser.Math.GetSpeed(-1000, 1);
              
          }
          else
          {
              //face right
              this.speed = Phaser.Math.GetSpeed(1000, 1);
              
          }
          this.born = 0;
      },
      update: function (time, delta)
      { 
          this.x += this.speed * delta;      
          this.born += delta;   
          if (this.born > 1000)
          {    
              this.setActive(false);
              this.setVisible(false);
          }
      }
    });

    export default Magic