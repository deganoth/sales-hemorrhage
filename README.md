
# Sales Hemorrhage - A sales based cross platform platformer game.

## Link to the game 
https://deganoth.github.io/sales-hemorrhage/

## What is this?

This is a mobile and desktop platforming game made using the Phaser 3 Javascript framework. It features
an endless ascending platform style game where the player must accumulate sales while maintaining a healthy
energy level. It's a fantasy example of working a retail environment. The project called for a game that
challenged the user while still maintaining a fun experience. 

## UX

While the game is designed to be cross platform, it is primarily aimed at mobile users. Keyboard 
controls are available for desktop playing, with a touch screen system in place for mobile devices.
This system crates a natural touch screen experience, whith the screen divide into three areas allowing
movement in three directions, much like the keys on a keyboard do. 
Image and font visibility was a priority. The player must be able to see themselves onscreen, enemies
and status bars easily. In my initial [mockup]() I experimented with both landscape and portrait
gameplay styles. Portrait seemed the most logical pre testing, and was confirmed during the initial
portrait vs landscape builds. Through tutorial examples I learned how to arrange a collection of "scenes"
to move between. In the Phaser framework, scenes work like pages of a website. 

### Design/ Functionality
<img src="https://raw.githubusercontent.com/deganoth/sales-hemorrhage/master/assets/new_images/color_chart.png" width=350 style="display: block; float: left; padding-right: 30px;">
With the theme of the game being a retail environment, A somewhat digital feel has been used. Blocky text with 
LCD style fonts. These were added via the Phaser bitmap font loading. It allows for custom fonts to be used.
An earthy color palette was chosen to represent the humdrum life of an employee. 

I decided on 4 scenes. A title scene, controls, about and a main level. From the title scene, each scene 
has a "menu" button leading back to the title screen. during gameplay, only a win or a death allow access
to this button. 

## Features

#### 1. Main Menu
This collection of buttons is layout in the title screen. Their layout is set by taking the screen dimensions form the game
configuration file as variables, and setting the position by dividing the value accordingly. It has 4 buttons. Start, Controls, About and Exit. 
Star begins gameplay. About details in game element to collect, including enemies and health. Controls tells the player how to 
move around on each device, and exit closes the game. 
#### 2. Scoring System
Playing as a retail employee, your goal is the reach your sales target. This is shown at the top of the screen as a green bar.
As you collect each sale, the text on the green area reflects this. In addition, there is an energy meter. It's function is to 
It will decrease in size with each sale. If it reaches 0, the game will end. The goal is to strike a balance between your target 
and making sure your energy doesn't reach 0. A health token will appear in the form of coffee periodically to boost your energy back up.
All three were achieved using a "+=" operation with an existing variable value, then adding this value to each status bar. 
an additional level was added to the energy bar, resulting in a text output. This was achieved using a collection of "if" statements,
where the "soul" value was checked to see it if fit within a certain range, resulting in a different sentence per range. 

#### 3. Alternate endings
There are three possible ways to stop the game playing. If your energy reaches 0, if you die, or if you reach your target.
Two result in the option to replay the level, while one results in victory. A sales target is set at the start of the level. 
An "if" statement is used to query the "sales" value, to see if it matches or exceeds the known sales target. The game will end 
if said target is reached. Alternatively, a similar operation was used to determine the "soul" value. In this case however, the 
x dimension of the red energyBar is queried to see if it has reached 0 in width, resulting in a game over. 
The third ending queries the y position of the player. If it registers as greater than the game window height as set in the game configuration script,
the game is paused and a screen appears asking if you'd like to play again. 
#### 4. Endless Scrolling Screen
This gives the player the sense of an endless tower ahead of them. Constantly climbing towards sales heaven.
Making use of the arcade physics system in Phaser 3, each element can be set to react to physics. This is the case for the blue background.
Setting a global gravity however results in cumulative effect. The Y velocity increases exponentially. To set a constant velocity, the object must be
set to ignore gravity, and be set as immovable. Both are functions within the Phaser 3 framework. With both set, a fixed directional velocity can be set.
In this case, a Y velocity. To achieve the scrolling effect, a group containing multiple instances of the same object must be created. Using a "physics group",
settings can be assigned regarding the quantity and X and Y spread across the screen. In addition, a reset function for each instance must be used to send 
any element that moves off screen back to the top. Setting y values above and below the screen height value allow for seamless scrolling.
#### 5. Touch Screen Controls
Three areas on screen are dedicated to player movement. Divided vertically from left to right, the controls are; move left, jump and move right.
each area takes up one third of the x value, and the full y value for the game configuration width and height. Initially set as three buttons onscreen, 
I decided to make the screen less cluttered, and feel more natural to play. 
#### 6. Enemy AI
With three onscreen objects moving around by themselves, it creates a challenge difficult to navigate. Using a mimic of the player controls, each of the two
enemies react in different ways to player movement. The X velocity for each enemy is set differently, and conversely to the player movement. Jump remains the same
for all characters. The health token has a much lower x and y velocity, so it appears to float through the level when on screen. All three elements have the same 
reset function as the scrolling background. If a sale is missed, it will appear at the top of the screen again, in a random position.

#### 8. Scalable Play Screen 
This comes as a feature of the Phaser 3 framework. In the game configuration script, while setting the static game width and height, and additional option for allowing
the screen to "fit" within any screen size is available. This is controlled by the Phaser Scale Manager. It can scale a pre set screen size to suit any device screen size.
#### 9. Simulated Physics
The primary reason for me to choose this javascript framework was it's standard physics engine. It makes gameplay programming more complex, and the results less obvious.
In addition the feel of the game is more natural with simulated physics in use. I chose to make all elements physics based, so the game would be fully interactive within the 
world created.

## Technologies Used for Development

### Development

##### HTML5/CSS3
These tools were used to create the basic layout of the webpage. 
##### Cloud9 - https://aws.amazon.com/cloud9/
This is a rapid prototyping platform for developers. It allowed me to test any additions or changes made to my code on the fly
##### Sublime - https://www.sublimetext.com/
I made use of this text editor during the final stages of development. I switched from cloud9 to a local server to verify that the game functioned as desired.
I also use it to verify asset file paths functioned as requested.
##### Phaser v3.19.0 - https://phaser.io/phaser3
The primary javascript framework used to create gameplay, physics and interactivity. It makes use of WebGL and Canvas elements graphics rendering
##### Git/GitHub - https://github.com/deganoth
I made use of this to host my project. I communicated via Cloud9 and later on my local filesystem to share all project files and folders, including this file.
##### WAMP - Windows, Apache, MySQL, and PHP - http://www.wampserver.com/en/
This a brilliant tool for locally hosting and testing web applications. It is required with Phaser 3 as Cross Origin Resource Sharing is restricted on most modern web browsers
It creates a simulated host telling the browser that any files being viewed through WAMP have a domain.
##### GitBash - https://git-scm.com/downloads
This allowed my to push to github while using my local server. It functions in much the same was as the terminal in Cloud9.

### Testing

##### Firebox/Chrome Developer tools
Making use of the inspector console to check functionality, and investigate errors was vital for a smooth running game.
I found this invaluable. Phaser 3 errors read quite easily, with experience. In addition, the scaling issues were resolved by using the Responsive Design mode. Screen that were tested on are:
* iPhone 5 - 8 
* Samsung Galax7 S5, S7, S8
* ChromeBook 10"
* iPad Mini
* iPad Pro
* iPad 2

##### Manual User Tests
Game testers. My work colleagues, family members, nieces and nephews all gave valid feedback throughout development. Some of the key issues were:
* **Scaling** - While testing across as many devices as possible, some web browsers would not allow scaling to occur between portrait and landscape. 
This was my error, as I had yet to make use the Phaser 3 scale manager, and was using a scaling function of my own.
* **Control Layout** - I found most players preferred to have the jump button in the center of the screen. It contradicted my thinking as a console player
* **Control sticking** - This ended up being a bug between Phaser 3 and two browsers, Firefox and Chrome. If a touch screen control area was held down for too long it would register as being continuously held down, even on loading a new game.
This was resolved by adding a timer to the touch screen controls.
* **Purpose** - Initially the game was quite difficult to understand. Without the About section in the menu, it remained  mystery for some testers.
* **Player Bounds** - Some testers found it frustrating to be limited by having a set of status bars at the top of the screen. This was before the onscreen controls were modified. The screen was quite busy and cluttered.

## Deployment
I made use of GitHub to host this project. A link above allows a user to play the web application in a browser window. To contribute to or clone for learning purposes, git provides an option as the top right of the master repository. 
To test locally, a local server is required such as WAMP or XAMP. This is necessary due to the Cross Origin Resource Sharing being unavailable in modern browsers. I made use of WAMP for testing. In this case, when cloning the repository, it must be cloned to the "www" folder of the "wamp_server" directory.
This allows you to create a new virtual host when in the localhost browser window. Once created, making use of a text editor such as Sublime, or Atom to modify the files in the JS folder will change elements in the game.
The local host registers "index.html" as the main project web page, and loads it upon selecting your newly created sales-hemorrhage virtual host. Just refresh the page to see new changes. All links below detail problems and solutions found, including using WAMP server with Phaser 3.

How to make a new project in WAMP - https://www.development-tutorial.com/create-new-project-wampserver/
## Solutions found

### Tutorials
Breakout style game
* https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_breakout_game_Phaser

The basics
* https://www.lesscake.com/phaser-game-tutorial

Using matter.js physics engine
* https://itnext.io/modular-game-worlds-in-phaser-3-tilemaps-4-meet-matter-js-abf4dfa65ca1

An artists perspective
* https://medium.com/@jerra.haynes/a-real-persons-guide-to-phaser-3-or-how-i-learned-to-stop-worrying-and-love-the-gun-part-1-9cc6361f377c

How to use Phaser
* http://phaser.io/tutorials/getting-started-phaser3/

Make a platformer
* http://phaser.io/tutorials/making-your-first-phaser-3-game/

Classy Space Shooter
* https://www.youtube.com/watch?v=jVlNZgX5fV8
* https://www.youtube.com/watch?v=U0K0YTifb1w
* https://www.youtube.com/watch?v=cuSQnbZloFc
* https://www.youtube.com/watch?v=KQ2FhPKBOHI
* https://www.youtube.com/watch?v=qs5xmT6Upsc

### Ideas

Circular game world
* https://www.emanueleferonato.com/2018/09/10/html5-prototype-of-a-circular-endless-runner-featuring-double-jump-built-with-phaser-adding-particle-trails-explosions-and-camera-effects/

Space shooter
* https://yorkcs.com/2019/02/08/build-a-space-shooter-with-phaser-3-5/

Space shooter 2
* https://gamedevacademy.org/creating-mobile-games-with-phaser-3-and-cordova/

Night & day 
* https://www.joshmorony.com/how-to-create-a-day-night-cycle-in-phaser/

Following
* http://www.html5gamedevs.com/topic/38089-help-understanding-the-follower-object/

Rotating Object around Player
* http://www.html5gamedevs.com/topic/39497-rotate-game-objects-around-a-moving-object/

Matter.js
* https://github.com/mikewesthad/phaser-matter-collision-plugin#as-a-script

### Problems
Save and load games
* https://www.dynetisgames.com/2018/10/28/how-save-load-player-progress-localstorage/

Camera follow
* https://gamedevacademy.org/how-to-make-a-mario-style-platformer-with-phaser-3/

Scale to screen width
* https://www.joshmorony.com/how-to-scale-a-game-for-all-device-sizes-in-phaser/

Window scaling
* https://phaser.io/phaser3/devlog/136

Mobile controls
* https://swemyss.me/blog/phaser-3-mobile-controls

Focus window
* https://www.emanueleferonato.com/2019/01/09/html5-endless-runner-built-with-phaser-and-arcade-physics-step-4-adding-a-scrolling-parallax-background/

Mobile adaption
* http://www.lessmilk.com/tutorial/flappy-bird-phaser-3

Resize game window	
* http://www.html5gamedevs.com/topic/40267-scaling-the-game-to-fit-inner-window/

Resizing part 2
* https://phaser.discourse.group/t/game-scaling-resizing-example-v3/1555

Sprite Scaling
* https://phasergames.com/scaling-in-phaser-3/

On Screen Controls
* https://github.com/photonstorm/phaser-examples/blob/master/examples/input/virtual gamecontroller.js

Alternate Keys for movement
* http://www.html5gamedevs.com/topic/40607-how-to-replace-arrow-keys-with-wasd-movement/

Mobile controls
* http://www.html5gamedevs.com/topic/38496-how-make-virtual-button-in-phaser-3/

Offline package building
* https://gamedevacademy.org/phaser-progressive-web-apps-tutorial/

Using phaser 3 scale manager
* https://stackoverflow.com/questions/51518818/how-to-make-canvas-responsive-using-phaser-3

Group scaling
* https://labs.phaser.io/edit.html?src=src/game objects\group\set scale.js


Pick random sound from range
* http://www.html5gamedevs.com/topic/37506-pick-random-element/

Group physics
* https://labs.phaser.io/edit.html?src=src/physics/arcade/group set velocity y.js&v=3.19.0

Health bars
* https://labs.phaser.io/edit.html?src=src/game objects/graphics/health bars demo.js&v=3.19.0

Tween scaling
* https://phaser.io/examples/v3/view/game-objects/bitmaptext/static/width-and-height#

Z index
* http://labs.phaser.io/edit.html?src=src\depth sorting\z index.js

Make a new project in WAMP
* https://www.development-tutorial.com/create-new-project-wampserver/

Hitbox size
* https://phaser.discourse.group/t/how-to-alter-sprite-hitbox-in-sprite-animation/819

Bitmaptext making
* https://www.joshmorony.com/adding-custom-fonts-to-your-phaser-game/

Font load open type
* https://labs.phaser.io/edit.html?src=src/game objects/text/static/custom webfont.js&v=3.19.0

## Credits

* My Mentor, **Spencer Bariball** for showing me the ropes, and being a great teacher. 
* https://rexrainbow.github.io/phaser3-rex-notes/docs/site/ - A user fiendly version of the APIfriendlyntation
* https://codeinstitute.net/ - For making this possible.
* https://www.youtube.com/channel/UCoLblLUQbqjfCAmU13LbwHw - Luis Zuno. Easy to follow videos, great solutions.
* https://phaser.io/examples - It's always in the last place you look. Invaluable resource for knowing their own platform! 