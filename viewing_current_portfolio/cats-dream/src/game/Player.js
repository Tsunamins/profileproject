export default class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'player');
        this.scene = scene;

        
        
       
        this.scene.physics.world.enable(this);
       

        this.scene.add.existing(this);
        
        
        this.setCollideWorldBounds(true);

       
        this.scene.anims.create({
            //changed from left to walking to apply flipX instead
            key: 'walking',
            frames: this.scene.anims.generateFrameNumbers('player', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
          });
      
          this.scene.anims.create({
              key: 'turn',
              frames: [ { key: 'player', frame: 3 } ],
              frameRate: 20
          });

          this.scene.anims.create({
            key: 'fire',
            frames: [ { key: 'player', frame: 4 } ],
            framesRate: 20
          });
      

        
    }

  
    create(){

       

    }

    //update(cursors)
//update(cursors, scene, enemies)
update(cursors, scene, enemies){
        if(cursors.left.isDown){
            this.flipX = true;
            this.setVelocityX(-160);
            this.anims.play('walking', true);
    
        } else if (cursors.right.isDown){
            this.flipX = false;
            this.setVelocityX(160);
            this.anims.play('walking', true);

        } else { 
            this.setVelocityX(0);
            this.anims.play('turn', true);

        };

        if(cursors.up.isDown){
            this.setVelocityY(-160);
            this.anims.play('walking', true);
  
         
      } else if (cursors.down.isDown){
            this.setVelocityY(160);
            this.anims.play('walking', true);
  
        
      } else {   
        this.setVelocityY(0); 
      };

      

      //this.enemies.children.iterate(function (enemy){  



 
    // if (cond1 || cond2)
      //**************************************** */
      //firing section
      if (cursors.space.isDown){
        //firing animation for cat not working yet
     
        this.setVelocity(0);
        this.anims.play('fire', true);

       
           var magic = scene.magics.get();
           console.log(scene.magics.get())
           magic.setActive(true);
           magic.setVisible(true);
           if (magic){   
            magic.fire(this);
            
            
            //doesn't work
            //scene.physics.add.collider(magic, this.layer_collision);
            
            //works
            scene.physics.add.overlap(magic, enemies, this.hitAnEnemy, null, scene);
             
          } 
        }

    }

    hitAnEnemy(magic, enemy){
       // this.attack += 1;
       // console.log(this.attack)
       // this.attackText.setText('Enemies banished: ' + this.attack);
      
        enemy.disableBody(true, true);
        this.events.emit('attack');
      };


    
}