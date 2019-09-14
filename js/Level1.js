//recives control from the primary game created
class Level1 extends Phaser.Scene {
    constructor() {
        //scene identifier is playGame
        super("Level1");
    }

    create() {

        levelOneMusic = this.sound.add('playing')
            
        levelOneMusic.play({
            volume: .3,
            loop: true
        });

        player = this.physics.add.sprite(game.config.width / 1.6, game.config.height / 2.8, 'dude')
            .setDisplaySize(game.config.height / 14.2, game.config.height / 10)
            .setSize(25, 80)
            .setOffset(18, 20)
            .setInteractive()
            .setCollideWorldBounds(true)
            .setDepth(1)
            .setBounce(0.2)

        dollar = this.add.sprite(-100, -100, 'dollar')
            .setDepth(4);

        boost = this.add.sprite(-100, -100, 'boost')
            .setDepth(4);

        ground = this.physics.add.group();

        health = this.physics.add.group();

        richCustomer = this.physics.add.group();

        cheapCustomer = this.physics.add.group();

        this.makeSky();   

        this.makeGround();

        this.makeCheapCustomer();

        this.makeRichCustomer();

        this.makeHud();

        this.makeMobileControls();

        this.makeAnimations();

        cursors = this.input.keyboard.createCursorKeys();

        //alternate keys added for controls
        controls = this.input.keyboard.addKeys('W,S,A,D,P,O');

        this.physics.add.overlap(player, cheapCustomer, this.destroyCheapCustomer, null, this);
        this.physics.add.overlap(player, richCustomer, this.destroyRichCustomer, null, this);
        this.physics.add.collider(player, ground);
        this.physics.add.collider(cheapCustomer, cheapCustomer);
    }

    update() {
        if (!gameOver) {
            this.updateControls();
            this.updateControlsCheapCustomer();
            this.updateControlsRichCustomer();
            this.resetSky();
            this.resetGround();
            this.resetCheapCustomer();
            this.resetRichCustomer();
            this.soulBarText();
            this.gameEnd();
        }
    }

    makeAnimations(){

        //health animations
         this.anims.create({
            key: "energy_anim",
            frames: this.anims.generateFrameNumbers("energy", { start: 0, end: 3}),
            frameRate: 15,
            repeat: -1,
        });

        this.anims.create({
            key: "health_collect",
            frames: this.anims.generateFrameNumbers("boost", { start: 0, end: 5}),
            frameRate: 15,
            repeat: 0,
            hideOnComplete: true,
        });

        //dollar animations
        this.anims.create({
            key: "money_collect",
            frames: this.anims.generateFrameNumbers("dollar", { start: 0, end: 5}),
            frameRate: 15,
            repeat: 0,
            hideOnComplete: true,
        });

        //player animations
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

        //cheap customer animations
         this.anims.create({
            key: 'left_customer',
            frames: this.anims.generateFrameNumbers('bum', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn_customer',
            frames: [{ key: 'bum', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right_customer',
            frames: this.anims.generateFrameNumbers('bum', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        //rich customer animations
        this.anims.create({
            key: 'left_customer_rich',
            frames: this.anims.generateFrameNumbers('fatcat', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn_customer_rich',
            frames: [{ key: 'fatcat', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right_customer_rich',
            frames: this.anims.generateFrameNumbers('fatcat', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
    }

    makeMobileControls() {
        if (this.sys.game.device.input.touch) {

            hudBox = this.add.image(0, game.config.height / 1.18, 'soul')
                .setDisplaySize(game.config.width, 200)
                .setDepth(0)
                .setOrigin(0)
                .setAlpha(0);

            l = this.add.sprite(game.config.width / 6, game.config.height/2, 'leftarrow')
                .setDisplaySize(game.config.width/3, game.config.height)
                .setDepth(0)
                .setAlpha(0.0001)
                .setInteractive();

            j = this.add.sprite(game.config.width / 2, game.config.height/2, 'uparrow')
                .setDisplaySize(game.config.width/3, game.config.height)
                .setDepth(2)
                .setAlpha(0.0001)
                .setInteractive();

            r = this.add.sprite(game.config.width / 1.2, game.config.height/2, 'rightarrow')
                .setDisplaySize(game.config.width/3, game.config.height)
                .setDepth(2)
                .setAlpha(0.0001)
                .setInteractive();

            //provides left function for up arrow display button
            l.on('pointerdown', function(pointer) {
                left = true;
            }, this);   

            //provides jump function for up arrow display button

            j.on('pointerdown', function(pointer) {
                jump = true;
            }, this);

            //provides right function for up arrow display button
            r.on('pointerdown', function(pointer) {
                right = true;
            }, this);

            //disengages function when any of the buttons are not being engaged
            j.on('pointerup', function(pointer) {
                jump = false;
            }, this);

            l.on('pointerup', function(pointer) {
                left = false;
            }, this);

            r.on('pointerup', function(pointer) {
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

    updateControlsCheapCustomer(bum){
        cheapCustomer.children.iterate(function(child) {
                if(child.body.touching.down && cursors.left.isDown || child.body.touching.down && controls.A.isDown || child.body.touching.down && left){
                    child.setVelocityX(200);
                    child.anims.play('right_customer', true);
                }
                else if(child.body.touching.down && cursors.right.isDown || child.body.touching.down && controls.D.isDown || child.body.touching.down && right){
                    child.setVelocityX(-200);
                    child.anims.play('left_customer', true);
                }

                if (cursors.up.isDown && child.body.touching.down || controls.W.isDown && child.body.touching.down || jump && child.body.touching.down) {
                    child.setVelocityY(-300);
                }
            });
    }

    updateControlsRichCustomer(){
        richCustomer.children.iterate(function(child) {
                if(child.body.touching.down && cursors.left.isDown || child.body.touching.down && controls.A.isDown || child.body.touching.down && left){
                    child.setVelocityX(400);
                    child.anims.play('right_customer_rich', true);
                }
                else if(child.body.touching.down && cursors.right.isDown || child.body.touching.down && controls.D.isDown || child.body.touching.down && right){
                    child.setVelocityX(-400);
                    child.anims.play('left_customer_rich', true);
                }

                if (cursors.up.isDown && child.body.touching.down || controls.W.isDown && child.body.touching.down || jump && child.body.touching.down) {
                    child.setVelocityY(-200);
                }
            });
    }

    makeSky() {
        skyWall = this.physics.add.group({
            key: 'sky',
            repeat: 4,
            collideWorldBounds: true,
            setXY: {
                y: -(game.config.height / 3),
                stepY: game.config.height / 3,
            },
        });

        skyWall.children.iterate(function(child) {
            child
                .setDisplaySize(game.config.width, game.config.height / 2.8)
                .setDepth(0)
                .setImmovable(true)
                .setVelocityY(50);

            child.body.setAllowGravity(false);
        });
    }

    resetSky(sky) {
        skyWall.children.iterate(function(child) {
            if (child.y > game.config.height + (game.config.height / 3)) {
                child.y = -(game.config.height / 3);
            }
        });
    }

    makeGround() {
        ground = this.physics.add.group({
            key: 'ground',
            repeat: 4,
            collideWorldBounds: true,
            setXY: {
                x: game.config.width / 4,
                y: -(game.config.height / 3),
                stepX: game.config.width / 8.5,
                stepY: game.config.height / 3,
            },
        });

        ground.children.iterate(function(child) {
            child
                .setDisplaySize(game.config.width / 1.6, game.config.height / 3)
                .setSize(310, 30)
                .setOffset(0, 180)
                .setDepth(1)
                .setImmovable(true)
                .setVelocityY(100);
            child.body.setAllowGravity(false);
        });

        this.physics.add.collider(player, ground);
    }

    resetGround(sales) {
        ground.children.iterate(function(child) {
            if (child.y > game.config.height + (game.config.height / 3)) {
                child.y = -(game.config.height / 3);
            }
        });
    }

    makeEnergy() {
        health = this.physics.add.group({
            key: 'energy',
            repeat: 0,
            collideWorldBounds: true
        });

        health.children.iterate(function(child) {
            child
                .setDisplaySize(game.config.height / 14.2, game.config.height / 10)
                .setSize(30, 60)
                .setOffset(18, 20)
                .setGravityY(-500)
                .setVelocity(Phaser.Math.Between(-200, -100), 10)
                .setRandomPosition(Phaser.Math.Between(game.config.width / 10, game.config.width / 5), 0, game.config.width, game.config.height)
                .setBounce(0.5)
                .setInteractive();
            child.y = -100;
            child.anims.play('energy_anim', true);
        });

        this.physics.add.collider(health, ground);
        this.physics.add.collider(health, cheapCustomer);
        this.physics.add.overlap(player, health, this.addEnergy, null, this);

        if (soulValue <= 350) {
            health = this.physics.add.group({
                key: 'energy',
                repeat: 3,
                collideWorldBounds: true
            });

            health.children.iterate(function(child) {
                child
                    .setDisplaySize(game.config.height / 14.2, game.config.height / 10)
                    .setSize(25, 80)
                    .setOffset(18, 20)
                    .setGravityY(-500)
                    .setVelocity(Phaser.Math.Between(-200, -100), 20)
                    .setRandomPosition(Phaser.Math.Between(game.config.width / 10, game.config.width / 5), 0, game.config.width, game.config.height)
                    .setBounce(0.5)
                    .setInteractive();
                child.y = -100;
                child.anims.play('energy_anim', true);
            });

            this.physics.add.collider(health, ground);
            this.physics.add.collider(health, cheapCustomer);
            this.physics.add.overlap(player, health, this.addEnergy, null, this);
        }
    }

    addEnergy(player, energy) {

        boost.x = energy.x;
        boost.y = energy.y;
        boost.anims.play("health_collect", true);

        boost = this.add.sprite(-100, -100, 'boost')
            .setDepth(4);

        this.sound.play(Phaser.Math.RND.pick﻿([
            'coffee_one', 
            'coffee_two', 
            'coffee_three', 
            'coffee_four'
            ]
        ));

        sales -= 50;
        salesBar.setText('sales:$' + sales);

        soul += 100;
        soulBarBackground.setDisplaySize((game.config.width / 1.06) + soul, game.config.width / 12)

        energy.disableBody(true, true);
    }

    makeRichCustomer() {
        richCustomer = this.physics.add.group({
            key: 'fatcat',
            repeat: Phaser.Math.Between(0, 3),
            collideWorldBounds: true
        });

        richCustomer.children.iterate(function(child) {
            child
                .setDisplaySize(game.config.height / 14.2, game.config.height / 10)
                .setSize(25, 80)
                .setOffset(18, 20)
                .setCollideWorldBounds(true)
                .setVelocity(Phaser.Math.Between(-300, -100), 20)
                .setRandomPosition(Phaser.Math.Between(10, 200), 0, game.config.width, game.config.height)
                .setInteractive()
                .setBounce(0.2);
            child.y = -100;
        });

        this.physics.add.collider(richCustomer, ground);
        this.physics.add.collider(richCustomer, cheapCustomer);
        this.physics.add.overlap(player, richCustomer, this.destroyRichCustomer, null, this);

    }

    resetRichCustomer(fatcat) {
        richCustomer.children.iterate(function(child) {
            if (child.y > game.config.height) {
                child.y = -100;
                var respawnX = Phaser.Math.Between(0, game.config.width);
                child.x = respawnX;
            }
        });
    }

    destroyRichCustomer(player, fatcat) {

        dollar.x = fatcat.x;
        dollar.y = fatcat.y;
        dollar.anims.play("money_collect", true);

        dollar = this.add.sprite(-100, -100, 'dollar')
            .setDepth(4);

        this.sound.play(Phaser.Math.RND.pick﻿([
            'rich_one', 
            'rich_two', 
            'rich_three', 
            'rich_four'
            ]
        ));

        sales += bigSale;
        salesBar.setText('sales:$' + sales);

        soul -= bigValue;
        soulBarBackground.setDisplaySize((game.config.width / 1.06) + soul, game.config.width / 12)

        fatcat.disableBody(true, true);

        if (richCustomer.countActive(true) === 0) {
            richCustomer.children.iterate(function(child) {
                child.enableBody(true, child.x, 0, true, true)
                    .setVelocity(Phaser.Math.Between(-200, 200), 20)
                    .setRandomPosition(Phaser.Math.Between(game.config.width / 10, game.config.width / 5), 0, game.config.width, game.config.height);
                child.y = -100;
            });
        }

    }

    makeCheapCustomer() {
        cheapCustomer = this.physics.add.group({
            key: 'bum',
            repeat: 7,
            collideWorldBounds: true
        });

        cheapCustomer.children.iterate(function(child) {
            child
                .setDisplaySize(game.config.height / 14.2, game.config.height / 10)
                .setSize(25, 80)
                .setOffset(18, 20)
                .setCollideWorldBounds(true)
                .setVelocity(Phaser.Math.Between(-200, 200), 20)
                .setRandomPosition(Phaser.Math.Between(game.config.width / 10, game.config.width / 5), 0, game.config.width, game.config.height)
                .setBounce(0.2)
                .setInteractive();
            child.y = -100;
        });

        this.physics.add.collider(cheapCustomer, ground);

    }

    //resets the position of each cheap customer in the group
    resetCheapCustomer(bum) {
        cheapCustomer.children.iterate(function(child) {
            if (child.y > game.config.height) {
                child.y = -100;
                var respawnX = Phaser.Math.Between(0, game.config.width);
                child.x = respawnX;
            }
        });

    }

    destroyCheapCustomer(player, bum) {

        dollar.x = bum.x;
        dollar.y = bum.y;
        dollar.anims.play("money_collect", true);

        dollar = this.add.sprite(-100, -100, 'dollar')
            .setDepth(4);

        this.sound.play(Phaser.Math.RND.pick﻿([
            'cheap_one', 
            'cheap_two', 
            'cheap_three', 
            'cheap_four'
            ]
        ));

        sales += regularSale;
        salesBar.setText('sales:$' + sales);

        soul -= smallValue;
        soulBarBackground.setDisplaySize((game.config.width / 1.06) + soul, game.config.width / 12);

        bum.disableBody(true, true);
        if (cheapCustomer.countActive(true) === 0) {
            cheapCustomer.children.iterate(function(child) {
                child.enableBody(true, child.x, 0, true, true)
                    .setVelocity(Phaser.Math.Between(-200, 200), 20)
                    .setRandomPosition(Phaser.Math.Between(game.config.width / 10, game.config.width / 5), 0, game.config.width, game.config.height);
                child.y = -100;
            });
            this.makeEnergy();

        }
    }

    makeHud() {

        hudBox = this.physics.add.image(0, 0, 'background')
            .setDisplaySize(game.config.width, game.config.width / 6)
            .setDepth(1)
            .setOrigin(0)
            
            .setImmovable(true);
        hudBox.body.setAllowGravity(false);

        this.physics.add.collider(player, hudBox);

        energyBar = this.add.bitmapText(20, 0, 'subTitle', 'energy: ', 60, 1)
            .setDepth(2)
            .setOrigin(0); 

        soulBarBackground = this.add.image(20, 0, 'soul')
            .setDisplaySize(game.config.width / 1.06, game.config.width / 12)
            .setAlpha(0.6)
            .setDepth(1)
            .setOrigin(0);

        salesBar = this.add.bitmapText(20, 60, 'subTitle', 'sales: $ ', 60, 1)
            .setDepth(2)
            .setOrigin(0); 
    }

    soulBarText() {

        if (soul >= 0) {
            energyBar.setText('energy:' + 'very good');
        }
        else if (soul >= -187.5) {
            energyBar.setText('energy:' + 'okay');
        }
        else if (soul >= -375) {
            energyBar.setText('energy:' + 'worse');
        }
        else if (soul >= -562.5) {
            energyBar.setText('energy:' + 'much worse');
        }
        else if (soul >= -680) {
            energyBar.setText('energy:' + 'terrible');

        }
    }

    gameEnd() {
        soulValue = soulBarBackground.displayWidth;
        playerY = player.y;

        if (soulValue <= 0 || playerY > game.config.height) {
            this.tweens.add({
                targets:  levelOneMusic,
                volume:   0,
                duration: 500
            });
            this.physics.pause();
            soulBarBackground.setDisplaySize(0, 0);
            gameOver = true;
            this.restartScreen();
        }
        else if (soulValue > 708) {
            soulBarBackground.setDisplaySize(game.config.width / 1.06, game.config.width / 12);
        }

        if (sales >= targetChoice) {

            this.tweens.add({
                targets:  levelOneMusic,
                volume:   0,
                duration: 500
            });
    
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

            this.backgroundBlack = this.add.sprite(game.config.width / 2, game.config.height / 2, 'background')
                .setDepth(3)
                .setInteractive();

            this.add.bitmapText(game.config.width / 2, game.config.height/3, 'subTitle', deathMessage, 60, 1)
                .setOrigin(0.5)
                .setDepth(4);

            restart = this.add.sprite(game.config.width / 2, game.config.height / 2, 'restart')
                .setScale(1.5)
                .setInteractive()
                .setDepth(4);

             menu = this.add.sprite(game.config.width / 2, game.config.height / 1.6, 'menu')
                .setScale(1.5)
                .setInteractive()
                .setDepth(4);

            //when click, the button will restart the current scene, game over will be false
            restart.on('pointerdown', function(pointer) {
                this.scene.restart();
                gameOver = false;
                sales = 0;
                soul = 0;
            }, this);

            menu.on('pointerdown', function(pointer){
                levelOneMusic.stop();
                this.scene.start("Title");
            }, this);
        }
    }

    gameWinScreen() {
        if (gameWin) {

            if (soul >= 0) {
                energyBar.setText('very good');
            }
            else if (soul >= -187.5) {
                energyBar.setText('okay');
            }
            else if (soul >= -375) {
                energyBar.setText('worse');
            }
            else if (soul >= -562.5) {
                energyBar.setText('much worse');
            }
            else if (soul >= -680) {
                energyBar.setText('terrible');
            }

            var victoryMessage = [
                "Congratulations!",
                "You reached your target",
                "Your Soul however,",
                "did",
                energyBar.text,
                "..."
            ];

            this.backgroundBlack = this.add.sprite(game.config.width / 2, game.config.height / 2, 'background')
                .setDepth(3)
                .setInteractive();

            this.add.bitmapText(game.config.width / 2, game.config.height/3, 'subTitle', victoryMessage, 60, 1)
                .setOrigin(0.5)
                .setDepth(4);

            restart = this.add.sprite(game.config.width / 2, game.config.height / 2, 'restart')
                .setScale(1.5)
                .setInteractive()
                .setDepth(4);

             menu = this.add.sprite(game.config.width / 2, game.config.height / 1.6, 'menu')
                .setScale(1.5)
                .setInteractive()
                .setDepth(4);

            //when click, the button will restart the current scene, game over will be false
            restart.on('pointerdown', function(pointer) {
                this.scene.restart();
                gameWin = false;
                sales = 0;
                soul = 0;
            }, this);

             menu.on('pointerdown', function(pointer){
                levelOneMusic.stop();
                this.scene.start("Title");
            }, this);
        }
    }
}
