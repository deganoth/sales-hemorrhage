//recives contorl from the primary game created
class Scene2 extends Phaser.Scene {
    constructor() {
        //scene identifier is playGame
        super("playGame");
    }

    create() {
        this.sky = this.add.tileSprite(0, 0, config.width, config.height, "sky");

        //userful for setting offset or pivot at top left of screen. Image picot determined by origin 
        this.sky.setOrigin(0, 0);

        this.bomb1 = this.add.image(config.width / 2 - 50, config.height / 2, "bomb").setScale(2);
        this.star = this.add.image(config.width / 2, config.height / 2, "star").setScale(3);
        this.bomb2 = this.add.image(config.width / 2 + 50, config.height / 2, "bomb");


        this.add.text(20, 20, "Playing Game!", {
            font: "25px Arial",
            fill: "yellow"
        });
    }

    moveBomb(bomb, speed) {
        bomb.y += speed;
        if (bomb.y > config.height) {
            this.resetBombPosition(bomb);
        }
    }

    resetBombPosition(bomb) {
        bomb.y = 0;
        var topX = Phaser.Math.Between(0, config.width);
        bomb.x = topX;
    }



    update() {
        this.moveBomb(this.bomb1, 1);
        this.moveBomb(this.star, 2);
        this.moveBomb(this.bomb2, 3);

        //this.sky.angle +=3;
        this.sky.tilePositionY -= 0.5;

    }


}
