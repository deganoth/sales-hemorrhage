//recives contorl from the primary game created
class Scene1 extends Phaser.Scene {
    constructor(){
        //scene identifier is bootScene
        super("bootGame");
    }
    
    preload(){
        this.load.image("start", "assets/images/start-game.png");
        this.load.image("sky", "assets/images/sky2.png");
        this.load.image("bomb", "assets/images/bomb.png");
        this.load.image("star", "assets/images/star.png");
        this.load.image("dude", "assets/images/dude.png");
    }
    
    create(){
        this.start = this.add.sprite(game.config.width / 2, game.config.height / 2, 'start').setInteractive();
        
        this.add.text(20,20, "Loading Game....");
        //loads the scene stated in the brackets
        this.start.on('pointerdown', function(pointer){
             this.scene.start("playGame");
        }, this);
       
    }
}