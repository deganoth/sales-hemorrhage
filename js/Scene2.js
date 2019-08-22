//var particles;
//var emitter;
var player;
var bombs;
var singleBomb;
var cursors;
var controls;

//recives contorl from the primary game created
class Scene2 extends Phaser.Scene {
    constructor() {
        //scene identifier is playGame
        super("playGame");

    }

    create() {

        this.sky = this.add.tileSprite(0, 0, game.config.width, game.config.height, "sky").setDisplaySize(game.config.width, game.config.height);

        //userful for setting offset or pivot at top left of screen. Image picot determined by origin 
        this.sky.setOrigin(0, 0);

        this.makePlayer();

        this.makeBombs();

        this.makeSingleBomb();

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

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 1, end: 1 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 8, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        cursors = this.input.keyboard.createCursorKeys();

        //alternate keys added for controls
        controls = this.input.keyboard.addKeys('W,S,A,D');

        this.physics.add.overlap(player, bombs, this.destroyBomb, null, this);


    }

    update() {
        this.sky.tilePositionY += 0.5;
        this.resetBomb();
        this.resetSingleBomb();

        if (cursors.left.isDown || controls.A.isDown) {
            player.setVelocityX(-400);
            player.anims.play('left', true);
        }
        else if (cursors.right.isDown || controls.D.isDown) {
            player.setVelocityX(400);
            player.anims.play('right', true);
        }
        else {
            player.setVelocityX(0);
            player.anims.play('turn', true);
        }

        if (cursors.up.isDown || controls.W.isDown) {
            player.setVelocityY(-400);
        }
        else if (cursors.down.isDown || controls.S.isDown) {
            player.setVelocityY(400);
        }
        else {
            player.setVelocityY(0);
            //player.anims.play('turn', true);
        }
    }

    makePlayer() {
        player = this.physics.add.sprite(this.scale.width / 5, this.scale.height / 2, 'dude')
            .setDisplaySize(this.scale.height / 14.2, this.scale.height / 10)
            .setInteractive()
            .setCollideWorldBounds(true)
            .setGravityY(15000);
    }

    makeSingleBomb() {
        singleBomb = this.physics.add.group({
            key: 'bomb',
            repeat: 0,
            collideWorldBounds: false
        });

        singleBomb.children.iterate(function(child) {
            child.setVelocityY(Phaser.Math.Between(120, 200))
                .setScale(Phaser.Math.Between(3, 4))
                .setRandomPosition(Phaser.Math.Between(game.config.width / 10, game.config.width / 5), 0, game.config.width, game.config.height)
                .setInteractive();
            child.y = 0;
        });

        this.physics.add.overlap(player, singleBomb, this.destroyBomb, null, this);
    }

    makeBombs() {
        bombs = this.physics.add.group({
            key: 'bomb',
            repeat: 5,
            collideWorldBounds: false
        });

        bombs.children.iterate(function(child) {
            child.setVelocityY(Phaser.Math.Between(120, 200))
                .setScale(Phaser.Math.Between(3, 4))
                .setRandomPosition(Phaser.Math.Between(game.config.width / 10, game.config.width / 5), 0, game.config.width, game.config.height)
                .setInteractive();
            //child.y = 0;
        });

        //this.input.on('gameobjectdown', this.destroyBomb, this);
    }

    resetSingleBomb(bomb) {
        singleBomb.children.iterate(function(child) {
            if (child.y > game.config.height) {
                child.y = 0;
                var respawnX = Phaser.Math.Between(0, game.config.width);
                child.x = respawnX;
            }
        });
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

    destroyBomb(player, bomb) {
        this.makeSingleBomb();
        bomb.disableBody(true, true);
        if (bombs.countActive(true) === 0) {
            bombs.children.iterate(function(child) {
                child.enableBody(true, child.x, 0, true, true)
                    .setVelocityY(Phaser.Math.Between(120, 200))
                    .setRandomPosition(Phaser.Math.Between(game.config.width / 10, game.config.width / 5), 0, game.config.width, game.config.height);
                child.y = 0;
            });
        }
    }

}
