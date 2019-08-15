

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
        
        this.bomb1 = this.add.image(game.config.width / 2 - 50, game.config.height / 2, "bomb").setScale(2);
        this.bomb3 = this.add.image(game.config.width / 2, game.config.height / 2, "bomb").setScale(3);
        this.bomb2 = this.add.image(game.config.width / 2 + 50, game.config.height / 2, "bomb");

        this.add.text(game.config.width / 2.5, 20, "Playing Game!", {
            font: "25px Arial",
            fill: "yellow"
        });

        var particles = this.add.particles('bomb');
        
        var trailSpeed = Phaser.Math.Between(0, 3);
        
        var bombSpeed = Phaser.Math.Between(1, 3);
        
        var emitter = particles.createEmitter({
            speed: 30,
            scale: { start: 1, end: 0 },
            blendMode: 'SCREEN'
        });
        
        var emitter2 = particles.createEmitter({
            speed: 20,
            scale: { start: 1, end: 0 },
            blendMode: 'SCREEN'
        }); 
        
        var emitter3 = particles.createEmitter({
            speed: 45,
            scale: { start: 1, end: 0 },
            blendMode: 'SCREEN'
        });

        emitter.startFollow(this.bomb1);
        emitter2.startFollow(this.bomb2);
        emitter3.startFollow(this.bomb3);
    }

    moveBomb(bomb, speed) {
        //sets the bomb object in motion
        bomb.y += speed;

        //if the bomb object reaches the limit of the window height, it calls the reset function
        if (bomb.y > game.config.height) {
            this.resetBombPosition(bomb);
        }
    }

    //allows for continuous stream of bombs to fall
    resetBombPosition(bomb) {
        //sets the y value for the bomb object to 0, based on the window size
        bomb.y = 0;

        //sets a the range of values available on the x axis
        var topX = Phaser.Math.Between(0, game.config.width);

        //sets the bom game object x value to a the topX calculation
        bomb.x = topX;
    }

    update() {
        var bombSpeed = Phaser.Math.Between(1, 3);
        
        //calls the moveBomb function for each bomb on screen. The number assigned relates to a speed value decided by Phaser 
        this.moveBomb(this.bomb1, 1);
        this.moveBomb(this.bomb3, 2);
        this.moveBomb(this.bomb2, 3);

        //this.sky.angle +=3;
        this.sky.tilePositionY -= 0.5;

        this.bomb1.angle += 3;
        this.bomb2.angle += 1;
        this.bomb3.angle += 2;

    }


}
