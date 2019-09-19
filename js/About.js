//recives contorl from the primary game created
class About extends Phaser.Scene {
    constructor() {
        //scene identifier is About
        super("About");
    }

    create() {
    
        titleMusic.resume();

        //enemies title description
        this.add.bitmapText(game.config.width / 2, game.config.height/30, 'titleFont', 'targets', 100, 1)
            .setOrigin(0.5); 

        this.add.sprite(game.config.width / 3, game.config.height / 6, 'bum')
            .setScale(2)
            .setOrigin(0.5)
            .setDepth(1);

        this.add.rectangle(game.config.width / 3, game.config.height / 6 , game.config.width / 4, 200, 0xdddddd);

        this.add.sprite(game.config.width / 1.5, game.config.height / 6, 'fatcat')
            .setScale(2)
            .setOrigin(0.5)
            .setDepth(1);
        
        this.add.rectangle(game.config.width / 1.5, game.config.height / 6 , game.config.width / 4, 200, 0xdddddd);
        
        //enemies description
        enemyDescription = [
            "collect each type",
            "to increase sales."
        ];

        this.add.bitmapText(game.config.width / 2, game.config.height/3.5, 'subTitle', enemyDescription, 50, 1)
            .setOrigin(0.5); 

        //health description
        this.add.bitmapText(game.config.width / 2, game.config.height/2.7, 'titleFont', 'health', 100, 1)
            .setOrigin(0.5); 

        this.add.sprite(game.config.width / 2, game.config.height / 2, 'energy')
            .setScale(2)
            .setOrigin(0.5)
            .setDepth(1);    

        this.add.rectangle(game.config.width / 2, game.config.height / 2 , game.config.width / 4, 200, 0xdddddd);

        //objectives
        message1 = [
            "Incease your sales",
            "by collecting each",
            "customer",
        ];

        this.add.bitmapText(game.config.width / 2, game.config.height/1.5, 'titleFont', 'objectives', 100, 1)
            .setOrigin(0.5); 

        this.add.bitmapText(game.config.width / 2, game.config.height/1.3, 'subTitle', message1, 60, 1)
            .setOrigin(0.5); 

        //back to main menu button
        this.menu = this.add.sprite(game.config.width / 2, game.config.height / 1.1, 'menu')
            .setScale(1)
            .setInteractive();

        //loads the scene stated in the brackets
        //adds button to start game. once clicked, the second scene will be loaded
        this.menu.on('pointerdown', function(pointer) {
            titleMusic.pause();
            this.scene.start("Title");
        }, this);

    }
}
