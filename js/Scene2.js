var particles;
var emitter;
var bombs;
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

        //bom = this.physics.add.sprite(14, 14, "bomb").setScale(3);

        bombs = this.physics.add.group({
            key: 'bomb',
            frameQuantity: 10,
            bounceY: 1,
            collideWorldBounds: false
        });

        bombs.children.iterate(function(child) {
            child.setVelocityY(Phaser.Math.Between(120, 200))
                .setScale(Phaser.Math.Between(2, 4))
                .setRandomPosition(0, 0, game.config.width, game.config.height)
                .setInteractive();
            if (child.y > child.displayHeight) {
                child.y = 0;
                var respawnX = Phaser.Math.Between(0, game.config.width);
                child.x = respawnX;
            }
            //child.input.on('gameobjectdown', child.destroyBomb, child);
        });

        this.input.on('gameobjectdown', this.destroyBomb, this);

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
            hideOnComplete: true,

        });
    }

    update() {
        this.sky.tilePositionY -= 0.5;
        this.resetBomb();
    }

    makeBombs() {
        boom = this.physics.add.sprite(14, 14, "bomb");
    
        boom.setVelocityY(Phaser.Math.Between(120, 200))
        .setScale(Phaser.Math.Between(2, 4))
        .setRandomPosition(0, 0, game.config.width, 0)
        .setInteractive();
    }

    //resets the position of each bomb in the group
    resetBomb(bomb) {
        bombs.children.iterate(function(child) {
            if (child.y > game.config.height) {
                child.y = 0;
                var respawnX = Phaser.Math.Between(0, game.config.width);
                child.x = respawnX;
            }
        });
    }

    destroyBomb(pointer, gameObject) {
        gameObject.setTexture("explode");
        gameObject.play("explode_anim");
        this.makeBombs();
    }
}
