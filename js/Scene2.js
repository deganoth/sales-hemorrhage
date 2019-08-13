//recives contorl from the primary game created
class Scene2 extends Phaser.Scene {
    constructor(){
        //scene identifier is playGame
        super("playGame");
    }
    
    create(){
        this.add.text(20, 20, "Playing Game!", {font: "25px Arial", fill: "yellow"});
    }
}