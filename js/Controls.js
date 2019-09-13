//recives contorl from the primary game created
class Controls extends Phaser.Scene {
    constructor() {
        //scene identifier is bootScene
        super("Controls");
    }

    create() {
       
        //desktop controls description
        this.add.bitmapText(game.config.width / 2, game.config.height/30, 'titleFont', 'desktop', 100, 1)
            .setOrigin(0.5); 

        desktopControls = [
            "Use WSAD or the Arrow Keys",
            "for movement."
        ];

        this.add.bitmapText(game.config.width / 2, game.config.height/9, 'subTitle', desktopControls, 50, 1)
            .setOrigin(0.5); 

        //mobile controls description
        this.add.bitmapText(game.config.width / 2, game.config.height/5.5, 'titleFont', 'touchscreen', 100, 1)
            .setOrigin(0.5); 

        mobileControls = [
            "Touch the areas shown",
            "below to move around."
        ];

        this.add.bitmapText(game.config.width / 2, game.config.height/3.8, 'subTitle', mobileControls, 50, 1)
            .setOrigin(0.5); 

        this.add.image(game.config.width / 2, game.config.height / 1.8, 'mobile-controls')
            .setScale(0.7)
            //.setOrigin(0)
            .setDepth(1);

        //back to main menu button
        this.menu = this.add.sprite(game.config.width / 2, game.config.height / 1.1, 'menu')
            .setScale(1)
            .setInteractive();

        //loads the scene stated in the brackets
        //adds button to start game. once clicked, the second scene will be loaded
        this.menu.on('pointerdown', function(pointer) {
            this.scene.start("Title");
        }, this);

    }
}
