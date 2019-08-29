//recives contorl from the primary game created
class Scene1 extends Phaser.Scene {
    constructor() {
        //scene identifier is bootScene
        super("bootGame");
    }

    preload() {
        this.load.image("start", "assets/images/start-game.png");
        this.load.image("sky", "assets/images/sky2.png");
        this.load.image("soul", "assets/images/soul_bar.png");
        this.load.image("sales", "assets/images/sales_bar.png");
        this.load.spritesheet("bomb", "assets/images/bomb.png", {
            frameWidth: 14,
            frameHeight: 14
        });
        this.load.spritesheet("bomb_2", "assets/images/bomb_2.png", {
            frameWidth: 14,
            frameHeight: 14
        });
        this.load.spritesheet("bomb_3", "assets/images/bomb_3.png", {
            frameWidth: 14,
            frameHeight: 14
        });
        this.load.spritesheet("star", "assets/images/star.png", {
            frameWidth: 24,
            frameHeight: 22
        });
        this.load.spritesheet("dude", "assets/images/dude.png", {
            frameWidth: 32,
            frameHeight: 48
        });
        this.load.spritesheet("explode", "assets/images/explosion2.png", {
            frameWidth: 48,
            frameHeight: 48
        });
    }

    create() {
        this.start = this.add.sprite(game.config.width / 2, game.config.height / 2, 'start')
            .setOrigin(0.5)
            .setInteractive();

        this.add.text(game.config.width / 2, game.config.height / 1.7, "Loading Game....", )
            .setOrigin(0.5)
            .setStyle({
                font: "30px Arial",
                align: "center",
                fill: "#B4FBFB"
            });

        var instructions = [
            "Controls:",
            "Jump: W or Up Arrow",
            "Left: A or left Arrow",
            "Right: D or Right Arrow"
        ];

        this.add.text(game.config.width / 2, game.config.height / 3, instructions)
            .setOrigin(0.5)
            .setStyle({
                font: "40px Arial",
                align: "center",
                fill: '#21FA00'
            });

        //loads the scene stated in the brackets
        //adds button to start game. once clicked, the second scene will be loaded
        this.start.on('pointerdown', function(pointer) {
            this.scene.start("playGame");
        }, this);

    }
}
