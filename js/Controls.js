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
            "Use the Arrow buttons",
            "onscreen."
        ];

        this.add.bitmapText(game.config.width / 2, game.config.height/3.8, 'subTitle', mobileControls, 50, 1)
            .setOrigin(0.5); 

        //enemies title description
        this.add.bitmapText(game.config.width / 2, game.config.height/3, 'titleFont', 'targets', 100, 1)
            .setOrigin(0.5); 

        this.add.sprite(game.config.width / 3, game.config.height / 2.17, 'bum')
            .setScale(2)
            .setOrigin(0.5)
            .setDepth(1);

        this.add.rectangle(game.config.width / 3, game.config.height / 2.17 , game.config.width / 4, 200, 0xdddddd);

        this.add.sprite(game.config.width / 1.5, game.config.height / 2.17, 'fatcat')
            .setScale(2)
            .setOrigin(0.5)
            .setDepth(1);
        
        this.add.rectangle(game.config.width / 1.5, game.config.height / 2.17 , game.config.width / 4, 200, 0xdddddd);
        
        //enemies description
        enemyDescription = [
            "collect each type",
            "to increase sales."
        ];

        this.add.bitmapText(game.config.width / 2, game.config.height/1.75, 'subTitle', enemyDescription, 50, 1)
            .setOrigin(0.5); 

        //health description
        this.add.bitmapText(game.config.width / 2, game.config.height/1.55, 'titleFont', 'health', 100, 1)
            .setOrigin(0.5); 

        this.add.sprite(game.config.width / 2, game.config.height / 1.3, 'energy')
            .setScale(2)
            .setOrigin(0.5)
            .setDepth(1);    

        this.add.rectangle(game.config.width / 2, game.config.height / 1.3 , game.config.width / 4, 200, 0xdddddd);

        //back to main menu button
        this.exit = this.add.sprite(game.config.width / 2, game.config.height / 1.1, 'exit')
            .setScale(1)
            .setInteractive();

        //loads the scene stated in the brackets
        //adds button to start game. once clicked, the second scene will be loaded
        this.exit.on('pointerdown', function(pointer) {
            this.scene.start("Title");
        }, this);

    }
}
