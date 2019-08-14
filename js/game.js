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
    input: {
        activePointers: 5,
    },
    scene: [Scene1, Scene2]
};
var game = new Phaser.Game(config);
