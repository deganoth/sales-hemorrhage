var particles;
var emitter;
var bombs;
var bom;
var boom;

//recives contorl from the primary game created
class Scene2 extends Phaser.Scene {
    constructor() {
        //scene identifier is playGame
        super("playGame");

    }

    create() {

        this.sky = this.add.tileSprite(0, 0, game.config.width, game.config.height, "sky").setDisplaySize(game.config.width, game.config.height);;

        //userful for setting offset or pivot at top left of screen. Image picot determined by origin 
        this.sky.setOrigin(0, 0);

        bom = this.physics.add.sprite(14, 14, "bomb").setVisible(false);

        this.makeBomb();

        //this.explode = this.add.sprite(game.config.width / 2 + 50, game.config.height / 2, "explode");

        this.anims.create({
            key: "bomb_anim",
            frames: this.anims.generateFrameNumbers("bomb"),
            frameRate: 15,
            repeat: -1,
        });

        this.anims.create({
            key: "explode_anim",
            frames: this.anims.generateFrameNumbers("explode"),
            frameRate: 15,
            repeat: 0,
            hideOnComplete: true

        });
    }

    update() {
        this.sky.tilePositionY -= 0.5;

    }

    makeBomb(bombs, bom) {
        
        
        this.bombs = this.physics.add.group();

        var maxBombs = 2;
        for (var i = 0; i <= maxBombs; i++) {
            boom = true;
            bom = this.physics.add.sprite(14, 14, "bomb").setScale(Phaser.Math.Between(2, 5));
            this.bombs.add(bom);
            bom.setRandomPosition(0, 0, game.config.width, game.config.height);
            //bom.setVelocity(10, 100);
            bom.setCollideWorldBounds(true);
            //bom.setBounce(1);
            bom.setInteractive();
            this.input.on('gameobjectdown', this.destroyBomb, this);
        }

        this.bombs.children.iterate(function(child) {
            child.setVelocity(Phaser.Math.Between(50, 100), Phaser.Math.Between(50, 100)).setBounce(Phaser.Math.Between(1, 1.5));
        });
    }

    destroyBomb(pointer, gameObject) {
        gameObject.setTexture("explode");
        gameObject.play("explode_anim");
    }
}
