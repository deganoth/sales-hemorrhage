//loading game when the window loads in the browser
var config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'canvas',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 750,
        height: 1334
    },
    physics: {
        default: 'arcade',
        //arcade property settings
        arcade: {
            debug: false,
            fps: 100,
            gravity: {
                y: 600
            },
            //checks for collision on each "side" of the screen
            checkCollision: {
                up: false,
                down: false,
                left: true,
                right: true
            },
        },

    },
    input: {
        activePointers: 5,
    },
    scene: [Title, Level1, Controls, About]
};
var tapTime = 0;
var doubleTapDelay = 300;
var title;
var graphics;
var desktopControls;
var mobileControls;
var message;
var instructions;
var enemyDescription;
var sky;
var skyWall;
var player;
var playerY;
var jump = false;
var left = false;
var right = false;
var j;
var l;
var r;
var energyBar;
var soulBall;
var ground;
var hudBox;
var soulValue;
var soul = 0;
var smallValue = 5;
var bigValue = 25;
var soulBarBackground;
var sales = 0;
var salesBar;
var regularSale = 50;
var bigSale = 300;
var health;
var cheapCustomer;
var richCustomer;
var cursors;
var pauseCount = 0;
var newPause;
var controls;
var gameOver = false;
var gameWin = false;
var restart;

var game = new Phaser.Game(config);
