export default class Enemy extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'enemy');
        this.scene = scene;
        this.health = 3; //in case want to add later

        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);
        this.x = Phaser.Math.Between(100, 600);
        this.y = Phaser.Math.Between(100, 300)
        this.setCollideWorldBounds(true);
        this.setBounce(1);
        this.setVelocity(Phaser.Math.Between(20, 60), Phaser.Math.Between(20, 60));
        
        
        
     

        // this.enemies.children.iterate(function (enemy){
        
        //     enemy.x = Phaser.Math.Between(100, 600);
        //     enemy.y = Phaser.Math.Between(100, 300)
        //     enemy.setCollideWorldBounds(true);
        //     enemy.setBounce(1);
        //     enemy.setVelocity(Phaser.Math.Between(20, 60), Phaser.Math.Between(20, 60));
           
        //     enemy.health = 3;
        // });



    }

    update(){
        this.setVelocity = 150;
        this.anims.play('enemy-walk', true);
      
            
        
    }

    //create(){ 
        

   // }
}