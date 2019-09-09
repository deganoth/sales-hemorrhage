//recives contorl from the primary game created
class Title extends Phaser.Scene {
    constructor() {
        //scene identifier is bootScene
        super("Title");
    }

    preload() {
        this.load.bitmapFont('titleFont', 'assets/fonts/BALLSONTHERAMPAGE.png', 'assets/fonts/BALLSONTHERAMPAGE.fnt');
        this.load.bitmapFont('subTitle', 'assets/fonts/digital-7.png', 'assets/fonts/digital-7.fnt');
        this.load.image('leftarrow', 'assets/images/left_arrow.png');
        this.load.image('rightarrow', 'assets/images/right_arrow.png');
        this.load.image('uparrow', 'assets/images/up_arrow.png');
        this.load.image("start", "assets/new_images/start_button.png");
        this.load.image("controls", "assets/new_images/controls_button.png");
        this.load.image("exit", "assets/new_images/exit_button.png");
        this.load.image('restart', 'assets/images/restart.png');
        this.load.image("sky", "assets/images/sky2.png");
        this.load.image("soul", "assets/images/soul_bar.png");
        this.load.image("sales", "assets/images/sales_bar.png");
        this.load.spritesheet("bum", "assets/new_images/bum-customer.png",{
            frameWidth: 66.5,
            frameHeight: 100
        });
        this.load.spritesheet("fatcat", "assets/new_images/fatcat.png", {
            frameWidth: 66.5,
            frameHeight: 100
        });
        this.load.spritesheet("energy", "assets/new_images/energy_boost.png", {
            frameWidth: 66.5,
            frameHeight: 100
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
        this.start = this.add.sprite(game.config.width / 2, game.config.height / 2.3, 'start')
            .setScale(1.5)
            .setInteractive();

        this.controls = this.add.sprite(game.config.width / 2, game.config.height / 1.75, 'controls')
            .setScale(1.5)
            .setInteractive();

        this.exit = this.add.sprite(game.config.width / 2, game.config.height / 1.4, 'exit')
            .setScale(1.5)
            .setInteractive();

        title = [
            "sales",
            "hemorrhage",
        ];

        this.add.bitmapText(game.config.width / 2, game.config.height/9, 'titleFont', title, 160, 1)
            .setOrigin(0.5); 

        message = [
            "Reach your target",
            "Or Keep your Soul",
            
        ];

         this.add.bitmapText(game.config.width / 2, game.config.height/3.5, 'subTitle', message, 60, 1)
            .setOrigin(0.5); 


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

        this.controls.on('pointerdown', function(pointer) {
            this.scene.start("Controls");
        }, this);
    }
}
