//recives contorl from the primary game created
class Scene1 extends Phaser.Scene {
    constructor(){
        //scene identifier is bootScene
        super("bootGame");
    }
    
    create(){
        this.add.text(20,20, "Loading Game....");
        
        //loads the scene stated in the brackets
        this.scene.start("playGame");
    }
}