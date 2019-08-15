//recives contorl from the primary game created
class Scene1 extends Phaser.Scene {
    constructor() {
        //scene identifier is bootScene
        super("bootGame");
    }

    preload() {
        this.load.image("start", "assets/images/start-game.png");
        this.load.image("sky", "assets/images/sky2.png");
        this.load.spritesheet("bomb", "assets/images/bomb.png", {
            frameWidth: 14,
            frameHeight: 14
        });
        this.load.image("star", "assets/images/star.png");
        this.load.spritesheet("dude", "assets/images/dude.png",{
            frameWidth: 32,
            frameHeight: 48
        });
        this.load.spritesheet("explode", "assets/images/explosion2.png", {
            frameWidth: 48,
            frameHeight: 48
        });
    }

    create() {
        this.start = this.add.sprite(game.config.width / 2, game.config.height / 2, 'start').setInteractive();

        this.add.text(game.config.width / 2.8, game.config.height / 1.7, "Loading Game....", {
            font: "30px Arial"
        });
        //loads the scene stated in the brackets

        //adds button to start game. once clicked, the second scene will be loaded
        this.start.on('pointerdown', function(pointer) {
            this.scene.start("playGame");
        }, this);

    }
}
