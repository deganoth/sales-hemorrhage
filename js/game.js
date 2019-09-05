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
    scene: [Instructions, Level1]
};
var message = [];
var instructions = [];
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
var soulBar;
var soulBall;
var ground;
var hudBox;
var soulValue;
var salesBar;
var salesArray;
var soul = 0;
var soulBarBackground;
var sales = 0;
var health;
var bombs;
var singleBomb;
var cursors;
var controls;
var gameOver = false;
var gameWin = false;
var restart;

var game = new Phaser.Game(config);
