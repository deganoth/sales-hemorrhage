//var particles;
//var emitter;
var sky;
var player;
var playerY;
var jump = false;
var left = false;
var right = false;
var j;
var l;
var r;
var soulBar;
var ground;
var hudBox;
var soulValue;
var salesBar;
var soul = 0;
var soulBarBackground;
var sales = 0;
var health;
var bombs;
var singleBomb;
var cursors;
var controls;
var gameOver = false;
var restart;

//recives contorl from the primary game created
class Scene2 extends Phaser.Scene {
    constructor() {
        //scene identifier is playGame
        super("playGame");

    }
    create() {

        sky = this.add.tileSprite(0, 0, game.config.width, game.config.height, "sky")
            .setDisplaySize(game.config.width, game.config.height)
            //userful for setting offset or pivot at top left of screen. Image picot determined by origin 
            .setOrigin(0, 0);

        //moving ground object to simulate a moving tower
        /*ground = this.physics.add.sprite(game.config.width / 4, game.config.height / 1, 'sales')
            .setDisplaySize(game.config.width / 2, game.config.height / 20)
            .setDepth(1)
            .setImmovable(true)
            .setVelocityY(-200);

        ground.body.setAllowGravity(false);*/



        player = this.physics.add.sprite(game.config.width / 2, game.config.height / 3.5, 'dude')
            .setDisplaySize(game.config.height / 14.2, game.config.height / 10)
            .setInteractive()
            .setCollideWorldBounds(true)
            .setBounce(0.2);

        ground = this.physics.add.group();

        health = this.physics.add.group();

        singleBomb = this.physics.add.group();

        bombs = this.physics.add.group();

        this.makeGround();

        this.makeBombs();

        this.makeHud();

        this.makeControls();

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
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
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
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        cursors = this.input.keyboard.createCursorKeys();

        //alternate keys added for controls
        controls = this.input.keyboard.addKeys('W,S,A,D');

        this.physics.add.overlap(player, bombs, this.destroyBomb, null, this);
        this.physics.add.overlap(player, singleBomb, this.destroySingleBomb, null, this);
        //this.physics.add.collider(player, ground);
    }

    update() {
        if (!gameOver) {
            //this.makeControls();
            sky.tilePositionY -= 0.5;
            this.resetGround();
            this.resetBomb();
            this.resetSingleBomb();
            this.gameEnd();

            if (cursors.left.isDown || controls.A.isDown || left) {
                player.setVelocityX(-500);
                player.anims.play('left', true);
            }
            else if (cursors.right.isDown || controls.D.isDown || right) {
                player.setVelocityX(500);
                player.anims.play('right', true);
            }
            else {
                player.setVelocityX(0);
                player.anims.play('turn', true);
            }

            if (cursors.up.isDown && player.body.touching.down || controls.W.isDown && player.body.touching.down || jump && player.body.touching.down) {
                player.setVelocityY(-800);
            }
            /*else if (cursors.down.isDown || controls.S.isDown) {
                player.setVelocityY(400);
            }
            else {
                player.setVelocityY(0);

            }*/
        }
    }

    makeControls() {
        if (this.sys.game.device.input.touch) {

            hudBox = this.add.image(0, game.config.height / 1.18, 'soul')
                .setDisplaySize(game.config.width, 200)
                .setDepth(1)
                .setOrigin(0)
                .setAlpha(0.3);

            j = this.add.sprite(game.config.width / 2, game.config.height * 0.925, 'uparrow')
                .setDisplaySize(200, 200)
                .setDepth(2)
                .setInteractive();

            l = this.add.sprite(game.config.width / 6, game.config.height * 0.925, 'leftarrow')
                .setDisplaySize(200, 200)
                .setDepth(2)
                .setInteractive();

            r = this.add.sprite(game.config.width / 1.2, game.config.height * 0.925, 'rightarrow')
                .setDisplaySize(200, 200)
                .setDepth(2)
                .setInteractive();

            //provides jump function for up arrow display button
            j.on('pointerdown', function(pointer) {
                j.setTintFill(0xffff00, 0xffff00, 0xff0000, 0xff0000);
                jump = true;
                console.log("jump");
            }, this);

            //provides left function for up arrow display button
            l.on('pointerdown', function(pointer) {
                l.setTintFill(0xffff00, 0xffff00, 0xff0000, 0xff0000);
                left = true;
                console.log("left");
            }, this);

            //provides right function for up arrow display button
            r.on('pointerdown', function(pointer) {
                r.setTintFill(0xffff00, 0xffff00, 0xff0000, 0xff0000);
                right = true;
                console.log("right");
            }, this);

            //disengages function when any of the buttons are not being engaged
            j.on('pointerup', function(pointer) {
                j.clearTint();
                jump = false;
            }, this);

            l.on('pointerup', function(pointer) {
                l.clearTint();
                left = false;
            }, this);

            r.on('pointerup', function(pointer) {
                r.clearTint();
                right = false;
            }, this);
        }
    }

    makeGround() {
        ground = this.physics.add.group({
            key: 'sales',
            repeat: 2,
            collideWorldBounds: true,
            setXY: {
                x: game.config.width / 4,
                y: game.config.height / 4,
                stepX: game.config.width / 5,
                stepY: game.config.height / 3,
            },
        });

        ground.children.iterate(function(child) {
            child
                //.setX(Phaser.Math.Between(30, 50))
                .setDisplaySize(game.config.width / 1.5, game.config.height / 20)
                .setDepth(1)
                //.setOrigin(0)
                .setImmovable(true)
                .setVelocityY(100);

            child.body.setAllowGravity(false);
        });

        this.physics.add.collider(player, ground);
    }

    resetGround(sales) {
        ground.children.iterate(function(child) {
            if (child.y > game.config.height) {
                child.y = 0;
                //var respawnX = Phaser.Math.Between(0, game.config.width);
                //ground.x = respawnX;
            }
        });
    }

    makeHealth() {
        health = this.physics.add.group({
            key: 'bomb_3',
            repeat: 0,
            collideWorldBounds: true

        });

        health.children.iterate(function(child) {
            child
                .setGravityY(-500)
                .setVelocity(Phaser.Math.Between(-200, -100), 20)
                .setScale(Phaser.Math.Between(3, 4))
                .setRandomPosition(Phaser.Math.Between(game.config.width / 10, game.config.width / 5), 0, game.config.width, game.config.height)
                .setBounce(0.8)
                .setInteractive();
            child.y = -100;
        });

        this.physics.add.collider(health, ground);
        this.physics.add.overlap(player, health, this.addHealth, null, this);

        if (soulValue <= 350) {
            health = this.physics.add.group({
                key: 'bomb_3',
                repeat: 3,
                collideWorldBounds: true
            });

            health.children.iterate(function(child) {
                child
                    .setGravityY(-500)
                    .setVelocity(Phaser.Math.Between(-200, -100), 20)
                    .setScale(Phaser.Math.Between(3, 4))
                    .setRandomPosition(Phaser.Math.Between(game.config.width / 10, game.config.width / 5), 0, game.config.width, game.config.height)
                    .setBounce(0.8)
                    .setInteractive();
                child.y = -100;
            });

            this.physics.add.collider(health, ground);
            this.physics.add.overlap(player, health, this.addHealth, null, this);
        }
    }

    addHealth(player, bomb_3) {
        sales -= 20;
        salesBar.setText('sales:$' + sales);

        soul += 100;
        soulBar.setText('soul:' + soul);
        soulBarBackground.setDisplaySize((game.config.width / 1.06) + soul, game.config.width / 12)

        bomb_3.disableBody(true, true);
    }

    makeSingleBomb() {
        singleBomb = this.physics.add.group({
            key: 'bomb_2',
            repeat: 0,
            collideWorldBounds: true
        });

        singleBomb.children.iterate(function(child) {
            child
                .setVelocity(Phaser.Math.Between(-200, -100), 20)
                .setScale(Phaser.Math.Between(3, 4))
                .setRandomPosition(Phaser.Math.Between(10, 200), 0, game.config.width, game.config.height)
                .setInteractive()
                .setBounce(0.5);
            child.y = -100;
        });

        this.physics.add.collider(singleBomb, ground);
        this.physics.add.overlap(player, singleBomb, this.destroySingleBomb, null, this);

    }

    resetSingleBomb(bomb_2) {
        singleBomb.children.iterate(function(child) {
            if (child.y > game.config.height) {
                child.y = -100;
                var respawnX = Phaser.Math.Between(0, game.config.width);
                child.x = respawnX;
            }
        });
    }

    destroySingleBomb(player, bomb_2) {

        sales += 100;
        salesBar.setText('sales:$' + sales);

        soul -= 25;
        soulBar.setText('soul:' + soul);
        soulBarBackground.setDisplaySize((game.config.width / 1.06) + soul, game.config.width / 12)

        bomb_2.disableBody(true, true);
        if (singleBomb.countActive(true) === 0) {
            singleBomb.children.iterate(function(child) {
                child.enableBody(true, child.x, 0, true, true)
                    .setVelocity(Phaser.Math.Between(-200, 200), 20)
                    .setRandomPosition(Phaser.Math.Between(game.config.width / 10, game.config.width / 5), 0, game.config.width, game.config.height);
                child.y = -100;
            });
        }
    }

    makeBombs() {
        bombs = this.physics.add.group({
            key: 'bomb',
            repeat: 7,
            collideWorldBounds: true
        });

        bombs.children.iterate(function(child) {
            child
                .setVelocity(Phaser.Math.Between(-200, 200), 20)
                .setScale(Phaser.Math.Between(3, 4))
                .setRandomPosition(Phaser.Math.Between(game.config.width / 10, game.config.width / 5), 0, game.config.width, game.config.height)
                .setBounce(0.5)
                .setInteractive();
            child.y = -100;
        });

        this.physics.add.collider(bombs, ground);

    }

    //resets the position of each bomb in the group
    resetBomb(bomb) {
        bombs.children.iterate(function(child) {
            if (child.y > game.config.height) {
                child.y = -100;
                var respawnX = Phaser.Math.Between(0, game.config.width);
                child.x = respawnX;
            }
        });
    }

    destroyBomb(player, bomb) {
        this.makeSingleBomb();

        sales += 50;
        salesBar.setText('sales:$' + sales);

        soul -= 5;
        soulBar.setText('soul:' + soul);
        soulBarBackground.setDisplaySize((game.config.width / 1.06) + soul, game.config.width / 12);

        bomb.disableBody(true, true);
        if (bombs.countActive(true) === 0) {
            bombs.children.iterate(function(child) {
                child.enableBody(true, child.x, 0, true, true)
                    .setVelocity(Phaser.Math.Between(-200, 200), 20)
                    .setRandomPosition(Phaser.Math.Between(game.config.width / 10, game.config.width / 5), 0, game.config.width, game.config.height);
                child.y = -100;
            });
            this.makeHealth();
        }
    }

    makeHud() {
        hudBox = this.physics.add.image(0, 0, 'soul')
            .setDisplaySize(game.config.width, game.config.width / 6)
            .setDepth(1)
            .setOrigin(0)
            .setAlpha(0.3)
            .setImmovable(true);
        hudBox.body.setAllowGravity(false);

        this.physics.add.collider(player, hudBox);


        soulBar = this.add.text(20, 0, 'soul:')
            .setDepth(2)
            .setStyle({
                fontSize: game.config.width / 12,
                fill: '#fff',
                //backgroundColor: '#FF0000'
            })
            .setOrigin(0);

        soulBarBackground = this.add.image(20, 0, 'soul')
            .setDisplaySize(game.config.width / 1.06, game.config.width / 12)
            .setDepth(1)
            .setOrigin(0);

        salesBar = this.add.text(20, 60, 'sales:$0')
            .setDepth(1)
            .setStyle({
                fontSize: game.config.width / 12,
                fill: '#000',
                backgroundColor: '#68FF75',
            })
            .setOrigin(0);
    }

    gameEnd() {

        soulValue = soulBarBackground.displayWidth;
        playerY = player.y;

        if (soulValue <= 0 || playerY > game.config.height / 1.18 && this.sys.game.device.input.touch || playerY > game.config.height) {
            this.physics.pause();
            soulBarBackground.setDisplaySize(0, 0);
            gameOver = true;
            soul = 0;
            sales = 0;
            this.restartScreen();
        }
        else if (soulValue > 708) {
            soulBarBackground.setDisplaySize(game.config.width / 1.06, game.config.width / 12);
            soul = 0;
            sales = 0;
            this.restartScreen();
        }

    }

    restartScreen() {
        if (gameOver) {
            restart = this.add.sprite(game.config.width / 2, game.config.height / 2, 'restart')
                .setDisplaySize(200, 200)
                .setInteractive()
                .setDepth(3);

            sky = this.add.image(game.config.width / 2, game.config.height / 2, 'sky')
                .setDisplaySize(game.config.width, game.config.height)
                .setTint(0xc8c8c8)
                .setAlpha(0.5)
                .setDepth(3);

            //when click, the button will restart the current scene, game over will be false
            restart.on('pointerdown', function(pointer) {
                restart.setTintFill(0xffff00, 0xffff00, 0xff0000, 0xff0000);
                this.scene.restart();
                console.log('restart');
                gameOver = false;
            }, this);
        }
    }
}
