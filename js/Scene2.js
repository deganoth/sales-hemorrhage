//var particles;
//var emitter;
var sky;
var player;
var soulBar;
var ground;
var soulValue;
var salesBar;
var soul = 0;
var soulBarBackground;
var sales = 0;
var health;
var healthShield;
var shieldStart;
var shieldEnd;
var stars;
var bombs;
var singleBomb;
var cursors;
var controls;
var gameOver = false;


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
        ground = this.physics.add.staticImage(game.config.width / 2, game.config.height / 1, 'sales')
            .setDisplaySize(game.config.width, game.config.height / 20)
            .setDepth(1)
            .refreshBody();

        this.makePlayer();

        this.makeHealth();

        this.makeStars();

        this.makeBombs();

        this.makeSingleBomb();

        this.makeHud();

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
        this.physics.add.collider(player, ground);
        //this.physics.add.collider(player, bombs);
        this.physics.add.collider(stars, player);
    }

    update() {
        sky.tilePositionY += 0.5;
        this.resetBomb();
        this.resetSingleBomb();
        this.gameEnd();

        //set's the XY co oridnates for the stars by attaching them to the health object as a shield
        Phaser.Actions.SetXY([healthShield], health.x, health.y);

        //defines the circle start and finish points, along with which object to place on it.
        Phaser.Actions.PlaceOnCircle(
            stars.getChildren(),
            healthShield,
            shieldStart.getValue(),
            shieldEnd.getValue()
        );

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
        /*else if (cursors.down.isDown || controls.S.isDown) {
            player.setVelocityY(400);
        }
        else {
            player.setVelocityY(0);

        }*/
    }

    makePlayer() {
        player = this.physics.add.sprite(game.config.width / 2, game.config.height / 1.1, 'dude')
            .setDisplaySize(game.config.height / 14.2, game.config.height / 10)
            .setInteractive()
            .setCollideWorldBounds(true)
            .setGravityY(4000);
    }

    makeHealth() {
        health = this.physics.add.sprite(game.config.width / 2, game.config.height / 1.1, 'bomb_3')
            .setVelocityY(Phaser.Math.Between(120, 200))
            .setScale(Phaser.Math.Between(3, 4))
            .setRandomPosition(Phaser.Math.Between(game.config.width / 10, game.config.width / 5), 0, game.config.width, game.config.height)
            .setInteractive();
        health.y = 0;
    }

    makeStars() {
        stars = this.physics.add.group({
            key: 'star',
            repeat: 7,
            collideWorldBounds: false
        });

        stars.children.iterate(function(child) {
            child
                .setScale(2)
                //.setRandomPosition(Phaser.Math.Between(game.config.width / 10, game.config.width / 5), 0, game.config.width, game.config.height)
                .setInteractive();
            child.y = 0;
        });

        healthShield = new Phaser.Geom.Circle(health.x, health.y, 60);

        //starts 
        shieldStart = this.tweens.addCounter({
            from: 0,
            to: 10,
            duration: 5000,
            repeat: -1,
            //yoyo: true
        });

        shieldEnd = this.tweens.addCounter({
            from: 10,
            to: 20,
            duration: 5000,
            repeat: -1,
            //yoyo: true
        });

        //this.physics.add.collider(stars, bombs);
    }

    makeSingleBomb() {
        singleBomb = this.physics.add.group({
            key: 'bomb_2',
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


        this.physics.add.overlap(player, singleBomb, this.destroySingleBomb, null, this);
    }

    resetSingleBomb(bomb_2) {
        singleBomb.children.iterate(function(child) {
            if (child.y > game.config.height) {
                child.y = 0;
                var respawnX = Phaser.Math.Between(0, game.config.width);
                child.x = respawnX;
            }
        });
    }

    destroySingleBomb(player, bomb_2, bomb) {

        sales += 100;
        salesBar.setText('sales:$' + sales);

        soul -= 25;
        soulBar.setText('soul:' + soul);
        soulBarBackground.setDisplaySize((game.config.width / 1.06) + soul, game.config.width / 12)

        bomb_2.disableBody(true, true);
        if (singleBomb.countActive(true) === 0) {
            singleBomb.children.iterate(function(child) {
                child.enableBody(true, child.x, 0, true, true)
                    .setVelocityY(Phaser.Math.Between(120, 200))
                    .setRandomPosition(Phaser.Math.Between(game.config.width / 10, game.config.width / 5), 0, game.config.width, game.config.height);
                child.y = 0;
            });
        }
    }

    makeBombs() {
        bombs = this.physics.add.group({
            key: 'bomb',
            repeat: 7,
            collideWorldBounds: false
        });

        bombs.children.iterate(function(child) {
            child.setVelocityY(Phaser.Math.Between(120, 200))
                .setScale(Phaser.Math.Between(3, 4))
                .setRandomPosition(Phaser.Math.Between(game.config.width / 10, game.config.width / 5), 0, game.config.width, game.config.height)
                .setInteractive();
            child.y = 0;
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

        sales += 50;
        salesBar.setText('sales:$' + sales);

        soul -= 5;
        soulBar.setText('soul:' + soul);
        soulBarBackground.setDisplaySize((game.config.width / 1.06) + soul, game.config.width / 12);

        bomb.disableBody(true, true);
        if (bombs.countActive(true) === 0) {
            bombs.children.iterate(function(child) {
                child.enableBody(true, child.x, 0, true, true)
                    .setVelocityY(Phaser.Math.Between(120, 200))
                    .setRandomPosition(Phaser.Math.Between(game.config.width / 10, game.config.width / 5), 0, game.config.width, game.config.height);
                child.y = 0;
            });
            this.makeHealth();
        }
    }

    makeHud() {
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

        //console.log(soulValue);
        if (soulValue <= 0) {
            this.physics.pause();
            this.anims.remove('left');
            this.anims.remove('right');
            gameOver = true;
        }

    }
}
