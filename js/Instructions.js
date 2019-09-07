//recives contorl from the primary game created
class Instructions extends Phaser.Scene {
    constructor() {
        //scene identifier is bootScene
        super("Instructions");
    }

    preload() {
        this.load.image('leftarrow', 'assets/images/left_arrow.png');
        this.load.image('rightarrow', 'assets/images/right_arrow.png');
        this.load.image('uparrow', 'assets/images/up_arrow.png');
        this.load.image("start", "assets/images/start-game.png");
        this.load.image('restart', 'assets/images/restart.png');
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
        this.load.spritesheet("dude", "assets/new_images/topgun3.png", {
            frameWidth: 66.5,
            frameHeight: 100
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

        message = [
            "Make",
            "$10,000",
            "Or Keep",
            "your Soul",
            "..."
        ];

        this.add.text(game.config.width / 2, game.config.height / 1.4, message, )
            .setOrigin(0.5)
            .setStyle({
                font: "50px Lucida Console",
                align: "center",
                fill: "#B4FBFB"
            });

        instructions = [
            "Controls:",
            "Jump: W or Up Arrow",
            "Left: A or left Arrow",
            "Right: D or Right Arrow"
        ];

        this.add.text(game.config.width / 2, game.config.height / 3, instructions)
            .setOrigin(0.5)
            .setStyle({
                font: "40px Lucida Console",
                align: "center",
                fill: '#21FA00'
            });

        //loads the scene stated in the brackets
        //adds button to start game. once clicked, the second scene will be loaded
        this.start.on('pointerdown', function(pointer) {
            this.scene.start("Level1");
        }, this);

    }
}
