//recives control from the primary game created
class Level1 extends Phaser.Scene {
    constructor() {
        //scene identifier is playGame
        super("Level1");

    }
    create() {
        player = this.physics.add.sprite(game.config.width / 2, game.config.height / 2, 'dude')
            .setDisplaySize(game.config.height / 14.2, game.config.height / 10)
            .setSize(25, 80)
            .setOffset(18, 20)
            .setInteractive()
            .setCollideWorldBounds(true)
            .setDepth(1)
            .setBounce(0.2)

        ground = this.physics.add.group();

        health = this.physics.add.group();

        singleBomb = this.physics.add.group();

        bombs = this.physics.add.group();

        this.makeSky();   

        this.makeGround();

        this.makeBombs();

        this.makeHud();

        this.makeMobileControls();

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
        controls = this.input.keyboard.addKeys('W,S,A,D,P,O');

        this.physics.add.overlap(player, bombs, this.destroyBomb, null, this);
        this.physics.add.overlap(player, singleBomb, this.destroySingleBomb, null, this);
        //this.physics.add.collider(player, ground);
    }

    update() {
        if (!gameOver) {
            //graphics.clear();
            this.updateControls();
            this.resetSky();
            this.resetGround();
            this.resetBomb();
            this.resetSingleBomb();
            this.soulBarText();
            this.gameEnd();
        }
    }

    makeMobileControls() {
        if (this.sys.game.device.input.touch) {

            hudBox = this.add.image(0, game.config.height / 1.18, 'soul')
                .setDisplaySize(game.config.width, 200)
                .setDepth(1)
                .setOrigin(0)
                .setAlpha(0.3);

            j = this.add.sprite(game.config.width / 1.2, game.config.height * 0.925, 'uparrow')
                .setDisplaySize(200, 200)
                .setDepth(2)
                .setInteractive();

            l = this.add.sprite(game.config.width / 6, game.config.height * 0.925, 'leftarrow')
                .setDisplaySize(200, 200)
                .setDepth(2)
                .setInteractive();

            r = this.add.sprite(game.config.width / 2, game.config.height * 0.925, 'rightarrow')
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

    updateControls() {
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

        if(controls.P.isDown){
            this.physics.pause();

        }

        if(controls.O.isDown){
            this.physics.resume(); 
        }

        if (cursors.up.isDown && player.body.touching.down || controls.W.isDown && player.body.touching.down || jump && player.body.touching.down) {
            player.setVelocityY(-800);
        }
    }

    makeSky() {
        skyWall = this.physics.add.group({
            key: 'sky',
            repeat: 6,
            collideWorldBounds: true,
            setXY: {
                //x: game.config.width / 4,
                //y: 0,
                //stepX: game.config.width / 4,
                stepY: game.config.height / 5,
            },
        });

        skyWall.children.iterate(function(child) {
            child
                .setDisplaySize(game.config.width, 280)
                .setDepth(0)
                .setOrigin(1)
                .setImmovable(true)
                .setVelocityY(50);

            child.body.setAllowGravity(false);
        });
    }

    resetSky(sky) {
        skyWall.children.iterate(function(child) {
            if (child.y > game.config.height + 280) {
                child.y = -240;
            }
        });
    }

    makeGround() {
        ground = this.physics.add.group({
            key: 'sales',
            repeat: 2,
            collideWorldBounds: true,
            setXY: {
                x: game.config.width / 4,
                y: game.config.height / 4,
                stepX: game.config.width / 4,
                stepY: game.config.height / 3,
            },
        });

        ground.children.iterate(function(child) {
            child
                
                .setDisplaySize(game.config.width / 1.5, game.config.height / 20)
                .setDepth(1)
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
                .setCircle(6, 1, 1)
                .setGravityY(-500)
                .setVelocity(Phaser.Math.Between(-200, -100), 10)
                .setScale(Phaser.Math.Between(3, 4))
                .setRandomPosition(Phaser.Math.Between(game.config.width / 10, game.config.width / 5), 0, game.config.width, game.config.height)
                .setBounce(0.2)
                .setInteractive();
            child.y = -100;
        });

        this.physics.add.collider(health, ground);
        this.physics.add.collider(health, bombs);
        this.physics.add.overlap(player, health, this.addHealth, null, this);

        if (soulValue <= 350) {
            health = this.physics.add.group({
                key: 'bomb_3',
                repeat: 3,
                collideWorldBounds: true
            });

            health.children.iterate(function(child) {
                child
                    .setCircle(6, 1, 1)
                    .setGravityY(-500)
                    .setVelocity(Phaser.Math.Between(-200, -100), 20)
                    .setScale(Phaser.Math.Between(3, 4))
                    .setRandomPosition(Phaser.Math.Between(game.config.width / 10, game.config.width / 5), 0, game.config.width, game.config.height)
                    .setBounce(0.2)
                    .setInteractive();
                child.y = -100;
            });

            this.physics.add.collider(health, ground);
            this.physics.add.collider(health, bombs);
            this.physics.add.overlap(player, health, this.addHealth, null, this);
        }
    }

    addHealth(player, bomb_3) {
        sales -= 50;
        salesBar.setText('sales:$' + sales);

        soul += 100;
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
                .setCircle(6, 1, 1)
                .setVelocity(Phaser.Math.Between(-300, -100), 20)
                .setScale(Phaser.Math.Between(3, 4))
                .setRandomPosition(Phaser.Math.Between(10, 200), 0, game.config.width, game.config.height)
                .setInteractive()
                .setBounce(0.5);
            child.y = -100;
        });

        this.physics.add.collider(singleBomb, ground);
        this.physics.add.collider(singleBomb, bombs);
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
                .setCircle(6, 1, 1)
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

    soulBarText() {

        if (soul >= 0) {
            soulBar.setText('soul:' + 'healthy');
        }
        else if (soul >= -187.5) {
            soulBar.setText('soul:' + 'not bad');
        }
        else if (soul >= -375) {
            soulBar.setText('soul:' + 'worse');
        }
        else if (soul >= -562.5) {
            soulBar.setText('soul:' + 'much worse');
        }
        else if (soul >= -680) {
            soulBar.setText('soul:' + 'doomed');

        }
    }

    gameEnd() {

        soulValue = soulBarBackground.displayWidth;
        playerY = player.y;

        if (soulValue <= 0 || playerY > game.config.height / 1.18 && this.sys.game.device.input.touch || playerY > game.config.height) {
            this.physics.pause();
            soulBarBackground.setDisplaySize(0, 0);
            gameOver = true;
            this.restartScreen();
        }
        else if (soulValue > 708) {
            soulBarBackground.setDisplaySize(game.config.width / 1.06, game.config.width / 12);
        }

        if (sales >= 10000) {
            this.physics.pause();
            gameWin = true;
            this.gameWinScreen();
        }

    }

    restartScreen() {
        if (gameOver) {

            var deathMessage = [
                "Try Again!",
                "You Almost reached",
                "your target!",
                " ",
                "$" + sales,
                "..."
            ];

            this.add.text(game.config.width / 2, game.config.height / 2.5, deathMessage, )
                .setOrigin(0.5)
                .setStyle({
                    font: "50px Lucida Console",
                    align: "center",
                    fill: "#B4FBFB"
                }).setDepth(4);

            restart = this.add.sprite(game.config.width / 2, game.config.height / 1.7, 'restart')
                .setDisplaySize(200, 200)
                .setInteractive()
                .setDepth(4);

            sky = this.add.image(game.config.width / 2, game.config.height / 2, 'sky')
                .setDisplaySize(game.config.width, game.config.height)
                .setTint(0xc8c8c8)
                .setAlpha(0.9)
                .setDepth(3);

            //when click, the button will restart the current scene, game over will be false
            restart.on('pointerdown', function(pointer) {
                restart.setTintFill(0xffff00, 0xffff00, 0xff0000, 0xff0000);
                this.scene.restart();
                console.log('restart');
                gameOver = false;
                sales = 0;
                soul = 0;
            }, this);
        }
    }

    gameWinScreen() {
        if (gameWin) {

            if (soul >= 0) {
                soulBar.setText('very good');
            }
            else if (soul >= -187.5) {
                soulBar.setText('okay');
            }
            else if (soul >= -375) {
                soulBar.setText('worse');
            }
            else if (soul >= -562.5) {
                soulBar.setText('much worse');
            }
            else if (soul >= -680) {
                soulBar.setText('terrible');
            }

            var victoryMessage = [
                "Congratulations!",
                "You reached your target",
                "Your Soul however,",
                "did",
                soulBar.text,
                "..."
            ];

            this.add.text(game.config.width / 2, game.config.height / 2.5, victoryMessage, )
                .setOrigin(0.5)
                .setStyle({
                    font: "50px Lucida Console",
                    align: "center",
                    fill: "#B4FBFB"
                }).setDepth(4);

            restart = this.add.sprite(game.config.width / 2, game.config.height / 1.7, 'restart')
                .setDisplaySize(200, 200)
                .setInteractive()
                .setDepth(4);

            sky = this.add.image(game.config.width / 2, game.config.height / 2, 'sky')
                .setDisplaySize(game.config.width, game.config.height)
                .setTint(0xc8c8c8)
                .setAlpha(0.9)
                .setDepth(3);

            //when click, the button will restart the current scene, game over will be false
            restart.on('pointerdown', function(pointer) {
                restart.setTintFill(0xffff00, 0xffff00, 0xff0000, 0xff0000);
                this.scene.restart();
                console.log('restart');
                gameWin = false;
                sales = 0;
                soul = 0;
            }, this);
        }
    }
}
