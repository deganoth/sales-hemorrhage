//recives contorl from the primary game created
class Title extends Phaser.Scene {
    constructor() {
        //scene identifier is Title
        super("Title");
    }

    preload() {
        //loading text before scene starts
        loadingText = this.add.text(game.config.width/2, game.config.height/2 ,"Loading...", {
            fontFamily: 'digital-7',
            fontSize: '100px', 
            //fill: '#fff'
        }).setOrigin(0.5);

        //load audio
        this.load.audio('menu', [
            'assets/audio/003 Fight.ogg',
            'assets/audio/003 Fight.mp3'
        ]);
        this.load.audio('playing', [
            'assets/audio/002 Break.ogg',
            'assets/audio/002 Break.mp3'
        ]);
        this.load.audio('cheap_one', [
            'assets/audio/cheap_one.ogg',
            'assets/audio/cheap_one.mp3'
        ]);
        this.load.audio('cheap_two', [
            'assets/audio/cheap_two.ogg',
            'assets/audio/cheap_two.mp3'
        ]);
        this.load.audio('cheap_three', [
            'assets/audio/cheap_three.ogg',
            'assets/audio/cheap_three.mp3'
        ]);
        this.load.audio('cheap_four', [
            'assets/audio/cheap_four.ogg',
            'assets/audio/cheap_four.mp3'
        ]);
        this.load.audio('rich_one', [
            'assets/audio/rich_one.ogg',
            'assets/audio/rich_one.mp3'
        ]);
        this.load.audio('rich_two', [
            'assets/audio/rich_two.ogg',
            'assets/audio/rich_two.mp3'
        ]);
        this.load.audio('rich_three', [
            'assets/audio/rich_three.ogg',
            'assets/audio/rich_three.mp3'
        ]);
        this.load.audio('rich_four', [
            'assets/audio/rich_four.ogg',
            'assets/audio/rich_four.mp3'
        ]);
        this.load.audio('coffee_one', [
            'assets/audio/coffe_one.ogg',
            'assets/audio/coffe_one.mp3'
        ]);
        this.load.audio('coffee_two', [
            'assets/audio/coffe_two.ogg',
            'assets/audio/coffe_two.mp3'
        ]);
        this.load.audio('coffee_three', [
            'assets/audio/coffe_three.ogg',
            'assets/audio/coffe_three.mp3'
        ]);
        this.load.audio('coffee_four', [
            'assets/audio/coffe_four.ogg',
            'assets/audio/coffe_four.mp3'
        ]);
        //load fonts
        this.load.bitmapFont('titleFont', 'assets/fonts/BALLSONTHERAMPAGE.png', 'assets/fonts/BALLSONTHERAMPAGE.fnt');
        this.load.bitmapFont('subTitle', 'assets/fonts/digital-7.png', 'assets/fonts/digital-7.fnt');
        this.load.bitmapFont('energyBarFont', 'assets/fonts/digital-7-white.png', 'assets/fonts/digital-7-white.fnt');

        //load images
        this.load.image('background', "assets/images/choose_target_background.png");
       
        this.load.image('leftarrow', 'assets/images/left_arrow.png');
        this.load.image('rightarrow', 'assets/images/right_arrow.png');
        this.load.image('mobile-controls', 'assets/images/controls_layout.png');
        this.load.image("start", "assets/images/start_button.png");
        this.load.image("controls", "assets/images/controls_button.png");
        this.load.image("about", "assets/images/about_button.png");
        this.load.image("menu", "assets/images/menu_button.png");
        this.load.image("exit", "assets/images/exit_button.png");
        this.load.image('target1', "assets/images/target_one.png");
        this.load.image('target2', "assets/images/target_two.png");
        this.load.image('target3', "assets/images/target_three.png");
        this.load.image('restart', 'assets/images/replay_button.png');
        this.load.image("sky", "assets/images/sky2.png");
        this.load.image("soul", "assets/images/soul_bar.png");
        this.load.image("sales", "assets/images/sales_bar.png");
        this.load.image("stairs", "assets/images/stairs.png");
        this.load.image("ground", "assets/images/platform.png");

        //load sprites
        this.load.spritesheet("bum", "assets/images/bum-customer.png",{
            frameWidth: 66.5,
            frameHeight: 100
        });
        this.load.spritesheet("fatcat", "assets/images/fatcat.png", {
            frameWidth: 66.5,
            frameHeight: 100
        });
        this.load.spritesheet("energy", "assets/images/energy_boost.png", {
            frameWidth: 66.5,
            frameHeight: 100
        });
        this.load.spritesheet("dude", "assets/images/topgun3.png", {
            frameWidth: 66.5,
            frameHeight: 100
        });
        this.load.spritesheet("dollar", "assets/images/dollar_sprite.png",{
            frameWidth: 66.5,
            frameHeight: 100
        });
        this.load.spritesheet("boost", "assets/images/boost_sprite.png",{
            frameWidth: 66.5,
            frameHeight: 100
        });

    }

    create() {

        //set loading font to be not visible
        loadingText.setVisible(false);

        //add logo and tagline
        title = [
            "sales",
            "hemorrhage",
        ];

        this.add.bitmapText(game.config.width / 2, game.config.height/9, 'titleFont', title, 160, 1)
            .setOrigin(0.5); 

        message1 = [
            "Reach your target",
            "Or Keep your Soul",
        ];

        this.add.bitmapText(game.config.width / 2, game.config.height/3.5, 'subTitle', message1, 60, 1)
            .setOrigin(0.5); 

        //play title scene music
        titleMusic = this.sound.add('menu');
            
        //set parameters
        titleMusic.play({
            volume: 0.3,
            loop: true
        });

        //add menu buttons
        this.start = this.add.sprite(game.config.width / 2, game.config.height / 2.3, 'start')
            .setScale(1.5)
            .setInteractive();

        this.controls = this.add.sprite(game.config.width / 2, game.config.height / 1.8, 'controls')
            .setScale(1.5)
            .setInteractive();

        this.about = this.add.sprite(game.config.width / 2, game.config.height / 1.48, 'about')
            .setScale(1.5)
            .setInteractive();

        //loading target choice menu once start button is pressed
        this.start.on('pointerdown', function(pointer) {

            this.backgroundBlack = this.add.sprite(game.config.width / 2, game.config.height / 2.3, 'background')
                .setInteractive();

            message2 = [
                "Choose your",
                "Target",
            ];

            this.add.bitmapText(game.config.width / 2, game.config.height/6, 'titleFont', message2, 160, 1)
                .setDepth(1)
                .setOrigin(0.5); 

            this.targetOne = this.add.sprite(game.config.width / 2, game.config.height / 2.3, 'target1')
                .setScale(1.5)
                .setDepth(1)
                .setInteractive();

            //sets the target goal for the level instance.
            this.targetOne.on('pointerdown', function(pointer){
                titleMusic.stop();
                targetChoice = 10000;
                this.scene.start("Level1");               
            }, this);

            this.targetTwo = this.add.sprite(game.config.width / 2, game.config.height / 1.8, 'target2')
                .setScale(1.5)
                .setDepth(1)
                .setInteractive();

            this.targetTwo.on('pointerdown', function(pointer){
                titleMusic.stop();
                targetChoice = 20000;
                this.scene.start("Level1");
            }, this);

            this.targetThree = this.add.sprite(game.config.width / 2, game.config.height / 1.48, 'target3')
                .setScale(1.5)
                .setDepth(1)
                .setInteractive();

            this.targetThree.on('pointerdown', function(pointer){
                titleMusic.stop();
                targetChoice = 50000;
                this.scene.start("Level1");
            }, this);

        }, this);

        //remaining menu items button functions
        this.controls.on('pointerdown', function(pointer) {
            titleMusic.pause();
            this.scene.start("Controls");
        }, this);

        this.about.on('pointerdown', function(pointer) {
            titleMusic.pause();
            this.scene.start("About"); 
        }, this);
    }
}
